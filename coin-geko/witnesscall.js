if (window.location.href === 'https://www.coingecko.com/en/nft') {
  setInterval(() => {
    try {
      // Check if required data exists
      if (!window.payloadData) {
        return;
      }

      // Check if already injected
      if (window.injected) {
        return;
      }

      // as soon as we open the webview window will have this
      if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
        window.flutter_inappwebview.callHandler('publicData', JSON.stringify({ data: 'test data' }));
      }

      const rd = {
        url: 'https://api.coingecko.com/api/v3/global',
        cookies: '',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        requestBody: '',
        responseBody: 'response',
        extractedParams: {
          active_cryptocurrencies: 'kooooooooooo', // this is the template lit we used on devtool. optional this is the valkue that wuill be try to match if typoe = contains
        },
        geoLocation: window.payloadData.geoLocation,
        // responseRedactions: [
        //   {
        //     jsonPath: '$.data.active_cryptocurrencies',
        //     regex: '"active_cryptocurrencies":(.*)',
        //   },
        // ],
        responseRedactions: [], // no zk
        responseMatches: [
          {
            type: 'regex',
            value: '"active_cryptocurrencies":(?<active_cryptocurrencies>.*)',
          },
        ],
        witnessParameters: { ...window.payloadData.parameters }, // witness parameters- boiler plate
      };

      if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
        window.flutter_inappwebview.callHandler('extractedData', JSON.stringify(rd));
        window.injected = true; // this is to prevent infinite loop sef to true in the end
      }
    } catch (e) {
      console.error('Injection error:', e);
    }
  }, 1000);
}
