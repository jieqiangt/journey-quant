REPLACE INTO ft_exp_date_null_per_category_per_month_per_year
    (user_id, exp_year, exp_month, category, total)
VALUES
    (:user_id, :exp_year, :exp_month, :category, :total);