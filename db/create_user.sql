INSERT INTO footprint_users
(email,hash,zip_code)
VALUES
($1, $2,$3)
returning *;