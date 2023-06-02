SELECT
    exp_desc,
    amount,
    recurring_period,
    recurring_start,
    user_id,
    category_id,
    payment_id
FROM
    trs_recur_expenses
WHERE
    is_active = TRUE
    AND user_id = :user_id;