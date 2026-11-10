/* ZAMBU – offline provoz. Při změně aplikace zvyšte číslo verze. */
const CACHE = "zambu-v1";
const SOUBORY = ["./", "index.html", "manifest.webmanifest", "ikona-180.png", "ikona-192.png", "ikona-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SOUBORY)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});

/* Nejdřív síť (kvůli aktualizacím), po 3 s nebo bez signálu z mezipaměti. Cizí adresy (GitHub API) se neřeší. */
self.addEventListener("fetch", e => {
  const req = e.request, u = new URL(req.url);
  if (req.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(new Promise(res => {
    let hotovo = false;
    const zCache = () => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html"));
    const t = setTimeout(() => zCache().then(r => { if (r && !hotovo) { hotovo = true; res(r); } }), 3000);
    fetch(req).then(r => {
      if (r.ok) { const k = r.clone(); caches.open(CACHE).then(c => c.put(req, k)); }
      if (!hotovo) { hotovo = true; clearTimeout(t); res(r); }
    }).catch(() => zCache().then(r => { if (!hotovo) { hotovo = true; clearTimeout(t); res(r || Response.error()); } }));
  }));
});
