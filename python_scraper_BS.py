import requests
from bs4 import BeautifulSoup

def scrape_amazon_product_prices(search_query):
    # Construct the search URL
    search_url = f"https://www.amazon.com/s?k={search_query}"
    print(search_url)

    # Send a GET request to the search URL
    response = requests.get(search_url)
    print(response)

    # Parse the HTML content of the search results page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all the search result elements
    search_results = soup.find_all('div', class_='s-result-item')

    # List to store product prices
    prices = []
    

    # Iterate over each search result to extract the URL of the product page
    for result in search_results:
        # Find the URL of the product page
        product_link = result.find('a', class_='a-link-normal', href=True)
        links.append(product_link)
        if product_link:
            product_url = "https://www.amazon.com" + product_link['href']

            # Send a GET request to the product page URL
            product_response = requests.get(product_url)

            # Parse the HTML content of the product page
            product_soup = BeautifulSoup(product_response.text, 'html.parser')

            # Extract the price from the product page
            price_element = product_soup.find('span', id='priceblock_ourprice')
            if price_element:
                price = price_element.text.strip()
                prices.append(price)
            else:
                # Check if there is a price in another location on the page
                price_element = product_soup.find('span', id='priceblock_dealprice')
                if price_element:
                    price = price_element.text.strip()
                    prices.append(price)

    return prices

# Example usage
links=[]
search_query = "iphone+15"
prices = scrape_amazon_product_prices(search_query)
if prices:
    print("Prices:", prices)
else:
    print("No prices found.")
print(links)
