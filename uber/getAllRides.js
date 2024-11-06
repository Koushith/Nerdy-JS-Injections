async function fetchAllTrips() {
  const allTrips = [];
  let nextPageToken = null;

  try {
    do {
      const response = await fetch('https://riders.uber.com/graphql', {
        method: 'POST',
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          'x-csrf-token': 'x',
        },
        body: JSON.stringify({
          operationName: 'Activities',
          variables: {
            includePast: true,
            includeUpcoming: true,
            limit: 100,
            orderTypes: ['RIDES', 'TRAVEL'],
            profileType: 'PERSONAL',
            nextPageToken: nextPageToken,
          },
          query:
            'query Activities($cityID: Int, $endTimeMs: Float, $includePast: Boolean = true, $includeUpcoming: Boolean = true, $limit: Int = 100, $nextPageToken: String, $orderTypes: [RVWebCommonActivityOrderType!] = [RIDES, TRAVEL], $profileType: RVWebCommonActivityProfileType = PERSONAL, $startTimeMs: Float) {\n  activities(cityID: $cityID) {\n    cityID\n    past(\n      endTimeMs: $endTimeMs\n      limit: $limit\n      nextPageToken: $nextPageToken\n      orderTypes: $orderTypes\n      profileType: $profileType\n      startTimeMs: $startTimeMs\n    ) @include(if: $includePast) {\n      activities {\n        ...RVWebCommonActivityFragment\n        __typename\n      }\n      nextPageToken\n      __typename\n    }\n    upcoming @include(if: $includeUpcoming) {\n      activities {\n        ...RVWebCommonActivityFragment\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment RVWebCommonActivityFragment on RVWebCommonActivity {\n  buttons {\n    isDefault\n    startEnhancerIcon\n    text\n    url\n    __typename\n  }\n  cardURL\n  description\n  imageURL {\n    light\n    dark\n    __typename\n  }\n  subtitle\n  title\n  uuid\n  __typename\n}\n',
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.data?.activities?.past?.activities) {
        throw new Error('Invalid response format');
      }

      const activities = data.data.activities.past.activities;
      allTrips.push(...activities);

      // Update nextPageToken to continue fetching if more data exists
      nextPageToken = data.data.activities.past.nextPageToken || null;
    } while (nextPageToken);

    return allTrips;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
}

// Usage
fetchAllTrips()
  .then((trips) => {
    console.log('total trips', trips.length);
  })
  .catch((error) => {
    console.error('Failed to fetch trips:', error);
  });
