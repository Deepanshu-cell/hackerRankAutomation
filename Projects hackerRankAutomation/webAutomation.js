/* The aim of this small project is to download the youtube video */

let minimist = require("minimist");
let fs = require("fs");
let puppeteer = require("puppeteer");


//[!!!Important note-> if you want download your Youtube video copy and paste the link in json File of the video you want to download]


// <---------Command to run the program---------------->
// node webAutomation.js  --url="https://en.savefrom.net/1-youtube-video-downloader-24/" --file="VideoLink.JSON"

let args = minimist(process.argv);
let url = args.url;
let file = args.file;


let StringFile = fs.readFileSync(file, "utf-8");
let videoFile = JSON.parse(StringFile);

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

    // Redirecting to the youtube video downloader webPage
    await page.goto(url);
    await page.waitFor(3000);


    // Entering the url
    await page.waitForSelector("input[name='sf_url']");
    await page.type("input[name='sf_url']", videoFile.videoLink, { delay: 100 });

    // Clicking enter
    await page.waitForSelector("button[name='sf_submit']");
    await page.click("button[name='sf_submit']");


    // Clicking on Download button
    await page.waitFor(1000);
    await page.waitForSelector("a[title='video format: 720']");

    await page.click("a[title='video format: 720']");


    console.log("Program ran successfully");




})();