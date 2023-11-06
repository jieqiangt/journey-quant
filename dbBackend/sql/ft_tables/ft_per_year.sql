INSERT INTO
   ft_per_year (user_id, exp_year, total)
 SELECT
   user_id,
   exp_year,
   SUM(amount) AS total
 FROM
   trs_expenses exp
 GROUP BY
   exp.user_id,
   exp_year;