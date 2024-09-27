// For the user's own profile:
// - Firstname
// - Lastname
// - VanutyUrl
// - pfp
// - headline
// - company
// - position
// - location
// - about
// - experience
// - education


function findEducationSection() {
    const sections = document.querySelectorAll('section.artdeco-card.pv-profile-card');
    for (let section of sections) {
      const title = section.querySelector('.pvs-header__title');
      if (title && title.textContent.trim().toLowerCase().includes('education')) {
        return section;
      }
    }
    return null;
  }
  
  function grabEducationSection() {
    const waitForElement = setInterval(() => {
      const educationSection = findEducationSection();
  
      if (educationSection) {
        clearInterval(waitForElement);
  
        // console.log('Education Section Content:');
        // console.log(educationSection.innerText);
  
        // console.log('\nEducation Section HTML:');
        // console.log(educationSection.outerHTML);
  
        // Grab specific parts
        const title = educationSection.querySelector('.pvs-header__title');
        const educationList = educationSection.querySelector('ul');
  
        if (title) {
          console.log('\nEducation Title:');
          console.log(title.innerText);
        }
  
        if (educationList) {
          console.log('\nEducation Entries:');
          Array.from(educationList.children).forEach((item, index) => {
            console.log(`\nEntry ${index + 1}:`);
            console.log(item.innerText);
          });
        } else {
          console.log('No education list found.');
        }
      }
    }, 1000); // Check every second
  }
  
  // Run the function
  grabEducationSection();