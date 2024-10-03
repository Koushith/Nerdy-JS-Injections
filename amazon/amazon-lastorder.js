let matchFound = false;

// Create a banner for messages
const banner = document.createElement("div");
banner.style.position = "fixed";
banner.style.top = "0";
banner.style.left = "0";
banner.style.width = "100%";
banner.style.backgroundColor = "#232F3E";
banner.style.color = "white";
banner.style.padding = "10px 0";
banner.style.textAlign = "center";
banner.style.zIndex = "9999";
banner.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

const messageContainer = document.createElement("div");
messageContainer.style.maxWidth = "1000px";
messageContainer.style.margin = "0 auto";
messageContainer.style.display = "flex";
messageContainer.style.justifyContent = "center";
messageContainer.style.alignItems = "center";
messageContainer.style.flexWrap = "wrap";

const navigationP = document.createElement("p");
navigationP.style.margin = "5px 10px";
navigationP.style.padding = "5px 10px";
navigationP.style.backgroundColor = "#FF9900";
navigationP.style.borderRadius = "3px";
navigationP.style.color = "#232F3E";
navigationP.style.fontWeight = "bold";

const filterP = document.createElement("p");
filterP.style.margin = "5px 10px";
filterP.textContent =
  "Please change the filter if you have not placed any orders in the last 3 months";

messageContainer.appendChild(navigationP);
messageContainer.appendChild(filterP);
banner.appendChild(messageContainer);
document.body.insertBefore(banner, document.body.firstChild);

const checkUrlAndClick = () => {
  const pattern1 =
    /^https:\/\/www\.amazon\.com\/your-orders\/orders\?timeFilter=year-\d{4}&ref_=ppx_yo2ov_dt_b_filter_all_y\d{4}$/;
  const pattern2 =
    /^https:\/\/www\.amazon\.com\/gp\/css\/order-history\?ref_=nav_orders_first$/;

  if (
    pattern1.test(window.location.href) ||
    pattern2.test(window.location.href)
  ) {
    navigationP.textContent = "Navigating to order details";
    navigationP.style.display = "inline-block";
    matchFound = true;

    const element = document.evaluate(
      "/html/body/div[1]/section/div[1]/div[9]/div/div[1]/div/div/div/div[2]/div[2]/div/a[1]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (element) {
      element.click();
    } else {
      navigationP.textContent = "Element not found";
    }
  } else {
    navigationP.style.display = "none";
  }

  //if (matchFound) {
  // clearInterval(urlCheckInterval);
  //}
};

const urlCheckInterval = setInterval(checkUrlAndClick, 3000);
