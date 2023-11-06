INSERT INTO
   ft_exp_date_null_per_month_per_year (user_id, exp_year, exp_month, total)
SELECT
   user_id,
   exp_year,
   exp_month,
   SUM(amount) AS total
 FROM
   trs_expenses
 WHERE
   exp_date IS NULL
 GROUP BY
   user_id,
   exp_year,
   exp_month;