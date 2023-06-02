INSERT INTO
    trs_users (
        `first_name`,
        `last_name`,
        `username`,
        `acct_type`,
        `email`,
        `pw_hash`,
        `public_key`,
        `auth_2fa`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :first_name,
        :last_name,
        :username,
        :acct_type,
        :email,
        :pw_hash,
        :public_key,
        :auth_2fa,
        :created_on,
        :updated_on
    )