// Some Functions To Handle Something To Don't Repeat Yourself.

// Scrool To The Section
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Create Handle Active Function

function activeFunction(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.currentTarget.classList.add("active");
}

//  End Some Functions To Handle Something To Don't Repeat Yourself.

// Start Header Area

// let links = document.querySelectorAll(".links a");

// Scrool To The Section
let allLinks = document.querySelectorAll(".landing-page .links a");

scrollToSomewhere(allLinks);

// End Header Area

// Start Setting Box

let openSetting = document.querySelector(".settings-box");
let gearIcone = document.querySelector(".icon-gear");

gearIcone.onclick = function () {
  this.classList.toggle("fa-spin");
  openSetting.classList.toggle("open");
};

// Start Local Storage With Color

// Start Color Options

// Check If "Local Storage" Have A Color Already

let mainColors = localStorage.getItem("colors-options");

// console.log(mainColors);

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  let allColors = document.querySelectorAll(".colors-list li");
  // Remove Active Class From All Color List Item
  allColors.forEach((ele) => {
    ele.classList.remove("active");
    // Add Active Class On Element With Data Color === Local Storage Item
    if (ele.dataset.color === mainColors) {
      ele.classList.add("active");
    }
  });
}

// Settings Color
let colorLi = document.querySelectorAll(".colors-list li");

colorLi.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    // Active Function
    activeFunction(e);

    // console.log(e.target.dataset.color);
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("colors-options", e.target.dataset.color);
  });
});

// End Local Storage With Color

// End Color Options

// Start Local Storage With Random Background

// Start Random Background Options

let bgOptions = true;

// Varible To Control The Interval
let bgInterval;
// End Varibles "sorry".

// Check If "Local Storage" Have A Random Background Already
let randomBg = localStorage.getItem("background-options");

if (randomBg !== null) {
  // console.log(randomBg);
  // console.log(typeof randomBg); // Be Carefull It Is Not Bolean Value, It's String //

  // Remove Active Class From All Random Background Item
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
  });

  if (randomBg === "true") {
    bgOptions = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    bgOptions = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

let activeBtn = document.querySelectorAll(".random-backgrounds span");

activeBtn.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    // Active Function
    activeFunction(e);

    if (e.target.dataset.background === "yes") {
      bgOptions = true;
      RandomImgs();
      localStorage.setItem("background-options", true);
    } else {
      bgOptions = false;
      clearInterval(bgInterval);
      localStorage.setItem("background-options", false);
    }
  });
});

// End Local Storage With Random Background

// End Random Backgrounds

// Start Bullets Options

let bulletsSpans = document.querySelectorAll(".bullets-options span");

let navBullets = document.querySelector(".nav-bullets");

// Start Local Storage With Bullets Options

let bulletLocalItem = localStorage.getItem("bullets-options");

if (bulletLocalItem !== null) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "show") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-options .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}

bulletsSpans.forEach((span) => {
  span.addEventListener("click", function (e) {
    activeFunction(e);

    if (span.dataset.display === "show") {
      navBullets.style.display = "block";

      localStorage.setItem("bullets-options", "show");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-options", "hide");
    }
  });
});

//  End Local Storage With Bullets Options

// End Bullets Options

// Start Reset Options Button

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("colors-options");
  localStorage.removeItem("background-options");
  localStorage.removeItem("bullets-options");

  // Or You Can Romove Item By Anthor Method If You Don't Need Local Storage Data :-
  // localStorage.clear();

  // Reload Window
  window.location.reload();
};

// End Reset Options Button

//  End Local Storage

// End Setting Box

// Start Navigation Bullets

let allBullets = document.querySelectorAll(".nav-bullets .bullets");

scrollToSomewhere(allBullets);

// End Navigation Bullets

// Start Landing Page

let landingPage = document.querySelector(".landing-page");

let imgArray = [
  "img-1.png",
  "img-2.jpg",
  "img-3.jpg",
  "img-4.jpg",
  "img-5.jpg",
];

// Function To Randomize Images
function RandomImgs() {
  if (bgOptions === true) {
    bgInterval = setInterval(() => {
      let imageName = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage =
        'url("../images/' + imgArray[imageName] + '")';
    }, 1000);
  }
}

RandomImgs();
// End Landing Page

// Start Our Skills Section
let skillsSection = document.querySelector(".skills");
let widthSpan = document.querySelectorAll(".skill-progress span");

window.onscroll = function () {
  // // Skills OffSet Top
  let skillsOffsetTop = skillsSection.offsetTop;

  // // Skills Outer Height
  let skillsOffsetHeight = skillsSection.offsetHeight;

  // // Window Height
  let windowHeigt = this.innerHeight;

  // // Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOffsetHeight - windowHeigt - 400
  ) {
    widthSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};
// End  Our Skills Section

// Start Gallery Section

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", function (e) {
    // Create Overlay Element
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    // Append Overlay To Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    /////////////// The Heading //////////////////
    if (img.alt !== null) {
      //Create The Heading
      let imgHeading = document.createElement("h3");

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }
    //////////////// The Heading ///////////////////

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image "src"
    popupImage.src = img.src;

    // Append Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To The Body
    document.body.appendChild(popupBox);

    // Create The Close Button
    let closeBurron = document.createElement("span");

    closeBurron.className = "close";

    let buttonText = document.createTextNode("x");

    closeBurron.appendChild(buttonText);

    // Append Span Close To The Popup Box
    popupBox.appendChild(closeBurron);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close") {
    // Reomve The Current Popup
    e.target.parentNode.remove();
    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// End Gallery Section

// Start Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let linksMenu = document.querySelector(".header-area .links");

toggleBtn.onclick = function (e) {
  // Stop Propagation On Toggle Button
  e.stopPropagation();

  this.classList.toggle("menu-active");
  linksMenu.classList.toggle("open");
};

// Click Antwhere Outside Menu And Toggle Button

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== linksMenu) {
    // Check First If Menu Is Open
    if (linksMenu.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      linksMenu.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
linksMenu.onclick = (e) => {
  e.stopPropagation();
};

// End Toggle Menu
