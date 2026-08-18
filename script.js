<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reservieren | Zum Mönchberger</title>
  <meta name="description" content="Tisch reservieren im Zum Mönchberger in Herrenberg. Online Reservierung über resmio mit direkter Bestätigung." />
  <link rel="stylesheet" href="/styles.css" />
  <script src="/script.js" defer></script>
</head>

<body>

<header class="header">
  <div class="container header-inner">
    <a class="logo" href="/restaurant/#top">Zum Mönchberger</a>

    <nav class="nav" id="mainNav">
      <a href="/restaurant/#restaurant">Restaurant</a>
      <a href="/restaurant/#events">Events</a>
      <a href="/reservieren.html">Reservieren</a>
      <a href="/restaurant/#kontakt">Anfragen</a>
      <a href="/impressum.html">Impressum</a>
      <a href="/datenschutz.html">Datenschutz</a>
    </nav>

    <button class="nav-toggle" id="navToggle" aria-label="Menü öffnen">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main>

  <section class="section" style="padding-top:110px;">
    <div class="container center-text-mobile">
      <h1>Tisch reservieren</h1>
      <p class="muted">
        Online Reservierung über resmio. Du bekommst direkt eine Bestätigung.
      </p>

      <div class="card" style="margin-top:14px;">
        <p class="muted" style="margin:0;">
          Hinweis für Gruppen.
          Wenn ihr eine Feier plant oder eine größere Gruppe seid, schreib uns bitte direkt,
          damit wir Platz und Ablauf passend einplanen.
          <a class="linklike" href="/restaurant/#kontakt">Zur Anfrage</a>
        </p>
      </div>

      <div class="card res-widget" style="margin-top:14px;">
        <div id="resmio-zum-moenchberger"></div>
      </div>

      <div class="card center" style="margin-top:14px;">
        <a class="btn ghost" href="/restaurant/#zeiten">Öffnungszeiten</a>
        <a class="btn" href="/restaurant/#kontakt" style="margin-left:8px;">Kontakt</a>
      </div>
    </div>
  </section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <a href="/restaurant/#restaurant">Restaurant</a> ·
    <a href="/restaurant/#events">Events</a> ·
    <a href="/reservieren.html">Reservieren</a> ·
    <a href="/restaurant/#kontakt">Kontakt</a> ·
    <a href="/datenschutz.html">Datenschutz</a> ·
    <a href="/impressum.html">Impressum</a> ·
    <a href="https://dejavuherrenberg.de/bar/" target="_blank" rel="noopener">Déjà Vu Herrenberg</a>
  </div>
</footer>

<!-- resmio widget -->
<script>
(function(d, s) {
  var js, rjs = d.getElementsByTagName(s)[0];
  js = d.createElement(s);
  js.src = "//static.resmio.com/static/de/widget.js#id=zum-moenchberger&height=650&width=100%&fontSize=14px";
  rjs.parentNode.insertBefore(js, rjs);
}(document, "script"));
</script>

</body>
</html>