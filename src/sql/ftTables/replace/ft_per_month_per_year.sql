REPLACE INTO ft_per_month_per_year
    (user_id, exp_year, exp_month, total)
VALUES
    (:user_id, :exp_year, :exp_month, :total);
