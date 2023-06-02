SELECT
    *
FROM
    trs_expenses
WHERE
    exp_date >= :start_date
    AND exp_date <= :end_date