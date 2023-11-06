SELECT
   user_id,
   exp_year,
   exp_month,
   SUM(amount) AS total
 FROM
   trs_expenses exp
 WHERE
   exp_year = :exp_year
   AND exp_month = :exp_month
   AND user_id = :user_id
 GROUP BY
   user_id,
   exp_year,
   exp_month;