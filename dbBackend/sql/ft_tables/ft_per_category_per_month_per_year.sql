INSERT INTO
   ft_per_category_per_month_per_year (user_id, exp_year, exp_month, category, total)
SELECT
    exp.user_id,
    exp_year,
    exp_month,
    category,
    SUM(amount) AS total
 FROM
    trs_expenses exp
    INNER JOIN dim_categories cat ON exp.category_id = cat.id
 GROUP BY
    exp.user_id, exp_year, category, exp_month;