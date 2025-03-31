from database import links
from PRMfetch import fetch_product_data
import json
import time
URL = "https://prm.com/ro/p/maison-mihara-yasuhiro-tenisi-ptsn-barbati-culoarea-negru-a13fw737-53693"

start = time.time()
product=[]

# for URL in links:
#     product_data = fetch_product_data(URL)
#     product.append(product_data)

product_data = fetch_product_data(URL)
product.append(product_data)


with open("products.json", "w", encoding="utf-8") as file:
    json.dump(product,file,indent=4)

end = time.time()
elapsed = end-start
print(elapsed)