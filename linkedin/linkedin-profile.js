// For the user's own profile:
// - Firstname
// - Lastname
// - pfp
// - headline
// - company -
// - position
// - location -
// - about - done
// - experience - done
// - education - done

//------------------------ Modal Function ------------------------

function modal() {
  let modal = document.createElement("div");
  modal.id = "proofGenerationModal";
  modal.style.display = "none";
  modal.style.position = "fixed";
  modal.style.zIndex = "1";
  modal.style.paddingTop = "100px";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.overflow = "auto";
  modal.style.backgroundColor = "rgb(0,0,0)";
  modal.style.backgroundColor = "rgba(0,0,0,0.4)";
  modal.innerHTML =
    '<div style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;"><h3 style="text-align: center; padding-bottom: 20px">Fetching data</h3><p style="text-align: center;">Please wait while we fetch your profile data</p></div>';
  document.body.appendChild(modal);
  document.getElementById("proofGenerationModal").style.display = "block";
}

//------------------------ Education Section ------------------------

function findEducationSection() {
  // console.log("Searching for education section...");

  // Method 1: Look for section with id="education"
  const sectionById = document.getElementById("education");
  if (sectionById) {
    console.log("Found section with id 'education'");
    return sectionById.closest("section");
  }

  // Method 2: Look for h2 with "Education" text
  const headers = document.querySelectorAll("h2");
  for (let header of headers) {
    if (header.textContent.trim().toLowerCase() === "education") {
      console.log("Found h2 with 'Education' text");
      return header.closest("section");
    }
  }

  // Method 3: Look for specific class names
  const sectionByClass = document.querySelector(
    "section.artdeco-card.pv-profile-card"
  );
  if (sectionByClass) {
    const header = sectionByClass.querySelector("h2");
    if (header && header.textContent.trim().toLowerCase() === "education") {
      console.log(
        "Found section with specific class names and 'Education' header"
      );
      return sectionByClass;
    }
  }

  console.log("Education section not found by any method");
  return null;
}

function grabEducationSection() {
  const educationSection = findEducationSection();

  if (!educationSection) {
    console.log("Education section not found");
    return;
  }

  //console.log('Education section found:', educationSection);

  const educationData = {
    sectionTitle: "Education",
    entries: [],
  };

  // Grab education entries
  const educationList = educationSection.querySelector("ul");
  if (educationList) {
    // console.log('Found education list:', educationList);
    educationData.entries = Array.from(educationList.children).map(
      (item, index) => {
        // console.log(`Processing education entry ${index + 1}:`, item);
        const entry = {
          school: "",
          degree: "",
          fieldOfStudy: "",
          dates: "",
          grade: "",
        };

        const schoolName = item.querySelector(".hoverable-link-text, .t-bold");
        const degreeInfo = item.querySelector(".t-14.t-normal");
        const dates = item.querySelector(".t-14.t-normal.t-black--light");
        const grade = item.querySelector(
          ".inline-show-more-text--is-collapsed"
        );

        if (schoolName) entry.school = schoolName.textContent.trim();
        if (degreeInfo) {
          const degreeText = degreeInfo.textContent.trim();
          const degreeMatch = degreeText.match(/(.*?),\s*(.*)/);
          if (degreeMatch) {
            entry.degree = degreeMatch[1].trim();
            entry.fieldOfStudy = degreeMatch[2].trim();
          } else {
            entry.degree = degreeText;
          }
        }
        if (dates) entry.dates = dates.textContent.trim();
        if (grade) entry.grade = grade.textContent.trim();

        return entry;
      }
    );
  } else {
    console.log("Education list not found within the section");
  }

  // console.log('Education Data:', JSON.stringify(educationData, null, 2));
  return educationData;
}

// Immediately invoke the function
grabEducationSection();

//------------------------ Experience Section ------------------------

function findExperienceSection() {
  const sections = document.querySelectorAll(
    "section.artdeco-card.pv-profile-card.break-words.mt2"
  );
  for (let section of sections) {
    const title = section.querySelector(".pvs-header__title");
    if (
      title &&
      title.textContent.trim().toLowerCase().includes("experience")
    ) {
      return section;
    }
  }
  return null;
}

