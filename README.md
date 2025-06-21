# Proyecto de Práctica: Asincronía con JavaScript

Este proyecto lo construí como parte de mi práctica en la sección de **asincronía** de un curso de JavaScript. Es mi **primer ejercicio** aplicando distintos enfoques para manejar operaciones asincrónicas.

## 🎯 Objetivo

Explorar y practicar las diferentes formas de trabajar con asincronía en JavaScript, incluyendo:

- Uso de **promesas** con `.then()` y `.catch()`.
- Uso de **funciones asincrónicas (`async/await`)**, que internamente también trabajan con promesas. (Una funcion asincrona es una promesa en si)
- Uso de la API moderna **`fetch`**.
- Uso de la API clásica **`XMLHttpRequest`**.
- Implementación de un **flag (`hayCola`)** para controlar eventos y evitar que se solapen múltiples llamadas cuando el usuario cambia de moneda rápidamente.
- Entender el event loop de JS.
- Manejar y capturar errores de asincroníaa.

## 🧪 Estructura del proyecto

La aplicación permite seleccionar una moneda (CLP, USD, EUR) y consultar su valor frente a otras divisas, obteniendo los datos desde una API pública.

Aunque **todo este comportamiento podría optimizarse y simplificarse en una sola función genérica que consuma los datos**, el propósito de este ejercicio fue **probar distintos enfoques y comprender su funcionamiento por separado**.

## 🛠️ Tecnologías usadas

- JavaScript (puro)
- HTML/CSS
- API pública de tasas de cambio: [https://open.er-api.com](https://open.er-api.com)

## 📝 Notas finales

Este proyecto es 100% educativo y está enfocado en practicar la lógica asincrónica y entender de mejor manera el event loop de javascript, con su call stack, cola de tareas, etc. Hay muchas oportunidades para refactorizar y mejorar la arquitectura del código, pero en esta etapa la prioridad fue **entender y aplicar diferentes formas de asincronía**.

---

¡Gracias por visitar el proyecto, saludos! 😄
