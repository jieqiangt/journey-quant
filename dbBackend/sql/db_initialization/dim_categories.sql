CREATE TABLE IF NOT EXISTS dim_categories (
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
	discretionary BOOLEAN NOT NULL,
	category VARCHAR(100) NOT NULL,
	sub_category VARCHAR(100) NOT NULL,
	user_id SMALLINT NOT NULL,
	created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);