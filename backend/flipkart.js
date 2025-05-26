const puppeteer = require("puppeteer")
const fs = require("fs/promises")
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());

async function flipkartData(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  await page.goto(url)

  const link = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#container > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > a")).map(x => x.href)
  })
  
  // console.log(link[0])

  const pagenew = await browser.newPage()
  await pagenew.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  await pagenew.goto(link[0])

  const price = await pagenew.evaluate(() => {
    return Array.from(document.querySelectorAll("#container > div > div._39kFie.N3De93.JxFEK3._48O0EI > div.DOjaWF.YJG4Cf > div.DOjaWF.gdgoEp.col-8-12 > div:nth-child(3) > div > div > div.UOCQB1 > div > div.Nx9bqj.CxhGGd")).map(a => a.textContent)
  })

  console.log(price)
  
  
  await browser.close()
  const pdLink = link[0]
  const pdPrice = price[0]

  await browser.close()
  return {pdLink, pdPrice}
}

flipkartData("https://www.flipkart.com/search?q=iphone+15")
module.exports = flipkartData;

