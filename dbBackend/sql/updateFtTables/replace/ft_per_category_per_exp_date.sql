REPLACE INTO ft_per_category_per_exp_date
    (user_id, exp_date, category, total)
VALUES
    (:user_id, :exp_date, :category, :total);