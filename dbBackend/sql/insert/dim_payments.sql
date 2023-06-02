INSERT INTO
    dim_payments (
        `alias`,
        `payment_type`,
        `card_provider`,
        `payment_operator`,
        `charged_to`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :alias,
        :payment_type,
        :card_provider,
        :payment_operator,
        :charged_to,
        :created_on,
        :updated_on
    )