const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");
const languageSelect = document.getElementById("languageSelect");
const faviconEl = document.getElementById("siteFavicon");
const contactTriggers = Array.from(document.querySelectorAll("[data-contact-trigger]"));
const contactCardModal = document.getElementById("contactCardModal");
const cvPreviewButton = document.getElementById("cvPreviewButton");
const cvModal = document.getElementById("cvModal");
const shareTriggers = Array.from(document.querySelectorAll("[data-share-trigger]"));
const shareModal = document.getElementById("shareModal");
const shareCopyButton = document.getElementById("shareCopyButton");
const shareEmailLink = document.getElementById("shareEmailLink");
const shareLinkedInLink = document.getElementById("shareLinkedInLink");
const shareFacebookLink = document.getElementById("shareFacebookLink");
const shareXLink = document.getElementById("shareXLink");
const shareWhatsAppLink = document.getElementById("shareWhatsAppLink");
const shareStatus = document.getElementById("shareStatus");
const socialsTriggers = Array.from(document.querySelectorAll("[data-socials-trigger]"));
const socialsModal = document.getElementById("socialsModal");
const contactForm = document.getElementById("contactForm");
const contactFormStatus = document.getElementById("contactFormStatus");
const contactSubmitButton = document.getElementById("contactSubmitButton");
const interestModal = document.getElementById("interestModal");
const interestModalImage = document.getElementById("interestModalImage");
const interestModalCaption = document.getElementById("interestModalCaption");
const interestModalTitle = document.getElementById("interestModalTitle");
const interestModalDescription = document.getElementById("interestModalDescription");
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
        modalCloseLabel: "Chiudi dettaglio",
        contactCardCloseLabel: "Chiudi scheda contatto",
        cvModalCloseLabel: "Chiudi anteprima del CV",
        shareModalCloseLabel: "Chiudi opzioni di condivisione",
        shareTriggerLabel: "Condividi questa pagina",
        socialsCloseLabel: "Chiudi social",
      },
      text: {
        shareLabel: "Condividi",
        shareEyebrow: "Condividi",
        shareTitle: "Condividi questa pagina",
        shareIntro: "Copia il link o invia questa pagina tramite la piattaforma che preferisci.",
        shareCopyLabel: "Copia link",
        shareEmailLabel: "Email",
        shareLinkedinLabel: "LinkedIn",
        shareFacebookLabel: "Facebook",
        shareXLabel: "X",
        shareWhatsAppLabel: "WhatsApp",
        shareCopiedMessage: "Link copiato negli appunti.",
        shareCopyErrorMessage: "Non sono riuscito a copiare il link. Puoi copiarlo direttamente dalla barra dell'indirizzo.",
        socialsLabel: "Social",
        socialsEyebrow: "Altro",
        socialsTitle: "Social",
        socialsIntro: "I miei canali pubblici.",
        socialLinkedinLabel: "LinkedIn",
        socialGithubLabel: "GitHub",
        socialInstagramLabel: "Instagram",
        socialSnapchatLabel: "Snapchat",
        socialWhatsappLabel: "WhatsApp",
        socialPhoneLabel: "Telefono",
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
        heroRole: "Ingegnere aerospaziale e data scientist",
        heroSubtitleDegree: "Dottorando in Ingegneria Aerospaziale",
        heroSubtitleUniversity: "Queen Mary University of London",
        heroDetail: "Metamateriali reticolari - Meccanica computazionale - Machine learning",
        aboutTitle: "Profilo",
        researchTitle: "Interessi di ricerca",
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
          "Efficienza dei materiali, ottimizzazione di forma e topologia, e i principi di meccanica che guidano le strutture del volo del futuro.",
        publicationsTitle: "Pubblicazioni",
        experienceTitle: "Esperienza di ricerca e attività tecnica",
        softwareTitle: "Software e attività digitali",
        educationTitle: "Formazione",
        writingTitle: "Scritti",
        writingIntro:
          "Note in preparazione su metamateriali, modellazione, giudizio ingegneristico e quelle piccole decisioni che rendono il lavoro tecnico più affidabile.",
        viewAllNotes: "Vedi tutte le note",
        contactTitle: "Contatti",
        contactIntro:
          "Mi fa sempre piacere entrare in contatto con persone che lavorano su meccanica strutturale, ricerca aerospaziale, metamateriali, software ingegneristico o insegnamento tecnico di qualità.",
        contactCardLabel: "Scheda contatto",
        contactFormIntro:
          "Oppure scrivimi senza lasciare questa pagina, indicando il tuo nome, indirizzo email e messaggio.",
        formNameLabel: "Nome",
        formEmailLabel: "Indirizzo email",
        formMessageLabel: "Messaggio",
        formSubmitLabel: "Invia messaggio",
        formSendingLabel: "Invio in corso...",
        formSuccessMessage: "Grazie per il tuo messaggio. Ti risponderò il prima possibile.",
        formErrorMessage:
          "Non sono riuscito a inviare il messaggio in questo momento. Riprova tra poco oppure scrivimi via email.",
        saveContactLabel: "Salva contatto",
        contactCardEyebrow: "Scheda di contatto personale",
        contactCardRole: "Dottorando in Ingegneria Aerospaziale",
        contactCardWorkEmailLabel: "Email professionale",
        contactCardPersonalEmailLabel: "Email personale",
        contactCardUkPhoneLabel: "Telefono (UK)",
        contactCardItPhoneLabel: "Telefono (IT)",
        contactCardWebsiteLabel: "Sito web",
        contactCardLinkedInLabel: "LinkedIn",
        contactCardGitHubLabel: "GitHub",
        cvLabel: "Curriculum Vitae",
        cvPreviewEyebrow: "Anteprima documento",
        cvOpenNewPageLabel: "Apri in una nuova pagina",
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
            Prima di iniziare il dottorato ho conseguito una laurea triennale in ingegneria
            meccanica con First Class Honours alla Queen Mary. La mia tesi di laurea ha esplorato la
            previsione dei coefficienti aerodinamici di profili alari tramite machine learning, e
            quel medesimo interesse per il calcolo continua a guidare il mio approccio alla
            meccanica, alla simulazione e alla progettazione.
          </p>
          <p>
            Essendo cresciuto tra Washington, Gerusalemme, Roma, Bruxelles e Londra, tendo a portare
            nella ricerca una prospettiva internazionale e interdisciplinare. Accanto al lavoro di
            dottorato, insegno in diversi moduli di ingegneria, mi occupo di dati e software, e tengo
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
          <h3>Assistente alla didattica in vari moduli di ingegneria</h3>
          <p class="timeline-subtle">Queen Mary University of London</p>
          <p>
            Supporto alla didattica in fluidodinamica, CFD, meccanica dei solidi, FEA, termodinamica,
            modellazione computazionale e corsi di ingegneria incentrati sulla simulazione.
          </p>
        `,
        experience3: `
          <p class="timeline-meta">2022</p>
          <h3>Tirocinio in data science</h3>
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
          <h3>Tester freelance UI/UX</h3>
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
            <p class="education-degree">Laurea triennale in ingegneria meccanica - First Class Honours</p>
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
            <h3>Rendere i workflow agli elementi finiti più affidabili</h3>
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
          <h2 class="blog-entry-title">Rendere i workflow agli elementi finiti più affidabili</h2>
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
let activeInterestId = null;
let lastInterestTrigger = null;
let invertedFaviconHref = null;
let lastContactCardTrigger = null;
let lastCvTrigger = null;
let lastShareTrigger = null;
let lastSocialsTrigger = null;

const getTextTranslation = (key, fallback = "") => {
  const languageBundle = translations[activeLanguage] || {};
  const pageBundle = languageBundle[pageName] || {};
  return pageBundle.text?.[key] ?? languageBundle.common?.text?.[key] ?? fallback;
};

const syncModalOpenState = () => {
  const hasOpenModal =
    Boolean(interestModal && !interestModal.hidden) ||
    Boolean(contactCardModal && !contactCardModal.hidden) ||
    Boolean(cvModal && !cvModal.hidden) ||
    Boolean(shareModal && !shareModal.hidden) ||
    Boolean(socialsModal && !socialsModal.hidden);
  document.body.classList.toggle("modal-open", hasOpenModal);
};

const interestDetails = {
  en: {
    interest1: `
      <p>
        My main research activity centres on architected lattice materials that remain lightweight
        while becoming more damage tolerant, robust, and useful in real aerospace structures. I am
        especially interested in how local geometric distortion changes stiffness, failure
        progression, and post-damage response.
      </p>
      <p>
        That work combines structural mechanics, manufacturability questions, and design strategy:
        not just whether a lattice is efficient in theory, but whether it can become a dependable
        structural concept for future air transportation.
      </p>
    `,
    interest2: `
      <p>
        Computational mechanics is the main toolset behind how I test ideas. I use finite-element
        modelling to compare architectures, study stress redistribution, and evaluate how design
        decisions behave under realistic loading assumptions.
      </p>
      <p>
        I am particularly interested in adaptive workflows that make simulation more trustworthy:
        better meshing choices, smarter sampling, and numerical pipelines that reveal meaningful
        structural behaviour instead of producing results that only look polished.
      </p>
    `,
    interest3: `
      <p>
        I use machine learning where it helps reduce design cost, accelerate exploration, or expose
        patterns that would be hard to see from simulation alone. That includes surrogate models,
        optimization loops, and data-driven representations of complex structural systems.
      </p>
      <p>
        The goal is not to replace engineering judgement, but to support it: using learning-based
        tools to navigate large design spaces while keeping the mechanics and physics legible.
      </p>
    `,
    interest4: `
      <p>
        The broader motivation behind my work is applied aerospace engineering: how future flight
        structures can become lighter, more efficient, and more resilient without sacrificing
        safety or practical performance.
      </p>
      <p>
        That means thinking across scales, from local unit-cell behaviour to full-system design,
        and keeping an eye on the real engineering trade-offs between weight, damage tolerance,
        manufacturability, and performance.
      </p>
    `,
  },
  it: {
    interest1: `
      <p>
        La mia principale attività di ricerca riguarda materiali reticolari architettati che
        restano leggeri ma diventano anche più tolleranti al danno, robusti e utili in strutture
        aerospaziali reali. Mi interessa soprattutto capire come la distorsione geometrica locale
        cambi rigidezza, progressione del cedimento e risposta dopo il danno.
      </p>
      <p>
        Questo lavoro unisce meccanica strutturale, temi di fabbricabilità e strategia di
        progettazione: non solo se un reticolo sia efficiente in teoria, ma se possa diventare un
        concetto strutturale affidabile per il trasporto aereo del futuro.
      </p>
    `,
    interest2: `
      <p>
        La meccanica computazionale è il principale insieme di strumenti con cui verifico le idee.
        Uso la modellazione agli elementi finiti per confrontare architetture, studiare la
        ridistribuzione degli sforzi e valutare come le scelte progettuali si comportino sotto
        ipotesi di carico realistiche.
      </p>
      <p>
        Mi interessano in particolare i workflow adattivi che rendono la simulazione più
        affidabile: migliori scelte di mesh, campionamento più intelligente e pipeline numeriche
        che mostrino un comportamento strutturale davvero significativo, invece di produrre
        risultati solo apparentemente ben rifiniti.
      </p>
    `,
    interest3: `
      <p>
        Uso il machine learning quando aiuta a ridurre il costo della progettazione, accelerare
        l'esplorazione o far emergere pattern difficili da osservare con la sola simulazione. Questo
        include modelli surrogati, cicli di ottimizzazione e rappresentazioni guidate dai dati di
        sistemi strutturali complessi.
      </p>
      <p>
        L'obiettivo non è sostituire il giudizio ingegneristico, ma supportarlo: usare strumenti di
        apprendimento per navigare grandi spazi di progetto mantenendo leggibili meccanica e fisica.
      </p>
    `,
    interest4: `
      <p>
        La motivazione più ampia del mio lavoro è l'ingegneria aerospaziale applicata: capire come
        le strutture del volo del futuro possano diventare più leggere, efficienti e resilienti
        senza sacrificare sicurezza o prestazioni pratiche.
      </p>
      <p>
        Questo significa ragionare su più scale, dal comportamento locale della cella unitaria fino
        alla progettazione dell'intero sistema, mantenendo sempre presenti i veri compromessi
        ingegneristici tra peso, tolleranza al danno, fabbricabilità e prestazioni.
      </p>
    `,
  },
};

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

const renderInterestModal = (interestId) => {
  if (
    !interestModal ||
    !interestModalImage ||
    !interestModalCaption ||
    !interestModalTitle ||
    !interestModalDescription
  ) {
    return;
  }

  const trigger = document.querySelector(`.interest-trigger[data-interest="${interestId}"]`);
  if (!trigger) {
    return;
  }

  const cardImage = trigger.querySelector("img");
  const cardCaption = trigger.querySelector("figcaption");
  const cardTitle = trigger.querySelector("h3");
  const detailCopy =
    interestDetails[activeLanguage]?.[interestId] || interestDetails.en?.[interestId] || "";

  if (cardImage) {
    interestModalImage.src = cardImage.getAttribute("src") || "";
    interestModalImage.alt = cardImage.getAttribute("alt") || "";
  }

  if (cardCaption) {
    interestModalCaption.textContent = cardCaption.textContent || "";
  }

  if (cardTitle) {
    interestModalTitle.textContent = cardTitle.textContent || "";
  }

  interestModalDescription.innerHTML = detailCopy;
};

const openInterestModal = (interestId, trigger) => {
  if (!interestModal) {
    return;
  }

  activeInterestId = interestId;
  lastInterestTrigger = trigger || null;
  renderInterestModal(interestId);
  interestModal.hidden = false;
  syncModalOpenState();
  const closeButton = interestModal.querySelector(".interest-modal-close");
  if (closeButton) {
    closeButton.focus();
  }
};

const closeInterestModal = () => {
  if (!interestModal || interestModal.hidden) {
    return;
  }

  interestModal.hidden = true;
  syncModalOpenState();
  activeInterestId = null;

  if (lastInterestTrigger) {
    lastInterestTrigger.focus();
    lastInterestTrigger = null;
  }
};

const openContactCardModal = (trigger) => {
  if (!contactCardModal) {
    return;
  }

  lastContactCardTrigger = trigger || null;
  contactCardModal.hidden = false;
  syncModalOpenState();
  const closeButton = contactCardModal.querySelector(".contact-card-close");
  if (closeButton) {
    closeButton.focus();
  }
};

const closeContactCardModal = () => {
  if (!contactCardModal || contactCardModal.hidden) {
    return;
  }

  contactCardModal.hidden = true;
  syncModalOpenState();

  if (lastContactCardTrigger) {
    lastContactCardTrigger.focus();
    lastContactCardTrigger = null;
  }
};

const openCvModal = (trigger) => {
  if (!cvModal) {
    return;
  }

  lastCvTrigger = trigger || null;
  cvModal.hidden = false;
  syncModalOpenState();
  const closeButton = cvModal.querySelector(".cv-modal-close");
  if (closeButton) {
    closeButton.focus();
  }
};

const closeCvModal = () => {
  if (!cvModal || cvModal.hidden) {
    return;
  }

  cvModal.hidden = true;
  syncModalOpenState();

  if (lastCvTrigger) {
    lastCvTrigger.focus();
    lastCvTrigger = null;
  }
};

const getSharePayload = () => {
  const pageUrl = window.location.href;
  const pageTitle = document.title;
  const shareText = `${pageTitle} - ${pageUrl}`;
  return { pageUrl, pageTitle, shareText };
};

const updateShareLinks = () => {
  const { pageUrl, pageTitle, shareText } = getSharePayload();
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(pageTitle);
  const encodedText = encodeURIComponent(shareText);

  if (shareEmailLink) {
    shareEmailLink.href = `mailto:?subject=${encodedTitle}&body=${encodedText}`;
  }

  if (shareLinkedInLink) {
    shareLinkedInLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  }

  if (shareFacebookLink) {
    shareFacebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  }

  if (shareXLink) {
    shareXLink.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  }

  if (shareWhatsAppLink) {
    shareWhatsAppLink.href = `https://wa.me/?text=${encodedText}`;
  }
};

const openShareModal = (trigger) => {
  if (!shareModal) {
    return;
  }

  lastShareTrigger = trigger || null;
  updateShareLinks();
  if (shareStatus) {
    shareStatus.textContent = "";
  }
  shareModal.hidden = false;
  syncModalOpenState();
  const closeButton = shareModal.querySelector(".share-modal-close");
  if (closeButton) {
    closeButton.focus();
  }
};

const closeShareModal = () => {
  if (!shareModal || shareModal.hidden) {
    return;
  }

  shareModal.hidden = true;
  syncModalOpenState();

  if (lastShareTrigger) {
    lastShareTrigger.focus();
    lastShareTrigger = null;
  }
};

const openSocialsModal = (trigger) => {
  if (!socialsModal) {
    return;
  }

  lastSocialsTrigger = trigger || null;
  socialsModal.hidden = false;
  syncModalOpenState();
  const closeButton = socialsModal.querySelector(".contact-card-close");
  if (closeButton) {
    closeButton.focus();
  }
};

const closeSocialsModal = () => {
  if (!socialsModal || socialsModal.hidden) {
    return;
  }

  socialsModal.hidden = true;
  syncModalOpenState();

  if (lastSocialsTrigger) {
    lastSocialsTrigger.focus();
    lastSocialsTrigger = null;
  }
};

const ensureInvertedFavicon = () =>
  new Promise((resolve) => {
    if (!faviconEl) {
      resolve(null);
      return;
    }

    if (invertedFaviconHref) {
      resolve(invertedFaviconHref);
      return;
    }

    const sourceHref = faviconEl.getAttribute("href");
    if (!sourceHref) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        resolve(null);
        return;
      }

      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;

      for (let index = 0; index < data.length; index += 4) {
        data[index] = 255 - data[index];
        data[index + 1] = 255 - data[index + 1];
        data[index + 2] = 255 - data[index + 2];
      }

      context.putImageData(imageData, 0, 0);
      invertedFaviconHref = canvas.toDataURL("image/png");
      resolve(invertedFaviconHref);
    };

    img.onerror = () => resolve(null);
    img.src = sourceHref;
  });

