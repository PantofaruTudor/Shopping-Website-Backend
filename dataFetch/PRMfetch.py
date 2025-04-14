URL = "https://prm.com/ro/p/maison-mihara-yasuhiro-tenisi-ptsn-barbati-culoarea-negru-a13fw737-53693"
from selenium import webdriver
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
#from images import fetch_product_images
import re
import json
import time

def fetch_page_source(driver, url):
    driver.get(url)
    return driver.page_source

def extract_images(soup):
    json_scripts = soup.find_all("script", {"type": "application/ld+json"})
    images = []


    # with open("all_scripts.json", "w", encoding="utf-8") as file:
    #     for i, script in enumerate(json_scripts):
    #         if script.string:  # Ensure the script has content
    #             file.write(f"Script {i + 1}:\n")
    #             file.write(script.string)
    #             file.write("\n\n")


    if len(json_scripts) >= 3:
        script = json_scripts[1]
        if script.string:
            try:
                json_data = json.loads(script.string)
                if "image" in json_data and isinstance(json_data["image"], list):
                    for image_obj in json_data["image"]:
                        if (
                            isinstance(image_obj, dict)
                            and image_obj.get("@type") == "ImageObject"
                            and "contentUrl" in image_obj
                        ):
                            images.append(image_obj["contentUrl"])
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON in <script>: {e}")
    return images

def extract_product_data(html):
    soup = BeautifulSoup(html, "html.parser")
    script_content = html
    preloaded_state_match = re.search(r'window\.__PRELOADED_STATE__\s*=\s*(\{.*\});', script_content, re.DOTALL)

    if preloaded_state_match:
        json_string = preloaded_state_match.group(1)
        price_matches = re.search(r'"price":\s*([\d\.]+)', json_string)
        brand_matches = re.search(r'"brand":\s*"([^"]+)', json_string)
        names_matches = re.search(r'"title":\s*"([^"]+)', json_string)

        final_price = float(price_matches.group(1)) if price_matches else None
        final_brand = brand_matches.group(1).title() if brand_matches else None
        final_name = names_matches.group(1).title().replace(final_brand, "").strip().split(",", 1)[0].strip() if names_matches and final_brand else None

        return {
            "price": final_price,
            "brand": final_brand,
            "name": final_name,
        }
    
    return None

def fetch_product_data(URL):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)

    try:
        html = fetch_page_source(driver, URL)
        soup = BeautifulSoup(html, "html.parser")

        # Use ThreadPoolExecutor to parallelize tasks
        with ThreadPoolExecutor() as executor:
            future_images = executor.submit(extract_images, soup)
            future_data = executor.submit(extract_product_data, html)

            images = future_images.result()
            product_data = future_data.result()

        if product_data is None:
            print(f"No product data found for URL:{URL}")
            return None

        product_data["images"] = images
        return product_data
    finally:
        driver.quit()

if __name__ == "__main__":
    product_data = fetch_product_data(URL)
    print(product_data)