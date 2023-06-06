<h1>Proyecto de Interfaces de Usuario</h1>

## Miembros del Proyecto

- Pablo Fernández Serrano
- Javier Lanceta Salas
- Javier Leiva Dueñas
- Guillermo Tell González

<h2>Tecnología usada</h2>
<h3>React junto con:</h3>
<ul>
  <li>TypeScript + SWC</li>
  <li>Vite (Para correr y testear la app)</li>
</ul>

## Instrucciones para desplegar la aplicación.

Las dos versiones tienen las mismas funcionalidades, por lo que recomendamos el uso de la versión sin backend para mayor comodidad.

### Versión sin backend

- Utilizando GitHub Pages [Shopeen](https://pablofs02.github.io/shopeen/)

### Versión con backend

- Clonar el repositorio. 

`git clone https://github.com/pablofs02/shopeen.git .`

- Cambiar a rama **backend**

`git checkout -b backend`

- Realizar un **pull** a la rama

`git branch --set-upstream-to=origin/backend backend`

`git pull`

- Abrir una terminal para el **server** y otra para el **frontend**

  - En la terminal del **server** ejecutamos los siguientes comandos:

  `cd server`
  
  `npm i`

  `npm run start`

  - En la terminal del **frontend**

  `npm i`

  `npm run dev`

- La aplicación está lista para su uso.
