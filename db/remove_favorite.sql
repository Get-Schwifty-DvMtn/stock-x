delete from saved_stocks
where user_google_id = $1
and company_symbol = $2
