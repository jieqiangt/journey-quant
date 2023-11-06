REPLACE INTO ft_per_category_per_year
    (user_id, exp_year, category, total)
VALUES
    (:user_id, :exp_year, :category, :total);