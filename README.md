# Pokédex App

## Descripción
Esta es una aplicación de Pokédex creada con **Vue 3**, donde los usuarios pueden buscar y marcar Pokémones como favoritos. La aplicación obtiene datos de la **PokeAPI**.

## Tecnologías utilizadas
- **Vue 3** (Composition API)
- **Pinia** (Para la gestión de estado)
- **Vue Router** (Para la navegación entre vistas)
- **FontAwesome** (Para algunos íconos)
- **HTML y CSS puro** (Sin librerías adicionales)

## Estructura del proyecto
```
├── api/                # Módulo centralizado para las llamadas a la API
├── components/         # Componentes reutilizables
│   ├── buttons/        # Botones generales y de favoritos
│   ├── pokemon/        # Componentes para mostrar listas y tarjetas
├── router/             # Configuración de rutas
├── store/              # Manejo del estado global (favoritos)
├── views/              # Páginas principales
│   ├── Home.vue        # Pantalla inicial "Get Started"
│   ├── Pokedex.vue     # Vista principal con lista y modal de detalles
│   ├── Loader.vue      # Animación de carga con Pokébola
├── assets/             # Archivos de estilos globales
│   ├── base.css        # Variables de color y estilos globales
│   ├── main.css        # Clases generales para responsive y tipografía
```

## Funcionalidades
- Buscar Pokémon por nombre en tiempo real.  
- Ver detalles de un Pokémon en un modal.  
- Marcar Pokémon como favoritos y almacenarlos en el **store (Pinia)**.  
- Animación de carga con una Pokébola en CSS.  
- Manejo de errores cuando no hay coincidencias en la búsqueda.  
- Navegación entre rutas (Home → Buscador y viceversa).  

## Aplicación de Principios

- Cada componente y archivo tiene una sola responsabilidad (ejemplo: `PokemonCard.vue` solo maneja la información del modal de detalles).
- Se pueden agregar nuevos botones sin modificar la estructura principal.
- `Lista general de pokemon` funciona de manera intercambiable con los mismos props.
- No se sobrecargan componentes con props innecesarias.**
- Se centralizaron las llamadas a la API en `api/config.js`.
- Uso de un **store centralizado (Pinia)** para manejar favoritos en lugar de múltiples estados locales.
- Una sola función `toggleFavorite` para verificar si existia ya enlalista favoritos por lo que se podria agregar/quitar favoritos.
- Función reutilizable `searchPokemon` para obtener la lista desde la API, donde tambien se realizo el filtro para el buscador.
- Componentes reutilizables (`PokemonList.vue`, `PokemonCard.vue`, `button/sFavorite.vue`).
- Variables de color y tipografía en `base.css` en lugar de definirlas en cada componente.
