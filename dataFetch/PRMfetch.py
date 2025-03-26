URL = "https://prm.com/ro/p/maison-mihara-yasuhiro-tenisi-ptsn-barbati-culoarea-negru-a13fw737-53693"
from selenium import webdriver
from bs4 import BeautifulSoup
import re

driver = webdriver.Chrome()
driver.get(URL)

html = driver.page_source #in driver.page_source se afla codul sursa HTML
soup = BeautifulSoup(html, "html.parser")
with open("page_source.html", "w", encoding="utf-8") as file: 
    file.write(html)

json_scripts = soup.find_all("script")

with open("script_source.html", "w", encoding="utf-8") as file:
    for script in soup.find_all("script"):  # Iterate through each <script> tag
        if script.string:  # Only include scripts with content
            file.write(str(script) + "\n\n")

with open("script_source.html", "r", encoding="utf-8") as file:
    script_content = file.read()

# Use re.DOTALL to match across multiple lines
preloaded_state_match = re.search(r'window\.__PRELOADED_STATE__\s*=\s*(\{.*\});', script_content, re.DOTALL)

if preloaded_state_match:
    json_string = preloaded_state_match.group(1)
    # Extract specific fields like "price" directly
    price_matches = re.findall(r'"price":\s*([\d\.]+)', json_string)
    brand_matches = re.findall(r'"brand":\s*"([^"]+)', json_string)
    names_matches = re.findall(r'"title":\s*"([^"]+)', json_string)

    for price in price_matches:
        print(f"Price: {price}")

    for brands in brand_matches:
        print(f"Name: {brands}")
    
    for names in names_matches:
        print(f"Brand: {names}")
    #TREBUIE SA INTELEG SI SA INVAT CE SUNT ASTEA SI CUM FUNCTIONEAZA

    final_price = price_matches[0]
    final_brand = brand_matches[0]
    item_name = names_matches[0]
    final_name = item_name.replace(final_brand,"").strip().split(",",1)[0].strip().title()
    print("final name is:",final_name)

else:
    print('Could not get the .window\.__PRELOADED_STATE__')

driver.quit()

