import mysql.connector
import requests

r = requests.get("http://universities.hipolabs.com/search?country=canada")
uni_json = r.json()

db = mysql.connector.connect(
    user = "root",
    password = "",
    host = "34.130.169.52",
    database = "canadian_post_secondary"
)

c = db.cursor()
c.execute("CREATE TABLE Institutions (name VARCHAR(100), province VARCHAR(50),"
          " website VARCHAR(100), id int PRIMARY KEY AUTO_INCREMENT)")

for uni in uni_json:
    c.execute("INSERT INTO Institutions (name, province, website) "
              "VALUES (%s, %s, %s)", (uni["name"], uni["state-province"],
                                      uni["domains"][0]))

db.commit()
