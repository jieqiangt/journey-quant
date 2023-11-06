CREATE TABLE IF NOT EXISTS trs_recur_expenses (
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
	created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	exp_desc VARCHAR(100) NOT NULL,
	amount NUMERIC(10, 2) NOT NULL,
	recurring_period VARCHAR(1) CHECK (recurring_period IN ('M', 'Y')),
	recurring_start DATETIME,
	user_id SMALLINT NOT NULL,
	category_id SMALLINT NOT NULL,
	is_active BOOLEAN NOT NULL,
	payment_id SMALLINT NOT NULL,
	PRIMARY KEY (id)
);