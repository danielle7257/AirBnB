from flask import Flask, jsonify, redirect, request
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2

app = Flask(__name__)
app.debug = True

CORS(app)
try:
    con = psycopg2.connect(
        database="CSE412",
        host="localhost")    
        
    cur = con.cursor()
    
    @app.route('/')
    def fetch_all_listings():
        cur.execute('SELECT * FROM listings')
        rows = cur.fetchall()
        print(rows)        
        return jsonify(rows)

    @app.route('/<int:beds>/<int:totalGuests>/<int:minNights>')
    def fetch_no_addr(beds=None, totalGuests=None, minNights=None):
        cur.execute(f'SELECT * FROM listings WHERE beds >= {beds} AND accommodates = {totalGuests} AND minimum_nights >= {minNights}')
        rows = cur.fetchall()
        print(rows)      
        return jsonify(rows)  

    @app.route('/<int:beds>/<int:totalGuests>/<int:minNights>/<int:verified>/<int:superhost>/<int:instantBooking>/<int:minRating>/<int:availability>')
    def fetch_with_bools(beds=None, totalGuests=None, minNights=None, verified=None, superhost=None, instantBooking=None, minRating=None, availability=None):
        cur.execute(f'SELECT * FROM listings WHERE beds >= {beds} AND accommodates = {totalGuests} AND minimum_nights >= {minNights} AND CAST(host_identity_verified AS INT) = {verified} AND CAST(host_is_superhost AS INT) = {superhost} AND CAST(instant_bookable AS INT) = {instantBooking} AND review_scores_rating >= {minRating} AND CAST(has_availability AS INT) = {availability}')
        rows = cur.fetchall()
        print(rows)      
        return jsonify(rows)  

except:
    print('Error')