const syncFavicon = async () => {
  if (!faviconEl) {
    return;
  }

  const isDark = colorSchemeQuery.matches;
  const defaultHref = "favicon.png";

  if (isDark) {
    faviconEl.setAttribute("href", defaultHref);
    return;
  }

  const generatedHref = await ensureInvertedFavicon();
  faviconEl.setAttribute("href", generatedHref || defaultHref);
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

  if (activeInterestId) {
    renderInterestModal(activeInterestId);
  }

  if (contactFormStatus?.dataset.statusKey) {
    contactFormStatus.textContent = getTextTranslation(
      contactFormStatus.dataset.statusKey,
      contactFormStatus.textContent
    );
  }

  if (contactSubmitButton && !contactSubmitButton.disabled) {
    contactSubmitButton.textContent = getTextTranslation("formSubmitLabel", "Send Message");
  }

  if (shareStatus?.dataset.statusKey) {
    shareStatus.textContent = getTextTranslation(shareStatus.dataset.statusKey, shareStatus.textContent);
  }

  updateLocalizedLinks(activeLanguage);
  updateLanguageSwitcher(activeLanguage);
  syncCanonicalLanguageUrl(activeLanguage);
  window.localStorage.setItem("site-language", activeLanguage);
  updateShareLinks();
};

