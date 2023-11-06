REPLACE INTO ft_per_necessity_per_year
    (user_id, exp_year, necessity, total)
VALUES
    (:user_id, :exp_year, :necessity, :total);