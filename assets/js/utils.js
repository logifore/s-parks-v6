"use strict";

window.SparksUtils = (() => {
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function icon(name) {
    return `<span class="material-symbols-outlined" aria-hidden="true">${escapeHtml(name)}</span>`;
  }

  function image(src, alt, className = "") {
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${escapeHtml(className)}" loading="lazy" referrerpolicy="no-referrer">`;
  }

  function pageShell(label, title, subtitle, body, extraClass = "") {
    return `
      <section class="page ${escapeHtml(extraClass)}">
        <header class="page-heading">
          <span class="eyebrow">${escapeHtml(label)}</span>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(subtitle)}</p>
        </header>
        ${body}
      </section>
    `;
  }

  return { escapeHtml, icon, image, pageShell };
})();
