import psycopg2
import pandas as pd
from sqlalchemy import create_engine

connect = psycopg2.connect("host=localhost dbname=CSE412")
cursor = connect.cursor()
cursor.execute("SELECT listings.id FROM listings where id=108061;")
query = cursor.fetchall()
print(query)

connect.commit()