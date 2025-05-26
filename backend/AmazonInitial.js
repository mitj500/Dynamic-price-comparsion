const puppeteer = require("puppeteer")
const fs = require("fs/promises")
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());
process.setMaxListeners(100);


async function startAmazon(urlAmazon) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  // console.log(urlAmazon)
  await page.goto(urlAmazon)
  await page.screenshot({ path: 'example.png', fullPage: true });
  const link = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > div > span > div > div > div > div.puisg-col.puisg-col-4-of-12.puisg-col-8-of-16.puisg-col-12-of-20.puisg-col-12-of-24.puis-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a")).map(x => x.href)
  })

  const image = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > div > span > div > div > div > div.puisg-col.puisg-col-4-of-12.puisg-col-4-of-16.puisg-col-4-of-20.puisg-col-4-of-24.puis-list-col-left > div > div.s-product-image-container.aok-relative.s-text-center.s-image-overlay-grey.puis-image-overlay-grey.s-padding-left-small.s-padding-right-small.puis-flex-expand-height.puis.puis-v25ivjw1bfqarq2ctjdv5l7vse4 > div > span > a > div > img')).map(img => img.src);
  })
  

  const name = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > div > span > div > div > div > div.puisg-col.puisg-col-4-of-12.puisg-col-8-of-16.puisg-col-12-of-20.puisg-col-12-of-24.puis-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a > span")).map(x => x.textContent)
  })

  const price = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > div > span > div > div > div > div.puisg-col.puisg-col-4-of-12.puisg-col-8-of-16.puisg-col-12-of-20.puisg-col-12-of-24.puis-list-col-right > div > div > div.puisg-row > div.puisg-col.puisg-col-4-of-12.puisg-col-4-of-16.puisg-col-4-of-20.puisg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-base > div > a > span > span > span.a-price-whole")).map(x => x.textContent)
  })

  const stars = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > div > span > div > div > div > div.puisg-col.puisg-col-4-of-12.puisg-col-8-of-16.puisg-col-12-of-20.puisg-col-12-of-24.puis-list-col-right > div > div > div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small > span > span > a > i.a-icon.a-icon-star-small.a-star-small-4.aok-align-bottom > span")).map(x => x.textContent)
  })

  await page.screenshot({
    path: 'screenshot.jpg'
  });

  const ratings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div > div > div > span > div > div > div > div.puisg-col.puisg-col-4-of-12.puisg-col-8-of-16.puisg-col-12-of-20.puisg-col-12-of-24.puis-list-col-right > div > div > div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small > span:nth-child(2) > a > span")).map(x => x.textContent)
  })

  console.log(link)
  console.log(image)
  console.log(name)
  console.log(price)
  console.log(stars)
  console.log(ratings)

  await browser.close()
  
  return {link, image, name, price, stars, ratings};
}

module.exports = startAmazon;

startAmazon("https://www.amazon.in/s?k=iphone+15");