const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const applyThemePreference = () => {
  const storedTheme = window.localStorage.getItem("theme");
  const prefersDark = colorSchemeQuery.matches;
  document.body.classList.toggle("dark-mode", storedTheme === "dark" || (!storedTheme && prefersDark));
};

applyThemePreference();

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
  syncFavicon();

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
    syncThemeToggle();
    syncFavicon();
  });
} else {
  syncFavicon();
}

colorSchemeQuery.addEventListener("change", () => {
  syncFavicon();

  if (!window.localStorage.getItem("theme")) {
    applyThemePreference();
    syncThemeToggle();
  }
});

applyLanguage(getRequestedLanguage());

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    const nextLanguage = supportedLanguages.has(event.target.value) ? event.target.value : "en";
    applyLanguage(nextLanguage);
  });
}

if (interestModal) {
  document.querySelectorAll(".interest-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const interestId = trigger.dataset.interest;
      if (interestId) {
        openInterestModal(interestId, trigger);
      }
    });
  });

  interestModal.querySelectorAll("[data-modal-close]").forEach((element) => {
    element.addEventListener("click", closeInterestModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeInterestModal();
      closeContactCardModal();
      closeCvModal();
    }
  });
}

if (contactTriggers.length > 0 && contactCardModal) {
  contactTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openContactCardModal(trigger);
    });
  });

  contactCardModal.querySelectorAll("[data-contact-card-close]").forEach((element) => {
    element.addEventListener("click", closeContactCardModal);
  });
}

