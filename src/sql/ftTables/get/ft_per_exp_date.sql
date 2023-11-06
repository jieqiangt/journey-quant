SELECT
   user_id,
   exp_date,
   SUM(amount) AS total
 FROM
   trs_expenses exp
 WHERE
   exp_date IS NOT NULL
   AND exp_date = :exp_date
 GROUP BY
   user_id,
   exp_date