SELECT
   exp.user_id,
   exp_year,
   exp_month,
   category,
   SUM(amount) AS total
 FROM
   trs_expenses exp
   INNER JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE
   exp.user_id = :user_id
   AND exp_year = :exp_year
   AND exp_month = :exp_month
   AND category_id = :category_id
 GROUP BY
   exp.user_id,
   exp_year,
   category,
   exp_month;