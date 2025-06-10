###############################################################


🏠 Apropiate Website
Un sitio web moderno y profesional para servicios de alquiler con opción a compra, construido con HTML, CSS y JavaScript vanilla.
🚀 Características
✨ Diseño moderno con glassmorphism y gradientes
📱 Totalmente responsivo (móvil y desktop)
⚡ Súper rápido (sin frameworks pesados)
📋 Formulario integrado con Google Sheets
📧 Notificaciones automáticas por email
🎨 Animaciones suaves y efectos de scroll
🔒 Variables de entorno para configuración segura
📁 Estructura del Proyecto
apropiate-website/
├── index.html          # Página principal
├── .env                # Variables de entorno (no subir a GitHub)
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore          # Archivos a ignorar en Git
├── README.md           # Esta documentación
└── assets/             # (opcional) imágenes y recursos

🛠️ Desarrollo Local
Prerequisitos
Un navegador web moderno
Un editor de código (VS Code recomendado)
Git instalado
Servidor HTTP local (opcional pero recomendado)
1. Clonar el Repositorio
# Clonar tu repositorio
git clone https://github.com/TU-USUARIO/apropiate-website.git
cd apropiate-website

2. Configurar Variables de Entorno
# Copiar el archivo de ejemplo
cp .env.example .env

Edita el archivo .env con tus datos reales:
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_AQUI/exec
CONTACT_EMAIL=tu-email@gmail.com

3. Ejecutar Localmente
Opción A: Servidor HTTP Simple (Recomendado)
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (si tienes npm)
npx serve .

# Con PHP
php -S localhost:8000

Luego ve a: http://localhost:8000
Opción B: Abrir Directamente
Simplemente abre index.html en tu navegador, pero algunas funciones pueden no trabajar correctamente debido a restricciones CORS.
4. Desarrollo
Editar el código: Modifica index.html según necesites
Ver cambios: Refresca el navegador para ver los cambios
Probar formulario: El formulario necesita las variables de entorno configuradas
🔧 Configuración de Google Sheets
1. Crear Google Sheet
Ve a sheets.google.com
Crea una nueva hoja llamada "Registros Apropiate"
Añade estos encabezados en la primera fila:
 A1: Fecha | B1: Nombre | C1: Apellido | D1: Email | E1: Ahorros | F1: Ingresos


2. Configurar Google Apps Script
En tu Google Sheet: Extensions → Apps Script
Pega este código:
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const fecha = new Date();
    
    sheet.appendRow([
      fecha,
      data.nombre,
      data.apellido,
      data.email,
      data.ahorros,
      data.ingresos
    ]);
    
    // Enviar email de notificación
    enviarEmailNotificacion(data.nombre, data.apellido, data.email, data.ahorros, data.ingresos);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarEmailNotificacion(nombre, apellido, email, ahorros, ingresos) {
  const destinatario = "TU-EMAIL@gmail.com"; // ¡CAMBIAR!
  const asunto = "🏠 Nuevo registro en Apropiate - " + nombre + " " + apellido;
  
  const mensaje = `
    ¡Nuevo registro en Apropiate!
    
    📋 DATOS DEL CLIENTE:
    • Nombre: ${nombre} ${apellido}
    • Email: ${email}
    • Ahorros disponibles: ${ahorros}
    • Ingresos mensuales: ${ingresos}
    • Fecha: ${new Date().toLocaleString('es-ES')}
    
    💡 PRÓXIMOS PASOS:
    1. Contactar en las próximas 24 horas
    2. Realizar análisis financiero
    3. Enviar propuesta personalizada
  `;
  
  MailApp.sendEmail(destinatario, asunto, mensaje);
}

Guardar y desplegar como Web App:
Deploy → New deployment
Type: Web app
Execute as: Me
Access: Anyone
Copiar la URL generada
3. Actualizar Variables de Entorno
Actualiza tu archivo .env con la URL del Apps Script:
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_COPIADO/exec

🚀 Despliegue
Despliegue en GitHub Pages
1. Preparar para Despliegue
# Asegurarse de que .env está en .gitignore
echo ".env" >> .gitignore

# Añadir cambios
git add .
git commit -m "Prepare for deployment"
git push origin main

