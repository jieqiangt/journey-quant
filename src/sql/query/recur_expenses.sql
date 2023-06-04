SELECT
    id,
    exp_desc,
    amount,
    recurring_period,
    recurring_start,
    category_id,
    payment_id
 FROM
    trs_recur_expenses
 WHERE
    user_id = :user_id
    AND is_active = TRUE;