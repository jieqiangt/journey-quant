INSERT INTO
   ft_per_category_per_exp_date (user_id, exp_date, category, total)
SELECT
    exp.user_id,
    exp_date,
    category,
    SUM(amount) AS total
 FROM
    trs_expenses exp
    INNER JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE
    exp_date IS NOT NULL
 GROUP BY
    exp.user_id, exp_date, category;