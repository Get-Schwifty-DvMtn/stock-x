CREATE TABLE users (
id serial PRIMARY KEY,
google_id text,
first_name text,
last_name text,
token text,
pic_url text)

CREATE TABLE all_stocks (
name text UNIQUE,
symbol text UNIQUE)

CREATE TABLE saved_stocks (
user_id integer REFERENCES users(id),
company_symbol text REFERENCES all_stocks(symbol),
company_name text REFERENCES all_stocks(name)
)

current test data
"Apple Inc";"AAPL"
"General Electric Company";"GE"
"Microsoft Corporation";"MSFT"
"BP p.l.c";"BP"
"Citigroup Inc.";"C"
"Proctor & Gamble Company (The)";"PG"

1;"Doug";"crazy google id here";"pic url here";"doug@toolegittoquit.com"
2;"Brad";"crazy google id here";"pic url here";"brad@toolegittoquit.com"
3;"Tyler";"crazy google id here";"pic url here";"tyler@toolegittoquit.com"
4;"Austin";"crazy google id here";"pic url here";"Austin@toolegittoquit.com"
