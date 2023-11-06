CREATE TABLE IF NOT EXISTS ft_per_necessity_per_exp_date (
    user_id SMALLINT NOT NULL,
    exp_date DATETIME NOT NULL,
    necessity VARCHAR(20) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (user_id, exp_date, necessity)
);