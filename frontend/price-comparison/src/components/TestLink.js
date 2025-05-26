const link = "/product/Apple iPhone 15 (128 GB) - Black?name=Apple iPhone 15 (128 GB) - Black&image=https://m.media-amazon.com/images/I/71657TiFeHL._AC_UY218_.jpg&price=72,690&stars=4.5 out of 5 stars&link=https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY/ref=sr_1_3?dib=eyJ2IjoiMSJ9.8-aKrERwPzdGyJWfWOa56DLY80CF5Z8DjFODFDagBoi4nrBHk0q7-6xivRGXMniwc31lTWRyeYhm7j7aD46HAG7UFqTWZ3_A71eY3zZ-66RSQYUrOAP2iiWcEUYg7INjO0rl8ppKnStZvK4qUJAwTW_Z2rxxB84UU1WlccFnD7WoJd9ocR1_9dU5PZu9MI7GTckC-lnUcMyfNG0sz8-D5cpGbQQDLgpWqPvcVG8DVxE.9nBBOu_GBk1zuajNBehytZrQIMGIPuoTOz6XYnsw90Y&dib_tag=se&keywords=apple+iphone+15&qid=1712479719&sr=8-3&ratings=1,019";

// Parse the link using URLSearchParams
const params = new URLSearchParams(link.slice(link.indexOf('?') + 1));

// Extract the desired data
const name = params.get('name');
const image = params.get('image');
const price = params.get('price');
const stars = params.get('stars');
const productLink = params.get('link');

console.log("Name:", name);
console.log("Image:", image);
console.log("Price:", price);
console.log("Stars:", stars);
console.log("Product Link:", productLink);