2. Activar GitHub Pages
Ve a tu repositorio en GitHub
Settings → Pages
Source: Deploy from a branch
Branch: main / (root)
Save
Tu sitio estará en: https://TU-USUARIO.github.io/apropiate-website
3. Configurar Variables de Entorno en GitHub
Como GitHub Pages no soporta variables de entorno del lado del servidor, necesitas:
Opción A: Hardcodear para producción
// En el script del formulario, reemplazar:
const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || 'URL_DE_RESPALDO';

// Por:
const scriptUrl = 'https://script.google.com/macros/s/TU_ID/exec';

Opción B: Usar GitHub Actions (Avanzado) Crear .github/workflows/deploy.yml para automatizar el despliegue con variables.
Otros Proveedores de Hosting
Netlify (Recomendado para variables de entorno)
Conectar repositorio en netlify.com
Configurar variables de entorno en Site Settings → Environment Variables
El sitio se despliega automáticamente
Vercel
Importar proyecto en vercel.com
Configurar variables de entorno en el dashboard
Despliegue automático
🔄 Flujo de Desarrollo
Hacer Cambios Locales
# 1. Crear nueva rama para features
git checkout -b nueva-funcionalidad

# 2. Hacer cambios en el código
# Editar index.html, CSS, JavaScript

# 3. Probar localmente
python -m http.server 8000

# 4. Commit cambios
git add .
git commit -m "Descripción del cambio"

# 5. Push a GitHub
git push origin nueva-funcionalidad

# 6. Crear Pull Request en GitHub
# 7. Merge a main después de review

Actualizar Sitio en Producción
# Cambiar a rama principal
git checkout main

# Traer últimos cambios
git pull origin main

# Hacer cambios
# ... editar archivos ...

# Commit y push
git add .
git commit -m "Update: descripción"
git push origin main

# GitHub Pages se actualiza automáticamente

🎨 Personalización
Cambiar Colores
Edita las variables CSS en index.html:
:root {
    --primary-gradient: linear-gradient(135deg, #TU_COLOR1, #TU_COLOR2);
    --secondary-gradient: linear-gradient(135deg, #TU_COLOR3, #TU_COLOR4);
}

Cambiar Contenido
Textos: Edita directamente en el HTML
Imágenes: Añade en carpeta assets/ y actualiza las rutas
Formulario: Modifica los campos en la sección #contacto
Añadir Nuevas Secciones
<!-- Nueva sección después de beneficios -->
<section class="section nueva-seccion">
    <h2>Tu Nueva Sección</h2>
    <p>Contenido aquí...</p>
</section>

🔍 Testing
Probar Formulario
Completar formulario de contacto
Verificar en Google Sheet que llegaron los datos
Verificar que llegó el email de notificación
Probar Responsividad
# En Chrome DevTools
F12 → Toggle Device Toolbar → Probar diferentes dispositivos

Probar Performance
Chrome DevTools → Lighthouse
Debería dar 90+ en Performance
🚨 Troubleshooting
El formulario no funciona
# Verificar en Chrome DevTools (F12) → Console
# Errores comunes:
# - URL del Apps Script incorrecta
# - CORS errors (usar servidor HTTP local)
# - JavaScript errors

Cambios no aparecen en GitHub Pages
# Soluciones:
# 1. Esperar 5-10 minutos
# 2. Hacer hard refresh (Ctrl + F5)
# 3. Verificar que se hizo push a la rama main

Variables de entorno no funcionan
# GitHub Pages no soporta .env del lado del servidor
# Usar el método de hardcodear para producción

📞 Soporte
Si tienes problemas:
Revisa la consola del navegador (F12)
Verifica que todas las URLs estén correctas
Asegúrate de que el Apps Script esté desplegado correctamente
Verifica los permisos de Google Sheets
📝 Licencia
Este proyecto es de código abierto. Puedes usarlo y modificarlo libremente.
🤝 Contribuir
Fork el proyecto
Crear rama para tu feature (git checkout -b nueva-funcionalidad)
Commit cambios (git commit -m 'Añadir nueva funcionalidad')
Push a la rama (git push origin nueva-funcionalidad)
Abrir Pull Request

¡Hecho con ❤️ para Apropiate!


###############################################################
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b2652b23-4cfa-4c2c-8eb8-fd6e3a798543

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b2652b23-4cfa-4c2c-8eb8-fd6e3a798543) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b2652b23-4cfa-4c2c-8eb8-fd6e3a798543) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
