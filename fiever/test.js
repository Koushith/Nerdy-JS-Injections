const userState = {
  username: null,
  userId: null,
};

function extractSellerInfo(html) {
  // Try to get data from script tag first
  const scriptMatch = html.match(/window\.initialData\['SellerCard'\]\s*=\s*({[\s\S]*?});/);
  const portfolioMatch = html.match(
    /window\.initialData\['PortfolioShowcase-PortfolioPresenceSelfview'\]\s*=\s*({[\s\S]*?});/
  );

  if (scriptMatch) {
    try {
      const data = JSON.parse(scriptMatch[1]);
      const user = data.user;
      const portfolioData = portfolioMatch ? JSON.parse(portfolioMatch[1]) : null;

      return {
        id: portfolioData?.seller?.id || null,
        onlineStatus: data.user.is_on_vacation ? 'Away' : 'Online',
        profileImage: user.profile_photo,
        username: user.username,
        displayName: user.display_name,
        rating: user.rating,
        reviewCount: user.ratings_count,
        location: user.country,
        memberSince: new Date(user.member_since * 1000).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        avgResponseTime: `${Math.round(user.response_time / 24)} days`,
        lastDelivery: user.recent_delivery,
        availabilityStatus: user.is_on_vacation ? 'Away' : 'Available',
      };
    } catch (error) {
      console.error('Error parsing script data:', error);
      // Fall back to HTML parsing if script parsing fails
    }
  }

  const userInfo = {};

  // Helper function to extract content between tags
  const getTextBetween = (str, startTag, endTag) => {
    const regex = new RegExp(`${startTag}(.*?)${endTag}`, 'is');
    const match = str.match(regex);
    return match ? match[1].trim() : '';
  };

  // Extract online status
  const onlineMatch = html.match(/<div class="user-online-indicator[^"]*"[^>]*>(.*?)<\/div>/i);
  userInfo.onlineStatus = onlineMatch ? onlineMatch[1].replace('<i class="dot">·</i>', '').trim() : 'Offline';

  // Extract profile image
  const profileImageMatch = html.match(/class="profile-pict-img"[^>]*src="([^"]+)"/i);
  userInfo.profileImage = profileImageMatch ? profileImageMatch[1] : '';

  // Extract username (from secondary-name)
  const usernameMatch = html.match(/<b class="secondary-name[^"]*">@([^<]+)<\/b>/i);
  userInfo.username = usernameMatch ? usernameMatch[1] : '';

  // Extract display name
  const displayNameMatch = html.match(/<button class="tbody-3 seller-link"[^>]*>([^<]+)<\/button>/i);
  userInfo.displayName = displayNameMatch ? displayNameMatch[1] : '';

  // Extract rating
  const ratingMatch = html.match(/<strong class="rating-score[^"]*">([0-9.]+)<\/strong>/i);
  userInfo.rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;

  // Extract review count
  const reviewCountMatch = html.match(/<span class="rating-count-number">([^<]+)<\/span>/i);
  userInfo.reviewCount = reviewCountMatch ? reviewCountMatch[1] : '0';

  // Extract location
  const locationMatch = html.match(
    /<li class="location">[^<]*<span>[^<]*<[^>]+>[^<]*<\/span>From<\/span><b>([^<]+)<\/b>/i
  );
  userInfo.location = locationMatch ? locationMatch[1].trim() : '';

  // Extract member since
  const memberSinceMatch = html.match(
    /<li class="member-since">[^<]*<span>[^<]*<[^>]+>[^<]*<\/span>Member since<\/span><b>([^<]+)<\/b>/i
  );
  userInfo.memberSince = memberSinceMatch ? memberSinceMatch[1].trim() : '';

  // Extract response time
  const responseTimeMatch = html.match(
    /<li class="response-time">[^<]*<span>[^<]*<[^>]+>[^<]*<\/span>Avg\. Response Time<\/span><b>([^<]+)<\/b>/i
  );
  userInfo.avgResponseTime = responseTimeMatch ? responseTimeMatch[1].trim() : '';

  // Extract last delivery
  const lastDeliveryMatch = html.match(
    /<li class="recent-delivery">[^<]*<span>[^<]*<[^>]+>[^<]*<\/span>Last Delivery<\/span><strong>([^<]+)<\/strong>/i
  );
  userInfo.lastDelivery = lastDeliveryMatch ? lastDeliveryMatch[1].trim() : '';

  // Extract availability status
  const availabilityMatch = html.match(/<span class="availability-status[^"]*">([^<]*)<\/span>/i);
  userInfo.availabilityStatus = availabilityMatch ? availabilityMatch[1].trim() : 'Unavailable';

  return userInfo;
}