if (cvPreviewButton && cvModal) {
  cvPreviewButton.addEventListener("click", () => {
    openCvModal(cvPreviewButton);
  });

  cvModal.querySelectorAll("[data-cv-close]").forEach((element) => {
    element.addEventListener("click", closeCvModal);
  });
}

if (shareTriggers.length > 0 && shareModal) {
  shareTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openShareModal(trigger);
    });
  });

  shareModal.querySelectorAll("[data-share-close]").forEach((element) => {
    element.addEventListener("click", closeShareModal);
  });

  if (shareCopyButton) {
    shareCopyButton.addEventListener("click", async () => {
      const { pageUrl } = getSharePayload();

      try {
        await navigator.clipboard.writeText(pageUrl);
        if (shareStatus) {
          shareStatus.dataset.statusKey = "shareCopiedMessage";
          shareStatus.textContent = getTextTranslation("shareCopiedMessage", "Link copied to clipboard.");
        }
      } catch {
        if (shareStatus) {
          shareStatus.dataset.statusKey = "shareCopyErrorMessage";
          shareStatus.textContent = getTextTranslation(
            "shareCopyErrorMessage",
            "I couldn't copy the link automatically. You can copy it directly from the address bar."
          );
        }
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeShareModal();
    }
  });
}

if (socialsTriggers.length > 0 && socialsModal) {
  socialsTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openSocialsModal(trigger);
    });
  });

  socialsModal.querySelectorAll("[data-socials-close]").forEach((element) => {
    element.addEventListener("click", closeSocialsModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSocialsModal();
    }
  });
}

