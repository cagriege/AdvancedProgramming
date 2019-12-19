
const CACHE ='AdvancedProgramming'
const FILES = ['/AdvancedProgramming/celcius.html', '/AdvancedProgramming/counting.html', '/AdvancedProgramming/CW%233%20--%20Objects%20and%20Arrays/range.png', '/AdvancedProgramming/CW4.html','/AdvancedProgramming/CW5/work/EloquentJS.html','/AdvancedProgramming/work/CW6/CW6.html', '/AdvancedProgramming/CW7/cw7.html','/AdvancedProgramming/cw8/CW8.html','/AdvancedProgramming/CW9.html','/AdvancedProgramming/hw1.html','/AdvancedProgramming/hw2/index.html','/AdvancedProgramming/hw3.html']
function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)
function cacheCB(e) { //cache first
  let req = e.request
  e.respondWith(
    caches.match(req)
    .then(r1 => r1 || fetch(req))
    .catch(console.log)
  )
}
self.addEventListener('fetch', cacheCB)
function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  }) 
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)
