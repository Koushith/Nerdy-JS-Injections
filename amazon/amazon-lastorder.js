let matchFound = false;

const checkUrlAndClick = () => {
  const pattern1 =
    /^https:\/\/www\.amazon\.com\/your-orders\/orders\?timeFilter=year-\d{4}&ref_=ppx_yo2ov_dt_b_filter_all_y\d{4}$/;
  const pattern2 =
    /^https:\/\/www\.amazon\.com\/gp\/css\/order-history\?ref_=nav_orders_first$/;

  if (
    pattern1.test(window.location.href) ||
    pattern2.test(window.location.href)
  ) {
    // alert("URL matches the pattern");
    // alert(window.location.href);
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
      alert("Element not found");
    }
  }

  //if (matchFound) {
  // clearInterval(urlCheckInterval);
  //}
};

const urlCheckInterval = setInterval(checkUrlAndClick, 5000);
