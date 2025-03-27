from database import links
from PRMfetch import fetch_product_data
import json
import time

start = time.time()
product=[]

for URL in links:
    product_data = fetch_product_data(URL)
    product.append(product_data)


with open("products.json", "w", encoding="utf-8") as file:
    json.dump(product,file,indent=4)

end = time.time()
elapsed = end-start
print(elapsed)