SELECT
   DATE(date) AS "date",
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
   dim_dates base
   LEFT JOIN ft_per_category_per_exp_date ft ON base.date = ft.exp_date
 WHERE
   (
      user_id = :user_id
      OR user_id IS NULL
   )
   AND date BETWEEN :start_date
   AND :end_date
 GROUP BY
   date;