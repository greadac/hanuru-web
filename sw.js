const CACHE='hanuru-web-v1';
const SHELL=['./','index.html','config.js','manifest.json','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.hostname.includes('openstreetmap')||u.hostname.includes('googleapis.com')&&u.pathname.includes('identitytoolkit')) return;
  if(u.hostname.includes('firestore')||u.hostname.includes('googleapis.com')&&!u.hostname.includes('fonts')) return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r&&r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{})}
    return r;
  }).catch(()=>caches.match(e.request).then(m=>m||(e.request.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
