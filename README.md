# RG Playwright Framework

Framework de automatización de pruebas diseñado para la fiabilidad y facilidad de mantenimiento.

## 🚀 Características

-   **Arquitectura**:
    -   **Composición sobre Herencia**: Los Page Objects componen Componentes (por ejemplo, `InventoryPage` tiene un `Header`), promoviendo la modularidad.
    -   **Poder Nativo**: Uso directo de la API de Playwright sin envoltorios (wrappers) innecesarios.
-   **Infraestructura**:
    -   **Ciclo de Vida Global**: Hooks centralizados de `Global Setup` y `Teardown` (preparados para conexiones a BD).
    -   **Alias de Rutas**: Importaciones limpias usando `@components`, `@pages`, `@utils`.
-   **Reportes y Logs**:
    -   **Reporter Personalizado**: Implementación de estrategia por lotes (Batch) para optimizar la subida de métricas.
    -   **Logger Winston**: Logging estructurado, por niveles y con colores en consola/archivo.
-   **Optimizado para CI/CD**:
    -   **Docker**: Usa el contenedor de Playwright para omitir la instalación del navegador (tiempo de ejecución ~45s).
    -   **GitHub Actions**: Jobs paralelos para pruebas de API y UI.

## 📂 Estructura del Proyecto

```
src/
├── api/             # Servicios y Contextos de API
├── config/          # Infraestructura Global (dbConn, globalSetup, globalTeardown)
├── fixtures/        # Test Fixtures (Inyección de Page Objects)
├── reporters/       # Reporters Personalizados
├── utils/           # Utilidades Compartidas (Logger)
└── web/
    ├── components/  # Componentes de UI Reutilizables (Header, Footer)
    └── pages/       # Page Objects (InventoryPage)
tests/
├── api/             # Suites de Pruebas de API
└── web/             # Suites de Pruebas de UI
```

## 🛠️ Configuración

1.  **Requisitos**: Node.js (LTS).
2.  **Instalar Dependencias**:
    ```bash
    npm install
    ```
3.  **Variables de Entorno**:
    Copia `.env.example` a `.env` (o configúralas manualmente):
    ```bash
    BASE_URL=https://www.saucedemo.com
    API_BASE_URL=https://petstore.swagger.io/v2
    LOG_LEVEL=info
    # Configuración de BD (Opcional)
    # DB_HOST=localhost
    # DB_USER=admin
    # DB_PASSWORD=secret
    ```

## ⚡ Ejecución de Pruebas

### Pruebas de UI
Ejecuta las pruebas usando Chromium y Firefox.
```bash
npm run test:ui
```

### Pruebas de API
Ejecuta la suite de automatización de API.
```bash
npm run test:api
```

### Modo Depuración (UI)
Lanza la interfaz interactiva de Playwright para depurar.
```bash
npm run shopping:ui
```

## 🔍 CI/CD
El flujo de trabajo de GitHub Actions se encuentra en `.github/workflows/playwright.yml`.

-   **Secretos Requeridos**: `API_BASE_URL`, `BASE_URL`.
