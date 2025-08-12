document.addEventListener('DOMContentLoaded', () => {

    // A função principal para definir o idioma
    const setLanguage = (lang) => {
        // Verifica se a variável 'translations' existe (foi carregada do outro ficheiro)
        if (typeof translations === 'undefined') {
            console.error("Ficheiro de traduções (translations.js) não foi carregado.");
            return;
        }

        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                // Se o elemento é um span dentro de um h1, atualiza o span
                const targetElement = elem.querySelector('.text-gradient') || elem;
                targetElement.innerHTML = translations[lang][key];
            }
        });
        // Guarda a preferência do utilizador no armazenamento local
        localStorage.setItem('language', lang);
    };

    // Adiciona os eventos de clique nos botões
    const langEN = document.getElementById('lang-en');
    const langPT = document.getElementById('lang-pt');

    if (langEN) {
        langEN.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('en');
        });
    }

    if (langPT) {
        langPT.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('pt');
        });
    }

// --- Lógica de Deteção de Idioma ---

// 1. Verifica se o utilizador já fez uma escolha antes (Prioridade 1)
    let userLanguage = localStorage.getItem('language');

// 2. Se não houver escolha guardada, verifica o idioma do navegador (Prioridade 2)
    if (!userLanguage) {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('pt')) {
            userLanguage = 'pt';
        } else {
            // Para qualquer outra língua, o padrão é inglês (Prioridade 3)
            userLanguage = 'en';
        }
    }

// Define o idioma inicial
    setLanguage(userLanguage);
});