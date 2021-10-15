// <------------Project on web Automation (Hacker rank)----------------->

// Aim->

/*The Aim of this project is to get the knowledge of automation i.e, how can we automate the repititive Work using js Commands and node module (Puppeteer)*/

/*Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.*/

let minimist = require("minimist");
let fs = require("fs");
let puppeteer = require("puppeteer");
// node puppeteerDemo.js --url=https://www.hackerrank.com/auth/login --config=config.JSON

let args = minimist(process.argv);
let url = args.url;

let configJSON = fs.readFileSync("config.JSON", "utf-8");
let config = JSON.parse(configJSON);


// await is used in function which have async keyword used before declaration
(async function () {

    // Launching browser and getting pages
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    let pages = await browser.pages();
    let page = pages[0];

    // Redirecting to login Page
    await page.goto(url);

    // Clicking on cookie button
    await page.click("div.cookie-container > div.cookie-btn-wrapper");

    for (let i = 0; i < 3; i++) {
        await page.keyboard.press("Tab", {
            delay: 500
        });
    }

    // Typing userid
    await page.keyboard.type(config.userid, {
        delay: 100
    });
    // Tab
    await page.keyboard.press("Tab", {
        delay: 100
    });

    // Typing Password
    await page.keyboard.type(config.password, {
        delay: 100
    });

    // Tab
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press("Tab", {
            delay: 100
        });
    }

    // Clicking on Login button
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });


    // Navigating to contest 
    await page.click("a.nav-link.contests");

    await page.waitFor(3500);
    await page.waitForSelector("a.text-link.filter-item");
    await page.click("a.text-link.filter-item");

    // Managing Contest 
    await page.waitFor(3500);
    await page.waitForSelector("p.mmT");
    await page.click("p.mmT");

    // Navigating to Moderators 
    await page.waitFor(3500);
    await page.waitForSelector("#content > div > section > header > div > div.tabs-cta-wrapper > ul > li:nth-child(4)");
    await page.click("#content > div > section > header > div > div.tabs-cta-wrapper > ul > li:nth-child(4)");

    // Adding Moderators 
    await page.waitFor(3500);
    await page.waitForSelector("#moderator");

    await page.keyboard.press("Tab", {
        delay: 100
    })
    await page.keyboard.press("Tab", {
        delay: 100
    })
    await page.keyboard.type(config.moderators[0], {
        delay: 100
    });

    await page.keyboard.press("Tab", {
        delay: 100
    });
    await page.keyboard.press("Enter", {
        delay: 100
    });

    // Closing the browser after the moderators has been added successfully.
    await page.waitFor(3500);
    await browser.close();
    console.log("Browser closed and Moderators has been added successfully");

})();

/* note - if we enclose a function in a bracket and and after function body we can call it like ();
 this will invoke the function automatically just after declaration  */


/*Thanks for Accessing this code file Happy web Dev!!!*/