if (contactForm && contactFormStatus && contactSubmitButton) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || "").trim(),
    };

    contactFormStatus.className = "contact-form-status";
    contactFormStatus.dataset.statusKey = "formSendingLabel";
    contactFormStatus.textContent = getTextTranslation("formSendingLabel", "Sending...");
    contactSubmitButton.disabled = true;
    contactSubmitButton.textContent = getTextTranslation("formSendingLabel", "Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      contactForm.reset();
      contactFormStatus.classList.add("is-success");
      contactFormStatus.dataset.statusKey = "formSuccessMessage";
      contactFormStatus.textContent = getTextTranslation(
        "formSuccessMessage",
        "Thank you for your message. I will get back to you as soon as possible."
      );
    } catch {
      contactFormStatus.classList.add("is-error");
      contactFormStatus.dataset.statusKey = "formErrorMessage";
      contactFormStatus.textContent = getTextTranslation(
        "formErrorMessage",
        "I couldn't send your message just now. Please try again in a moment or email me directly."
      );
    } finally {
      contactSubmitButton.disabled = false;
      contactSubmitButton.textContent = getTextTranslation("formSubmitLabel", "Send Message");
    }
  });
}

if (navToggle && siteNav) {
  const closeNavMenu = () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!window.matchMedia("(max-width: 1035px)").matches || !siteNav.classList.contains("open")) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && !siteNav.contains(target) && !navToggle.contains(target)) {
      closeNavMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 1035px)").matches) {
      closeNavMenu();
    }
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