function grabExperienceSection() {
  const experienceSection = findExperienceSection();

  if (!experienceSection) {
    console.log("Experience section not found");
    return { sectionTitle: "Experience", entries: [] };
  }

  const experienceData = {
    sectionTitle: "",
    entries: [],
  };

  // Grab section title
  const title = experienceSection.querySelector(".pvs-header__title");
  if (title) {
    experienceData.sectionTitle = title.innerText.trim();
  }

  // Grab experience entries
  const experienceList = experienceSection.querySelector("ul");
  if (experienceList) {
    experienceData.entries = Array.from(experienceList.children).map((item) => {
      const details = item.querySelectorAll(".visually-hidden");
      const detailsArray = Array.from(details).map((detail) =>
        detail.innerText.trim()
      );

      const entry = {
        company: detailsArray[0] || "",
        duration: detailsArray[1] || "",
        location: detailsArray[2] || "",
        role: detailsArray[3] || "",
        details: detailsArray[8] || "",
      };

      // Check if there are multiple roles
      if (detailsArray.length > 9) {
        entry.roles = [];
        for (let i = 3; i < detailsArray.length; i += 3) {
          if (detailsArray[i] && detailsArray[i + 1] && detailsArray[i + 2]) {
            entry.roles.push({
              title: detailsArray[i],
              duration: detailsArray[i + 1],
              location: detailsArray[i + 2],
            });
          }
        }
      }

      return entry;
    });
  }

  return experienceData;
}

// Run the function
grabExperienceSection();

//------------------------ About Section ------------------------

function findAboutSection() {
  const sections = document.querySelectorAll(
    "section.artdeco-card.pv-profile-card.break-words.mt2"
  );
  for (let section of sections) {
    const title = section.querySelector(".pvs-header__title");
    if (title && title.textContent.trim().toLowerCase().includes("about")) {
      return section;
    }
  }
  return null;
}

function grabAboutSection() {
  const aboutSection = findAboutSection();

  if (!aboutSection) {
    return { sectionTitle: "About", content: "Section not found" };
  }

  const aboutData = {
    sectionTitle: "",
    content: "",
  };

  // Grab section title
  const title = aboutSection.querySelector(".pvs-header__title");
  if (title) {
    aboutData.sectionTitle = title.innerText.trim();
  }

  // Grab about content
  const contentElement = aboutSection.querySelector('div[class*="full-width"]');
  if (contentElement) {
    aboutData.content = contentElement.innerText.trim();
  }

  // Try to expand the content if it's collapsed
  if (!aboutData.content) {
    const expandButton = aboutSection.querySelector(
      "button.inline-show-more-text__button"
    );
    if (expandButton) {
      expandButton.click();
      // Wait a bit for the content to expand
      const expandedContent = aboutSection.querySelector(
        'div[class*="full-width"]'
      );
      if (expandedContent) {
        aboutData.content = expandedContent.innerText.trim();
      }
    }
  }

  return aboutData;
}

// Usage example:
grabAboutSection();

//------------------------ Hero Section ------------------------

function findHeroSection() {
  return document.querySelector(
    "section.artdeco-card.oOiNmELHyJKVstcfzxXSSfZRoxlbviGqc"
  );
}