function extractReviews(html) {
  const reviews = [];

  // Find the reviews data in script tag
  const scriptMatch = html.match(/document\.reviewsPrefetched\s*=\s*({[\s\S]*?});/);
  if (!scriptMatch) return reviews;

  try {
    const reviewsData = JSON.parse(scriptMatch[1]);
    const buyingReviews = reviewsData.buying_reviews?.reviews || [];

    buyingReviews.forEach((review) => {
      reviews.push({
        reviewerName: review.username,
        country: {
          name: review.reviewer_country,
          code: review.reviewer_country_code,
        },
        rating: review.value,
        time: review.created_at,
        text: review.comment,
        language: review.comment_language,
        metrics: {
          communication: review.star_summary?.communication_valuation || null,
          quality: review.star_summary?.quality_of_delivery_valuation || null,
          value: review.star_summary?.value_for_money_valuation || null,
        },
        orderDetails: {
          id: review.encrypted_order_id,
          duration: {
            display: review.order_duration,
            days: review.order_duration_in_days,
          },
          priceRange: {
            local: review.order_price_range,
            usd: review.order_price_range_usd,
            range: {
              start: review.price_range_start,
              end: review.price_range_end,
            },
          },
          isRepeatBuyer: review.repeat_buyer,
          isBusiness: review.is_business,
          isCancelled: review.is_cancelled_order,
        },
        gigInfo: {
          id: review.gig_id,
          slug: review.gig_slug,
          category: {
            main: review.gig_category,
            sub: review.gig_sub_category,
            nested: review.gig_nested_sub_category,
          },
        },
        relevancy: {
          score: review.relevancy_score,
          original: review.original_relevancy_score,
        },
        reviewerStats: {
          reviewsAsBuyer: review.reviews_count_as_buyer,
          industry: review.reviewer_industry,
        },
      });
    });
  } catch (error) {
    console.error('Error parsing reviews data:', error);
  }

  return reviews;
}

// Function to initialize user info
async function initializeUserInfo() {
  try {
    const response = await fetch('https://www.fiverr.com/seller_dashboard', {
      credentials: 'include',
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
      },
    });

    const html = await response.text();

    // Try to extract from Header script first
    const headerMatch = html.match(/window\.initialData\.Header\s*=\s*({[\s\S]*?});/);

    if (headerMatch) {
      const headerData = JSON.parse(headerMatch[1]);
      if (headerData.user) {
        userState.username = headerData.user.username;
        userState.userId = headerData.user.id;
        return {
          username: userState.username,
          userId: userState.userId,
        };
      }
    }

    // Fallback to Portfolio showcase script
    const portfolioMatch = html.match(
      /window\.initialData\['PortfolioShowcase-PortfolioPresenceSelfview'\]\s*=\s*({[\s\S]*?});/
    );

    if (portfolioMatch) {
      const data = JSON.parse(portfolioMatch[1]);
      userState.username = data.seller?.username;
      userState.userId = data.seller?.id;
      return {
        username: userState.username,
        userId: userState.userId,
      };
    }
  } catch (error) {
    console.error('Error initializing user info:', error);
  }
}

