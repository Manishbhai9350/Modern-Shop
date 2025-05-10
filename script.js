import { data } from "./data.js";

const headingCon = document.querySelector(".sliding_headings .headings");
const imagesCon = document.querySelector('.bottom_images')

let currentIdx = 0;
let delayTime = 6;
function showData() {
  const item = data[currentIdx];
  const item2 = data[currentIdx + 1];
  const heading = `
        <div class="heading heading_current">
            <div class="text">
                <span class="text_num">0${currentIdx + 1}</span>
                <p  class="heading_desc">${item.desc}</p>
                <h1  class="heading_title">${item.name}</h1>
            </div>
        </div>
        <div class="heading heading_next">
            <div class="text">
                <span class="text_num">0${currentIdx + 2}</span>
                <p class="heading_desc">${item2.desc}</p>
                <h1 class="heading_title">${item2.name}</h1>
            </div>
        </div>
      `;
    const images = `
      <div class="img img_current">
        <img src="${item.img}" />
      </div>
      <div class="img img_next">
        <img src="${item2.img}" />
      </div>
    `
    headingCon.innerHTML = heading;
    imagesCon.innerHTML = images;
    const currentHeading = document.querySelector(".heading_current");
    const nextHeading = document.querySelector(".heading_next");
    const currentImg = imagesCon.querySelector(".img_current")
    const nextImg = imagesCon.querySelector(".img_next")
    currentImg.style.zIndex = 5
    nextImg.style.zIndex = 4
    gsap.set(currentHeading,{
        left:0
    })
    gsap.set(nextHeading,{
        left:100 + '%'
    })
}
showData();

function fillData(heading, data) {
  const { desc, img, name } = data;
  const text_num = heading.querySelector(".text_num");
  const heading_desc = heading.querySelector(".text .heading_desc");
  const heading_title = heading.querySelector(".text .heading_title");
  text_num.innerHTML = "0" + (currentIdx + 1);
  heading_desc.innerHTML = desc;
  heading_title.innerHTML = name;
}

function AnimateHeadingScroller() {
  gsap.to(".headings_scroller", {
    width: 100 + "%",
    duration: delayTime,
    ease: "linear",
    onComplete: updateNext,
  });
}

AnimateHeadingScroller();
function updateNext() {
  currentIdx = (currentIdx + 1) % data.length;
  const nextHeading = document.querySelector(".heading_next");
  const currentHeading = document.querySelector(".heading_current");
  fillData(nextHeading, data[currentIdx]);
  const tl = gsap.timeline();
  gsap.to(currentHeading, {
    left: "-100%",
    ease: "expo",
    onComplete() {
      gsap.set(currentHeading, {
        left: "100%",
      });
      currentHeading.classList.remove("heading_current");
      currentHeading.classList.add("heading_next");
    },
  });
  gsap.to(nextHeading, {
    left: 0,
    ease: "expo",
  });
  gsap.set(".headings_scroller", {
    width: 0,
  });
  const currentImg = imagesCon.querySelector(".img_current")
  const nextImg = imagesCon.querySelector(".img_next")
  gsap.to(currentImg,{
    clipPath:"polygon(0% 0% , 100% 0% , 100% 0% , 0% 0%)",
    duration:1,
    ease:'power3',
    onComplete(){
      gsap.set(currentImg,{
        clipPath:"polygon(0% 0% , 100% 0% , 100% 100% , 0% 100%)",
      })
      nextImg.style.zIndex = 5
      currentImg.style.zIndex = 4
      const nextData = data[(currentIdx + 1) % data.length]
      currentImg.classList.remove("img_current")
      currentImg.classList.add("img_next")
      nextImg.classList.remove("img_next")
      nextImg.classList.add("img_current")
      currentImg.querySelector('img').src = nextData.img
    }
  })
  nextHeading.classList.remove("heading_next");
  nextHeading.classList.add("heading_current");

  // if(currentIdx <= 1){ 
    AnimateHeadingScroller();
  // }  
}

function HandleLanguage(){
  let language = 'ru'
  const langBtns = document.querySelectorAll('.lang_btn')
  langBtns.forEach(btn => {
    btn.addEventListener('click',e => {
      const lang = e.target.getAttribute('lang')
      const selected = document.querySelector('.lang_btn.selected')
      const current_lang = document.querySelector('.current-lang')
      if (lang == 'ru' && language !== lang) {
        language = 'ru'
        current_lang.innerHTML = 'Russia'
        selected.classList.remove('selected')
        btn.classList.add("selected")
      } 
      if(lang == 'en' && language !== lang ) {
        language = 'en'
        current_lang.innerHTML = 'English'
        selected.classList.remove('selected')
        btn.classList.add("selected")
      }
    })
  })
}

HandleLanguage()


window.addEventListener("mousemove",e => {
  gsap.to('.mouse',{
    left:e.clientX,
    top:e.clientY,
  })
})