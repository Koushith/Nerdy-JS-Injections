function getFullName() {
    try {
        let e = document.getElementsByClassName("bg-color-background-container mx-2 mt-2 mb-1"),
            t = e[0].getElementsByClassName("text-color-text heading-large");
        if (t.length > 0) {
            let l = t[0].innerText;
            return console.log(l), l
        }
        return null
    } catch (o) {
        return console.log("Error in getFullName", o), null
    }
}

function getHeadline() {
    try {
        let e = document.getElementsByClassName("bg-color-background-container mx-2 mt-2 mb-1"),
            t = e[0].getElementsByClassName("body-small text-color-text");
        if (t.length > 0) {
            let l = t[0].innerText;
            return console.log(l), l
        }
        return null
    } catch (o) {
        return console.log("Error in getHeadline", o), null
    }
}

function getLocationData() {
    try {
        let e = document.getElementsByClassName("bg-color-background-container mx-2 mt-2 mb-1"),
            t = e[0].getElementsByClassName("body-small text-color-text-low-emphasis");
        if (t.length > 0) {
            let l = "";
            for (let o = 0; o < t.length; o++) l += t[o].innerText + " ";
            return console.log(l), l
        }
        return null
    } catch (r) {
        return console.log("Error in getLocationData", r), null
    }
}

function getAboutInfo() {
    try {
        let e = document.getElementsByClassName("relative about-section bg-color-background-container p-2 pr-0 mt-1"),
            t = e[0].getElementsByClassName("body-small text-color-text whitespace-pre-line description truncated");
        if (t.length > 0) {
            let l = t[0].innerText;
            return console.log(l), l
        }
        return null
    } catch (o) {
        return console.log("Error in getAboutInfo", o), null
    }
}

function getProfileImageUrl() {
    try {
        let e = document.getElementsByClassName("inline-block relative rounded-[50%] w-16 h-16 lazy-loaded");
        if (e.length > 0) {
            let t = e[0].src;
            return t
        }
        return null
    } catch (l) {
        return console.log("Error in getProfileImageUrl", l), null
    }
}

function getExperience() {
    let e = {};
    try {
        let t = document.getElementsByClassName("bg-color-background-container experience-container py-2 pl-2 mt-1 collapsible-list-container collapsed")[0],
            l = t.querySelector("ol"),
            o = Array.from(l.children).filter(function(e) {
                return "li" === e.tagName.toLowerCase()
            });
        return o.forEach(function(t) {
            let l = {},
                o = t.getElementsByClassName("body-medium-bold list-item-heading"),
                r = t.getElementsByClassName("body-small"),
                n = t.getElementsByClassName("text-xs text-color-text-low-emphasis");
            o[0] && o[0].outerText && (console.log("Job Title: ", o[0].outerText.split("\n")[0]), l.jobTitle = o[0].outerText.split("\n")[0]), r[0] && r[0].outerText && (console.log("Company Name & Position : ", r[0].outerText.split("\n")[0]), l.companyName = r[0].outerText.split("\n")[0]), r[1] && r[1].outerText && (console.log("Duration : ", r[1].outerText.split("\n")[0]), l.duration = r[1].outerText.split("\n")[0]), n[0] && n[0].outerText && (console.log("Location : ", n[0].outerText.split("\n")[0]), l.location = n[0].outerText.split("\n")[0]);
            let a = t.getElementsByClassName("flex mr-2 !text-color-text font-medium editable");
            a.length > 0 && a[0].href && (console.log("Company Url : ", a[0].href), l.companyUrl = a[0].href), e[l.jobTitle] = l
        }), e
    } catch (r) {
        return console.log("Error in getExperience", r), null
    }
}

