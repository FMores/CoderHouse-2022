## LOGIN

http://localhost:8080/api/auth/login

{ "email": "example@gmail.com", "password": "password" }

## SIGNUP

http://localhost:8080/api/auth/signup

{
"full_name": "Juan Carlos Perez",
"adress": "Gral Paz 1000, Bs As",
"age": 30,
"phone_number": 114406389
}

## PRODUCTS

Lista completa de productos: GET => http://localhost:8080/api/products

Producto por id: GET => http://localhost:8080/api/products/:id

Agregar producto: POST => http://localhost:8080/api/products

body = {
"name": "Cerveza corona",
"description": "Cerveza corona 270cc",
"price":1000,
"photo": "corona-image",
"category": "Bebidas",
"qty":100
}
