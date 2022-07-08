Forever sirve para mantener nuestro servidor activo en produccion. Diferente a nodemon que es utilizado para desarrollo.
La utilizacion es identica a nodemon, solo se debe anteponer la palabra forever start en el script a ejecutar y podremos utilizar
la terminal sin problemas o cerrarla sin que muera el proceso.

Para ver los procesos que esta corriendo con forever, se utiliza el comando "forever list". El cual nos devuelve una lista
de los procesos en ejecucion, sus pid entre otra informacion.

Forever es similar al modulo cluster, cuando detecta que el servidor muere por algun motivo este lo levanta en otro pid. La parte mala es que
no tiene un modo watcher. Es decir, cuando realicemos un cambio en nuestro codigo no se vera reflejado por mas que refresquemos la pagina.
Hay que matar al proceso existente y iniciarlo nuevamente para que puedas visualizar los cambios.

####### PM2 #####

pm2 init => crea un archivo de configuracion JSON similar a nodemon donde vamos a poder especificar la configuracion de como queremos que
se comporte nuestra app.

Si al ejecutar el script pasamos como segundo argumento -i seguido de un numero. Pm2 va a crear esa cantidad de procesos en modo cluster.

Si utilizamos -i max, nos va a crear un cluster por cada nucleo que nuestra pc.

pm2 monit => nos crea un monitor en el bash. Este muestra todos los datos de cada cluster (memory, latency, logs, etc)

## https://medium.com/beyond-coding/take-advantage-of-node-js-cluster-and-child-processes-with-pm2-rabbitmq-redis-and-nginx-c83eccfb8af8

Para tener un monitoreo súper genial, intente ingresar: app.pm2.io (en el navegador), regístrese y siga las instrucciones (obtendrá una clave pública y privada para su máquina). Puede usarlo para monitorear su ciclo de eventos, ¡lo cual es increíble! Podrás ver todos los detalles con total claridad. Así es como debería verse
