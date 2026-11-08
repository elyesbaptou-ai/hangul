// Kill switch: the first published version cached a broken build offline on phones.
// Browsers re-check this file on every visit; this version wipes that cache, unregisters
// itself and reloads open pages so they get the current build from the network.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});
