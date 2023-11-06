REPLACE INTO ft_exp_date_null_per_necessity_per_month_per_year
    (user_id, exp_year, exp_month, necessity, total)
VALUES
    (:user_id, :exp_year, :exp_month, :necessity, :total);