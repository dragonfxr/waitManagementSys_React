import sqlite3

# 连接到你的SQLite数据库
conn = sqlite3.connect('./db.sqlite3')
cur = conn.cursor()

# 直接将你的 JSON 数据作为 Python 字典
data = {
    "stmt": "SELECT * FROM api_dish;",
    "header": ["DishID","DishName","Price","Description","Ingredients","DishType_id"],
    "rows": [ 
        { "DishID": 8, "DishName": "Octopus", "Price": 22, "Description": "Griiled fermantle octopus", "Ingredients": "Potato/Octopus", "DishType": 2 },
        { "DishID": 9, "DishName": "Duck", "Price": 25, "Description": "Duck breast prosclutto", "Ingredients": "Duck", "DishType": 2 },
         { "DishID": 10, "DishName": "Eggplant", "Price": 19, "Description": "Eggplant filled with capers", "Ingredients": "Eggplant/Cherry tomato", "DishType": 2 }, { "DishID": 11, "DishName": "Risotto", "Price": 34, "Description": "Carnarolt", "Ingredients": "Orange/Riootto", "DishType": 3 }, { "DishID": 12, "DishName": "Spatchcock", "Price": 37, "Description": "Boneless solced spatchock", "Ingredients": "Tomato", "DishType": 3 }, { "DishID": 13, "DishName": "Ricotta", "Price": 15, "Description": "Ricotta bavoir", "Ingredients": "Orange flasse/Cannolo crumble", "DishType": 3 }, { "DishID": 14, "DishName": "Connolo", "Price": 16, "Description": "Chocolate connoli", "Ingredients": "Yogurt/Cholocate", "DishType": 4 }, { "DishID": 15, "DishName": "Tortino", "Price": 15, "Description": "Tortino Frangipne", "Ingredients": "Macadamia", "DishType": 4 }, { "DishID": 16, "DishName": "Tiramisu", "Price": 13, "Description": "Tiramisu semifreddo", "Ingredients": "Coffee sponge", "DishType": 4 }, { "DishID": 17, "DishName": "Grilled chicken caes", "Price": 17.8, "Description": "2130KJ", "Ingredients": "Chicken", "DishType": 1 }, { "DishID": 18, "DishName": "Warm Thai Beef", "Price": 18.8, "Description": "I like Beef", "Ingredients": "Beef", "DishType": 1 }, { "DishID": 19, "DishName": "Vegan tofu", "Price": 12.2, "Description": "1490KJ", "Ingredients": "Tofu!", "DishType": 1 }, { "DishID": 20, "DishName": "Cola", "Price": 3.5, "Description": "Coke cola not pepsi", "Ingredients": "Sugar", "DishType": 5 }, { "DishID": 21, "DishName": "Tap water", "Price": 0, "Description": "Free", "Ingredients": "Water", "DishType": 5 }, { "DishID": 22, "DishName": "Coffee", "Price": 4.5, "Description": "Wake up!", "Ingredients": "Coffee", "DishType": 5 }, { "DishID": 23, "DishName": "PostTest", "Price": 1.2, "Description": "PostTes", "Ingredients": "PostTest", "DishType": 1 }, { "DishID": 24, "DishName": "PutTest", "Price": 4.2, "Description": "PutTess", "Ingredients": "PutTest", "DishType": 2 } 
    ]
}

# 从 JSON 数据中提取行，并插入到数据库中
for row in data['rows']:
    cur.execute('''
        INSERT INTO api_dish (DishID, DishName, Price, Description, Ingredients, DishType_id)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (row['DishID'], row['DishName'], row['Price'], row['Description'], row['Ingredients'], row['DishType']))

# 提交数据库事务
conn.commit()

# 关闭数据库连接
conn.close()
