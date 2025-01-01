let allMessages = [];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchMatches = async () => {
  const token = await localStorage.getItem('TinderWeb/APIToken');
  const res = await fetch('https://api.gotinder.com/v2/matches?locale=en-GB&count=60&message=1&is_tinder_u=false', {
    headers: {
      accept: 'application/json',
      'accept-language': 'en-GB',
      'x-auth-token': token,
    },
    referrer: 'https://tinder.com/',
    referrerPolicy: 'origin',
    body: null,
    method: 'GET',
    credentials: 'omit',
  });

  const matchDetails = await res.json();
  console.log(matchDetails);
  allMessages = matchDetails.data.matches.map((match) => {
    return {
      matchId: match.id,
    };
  });
};

const fetchMessages = async (matchId, retryCount = 0) => {
  const token = await localStorage.getItem('TinderWeb/APIToken');
  try {
    await sleep(2000);
    const res = await fetch(
      `https://api.gotinder.com/v2/matches/${matchId}/messages?locale=en-GB&count=100&page_token=MjAyNC0xMi0xM1QwMTo1MzoxMS40MDBa`,
      {
        headers: {
          accept: 'application/json',
          'accept-language': 'en-GB',
          'cache-control': 'no-cache',
          origin: 'https://tinder.com',
          'x-auth-token': token,
          'x-supported-image-formats': 'webp,jpeg',
        },
      }
    );

    if (res.status === 429 && retryCount < 3) {
      console.log(`Rate limited, waiting and retrying... (Attempt ${retryCount + 1})`);
      await sleep(2000);
      return fetchMessages(matchId, retryCount + 1);
    }

    const messageDetails = await res.json();
    return messageDetails.data.messages;
  } catch (error) {
    console.log(error);
  }
};

const fetchAndFormatMessages = async () => {
  await fetchMatches();
  const messagesWithDetails = await Promise.all(
    allMessages.map(async (match) => {
      try {
        const messages = await fetchMessages(match.matchId);
        return {
          ...match,
          messages: messages,
        };
      } catch (error) {
        console.log(error);
        return {
          ...match,
          messages: [],
        };
      }
    })
  );

  try {
    window.reclaimFetchInjected = true;
    window.flutter_inappwebview.callHandler('publicData', JSON.stringify({ messages: messagesWithDetails }));
    window.location.href = 'https://tinder.com/app/profile';
    window.injectioncalled = true;
  } catch (error) {
    alert(error);
  }
};

const callInjection = async () => {
  const token = await localStorage.getItem('TinderWeb/APIToken');
  const headers = {
    accept: 'application/json',
    'accept-language': 'en-GB',
    'cache-control': 'no-cache',
    origin: 'https://tinder.com',
    priority: 'u=1, i',
    referer: 'https://tinder.com/',
    'user-agent':
      'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
    'x-auth-token': token,
  };
  window.reclaimFetchInjected = true;

  const rd = {
    url: 'https://api.gotinder.com/v2/profile?locale=en-GB&include=account%2Cavailable_descriptors%2Cboost%2Cbouncerbypass%2Ccontact_cards%2Cemail_settings%2Cfeature_access%2Cinstagram%2Clikes%2Cprofile_meter%2Cnotifications%2Cmisc_merchandising%2Cofferings%2Conboarding%2Cpaywalls%2Cplus_control%2Cpurchase%2Creadreceipts%2Cspotify%2Csuper_likes%2Ctinder_u%2Ctravel%2Ctutorials%2Cuser%2Call_in_gender',
    cookies: '',
    headers: {
      accept: 'application/json',
      'accept-language': 'en-GB',
      'cache-control': 'no-cache',
      origin: 'https://tinder.com',
      platform: 'web',
      pragma: 'no-cache',
      priority: 'u=1, i',
      referer: 'https://tinder.com/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'sec-gpc': '1',
      'user-agent':
        'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+',
      'x-auth-token': token,
    },
    method: 'GET',
    requestBody: '',
    responseBody: 'response',
    extractedParams: {
      account_email: '',
    },
    geoLocation: window.payloadData.geoLocation,
    responseMatches: [{ type: 'regex', value: 'account_email":"(?<account_email>.*?)"' }],
    responseRedactions: [{ regex: 'account_email":"(.*?)"' }],
    witnessParameters: { ...window.payloadData.parameters },
  };

  if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
    window.flutter_inappwebview.callHandler('extractedData', JSON.stringify(rd));
  }

  window.handlerCalled = true;
};

setInterval(async () => {
  if (window.location.href === 'https://tinder.com/app/recs') {
    window.location.href = 'https://tinder.com/app/matches';
  }
  if (window.location.href === 'https://tinder.com/app/matches' && !window.injectioncalled) {
    await fetchAndFormatMessages();
  }
  if (window.location.href === 'https://tinder.com/app/profile' && !window.handlerCalled) {
    await callInjection();
  }
}, 2000);
