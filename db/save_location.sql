INSERT INTO user_saved_locations
(title,materials_accepted,phone,city,address,state,zip,user_id,distance)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
returning *;