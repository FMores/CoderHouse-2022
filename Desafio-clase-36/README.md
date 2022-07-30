# Para utilizar nodemailer con GMAIL

1. Ir a tu cuenta personal de google
2. Seleccionar "Gestionar tu cuenta de google"
3. Activar la verificacion de dos pasos si es que no se tiene activada
4. En la seccion de seguridad ir a "Contraseña de aplicaciones"
5. Generar una nueva contraseña de aplicacion. Esta va a ser nuestra password para usar con nodemailer nuestro mail
6. Crear un .env como el siguiente

   PORT=your-app-port
   GMAIL_EMAIL=your-email@gmail.com
   GMAIL_PASSWORD=your-gmail-application-password
   GMAIL_NAME=your-name

7. Hacer un post request to http://localhost:PORT/api/system/send-email
8. Si la respiesta es 200 vas a recibir un mail en la casilla de destination
9. https://www.youtube.com/watch?v=KjheexBLY4A

# Para utilizar ETHREUM

1. Go to a https://ethereal.email/
2. click on "Create Ethereal Account"
3. Copy the Name, UserName and Password
4. Create a .env file as follow

   PORT=your-app-port
   ETHEREAL_EMAIL=your-email@ethereal.email
   ETHEREAL_PASSWORD=your-password
   ETHEREAL_NAME=you-ethereal-name

5. Hacer un post request to http://localhost:PORT/api/system/send-email
6. Si la respiesta es 200 vas a recibir un mail en la casilla de destination
