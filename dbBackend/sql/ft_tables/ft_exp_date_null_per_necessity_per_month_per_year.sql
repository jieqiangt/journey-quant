INSERT INTO
   ft_exp_date_null_per_necessity_per_month_per_year (user_id, exp_year, exp_month, necessity, total)
SELECT
    exp.user_id,
    exp_year,
    exp_month,
    IF(discretionary = 1, 'discretionary', 'essential') AS necessity,
    SUM(amount) AS total
 FROM
    trs_expenses exp
    INNER JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE
    exp_date IS NULL
 GROUP BY
    exp.user_id,
    exp_month,
    exp_year,
    discretionary;