INSERT INTO
   ft_per_necessity_per_year (user_id, exp_year, necessity, total)
SELECT
    exp.user_id,
	 exp_year,
    IF(discretionary = 1, 'Discretionary','Essential') AS necessity,
    SUM(amount) AS total
 FROM
    trs_expenses exp
    INNER JOIN dim_categories cat ON exp.category_id = cat.id
 GROUP BY
    exp.user_id, exp_year, discretionary;