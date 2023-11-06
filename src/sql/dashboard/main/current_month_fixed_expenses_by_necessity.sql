SELECT
   "Fixed Expenses" AS "date",
   COALESCE(
      MAX(
         CASE
            WHEN necessity = 'essential' THEN total
         END
      ),
      0
   ) AS "essential",
   COALESCE(
      MAX(
         CASE
            WHEN necessity = 'discretionary' THEN total
         END
      ),
      0
   ) AS "discretionary"
 FROM
   ft_exp_date_null_per_necessity_per_month_per_year
 WHERE
   user_id = :user_id
   AND exp_year = :exp_year
   AND exp_month = :exp_month;