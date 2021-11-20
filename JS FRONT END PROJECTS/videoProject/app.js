
// Requiring btn 
const btn = document.querySelector(".switch-btn");
// Requiring video
const video = document.querySelector(".video-container");
// Requiring preloader
const pre = document.querySelector(".preloader");


// play and pause event func()
btn.addEventListener("click", () => {
    if (!btn.classList.contains("slide")) {
        btn.classList.add("slide");
        video.pause();
    } else {
        btn.classList.remove("slide");
        video.play();
    }
})

// preloader visiblity func()
window.addEventListener("load", () => {
    pre.classList.add("hide-preloader");
})

