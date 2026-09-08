import { el } from "../dom.js";
import { COPY } from "../copy.js";
import { codiceLocker, renderSceneArt } from "../utils.js";

/**
 * Schermata vittoria: codice locker (4 cifre) + competenze.
 * @param {HTMLElement} parent
 * @param {{ config: object, hintsUsed: Record<string, boolean>, onRestart: () => void }} props
 */
export function mountVittoriaScreen(parent, { config, hintsUsed, onRestart }) {
  const vittoria = config.codiceFinale?.schermataVittoria ?? {};
  const locker = codiceLocker(config);
  const section = el("section", { class: "victory" });
  const art = renderSceneArt(vittoria.immagine, vittoria.immagineAlt);
  if (art) section.append(art);

  section.append(
    el("p", { class: "victory__kicker" }, COPY.completata),
    el("h1", { class: "victory__title" }, vittoria.titolo || COPY.completata),
  );

  if (locker) {
    const digits = el("div", {
      class: "locker__digits",
      "aria-label": `${COPY.codiceLocker}: ${locker}`,
    });
    for (const cifra of locker.split("")) {
      const letter = /[A-Za-z]/.test(cifra);
      digits.append(
        el("span", { class: letter ? "locker__digit locker__digit--letter" : "locker__digit" }, cifra),
      );
    }
    section.append(
      el(
        "div",
        { class: "locker" },
        el("p", { class: "locker__label" }, COPY.codiceLocker),
        digits,
        el("p", { class: "locker__help" }, COPY.codiceLockerIstruzioni),
      ),
    );
  }

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
