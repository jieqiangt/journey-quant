SELECT
   exp.user_id,
   exp_date,
   IF(discretionary = 1, 'Discretionary', 'Essential') AS necessity,
   SUM(amount) AS total
 FROM
   trs_expenses exp
   INNER JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE
   exp_date IS NOT NULL
   AND exp_date = :exp_date
   AND exp.user_id = :user_id
   AND discretionary = :discretionary
 GROUP BY
   exp.user_id,
   exp_date,
   discretionary