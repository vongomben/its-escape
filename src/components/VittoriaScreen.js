import { el } from "../dom.js";
import { COPY } from "../copy.js";
import { renderSceneArt } from "../utils.js";
import { calcolaStelle, stelleElement } from "../stelle.js";

/**
 * Errori + indizi → stelle: 0 → 5, 1 → 4, 2–3 → 3, 4–5 → 2, 6+ → 1.
 * Sovrascrivibile da config.punteggio.soglie.
 */
export const SOGLIE_STELLE = [0, 1, 3, 5];

function dettaglioPunteggio(errori, indizi) {
  const parti = [
    errori === 0 ? COPY.nessunErrore : `${errori} ${errori === 1 ? COPY.errore : COPY.errori}`,
    indizi === 0 ? COPY.nessunIndizio : `${indizi} ${indizi === 1 ? COPY.indizioSingolare : COPY.indiziPlurale}`,
  ];
  return parti.join(" · ");
}

/**
 * Schermata vittoria: punteggio a stelle + competenze.
 * @param {HTMLElement} parent
 * @param {{ config: object, hintsUsed: Record<string, boolean>, errors: number, onRestart: () => void }} props
 */
export function mountVittoriaScreen(parent, { config, hintsUsed, errors = 0, onRestart }) {
  const vittoria = config.codiceFinale?.schermataVittoria ?? {};
  const indizi = Object.values(hintsUsed).filter(Boolean).length;
  const stelle = calcolaStelle(errors + indizi, config.punteggio?.soglie ?? SOGLIE_STELLE);
  const section = el("section", { class: "victory" });
  const art = renderSceneArt(vittoria.immagine, vittoria.immagineAlt);
  if (art) section.append(art);

  section.append(
    el("p", { class: "victory__kicker" }, COPY.completata),
    el("h1", { class: "victory__title" }, vittoria.titolo || COPY.completata),
  );

  section.append(stelleElement(stelle, dettaglioPunteggio(errors, indizi)));

  if (vittoria.testo) {
    section.append(el("p", { class: "victory__text" }, vittoria.testo));
  }

  const competenze = vittoria.competenzeEvidenziate ?? [];
  if (competenze.length) {
    const list = el("ul", { class: "victory__chips" });
    for (const voce of competenze) {
      list.append(el("li", { class: "chip" }, voce));
    }
    section.append(el("h2", { class: "victory__h2" }, COPY.competenze), list);
  }

  const tappe = config.tappe ?? [];
  if (tappe.length) {
    const wrap = el("div", { class: "victory__points" });
    wrap.append(el("h2", { class: "victory__h2" }, COPY.puntiDalleTappe));
    for (const tappa of tappe) {
      const card = el("article", { class: "point-card" });
      card.append(el("h3", { class: "point-card__title" }, tappa.titolo));
      if (tappa.puntiChiave) {
        card.append(el("p", {}, tappa.puntiChiave));
      }
      if (hintsUsed[tappa.id]) {
        card.append(el("p", { class: "point-card__hint" }, COPY.indizioUsato));
      }
      wrap.append(card);
    }
    section.append(wrap);
  }

  const restart = el("button", { class: "btn btn--ghost", type: "button" }, COPY.nuovaMissione);
  restart.addEventListener("click", onRestart);
  section.append(restart);
  parent.append(section);
  return () => section.remove();
}
