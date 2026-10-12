"use strict";

function loadingSkeleton(kind, label, count = 4) {
  const line = '<span class="skeleton-bar"></span>';
  const icon = '<span class="skeleton-icon"></span>';
  const repeat = (content, amount) => Array.from({length:amount}, () => content).join("");
  const metric = `<div class="metric">${line}${line}</div>`;
  const resource = `<div class="resource">${icon}${line}<div class="skeleton-number">${line}</div>${line}</div>`;
  const pager = `<div class="pagination skeleton-pagination">${line}${line}${line}</div>`;
  let content;
  if (kind === "profile") {
    content = `<div class="profile-record"><div class="profile-identity"><span class="portrait portrait-large skeleton-icon"></span><div>${line}${line}${line}</div></div><div class="profile-stats">${repeat(metric,3)}</div></div>`;
  } else if (kind === "cards" || kind === "showcase") {
    const card = `<article class="character-card skeleton-item"><span class="portrait skeleton-icon"></span><div class="character-card-content">${line}${line}<span class="skeleton-button skeleton-bar"></span></div></article>`;
    content = `${kind === "showcase" ? pager : ""}<div class="character-grid">${repeat(card,count)}</div>${kind === "showcase" ? pager : ""}`;
  } else if (kind === "rows") {
    const row = `<tr><td><div class="character-name">${icon}<span>${line}${line}</span></div></td><td>${line}</td><td>${line}${line}</td>${repeat(`<td>${line}</td>`,5)}</tr>`;
    content = `${pager}<div class="table-wrap"><table><thead><tr>${repeat(`<th>${line}</th>`,8)}</tr></thead><tbody>${repeat(row,count)}</tbody></table></div>${pager}`;
  } else if (kind === "notes") {
    content = `<div class="resources">${repeat(resource,3)}</div><div class="mini-resources">${repeat(resource,2)}</div>${line}<div class="expedition-cards">${repeat(`<div class="stat-row">${icon}${line}${line}</div>`,3)}</div>`;
  } else if (kind === "summary") {
    content = resource;
  } else if (kind === "explore") {
    const region = `<article class="explore-region skeleton-item"><header class="explore-region-header"><div class="explore-region-identity">${icon}<div>${line}${line}</div></div></header><div class="explore-region-body">${line}${line}${line}${line}</div></article>`;
    content = `<div class="explore-grid">${repeat(region,count)}</div>`;
  } else if (kind === "detail") {
    content = `<div class="detail-header">${line}${line}</div><div class="build-layout"><aside class="build-art">${icon}${line}${line}</aside><div class="build-data">${line}<div class="core-stats">${repeat(`<div class="stat-row">${line}${line}</div>`,6)}</div><div class="detail-columns"><section>${icon}${line}${line}</section><section>${repeat(line,4)}</section></div></div></div>${line}${repeat(`<article class="artifact">${icon}<div>${line}${line}${line}${line}</div></article>`,5)}`;
  }
  const safeLabel = String(label).replace(/[&<>"']/g, value => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[value]));
  return `<div class="loading-skeleton skeleton-${kind}" role="status"><span class="skeleton-label">${safeLabel}</span><div aria-hidden="true">${content || ""}</div></div>`;
}
