INSERT INTO
    dim_categories (
        `discretionary`,
        `category`,
        `sub_category`,
        `created_on`,
        `updated_on`
    )
VALUES
    (
        :discretionary,
        :category,
        :sub_category,
        :created_on,
        :updated_on
    )