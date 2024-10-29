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
async function fetchAllOrders(email, csrf) {
  try {
    const baseUrl = 'https://www.nykaa.com/fe-api/omsApis/v1/orderList';
    let currentPage = 0;
    const offset = 10;
    let orders = [];
    let hasMoreOrders = !0;
    while (hasMoreOrders) {
      const params = {
        currentPage: currentPage.toString(),
        offset: offset.toString(),
        email: email || '',
        domain: 'NYKAA',
      };
      const url = new URL(baseUrl);
      url.search = new URLSearchParams(params).toString();
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'accept-language': 'en-US,en;q=0.9',
          priority: 'u=1, i',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-csrf-token': csrf,
        },
        referrer: 'https://www.nykaa.com/sales/order/history/v2?ptype=myOrder',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        mode: 'cors',
        credentials: 'include',
      };
      try {
        const res = await fetch(url, options);
        const response = await res.json();
        if (response.success && response.data.orderList.length > 0) {
          let resultsData = response?.data?.orderList?.flatMap((order) =>
            order?.shipmentDetail?.flatMap((shipment) =>
              shipment?.itemList?.map((item) => ({
                itemSku: item?.itemSku,
                brandIds: item?.brandIds,
                parentId: item?.parentId,
                productId: item?.productId,
                itemStatus: item?.itemStatus,
                itemName: item?.itemName,
                imageUrl: item?.imageUrl,
                itemQuantity: item?.itemQuantity,
                unitPrice: item?.itemMrp,
                productUrl: item?.productUrl,
                brandNames: item?.brandNames,
                categoryId: item?.categoryId,
                orderNo: order?.orderNo,
                createdAt: order?.createdAt,
              }))
            )
          );
          orders = [...orders, ...resultsData];
          currentPage++;
        } else {
          hasMoreOrders = !1;
        }
      } catch (error) {
        console.error('Fetch error:', error);
        hasMoreOrders = !1;
      }
    }
    return orders;
  } catch (error) {
    console.error('Error in fetchAllOrders:', error);
    return [];
  }
}
async function fetchNykaaData() {
  try {
    if (window.location.href.includes('https://www.nykaa.com/sales/order/history/v2?ptype=myOrder')) {
      console.log('URL condition met');
      const localStorageData = window.localStorage.getItem('REACT_CONFIG');
      if (localStorageData === null) {
        console.log('No data found in localStorage');
        return;
      }
      let email = '';
      let csrf = '';
      try {
        const parse = JSON.parse(localStorageData);
        email = parse.data.result.customerData.loginEmail;
        csrf = parse.data.result.form_key;
      } catch (parseError) {
        console.error('Error parsing localStorage data:', parseError);
        return;
      }
      let orders = await fetchAllOrders(email, csrf);
      orders = orders?.length > 150 ? orders.slice(0, 150) : orders;
      console.log('Orders:', orders);
      try {
        //   window.reclaimFetchInjected = true;
        //   window.flutter_inappwebview.callHandler(
        //     "publicData",
        //     JSON.stringify({ orders })
        //   );
        console.log('Orders:', orders);
      } catch (error) {
        alert(error);
      }
      //  window.location.href = 'https://www.nykaa.com/prive';
      setTimeout(() => {
        window.localStorage.clear();
      }, 5000);
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
function fetchDataInterval() {
  fetchNykaaData().catch((error) => console.error('Error in fetchDataInterval:', error));
}
function checkRoute() {
  try {
    if (!window.reclaimFetchInjected) {
      window.reclaimFetchInjected = true;
    }

    const localStorageData = window.localStorage.getItem('REACT_CONFIG');
    if (localStorage !== null && window.location.href === 'https://www.nykaa.com/?ptype=auth') {
      window.localStorage.clear();
      // window.location.href = 'https://www.nykaa.com/sales/order/history/v2?ptype=myOrder';
    }

    if (
      window.location.href.includes('https://www.nykaa.com/sales/order/history/v2?ptype=myOrder') &&
      localStorageData !== null &&
      JSON.parse(localStorageData).data.result.customerData.loginEmail !== ''
    ) {
      if (document.getElementById('proofGenerationModal')) {
        return;
      } else {
        isLoggedInCheck();
      }
    }
  } catch (error) {
    console.error('Error in checkRoute:', error);
  }
}

function isLoggedInCheck() {
  try {
    const form = new FormData();
    form.append('source', 'react');
    fetch('https://www.nykaa.com/app-api/index.php/customer/get_wishlist_data', {
      method: 'POST',
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        referrer: 'https://www.nykaa.com/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        mode: 'cors',
      },
      credentials: 'include',
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('proofGenerationModal') ? null : modal();
        return true;
      })
      .catch((error) => {
        console.error('error', error);
        return;
      });
  } catch (error) {
    console.error('Error in isLoggedInCheck:', error);
  }
}

setInterval(checkRoute, 200);
setInterval(fetchDataInterval, 2500);
