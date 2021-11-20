
// colors
const colors = ["cyan", "pink", "orange", "rgba(133,122,200)", "yellow"];

// getting btn from index.html
const btn = document.getElementById("btn");
// getting span of  color
const colorSpan = document.querySelector(".color");

// Click Event on btn
btn.addEventListener("click", () => {
    const randomNumber = getRandomNumber();
    // console.log(randomNumber);
    document.body.style.backgroundColor = colors[randomNumber];
    colorSpan.textContent = colors[randomNumber];
})


// function to get a random number
function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}