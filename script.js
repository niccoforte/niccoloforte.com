const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");
const languageSelect = document.getElementById("languageSelect");
const pageName = document.body.dataset.page || "home";
const supportedLanguages = new Set(["en", "it"]);

const pageTitleEl = document.querySelector("title");
const pageDescriptionEl = document.querySelector('meta[name="description"]');
const ogTitleEl = document.querySelector('meta[property="og:title"]');
const ogDescriptionEl = document.querySelector('meta[property="og:description"]');

const originalState = {
  title: document.title,
  description: pageDescriptionEl ? pageDescriptionEl.content : "",
  ogTitle: ogTitleEl ? ogTitleEl.content : "",
  ogDescription: ogDescriptionEl ? ogDescriptionEl.content : "",
  text: new Map(),
  html: new Map(),
  ariaLabel: new Map(),
  themeLabels: themeToggle
    ? {
        lightLabel: themeToggle.dataset.lightLabel || "Light",
        darkLabel: themeToggle.dataset.darkLabel || "Dark",
        lightTitle: themeToggle.dataset.lightTitle || "Switch to light mode",
        darkTitle: themeToggle.dataset.darkTitle || "Switch to dark mode",
      }
    : null,
};

document.querySelectorAll("[data-i18n]").forEach((element) => {
  originalState.text.set(element, element.textContent);
});

document.querySelectorAll("[data-i18n-html]").forEach((element) => {
  originalState.html.set(element, element.innerHTML);
});

document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
  originalState.ariaLabel.set(element, element.getAttribute("aria-label") || "");
});

