INSERT INTO footprint_users
(email,hash)
VALUES
($1, $2)
returning *;