const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());
process.setMaxListeners(100);

async function startAmazon(urlAmazon) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
  );
  
  await page.goto(urlAmazon);

  const data = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('div.s-result-item'));
    const searchData = [];

    items.forEach(item => {
      const nameElement = item.querySelector('h2 a span');
      const name = nameElement ? nameElement.textContent.trim() : '';

      const linkElement = item.querySelector('h2 a');
      const link = linkElement ? linkElement.href : '';

      const priceElement = item.querySelector('.a-price-whole');
      const price = priceElement ? priceElement.textContent.trim() : '';

      const starsElement = item.querySelector('.a-icon-star-small');
      const stars = starsElement ? starsElement.textContent.trim() : '';

      const ratingsElement = item.querySelector('.a-size-small');
      const ratings = ratingsElement ? ratingsElement.textContent.trim() : '';

      const imageElement = item.querySelector('img.s-image');
      const image = imageElement ? imageElement.src : '';

      // Add data only if all fields are present
      if (name && link && price && stars && ratings && image) {
        searchData.push({ name, link, price, stars, ratings, image });
      }
    });
    return searchData;
  });
  console.log(data)
  await browser.close();
  return {
    link: data.map(item => item.link),
    image: data.map(item => item.image),
    name: data.map(item => item.name),
    price: data.map(item => item.price),
    stars: data.map(item => item.stars),
    ratings: data.map(item => item.ratings)
  };
}

module.exports = startAmazon;

startAmazon("https://www.amazon.in/s?k=iphone+15");
