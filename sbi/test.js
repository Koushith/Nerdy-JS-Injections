if (window.location.href === 'https://retail.onlinesbi.sbi/retail/mypage.htm') {
  setInterval(() => {
    try {
      if (window.hdrz || !dr1) {
        return;
      }
      const btn = dr1.querySelectorAll('a')[1];
      const actn = btn.href.split("'")[1];
      const bnc = btn.href.split("'")[3];
      window.document.quickLookForm.accountNo.value = actn;
      window.document.quickLookForm.branchCode.value = bnc;
      const fd = new FormData(window.document.quickLookForm);
      const data = new URLSearchParams(fd);
      const rd = {
        url: 'https://retail.onlinesbi.sbi/retail/quicklook.htm',
        cookies: '',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.7',
          Origin: 'https://retail.onlinesbi.sbi',
          Pragma: 'no-cache',
          Referer: 'https://retail.onlinesbi.sbi/retail/mypage.htm',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-User': '?1',
          'Sec-GPC': '1',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        requestBody: data.toString(),
        responseBody: 'response',
        extractedParams: {},
        responseSelections: window.payloadData.responseSelections,
        geoLocation: window.payloadData.geoLocation,
        responseRedactions: window.payloadData.responseSelections.map((i) => ({
          xPath: i.xPath,
          jsonPath: i.jsonPath,
        })),
        responseMatches: window.payloadData.responseSelections.map((i) => {
          return { value: i.responseMatch, type: 'regex' };
        }),
        witnessParameters: { ...window.payloadData.parameters },
      };

      window.flutter_inappwebview.callHandler('extractedData', JSON.stringify(rd));
      window.hdrz = true;
    } catch (e) {}
  }, 1000);
}
