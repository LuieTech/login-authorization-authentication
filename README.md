# Actividad API

Crear un simple API para poner en práctica lo aprendido sobre autenticación.

## Iteración 1

"Set up" express. Crea tu proyecto express en api/

## Iteración 2

Crear la ruta GET /patata que devuelva el JSON:

```
{ "patata": "muy buena" }
```

## Iteración 3

Crear un modelo de usuario con los campos:

- email
- password

## Iteración 4

Crear la ruta POST /users para crear un usuario

- devuelve 201 OK si usuario creado OK
- devuelve 400 si errores en la creación.
- la password debe guardarse cifrada!

## Iteración 5

Crear la ruta POST /login para autenticar un usuario. Recibe { email, password} en
el body y devuelve una Cookie de sesión.

## Iteración 6

Sólo usuarios autenticados podrán acceder a /patata

## Iteración 7

Modificar la ruta GET /patata para que devuelva:

{ "patata": "muy buena": "usuario": "EMAIL DEL USUARIO AUTENTICADO" }

# Actividad WEB

Crear la experiencia web de login y acceso autenticado

## Iteración 1

Crear proyecto vite en ./web

## Iteración 2

Instalar `react-router-dom` y crear tres rutas en la web:

- /patata -> renderiza <PatataPage/>
- /signup -> renderiza <SignUpPage/>
- /login -> renderiza <LoginPage/>

## Iteración 3

Registro. El componente <SignUpPage> debe renderizar un formulario de registro. Al enviarlo debe crearse un usuario en el API

## Iteración 4

Login. El componente <SignUpPage> debe renderizar un formulario de login. Al enviarlo debe logarse y recibir la cookie de sesión

## Iteración 5

Patata. El componente <PatataPage/> debe mostrar la respuesta del API en GET /patata

# Diagramas

[!login](./docs/login.png)

[!auth](./docs/authenticated_request.png)
