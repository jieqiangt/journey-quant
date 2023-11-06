REPLACE INTO ft_per_necessity_per_exp_date
    (user_id, exp_date, necessity, total)
VALUES
    (:user_id, :exp_date, :necessity, :total);