"use strict";

function loadingSkeleton(kind, label, count = 4) {
  const line = '<span class="skeleton-bar"></span>';
  const rows = Array.from({length: count}, () => `<div class="skeleton-item"><span class="skeleton-icon"></span><div>${line}${line}${line}</div></div>`).join("");
  const safeLabel = String(label).replace(/[&<>"']/g, value => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[value]));
  return `<div class="loading-skeleton skeleton-${kind}" role="status"><span class="skeleton-label">${safeLabel}</span><div aria-hidden="true" class="skeleton-content">${rows}</div></div>`;
}
