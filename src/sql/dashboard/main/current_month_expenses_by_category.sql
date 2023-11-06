SELECT
   category AS "label",
   total
 FROM
   ft_per_category_per_month_per_year
 WHERE
   user_id = :user_id
   AND exp_year = :exp_year
   AND exp_month = :exp_month;