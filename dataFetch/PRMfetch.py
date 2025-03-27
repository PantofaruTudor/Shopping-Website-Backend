URL = "https://prm.com/ro/p/maison-mihara-yasuhiro-tenisi-ptsn-barbati-culoarea-negru-a13fw737-53693"
from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
import re


def fetch_product_data(URL):

    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration
    chrome_options.add_argument("--no-sandbox")  # Bypass OS security model
    chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems
    chrome_options.add_argument("--disable-extensions")  # Disable extensions
    chrome_options.add_argument("--disable-plugins")  # Disable plugins
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(URL)
    #TREBUIE SA INVAT SI SA INTELEG CHESTIILE ASTEA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



    html = driver.page_source #in driver.page_source se afla codul sursa HTML
    soup = BeautifulSoup(html, "html.parser")
    with open("page_source.html", "w", encoding="utf-8") as file: 
        file.write(html)
    with open("page_source.html", "r", encoding="utf-8") as file: 
        script_content = file.read()

    json_scripts = soup.find_all("script")

    # with open("script_source.html", "w", encoding="utf-8") as file:
    #     for script in soup.find_all("script"):  # Iterate through each <script> tag
    #         if script.string:  # Only include scripts with content
    #             file.write(str(script) + "\n\n")

    # with open("script_source.html", "r", encoding="utf-8") as file:
    #     script_content = file.read()
    #FOLOSESTI LINIILE ASTEA DACA INCEPI SA PRIMESTI ERORI
    
    preloaded_state_match = re.search(r'window\.__PRELOADED_STATE__\s*=\s*(\{.*\});', script_content, re.DOTALL)

    if preloaded_state_match:
        json_string = preloaded_state_match.group(1)
        # Extract specific fields like "price" directly
        price_matches = re.search(r'"price":\s*([\d\.]+)', json_string)
        brand_matches = re.search(r'"brand":\s*"([^"]+)', json_string)
        names_matches = re.search(r'"title":\s*"([^"]+)', json_string)
        #names_matches = re.findall(r'"title":\s*"([^"]+)', json_string) EXISTA SI "FINDALL"

        final_price = price_matches[0]
        final_brand = brand_matches[0]
        final_name = names_matches[0].replace(final_brand,"").strip().split(",",1)[0].strip().title()
        #final_name = item_name.replace(final_brand,"").strip().split(",",1)[0].strip().title()


        final_price = float(final_price.split(":")[1].strip())
        final_brand = final_brand.split(":")[1].strip('"').title()
        final_name = final_name.split(":")[1].strip('"').replace(final_brand,"").strip(' ')

        driver.quit()
        return {
        "price": final_price,
        "brand": final_brand,
        "name": final_name
        }
    else:
        print(f"'Could not get the .window\.__PRELOADED_STATE__'{URL}")
        driver.quit()
        return None

if __name__ == "__main__":
    fetch_product_data(URL)