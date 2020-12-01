DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  payee VARCHAR(255) NOT NULL,
  amount_cents INTEGER NOT NULL,
  transaction_date DATE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
  transaction_type_id INTEGER REFERENCES transaction_types(id) ON DELETE CASCADE
);