// Modified extractGigs to use global user state
async function extractGigs() {
  try {
    if (!userState.userId || !userState.username) {
      await initializeUserInfo();
    }

    const response = await fetch(
      `https://www.fiverr.com/gigs/gigs_as_json_for_user?user_id=${userState.userId}&id=${userState.username}&limit=50&page=1&filter_logo_gigs=true`,
      {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'en-GB,en;q=0.5',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    );

    const data = await response.json();
    const gigs = data.gigs.map((gig) => ({
      title: gig.title_full,
      link: `https://www.fiverr.com${gig.gig_url}`,
      price: gig.price,
      rating: gig.rating,
      rating_count: gig.rating_count,
      created_at: gig.gig_created,
      updated_at: gig.gig_updated,
      image: gig.image_data?.cloud_photo_url,
      category: gig.category,
      sub_category: gig.sub_category,
      packages: gig.packages.map((pkg) => ({
        title: pkg.title,
        description: pkg.description,
        duration: pkg.duration,
        duration_unit: pkg.duration_unit,
        price: pkg.price,
      })),
      metadata: gig.metadata,
    }));

    return {
      gigs,
      totalActive: gigs.length,
    };
  } catch (error) {
    console.error('Error fetching gigs:', error);
    return {
      gigs: [],
      totalActive: 0,
    };
  }
}

async function fetchSellerPage() {
  try {
    // Initialize user info when the script loads
    await initializeUserInfo();

    console.log('fetching seller page', userState.username);
    const response = await fetch(`https://www.fiverr.com/${userState.username}?up_rollout=true`, {
      credentials: 'include',
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-language': 'en-GB,en;q=0.5',
        'cache-control': 'max-age=0',
        'if-none-match': 'W/"e082aa4267fb5889060ab8813cc3ee3a"',
        priority: 'u=0, i',
        referer: 'https://www.fiverr.com',
        'sec-ch-ua': '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      },
    });
    const html = await response.text();

    const sellerInfo = extractSellerInfo(html);
    const reviews = extractReviews(html);
    const gigInfo = await extractGigs();

    return {
      sellerInfo,
      reviews,
      gigs: gigInfo,
    };
  } catch (error) {
    console.error('Error fetching seller page:', error);
    return null;
  }
}

// Replace the immediate function call with an async function
async function getFieverSellerData() {
  try {
    const data = await fetchSellerPage();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error getting seller data:', error);
    return null;
  }
}

// Replace setInterval with immediate async execution

if (window.location.href === 'https://www.fiverr.com/') {
  window.location.href = 'https://www.fiverr.com/seller_dashboard';
} else if (window.location.href === 'https://www.fiverr.com/seller_dashboard') {
  setInterval(async () => {
    try {
      // Check if provider data exists
      if (!window.payloadData) {
        return;
      }
      // Check if already injected
      if (window.injected) {
        return;
      }

      window.injected = true;

      const sellerInfo = await getFieverSellerData();

      const rd = {
        url: 'https://www.fiverr.com/seller_dashboard',
        cookies: '',
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-language': 'en-US,en;q=0.9',
          'if-none-match': 'W/"bc42a-gdQi4IwpBzXejOUdhILhHDwdNNU"',
          priority: 'u=0, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          referrer: 'https://www.fiverr.com/inbox/darshanls',
          referrerPolicy: 'strict-origin-when-cross-origin',
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        },
        method: 'GET',
        requestBody: '',
        responseBody: 'response',
        extractedParams: {
          username: '', // can be empty or add any arbitary value (if the responseMatch type is regex and no template literals are used)
        },
        geoLocation: window.payloadData.geoLocation,
        responseMatches: [
          {
            type: 'regex',
            value: '{"username":(?<username>.*?),',
          },
        ],
        responseRedactions: [
          {
            regex: '{"username":(?<username>.*?),',
          },
        ],
        witnessParameters: { ...window.payloadData.parameters },
      };

      if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
        window.flutter_inappwebview.callHandler('publicData', JSON.stringify({ sellerInfo }));
        // wait for 1 second
        await new Promise((resolve) => setTimeout(resolve, 100));
        window.flutter_inappwebview.callHandler('extractedData', JSON.stringify(rd));
        window.injected = true;
      }
    } catch (e) {
      console.error('Injection error:', e);
    }
  }, 1000);
}
