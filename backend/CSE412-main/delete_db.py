import psycopg2
import pandas as pd
from sqlalchemy import create_engine

connect = psycopg2.connect("host=localhost dbname=CSE412")
cursor = connect.cursor()
cursor.execute("DROP TABLE listings CASCADE")
cursor.execute("DROP TABLE calendar CASCADE")
cursor.execute("DROP TABLE reviews CASCADE")

connect.commit()

