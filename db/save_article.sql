INSERT INTO user_saved_articles
(user_id,title,article_url,date)
VALUES ($1,$2,$3,$4)
returning *;