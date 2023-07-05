SELECT
    exp.id AS id, 
    exp_date,
    cat.category AS category,
    exp_desc,
    amount
 FROM
    trs_expenses exp
 LEFT JOIN dim_categories cat ON exp.category_id = cat.id
 WHERE recurring = 0
 AND exp_date >= :startDate
 ORDER BY exp_date DESC;
