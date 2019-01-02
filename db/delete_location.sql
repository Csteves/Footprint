DELETE
FROM user_saved_locations
WHERE user_id=$1 AND id=$2
returning *;