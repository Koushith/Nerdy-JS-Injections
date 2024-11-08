function modal() {
  let modal = document.createElement('div');
  modal.id = 'proofGenerationModal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.zIndex = '1';
  modal.style.paddingTop = '100px';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.overflow = 'auto';
  modal.style.backgroundColor = 'rgb(0,0,0)';
  modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
  modal.innerHTML =
    '<div style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;"><h3 style="text-align: center; padding-bottom: 20px">Fetching data</h3><p style="text-align: center;">Please wait while we fetch your order history</p></div>';
  document.body.appendChild(modal);
  document.getElementById('proofGenerationModal').style.display = 'block';
}

async function fetchOrderPage(pageNum, yAuthorization, yExpiration, yString) {
  const orderResponse = await fetch(
    `https://www.yesstyle.com/rest/myaccount/order/v1/orders?pageNum=${pageNum}&viewNum=5`,
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en;q=0.5',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'y-authorization': yAuthorization,
        'y-expiration': yExpiration,
        'y-string': yString,
      },
      referrer: 'https://www.yesstyle.com/en/secure/myaccount/order.html',
      referrerPolicy: 'same-origin',
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  );

  return await orderResponse.json();
}

async function fetchAuthTokens() {
  const response = await fetch('https://www.yesstyle.com/en/secure/myaccount/order.html', {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'en-GB,en;q=0.5',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'sec-gpc': '1',
      'upgrade-insecure-requests': '1',
    },
    referrer: 'https://www.yesstyle.com/en/secure/myaccount/summary.html',
    referrerPolicy: 'same-origin',
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  const htmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  // Find the script tag that contains the tokens
  const scripts = doc.querySelectorAll('script');
  let scriptContent = '';
  for (let script of scripts) {
    if (script.textContent.includes('Y-Authorization')) {
      scriptContent = script.textContent;
      break;
    }
  }

  if (!scriptContent) {
    throw new Error('Required tokens not found in the HTML.');
  }

  const yAuthorizationMatch = scriptContent.match(/"Y-Authorization":"([^"]+)"/);
  const yExpirationMatch = scriptContent.match(/"Y-Expiration":"([^"]+)"/);
  const yStringMatch = scriptContent.match(/"Y-String":"([^"]+)"/);

  if (!yAuthorizationMatch || !yExpirationMatch || !yStringMatch) {
    throw new Error('Required tokens not found in the HTML.');
  }

  const yAuthorization = yAuthorizationMatch[1];
  const yExpiration = yExpirationMatch[1];
  const yString = yStringMatch[1];

  return { yAuthorization, yExpiration, yString };
}

async function fetchOrderDetails(orderUrl) {
  const response = await fetch(orderUrl, {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'en-GB,en;q=0.5',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'sec-gpc': '1',
      'upgrade-insecure-requests': '1',
    },
    referrer: 'https://www.yesstyle.com/en/secure/myaccount/order.html',
    referrerPolicy: 'same-origin',
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  const htmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  // Helper function to find the next sibling element with a specific tag name
  function getNextSibling(element, tagName) {
    let sibling = element.nextElementSibling;
    while (sibling) {
      if (sibling.tagName.toLowerCase() === tagName.toLowerCase()) {
        return sibling;
      }
      sibling = sibling.nextElementSibling;
    }
    return null;
  }

  // Extract order details from the HTML
  const orderNumberElement = Array.from(doc.querySelectorAll('dl dt')).find((dt) =>
    dt.textContent.includes('Order Number')
  );
  const orderNumber = orderNumberElement ? getNextSibling(orderNumberElement, 'dd').textContent.trim() : null;
  const orderDateElement = Array.from(doc.querySelectorAll('dl dt')).find((dt) =>
    dt.textContent.includes('Order Date & Time')
  );
  const orderDate = orderDateElement ? getNextSibling(orderDateElement, 'dd').textContent.trim() : null;

  const totalPriceElement = doc.querySelector('.list-amount .grandTotal td');
  const totalPrice = totalPriceElement ? totalPriceElement.textContent.trim() : null;

  const items = Array.from(doc.querySelectorAll('tbody tr'))
    .map((row) => {
      const nameElement = row.querySelector('td[title="Item"] a');
      const name = nameElement ? nameElement.textContent.trim() : null;

      const catalogNoElement = row.querySelector('td[title="Catalog No."]');
      const catalogNo = catalogNoElement ? catalogNoElement.textContent.trim() : null;

      const statusElement = row.querySelector('td[title="Status"]');
      const status = statusElement ? statusElement.textContent.trim() : null;

      const priceElement = row.querySelector('td[title="Unit Price"]');
      const price = priceElement ? priceElement.textContent.trim() : null;

      const quantityElement = row.querySelector('td[title="Qty."]');
      const quantity = quantityElement ? quantityElement.textContent.trim() : null;

      // Only return the item if it has at least one non-null value
      if (name || catalogNo || status || price || quantity) {
        return { name, catalogNo, status, price, quantity };
      }
      return null;
    })
    .filter((item) => item !== null); // Remove any null items from the array

  return { orderNumber, orderDate, totalPrice, items };
}

function formatOrderData(orders) {
  return orders.flatMap((order) => {
    return order.items.map((product) => {
      const cleanProductName = product.name.split('[')[0].trim();

      const orderLine = order.orderLines.find((line) => line.productName === cleanProductName);
      console.log(cleanProductName, '.........', order.orderLines[0].productName);

      return {
        orderNo: order.orderNumber,
        createdAt: order.orderDate,
        productId: orderLine ? orderLine.productId : null,
        categoryId: product.catalogNo,
        brandNames: [],
        productName: cleanProductName,
        itemQuantity: parseInt(product.quantity),
        unitPrice: product.price,
        totalPrice: order.totalPrice,
        itemStatus: product.status,
        imageUrl: orderLine ? orderLine.imageUrl : null,
        productUrl: `https://www.yesstyle.com/en/${product.catalogNo}.html`,
        orderStatus: order.orderStatus,
        pointsEarned: order.pointsEarned,
        orderUrl: order.orderUrl,
      };
    });
  });
}

function waitForFlutterInAppWebView(callback, maxAttempts = 10, interval = 1000) {
  let attempts = 0;

  function checkAvailability() {
    if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
      callback();
    } else if (attempts < maxAttempts) {
      attempts++;
      alert(`Waiting for flutter_inappwebview (attempt ${attempts}/${maxAttempts})`);
      setTimeout(checkAvailability, interval);
    } else {
      alert('flutter_inappwebview not available after maximum attempts');
    }
  }

  checkAvailability();
}

