CREATE TABLE IF NOT EXISTS dim_charging_accounts (
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
	service_provider VARCHAR(50) NOT NULL,
	alias VARCHAR(50) NOT NULL,
	user_id SMALLINT NOT NULL,
	created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);