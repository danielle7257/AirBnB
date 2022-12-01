import psycopg2
import pandas as pd
from flask import Flask, request

app = Flask(__name__)

@app.route('/query')
# @app.route('/query', methods=['POST'])
def query():
    # data = request.get_json()
    connect = psycopg2.connect("host=localhost dbname=CSE412")
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM listings where id=108061;")
    query = cursor.fetchall()
    connect.commit()
    return query

if __name__ == "__main__":
    app.run(debug=True)
