INSERT INTO users
(google_id, last_name, first_name, pic_url, token)
values ($1, $2, $3, $4, $5)
RETURNING google_id, last_name, first_name, pic_url, token
