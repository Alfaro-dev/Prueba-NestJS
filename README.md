# API de Tareas en NestJS ✅

API REST de gestión de tareas construida con **NestJS** como prueba técnica: usuarios, autenticación con JWT y CRUD de tareas.

## ✨ Funciones

- Registro e inicio de sesión con **JWT** y **Passport**
- Contraseñas cifradas con **bcrypt**
- CRUD de tareas por usuario
- Validación con **class-validator**
- Migraciones con **TypeORM**
- Filtro global de excepciones HTTP

## 🛠️ Stack

- **NestJS** + **TypeScript**
- **TypeORM**
- **JWT**, **Passport**, **bcrypt**

## 📁 Estructura

```
src/
├── modules/          # auth, tasks, users
├── entities/         # user.entity, task.entity
├── database/         # módulo y migraciones
├── guards/           # auth.guard
└── exceptions/       # http-exception.filter
```

## 🚀 Cómo correrlo

```bash
npm install
npm run start:dev
```

---

Desarrollado por [Carlos Alfaro](https://carlosalfaro.dev).
