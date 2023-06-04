CREATE TABLE IF NOT EXISTS dim_payments (
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
	alias VARCHAR(50) NOT NULL,
	payment_type VARCHAR(50) NOT NULL,
	card_provider VARCHAR(15),
	payment_operator VARCHAR(15),
	charged_to INT,
	user_id SMALLINT NOT NULL,
	created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);