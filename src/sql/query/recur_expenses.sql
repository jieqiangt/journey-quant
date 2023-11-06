SELECT
    recur.id,
    exp_desc,
    amount,
    recurring_period,
    recurring_start,
    cat.category
 FROM
    trs_recur_expenses recur
 LEFT JOIN dim_categories cat ON recur.category_id = cat.id
 WHERE
    recur.user_id = :user_id
    AND is_active = TRUE;