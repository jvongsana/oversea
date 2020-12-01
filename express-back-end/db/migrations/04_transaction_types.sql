DROP TABLE IF EXISTS transaction_types CASCADE;

CREATE TABLE transaction_types (
  id SERIAL PRIMARY KEY NOT NULL,
  type_name VARCHAR(255),
  modifer INTEGER
);
