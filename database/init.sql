CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO users (username, password)
VALUES
('admin', 'admin123');

INSERT INTO products (name, price)
VALUES
('Laptop', 12000000),
('Mouse', 150000),
('Keyboard', 300000),
('Monitor', 2500000);