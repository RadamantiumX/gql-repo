# React + GRAPHQL

En esta arquitectura, tratamos de separar de forma eficiente los archivos,
por lo cual, en todo lo que tiene que ver con el renderizado, no haya evidencia o rastro de la utilización de APOLLO CLIENT. En este contexto, ubicamos los ficheros donde alojamos tanto las MUTATIONS y las QUERIES,como los CUSTOM HOOK.

## CUSTOMS HOOK

A la hora de implementarlos, tenemos que tener en cuenta que tenemos que tapar eso mismo, la implementación, la idea es que cuando cambiemos los proveedores que cumplen las misma función, todo deberia funcionar exactamente igual.

## Manejo de errores

Una de las cosas que podemos encontrarnos en el APOLLO CLIENT, es el manejo de errores.

## CACHE en APOLLO CLIENT

APOLLO CLIENT almacena el resultado que obtenemos desde, en este caso, GRAPHQL, y lo coloca en una MEMORY CACHE. Con esto, la respuesta del cliente 
es inmediata sin necesidad de realizar la peticion nuevamente.
Al realizar una mutación, el cliente mira en la CACHE (utilizando la ID en este caso) y guarda la información con los nuevos datos.
Es necesario el campo de la ID para sincronizar los cambios, juntos con ls otros datos que queremos cambiar.

Con esto podemos conseguir una especie de ESTADO GLOBAL (tal como seria REDUX), pero con algunas carencias.