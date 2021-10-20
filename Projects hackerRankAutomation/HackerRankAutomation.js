// <------------Project on web Automation (Hacker rank)----------------->

// Aim->

/*The Aim of this project is to get the knowledge of automation i.e, how can we automate the repititive Work using js Commands and node module (Puppeteer)*/

/*Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.*/

let minimist = require("minimist");
let fs = require("fs");
let puppeteer = require("puppeteer");
// node HackerRankAutomation.js --url=https://www.hackerrank.com --config=config.JSON

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
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  let page = pages[0];

  // Redirecting to login Page
  await page.goto(url);
  await page.waitFor(1000);

  // first login page
  await page.waitForSelector(
    "a[href='https://www.hackerrank.com/access-account/']"
  );
  await page.click("a[href='https://www.hackerrank.com/access-account/']");

  // Login for developers
  await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
  await page.click("a[href='https://www.hackerrank.com/login']");

  // Main Login page
  // Userid
  await page.waitFor(3500);
  await page.waitForSelector("input[name='username']");
  await page.type("input[name='username']", config.userid, {
    delay: 100,
  });

  // password
  await page.waitForSelector("input[name='password']");
  await page.type("input[name='password']", config.password, {
    delay: 100,
  });

  // Login button
  await page.waitForSelector("button[data-analytics='LoginPassword']");
  await page.click("button[data-analytics='LoginPassword']");

  // clicking on compete
  await page.waitForSelector("a.nav-link.contests");
  await page.click("a.nav-link.contests");

  // Clicking on Manage contest
  await page.waitFor(3500);
  await page.waitForSelector("a.text-link.filter-item");
  await page.click("a.text-link.filter-item");

  //              <------------ Clicking on Multiple contests on Multiple pages------------->

  // Getting the total number of contest pages
  await page.waitForSelector("a[data-attr1='Last']");

  // $eval -> document.querySelector() whatever it will return it stores in function argument

  /*[!!Important] if we want to interact with web pages we use click , type but if we want to read some info. from web page we use $eval and  $$eval*/

  let numPages = await page.$eval("a[data-attr1='Last']", function (pg) {
    // parseInt() is used because no. of pages will be returned in the form of string and we need to convert it to int.
    let Pages = parseInt(pg.getAttribute("data-page"));
    return Pages;
  });

  console.log(numPages);

  // Loop to run for all the no of pages
  for (let i = 1; i <= numPages; i++) {

    // for each page we will call this function
    await handleAllContestOfPage(page, browser);

    if (i < numPages) {
      await page.waitForSelector("a[data-attr1='Right']");
      await page.click("a[data-attr1='Right']");
    }
  }

  // Closing the browser after the moderators has been added successfully.
  await page.waitFor(3500);
  await browser.close();
  console.log("Browser closed and Moderators has been added successfully");
})();

// Function to handle contest of a page
async function handleAllContestOfPage(page, browser) {
  // Getting urls of multiple contest
  await page.waitForSelector("a.backbone.block-center");

  // $$eval is just like document.querySelectorAll() whatever it will return it store in function argument
  let curls = await page.$$eval("a.backbone.block-center", function (atags) {
    let urls = [];
    for (let i = 0; i < atags.length; i++) {
      let url = atags[i].getAttribute("href");
      urls.push(url);
    }
    return urls;
  });

  // Opening each contest in new tab(Adding Moderators)
  await page.waitFor(1500);
  for (let i = 0; i < curls.length; i++) {
    let curl = curls[i];
    let Ctab = await browser.newPage();

    // To call async function -> use keyword await
    await addModerators(Ctab, url + curl, config.moderators);

    await Ctab.waitFor(3000);
    await Ctab.close();
  }
}

// Function to add moderators in a contest
async function addModerators(Ctab, fullUrl, moderators) {
  await Ctab.goto(fullUrl);
  await Ctab.bringToFront();
  await Ctab.waitFor(1500);

  // Navigating to Moderators
  await Ctab.waitFor(1500);
  await Ctab.waitForSelector(
    "#content > div > section > header > div > div.tabs-cta-wrapper > ul > li:nth-child(4)"
  );
  await Ctab.click(
    "#content > div > section > header > div > div.tabs-cta-wrapper > ul > li:nth-child(4)"
  );

  // Adding Moderators
  for (let i = 0; i < moderators.length; i++) {
    await Ctab.waitFor(1000);
    // Typing Moderators
    await Ctab.waitForSelector("input#moderator");
    await Ctab.click("input#moderator");
    await Ctab.type("input#moderator", moderators[i], {
      delay: 100,
    });

    // clicking on add button
    await Ctab.keyboard.press("Tab", { delay: 100 });
    await Ctab.keyboard.press("Enter");
  }
}

/* note - if we enclose a function in a bracket and and after function body we can call it like ();
 this will invoke the function automatically just after declaration  */

/*Thanks for Accessing this code file Happy web Dev!!!*/
