## CORRER PROYECTO

1 - npm i
2 - npm start

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

Este endpoint envia un mensaje al email del admin notificando de un nuevo usuario.

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

Photo = debe ser un link a una imagen externa.

Modificar producto: PUT => http://localhost:8080/api/products/:id

body = {
"name": "Cerveza corola limited edition"
}

Eliminar producto: DELETE => http://localhost:8080/api/products/:id

## CART

Carrito de compras del usuario logueado: GET => http://localhost:8080/api/cart

Agregar producto al carrito: POST => http://localhost:8080/api/cart

body = { "prod_id": "6331b07a19801065676dcf28" }

Eliminar un producto del carrito: POST => http://localhost:8080/api/cart/:id

Crea una orden de compra: POST => http://localhost:8080/api/cart/checkout

"Este endpoint borra los productos del carrito, genera una orden de compra y
la envia al correo del usuario".

Historial de ordenes de compra del cliente: POST => http://localhost:8080/api/cart/order

## VARIABLES DE ENTORNO

SERVER_PORT=8080
MONGODB_MODE=mongoDB_atlas => por defecto en mongoDB atlas, puede utilizar mongoDB_local
MONGODB_LOCAL_URL
MONGODB_ATLAS_SRV
EXPRESS_SESSION_SECRET
COOKIE_EXPIRES_TIME => tiempo de vida de la sesion del cliente.
COOKIE_PARSER_SECRET => palabra secreta para firmar la cookie de sesion.
GMAIL_OWNER_ADRESS => email del administracion de la DB o Ecommerce.
GMAIL_OWNER_PASSWORD => contraseña de aplicacion generada por google (no es la contraseña del email.).
GMAIL_OWNER_NAME => nombre con el que esta registrada la direccion de email.

Si quieres pasar alguna de estas variables, debes hacerlo de la siguiente manera:

npm start -- --SERVER_PORT=3000 --GMAIL_OWNER_ADRESS=admin@gmail.com etc etc
