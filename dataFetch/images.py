from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
import json
import time



def fetch_product_images(URL):

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
    # with open("page_source.html", "w", encoding="utf-8") as file: 
    #     file.write(html)
    # with open("page_source.html", "r", encoding="utf-8") as file: 
    #     script_content = file.read()

    # json_scripts = soup.find_all("script")

    # with open("script_source.html", "w", encoding="utf-8") as file:
    #     for script in soup.find_all("script"):  # Iterate through each <script> tag
    #         if script.string:  # Only include scripts with content
    #             file.write(str(script) + "\n\n")

    # with open("script_source.html", "r", encoding="utf-8") as file:
    #     script_content = file.read()
    #FOLOSESTI LINIILE ASTEA DACA INCEPI SA PRIMESTI ERORI
    
    # Find all <script> tags with type="application/ld+json"
    json_scripts = soup.find_all("script", {"type": "application/ld+json"})

    images = []

    # for script in json_scripts:
    script = json_scripts[2]
    if script.string:  # Ensure the script has content
        try:
            json_data = json.loads(script.string)  # Parse the JSON content
            # Check if the JSON contains an "image" key
            if "image" in json_data:
                for image_obj in json_data["image"]:
                    if (
                        isinstance(image_obj, dict)
                        and image_obj.get("@type") == "ImageObject"
                        and "contentUrl" in image_obj
                    ):
                        images.append(image_obj["contentUrl"])
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON in <script>: {e}") 


    driver.quit()
    return images


# if __name__ == "__main__":
#     fetch_product_images(URL)