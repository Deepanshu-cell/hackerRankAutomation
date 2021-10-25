/* The aim of this project is to automate the linkdin website and automatically create multiple posts  */

// <-------preRequisite libraries----->
let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

// <---------Command to run the program---------------->
// node linkdin.js  --url="https://www.linkedin.com/home" --ConfigFile="config.json" --path="WEB DEV PEP\LinkdinAutomation\pepcoding logo.jpg"

// Variables used
let args = minimist(process.argv);
let url = args.url;


(async function () {
    // Launching browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    })

    // Opening new page
    let pages = await browser.pages();
    let page = pages[0];

    // Redirecting to the linkdin login page 
    await page.goto(url);
    await page.waitFor(3000);

    // Reading the config-JSOn file
    let str = fs.readFileSync("config.json", "utf-8");
    let LoginOBj = JSON.parse(str);

    // <-------Login process------>
    //Entering email-id
    await page.waitForSelector("input#session_key");
    await page.type("input#session_key", LoginOBj.email, {
        delay: 100
    });
    // Entering password
    await page.waitForSelector("input#session_password");
    await page.type("input#session_password", LoginOBj.password, {
        delay: 100
    });

    await page.waitFor(1000);
    await page.keyboard.press("Enter");

    // < ------------Posting process------>
    for (let i = 0; i < LoginOBj.posts.length; i++) {

        // Starting post
        await page.waitFor(3000);
        if (i == 0) {
            await page.waitForSelector("button#ember42");
            await page.click("button#ember42");
        }

        // typing post details
        await page.waitFor(2000);
        await page.waitForSelector("div[role='textbox']");
        await page.type("div[role='textbox']", LoginOBj.posts[i], {
            delay: 30
        });

        // Adding hashtags
        await page.waitFor(2000);
        await page.keyboard.press("Tab", {
            delay: 100
        });
        await page.keyboard.press("Tab", {
            delay: 100
        });
        await page.keyboard.press("Enter");

        // Posting 
        await page.waitFor(500);
        for (let i = 1; i <= 11; i++) {
            await page.keyboard.press("Tab");
        }
        await page.keyboard.press("Enter");

        if (i == 0) {

            await page.waitFor(2000);
            await page.keyboard.press("Enter");
        }
    }



    await page.waitFor(2000);



})();