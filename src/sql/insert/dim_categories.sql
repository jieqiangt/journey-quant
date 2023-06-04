INSERT INTO
    dim_categories (
        `discretionary`,
        `category`,
        `sub_category`,
        `user_id`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :discretionary,
        :category,
        :sub_category,
        :user_id,
        :created_on,
        :updated_on
    )