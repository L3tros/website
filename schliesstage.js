/* schliesstage.js
   Geschlossene Tage vom Zum Mönchberger und Abgleich mit Google.

   1. SCHLIESSTAGE: hier trägst du Tage ein, an denen zu ist
      (geschlossene Gesellschaft, Krankheit, Feiertag ...).
      Format JJJJ-MM-TT. Vergangene Tage werden automatisch ausgeblendet.

   2. Google: Sobald die automatische Prüfung läuft, liegt auf der Seite
      eine Datei /oeffnungszeiten.json. Steht dort für heute "geschlossen",
      gilt das genauso wie ein Eintrag hier.
*/
window.MOENCH_SCHLIESSTAGE = [
  { datum: "2026-11-07", text: "Geschlossene Gesellschaft" },
  { datum: "2026-11-14", text: "Geschlossene Gesellschaft" },
  { datum: "2026-11-28", text: "Geschlossene Gesellschaft" }
];

(function () {
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  var TAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  /* Schließtag aus der Liste für ein Datum, sonst null */
  window.moenchSchliesstag = function (datum) {
    var l = window.MOENCH_SCHLIESSTAGE || [];
    for (var i = 0; i < l.length; i++) if (l[i].datum === datum) return l[i].text;
    return null;
  };

  /* Liest die Google-Daten für einen Ort ("moench" oder "deja").
     Ruft fertig(info) auf, info ist null wenn nichts da ist.
     info = { offen: true/false, heuteGeschlossen: true/false } */
  var cache = null;
  function laden(cb) {
    if (cache) { cache.then(cb); return; }
    if (!window.fetch) { cb(null); return; }
    cache = fetch("/oeffnungszeiten.json", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
    cache.then(cb);
  }
  window.googleStatus = function (ort, fertig) {
    laden(function (j) {
      var o = j && j.orte && j.orte[ort];
      if (!o || !o.stand || !o.perioden) { fertig(null); return; }
      /* Daten älter als 2 Tage? Dann lieber die normalen Zeiten nehmen */
      if (Date.now() - new Date(o.stand).getTime() > 2 * 864e5) { fertig(null); return; }
      var jetzt = new Date();
      var heute = iso(jetzt);
      var gestern = iso(new Date(jetzt.getTime() - 864e5));
      var min = jetzt.getHours() * 60 + jetzt.getMinutes();
      var heuteDa = false, offen = false;
      o.perioden.forEach(function (p) {
        if (!p.open || !p.open.date) return;
        var d = p.open.date.year + "-" + pad(p.open.date.month) + "-" + pad(p.open.date.day);
        var von = p.open.hour * 60 + (p.open.minute || 0);
        var bis = p.close ? p.close.hour * 60 + (p.close.minute || 0) : 24 * 60;
        if (bis <= von) bis += 24 * 60;
        if (d === heute) {
          heuteDa = true;
          if (min >= von && min < bis) offen = true;
        } else if (d === gestern && bis > 24 * 60) {
          /* Nacht über Mitternacht, z.B. Bar bis 5 Uhr */
          if (min + 24 * 60 < bis) { offen = true; heuteDa = true; }
        }
      });
      fertig({ offen: offen, heuteGeschlossen: !heuteDa });
    });
  };
  window.moenchGoogle = function (fertig) { window.googleStatus("moench", fertig); };

  /* Restaurantseite: Hinweis im Öffnungszeiten-Kasten */
  function hinweis() {
    var box = document.getElementById("schliesstage");
    if (!box) return;
    var heute = iso(new Date());
    var kommend = (window.MOENCH_SCHLIESSTAGE || []).filter(function (t) { return t.datum >= heute; });
    var zeilen = [];
    kommend.slice(0, 4).forEach(function (t) {
      var d = new Date(t.datum + "T12:00:00");
      var label = t.datum === heute ? "Heute" : TAGE[d.getDay()] + ", " + pad(d.getDate()) + "." + pad(d.getMonth() + 1) + ".";
      zeilen.push({ tag: label, text: t.text });
    });
    function zeigen() {
      box.innerHTML = "";
      if (!zeilen.length) { box.hidden = true; return; }
      zeilen.forEach(function (z) {
        var row = document.createElement("div");
        row.className = "hours-row schliesstag";
        var l = document.createElement("div"); l.className = "hours-left"; l.textContent = z.tag;
        var r = document.createElement("div"); r.className = "hours-right"; r.textContent = z.text ? "geschlossen, " + z.text : "geschlossen";
        row.appendChild(l); row.appendChild(r); box.appendChild(row);
      });
      box.hidden = false;
    }
    zeigen();
    window.moenchGoogle(function (info) {
      if (info && info.heuteGeschlossen && !window.moenchSchliesstag(heute)) {
        zeilen.unshift({ tag: "Heute", text: "" });
        zeigen();
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hinweis);
  else hinweis();
})();
