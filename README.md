# MangaBeru

MangaBeru es una aplicación web que te permite gestionar y descubrir tu contenido favorito de anime y manga. Utilizando la API de AniList, MangaBeru te ayuda a mantener un registro organizado de todo el contenido que has visto, estás viendo o planeas ver en el futuro. Además, te permite descubrir nuevas series basadas en tendencias y popularidad.

## Características principales

### Gestión de listas:

#### Clasifica tus animes y mangas en tres listas principales:

Planeado, En curso y Completado.

#### Explora y descubre:

-   Secciones dedicadas para tendencia, populares y recomendaciones personalizadas.

#### Búsqueda avanzada:

-   Encuentra tus títulos favoritos fácilmente con filtros por género, puntaje y más.

#### Interfaz intuitiva:

-   Diseño responsivo que funciona tanto en dispositivos móviles como de escritorio.

#### Autenticación:

-   Inicia sesión para guardar tu progreso y sincronizar tus listas.

## Tecnologías utilizadas

### Frontend

-   React
-   Apollo Client para gestión de estado y caché

### Backend

-   API de AniList (para datos de anime y manga)
-   GraphQL
-   Node.js (para autenticación de tokens)

## Instalación

### Requisitos previos

-   Node.js (versión 14 o superior)
-   NPM o Yarn
-   Clave de API de AniList

### Instrucciones

1. Clona el repositorio
    ```bash
    git clone https://github.com/YerBrown/Mangaberu.git
    cd mangaberu
    ```
2. Instalar dependencias
    ```bash
    npm install
    ```
3. Configurar las variables de entorno
   Crea un archivo .env en la raíz del proyecto con las siguientes variables:
   `bash
 CLIENT_ID=?????
 CLIENT_SECRET=?????
 REDIRECT_URI=??????
 REACT_APP_CLIENT_ID=?????
 REACT_APP_REDIRECT_URI=?????
 `
4. Ejecutar el proyecto

    - Ejecutar server personal en una terminal:
        ```bash
        node server.js
        ```
    - Ejecutar pagina en otro terminal:
        ```bash
        npm run dev
        ```

    La pagina estara disponible en https://localhost:3000

## Documentación adicional

API de AniList:
https://anilist.gitbook.io

## Uso

-   Crea una cuenta o inicia sesión en AniList
-   Explora la biblioteca de anime y manga
-   Agrega títulos a tu lista personal
-   Actualiza el estado y progreso de tus series
-   Descubre nuevas recomendaciones basadas en tus gustos
