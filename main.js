(function () {
  "use strict";
  var WA = "https://wa.me/4915562725821?text=";

  /* ---------- Vorher / Nachher ---------- */
  var ba = document.getElementById("ba");
  var baTop = document.getElementById("baTop");
  var baHandle = document.getElementById("baHandle");
  var baRange = document.getElementById("baRange");
  function setSplit(p) {
    p = Math.max(2, Math.min(98, Math.round(p)));
    baTop.style.clipPath = "inset(0 " + (100 - p) + "% 0 0)";
    baHandle.style.left = p + "%";
    if (baRange) baRange.value = p;
  }
  if (ba && baTop && baHandle) {
    var dragging = false;
    var fromEvent = function (e) {
      var r = ba.getBoundingClientRect();
      setSplit((e.clientX - r.left) / r.width * 100);
    };
    ba.addEventListener("pointerdown", function (e) {
      dragging = true;
      try { ba.setPointerCapture(e.pointerId); } catch (x) {}
      fromEvent(e);
    });
    ba.addEventListener("pointermove", function (e) { if (dragging) fromEvent(e); });
    ba.addEventListener("pointerup", function () { dragging = false; });
    ba.addEventListener("pointercancel", function () { dragging = false; });
    if (baRange) baRange.addEventListener("input", function () { setSplit(Number(baRange.value)); });
  }

  /* ---------- Größen-Rechner ---------- */
  var uses = {
    13: "Theke, Hotelzimmer, Messetisch",
    32: "Kasse und Empfang",
    43: "Wartezimmer, Empfang, Theke",
    55: "Verkaufsraum und Schaufenster",
    75: "Ladenwand und Meetingraum",
    98: "großes Schaufenster und Foyer",
    115: "großes Schaufenster und Showroom",
    147: "Schaufensterfront, Mall, Atrium"
  };
  var $ = function (id) { return document.getElementById(id); };
  function X(v) { return (v / 640 * 100).toFixed(2) + "%"; }
  function Y(v) { return (v / 330 * 100).toFixed(2) + "%"; }
  function setSize(size) {
    if (!$("sbox")) return;
    var k = 1.1;
    var wcm = size * 2.54 * 0.8716, hcm = size * 2.54 * 0.4903;
    var bottom = Math.max(30, 150 - hcm / 2);
    var w = wcm * k, h = hcm * k;
    var y = 310 - bottom * k - h;
    var personH = 170 * k;
    var sx = 170, x2 = sx + w, y2 = y + h, hx = x2 + 12;
    var inside = w >= 150;
    var dLabel = size + " Zoll · " + Math.round(size * 2.54) + " cm";

    $("sbox").setAttribute("aria-label", size + " Zoll Bildschirm neben einer Person mit 1,70 m");
    $("sPerson").style.height = Y(personH);
    $("sPLabel").style.top = Y(310 - personH + 6);
    var sc = $("sScreen").style; sc.left = X(sx); sc.top = Y(y); sc.width = X(w); sc.height = Y(h);
    var d = $("sDiag").style; d.left = X(sx); d.top = Y(y2); d.width = X(Math.sqrt(w * w + h * h));
    d.transform = "rotate(-" + (Math.atan2(h, w) * 180 / Math.PI).toFixed(2) + "deg)";
    $("sDiagIn").textContent = inside ? dLabel : "";
    var wr = $("sWr").style; wr.left = X(sx); wr.top = Y(y - 12); wr.width = X(w);
    $("sWLabel").textContent = Math.round(wcm) + " cm";
    var hr = $("sHr").style; hr.left = X(hx); hr.top = Y(y); hr.height = Y(h);
    var hl = $("sHLabel"); hl.style.left = X(hx + 10); hl.style.top = Y(y + h / 2); hl.textContent = Math.round(hcm) + " cm";
    var dout = $("sDOut"); dout.hidden = inside; dout.style.left = X(hx + 10); dout.style.top = Y(y + h / 2 + 24); dout.textContent = dLabel;

    $("szTitle").textContent = size + " Zoll";
    $("szDiag").textContent = Math.round(size * 2.54) + " cm";
    $("szDims").textContent = Math.round(wcm) + " x " + Math.round(hcm) + " cm";
    $("szUse").textContent = uses[size];
    $("szPrice").textContent = size === 55 ? "Innen ab 99 € / Monat · Schaufenster ab 149 € / Monat" : "Preis auf Anfrage";
    document.querySelectorAll(".pill[data-size]").forEach(function (b) {
      var on = Number(b.getAttribute("data-size")) === size;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  document.querySelectorAll(".pill[data-size]").forEach(function (b) {
    b.addEventListener("click", function () { setSize(Number(b.getAttribute("data-size"))); });
  });
  setSize(55);

  /* ---------- Ladenname ---------- */
  var nameIn = $("nameIn");
  function setName() {
    var t = (nameIn.value || "").trim() || "Euer Laden";
    var words = t.split(/\s+/);
    var longest = Math.max.apply(null, words.map(function (x) { return x.length; }).concat([4]));
    var L = Math.max(longest, Math.ceil(t.length / 2));
    var big = $("nameBig");
    if (big) { big.textContent = t; big.style.fontSize = Math.max(6, Math.min(13, 84 / (L * 0.66))).toFixed(1) + "cqw"; }
    document.querySelectorAll(".shown").forEach(function (s) { s.textContent = t; });
  }
  if (nameIn) { nameIn.addEventListener("input", setName); setName(); }

  /* ---------- Finn ---------- */
  var answers = {
    laden: { text: "Super. Schreib uns kurz, was für ein Laden ihr seid und wo der Bildschirm hin soll. Die Beratung ist kostenlos.", cta: "WhatsApp-Nachricht öffnen", href: WA + encodeURIComponent("Hallo Kuvan Media, ich möchte einen Bildschirm für meinen Laden.") },
    groesse: { text: "Probier den Größen-Rechner aus. Da siehst du jede Größe neben einer Person.", cta: "Zum Größen-Rechner", href: "#groessen" },
    preis: { text: "55 Zoll innen gibt es ab 99 € im Monat, im Schaufenster ab 149 €. Ab dem zweiten Bildschirm wird es günstiger.", cta: "Zu den Preisen", href: "#preise" },
    andere: { text: "Schreib mir einfach. Ich melde mich schnell, auch am Wochenende.", cta: "WhatsApp-Nachricht öffnen", href: WA + encodeURIComponent("Hallo Kuvan Media, ich habe eine Frage.") }
  };
  var box = $("finnBox"), fig = $("finnFig"), tease = $("finnTease"), menu = $("finnMenu"), ans = $("finnAnswer");
  function openFinn(open) {
    if (!box) return;
    box.hidden = !open; tease.hidden = open;
    fig.setAttribute("aria-expanded", open ? "true" : "false");
    fig.setAttribute("aria-label", open ? "Finn schließen" : "Finn fragen");
    menu.hidden = false; ans.hidden = true;
  }
  if (fig) {
    fig.addEventListener("click", function () { openFinn(box.hidden); });
    tease.addEventListener("click", function () { openFinn(true); });
    document.querySelectorAll("[data-topic]").forEach(function (b) {
      b.addEventListener("click", function () {
        var a = answers[b.getAttribute("data-topic")];
        $("finnText").textContent = a.text;
        var c = $("finnCta"); c.textContent = a.cta; c.href = a.href;
        if (a.href.indexOf("http") === 0) { c.target = "_blank"; c.rel = "noopener"; } else { c.removeAttribute("target"); c.removeAttribute("rel"); }
        menu.hidden = true; ans.hidden = false;
      });
    });
    $("finnBack").addEventListener("click", function () { menu.hidden = false; ans.hidden = true; });
    $("finnCta").addEventListener("click", function () { if ($("finnCta").getAttribute("href").charAt(0) === "#") openFinn(false); });
  }
})();
