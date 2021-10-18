// let url = "https://www.hackerrank.com";
let url = "https://www.hackerrank.com/auth/login";
//Enter Your Username and Password here
//uSE THIS SCRIPT FOR CREATING CONTEST 


// <-------Command--------->
// node CreateContest.js

let config = {
    username: "deepanshukhorwal779@gmail.com",
    password: "deepanshu12,."
};
let contest = {
    name: "abc",
    start: "10/27/2021",
    starttime: "00:00",
    end: "10/27/2021",
    endtime: "00:50",
    company: "flipkart"
}
const puppeteer = require('puppeteer');


(async () => {
    for (let i = 0; i < 1; i++) {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        });
        let page = await browser.newPage();
        await page.goto(url);

        await page.waitFor(3000);
        await page.waitForSelector("button.ui-btn.ui-btn-normal.ui-btn-secondary.ui-btn-styled")

        await page.click("button.ui-btn.ui-btn-normal.ui-btn-secondary.ui-btn-styled")

        for (let i = 0; i < 3; i++) {
            await page.keyboard.press('Tab', {
                delay: 100
            });
        }
        await page.keyboard.type(config.username);


        await page.keyboard.press('Tab', {
            delay: 100
        });
        await page.keyboard.type(config.password);
        await page.click("button.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");


        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.click('a.nav-link.contests');


        await page.waitFor(2500);
        await page.waitForSelector('a.text-link.filter-item');
        await page.click('a.text-link.filter-item');

        await page.waitFor(3000);
        await page.waitForSelector("button.btn.btn-green.backbone.pull-right");
        await page.click("button.btn.btn-green.backbone.pull-right");
        await page.waitForSelector("input#name");
        await page.click("input#name");
        await page.keyboard.type(contest.name, { delay: 300 });
        await page.keyboard.press('Tab', {
            delay: 100
        });
        await page.keyboard.type(contest.start, { delay: 300 });

        await page.keyboard.press('Tab', {
            delay: 100
        });
        await page.keyboard.type(contest.starttime);
        await page.keyboard.press('Tab', {
            delay: 300
        });
        await page.keyboard.type(contest.end);

        await page.keyboard.press('Tab', {
            delay: 100
        });
        await page.keyboard.type(contest.endtime);
        await page.keyboard.press('Tab', {
            delay: 100
        });
        await page.keyboard.press('Tab', {
            delay: 300
        });
        await page.keyboard.press('Enter', {
            delay: 300
        });
        await page.keyboard.press('Enter', {
            delay: 300
        });
        await page.keyboard.press('Tab', {
            delay: 300
        });
        await page.keyboard.press('Tab', {
            delay: 300
        });
        await page.keyboard.press('Enter', {
            delay: 300
        });
        await page.keyboard.type(contest.company, {
            delay: 200
        });

        await page.keyboard.press('Enter', {
            delay: 100
        });
        await page.keyboard.press('Tab', {
            delay: 1000
        });
        await page.keyboard.press('Tab', {

        });
        await page.keyboard.press('Enter', {
            delay: 100
        });
        await page.waitForSelector("button.save-contest.btn.btn-green");
        await page.click('button.save-contest.btn.btn-green');

        await page.waitFor(5000);

        await browser.close();
    }

})();