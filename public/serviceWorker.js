const staticCacheName = "static-site-v2";
const dynamicCacheName = "dynamic-site-v1";

const ASSETS = ["/", "/index.html", "/main.css", "/main.js", "/offline.html"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(ASSETS);
});

self.addEventListener("activate", async (event) => {
  const cachesKeysArr = await caches.keys();

  await Promise.all(
    cachesKeysArr
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete(key))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        return networkFirst(request);
      }))
    );
  } catch (e) {
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);

    return cached ?? caches.match("/offline.html");
  }
}
