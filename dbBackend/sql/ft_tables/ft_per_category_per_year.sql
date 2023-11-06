INSERT INTO
   ft_per_category_per_year (user_id, exp_year, category, total)
SELECT
    exp.user_id,
	 exp_year,
    category,
    SUM(amount) AS total
 FROM
    trs_expenses exp
    INNER JOIN dim_categories cat ON exp.category_id = cat.id
 GROUP BY
    exp.user_id, exp_year, category;