const I18N_STORAGE_KEY = 'duckencio-lang';
const DEFAULT_LANG = 'es';
const SUPPORTED_LANGS = ['es', 'en'];

const copy = {
    es: {
        meta: {
            title: 'Francisco Aburto - Baterista de Sesión'
        },
        nav: {
            about: 'Acerca de',
            work: 'Trabajo',
            experience: 'Experiencia',
            gallery: 'Galería',
            contact: 'Contacto',
            cta: 'Hablemos',
            menuToggle: 'Abrir menú de navegación',
            languageSelector: 'Selector de idioma',
            switchToSpanish: 'Cambiar a español',
            switchToEnglish: 'Cambiar a inglés'
        },
        hero: {
            title: 'FRANCISCO ABURTO',
            subtitle: 'BATERISTA DE SESIÓN Y GIRAS',
            primaryCta: 'Escúchame',
            secondaryCta: 'Contacto'
        },
        about: {
            title: 'ACERCA DE MÍ',
            body: 'Nací en Mexicali, estudié música contemporánea y llevo años viviendo en la carretera y en el estudio. Toco rock, pop, indie y lo que el proyecto necesite — lo que no cambia es que siempre voy a estar in the pocket. Si buscas a alguien que se adapte rápido, lea la sala y haga que la banda suene bien, hablemos.'
        },
        work: {
            title: 'MI TRABAJO',
            body: 'Aquí puedes ver cómo trabajo en vivo y escuchar algunos de los proyectos en los que he grabado.',
            videoFallback: 'Tu navegador no soporta el tag de video.',
            showreel: 'Showreel 2025',
            recordingsTitle: 'Lo que he grabado'
        },
        experience: {
            title: 'EXPERIENCIA PROFESIONAL',
            body: 'Desde salas chicas en Mexicali hasta escenarios grandes en gira — he tocado con quién hay que tocar y he cargado los tambos de quién hay que aprender.',
            musicianTitle: 'Como músico',
            techTitle: 'Como técnico de giras'
        },
        roles: {
            drummer: 'Baterista',
            drumTech: 'Drum Tech',
            stageManager: 'Stage Manager',
            stageHand: 'Stage Hand',
            monitorEngineer: 'Ing. Monitores'
        },
        gallery: {
            title: 'GALERÍA',
            body: 'En vivo, en estudio, en la carretera.',
            altStage: 'Francisco en el escenario',
            altSession: 'Sesión de grabación',
            altLive: 'En vivo',
            altPortrait: 'Francisco Aburto',
            altDrums: 'En la batería'
        },
        contact: {
            title: 'CONTACTO',
            body: '¿Tienes una fecha, una sesión o un proyecto en puerta? Escríbeme.'
        },
        footer: {
            rights: 'Francisco Aburto. Todos los derechos reservados.'
        }
    },
    en: {
        meta: {
            title: 'Francisco Aburto - Session Drummer'
        },
        nav: {
            about: 'About',
            work: 'Work',
            experience: 'Experience',
            gallery: 'Gallery',
            contact: 'Contact',
            cta: 'Let’s talk',
            menuToggle: 'Open navigation menu',
            languageSelector: 'Language selector',
            switchToSpanish: 'Switch to Spanish',
            switchToEnglish: 'Switch to English'
        },
        hero: {
            title: 'FRANCISCO ABURTO',
            subtitle: 'SESSION AND TOURING DRUMMER',
            primaryCta: 'Hear me play',
            secondaryCta: 'Contact'
        },
        about: {
            title: 'ABOUT ME',
            body: 'I was born in Mexicali, studied contemporary music, and have spent years living between the road and the studio. I play rock, pop, indie, and whatever the project needs — what never changes is that I’m always in the pocket. If you need someone who adapts fast, reads the room, and helps the band sound right, let’s talk.'
        },
        work: {
            title: 'MY WORK',
            body: 'Here you can see how I work live and hear some of the projects I’ve recorded on.',
            videoFallback: 'Your browser does not support the video tag.',
            showreel: 'Showreel 2025',
            recordingsTitle: 'What I’ve recorded'
        },
        experience: {
            title: 'PROFESSIONAL EXPERIENCE',
            body: 'From small rooms in Mexicali to bigger stages on tour — I’ve played with the people you want to play with and carried drums for the people you learn from.',
            musicianTitle: 'As a musician',
            techTitle: 'As a tour tech'
        },
        roles: {
            drummer: 'Drummer',
            drumTech: 'Drum Tech',
            stageManager: 'Stage Manager',
            stageHand: 'Stage Hand',
            monitorEngineer: 'Monitor engineer'
        },
        gallery: {
            title: 'GALLERY',
            body: 'Live, in the studio, on the road.',
            altStage: 'Francisco on stage',
            altSession: 'Recording session',
            altLive: 'Live show',
            altPortrait: 'Francisco Aburto',
            altDrums: 'Behind the drums'
        },
        contact: {
            title: 'CONTACT',
            body: 'Got a date, a session, or a project coming up? Write me.'
        },
        footer: {
            rights: 'Francisco Aburto. All rights reserved.'
        }
    }
};

const getNestedValue = (source, path) => {
    return path.split('.').reduce((value, key) => value && value[key], source);
};

const getStoredLang = () => {
    try {
        const storedLang = localStorage.getItem(I18N_STORAGE_KEY);
        return SUPPORTED_LANGS.includes(storedLang) ? storedLang : DEFAULT_LANG;
    } catch (error) {
        return DEFAULT_LANG;
    }
};

const storeLang = (lang) => {
    try {
        localStorage.setItem(I18N_STORAGE_KEY, lang);
    } catch (error) {
        // Keep language switching available even if persistence is blocked.
    }
};

const applyLanguage = (lang) => {
    const activeLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    const activeCopy = copy[activeLang];

    document.documentElement.lang = activeLang;
    document.title = activeCopy.meta.title;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const value = getNestedValue(activeCopy, element.dataset.i18n);
        if (typeof value === 'string') {
            element.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
        const value = getNestedValue(activeCopy, element.dataset.i18nAlt);
        if (typeof value === 'string') {
            element.setAttribute('alt', value);
        }
    });

    document.querySelectorAll('[data-i18n-label]').forEach((element) => {
        const value = getNestedValue(activeCopy, element.dataset.i18nLabel);
        if (typeof value === 'string') {
            element.setAttribute('aria-label', value);
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
        const value = getNestedValue(activeCopy, element.dataset.i18nTitle);
        if (typeof value === 'string') {
            element.setAttribute('title', value);
        }
    });

    document.querySelectorAll('[data-lang-option]').forEach((button) => {
        const isActive = button.dataset.langOption === activeLang;
        button.classList.toggle('bg-[#8a3ffc]', isActive);
        button.classList.toggle('text-white', isActive);
        button.classList.toggle('text-gray-300', !isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
};

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getStoredLang());

    document.querySelectorAll('[data-lang-option]').forEach((button) => {
        button.addEventListener('click', () => {
            const nextLang = button.dataset.langOption;
            if (!SUPPORTED_LANGS.includes(nextLang)) {
                return;
            }

            storeLang(nextLang);
            applyLanguage(nextLang);

            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenuIconOpen = document.getElementById('mobile-menu-icon-open');
            const mobileMenuIconClose = document.getElementById('mobile-menu-icon-close');

            if (mobileMenu && mobileMenuToggle && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');

                if (mobileMenuIconOpen && mobileMenuIconClose) {
                    mobileMenuIconOpen.classList.remove('hidden');
                    mobileMenuIconClose.classList.add('hidden');
                }
            }
        });
    });
});
