AOS.init();
// Variables

const navBtn = document.querySelector(".nav-real-icon");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const about = document.getElementById("about");
const aboutText = about.querySelector('.about-text-content')
const filterList = document.getElementById("filter-btns");
const filterButtons = filterList.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-items .col");
const numbersSection = document.querySelector(".numbers");
const numbers = document.querySelectorAll(".numbers .counter");

// ================== nav Toggle ==================

navBtn.addEventListener("click", () => {
  ul.classList.add("show");
  overlay.classList.add("active");
});
overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  ul.classList.remove("show");
});

// ================== nav scroll ==================

var rect = aboutText.getBoundingClientRect();
var distanceFromTop = rect.top + window.pageYOffset

window.onscroll = () => {

  // Number Increase
  if (window.scrollY >= numbersSection.offsetTop - 200) {
    if (!started) {
      numbers.forEach((num) => increaseNumbers(num));
    }
    started = true;
  }

  let skillsBars = document.querySelectorAll('.skill-progress')

  // Add Scroll class to navbar
  if (window.scrollY >= about.offsetTop - 10) {
    nav.classList.add("scroll");
  } else {
    nav.classList.remove("scroll");
  }

  // Animate Width for Skills in About Section
  if(window.scrollY >= distanceFromTop - 300) {
    skillsBars.forEach(bar => {
      bar.style.width = `${bar.dataset.progress}%`
    })
  } else {
    skillsBars.forEach(bar => {
      bar.style.width = `50%`
    })
  }
};


// ================== Typewriter Effect ==================
let secondText = document.querySelector('.text.second-text')
let typed = new Typed(secondText, {
  strings: ["Abdullatif Jarkas", "Designer", "Developer"],
  typeSpeed: 70,
  backSpeed: 70, 
  loop: true
})

// ================== Filter in Portfolio ==================

filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.getAttribute("data-filter");

    if (!document.startViewTransition) {
      // Change the active button
      updateActiveButton(e.target);
      // Filter the list
      filterPortfolio(filter);
    }

    document.startViewTransition(() => {
      // Change the active button
      updateActiveButton(e.target);
      // Filter the list
      filterPortfolio(filter);
    });
  });
});

let conf = 0;

portfolioCards.forEach(ele => { 
  ele.style.viewTransitionName = `conf-${++conf}`
})

function updateActiveButton(newButton) {
  // find the previously active button
  // and remove the active class from it
  filterList.querySelector(".active").classList.remove("active");
  // add the active class to our new button
  newButton.classList.add("active");
}

function filterPortfolio(confFilter) {
  // get each portfolio category
  portfolioCards.forEach((port) => {
    const catConf = port.getAttribute("data-category");
    // check if that category matches filter
    if (confFilter === "all" || confFilter === catConf) {
      // if it matches, show that category
      port.removeAttribute("hidden");
    } else {
      port.setAttribute("hidden", "");
    }
  });
}

// ================== Numbers Increase ==================

let started = false;

function increaseNumbers(num) {
  let goal = num.dataset.goal;
  let count = setInterval(() => {
    num.innerHTML++;
    if (num.innerHTML == goal) {
      clearInterval(count);
    }
  }, 10 / goal);
}

// ================== Portfolio Images ==================

const portfolioImages = document.querySelectorAll(".portfolio-card");
const portImagesGlass = document.querySelectorAll(".portfolio-img-glass");
const imagesArray = [
  "./assets/imgs/1.jpg",
  "./assets/imgs/2.jpg",
  "./assets/imgs/3.jpg",
  "./assets/imgs/4.jpg",
  "./assets/imgs/5.jpg",
  "./assets/imgs/6.jpg",
];
const sliderImg = document.querySelector('.portfolio-slider-content img')
const portfolioSlider = document.querySelector('.portfolio-floating-slider')
const portfolioOverlay = document.querySelector('.portfolio-overlay')
const portfolioCloseBtn = document.querySelector('.portfolio-slider-content .icon')
const prevButton = document.querySelector('.arrow-left')
const nextButton = document.querySelector('.arrow-right')
let index = 0;

portImagesGlass.forEach((glass) => {
  glass.addEventListener("click", () => {
    handleClick(glass.id);
    portfolioSlider.classList.add('active')
  });
});

portfolioOverlay.addEventListener('click', () => portfolioSlider.classList.remove('active'))
portfolioCloseBtn.addEventListener('click', () => portfolioSlider.classList.remove('active'))

const handleClick = (id) => {
  showImage(id)
  index = id;
};

const showImage = (index) => sliderImg.src = imagesArray[index];

prevButton.addEventListener('click', () => {
  if(!index == 0) {
    index--;
    showImage(index)
  } else {
    index = imagesArray.length - 1
    showImage(index)
  }
})
nextButton.addEventListener('click', () => {
  if(index != imagesArray.length - 1) {
    index++;
    showImage(index)
  } else {
    index = 0
    showImage(index)
    console.log(true)
  }
  console.log(index)
})