function grabHeroSection() {
  return new Promise((resolve) => {
    const waitForElement = setInterval(() => {
      const heroSection = findHeroSection();

      if (heroSection) {
        clearInterval(waitForElement);

        const heroData = {};

        // Name
        const nameElement = heroSection.querySelector("h1.text-heading-xlarge");
        if (nameElement) heroData.name = nameElement.innerText.trim();

        // Headline
        const headlineElement = heroSection.querySelector(".text-body-medium");
        if (headlineElement)
          heroData.headline = headlineElement.innerText.trim();

        // Location
        const locationElement = heroSection.querySelector(
          ".text-body-small:not(.inline)"
        );
        if (locationElement)
          heroData.location = locationElement.innerText.trim();

        // Profile Image
        const profileImageElement = heroSection.querySelector(
          ".pv-top-card__photo-wrapper img"
        );
        if (profileImageElement)
          heroData.profileImageUrl = profileImageElement.src;

        // Background Image
        const backgroundImageElement = heroSection.querySelector(
          ".profile-background-image__image-container img"
        );
        if (backgroundImageElement)
          heroData.backgroundImageUrl = backgroundImageElement.src;

        // Connections
        const connectionsElement = heroSection.querySelector(".t-bold");
        if (connectionsElement)
          heroData.connections = connectionsElement.innerText.trim();

        // Current Company
        const currentCompanyElement = heroSection.querySelector(
          ".pvs-entity__caption-wrapper"
        );
        if (currentCompanyElement)
          heroData.currentCompany = currentCompanyElement.innerText.trim();

        // Education
        const educationElement = heroSection.querySelectorAll(
          ".pvs-entity__caption-wrapper"
        )[1];
        if (educationElement)
          heroData.education = educationElement.innerText.trim();

        resolve(heroData);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(waitForElement);
      console.log("Hero section not found");
      resolve({ error: "Hero section not found" });
    }, 10000);
  });
}

// Usage example:
grabHeroSection();

//-----------------------------------

//------------------------ Licenses & Certifications Section ------------------------

function findLicensesCertificationsSection() {
  const sections = document.querySelectorAll(
    "section.artdeco-card.pv-profile-card.break-words.mt2"
  );
  for (let section of sections) {
    const title = section.querySelector(".pvs-header__title");
    if (
      title &&
      title.textContent
        .trim()
        .toLowerCase()
        .includes("licenses & certifications")
    ) {
      return section;
    }
  }
  return null;
}

function grabLicensesCertificationsSection() {
  const licensesCertificationsSection = findLicensesCertificationsSection();

  if (!licensesCertificationsSection) {
    return {
      sectionTitle: "Licenses & Certifications",
      entries: ["Section not found"],
    };
  }

  const licensesCertificationsData = {
    sectionTitle: "",
    entries: [],
  };

  // Grab section title
  const title =
    licensesCertificationsSection.querySelector(".pvs-header__title");
  if (title) {
    licensesCertificationsData.sectionTitle = title.innerText.trim();
  }

  // Grab licenses & certifications entries
  const licensesCertificationsList =
    licensesCertificationsSection.querySelector("ul");
  if (licensesCertificationsList) {
    licensesCertificationsData.entries = Array.from(
      licensesCertificationsList.children
    ).map((item) => {
      const entry = {
        name: "",
        issuer: "",
        issueDate: "",
        expirationDate: "",
        credentialId: "",
      };

      const nameElement = item.querySelector(".t-bold .visually-hidden");
      const issuerElement = item.querySelector(".t-normal .visually-hidden");
      const dateElements = item.querySelectorAll(
        ".t-normal.t-black--light .visually-hidden"
      );
      const credentialIdElement = item.querySelector(
        ".pv-certifications__credential-id"
      );

      if (nameElement) entry.name = nameElement.innerText.trim();
      if (issuerElement) entry.issuer = issuerElement.innerText.trim();
      if (dateElements.length > 0)
        entry.issueDate = dateElements[0].innerText.trim();
      if (dateElements.length > 1)
        entry.expirationDate = dateElements[1].innerText.trim();
      if (credentialIdElement)
        entry.credentialId = credentialIdElement.innerText.trim();

      return entry;
    });
  }

  // If no entries found, add a message
  if (licensesCertificationsData.entries.length === 0) {
    licensesCertificationsData.entries.push(
      "No licenses or certifications found"
    );
  }

  return licensesCertificationsData;
}

// Usage example:
grabLicensesCertificationsSection();

//------------------------ Function Calls ------------------------

// Run all the grabbing functions
async function runAllFunctions() {
  const educationData = await grabEducationSection();
  const experienceData = await grabExperienceSection();
  const aboutData = await grabAboutSection();
  const heroData = await grabHeroSection();
  const licensesCertificationsData = await grabLicensesCertificationsSection();

  const profileData = {
    education: educationData,
    experience: experienceData,
    about: aboutData,
    hero: heroData,
    licensesCertifications: licensesCertificationsData,
  };

  // console.log('Full Profile Data:', JSON.stringify(profileData, null, 2));
  return profileData;
}

// Call the function to run all grab functions and log the results

//------------------------ Reclaim push ------------------------

let dataCollected = false;

async function fetchLinkedInData() {
  if (dataCollected) return; // Stop if data has already been collected

  try {
    if (window.location.href.includes("https://www.linkedin.com/feed/")) {
      alert("On LinkedIn feed page. Attempting to navigate to profile...");
      console.log(
        "On LinkedIn feed page. Attempting to navigate to profile..."
      );
      const profileLink = document.querySelector(
        "a.profile-card-profile-picture-container"
      );
      if (profileLink) {
        console.log("Profile link found. Clicking to navigate to profile...");
        profileLink.click();
        // Wait for the profile page to load
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust the timeout as needed
        // Now run the data collection functions
        const data = await runAllFunctions();
        console.log("Final Profile Data------------------------------:", data);
        window.reclaimFetchInjected = true;
        window.flutter_inappwebview.callHandler(
          "publicData",
          JSON.stringify({ data })
        );
        dataCollected = true; // Mark data as collected

        window.location.href = "https://www.linkedin.com/dashboard/";

        clearInterval(intervalId); // Stop the interval
        // Add any additional processing or data sending logic here
      } else {
        console.log("Profile link not found on feed page.");
      }
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function fetchDataInterval() {
  fetchLinkedInData().catch((error) =>
    console.error("Error in fetchDataInterval:", error)
  );
}

const intervalId = setInterval(fetchDataInterval, 2500);
