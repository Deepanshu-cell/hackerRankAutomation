const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
// hex colors -> #f15025


// requiring html buttons and color span element
const btn = document.getElementById("btn");
const colorSpan = document.querySelector(".color");

// adding click event to btn
btn.addEventListener("click", () => {
    let hexColor = "#";
    // Generating random hex colors
    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNumber()];
        console.log(hexColor);
    }

    // Setiing background hex color
    colorSpan.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
})


// func() to generate random hex color
function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}

