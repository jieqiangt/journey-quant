CREATE TABLE IF NOT EXISTS trs_users (
	id SMALLINT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	acct_type VARCHAR(10) NOT NULL,
	email VARCHAR(50) NOT NULL,
	pw_hash VARCHAR(255) NOT NULL,
	public_key VARCHAR(32) NOT NULL,
	auth_2fa BOOLEAN NOT NULL DEFAULT FALSE,
	created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);