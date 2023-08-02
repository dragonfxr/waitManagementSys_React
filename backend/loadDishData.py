import sqlite3

conn = sqlite3.connect('./db.sqlite3')
cur = conn.cursor()

data = {
    "stmt": "SELECT * FROM api_dish;",
    "header": ["DishID","DishName","Price","Description","Ingredients","DishType_id", "DishImageURL"],
    "rows": [ 
        # { "DishID": 8, "DishName": "Octopus", "Price": 22, "Description": "Grilled fermantle octopus", "Ingredients": "Potato/Octopus", "DishImageURL":"/dishimages/Octopus.png","DishType": 2 }, 
        # { "DishID": 9, "DishName": "Duck", "Price": 25, "Description": "Duck breast prosclutto", "Ingredients": "Duck","DishImageURL":"/dishimages/Duck.png", "DishType": 2 }, 
        # { "DishID": 10, "DishName": "Eggplant", "Price": 19, "Description": "Eggplant filled with capers", "Ingredients": "Eggplant/Cherry tomato","DishImageURL":"/dishimages/Eggplant.png", "DishType": 2 }, 
        # { "DishID": 11, "DishName": "Risotto", "Price": 34, "Description": "Carnarolt", "Ingredients": "Orange/Riootto", "DishImageURL":"/dishimages/Risotto.png","DishType": 3 }, 
        # { "DishID": 12, "DishName": "Spatchcock", "Price": 37, "Description": "Boneless solced spatchock", "Ingredients": "Tomato", "DishImageURL":"/dishimages/Spatchcock.png","DishType": 3 }, 
        # { "DishID": 13, "DishName": "Ricotta", "Price": 15, "Description": "Ricotta bavoir", "Ingredients": "Orange flasse/Cannolo crumble", "DishImageURL":"/dishimages/Ricotta.png", "DishType": 3 }, 
        # { "DishID": 14, "DishName": "Connolo", "Price": 16, "Description": "Chocolate connoli", "Ingredients": "Yogurt/Cholocate", "DishImageURL":"/dishimages/Connolo.png","DishType": 4 }, 
        # { "DishID": 15, "DishName": "Tortino", "Price": 15, "Description": "Tortino Frangipne", "Ingredients": "Macadamia", "DishImageURL":"/dishimages/Tortino.png", "DishType": 4 }, 
        # { "DishID": 16, "DishName": "Tiramisu", "Price": 13, "Description": "Tiramisu semifreddo", "Ingredients": "Coffee sponge", "DishImageURL":"/dishimages/Tiramisu.png", "DishType": 4 }, 
        { "DishID": 17, "DishName": "Grilled chicken caes", "Price": 17.8, "Description": "2130KJ", "Ingredients": "Chicken",  "DishImageURL":"/dishimages/Grilled_chicken_caes.png", "DishType": 1 }, 
        # { "DishID": 18, "DishName": "Warm Thai Beef", "Price": 18.8, "Description": "I like Beef", "Ingredients": "Beef","DishImageURL":"/dishimages/Warm_Thai_Beef.png", "DishType": 1 }, 
        # { "DishID": 19, "DishName": "Vegan tofu", "Price": 12.2, "Description": "1490KJ", "Ingredients": "Tofu!", "DishImageURL":"/dishimages/Vegan_tofu.png", "DishType": 1 }, 
        # { "DishID": 20, "DishName": "Cola", "Price": 3.5, "Description": "Coke cola not pepsi", "Ingredients": "Sugar", "DishImageURL":"/dishimages/Cola.png", "DishType": 5 }, 
        # { "DishID": 21, "DishName": "Tap water", "Price": 0, "Description": "Free", "Ingredients": "Water", "DishImageURL":"/dishimages/Tap_water.png", "DishType": 5 }, 
        # { "DishID": 22, "DishName": "Coffee", "Price": 4.5, "Description": "Wake up!", "Ingredients": "Coffee", "DishImageURL":"/dishimages/Coffee.png", "DishType": 5 }, 
        # { "DishID": 23, "DishName": "Mini Salad", "Price": 1.2, "Description": "Mini vegetables", "Ingredients": "Vegetables", "DishImageURL":"/ayouh.jpeg","DishType": 1 }, 
        # { "DishID": 24, "DishName": "Spring Roll", "Price": 4.2, "Description": "Chinese Style Spring Roll", "Ingredients": "Spring Roll", "DishImageURL":"/ayouh.jpeg","DishType": 2 } 
    ]
}


for row in data['rows']:
    cur.execute('''
        INSERT INTO api_dish (DishID, DishName, Price, Description, Ingredients, DishType_id, DishImageURL)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (row['DishID'], row['DishName'], row['Price'], row['Description'], row['Ingredients'], row['DishType'], row['DishImageURL']))

conn.commit()

conn.close()
