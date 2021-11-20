// set initial counter
let count = 0;


// getting the count span
const value = document.getElementById("value");
// Selecting all three buttons
const btns = document.querySelectorAll(".btn");

// btns will return an array of btns and we are going to run for each loop on each element

btns.forEach(function (btn) {
    btn.addEventListener('click', (e) => {
        // Getting class list of each element
        const myClass = e.currentTarget.classList;

        if (myClass.contains("decrease")) {
            count--;
        }
        else if (myClass.contains("reset")) {
            count = 0;
        }
        else {
            count++;
        }

        if (count > 0) {
            value.style.color = "green";
        } else if (count < 0) {
            value.style.color = "red";
        } else {
            value.style.color = "blue"
        }
        value.textContent = count;
    })

});