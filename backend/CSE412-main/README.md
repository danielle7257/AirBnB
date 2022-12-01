# CSE412
CSE412 Group Project

Data is from:
http://insideairbnb.com/get-the-data

TO START:
1. Download CSVs.zip from https://drive.google.com/file/d/1RMMZQ3Jk7s_r1__K2tpDDvi83rBLHzHY/view?usp=share_link

2. Extract to the directory with all the python files (path should be "./CSE412/CSVs/")

3. Install psql onto your machine (see https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/)

4. run the following command "createdb CSE412"

5. run "create_db.py" 
(Note: It will take a very long time. We are adding almost 2GB of data. I recommend running overnight)

Testing:
For testing purposes you can just comment out lines 131 to 148 of create_db.py so that you only upload one set of csvs.
Like so:
<img width="785" alt="testing" src="https://user-images.githubusercontent.com/47797201/204118872-c0ebbc31-59ab-4cf7-82de-b594b59f2964.png">

