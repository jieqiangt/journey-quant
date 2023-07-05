INSERT INTO
    trs_recur_expenses (
        `id`,
        `exp_desc`,
        `amount`,
        `recurring_period`,
        `recurring_start`,
        `user_id`,
        `category_id`,
        `is_active`,
        `payment_id`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :id,
        :exp_desc,
        :amount,
        :recurring_period,
        :recurring_start,
        :user_id,
        :category_id,
        :is_active,
        :payment_id,
        :created_on,
        :updated_on
    )