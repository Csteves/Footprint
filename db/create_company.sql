INSERT INTO footprint_company
(user_id,title,address,city,state,zip,phone,materials_accepted)
VALUES
($1, $2,$3,$4,$5,$6,$7,$8)
returning *;