function extractStravaStats() {
  const stats = {
    athlete: {
      name: document.querySelector('.athlete-name')?.textContent?.trim() || '',
      joinDate: document.querySelector('.athlete-name')?.getAttribute('title')?.replace('Member Since: ', '') || '',
      location: document.querySelector('.location')?.textContent?.trim() || '',
    },
  };

  const sports = ['ride', 'workout', 'run', 'swim'];

  sports.forEach((sport, index) => {
    // Select the container for each sport type
    const sportContainer = document.querySelector(`.sport-${index}`);
    if (!sportContainer) return;

    stats[sport] = {
      last4Weeks: {
        activitiesPerWeek: getNumericValue(sportContainer, 'Activities / Week'),
        distancePerWeek: getTextValue(sportContainer, 'Avg Distance / Week'),
        timePerWeek: getTextValue(sportContainer, 'Avg Time / Week'),
        elevGainPerWeek: getTextValue(sportContainer, 'Elev Gain / Week'),
      },
      ytd: {
        activities: getNumericValue(sportContainer, 'Activities', 'ytd'),
        distance: getTextValue(sportContainer, 'Distance', 'ytd'),
        time: getTextValue(sportContainer, 'Time', 'ytd'),
        elevGain: getTextValue(sportContainer, 'Elev Gain', 'ytd'),
      },
      allTime: {
        activities: getNumericValue(sportContainer, 'Activities', 'all-time'),
        distance: getTextValue(sportContainer, 'Distance', 'all-time'),
        time: getTextValue(sportContainer, 'Time', 'all-time'),
        elevGain: getTextValue(sportContainer, 'Elev Gain', 'all-time'),
      },
    };

    // Add best efforts for rides specifically
    if (sport === 'ride') {
      stats[sport].bestEfforts = {};
      sportContainer.querySelectorAll('tr').forEach((row) => {
        const label = row.querySelector('td:first-child')?.textContent;
        const valueElement = row.querySelector('td:last-child a');
        if (label && valueElement) {
          stats[sport].bestEfforts[label.trim()] = {
            value: valueElement.textContent.trim(),
            link: valueElement.href,
          };
        }
      });
    }
  });

  return stats;
}

// Helper function to get numeric values
function getNumericValue(container, label, section = '') {
  const row = findRow(container, label, section);
  const value = row?.querySelector('td:last-child')?.textContent;
  return value ? parseInt(value, 10) : 0;
}

// Helper function to get text values
function getTextValue(container, label, section = '') {
  const row = findRow(container, label, section);
  return row?.querySelector('td:last-child')?.textContent?.trim() || '0';
}

// Helper function to find the correct row based on section
function findRow(container, label, section = '') {
  let rows = container.querySelectorAll('tr');
  if (section === 'ytd') {
    rows = container.querySelector('#sport-\\d+-ytd')?.querySelectorAll('tr') || [];
  }
  return Array.from(rows).find((row) => row.querySelector('td:first-child')?.textContent.trim() === label);
}

async function navigateToProfile() {
  // Click the menu button
  const menuButton = document.querySelector('[aria-controls="container-nav"]');
  menuButton?.click();

  // Wait a brief moment for the menu to open
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find and click the profile link
  const profileLink = document.querySelector('a[href*="/athletes/"][href$="413"]');
  if (profileLink) {
    // Add event listener before clicking to handle the navigation
    return new Promise((resolve) => {
      window.addEventListener(
        'load',
        () => {
          resolve();
        },
        { once: true }
      ); // Use once: true to ensure the listener is removed after execution

      profileLink.click();
    });
  }
}

const checkForProfile = () => {
  const data = extractStravaStats();
  alert('witness call');
  console.log('data', data);
  window.flutter_inappwebview.callHandler('publicData', JSON.stringify({ data })); // append to public data

  const res = {
    extravtedParams: {
      firstName: 'test',
      lastName: 'test',
    },
    responseSelections: window.payloadData.responseSelections,
    geoLocation: window.payloadData.geoLocation,
    responseRedactions: {
      xPath: 'test',
      jsonPath: 'test',
    },
    responseMatches: window.payloadData.responseSelections.map((i) => {
      return { value: i.responseMatch, type: 'regex' };
    }),
    witnessParameters: { ...window.payloadData.parameters },
  };

  window.flutter_inappwebview.callHandler('extractedData', JSON.stringify(res)); // witness call/. works only if there is a match
};

setTimeout(() => {
  checkForProfile();
}, 3000);
