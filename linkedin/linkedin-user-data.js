function getElementsByXPath(xpath, parent) {
    let results = [];
    let query = document.evaluate(
      xpath,
      parent || document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (let i = 0; i < query.snapshotLength; i++) {
      results.push(query.snapshotItem(i));
    }
    return results;
  }
  function waitForElements(xpath, callback) {
    let elements = getElementsByXPath(xpath);
    if (elements.length > 0) {
      callback(elements);
    } else {
      let observer = new MutationObserver((mutations, obs) => {
        elements = getElementsByXPath(xpath);
        if (elements.length > 0) {
          obs.disconnect();
          callback(elements);
        }
      });
      observer.observe(document, {
        childList: true,
        subtree: true
      });
    }
  }
  waitForElements('//section[contains(@class, "experience")]//li[contains(@class, "words profile-entity-lockup")]',(re)=>{
    let experience = []
    re.forEach((e) => experience.push(e.innerText))
    console.log('hi there',experience.length)
    window.reclaimFetchInjected = true;
    window.flutter_inappwebview.callHandler(
      "publicData",
      JSON.stringify({ experience })
    );
  })
  