const translations = {
  it: {
    common: {
      ariaLabel: {
        navToggleLabel: "Apri menu",
        languageSelectorLabel: "Selettore lingua",
        emailLabel: "Email",
        githubLabel: "GitHub",
        linkedinLabel: "LinkedIn",
      },
      themeLabels: {
        lightLabel: "Chiaro",
        darkLabel: "Scuro",
        lightTitle: "Passa alla modalità chiara",
        darkTitle: "Passa alla modalità scura",
      },
    },
    home: {
      meta: {
        title: "Niccolò Forte",
        description:
          "Niccolò Forte è dottorando in ingegneria aerospaziale alla Queen Mary University of London, dove lavora su metamateriali reticolari, meccanica computazionale e machine learning.",
        ogTitle: "Niccolò Forte",
        ogDescription:
          "Ricerca, scrittura e lavoro tecnico su metamateriali reticolari, ingegneria computazionale e progettazione guidata dai dati.",
      },
      text: {
        languageLabel: "Lingua",
        navAbout: "Profilo",
        navInterests: "Interessi",
        navPublications: "Pubblicazioni",
        navResearch: "Ricerca",
        navSoftware: "Software",
        navBlog: "Blog",
        navContact: "Contatti",
        heroRole: "Dottorando in Ingegneria Aerospaziale",
        heroSubtitleDegree: "Dottorando in Ingegneria Aerospaziale",
        heroSubtitleUniversity: "Queen Mary University of London",
        heroDetail: "Metamateriali reticolari - Meccanica computazionale - Machine learning",
        aboutTitle: "Abstract",
        researchTitle: "Interessi di Ricerca",
        interest1Caption: "Fig. 1: Concetto di cella unitaria reticolare distorta",
        interest1Title: "Metamateriali meccanici",
        interest1Text:
          "Architetture reticolari leggere, meccanismi di cedimento, tolleranza al danno e progettazione strutturale per applicazioni aerospaziali.",
        interest2Caption: "Fig. 2: Astrazione di un campo di tensione agli elementi finiti",
        interest2Title: "Meccanica computazionale",
        interest2Text:
          "Progettazione guidata dalla simulazione con Abaqus e ANSYS, strategie di campionamento adattivo e workflow numerici per analisi strutturali affidabili.",
        interest3Caption: "Fig. 3: Ciclo di progettazione guidato dai dati",
        interest3Title: "Machine learning per la progettazione",
        interest3Text:
          "Modelli surrogati, apprendimento informato dalla fisica, rappresentazioni basate su grafi e pipeline di ottimizzazione per decisioni ingegneristiche.",
        interest4Caption: "Fig. 4: Studi di progettazione aerodinamica e strutturale",
        interest4Title: "Ingegneria aerospaziale applicata",
        interest4Text:
          "Efficienza dei materiali, ottimizzazione di forma e topologia, e le questioni di meccanica dietro le strutture del volo del futuro.",
        publicationsTitle: "Pubblicazioni",
        experienceTitle: "Esperienza di ricerca e tecnica",
        softwareTitle: "Software e lavoro digitale",
        educationTitle: "Formazione",
        writingTitle: "Scrittura",
        writingIntro:
          "Note in sviluppo su metamateriali, modellazione, giudizio ingegneristico e quelle piccole decisioni che rendono il lavoro tecnico più affidabile.",
        viewAllNotes: "Vedi tutte le note",
        contactTitle: "Contatti",
        contactIntro:
          "Sono sempre felice di sentire persone che lavorano su meccanica strutturale, ricerca aerospaziale, metamateriali, software ingegneristico o insegnamento tecnico ben fatto.",
        cvLabel: "Curriculum Vitae",
      },
      html: {
        aboutCopy: `
          <p>
            Sono dottorando in Ingegneria Aerospaziale alla Queen Mary University of
            London, dove studio metamateriali meccanici ultraleggeri e tolleranti al danno per il
            trasporto aereo del futuro. Il mio lavoro attuale si concentra su architetture
            reticolari quasi distorte, workflow adattivi agli elementi finiti e ottimizzazione
            strutturale guidata dal machine learning.
          </p>
          <p>
            Prima di iniziare il dottorato ho conseguito una laurea triennale con First Class Honours
            in Mechanical Engineering alla Queen Mary. La mia tesi di laurea ha esplorato la
            previsione dei coefficienti aerodinamici di profili alari tramite machine learning, e
            quello stesso interesse per il calcolo continua a guidare il mio approccio alla
            meccanica, alla simulazione e alla progettazione.
          </p>
          <p>
            Essendo cresciuto tra Washington, Gerusalemme, Roma, Bruxelles e Londra, tendo a portare
            nella ricerca una prospettiva internazionale e interdisciplinare. Accanto al lavoro di
            dottorato, insegno in diversi moduli di ingegneria, lavoro con dati e software, e tengo
            molto a come le idee tecniche possano essere spiegate con chiarezza e sviluppate con cura.
          </p>
        `,
        publication1: `
          <p class="timeline-meta">2026 - In revisione</p>
          <h3>Articolo su metamateriali reticolari quasi disordinati e risposta al cedimento</h3>
          <p class="timeline-subtle">Niccolò Forte</p>
          <p>
            Percorso di pubblicazione in corso nato dal lavoro di dottorato su metamateriali
            meccanici leggeri, architetture quasi disordinate e comportamento strutturale tollerante
            al danno.
          </p>
        `,
        publication2: `
          <p class="timeline-meta">2026 - Queen Mary University of London</p>
          <h3>Presentazione al Russell Binion Research Symposium</h3>
          <p class="timeline-subtle">Contributo a simposio di ricerca - 21 aprile 2026</p>
          <p>
            Presentazione del lavoro di dottorato in corso su metamateriali reticolari, workflow di
            simulazione e metodi di ottimizzazione guidati dai dati.
          </p>
        `,
        publication3: `
          <p class="timeline-meta">2024 - Atene, Grecia</p>
          <h3>Presentazione alla conferenza ICEFA-X</h3>
          <p class="timeline-subtle">Tenth International Conference on Engineering Failure Analysis</p>
          <p>
            Presentazione dei primi risultati del dottorato su failure analysis e sistemi reticolari
            quasi distorti a ICEFA-X, tenutasi dal 7 al 10 luglio 2024.
          </p>
        `,
        experience1: `
          <p class="timeline-meta">2023-presente</p>
          <h3>Metamateriali meccanici ultraleggeri e tolleranti al danno</h3>
          <p class="timeline-subtle">Queen Mary University of London - Ricerca di dottorato</p>
          <p>
            Sviluppo di percorsi di progettazione per la fabbricazione di metamateriali reticolari
            quasi distorti, con attenzione a ottimizzazione di topologia, forma e dimensione tramite
            machine learning informato dalla fisica e meccanica strutturale.
          </p>
        `,
        experience2: `
          <p class="timeline-meta">2024-presente</p>
          <h3>Teaching assistant in diversi moduli di ingegneria</h3>
          <p class="timeline-subtle">Queen Mary University of London</p>
          <p>
            Supporto alla didattica in fluidodinamica, CFD, meccanica dei solidi, FEA, termodinamica,
            modellazione computazionale e corsi di ingegneria incentrati sulla simulazione.
          </p>
        `,
        experience3: `
          <p class="timeline-meta">2022</p>
          <h3>Data Science Intern</h3>
          <p class="timeline-subtle">Red Bull</p>
          <p>
            Lavoro su stime di mercato, valutazione e-commerce e analisi commerciali, rafforzando il
            lato dati e modellazione del mio profilo tecnico.
          </p>
        `,
        experience4: `
          <p class="timeline-meta">2020-2023</p>
          <h3>Machine learning per la previsione dei coefficienti di profili alari</h3>
          <p class="timeline-subtle">Queen Mary University of London - Tesi di laurea triennale</p>
          <p>
            Sviluppo di modelli predittivi per coefficienti aerodinamici sperimentali, combinando
            ragionamento numerico, giudizio ingegneristico e metodi di machine learning applicato.
          </p>
        `,
        software1: `
          <p class="timeline-meta">2026-presente</p>
          <h3>
            <a
              class="inline-link"
              href="https://github.com/niccoforte/niccoloforte.com"
              target="_blank"
              rel="noreferrer"
            >
              niccoloforte.com
            </a>
          </h3>
          <p class="timeline-subtle">Repository del sito personale</p>
          <p>
            Progettazione e manutenzione del mio sito personale come spazio minimale orientato alla
            ricerca per pubblicazioni, scrittura tecnica e informazioni accademiche pubbliche.
          </p>
        `,
        software2: `
          <p class="timeline-meta">2021-2022</p>
          <h3>Sviluppatore IT e web</h3>
          <p class="timeline-subtle">Dante Alighieri Project Foundation</p>
          <p>
            Lavoro su sviluppo web, SEO e comunicazione digitale per una fondazione non profit,
            unendo implementazione tecnica e chiarezza verso l'utente.
          </p>
        `,
        software3: `
          <p class="timeline-meta">2020-presente</p>
          <h3>Freelance UI e UX Tester</h3>
          <p class="timeline-subtle">Test di prototipi e prodotti</p>
          <p>
            Test di esperienze software e di prodotto in fase iniziale per aziende come Meta,
            Hyundai e SumUp, con attenzione a usabilità, percezione del prodotto e feedback
            strutturato.
          </p>
        `,
        education1: `
          <div>
            <p class="education-degree">Dottorando in Ingegneria Aerospaziale</p>
            <p class="education-school">Queen Mary University of London</p>
            <p class="education-note">
              Tesi: Damage Tolerant Ultralightweight Mechanical Metamaterials for Future Air Transportation
            </p>
          </div>
          <p class="education-years">2023-presente</p>
        `,
        education2: `
          <div>
            <p class="education-degree">Laurea triennale in Mechanical Engineering - First Class Honours</p>
            <p class="education-school">Queen Mary University of London</p>
            <p class="education-note">
              Tesi: Modelli predittivi dei coefficienti aerodinamici sperimentali di profili alari tramite machine learning
            </p>
          </div>
          <p class="education-years">2020-2023</p>
        `,
        education3: `
          <div>
            <p class="education-degree">Diploma di scuola secondaria - AP International Diploma</p>
            <p class="education-school">American Overseas School of Rome</p>
            <p class="education-note">
              Solida base accademica in calcolo, fisica, chimica, economia e lingue
            </p>
          </div>
          <p class="education-years">2015-2020</p>
        `,
        writing1: `
          <div class="tag-row">
            <span class="tag">Previsto</span>
            <span class="tag tag-muted">Ricerca</span>
          </div>
          <a class="inline-link" href="blog.html">
            <h3>Cosa cambia quando il disordine reticolare diventa una variabile di progetto</h3>
          </a>
          <p>
            Una breve nota su architetture reticolari distorte, robustezza e su cosa renda il
            disordine utile invece che semplicemente irregolare.
          </p>
        `,
        writing2: `
          <div class="tag-row">
            <span class="tag">Previsto</span>
            <span class="tag tag-muted">Simulazione</span>
          </div>
          <a class="inline-link" href="blog.html">
            <h3>Rendere i workflow agli elementi finiti più facili da fidarsi</h3>
          </a>
          <p>
            Riflessioni su scelte di mesh, strategia di campionamento e sulla differenza tra un
            modello che gira e un modello che ti insegna qualcosa.
          </p>
        `,
        writing3: `
          <div class="tag-row">
            <span class="tag">Previsto</span>
            <span class="tag tag-muted">Didattica</span>
          </div>
          <a class="inline-link" href="blog.html">
            <h3>Insegnare la simulazione senza renderla misteriosa</h3>
          </a>
          <p>
            Note su come spiegare gli strumenti computazionali agli studenti senza appiattire il
            vero giudizio ingegneristico che li sostiene.
          </p>
        `,
      },
    },
    blog: {
      meta: {
        title: "Niccolò Forte | Blog",
        description:
          "Scritti di Niccolò Forte su metamateriali reticolari, workflow di simulazione, giudizio ingegneristico e insegnamento tecnico.",
      },
      text: {
        languageLabel: "Lingua",
        navHome: "Home",
        navBlog: "Blog",
        navContact: "Contatti",
        heroRole: "Blog",
        blogTitle: "Note di ricerca",
        blogSubtitle:
          "Scritti su metamateriali, calcolo, pratica della modellazione e il mestiere della spiegazione tecnica.",
        tagResearch: "Ricerca",
        tagSimulation: "Simulazione",
        tagTeaching: "Didattica",
        tagInProgress: "In sviluppo",
      },
      html: {
        blogPost1: `
          <div class="tag-row">
            <span class="tag">Previsto</span>
            <span class="tag tag-muted">Ricerca</span>
          </div>
          <h2 class="blog-entry-title">Cosa cambia quando il disordine reticolare diventa una variabile di progetto</h2>
          <p>
            Una nota sul perché l'irregolarità geometrica possa migliorare le prestazioni, su quale
            tipo di disordine sia davvero utile e su come pensare ai reticoli quasi distorti senza
            trasformarli in oggetti estetici vaghi.
          </p>
          <span class="blog-more">In arrivo</span>
        `,
        blogPost2: `
          <div class="tag-row">
            <span class="tag">Previsto</span>
            <span class="tag tag-muted">Simulazione</span>
          </div>
          <h2 class="blog-entry-title">Rendere i workflow agli elementi finiti più facili da fidarsi</h2>
          <p>
            Pensieri su mesh, condizioni al contorno, campionamento adattivo e sulle abitudini che
            rendono la simulazione meno rituale e più ingegneria.
          </p>
          <span class="blog-more">In arrivo</span>
        `,
        blogPost3: `
          <div class="tag-row">
            <span class="tag">Previsto</span>
            <span class="tag tag-muted">Didattica</span>
          </div>
          <h2 class="blog-entry-title">Insegnare la simulazione senza renderla misteriosa</h2>
          <p>
            Riflessioni da esercitazioni e laboratori su come spiegare con chiarezza le decisioni di
            modellazione, rispettando allo stesso tempo la complessità della meccanica sottostante.
          </p>
          <span class="blog-more">In arrivo</span>
        `,
      },
    },
  },
};

