CREATE TABLE morpheus_users (
    user_id SERIAL,
    user_email varchar (50)primary KEY,
    user_name varchar (50),
    user_password varchar (255)
);

drop table morpheus_users;

select * from public.morpheus_users 

INSERT INTO morpheus_users
(user_email, user_name, user_password)
VALUES('abhishek.k@gsdsa.com','username','password');