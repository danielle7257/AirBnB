import psycopg2
import pandas as pd
from sqlalchemy import create_engine


conn_string = "postgresql://localhost/CSE412"

engine = create_engine(conn_string)

connect = psycopg2.connect("host=localhost dbname=CSE412")
cursor = connect.cursor()

cursor.execute("""
    CREATE TABLE listings(
    id BIGINT PRIMARY KEY,
    listing_url TEXT,
    scrape_id BIGINT,
    last_scraped DATE,
    source TEXT,
    name TEXT,
    description TEXT,
    neighborhood_overview TEXT,
    picture_url TEXT,
    host_id BIGINT,
    host_url TEXT,
    host_name TEXT,
    host_since DATE,
    host_location TEXT,
    host_about TEXT,
    host_response_time TEXT,
    host_response_rate TEXT,
    host_acceptance_rate TEXT,
    host_is_superhost BOOLEAN,
    host_thumbnail_url TEXT,
    host_picture_url TEXT,
    host_neighbourhood TEXT,
    host_listings_count INT,
    host_total_listings_count INT,
    host_verifications TEXT,
    host_has_profile_pic BOOLEAN,
    host_identity_verified BOOLEAN,
    neighbourhood TEXT,
    neighbourhood_cleansed TEXT,
    neighbourhood_group_cleansed TEXT,
    latitude FLOAT,
    longitude FLOAT,
    property_type TEXT,
    room_type TEXT,
    accommodates INT,
    bathrooms INT,
    bathrooms_text TEXT,
    bedrooms INT,
    beds INT,
    amenities TEXT,
    price TEXT,
    minimum_nights INT,
    maximum_nights INT,
    minimum_minimum_nights INT,
    maximum_minimum_nights INT,
    minimum_maximum_nights INT,
    maximum_maximum_nights INT,
    minimum_nights_avg_ntm FLOAT,
    maximum_nights_avg_ntm FLOAT,
    calendar_updated TEXT,
    has_availability BOOLEAN,
    availability_30 INT,
    availability_60 INT,
    availability_90 INT,
    availability_365 INT,
    calendar_last_scraped DATE,
    number_of_reviews INT,
    number_of_reviews_ltm INT,
    number_of_reviews_l30d INT,
    first_review DATE,
    last_review DATE,
    review_scores_rating FLOAT,
    review_scores_accuracy FLOAT,
    review_scores_cleanliness FLOAT,
    review_scores_checkin FLOAT,
    review_scores_communication FLOAT,
    review_scores_location FLOAT,
    review_scores_value FLOAT,
    license TEXT,
    instant_bookable BOOLEAN,
    calculated_host_listings_count INT,
    calculated_host_listings_count_entire_homes INT,
    calculated_host_listings_count_private_rooms INT,
    calculated_host_listings_count_shared_rooms INT,
    reviews_per_month FLOAT
)
""")
cursor.execute("""
    CREATE TABLE calendar(
    listing_id BIGINT,
    FOREIGN KEY(listing_id) REFERENCES listings(id),
    date DATE,
    available BOOLEAN,
    price TEXT,
    adjusted_price TEXT,
    minimum_nights INT,
    maximum_nights INT
)
""")
cursor.execute("""
    CREATE TABLE reviews(
    listing_id BIGINT,
    FOREIGN KEY(listing_id) REFERENCES listings(id),
    id BIGINT PRIMARY KEY,
    date DATE,
    reviewer_id BIGINT,
    reviewer_name TEXT,
    comments TEXT
)
""")
connect.commit()

print("Adding listings csv 0")
df = pd.read_csv("../CSVs/listings.csv")
df.to_sql("listings", engine, if_exists='append', index=False)

print("Adding calendar csv 0")
df = pd.read_csv("../CSVs/calendar.csv")
df.to_sql("calendar", engine, if_exists='append', index=False)

print("Adding reviews csv 0")
df = pd.read_csv("../CSVs/reviews.csv")
df.to_sql("reviews", engine, if_exists='append', index=False)


connect.commit()
# broken ones = 4, 16, 17, 25, 27
for i in range(1, 31):
    if (i == 4) or (i == 16) or (i == 17) or (i == 25) or (i == 27):
        continue
    print("Adding listings csv {}".format(i))
    df = pd.read_csv("../CSVs/listings ({}).csv".format(i))
    df.to_sql("listings", engine, if_exists='append', index=False)

    print("Adding calendar csv {}".format(i))
    df = pd.read_csv("../CSVs/calendar ({}).csv".format(i))
    df.to_sql("calendar", engine, if_exists='append', index=False)

    print("Adding reviews csv {}".format(i))
    df = pd.read_csv("../CSVs/reviews ({}).csv".format(i))
    df.to_sql("reviews", engine, if_exists='append', index=False)
    connect.commit()

connect.commit()
