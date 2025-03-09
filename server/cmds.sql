create table "users"(
  id serial primary key,
  username varchar(20) not null unique,
  password varchar(60) not null,
  email varchar(40) not null unique,
  mobile varchar(10) unique,
  role_id integer not null references role(id),
  refresh_token text not null,
  profile_pic text
);

create table roles(
  id serial primary key,
  role varchar(15) not null
);

create table cart_items(
  id serial primary key,
  product_id integer not null references product(id) on delete cascade,
  quantity integer not null,
  user_id integer not null references "user"(id) on delete cascade
);

create table addresses(
  id serial primary key,
  address varchar(200) not null,
  user_id integer not null references "user"(id) on delete cascade
);

create table payment_methods(
  id serial primary key,
  card_number varchar(6) not null,
  expiry_date date not null,
  cvv integer not null,
  name_on_card varchar(50) not null,
  user_id integer not null references "user"(id) on delete cascade
);

create table products(
  id serial primary key,
  name varchar(25) not null,
  price integer not null,
  quantity integer not null,
  category varchar(15) not null,
  description varchar(500),
  rating real,
  image varchar(30) not null
);
alter table product alter column image type text
alter table product rename column quantity to stock
insert into product(name, price, stock, category, description, rating, image) values ('Calvin Klein CK One', 50, 17, 'fragrances', 'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It''s a versatile fragrance suitable for everyday wear.', 4.85, 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png');

create table reviews(
  id serial primary key,
  rating real not null,
  comment varchar(500),
  user_id integer not null references "user"(id),
  product_id integer not null references product(id) on delete cascade
);

create table 'orders'(
  id serial primary key,
  product_id integer not null references product(id),
  quantity integer not null,
  order_date date not null,
  delivery_date date,
  status varchar(15) not null check(status in ('pending','approved')),
  total integer not null,
  payment_method_id integer not null references payment_method(id),
  address_id integer not null references address(id),
  user_id integer not null references "user"(id) on delete cascade
);