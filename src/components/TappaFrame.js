import { el } from "../dom.js";
import { renderSceneArt } from "../utils.js";

/**
 * @param {object} tabella
 */
export function renderTabella(tabella) {
  if (!tabella?.intestazioni || !tabella?.righe) return null;
  const table = el("table", { class: "data-table" });
  const thead = el("thead");
  const headRow = el("tr");
  for (const h of tabella.intestazioni) {
    headRow.append(el("th", { scope: "col" }, h));
  }
  thead.append(headRow);
  const tbody = el("tbody");
  for (const riga of tabella.righe) {
    const tr = el("tr");
    const label = String(riga[0] ?? "");
    if (/totale|cassa|costo pieno/i.test(label)) {
      tr.classList.add("is-total");
    }
    riga.forEach((cella, i) => {
      tr.append(el(i === 0 ? "th" : "td", i === 0 ? { scope: "row" } : {}, cella));
    });
    tbody.append(tr);
  }
  table.append(thead, tbody);
  return el("div", { class: "data-table-wrap" }, table);
}

/**
 * @param {HTMLElement} parent
 * @param {{ tappa: object, onBack?: () => void, backLabel?: string }} props
 */
export function mountTappaFrame(parent, { tappa, onBack, backLabel }) {
  const article = el("article", { class: "tappa" });
  if (onBack) {
    const back = el(
      "button",
      { class: "btn btn--ghost tappa__back", type: "button" },
      backLabel || "← Indietro",
    );
    back.addEventListener("click", onBack);
    article.append(back);
  }
  const art = renderSceneArt(tappa.immagine, tappa.immagineAlt);
  if (art) article.append(art);
  article.append(el("h2", { class: "tappa__title" }, tappa.titolo ?? ""));
  if (tappa.testo) {
    article.append(el("p", { class: "tappa__text" }, tappa.testo));
  }
  const tabella = renderTabella(tappa.tabella);
  if (tabella) article.append(tabella);

  const hintMount = el("div", { class: "tappa__hint" });
  const body = el("div", { class: "tappa__body" });
  const feedbackMount = el("div", { class: "tappa__feedback" });
  article.append(hintMount, body, feedbackMount);
  parent.append(article);

  return { article, hintMount, body, feedbackMount, destroy: () => article.remove() };
}
