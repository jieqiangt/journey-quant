CREATE TABLE IF NOT EXISTS ft_exp_date_null_per_category_per_month_per_year (
    user_id SMALLINT NOT NULL,
    exp_year SMALLINT NOT NULL CHECK (exp_year >= 2018),
    exp_month SMALLINT NOT NULL CHECK (exp_month > 0),
    category VARCHAR(100) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (user_id, exp_year, exp_month, category)
);