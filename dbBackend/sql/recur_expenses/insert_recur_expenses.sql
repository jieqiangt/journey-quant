INSERT INTO
    trs_expenses (
        `exp_date`,
        `exp_desc`,
        `amount`,
        `exp_month`,
        `exp_year`,
        `recurring`,
        `recurring_period`,
        `category_id`,
        `recurring_start`,
        `user_id`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :exp_date,
        :exp_desc,
        :amount,
        :exp_month,
        :exp_year,
        :recurring,
        :recurring_period,
        :category_id,
        :recurring_start,
        :user_id,
        :created_on,
        :updated_on
    )