async function yesstyleInjection() {
  await new Promise((resolve) => {
    waitForFlutterInAppWebView(resolve);
  });

  try {
    if (window.location.href === 'https://www.yesstyle.com/en/secure/myaccount/summary.html') {
      if (!window.modal) {
        modal();
        window.modal = true;
      }
      const { yAuthorization, yExpiration, yString } = await fetchAuthTokens();

      if (!window.yesstyleInjectionCalled) {
        try {
          let allOrders = [];
          let pageNum = 1;
          let lastPageNum = 1;
          do {
            const orderData = await fetchOrderPage(pageNum, yAuthorization, yExpiration, yString);
            allOrders = allOrders.concat(orderData.orders);
            lastPageNum = orderData.lastPageNum;
            pageNum++;
          } while (pageNum <= lastPageNum);

          const detailedOrders = await Promise.all(
            allOrders.map(async (order) => {
              const details = await fetchOrderDetails(order.orderUrl);
              return { ...order, ...details };
            })
          );

          const formattedData = formatOrderData(detailedOrders);
          // console.log(JSON.stringify(formattedData, null, 2));

          try {
            window.reclaimFetchInjected = true;
            window.flutter_inappwebview.callHandler('publicData', JSON.stringify({ orders: formattedData }));
            window.location.href = 'https://www.yesstyle.com/en/secure/myaccount/personal-information.html';
            window.yesstyleInjectionCalled = true;
          } catch (error) {
            alert(error);
          }
        } catch (error) {
          alert('Error processing orders: ' + error);
        }
      }
    } else {
    }
  } catch (error) {
    alert('Error in yesstyleInjection: ' + error);
  }
}

function callWitness(auth, exp, string) {
  try {
    if (window.hdrz) {
      alert('callWitness already called, returning');
      return;
    }
    const rd = {
      url: 'https://www.yesstyle.com/rest/myaccount/personal-information/v1',
      cookies: '',
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en;q=0.8',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'y-authorization': auth,
        'y-expiration': exp,
        'y-string': string,
        referrer: 'https://www.yesstyle.com/en/secure/myaccount/order.html',
        referrerPolicy: 'same-origin',
        mode: 'cors',
        credentials: 'include',
      },
      method: 'GET',
      responseBody: 'response',
      extractedParams: {
        firstName: 'vivek',
      },
      responseSelections: window.payloadData.responseSelections,
      geoLocation: window.payloadData.geoLocation,
      responseRedactions: window.payloadData.responseSelections.map((i) => ({ xPath: i.xPath, jsonPath: i.jsonPath })),
      responseMatches: window.payloadData.responseSelections.map((i) => ({
        value: i.responseMatch,
        type: 'contains',
        invert: i.invert,
      })),
      witnessParameters: { ...window.payloadData.parameters },
    };
    alert('flutter_inappwebview object: ' + JSON.stringify(window.flutter_inappwebview));
    window.flutter_inappwebview.callHandler('extractedData', JSON.stringify(rd));
    window.hdrz = true;
    alert('Successfully called flutter_inappwebview.callHandler');
  } catch (e) {
    alert('Error in callWitness: ' + e);
  }
}

function runInjection() {
  yesstyleInjection()
    .then(() => {})
    .catch((error) => {
      alert('Error running yesstyleInjection: ' + error);
    });
}

setInterval(runInjection, 5000);
