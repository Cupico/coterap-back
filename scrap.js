const puppeteer = require("puppeteer");

async function getAuditeurs(url) {

    console.log("url", url)

    // Launch the browser
    const browser = await puppeteer.launch({ headless: 'new' });

    // Open a new tab
    const page = await browser.newPage();


    // Visit the page and wait until network connections are completed
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Interact with the DOM to retrieve the titles
    const titles = await page.evaluate(() => {
        // Select all elements with crayons-tag class 
        return [...document.querySelectorAll('.Ydwa1P5GkCggtLlSvphs')].map(el => el.textContent);
    });

    console.log("get title", titles)


    // Don't forget to close the browser instance to clean up the memory
    await browser.close();

    // Print the results
    return titles
}


module.exports = getAuditeurs;