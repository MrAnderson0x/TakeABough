/* Take a Bough landing pages: tracking hooks. Built by build_lps.py. */
(function () {
  // Set the GA4 Measurement ID when the property exists, e.g. 'G-ABC123XYZ'.
  var GA4_ID = 'G-FHCHH7WE27';  // Brock's GA4, Take a Bough Tree Service, 2026-11-13
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  if (GA4_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }
  var page = document.body.getAttribute('data-lp') || '';

  // Click-to-call, on any tel: link (WhatConverts swaps the number; the event still fires).
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
    if (!a) return;
    window.dataLayer.push({ event: 'phone_click', lp: page });
    if (GA4_ID) gtag('event', 'phone_click', { lp: page });
  });

  // Form submit attempt (the conversion itself fires on /thank-you/).
  var forms = document.querySelectorAll('form.lp-form');
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', function () {
      window.dataLayer.push({ event: 'form_submit_attempt', lp: page });
    });
  }

  // Thank-you page: one lead per page load.
  if (page === 'thank-you') {
    var m = /[?&]s=([a-z-]+)/.exec(location.search);
    var src = m ? m[1] : '';
    window.dataLayer.push({ event: 'lead_form_submit', lp: src });
    if (GA4_ID) gtag('event', 'generate_lead', { lp: src });
  }
})();
