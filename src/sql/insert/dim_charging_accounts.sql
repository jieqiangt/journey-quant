INSERT INTO
    dim_charging_accounts (
        `service_provider`,
        `alias`,
        `user_id`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :service_provider,
        :alias,
        :user_id,
        :created_on,
        :updated_on
    )