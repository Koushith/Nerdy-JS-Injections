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
    '<div style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;"><h3 style="text-align: center; padding-bottom: 20px">Fetching data</h3><p style="text-align: center;">Please wait while we fetch Following List</p></div>';
  document.body.appendChild(modal);
  document.getElementById('proofGenerationModal').style.display = 'block';
}

var BEARER_TOKEN =
  'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

function getUserIdFromCookie() {
  var twidCookie = getCookie('twid');
  if (!twidCookie) {
    return null;
  }

  // Decode the URI component first
  var decodedCookie = decodeURIComponent(twidCookie);
  // Extract userId from 'u=123456' format
  var match = decodedCookie.match(/u=(\d+)/);
  return match ? match[1] : null;
}

function getFollowingList(limit) {
  if (!limit) limit = 1000;
  var ct0 = getCookie('ct0');
  var userId = getUserIdFromCookie();

  if (!userId) {
    return Promise.reject('User ID not found in cookies. Please login first.');
  }

  var following = [];
  var cursor = null;
  var hasMoreUsers = true;

  function fetchFollowing() {
    if (!hasMoreUsers || (cursor === null && following.length > 0)) {
      return Promise.resolve(following);
    }

    var variables = {
      userId: userId,
      count: 20,
      includePromotedContent: false,
    };

    if (cursor) {
      variables.cursor = cursor;
    }

    var features = {
      rweb_tipjar_consumption_enabled: true,
      responsive_web_graphql_exclude_directive_enabled: true,
      verified_phone_label_enabled: true,
      creator_subscriptions_tweet_preview_api_enabled: true,
      responsive_web_graphql_timeline_navigation_enabled: true,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      communities_web_enable_tweet_community_results_fetch: true,
      c9s_tweet_anatomy_moderator_badge_enabled: true,
      articles_preview_enabled: true,
      responsive_web_edit_tweet_api_enabled: true,
      graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
      view_counts_everywhere_api_enabled: true,
      longform_notetweets_consumption_enabled: true,
      responsive_web_twitter_article_tweet_consumption_enabled: true,
      tweet_awards_web_tipping_enabled: false,
      creator_subscriptions_quote_tweet_preview_enabled: false,
      freedom_of_speech_not_reach_fetch_enabled: true,
      standardized_nudges_misinfo: true,
      tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
      rweb_video_timestamps_enabled: true,
      longform_notetweets_rich_text_read_enabled: true,
      longform_notetweets_inline_media_enabled: true,
      responsive_web_enhance_cards_enabled: false,
    };

    var url =
      'https://x.com/i/api/graphql/eWTmcJY3EMh-dxIR7CYTKw/Following?variables=' +
      encodeURIComponent(JSON.stringify(variables)) +
      '&features=' +
      encodeURIComponent(JSON.stringify(features));

    return fetch(url, {
      headers: {
        accept: '*/*',
        authorization: 'Bearer ' + BEARER_TOKEN,
        'content-type': 'application/json',
        'x-csrf-token': ct0,
        'x-twitter-auth-type': 'OAuth2Session',
      },
      credentials: 'include',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var instructions = data.data.user.result.timeline.timeline.instructions;
        var timelineEntries = instructions.find(function (instruction) {
          return instruction.type === 'TimelineAddEntries';
        });

        if (!timelineEntries || !timelineEntries.entries) {
          hasMoreUsers = false;
          return following;
        }

        var entries = timelineEntries.entries;
        var foundUsersInCurrentBatch = false;
        cursor = null;

        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];

          if (
            entry.content &&
            entry.content.entryType === 'TimelineTimelineItem' &&
            entry.content.itemContent &&
            entry.content.itemContent.user_results &&
            entry.content.itemContent.user_results.result
          ) {
            foundUsersInCurrentBatch = true;
            var user = entry.content.itemContent.user_results.result;
            var legacy = user.legacy;

            var parsedUser = {
              id: user.rest_id,
              name: legacy.name,
              screen_name: legacy.screen_name,
              description: legacy.description,
              followers_count: legacy.followers_count,
              following_count: legacy.friends_count,
              profile_image_url: legacy.profile_image_url_https,
              profile_banner_url: legacy.profile_banner_url,
              location: legacy.location,
              url: legacy.url,
              created_at: legacy.created_at,
              verified: legacy.verified,
              is_blue_verified: user.is_blue_verified,
              media_count: legacy.media_count,
              statuses_count: legacy.statuses_count,
            };
            following.push(parsedUser);
          }

          if (
            entry.content &&
            entry.content.entryType === 'TimelineTimelineCursor' &&
            entry.content.cursorType === 'Bottom'
          ) {
            cursor = entry.content.value;
          }
        }

        hasMoreUsers = foundUsersInCurrentBatch && cursor !== null;

        if (hasMoreUsers) {
          return fetchFollowing();
        }

        return following;
      })
      .catch(function (error) {
        console.error('Error fetching following:', error);
        hasMoreUsers = false;
        return following;
      });
  }

  return fetchFollowing();
}

function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

async function fetchProfile() {
  try {
    modal();
    const list = await getFollowingList();
    console.log(list);

    try {
      console.log('list', list);
      window.reclaimFetchInjected = true;
      window.flutter_inappwebview.callHandler('publicData', JSON.stringify({ list }));
    } catch (error) {
      alert(error);
    }
  } catch (error) {
    alert(error);
  }
  window.location.href = 'https://x.com/i/bookmarks';
}

setInterval(fetchProfile, 2500);
