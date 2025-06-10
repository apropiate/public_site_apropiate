🔧 Configuración Paso a Paso
📋 Checklist de Configuración
[ ] Repositorio clonado localmente
[ ] Archivos de configuración creados
[ ] Google Sheet configurado
[ ] Google Apps Script desplegado
[ ] Variables de entorno configuradas
[ ] Formulario probado localmente
[ ] Sitio desplegado en GitHub Pages
🚀 Setup Inicial (Solo la Primera Vez)
1. Crear Archivos de Configuración
Crea estos archivos en la raíz de tu proyecto:
.gitignore
.env
.env.local
.env.production
.DS_Store
Thumbs.db
*.log
.vscode/
.idea/
*.tmp

.env.example
# URL del Google Apps Script
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_AQUI/exec

# Email para notificaciones
CONTACT_EMAIL=tu-email@gmail.com

.env (tu archivo real)
GOOGLE_APPS_SCRIPT_URL=
CONTACT_EMAIL=

2. Configurar Google Apps Script
A. Crear Google Sheet
Ve a sheets.google.com
Nuevo documento → "Registros Apropiate"
Primera fila con encabezados:
 A1: FechaB1: Nombre  C1: ApellidoD1: EmailE1: AhorrosF1: Ingresos


B. Crear Apps Script
En tu Google Sheet: Extensions → Apps Script
Reemplazar el código con:
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const fecha = new Date();
    
    // Log para debugging
    console.log('Datos recibidos:', data);
    
    // Añadir fila con los datos
    sheet.appendRow([
      fecha,
      data.nombre || '',
      data.apellido || '',
      data.email || '',
      data.ahorros || '',
      data.ingresos || ''
    ]);
    
    // Enviar email de notificación
    enviarEmailNotificacion(data.nombre, data.apellido, data.email, data.ahorros, data.ingresos);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Datos guardados correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error en doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error', 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarEmailNotificacion(nombre, apellido, email, ahorros, ingresos) {
  try {
    // ¡CAMBIAR ESTE EMAIL POR EL TUYO!
    const destinatario = "TU-EMAIL@gmail.com";
    const asunto = `🏠 Nuevo registro en Apropiate - ${nombre} ${apellido}`;
    
    const mensaje = `
¡Nuevo registro en Apropiate!

📋 DATOS DEL CLIENTE:
• Nombre: ${nombre} ${apellido}
• Email: ${email}
• Ahorros disponibles: ${ahorros}
• Ingresos mensuales: ${ingresos}
• Fecha de registro: ${new Date().toLocaleString('es-ES')}

💡 PRÓXIMOS PASOS:
1. Contactar al cliente en las próximas 24 horas
2. Realizar análisis financiero personalizado  
3. Enviar propuesta adaptada a su situación

¡Nuevo cliente potencial registrado!

--
Apropiate - Sistema Automático de Notificaciones
    `;
    
    MailApp.sendEmail(destinatario, asunto, mensaje);
    console.log('Email enviado correctamente a:', destinatario);
    
  } catch (error) {
    console.error('Error enviando email:', error);
  }
}

function doGet() {
  return ContentService.createTextOutput("Apps Script de Apropiate funcionando correctamente ✅");
}

// Función de prueba
function testScript() {
  const testData = {
    nombre: "Juan",
    apellido: "Pérez", 
    email: "juan@test.com",
    ahorros: "10000-20000",
    ingresos: "3000-4000"
  };
  
  enviarEmailNotificacion(testData.nombre, testData.apellido, testData.email, testData.ahorros, testData.ingresos);
  console.log("Email de prueba enviado");
}

C. Desplegar Apps Script
Guardar el proyecto: Ctrl+S
Deploy → New deployment
Configuración:
Type: Web app
Description: Apropiate Contact Form Handler
Execute as: Me
Who has access: Anyone
Deploy
¡IMPORTANTE! Copiar la URL generada
D. Autorizar Permisos
La primera vez pedirá permisos
Authorize access
Seleccionar tu cuenta Google
Advanced → Go to [proyecto] (unsafe)
Allow
3. Configurar Variables de Entorno
Para Desarrollo Local
Edita tu archivo .env:
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID_COPIADO/exec
CONTACT_EMAIL=tu-email@gmail.com

Para Producción (GitHub Pages)
Edita index.html en la línea ~20:
production: {
    GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/TU_ID_REAL/exec',
    CONTACT_EMAIL: 'contacto@apropiate.com'
}

🧪 Testing
1. Probar Apps Script
// En Apps Script, ejecutar función de prueba:
testScript()

Deberías recibir un email de prueba.
2. Probar Localmente
# Iniciar servidor local
python -m http.server 8000

# Ir a http://localhost:8000
# Completar y enviar formulario
# Verificar que lleguen datos a Google Sheet

3. Probar en Producción
Hacer push a GitHub
Ir a tu sitio en GitHub Pages
Completar formulario
Verificar datos en Google Sheet
🚀