let activeLanguage = "en";
let syncThemeToggle = () => {};

const getRequestedLanguage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const queryLanguage = searchParams.get("lang");

  if (searchParams.has("lang")) {
    const requestedLanguage = supportedLanguages.has(queryLanguage) ? queryLanguage : "en";
    window.localStorage.setItem("site-language", requestedLanguage);
    return requestedLanguage;
  }

  const storedLanguage = window.localStorage.getItem("site-language");
  if (storedLanguage && supportedLanguages.has(storedLanguage)) {
    return storedLanguage;
  }

  return "en";
};

const updateLocalizedLinks = (language) => {
  document.querySelectorAll("a[href]").forEach((link) => {
    if (!link.dataset.baseHref) {
      link.dataset.baseHref = link.getAttribute("href") || "";
    }

    const baseHref = link.dataset.baseHref;
    if (
      !baseHref ||
      baseHref.startsWith("#") ||
      baseHref.startsWith("mailto:") ||
      baseHref.startsWith("tel:")
    ) {
      link.setAttribute("href", baseHref);
      return;
    }

    let resolvedUrl;
    try {
      resolvedUrl = new URL(baseHref, window.location.href);
    } catch {
      link.setAttribute("href", baseHref);
      return;
    }

    const isExternal = resolvedUrl.origin !== window.location.origin;
    const isAsset = resolvedUrl.pathname.includes("/assets/") || resolvedUrl.pathname.endsWith(".pdf");
    const isDocumentPage =
      resolvedUrl.pathname === "/" ||
      resolvedUrl.pathname.endsWith(".html") ||
      resolvedUrl.pathname === window.location.pathname;

    if (isExternal || isAsset || !isDocumentPage) {
      link.setAttribute("href", baseHref);
      return;
    }

    if (language === "en") {
      resolvedUrl.searchParams.delete("lang");
    } else {
      resolvedUrl.searchParams.set("lang", language);
    }

    link.setAttribute("href", `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`);
  });
};

