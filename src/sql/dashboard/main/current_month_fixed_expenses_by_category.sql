SELECT
   "Fixed Expenses" AS "date",
   MAX(
      CASE
         WHEN category = 'necessities' THEN total
      END
   ) AS "necessities",
   MAX(
      CASE
         WHEN category = 'healthcare' THEN total
      END
   ) AS "healthcare",
   MAX(
      CASE
         WHEN category = 'allowance' THEN total
      END
   ) AS "allowance",
   MAX(
      CASE
         WHEN category = 'transport' THEN total
      END
   ) AS "transport",
   MAX(
      CASE
         WHEN category = 'education' THEN total
      END
   ) AS "education",
   MAX(
      CASE
         WHEN category = 'entertainment' THEN total
      END
   ) AS "entertainment",
   MAX(
      CASE
         WHEN category = 'food' THEN total
      END
   ) AS "food",
   MAX(
      CASE
         WHEN category = 'travel' THEN total
      END
   ) AS "travel"
 FROM
   ft_exp_date_null_per_category_per_month_per_year
 WHERE
   user_id = :user_id
   AND exp_year = :exp_year
   AND exp_month = :exp_month;