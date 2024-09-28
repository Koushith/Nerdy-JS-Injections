// For the user's own profile:
// - Firstname
// - Lastname
// - VanutyUrl
// - pfp 
// - headline
// - company - 
// - position
// - location - 
// - about - done
// - experience - done
// - education - done

//------------------------ Education Section ------------------------

function findEducationSection() {
 // console.log("Searching for education section...");

  // Method 1: Look for section with id="education"
  const sectionById = document.getElementById('education');
  if (sectionById) {
    console.log("Found section with id 'education'");
    return sectionById.closest('section');
  }

  // Method 2: Look for h2 with "Education" text
  const headers = document.querySelectorAll('h2');
  for (let header of headers) {
    if (header.textContent.trim().toLowerCase() === 'education') {
      console.log("Found h2 with 'Education' text");
      return header.closest('section');
    }
  }

  // Method 3: Look for specific class names
  const sectionByClass = document.querySelector('section.artdeco-card.pv-profile-card');
  if (sectionByClass) {
    const header = sectionByClass.querySelector('h2');
    if (header && header.textContent.trim().toLowerCase() === 'education') {
      console.log("Found section with specific class names and 'Education' header");
      return sectionByClass;
    }
  }

  console.log("Education section not found by any method");
  return null;
}

function grabEducationSection() {
  const educationSection = findEducationSection();

  if (!educationSection) {
    console.log('Education section not found');
    return;
  }

  console.log('Education section found:', educationSection);

  const educationData = {
    sectionTitle: 'Education',
    entries: []
  };

  // Grab education entries
  const educationList = educationSection.querySelector('ul');
  if (educationList) {
   // console.log('Found education list:', educationList);
    educationData.entries = Array.from(educationList.children).map((item, index) => {
     // console.log(`Processing education entry ${index + 1}:`, item);
      const entry = {
        school: '',
        degree: '',
        fieldOfStudy: '',
        dates: '',
        grade: ''
      };

      const schoolName = item.querySelector('.hoverable-link-text, .t-bold');
      const degreeInfo = item.querySelector('.t-14.t-normal');
      const dates = item.querySelector('.t-14.t-normal.t-black--light');
      const grade = item.querySelector('.inline-show-more-text--is-collapsed');

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
    });
  } else {
    console.log('Education list not found within the section');
  }

  console.log('Education Data:', JSON.stringify(educationData, null, 2));
}

// Immediately invoke the function
grabEducationSection();

//------------------------ Experience Section ------------------------

