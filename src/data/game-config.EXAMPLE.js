/**
 * ESEMPIO FUNZIONANTE — Missione: Salva l'azienda!
 *
 * Copia questo file in game-config.js (o sostituisci l'oggetto exportato lì)
 * per un nuovo gioco. Il motore legge SOLO game-config.js.
 *
 * Campi opzionali documentati inline. Tipi tappa supportati:
 *   "quiz" | "enigma" | "puzzle-drag" | "input-codice"
 */

export const gameConfig = {
  meta: {
    slug: "salva-azienda",
    titolo: "Missione: Salva l'azienda!",
    corsoRiferimento:
      "2° Corso Tecnico Superiore per l'Amministrazione, la Gestione Finanziaria e il Controllo di Gestione – Marketing e Internazionalizzazione delle Imprese",
    durataStimata: "3-7 minuti",
    obiettivoDidattico:
      "Collegare costi-prezzi, scelta del mercato estero, budget di cassa e ruolo di un ERP in una decisione export di una PMI.",
    contestoNarrativo:
      "Siete il team di controllo di GustaVera, piccola impresa italiana che produce una bevanda artigianale alle erbe. La direzione vuole esportare entro l'anno. Avete i fogli costi, i mercati candidati, il budget e l'accesso al gestionale. In pochi minuti dovete evitare una decisione che brucia cassa — e sbloccare la spedizione del primo lotto.",
    timer: {
      /** "countdown" = tensione da fiera; "chrono" = cronometro crescente */
      modalita: "countdown",
      secondi: 420,
    },
  },

  tappe: [
    {
      id: "costi-prezzi",
      titolo: "Il prezzo non mente",
      tipo: "quiz",
      testo:
        "Un buyer tedesco offre 1,35 € a bottiglia, franco fabbrica. Guardando i costi, cosa fate?",
      tabella: {
        intestazioni: ["Voce", "€ / bottiglia"],
        righe: [
          ["Materie prime", "0,85"],
          ["Lavorazione", "0,40"],
          ["Imballo e etichetta", "0,25"],
          ["Costo pieno di produzione", "1,50"],
          ["Prezzo listino Italia", "2,20"],
          ["Offerta buyer estero", "1,35"],
        ],
      },
      opzioni: [
        {
          testo: "Accettiamo: 1,35 € è comunque un ingresso sul mercato.",
          corretta: false,
          feedback:
            "Attenzione: 1,35 € è sotto il costo pieno (1,50 €). Ogni bottiglia venduta aumenterebbe la perdita. L'ingresso sul mercato non giustifica un listino strutturalmente in perdita.",
        },
        {
          testo: "Rifiutiamo o rinegoziamo: il prezzo è sotto il costo pieno.",
          corretta: true,
          feedback:
            "Esatto. Il costo pieno è 1,50 €. Sotto quella soglia l'export brucia cassa. Si può discutere un prezzo ≥ 1,50 €, o un lotto promozionale con i soli costi variabili coperti — ma non un prezzo abituale in perdita.",
        },
        {
          testo: "Accettiamo se raddoppiamo i volumi: il costo unitario scenderà da solo.",
          corretta: false,
          feedback:
            "I volumi diluiscono i costi fissi, non quelli variabili (materie prime, imballo). Senza un break-even scritto, «raddoppiare» è un auspicio, non un piano.",
        },
      ],
      indizioExtra:
        "Confronta l'offerta 1,35 € con la riga «Costo pieno di produzione».",
      puntiChiave:
        "Costo pieno, prezzo di vendita e margine: vendere sotto costo distrugge cassa anche se «apre un mercato».",
    },

    {
      id: "mercato-estero",
      titolo: "Dove sbarcare prima",
      tipo: "quiz",
      testo:
        "GustaVera esporta per la prima volta e ha cassa limitata. Qual è il primo mercato più razionale?",
      tabella: {
        intestazioni: ["Mercato", "Dazi / dogana", "Barriere", "Fit prodotto"],
        righe: [
          ["Germania", "Nessuno (UE)", "Etichetta UE", "Alto (specialty)"],
          ["Francia", "Nessuno (UE)", "Etichetta UE", "Medio (più saturo)"],
          ["Stati Uniti", "Dazi + FDA", "Alte e costose", "Premium, ingresso lento"],
        ],
      },
      opzioni: [
        {
          testo: "Stati Uniti: il «Made in Italy» e il prezzo premium vendono da soli.",
          corretta: false,
          feedback:
            "Il premium c'è, ma FDA, etichetta, dazi e logistica assorbono la cassa di una PMI al primo export. È un secondo passo, non il primo.",
        },
        {
          testo: "Germania: mercato UE, nessuna dogana, domanda di specialty italiano.",
          corretta: true,
          feedback:
            "Per una PMI al primo export l'UE elimina dazio e dogana. La Germania ha canali specialty e consumatori disposti a pagare un prodotto artigianale con storia. Meno barriere, più apprendimento.",
        },
        {
          testo: "Tutti e tre insieme: più mercati = meno rischio.",
          corretta: false,
          feedback:
            "Tre mercati moltiplicano etichette, broker e scorte. Il rischio si riduce concentrando le risorse sul primo canale che si può servire bene.",
        },
      ],
      indizioExtra:
        "Per una PMI la prima domanda è: quante barriere pago prima di vendere la prima bottiglia?",
      puntiChiave:
        "Primo mercato export: barriere all'ingresso, vantaggio UE vs extra-UE, focus invece di dispersione.",
    },

    {
      id: "budget-export",
      titolo: "Il budget non è un desiderio",
      tipo: "quiz",
      testo:
        "Il piano «facciamo tutto questo trimestre» costa 17.700 €. In cassa ci sono 12.000 €. Come procedete?",
      tabella: {
        intestazioni: ["Voce", "Costo (€)"],
        righe: [
          ["Fiera internazionale", "8.000"],
          ["Campionature e spedizioni prova", "2.000"],
          ["Certificazioni / etichettatura", "3.500"],
          ["Trasporto primo lotto", "4.200"],
          ["Totale piano «tutto subito»", "17.700"],
          ["Cassa disponibile", "12.000"],
        ],
      },
      opzioni: [
        {
          testo: "Facciamo tutto: i ricavi della fiera copriranno il buco.",
          corretta: false,
          feedback:
            "I ricavi di una fiera non sono certi né immediati. 5.700 € di buco sono un rischio di liquidità, non un dettaglio da «vediamo dopo».",
        },
        {
          testo: "Priorità a certificazioni e campionature; fiera più piccola o rinviata.",
          corretta: true,
          feedback:
            "3.500 + 2.000 = 5.500 €. Resta margine per un trasporto contenuto o una fiera locale. Si entra nel mercato con prodotto legale e assaggi, senza bruciare la cassa.",
        },
        {
          testo: "Tagliamo certificazioni ed etichette: in UE non servono.",
          corretta: false,
          feedback:
            "In UE non c'è dazio, ma etichetta (ingredienti, allergeni, lotto, lingua del mercato) è obbligatoria. Saltarla blocca lo scaffale, non il bilancio.",
        },
      ],
      indizioExtra:
        "17.700 − 12.000 = 5.700 € mancanti. Quali spese sono il prerequisito legale per vendere?",
      puntiChiave:
        "Budget di cassa: differenza tra piano dei costi e liquidità disponibile; priorità di spesa prima dei ricavi sperati.",
    },

    {
      id: "erp",
      titolo: "Un solo cruscotto",
      tipo: "quiz",
      testo:
        "Oggi i costi sono su un foglio, gli ordini su WhatsApp, le fatture sul gestionale del commercialista. Per l'ordine export serve un sistema che tenga insieme magazzino, costi, documenti e spedizioni. A cosa serve un ERP in questa missione?",
      opzioni: [
        {
          testo: "A sostituire il commercialista e chiudere i bilanci in autonomia.",
          corretta: false,
          feedback:
            "L'ERP non sostituisce il professionista. Organizza i dati operativi; bilancio e fisco restano competenze da non improvvisare.",
        },
        {
          testo: "A integrare magazzino, fatturazione, costi e ordini export in un unico flusso.",
          corretta: true,
          feedback:
            "Esatto. Un ERP (anche in versione PMI) evita doppi inserimenti e dà visibilità su giacenze, margine reale e stato dell'ordine. L'ERP ha aperto la commessa **EXP-4821**: segnatelo, vi servirà tra un attimo.",
        },
        {
          testo: "A pubblicare il catalogo e-commerce per il buyer tedesco.",
          corretta: false,
          feedback:
            "Il catalogo è e-commerce o CMS. L'ERP sta dietro: quando arriva l'ordine scala il magazzino, genera il documento e traccia il costo.",
        },
      ],
      indizioExtra:
        "Chiediti: quale strumento evita che lo stesso ordine venga scritto in tre file diversi?",
      puntiChiave:
        "Ruolo dell'ERP: integrazione di magazzino, documenti, costi e ordini — non è marketing e non sostituisce il commercialista.",
    },
  ],

  codiceFinale: {
    /** 4 cifre da inserire in gioco per sbloccare (storia ERP). */
    valore: "4821",
    formatoAtteso: "4 cifre",
    prompt:
      "L'ERP ha aperto la commessa export. Inserisci il numero d'ordine per sbloccare la spedizione.",
    /**
     * Codice locker fisico: M + 4 cifre (Meccatronica).
     * `valore` resta 4821 (numero d'ordine in gioco).
     */
    codiceLocker: "M4821",
    schermataVittoria: {
      titolo: "Missione compiuta: GustaVera può spedire",
      testo:
        "Avete evitato la vendita sotto costo, scelto un primo mercato sostenibile, tenuto la cassa in piedi e capito a cosa serve un ERP. Questo è il lavoro quotidiano di chi studia amministrazione, controllo di gestione, marketing e internazionalizzazione.",
      competenzeEvidenziate: [
        "Analisi costi-prezzi e margine",
        "Scelta del mercato estero (UE vs extra-UE)",
        "Budget e liquidità",
        "ERP e integrazione dei processi aziendali",
      ],
    },
  },
};

