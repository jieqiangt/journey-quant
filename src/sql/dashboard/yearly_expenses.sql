SELECT
   exp_year AS "Year",
   MAX(
      CASE
         WHEN necessity = 'Discretionary' THEN total
      END
   ) AS "Discretionary",
   MAX(
      CASE
         WHEN necessity = 'Essential' THEN total
      END
   ) AS "Essential"
 FROM
   ft_per_necessity_per_year
 WHERE
   user_id = :user_id
 GROUP BY
   exp_year;