function findExperienceSection() {
    const sections = document.querySelectorAll('section.artdeco-card.pv-profile-card.break-words.mt2');
    for (let section of sections) {
        const title = section.querySelector('.pvs-header__title');
        if (title && title.textContent.trim().toLowerCase().includes('experience')) {
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
        sectionTitle: '',
        entries: []
    };

    // Grab section title
    const title = experienceSection.querySelector('.pvs-header__title');
    if (title) {
        experienceData.sectionTitle = title.innerText.trim();
    }

    // Grab experience entries
    const experienceList = experienceSection.querySelector('ul');
    if (experienceList) {
        experienceData.entries = Array.from(experienceList.children).map((item) => {
            const entry = {
                role: '',
                company: '',
                duration: '',
                details: []
            };

            const roleTitle = item.querySelector('.t-bold .visually-hidden');
            const company = item.querySelector('.t-normal .visually-hidden');
            const duration = item.querySelector('.t-normal.t-black--light .visually-hidden');
            
            if (roleTitle) entry.role = roleTitle.innerText.trim();
            if (company) entry.company = company.innerText.trim();
            if (duration) entry.duration = duration.innerText.trim();
            
            // Additional details (if any)
            const details = item.querySelectorAll('ul li .visually-hidden');
            if (details.length > 0) {
                entry.details = Array.from(details).map(detail => detail.innerText.trim());
            }

            return entry;
        });
    }

    console.log('Experience Data:', JSON.stringify(experienceData, null, 2));
    return experienceData;
}

// Run the function
grabExperienceSection();


//------------------------ About Section ------------------------

function findAboutSection() {
  const sections = document.querySelectorAll('section.artdeco-card.pv-profile-card.break-words.mt2');
  for (let section of sections) {
    const title = section.querySelector('.pvs-header__title');
    if (title && title.textContent.trim().toLowerCase().includes('about')) {
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
    sectionTitle: '',
    content: ''
  };

  // Grab section title
  const title = aboutSection.querySelector('.pvs-header__title');
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
    const expandButton = aboutSection.querySelector('button.inline-show-more-text__button');
    if (expandButton) {
      expandButton.click();
      // Wait a bit for the content to expand
      const expandedContent = aboutSection.querySelector('div[class*="full-width"]');
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
  return document.querySelector('section.artdeco-card.oOiNmELHyJKVstcfzxXSSfZRoxlbviGqc');
}

function grabHeroSection() {
  const waitForElement = setInterval(() => {
    const heroSection = findHeroSection();

    if (heroSection) {
      clearInterval(waitForElement);

      const heroData = {};

      // Name
      const nameElement = heroSection.querySelector('h1.text-heading-xlarge');
      if (nameElement) heroData.name = nameElement.innerText.trim();

      // Headline
      const headlineElement = heroSection.querySelector('.text-body-medium');
      if (headlineElement) heroData.headline = headlineElement.innerText.trim();

      // Location
      const locationElement = heroSection.querySelector('.text-body-small:not(.inline)');
      if (locationElement) heroData.location = locationElement.innerText.trim();

      // Profile Image
      const profileImageElement = heroSection.querySelector('.pv-top-card__photo-wrapper img');
      if (profileImageElement) heroData.profileImageUrl = profileImageElement.src;

      // Background Image
      const backgroundImageElement = heroSection.querySelector('.profile-background-image__image-container img');
      if (backgroundImageElement) heroData.backgroundImageUrl = backgroundImageElement.src;

      // Connections
      const connectionsElement = heroSection.querySelector('.t-bold');
      if (connectionsElement) heroData.connections = connectionsElement.innerText.trim();

      // Current Company
      const currentCompanyElement = heroSection.querySelector('.pvs-entity__caption-wrapper');
      if (currentCompanyElement) heroData.currentCompany = currentCompanyElement.innerText.trim();

      // Education
      const educationElement = heroSection.querySelectorAll('.pvs-entity__caption-wrapper')[1];
      if (educationElement) heroData.education = educationElement.innerText.trim();

      console.log('Hero Data:', JSON.stringify(heroData, null, 2));
      return heroData;
    }
  }, 1000); // Check every second

  setTimeout(() => {
    clearInterval(waitForElement);
    console.log("Hero section not found");
    return { error: "Hero section not found" };
  }, 10000); // Timeout after 10 seconds
}

// Usage example:
grabHeroSection();


//-----------------------------------


//------------------------ Licenses & Certifications Section ------------------------

function findLicensesCertificationsSection() {
  const sections = document.querySelectorAll('section.artdeco-card.pv-profile-card.break-words.mt2');
  for (let section of sections) {
    const title = section.querySelector('.pvs-header__title');
    if (title && title.textContent.trim().toLowerCase().includes('licenses & certifications')) {
      return section;
    }
  }
  return null;
}

function grabLicensesCertificationsSection() {
  const licensesCertificationsSection = findLicensesCertificationsSection();

  if (!licensesCertificationsSection) {
    return { sectionTitle: "Licenses & Certifications", entries: ["Section not found"] };
  }

  const licensesCertificationsData = {
    sectionTitle: '',
    entries: []
  };

  // Grab section title
  const title = licensesCertificationsSection.querySelector('.pvs-header__title');
  if (title) {
    licensesCertificationsData.sectionTitle = title.innerText.trim();
  }

  // Grab licenses & certifications entries
  const licensesCertificationsList = licensesCertificationsSection.querySelector('ul');
  if (licensesCertificationsList) {
    licensesCertificationsData.entries = Array.from(licensesCertificationsList.children).map(item => {
      const entry = {
        name: '',
        issuer: '',
        issueDate: '',
        expirationDate: '',
        credentialId: ''
      };

      const nameElement = item.querySelector('.t-bold .visually-hidden');
      const issuerElement = item.querySelector('.t-normal .visually-hidden');
      const dateElements = item.querySelectorAll('.t-normal.t-black--light .visually-hidden');
      const credentialIdElement = item.querySelector('.pv-certifications__credential-id');

      if (nameElement) entry.name = nameElement.innerText.trim();
      if (issuerElement) entry.issuer = issuerElement.innerText.trim();
      if (dateElements.length > 0) entry.issueDate = dateElements[0].innerText.trim();
      if (dateElements.length > 1) entry.expirationDate = dateElements[1].innerText.trim();
      if (credentialIdElement) entry.credentialId = credentialIdElement.innerText.trim();

      return entry;
    });
  }

  // If no entries found, add a message
  if (licensesCertificationsData.entries.length === 0) {
    licensesCertificationsData.entries.push("No licenses or certifications found");
  }

  return licensesCertificationsData;
}

// Usage example:
grabLicensesCertificationsSection();