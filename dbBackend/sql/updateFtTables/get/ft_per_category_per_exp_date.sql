SELECT
   exp.user_id,
   exp_date,
   category,
   SUM(amount) AS total
 FROM
   trs_expenses exp
   INNER JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE
   exp_date IS NOT NULL
   AND exp.user_id = :user_id
   AND exp_date = :exp_date
   AND category_id = :category_id
 GROUP BY
   exp.user_id,
   exp_date,
   category;