function extractSellerInfo(doc) {
  const sellerCard = doc.querySelector('.seller-card');
  const userInfo = {};

  // Extracting online status
  const onlineIndicator = sellerCard.querySelector('.user-online-indicator');
  userInfo.onlineStatus = onlineIndicator ? onlineIndicator.textContent.trim() : 'Offline';

  // Extracting profile image
  const profileImage = sellerCard.querySelector('.profile-pict-img');
  userInfo.profileImage = profileImage ? profileImage.src : '';

  // Extracting username and display name
  const usernameElement = sellerCard.querySelector('.secondary-name');
  const displayNameElement = sellerCard.querySelector('.tbody-3.seller-link');
  userInfo.username = usernameElement ? usernameElement.textContent.trim() : '';
  userInfo.displayName = displayNameElement ? displayNameElement.textContent.trim() : '';

  // Extracting ratings
  const ratingElement = sellerCard.querySelector('.rating-score');
  const ratingsCountElement = sellerCard.querySelector('.rating-count-number');
  userInfo.rating = ratingElement ? parseFloat(ratingElement.textContent.trim()) : 0;
  userInfo.ratingsCount = ratingsCountElement ? parseInt(ratingsCountElement.textContent.trim()) : 0;

  // Extracting location and member since
  const stats = sellerCard.querySelectorAll('.user-stats li');
  stats.forEach((stat) => {
    const label = stat.querySelector('span') ? stat.querySelector('span').textContent.trim() : '';
    const value = stat.querySelector('b') ? stat.querySelector('b').textContent.trim() : '';
    if (label === 'From') {
      userInfo.location = value;
    } else if (label === 'Member since') {
      userInfo.memberSince = value;
    } else if (label === 'Avg. Response Time') {
      userInfo.avgResponseTime = value;
    } else if (label === 'Last Delivery') {
      userInfo.lastDelivery = value;
    }
  });

  // Extracting availability status
  const availabilityStatusElement = sellerCard.querySelector('.availability-status');
  userInfo.availabilityStatus = availabilityStatusElement
    ? availabilityStatusElement.textContent.trim()
    : 'Unavailable';

  return userInfo;
}

function extractActiveGigs() {
  const gigsContainer = document.querySelector('.gig-columns .gig-items');
  const gigs = [];

  // Check if gigsContainer exists before proceeding
  if (gigsContainer) {
    console.log('Gigs container found.'); // Debugging log
    const gigItems = gigsContainer.querySelectorAll('.gig-card-base');

    gigItems.forEach((item) => {
      const gigInfo = {
        gigId: item.getAttribute('data-gig-id'), // Gig ID
        gigTitle: item.querySelector('.gig-link-main h3')
          ? item.querySelector('.gig-link-main h3').textContent.trim()
          : '', // Gig Title
        gigPrice: item.querySelector('.gig-price a') ? item.querySelector('.gig-price a').textContent.trim() : '', // Gig Price
        gigRating: item.querySelector('.gig-rating strong')
          ? parseFloat(item.querySelector('.gig-rating strong').textContent.trim())
          : 0, // Gig Rating
        sellerName: item.querySelector('.seller-name') ? item.querySelector('.seller-name').textContent.trim() : '', // Seller Name
        sellerCountry: item.querySelector('.seller-country')
          ? item.querySelector('.seller-country').textContent.trim()
          : '', // Seller Country
        expertise: item.querySelector('.list-view-info p')
          ? item.querySelector('.list-view-info p').textContent.trim().replace('Expertise:', '').trim()
          : '', // Expertise
      };

      gigs.push(gigInfo);
    });
  } else {
    console.warn('No gigs container found in the document.');
  }

  console.log('Extracted active gigs:', gigs); // Debugging log
  return {
    gigs,
    totalGigs: gigs.length,
  };
}

function extractUserReviews() {
  const reviewsData = window.initialData['UserPageReviews']?.initialState?.buying_reviews?.reviews || [];
  const reviews = [];

  // Check if reviewsData exists and is an array
  if (Array.isArray(reviewsData) && reviewsData.length > 0) {
    console.log('Reviews data found.'); // Debugging log

    reviewsData.forEach((review) => {
      const reviewInfo = {
        reviewerName: review.username,
        reviewerCountry: review.reviewer_country,
        rating: review.value,
        reviewDate: new Date(review.created_at).toLocaleDateString(), // Format the date as needed
        description: review.comment,
        orderDuration: review.order_duration, // New field: Order Duration
        priceRange: review.order_price_range, // New field: Price Range
        isRepeatBuyer: review.repeat_buyer, // New field: Repeat Buyer Status
        gigTitle: review.gig_slug, // New field: Gig Title (using gig_slug as a placeholder)
        gigId: review.gig_id, // New field: Gig ID
      };

      reviews.push(reviewInfo);
    });
  } else {
    console.warn('No reviews data found.');
  }

  console.log('Extracted reviews:', reviews); // Debugging log
  return {
    reviews,
    totalReviews: reviews.length,
  };
}

async function fetchSellerPage() {
  try {
    const url = 'https://www.fiverr.com/alekyashastrula?up_rollout=true';

    const headers = {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-GB,en;q=0.5',
      'Cache-Control': 'max-age=0',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      // Add other headers as needed
    };

    const response = await fetch(url, { method: 'GET', headers });
    const html = await response.text();

    // Log the fetched HTML to check its structure
    console.log('html', html);

    // Parse the HTML and extract information
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Use the existing extraction functions on the parsed document
    const sellerInfo = extractSellerInfo(doc);
    const activeGigsInfo = extractActiveGigs();
    const userReviewsInfo = extractUserReviews();

    return {
      sellerInfo,
      activeGigsInfo,
      userReviewsInfo,
    };
  } catch (error) {
    console.error('Error fetching seller page:', error);
    return null;
  }
}

// Example usage
fetchSellerPage().then((data) => {
  console.log(data);
});
