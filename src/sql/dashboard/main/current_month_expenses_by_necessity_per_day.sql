SELECT
   DATE(date) AS "date",
   COALESCE(
      MAX(
         CASE
            WHEN necessity = 'Essential' THEN total
         END
      ),
      0
   ) AS "essential",
   COALESCE(
      MAX(
         CASE
            WHEN necessity = 'Discretionary' THEN total
         END
      ),
      0
   ) AS "discretionary"
 FROM
   dim_dates base
   LEFT JOIN ft_per_necessity_per_exp_date ft ON base.date = ft.exp_date
 WHERE
   date BETWEEN :start_date
   AND :end_date
   AND (
      user_id = :user_id
      OR user_id IS NULL
   )
 GROUP BY
   date;