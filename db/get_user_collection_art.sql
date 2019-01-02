
SELECT a.id ,date,article_url,title
FROM footprint_users AS u
INNER JOIN user_saved_articles AS a ON a.user_id = u.id
WHERE u.id=$1;