const updateLanguageSwitcher = (language) => {
  if (languageSelect) {
    languageSelect.value = language;
  }
};

const syncCanonicalLanguageUrl = (language) => {
  const url = new URL(window.location.href);
  if (language === "en") {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", language);
  }
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

const restoreEnglishContent = () => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = originalState.text.get(element) || "";
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = originalState.html.get(element) || "";
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", originalState.ariaLabel.get(element) || "");
  });

  document.documentElement.lang = "en";
  document.title = originalState.title;

  if (pageTitleEl) {
    pageTitleEl.textContent = originalState.title;
  }

  if (pageDescriptionEl) {
    pageDescriptionEl.content = originalState.description;
  }

  if (ogTitleEl) {
    ogTitleEl.content = originalState.ogTitle;
  }

  if (ogDescriptionEl) {
    ogDescriptionEl.content = originalState.ogDescription;
  }

  if (themeToggle && originalState.themeLabels) {
    themeToggle.dataset.lightLabel = originalState.themeLabels.lightLabel;
    themeToggle.dataset.darkLabel = originalState.themeLabels.darkLabel;
    themeToggle.dataset.lightTitle = originalState.themeLabels.lightTitle;
    themeToggle.dataset.darkTitle = originalState.themeLabels.darkTitle;
  }
};

