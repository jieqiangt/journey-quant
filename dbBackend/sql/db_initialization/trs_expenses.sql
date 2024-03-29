CREATE TABLE IF NOT EXISTS trs_expenses (
	id INT PRIMARY KEY AUTO_INCREMENT,
	exp_date DATETIME,
	exp_desc VARCHAR(100) NOT NULL,
	amount NUMERIC(10, 2) NOT NULL,
	exp_month SMALLINT NOT NULL CHECK (exp_month > 0),
	exp_year SMALLINT NOT NULL CHECK (exp_year >= 2018),
	recurring BOOLEAN NOT NULL,
	recurring_period VARCHAR(1),
	category_id SMALLINT NOT NULL,
	recurring_start DATETIME,
	user_id SMALLINT NOT NULL,
	payment_id SMALLINT NOT NULL,
	created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);