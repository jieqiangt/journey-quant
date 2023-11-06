SELECT
    id
 FROM
    trs_expenses
 WHERE
    exp_year = :exp_year
    AND exp_month = :exp_month
    AND exp_date IS NULL;