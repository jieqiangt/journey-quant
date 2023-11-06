SELECT
   exp.user_id,
   exp_year,
   exp_month, 
   IF(discretionary = 1, 'Discretionary', 'Essential') AS necessity,
   SUM(amount) AS total
 FROM
    trs_expenses exp
    INNER JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE
    exp_month = :exp_month
    AND exp_year = :exp_year
    AND exp.user_id = :user_id
    AND discretionary = :discretionary
 GROUP BY
   exp.user_id,
   exp_year,
   exp_month,
   discretionary;