SELECT
    id,
    exp_date,
    category_id,
    exp_desc,
    amount
 FROM
    trs_expenses
 WHERE recurring = 0
 AND exp_date >= :startDate
 ORDER BY exp_date DESC;
