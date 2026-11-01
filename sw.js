// =====================================================================
// sw.js : le SERVICE WORKER (fonctionnement hors ligne)
// =====================================================================
// Un service worker est un script qui tourne en arrière-plan, entre l'app et
// Internet. Ici, il garde les fichiers de l'app en mémoire (cache) pour qu'elle
// s'ouvre même sans réseau.
//
// CACHE_NAME : le nom de la version du cache. IMPORTANT : à chaque fois que tu
// modifies un fichier de l'app, change ce nom (v5 -> v6...), sinon l'iPhone
// continuera d'afficher l'ancienne version en cache.
const CACHE_NAME = 'digits-learning-v5';
// Dossier de l'app sur le serveur. Doit correspondre à l'adresse où elle est
// hébergée (ex : https://monsite.github.io/digits-learning/) et au
// start_url de manifest.json.
const BASE_PATH = '/digits-learning/';

// Liste des fichiers à mettre en cache. Si tu ajoutes un fichier à l'app
// (une icône, une police...), ajoute-le ici aussi pour qu'il soit dispo hors ligne.
const ASSETS = [
  `${BASE_PATH}index.html`,
  `${BASE_PATH}style.css`,
  `${BASE_PATH}app.js`,
  `${BASE_PATH}manifest.json`
];

// ÉVÉNEMENT "install" : se déclenche à la première installation (ou quand sw.js
// change). On ouvre le cache et on y télécharge tous les fichiers de ASSETS.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ÉVÉNEMENT "activate" : se déclenche quand la nouvelle version prend le relais.
// On supprime les anciens caches (ceux dont le nom n'est pas CACHE_NAME)
// pour ne pas accumuler d'anciennes versions.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// ÉVÉNEMENT "fetch" : se déclenche à chaque demande de fichier par la page.
// Stratégie "cache d'abord" : si le fichier est en cache on le renvoie
// immédiatement, sinon on le télécharge normalement sur le réseau.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
