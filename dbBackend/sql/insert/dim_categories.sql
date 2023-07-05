INSERT INTO
    dim_categories (
        `id`,
        `discretionary`,
        `category`,
        `sub_category`,
        `user_id`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :id,
        :discretionary,
        :category,
        :sub_category,
        :user_id,
        :created_on,
        :updated_on
    )