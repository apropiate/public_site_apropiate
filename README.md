🚀 QUICK DEPLOY - GitHub Pages en 5 Minutos
✅ Checklist Rápido
[ ] 1 minuto: Crear repositorio en GitHub
[ ] 2 minutos: Subir archivos
[ ] 1 minuto: Activar GitHub Pages
[ ] 1 minuto: Configurar Google Apps Script URL
📋 Archivos Necesarios
Asegúrate de tener estos archivos en tu proyecto:
apropiate-website/
├── index.html      ✅ (código principal)
├── config.js       ✅ (configuración) 
├── README.md       📄 (documentación)
└── .gitignore      🚫 (ignorar archivos)


git clone https://github.com/apropiate/public_site_apropiate.git
cd public_site_apropiate

# Crear archivos localmente, luego:
git add .
git commit -m "Add Apropiate website"
git push origin main

🌐 Paso 3: Activar GitHub Pages (1 min)
En tu repositorio → Settings
Menú lateral → Pages
Source: Deploy from a branch
Branch: main
Folder: / (root)
Save
🎉 ¡Tu sitio ya está en línea!
https://TU-USUARIO.github.io/apropiate-website

🔧 Paso 4: Configurar Apps Script (1 min)
Abre config.js en GitHub
Click en ✏️ (Edit)
Busca esta línea:
GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec',

Reemplaza AKfycbzXXXXX... con tu ID real del Apps Script
Commit changes
🧪 Paso 5: Probar (1 min)
Ve a tu sitio: https://TU-USUARIO.github.io/apropiate-website
Completar el formulario
Verificar que lleguen datos a Google Sheet

🔄 Para Hacer Cambios Futuros
# Método 1: Editar en GitHub (más fácil)
1. Ir a archivo en GitHub
2. Click en ✏️ 
3. Hacer cambios
4. Commit changes
5. ¡Sitio se actualiza automáticamente!

# Método 2: Git local
git pull origin main
# hacer cambios
git add .
git commit -m "Update: descripción"
git push origin main

🚨 Solución de Problemas
"Sitio no aparece"
⏰ Esperar 5-10 minutos después del primer deploy
🔄 Hard refresh: Ctrl + F5
✅ Verificar que GitHub Pages esté activado
"Formulario no funciona"
🔧 Verificar URL del Apps Script en config.js
🌐 Abrir DevTools (F12) → Console para ver errores
📧 Verificar que el Apps Script esté desplegado como "Anyone"
"404 Error"
📁 Verificar que el archivo se llame exactamente index.html
📂 Verificar que esté en la raíz del repositorio

🎨 Personalización Rápida
Cambiar Logo/Nombre
En index.html, buscar:
<div class="logo">Apropiate</div>

Cambiar Colores
En index.html, buscar :root y cambiar:
--primary-gradient: linear-gradient(135deg, #TU_COLOR1, #TU_COLOR2);

Cambiar Contenido
Buscar las secciones en index.html y editar textos directamente.

🏆 ¡Listo!
Tu sitio profesional está funcionando con:
✅ Hosting gratuito en GitHub Pages
✅ SSL/HTTPS automático
✅ Formulario conectado a Google Sheets
✅ Design moderno y responsivo
✅ Deploy automático en cada cambio
Tu sitio: https://TU-USUARIO.github.io/apropiate-website
🎉 ¡Felicidades! Tienes un sitio web profesional funcionando en menos de 5 minutos!