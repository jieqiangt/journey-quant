SELECT
   user_id,
   exp_year,
   SUM(amount) AS total
 FROM
   trs_expenses exp
 WHERE
   exp_year = :exp_year
   AND user_id = :user_id
 GROUP BY
   exp.user_id,
   exp_year