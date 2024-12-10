(async function () {
  const fetchFollowers = async () => {
    const TWITTER_API_URL = 'https://x.com/i/api/graphql/Nlswx3noyVogs84uSY1Cuw/Followers';

    var variables = {
      userId: '849529057519828993',
      count: 20,
      includePromotedContent: false,
    };

    var cursor = null;
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

    var BEARER_TOKEN =
      'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

    var url =
      'https://x.com/i/api/graphql/eWTmcJY3EMh-dxIR7CYTKw/Following?variables=' +
      encodeURIComponent(JSON.stringify(variables)) +
      '&features=' +
      encodeURIComponent(JSON.stringify(features));

    var ct0 =
      '31e4b017edd6af0884c221708f0b53b4fc062ca9767fc09373360e57519a6ed45bc6d9f0c3993a229f0846934d77713d3b75d94baed046a675e4e1b2fcc7646bda4f2e603344e15e33d595be80585baf';

    return fetch(url, {
      headers: {
        accept: '*/*',
        authorization: 'Bearer ' + BEARER_TOKEN,
        'content-type': 'application/json',
        'x-csrf-token': ct0,
        'x-twitter-auth-type': 'OAuth2Session',
      },
      credentials: 'include',
    });
  };

  function extractUserNames(response) {
    try {
      const entries = response.data.user.result.timeline.timeline.instructions.find(
        (instruction) => instruction.type === 'TimelineAddEntries'
      ).entries;

      const users = entries
        .filter((entry) => entry.content?.itemContent?.itemType === 'TimelineUser')
        .map((entry) => {
          const user = entry.content.itemContent.user_results.result.legacy;
          return {
            displayName: user.name,
            username: user.screen_name,
            followersCount: user.followers_count,
            followingCount: user.friends_count,
          };
        });

      return users;
    } catch (error) {
      console.error('Error extracting usernames:', error);
      return [];
    }
  }

  // Call the function to fetch followers and pass the response to extractUserNames
  const response = await fetchFollowers();
  //   const users = await extractUserNames(response);
  console.log(response);
})();
