const puppeteer = require("puppeteer")
const fs = require("fs/promises")
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());

async function JM(url) {

    console.log("URL" + url)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    await page.goto(url, { timeout: 30000 })
    // page.screenshot({ path: 'vs.png' })

    let link = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#algolia_box > #algolia_hits > div > ol > li > a")).map(x => x.href)
    })

    console.log(link[0])
    if(link[0]) {
        const pagenew = await browser.newPage()
        await pagenew.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
        await pagenew.goto(link[0])
    
        var price = await pagenew.evaluate(() => {
            return Array.from(document.querySelectorAll("#price_section > div.product-price.jm-mb-xxs > span.jm-heading-xs.jm-ml-xxs")).map(a => a.textContent)
        })
    }

    else {
        var price = ["Not Found"]
        link = ["Not Found"]
    }
    

    console.log(price)


    await browser.close()
    const pdLink = link[0]
    
    const pdPrice = price[0]

    await browser.close()
    console.log(pdPrice)
    return { pdLink, pdPrice }
}

JM("https://www.jiomart.com/search/iphone%2015%20128gb%20blue")
module.exports = JM;

