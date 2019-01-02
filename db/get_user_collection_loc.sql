SELECT *
FROM footprint_users AS u
INNER JOIN user_saved_locations AS l ON l.user_id  = u.id
WHERE u.id=$1 ;