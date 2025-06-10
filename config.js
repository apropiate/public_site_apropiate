// config.js - Configuración simple para GitHub Pages
// Este archivo maneja la configuración sin necesidad de variables de entorno del servidor

window.APROPIATE_CONFIG = (function() {
    
    // Detectar entorno automáticamente
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                   hostname === '127.0.0.1' || 
                   hostname === '' ||
                   hostname.includes('localhost');
    
    const isDevelopment = isLocal || hostname.includes('github.io');
    const isProduction = !isLocal && !hostname.includes('github.io');
    
    // Configuraciones por entorno
    const config = {
        development: {
            GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/TU_ID_DESARROLLO/exec',
            CONTACT_EMAIL: 'desarrollo@apropiate.com',
            DEBUG: true,
            ENVIRONMENT: 'development'
        },
        
        staging: {
            GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/TU_ID_STAGING/exec', 
            CONTACT_EMAIL: 'staging@apropiate.com',
            DEBUG: true,
            ENVIRONMENT: 'staging'
        },
        
        production: {
            // ¡IMPORTANTE! Reemplaza con tu URL real del Google Apps Script
            GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/a/macros/apropiate.ai/s/AKfycbzDPgy4w5dxZ2P82IHLQwWfOq0Ljh5klV-GA9z35_xPQfGE1yorp9gZnO2NZZj_oI6rlQ/exec',
            CONTACT_EMAIL: 'admin@apropiate.ai',
            DEBUG: false,
            ENVIRONMENT: 'production'
        }
    };
    
    // Seleccionar configuración basada en el entorno
    let currentEnv = 'development';
    
    if (hostname.includes('github.io')) {
        currentEnv = 'staging'; // Considera GitHub Pages como staging
    } else if (hostname === 'apropiate.com' || hostname === 'www.apropiate.com') {
        currentEnv = 'production'; // Tu dominio personalizado
    }
    
    const currentConfig = config[currentEnv];
    
    // Log para debugging (solo en desarrollo)
    if (currentConfig.DEBUG) {
        console.log('🔧 Apropiate Config:', {
            environment: currentEnv,
            hostname: hostname,
            config: currentConfig
        });
    }
    
    // Validar configuración
    if (!currentConfig.GOOGLE_APPS_SCRIPT_URL || currentConfig.GOOGLE_APPS_SCRIPT_URL.includes('TU_ID')) {
        console.warn('⚠️ Google Apps Script URL no configurada correctamente');
        if (currentConfig.DEBUG) {
            alert('Configuración incompleta: Necesitas configurar la URL del Google Apps Script');
        }
    }
    
    // Funciones utilitarias
    currentConfig.utils = {
        
        // Función para enviar datos al formulario
        submitForm: async function(formData) {
            try {
                if (currentConfig.DEBUG) {
                    console.log('📤 Enviando formulario:', formData);
                }
                
                const response = await fetch(currentConfig.GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Necesario para Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        timestamp: new Date().toISOString(),
                        environment: currentConfig.ENVIRONMENT,
                        source: 'apropiate_website'
                    })
                });
                
                if (currentConfig.DEBUG) {
                    console.log('✅ Formulario enviado correctamente');
                }
                
                return { success: true };
                
            } catch (error) {
                console.error('❌ Error enviando formulario:', error);
                
                if (currentConfig.DEBUG) {
                    alert(`Error enviando formulario: ${error.message}`);
                }
                
                return { success: false, error: error.message };
            }
        },
        
        // Función para analytics
        trackEvent: function(eventName, properties = {}) {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    ...properties,
                    environment: currentConfig.ENVIRONMENT
                });
            }
            
            if (currentConfig.DEBUG) {
                console.log('📊 Analytics Event:', eventName, properties);
            }
        },
        
        // Función para validar email
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        // Función para formatear números de teléfono (si los añades)
        formatPhone: function(phone) {
            return phone.replace(/\D/g, '');
        }
    };
    
    return currentConfig;
})();

// Hacer la configuración disponible globalmente
window.CONFIG = window.APROPIATE_CONFIG;