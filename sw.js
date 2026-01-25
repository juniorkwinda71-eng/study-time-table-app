self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("study-timetable-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "manifest.json",
        "sa-calendar-2026.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
