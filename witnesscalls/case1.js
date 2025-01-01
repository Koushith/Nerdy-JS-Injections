const proof = await client.zkFetch('https://www.fiverr.com/seller_dashboard', {
    method:'GET',
    paramValues: {name:'Alekhya S'},
   }, {
    headers : {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'en-GB,en;q=0.5',
      'cache-control': 'max-age=0',
      'cookie': 'u_guid=1729836200000-b51c4bd72968dd8e379e5cfb3ba5a2b7ccb28f78; logged_out_currency=INR; logged_in_currency_v2=INR; session_locale=en; was_logged_in=1%3Bdarshanls; _pxhd=e-VKcKObcdhJmDt7q9FElLd34Mu8RR-Wkm20-0pqMI4Cw5nMs3C2gv8xUdhI6Te-kCxKpuAQpYSpB2Lvbvi7CA==:DgY1zNMsppsZ8twsEmbONNsGsXZVR7Za07llsBy7FccJQLXQVrgL/JgiuE2oKVmG1rdtX1mGhAQ8u7n8aPYlOBIaoApJEcIQ5myZD0ChFDs=; _fiverr_session_key=450606561643203e40a32d7d9b147118; _cfuvid=2emT5OjGCZ1YL8iRoCCnFxVixY5kaloIuB6bdnxrxl8-1734465161125-0.0.1.1-604800000; new_guid=1734518890553-c9b92779-ada1-432f-9e19-8ff49a606740; page_views=3; hodor_creds=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXZlcnIvaG9kb3JfcGVnYXN1cyIsInVpZCI6MTg2Mjg0OTA4LCJ1cHMiOm51bGwsInNpZCI6IjU3MGRmYmNmZDYwZjc5MThmOGFlZGIxNmNkOWMzODU4IiwiaWF0IjoxNzM0NTI5NjU5LCJleHAiOjE3NjYwODcyNTl9.Ul1ekvUIAEDs2n2sZ6rdBUMtB3xlqWekSglexM1xpYM; cpra_opt_out_permanent_user=false; redirect_url=%2Falekyashastrula%2Fbuying%3Fsource%3Davatar_menu_profile; QSI_HistorySession=https%3A%2F%2Fwww.fiverr.com%2Fusers%2Fbluebliss1997%2Fmanage_gigs~1729838310541%7Chttps%3A%2F%2Fwww.fiverr.com%2Fdarshanls%3Fup_rollout%3Dtrue~1729839156782%7Chttps%3A%2F%2Fwww.fiverr.com%2Fbluebliss1997%3Fup_rollout%3Dtrue~1734513615303%7Chttps%3A%2F%2Fwww.fiverr.com%2Fusers%2Fbluebliss1997%2Fedit%2Faccount~1734513653561%7Chttps%3A%2F%2Fwww.fiverr.com%2Falekyashastrula%3Fup_rollout%3Dtrue~1734529758964; last_content_pages_=gigs%7C%7C%7Cshow%7C%7C%7C401660658%3B; hp_view=seller; forterToken=f7fbf9be108347b6a2a48d4cc5f9a7ff_1734534609660_202_UAS9b_17ck',
      'if-none-match': 'W/"bad28-6nIcWnCM7/fFKKsIcaIGXR59SZ8"',
      'priority': 'u=0, i',
      'referer': 'https://www.google.com/',
      'sec-ch-ua': '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-user': '?1',
      'sec-gpc': '1',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
    },
    responseMatches: [{
      'type':'contains',
      'value':'<div class="_1ljyzmr16h _1ljyzmr0 _1ljyzmrzy _1ljyzmr18z _1ljyzmr1b2"><p class="rbwcxmk _1ljyzmr1f3 _1ljyzmr1cl _1ljyzmr8 _1ljyzmr2" style="--rbwcxm0:var(--_1byh6kb1l)">{{name}}</p>'
    }]
   }


console.log(proof);


const proof = await client.zkFetch('https://www.fiverr.com/seller_dashboard', {
  method:'GET',
 }, {
  headers : {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'accept-language': 'en-GB,en;q=0.5',
    'cache-control': 'max-age=0',
    'cookie': 'u_guid=1729836200000-b51c4bd72968dd8e379e5cfb3ba5a2b7ccb28f78; logged_out_currency=INR; logged_in_currency_v2=INR; session_locale=en; was_logged_in=1%3Bdarshanls; _pxhd=e-VKcKObcdhJmDt7q9FElLd34Mu8RR-Wkm20-0pqMI4Cw5nMs3C2gv8xUdhI6Te-kCxKpuAQpYSpB2Lvbvi7CA==:DgY1zNMsppsZ8twsEmbONNsGsXZVR7Za07llsBy7FccJQLXQVrgL/JgiuE2oKVmG1rdtX1mGhAQ8u7n8aPYlOBIaoApJEcIQ5myZD0ChFDs=; _fiverr_session_key=450606561643203e40a32d7d9b147118; _cfuvid=2emT5OjGCZ1YL8iRoCCnFxVixY5kaloIuB6bdnxrxl8-1734465161125-0.0.1.1-604800000; new_guid=1734518890553-c9b92779-ada1-432f-9e19-8ff49a606740; page_views=3; hodor_creds=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXZlcnIvaG9kb3JfcGVnYXN1cyIsInVpZCI6MTg2Mjg0OTA4LCJ1cHMiOm51bGwsInNpZCI6IjU3MGRmYmNmZDYwZjc5MThmOGFlZGIxNmNkOWMzODU4IiwiaWF0IjoxNzM0NTI5NjU5LCJleHAiOjE3NjYwODcyNTl9.Ul1ekvUIAEDs2n2sZ6rdBUMtB3xlqWekSglexM1xpYM; cpra_opt_out_permanent_user=false; redirect_url=%2Falekyashastrula%2Fbuying%3Fsource%3Davatar_menu_profile; QSI_HistorySession=https%3A%2F%2Fwww.fiverr.com%2Fusers%2Fbluebliss1997%2Fmanage_gigs~1729838310541%7Chttps%3A%2F%2Fwww.fiverr.com%2Fdarshanls%3Fup_rollout%3Dtrue~1729839156782%7Chttps%3A%2F%2Fwww.fiverr.com%2Fbluebliss1997%3Fup_rollout%3Dtrue~1734513615303%7Chttps%3A%2F%2Fwww.fiverr.com%2Fusers%2Fbluebliss1997%2Fedit%2Faccount~1734513653561%7Chttps%3A%2F%2Fwww.fiverr.com%2Falekyashastrula%3Fup_rollout%3Dtrue~1734529758964; last_content_pages_=gigs%7C%7C%7Cshow%7C%7C%7C401660658%3B; hp_view=seller; forterToken=f7fbf9be108347b6a2a48d4cc5f9a7ff_1734534609660_202_UAS9b_17ck',
    'if-none-match': 'W/"bad28-6nIcWnCM7/fFKKsIcaIGXR59SZ8"',
    'priority': 'u=0, i',
    'credentials': 'include',
    'referer': 'https://www.google.com/',
    'sec-ch-ua': '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-user': '?1',
    'sec-gpc': '1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  },
  responseMatches: [{
    'type':'regex',
    'value':'{"username":(?<username>.*?),' // this is the template lit we used on devtool. optional this is the valkue that wuill be try to match if typoe = contains
  }, {
    'type':'regex',
    'value':'"fullName":(?<fullName>.*?),' // this is the template lit we used on devtool. optional this is the valkue that wuill be try to match if typoe = contains
  }],
  responseRedactions: [{
    'regex':'{"username":(.*?),'
  }, {
    'regex':'"fullName":(.*?),'
  }]


  const proof = await client.zkFetch('https://www.fiverr.com/seller_dashboard', {
    method:'GET',
    paramValues: {name:'Alekhya S'}, //params value we set from sdk - trigger proof if this vlaue is peresent
   }, {
    headers : {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'en-GB,en;q=0.5',
      'cache-control': 'max-age=0',
      'cookie': 'u_guid=1729836200000-b51c4bd72968dd8e379e5cfb3ba5a2b7ccb28f78; logged_out_currency=INR; logged_in_currency_v2=INR; session_locale=en; was_logged_in=1%3Bdarshanls; _pxhd=e-VKcKObcdhJmDt7q9FElLd34Mu8RR-Wkm20-0pqMI4Cw5nMs3C2gv8xUdhI6Te-kCxKpuAQpYSpB2Lvbvi7CA==:DgY1zNMsppsZ8twsEmbONNsGsXZVR7Za07llsBy7FccJQLXQVrgL/JgiuE2oKVmG1rdtX1mGhAQ8u7n8aPYlOBIaoApJEcIQ5myZD0ChFDs=; _fiverr_session_key=450606561643203e40a32d7d9b147118; _cfuvid=2emT5OjGCZ1YL8iRoCCnFxVixY5kaloIuB6bdnxrxl8-1734465161125-0.0.1.1-604800000; new_guid=1734518890553-c9b92779-ada1-432f-9e19-8ff49a606740; page_views=3; hodor_creds=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXZlcnIvaG9kb3JfcGVnYXN1cyIsInVpZCI6MTg2Mjg0OTA4LCJ1cHMiOm51bGwsInNpZCI6IjU3MGRmYmNmZDYwZjc5MThmOGFlZGIxNmNkOWMzODU4IiwiaWF0IjoxNzM0NTI5NjU5LCJleHAiOjE3NjYwODcyNTl9.Ul1ekvUIAEDs2n2sZ6rdBUMtB3xlqWekSglexM1xpYM; cpra_opt_out_permanent_user=false; redirect_url=%2Falekyashastrula%2Fbuying%3Fsource%3Davatar_menu_profile; QSI_HistorySession=https%3A%2F%2Fwww.fiverr.com%2Fusers%2Fbluebliss1997%2Fmanage_gigs~1729838310541%7Chttps%3A%2F%2Fwww.fiverr.com%2Fdarshanls%3Fup_rollout%3Dtrue~1729839156782%7Chttps%3A%2F%2Fwww.fiverr.com%2Fbluebliss1997%3Fup_rollout%3Dtrue~1734513615303%7Chttps%3A%2F%2Fwww.fiverr.com%2Fusers%2Fbluebliss1997%2Fedit%2Faccount~1734513653561%7Chttps%3A%2F%2Fwww.fiverr.com%2Falekyashastrula%3Fup_rollout%3Dtrue~1734529758964; last_content_pages_=gigs%7C%7C%7Cshow%7C%7C%7C401660658%3B; hp_view=seller; forterToken=f7fbf9be108347b6a2a48d4cc5f9a7ff_1734534609660_202_UAS9b_17ck',
      'if-none-match': 'W/"bad28-6nIcWnCM7/fFKKsIcaIGXR59SZ8"',
      'priority': 'u=0, i',
      'referer': 'https://www.google.com/',
      'sec-ch-ua': '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-user': '?1',
      'sec-gpc': '1',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
    },
    responseMatches: [{
      'type':'regex',
      'value':'{"username":(?<username>.*?),'
    }, {
      'type':'regex',
      'value':'"fullName":(?<fullName>.*?),'
    }],
    responseRedactions: [{
      'regex':'{"username":(.*?),'
    }, {
      'regex':'"fullName":(.*?),'
    }]