function getEducation() {
    let e = {};
    try {
        let t = document.getElementsByClassName("bg-color-background-container education-container py-2 pl-2 mt-1 collapsible-list-container")[0],
            l = t.querySelector("ol"),
            o = Array.from(l.children).filter(function(e) {
                return "li" === e.tagName.toLowerCase()
            });
        return o.forEach(function(t) {
            let l = {},
                o = t.getElementsByClassName("list-item-heading body-medium-bold text-color-text"),
                r = t.getElementsByClassName("body-small text-color-text"),
                n = t.getElementsByClassName("body-small text-color-text-low-emphasis"),
                a = t.getElementsByClassName("body-small mt-1 text-color-text");
            o[0] && o[0].outerText && (console.log("Institute Name: ", o[0].outerText.split("\n")[0]), l.instituteName = o[0].outerText.split("\n")[0]);
            for (let i = 0; i < r.length; i++) r[i] && r[i].outerText && (console.log("Description : ", r[i].outerText.split("\n")[0]), l["line_" + i.toString()] = r[i].outerText.split("\n")[0]);
            n[0] && n[0].outerText && (console.log("Duration : ", n[0].outerText.split("\n")[0]), l.grade = n[0].outerText.split("\n")[0]), a[0] && a[0].outerText && (console.log("Grade : ", a[0].outerText.split("\n")[0]), l.activities = a[0].outerText.split("\n")[0]), e[l.instituteName] = l
        }), e
    } catch (r) {
        return console.log("Error in getEducation", r), null
    }
}

function getContactInfo() {
    let e = {};
    try {
        let t = document.getElementsByClassName("contacts-container bg-color-background-container relative collapsible-list-container list-container py-2 pl-2 mt-1")[0],
            l = t.querySelector("ul"),
            o = Array.from(l.children).filter(function(e) {
                return "li" === e.tagName.toLowerCase()
            });
        return o.forEach(function(t) {
            let l = {},
                o = t.getElementsByClassName("contact-title body-medium-bold text-color-text"),
                r = t.getElementsByClassName("contact-value body-small !text-color-link"),
                n = t.getElementsByClassName("contact-value body-small text-color-text-low-emphasis");
            o[0] && o[0].outerText && (console.log("Title Name: ", o[0].outerText), l.title = o[0].outerText.split("\n")[0]), r[0] && r[0].outerText && (console.log("Data Value: ", r[0].outerText), l.value = r[0].outerText.split("\n")[0]), n[0] && n[0].outerText && (console.log("Data Value Link: ", n[0].outerText), l.link = n[0].outerText.split("\n")[0]), e[l.title] = l
        }), e
    } catch (r) {
        return console.log("Error in getContactInfo", r), null
    }
}

function getAccomplishments() {
    let e = {};
    try {
        let t = document.getElementsByClassName("accomplishment-type flex text-color-text certifications-section");
        if (t.length > 0) {
            let l = t[0].querySelector("ul"),
                o = Array.from(l.children).filter(function(e) {
                    return "li" === e.tagName.toLowerCase()
                }),
                r = [];
            o.forEach(function(e) {
                r.push(e.outerText)
            }), e.certificates = r
        }
        let n = document.getElementsByClassName("accomplishment-type flex text-color-text courses-section");
        if (n.length > 0) {
            let a = n[0].querySelector("ul"),
                i = Array.from(a.children).filter(function(e) {
                    return "li" === e.tagName.toLowerCase()
                }),
                s = [];
            i.forEach(function(e) {
                s.push(e.outerText)
            }), e.courses = s
        }
        let c = document.getElementsByClassName("accomplishment-type flex text-color-text honors-section");
        if (c.length > 0) {
            let u = c[0].querySelector("ul"),
                m = Array.from(u.children).filter(function(e) {
                    return "li" === e.tagName.toLowerCase()
                }),
                g = [];
            m.forEach(function(e) {
                g.push(e.outerText)
            }), e.honors = g
        }
        let f = document.getElementsByClassName("accomplishment-type flex text-color-text projects-section");
        if (f.length > 0) {
            let d = f[0].querySelector("ul"),
                $ = Array.from(d.children).filter(function(e) {
                    return "li" === e.tagName.toLowerCase()
                }),
                p = [];
            $.forEach(function(e) {
                p.push(e.outerText)
            }), e.projects = p
        }
        return e
    } catch (y) {
        return console.log("Error in getAccomplishments", y), null
    }
}

