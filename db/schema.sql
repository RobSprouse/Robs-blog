-- Schema for the robsBlog_db database
-- DROPs the db if it exist and creates a new one
DROP DATABASE IF EXISTS robsBlog_db;

CREATE DATABASE robsBlog_db;

USE robsBlog_db;

-- Shows all blogs and their comments with the user id and name attached to each of them
SELECT
     blog.id AS blog_id,
     blog.title,
     blog.content,
     blog.date_created AS blog_date_created,
     blog.user_id AS blog_user_id,
     user.username AS blog_username,
     comment.id AS comment_id,
     comment.comment_text,
     comment.date_created AS comment_date_created,
     comment.user_id AS comment_user_id,
     comment_user.username AS comment_username
FROM
     blog
     INNER JOIN user ON blog.user_id = user.id
     LEFT JOIN comment ON blog.id = comment.blog_id
     LEFT JOIN user AS comment_user ON comment.user_id = comment_user.id
ORDER BY
     blog.id;

     SHOW INDEX FROM user;

     