const applyLanguage = (language) => {
  activeLanguage = supportedLanguages.has(language) ? language : "en";
  restoreEnglishContent();

  const languageBundle = translations[activeLanguage];
  const pageBundle = languageBundle ? languageBundle[pageName] : null;
  const commonBundle = languageBundle ? languageBundle.common || {} : {};

  if (pageBundle) {
    const mergedText = { ...(commonBundle.text || {}), ...(pageBundle.text || {}) };
    const mergedHtml = { ...(commonBundle.html || {}), ...(pageBundle.html || {}) };
    const mergedAriaLabel = {
      ...(commonBundle.ariaLabel || {}),
      ...(pageBundle.ariaLabel || {}),
    };

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.hasOwn(mergedText, key)) {
        element.textContent = mergedText[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.dataset.i18nHtml;
      if (Object.hasOwn(mergedHtml, key)) {
        element.innerHTML = mergedHtml[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (Object.hasOwn(mergedAriaLabel, key)) {
        element.setAttribute("aria-label", mergedAriaLabel[key]);
      }
    });

    document.documentElement.lang = activeLanguage;

    if (pageBundle.meta) {
      document.title = pageBundle.meta.title || originalState.title;
      if (pageTitleEl) {
        pageTitleEl.textContent = document.title;
      }

      if (pageDescriptionEl && pageBundle.meta.description) {
        pageDescriptionEl.content = pageBundle.meta.description;
      }

      if (ogTitleEl) {
        ogTitleEl.content = pageBundle.meta.ogTitle || document.title;
      }

      if (ogDescriptionEl) {
        ogDescriptionEl.content =
          pageBundle.meta.ogDescription ||
          pageBundle.meta.description ||
          originalState.ogDescription;
      }
    }

    if (themeToggle && commonBundle.themeLabels) {
      themeToggle.dataset.lightLabel = commonBundle.themeLabels.lightLabel;
      themeToggle.dataset.darkLabel = commonBundle.themeLabels.darkLabel;
      themeToggle.dataset.lightTitle = commonBundle.themeLabels.lightTitle;
      themeToggle.dataset.darkTitle = commonBundle.themeLabels.darkTitle;
    }
  }

  if (themeToggle) {
    syncThemeToggle();
  }

  updateLocalizedLinks(activeLanguage);
  updateLanguageSwitcher(activeLanguage);
  syncCanonicalLanguageUrl(activeLanguage);
  window.localStorage.setItem("site-language", activeLanguage);
};

const storedTheme = window.localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
  document.body.classList.add("dark-mode");
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (themeToggle) {
  syncThemeToggle = () => {
    const isDark = document.body.classList.contains("dark-mode");
    const lightTitle = themeToggle.dataset.lightTitle || "Switch to light mode";
    const darkTitle = themeToggle.dataset.darkTitle || "Switch to dark mode";

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? lightTitle : darkTitle);
    themeToggle.setAttribute("title", isDark ? lightTitle : darkTitle);
  };

  syncThemeToggle();

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
    syncThemeToggle();
  });
}

applyLanguage(getRequestedLanguage());

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    const nextLanguage = supportedLanguages.has(event.target.value) ? event.target.value : "en";
    applyLanguage(nextLanguage);
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sectionLinks.length > 0 && sections.length > 0) {
  const activeLinkById = new Map(
    sectionLinks.map((link) => [link.getAttribute("href").slice(1), link])
  );

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        sectionLinks.forEach((link) => link.removeAttribute("aria-current"));
        const activeLink = activeLinkById.get(entry.target.id);
        if (activeLink) {
          activeLink.setAttribute("aria-current", "page");
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-20% 0px -45% 0px",
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}
