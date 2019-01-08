INSERT INTO footprint_users
(email,hash,zip_code,has_company)
VALUES
($1, $2,$3,$4)
returning *;