INSERT INTO
   ft_per_necessity_per_exp_date (user_id, exp_date, necessity, total)
SELECT
   exp.user_id AS user_id,
   exp_date,
   IF(discretionary = 1, 'Discretionary','Essential') AS necessity,
   SUM(amount) AS total
 FROM
   trs_expenses exp
   LEFT JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE
   exp_date IS NOT NULL
 GROUP BY
   exp.user_id, exp_date, discretionary;