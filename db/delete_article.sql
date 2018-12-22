DELETE
FROM user_saved_articles
WHERE user_id=$1 AND id=$2
returning *;
