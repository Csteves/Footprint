DELETE
FROM user_saved_articles
WHERE user_id=$1 AND title=$2
returning *;
