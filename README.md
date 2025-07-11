# 🚗 Vehicle Manufacturers API

## 📋 Descripción
API RESTful simple desarrollada con **NestJS** y **TypeScript** que consulta fabricantes de vehículos desde la API de **NHTSA**. Implementa filtros, paginación, ordenamiento y validación automática.

## 🏗️ Estructura del Proyecto
```
trabajo/
├── src/
│   ├── main.ts                            # Bootstrap de la aplicación
│   ├── app.module.ts                      # Módulo raíz
│   ├── app.controller.ts                  # Health check
│   └── manufacturers/                     # Módulo principal
│       ├── manufacturers.module.ts        # Configuración del módulo
│       ├── manufacturers.controller.ts    # Endpoints REST
│       ├── manufacturers.service.ts       # Lógica de negocio
│       ├── dto/
│       │   ├── manufacturer.dto.ts        # DTOs de respuesta
│       │   └── filter-manufacturers.dto.ts # DTO de filtros
│       └── utils/
│           └── manufacturer-filter.service.ts # Lógica de filtrado
├── package.json                           # Dependencias
└── README.md                             # Este archivo
```

## 🌐 Endpoints

### Health Check
- **GET** `/` - Verificar estado del servidor

### Manufacturers
- **GET** `/manufacturers` - Listado completo de fabricantes
- **GET** `/manufacturers/filtered` - Con filtros y paginación
- **GET** `/manufacturers/by-country` - Por país específico

## 🛠️ Stack Tecnológico
- **NestJS** - Framework principal
- **TypeScript** - Lenguaje
- **Swagger** - Documentación automática
- **RxJS** - Programación reactiva
- **class-validator** - Validación de DTOs
- **Axios** - Cliente HTTP

## 📊 Funcionalidades
- ✅ Filtros por país, nombre, tipo de vehículo
- ✅ Búsqueda general
- ✅ Paginación y ordenamiento
- ✅ Validación automática
- ✅ Documentación Swagger
- ✅ Manejo de errores

## 🚀 Comandos

### Desarrollo
```bash
npm install                    # Instalar dependencias
npm run start:dev              # Desarrollo (puerto 3001)
npm run build                  # Compilar
npm run start:prod             # Producción
```

### Testing
```bash
npm run test                   # Tests unitarios
npm run test:e2e               # Tests end-to-end
npm run test:cov               # Coverage
```

### Documentación
```bash
# Swagger UI disponible en:
http://localhost:3001/api/docs
```

## 🌐 API Externa
- **Base URL**: `https://vpic.nhtsa.dot.gov/api/vehicles`
- **Endpoints**: 
  - `/getallmanufacturers?format=json`
  - `/getallmanufacturers?format=json&country={country}`

## 📝 Ejemplo de Uso

### Health Check
```bash
curl http://localhost:3001/
```

### Obtener fabricantes
```bash
# Todos los fabricantes
curl http://localhost:3001/manufacturers

# Con filtros
curl "http://localhost:3001/manufacturers/filtered?country=UNITED%20STATES&page=1&limit=10"

# Por país
curl "http://localhost:3001/manufacturers/by-country?country=GERMANY"
```

## 📁 Arquitectura Simple
- **Controllers**: Manejo de requests HTTP
- **Services**: Lógica de negocio y llamadas a APIs externas
- **DTOs**: Validación y tipado de datos
- **Utils**: Servicios auxiliares para filtrado y paginación

---
*API desarrollada para consultar fabricantes de vehículos de manera simple y eficiente*
