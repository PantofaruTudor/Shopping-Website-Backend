from database import links
from PRMfetch import fetch_product_data
from concurrent.futures import ThreadPoolExecutor
import json
import time

def safe_fetch_data(url, retries=3):
    for attempt in range(retries):
        try:
            result = fetch_product_data(url)
            if result is not None:
                return result  # Return the result if successful
        except Exception as e:
            print(f"Error fetching data from URL (Attempt {attempt + 1}/{retries}): {url}\n{e}")
        
        # Wait before retrying (optional, to avoid overwhelming the server)
        time.sleep(1)

    print(f"Failed to fetch data after {retries} attempts: {url}")
    return None  # Return None if all retries fail

start = time.time()
product=[]

def valid_data(product):
    return all(value is not None for value in product.values())

with ThreadPoolExecutor(max_workers=9) as executor:
    results = executor.map(safe_fetch_data, links)

for product_data in results:
    if product_data is not None and valid_data(product_data):
        product.append(product_data)
    else:
        print("AM GASIT UN ELEMENT CORUPT")

print(len(product))

with open("products.json", "w", encoding="utf-8") as file:
    json.dump(product,file,indent=4, ensure_ascii=False)

end = time.time()
elapsed = end-start
print(elapsed)