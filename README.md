# ITS Escape

Motore web per **mini-escape-game didattici** da stand fieristico ITS (3–7 minuti, smartphone, italiano).  
Niente backend e niente dati personali: tutto gira nel browser.

Esempio incluso: **Missione: Salva l'azienda!** (Amministrazione, Finanza, Marketing e Internazionalizzazione).

---

## Avvio in locale

Serve [Node.js](https://nodejs.org/) 18 o superiore.

```powershell
npm install
npm run dev
```

Apri l’URL stampato da Vite (di solito `http://localhost:5173`).

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | Sviluppo locale |
| `npm run build` | Genera `dist/` con path **relativi** (`base: "./"`) |
| `npm run preview` | Serve in locale la cartella `dist/` |

La build è pensata per una **sottocartella** di un sito Jekyll / GitHub Pages, come *Codice Lanterna* (`/nome-gioco/`). Dopo `npm run build`, copia il contenuto di `dist/` nella cartella del sito.

Pannello soluzioni per chi gestisce lo stand: aggiungi `?facilitatore=1` all’URL  
(es. `http://localhost:5173/?facilitatore=1`).

---

## Dove si personalizza il contenuto

**Quasi tutto il gioco sta in un solo file.** Non serve toccare il motore.

| Cosa vuoi cambiare | File | Note |
| --- | --- | --- |
| Titolo, storia, corso, tappe, quiz, codice locker | **`src/data/game-config.js`** | File da editare per un gioco nuovo |
| Esempio già pronto (Salva l'azienda) | `src/data/game-config.EXAMPLE.js` | Copialo / usalo come modello |
| Immagini delle tappe | `public/img/` | In config: `"img/nome.png"` |
| Etichette fisse UI («Inizia missione», «Indizio»…) | `src/copy.js` | Solo se vuoi cambiare la lingua del **motore**, non la missione |
| Colori e font | `src/styles/main.css` | Opzionale |

**Non toccare** (a meno di cambiare il motore): `src/engine.js`, `src/components/`, `src/main.js`.

Oggi `game-config.js` re-esporta l’esempio. Per un **gioco nuovo**:

1. Apri `src/data/game-config.EXAMPLE.js` e copiane il contenuto.
2. Incollalo in `src/data/game-config.js` al posto del re-export (togli le due righe `export { gameConfig } from ...`).
3. Modifica testi, tappe e **codice locker**.
4. Salva e ricarica `npm run dev`.

---

## Cosa modificare in `game-config.js`

### 1. Identità della missione — `meta`

```js
meta: {
  slug: "salva-azienda",           // nome cartella / URL
  titolo: "Missione: Salva l'azienda!",
  corsoRiferimento: "...",         // mostrato in intro
  durataStimata: "3-7 minuti",
  obiettivoDidattico: "...",       // «Cosa imparerete»
  contestoNarrativo: "...",        // testo introduttivo
  timer: {
    modalita: "countdown",         // oppure "chrono"
    secondi: 420,                  // 7 minuti; non blocca il gioco se scade
  },
}
```

### 2. Tappe — `tappe` (di solito 3–5)

Ogni tappa è un oggetto. Campi comuni:

| Campo | Uso |
| --- | --- |
| `id` | Identificativo unico (`"costi-prezzi"`) |
| `titolo` | Titolo in pagina |
| `tipo` | `"quiz"` \| `"enigma"` \| `"puzzle-drag"` \| `"input-codice"` |
| `testo` | Domanda / indizio |
| `immagine` | Opzionale, es. `"img/scheda.png"` |
| `tabella` | Opzionale: `{ intestazioni: [...], righe: [[...], ...] }` |
| `indizioExtra` | Testo del bottone **Indizio** |
| `puntiChiave` | Concetto didattico in **vittoria** (per il docente) |

**Quiz** (`tipo: "quiz"`): array `opzioni` con `testo`, `corretta: true/false`, `feedback`.  
Nel `feedback` puoi usare `**grassetto**` (es. il numero da segnare: `**EXP-4821**`).

**Enigma / input-codice:** campo `soluzione` (confronto permissivo: ignora maiuscole, accenti, trattini).

**Puzzle-drag:** `elementi: [{ id, testo }]` e `ordineCorretto: ["id1", "id2", ...]`.

### 3. Fine missione e locker fisico — `codiceFinale`

Ogni gioco deve **consegnare 4 cifre diverse** per i locker in stand.

```js
codiceFinale: {
  valore: "4821",              // da digitare in gioco (sblocco missione)
  formatoAtteso: "4 cifre",
  prompt: "Inserisci il numero d'ordine...",
  codiceLocker: "4821",        // 4 cifre mostrate in vittoria → locker fisico
  schermataVittoria: {
    titolo: "...",
    testo: "...",
    competenzeEvidenziate: ["...", "..."],
  },
}
```

- **`codiceLocker`**: obbligatorio per lo stand; **cambia da gioco a gioco** (es. un gioco `4821`, un altro `7391`).
- `valore` può coincidere con il locker (come in Salva l'azienda) oppure essere un altro indizio interno.

---

## Flusso del giocatore (non si configura)

Intro → tappe in ordine (si può **tornare indietro** a rileggere) → inserimento codice di sblocco → schermata vittoria con **codice locker a 4 cifre** e riepilogo competenze.

Errori: niente game over, solo «riprova».

---

## Struttura cartelle

```
src/data/game-config.js          ← contenuti della missione (modifica qui)
src/data/game-config.EXAMPLE.js  ← modello Missione: Salva l'azienda
src/engine.js                    ← motore (non serve per i testi)
src/components/                  ← schermate UI
src/styles/main.css
public/img/                      ← immagini opzionali
```

---

## Pubblicare

```powershell
npm run build
```

Copia `dist/` nella sottocartella del sito (es. `its-your-future/salva-azienda/`).  
`vite.config.js` usa `base: "./"` così i file funzionano anche sotto `/nome-gioco/`.
