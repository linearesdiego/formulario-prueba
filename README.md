# Formulario React - País, Estado y Ciudad

Este proyecto es un formulario interactivo en **React** que permite seleccionar **país, estado/provincia y ciudad**, junto con datos personales. los datos se reciben de api country,states y city que me recomendaron.

---

## 🛠 Tecnologías usadas

- React 19
- JavaScript
- TailwindCSS para estilos
- Axios para consumir la api

---

## ⚙️ Instalación

1. Clonar el repositorio

```bash
git clone <repo-url>
cd <project-folder>

npm install


npm run dev

```

## 📝 Uso

El formulario incluye los siguientes campos:

- **Nombre completo** (obligatorio)
- **Correo electrónico** (obligatorio, con validación básica)
- **Dirección** (opcional)
- **Telefono** (obligatorio)
- **País** (selector)
- **Estado/Provincia** (selector dependiente del país)
- **Ciudad** (selector dependiente del estado)

Al hacer clic en **Guardar**, se muestra un **modal** para confirmar los datos.

Al confirmar, se muestra un mensaje indicando que los datos se enviaron correctamente.
