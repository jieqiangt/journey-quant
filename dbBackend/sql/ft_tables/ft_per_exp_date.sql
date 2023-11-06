INSERT INTO
   ft_per_exp_date (user_id, exp_date, total)
SELECT
    user_id,
    exp_date,
    SUM(amount) AS total
 FROM
    trs_expenses exp
 WHERE
    exp_date IS NOT NULL
 GROUP BY
    user_id, exp_date;