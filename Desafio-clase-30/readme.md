# INICIAR PROYECTO => npm i

<!-- /* ------------------------------------------------------------------------------------------------- */ -->

# Agregar en la vista info, el número de procesadores presentes en el servidor.

- Tanto en la ruta api/system/info como en api/system/random se ven en PDI y el puerto que esta corriendo server.

<!-- /* ------------------------------------------------------------------------------------------------- */ -->

# Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

-FORK: npm run prod
-CLUSTER: npm run prod -- --server_mode cluster

<!-- /* ------------------------------------------------------------------------------------------------- */ -->

# Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación.

-FOREVER: npm run prod:forever

<!-- /* ------------------------------------------------------------------------------------------------- */ -->

# Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster.

-Cluster y Fork al mismo tiempo: npm run prod:ecosystem

<!-- /* ------------------------------------------------------------------------------------------------- */ -->

# Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

# 1 Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

# El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

-CLUSTER: npm run prod -- --server_mode cluster
-NGINX: utilizar la configuracion que se encuentra dentro de src/nginx/nginx.first.conf

# 2 Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

-CLUSTER: npm run prod:ecosystem2
-NGINX: utilizar la configuracion que se encuentra dentro de src/nginx/nginx.second.conf

<!-- /* ------------------------------------------------------------------------------------------------- */ -->

# Datos adicionales

-Si queres pasar el puerto como parametro, debes hacerlo de esta forma: -- --server_port 8080
