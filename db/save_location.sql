INSERT INTO user_saved_locations
(title,materials_accepted,phone,address,state,zip,user_id)
VALUES($1,$2,$3,$4,$5,$6,$7)
returning *;