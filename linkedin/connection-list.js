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
async function fetchAllConnections() {
  let data = [];
  try {
    let allConnections = [];
    let start = 0;
    let count = 1000;
    let limit = 1000;

    while (allConnections.length < limit) {
      const jsessionidMatch = document.cookie.match(/JSESSIONID="?([^;"]+)"?/);
      const jsessionid = jsessionidMatch ? jsessionidMatch[1] : '';
      const url =
        'https://www.linkedin.com/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&count=' +
        count +
        '&q=search&sortType=RECENTLY_ADDED&start=' +
        start;

      const response = await fetch(url, {
        headers: {
          accept: 'application/vnd.linkedin.normalized+json+2.1',
          'accept-language': 'en-US,en;q=0.9',
          'csrf-token': jsessionid,
          'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'sec-gpc': '1',
          'x-li-lang': 'en_US',
          'x-li-page-instance': 'urn:li:page:d_flagship3_people_connections;P3ndYc9oTFemhAZomdggkw==',
          'x-li-track':
            '{"clientVersion":"1.13.22711","mpVersion":"1.13.22711","osName":"web","timezoneOffset":5.5,"timezone":"Asia/Calcutta","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":2,"displayWidth":1618,"displayHeight":1580}',
          'x-restli-protocol-version': '2.0.0',
        },
        referrer: 'https://www.linkedin.com/mynetwork/invite-connect/connections/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const json = await response.json();
      const connections = json.included
        .filter((item) => item.firstName !== undefined)
        .map((item) => ({
          firstName: item.firstName,
          lastName: item.lastName,
          headline: item.headline,
          url: 'https://linkedin.com/in/' + item.publicIdentifier,
          pfp:
            item.profilePicture?.displayImageReference?.vectorImage?.rootUrl +
            item.profilePicture?.displayImageReference?.vectorImage?.artifacts[2]?.fileIdentifyingUrlPathSegment,
        }));

      allConnections = allConnections.concat(connections);

      data = allConnections;
      break;
    }

    return data;
  } catch (error) {
    alert(error);
    return data;
  }
}
async function fetchLinkedInData() {
  try {
    if (window.location.href.includes('https://www.linkedin.com/mynetwork/invite-connect/connections/')) {
      const data = await fetchAllConnections();
      try {
        console.log(data);
        // window.reclaimFetchInjected = true;
        // window.flutter_inappwebview.callHandler(
        //   "publicData",
        //   JSON.stringify({ data })
        // );
      } catch (error) {
        alert(error);
      }
      //  window.location.href = "https://www.linkedin.com/dashboard/";
      setTimeout(() => {
        window.localStorage.clear();
      }, 5000);
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
function fetchDataInterval() {
  fetchLinkedInData().catch((error) => console.error('Error in fetchDataInterval:', error));
}

setInterval(fetchDataInterval, 2500);