function getPeopleAlsoViewed() {
    let e = {};
    try {
        let t = document.getElementsByClassName("pav-container bg-color-background-canvas-mobile border-solid border-t-1 border-color-border-low-emphasis pt-2")[0],
            l = Array.from(t.children).filter(function(e) {
                return "div" === e.tagName.toLowerCase()
            });
        return l.forEach(function(t) {
            let l = {},
                o = t.getElementsByClassName("break-all line-clamp-1"),
                r = t.getElementsByClassName("text-xs font-normal text-color-text-low-emphasis leading-[1.33333] m-0 break-all line-clamp-1");
            o[0] && o[0].outerText && (console.log("Name: ", o[0].outerText), l.name = o[0].outerText), r[0] && r[0].outerText && (console.log("Bio : ", r[0].outerText), l.bio = r[0].outerText);
            let n = t.getElementsByClassName("inline-block relative rounded-[50%] w-6 h-6 text-xs lazy-loaded");
            n.length && n[0].src && (console.log("Profile Image : ", n[0].src), l.profileImage = n[0].src);
            let a = t.getElementsByClassName("self-start");
            a.length && a[0].href && (console.log("Profile Link : ", a[0].href), l.profileLink = a[0].href), e[l.name] = l
        }), e
    } catch (o) {
        return console.log("Error in getPeopleAlsoViewed", o), null
    }
}

function getSkills() {
    let e = {};
    try {
        let t = document.getElementsByClassName("bg-color-background-container py-2 pl-2 mt-1 collapsible-list-container skills-container collapsed relative")[0],
            l = t.querySelector("ol"),
            o = Array.from(l.children).filter(function(e) {
                return "li" === e.tagName.toLowerCase()
            }),
            r = [];
        return o.forEach(function(e) {
            console.log("Skill Name: ", e.outerText), r.push(e.outerText)
        }), e.skills = r, e
    } catch (n) {
        return console.log("Error in getSkills", n), null
    }
}
let hasNavigatedToProfile = !1,
    hasNavigatedToDashboard = !1;

function navigateToProfile() {
    if (hasNavigatedToProfile) return;
    let e = document.querySelector('a[href="/me?trk=p_mwlite_feed_updates-secondary_nav"]'),
        t = document.querySelector('a[href="/me?trk=p_mwlite_feed-secondary_nav"]');
    e ? (window.location.href = "/me?trk=p_mwlite_feed_updates-secondary_nav", hasNavigatedToProfile = !0) : t && (window.location.href = "/me?trk=p_mwlite_feed-secondary_nav", hasNavigatedToProfile = !0)
}

function isOverlayPresent() {
    return null !== document.getElementById("zk-overlay")
}

function createOverlay() {
    let e = document.createElement("div");
    e.style.position = "fixed", e.id = "zk-overlay", e.style.top = "0", e.style.left = "0", e.style.width = "100%", e.style.height = "100%", e.style.backgroundColor = "rgba(0, 0, 0, 0.5)", e.style.zIndex = "1000", e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center", e.addEventListener("click", function(e) {
        e.stopPropagation()
    }, !0), document.body.appendChild(e)
}

function getAllProfileData() {
    try {
        if ("https://www.linkedin.com/feed/" === window.location.href && (isOverlayPresent() || createOverlay(), navigateToProfile()), "https://www.linkedin.com/me?trk=p_mwlite_feed_updates-secondary_nav" === window.location.href || "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav" === window.location.href) {
            if (hasNavigatedToDashboard) return;
            isOverlayPresent() || createOverlay();
            let e = {};
            e.fullName = getFullName() ?? "No name found", e.headline = getHeadline() ?? "No headline found", e.location = getLocationData() ?? "No location found", e.aboutInfo = getAboutInfo() ?? "No about info found", e.profileImageUrl = getProfileImageUrl() ?? "No image found", e.experience = getExperience() ?? "No experience found", e.education = getEducation() ?? "No education found", e.peopleAlsoViewed = getPeopleAlsoViewed() ?? "No people also viewed found", e.skills = getSkills() ?? "No skills found", e.accomplishments = getAccomplishments() ?? "No accomplishments found", e.contactInfo = getContactInfo() ?? "No contact info found", window.ReactNativeWebView.postMessage(JSON.stringify({
                publicData: e
            })), window.location.href = "https://www.linkedin.com/dashboard/", hasNavigatedToDashboard = !0
        }
    } catch (t) {
        console.log("Error in getAllProfileData", t)
    }
}
setInterval(getAllProfileData, 1e3);