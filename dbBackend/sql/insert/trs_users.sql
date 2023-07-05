INSERT INTO
    trs_users (
        `id`,
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
        :id,
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