SELECT
   user_id,
   exp_year,
   exp_month,
   SUM(amount) AS total
 FROM
   trs_expenses
 WHERE
   exp_date IS NULL
    AND exp_month = :exp_month
    AND exp_year = :exp_year
    AND user_id = :user_id
 GROUP BY
   user_id,
   exp_year,
   exp_month;