export default gameConfig;

/*
 * Altri tipi tappa (il motore li supporta già):
 *
 * ENIGMA (risposta libera):
 * {
 *   id: "enigma-1",
 *   titolo: "...",
 *   tipo: "enigma",
 *   testo: "Indizio...",
 *   soluzione: "parola",
 *   formatoAtteso: "una parola",
 *   indizioExtra: "...",
 *   puntiChiave: "...",
 *   feedbackCorretto: "...",
 *   feedbackErrato: "...",
 * }
 *
 * INPUT-CODICE (stesso meccanismo, tono più «sistema»):
 * { tipo: "input-codice", soluzione: "AB12", formatoAtteso: "4 caratteri", ... }
 *
 * PUZZLE-DRAG (ordine da ricostruire, touch-friendly):
 * {
 *   tipo: "puzzle-drag",
 *   testo: "Ordina dal costo al prezzo",
 *   elementi: [
 *     { id: "mp", testo: "Materie prime" },
 *     { id: "prezzo", testo: "Prezzo di vendita" },
 *   ],
 *   ordineCorretto: ["mp", "prezzo"],
 *   feedbackCorretto: "...",
 *   feedbackErrato: "...",
 *   puntiChiave: "...",
 * }
 *
 * codiceFinale.codiceLocker = "4821"  // 4 cifre per il locker fisico (obbligatorio, diverso per ogni gioco)
 *
 * Immagine opzionale su qualsiasi tappa: immagine: "img/scheda.png"
 * (file in /public/img/)
 */
