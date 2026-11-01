/* weihnachten.js
   Weihnachtsstimmung für zum-moenchberger.de

   An- und ausschalten:
   - AN auf false setzen, dann ist alles aus.
   - Oder einfach VON und BIS anpassen. Außerhalb des Zeitraums passiert nichts.
   - Ganz entfernen: die Zeile <script src="/weihnachten.js" defer></script>
     aus index.html und restaurant/index.html löschen.
*/
(function () {
  var AN  = true;
  var VON = "2026-11-01";
  var BIS = "2027-01-06";

  var BANNER_TITEL = "Weihnachtsfeier bei uns?";
  var BANNER_TEXT  = "Firma, Verein oder Familie. Sichert euch jetzt euren Termin im Dezember.";
  var BANNER_KNOPF = "Jetzt anfragen";
  var BANNER_LINK  = "/restaurant/#kontakt";

  if (!AN) return;
  var d = new Date();
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var heute = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  if (heute < VON || heute > BIS) return;

  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var css = [
    ".xmas-snow{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}",
    /* Banner unter dem Hero */
    ".xmas-banner{background:linear-gradient(120deg,#7B2A28 0%,#5E1F1D 100%);color:#fff;position:relative;overflow:hidden}",
    ".xmas-banner::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.12;",
    "background-image:radial-gradient(#fff 1px,transparent 1.5px);background-size:22px 22px}",
    ".xmas-banner .container{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:26px 0;flex-wrap:wrap}",
    ".xmas-banner .xmas-kicker{display:block;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E8C77A;margin-bottom:4px}",
    ".xmas-banner h3{margin:0;font-size:22px}",
    ".xmas-banner p{margin:4px 0 0;opacity:.85;max-width:56ch}",
    ".xmas-banner .btn{background:#E8C77A;color:#2A1A10;border-color:#E8C77A;white-space:nowrap}",
    ".xmas-banner .btn:hover{background:#fff;border-color:#fff}",
    /* Schlitten über dem Titelbild */
    ".xmas-sky{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden}",
    ".xmas-sleigh{position:absolute;top:9%;left:0;width:clamp(220px,30vw,400px);transform:translateX(-110%);animation:xmasFly 22s linear 1.5s infinite}",
    ".xmas-sleigh .bob{animation:xmasBob 1.6s ease-in-out infinite}",
    ".xmas-sleigh svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 6px 10px rgba(0,0,0,.25))}",
    ".xmas-sleigh .bein-a{transform-box:fill-box;transform-origin:50% 0;animation:xmasLeg .5s ease-in-out infinite alternate}",
    ".xmas-sleigh .bein-b{transform-box:fill-box;transform-origin:50% 0;animation:xmasLeg .5s ease-in-out infinite alternate-reverse}",
    ".xmas-sleigh .nase{animation:xmasNose 1s ease-in-out infinite}",
    ".xmas-sleigh .funken circle{animation:xmasSpark 1.2s linear infinite}",
    ".xmas-sleigh .funken circle:nth-child(2){animation-delay:.4s}",
    ".xmas-sleigh .funken circle:nth-child(3){animation-delay:.8s}",
    "@keyframes xmasFly{0%{transform:translateX(-110%) translateY(30px)}55%{transform:translateX(calc(100vw + 10%)) translateY(-20px)}100%{transform:translateX(calc(100vw + 10%)) translateY(-20px)}}",
    "@keyframes xmasBob{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-8px) rotate(1deg)}}",
    "@keyframes xmasLeg{from{transform:rotate(-22deg)}to{transform:rotate(22deg)}}",
    "@keyframes xmasNose{0%,100%{opacity:1}50%{opacity:.55}}",
    "@keyframes xmasSpark{0%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(-40px) translateY(10px)}}",
    ".xmas-drift{position:absolute;left:0;right:0;bottom:-1px;height:clamp(28px,4vw,56px);z-index:2;pointer-events:none}",
    ".xmas-drift svg{display:block;width:100%;height:100%;filter:drop-shadow(0 -2px 4px rgba(0,0,0,.18))}",
    "@media (max-width:720px){.xmas-sleigh{top:1.5%}}",
    "@media (prefers-reduced-motion: reduce){.xmas-sleigh{display:none}}",
    /* Weihnachtsbaum Auswahlseite */
    ".xmas-tree{position:absolute;right:clamp(24px,4vw,64px);bottom:clamp(80px,9vh,110px);width:clamp(140px,14vw,210px);z-index:2;pointer-events:none}",
    ".xmas-tree svg{display:block;width:100%;height:auto;overflow:visible}",
    ".xmas-tree .wiegen{transform-origin:50% 100%;animation:xmasSway 6s ease-in-out infinite}",
    ".xmas-tree .stern{transform-origin:100px 22px;animation:xmasStar 3s ease-in-out infinite}",
    ".xmas-tree .glanz{animation:xmasGlow 3s ease-in-out infinite}",
    ".xmas-tree .kugel{animation:xmasBlink 2.2s ease-in-out infinite}",
    ".xmas-tree .kugel:nth-of-type(3n+2){animation-delay:.7s}",
    ".xmas-tree .kugel:nth-of-type(3n){animation-delay:1.4s}",
    ".xmas-tree .geschenk{animation:xmasHop 4s ease-in-out infinite}",
    "@keyframes xmasSway{0%,100%{transform:rotate(-1.4deg)}50%{transform:rotate(1.4deg)}}",
    "@keyframes xmasStar{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.12) rotate(8deg)}}",
    "@keyframes xmasGlow{0%,100%{opacity:.35}50%{opacity:.8}}",
    "@keyframes xmasBlink{0%,100%{opacity:1}50%{opacity:.3}}",
    "@keyframes xmasHop{0%,85%,100%{transform:translateY(0)}90%{transform:translateY(-4px)}}",
    "@media (prefers-reduced-motion: reduce){.xmas-tree *{animation:none!important}}",
    /* Auswahlseite */
    ".xmas-tag{position:absolute;right:clamp(16px,3vw,40px);bottom:clamp(16px,3vw,40px);z-index:3;",
    "font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.3em;text-transform:uppercase;",
    "white-space:nowrap;color:#7C2B26;border:1px solid rgba(124,43,38,.45);border-radius:999px;padding:7px 14px;background:rgba(237,227,208,.7)}",
    "@media (max-width:720px){.xmas-banner .container{padding:22px 0}.xmas-banner h3{font-size:19px}",
    ".xmas-tree{width:96px;right:16px;top:58px;bottom:auto}"+
    ".xmas-tag{font-size:9px;letter-spacing:.2em;padding:6px 10px;white-space:nowrap;bottom:22px;right:16px}}"
  ].join("");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var BAUM_SVG =
    '<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><radialGradient id="xg" cx="50%" cy="50%" r="50%">' +
    '<stop offset="0" stop-color="#F6D27A" stop-opacity=".9"/><stop offset="1" stop-color="#F6D27A" stop-opacity="0"/></radialGradient></defs>' +
    '<ellipse cx="100" cy="246" rx="78" ry="8" fill="#2A1A10" opacity=".14"/>' +
    '<g class="wiegen">' +
    '<rect x="90" y="214" width="20" height="28" rx="3" fill="#6B4527"/>' +
    '<path d="M100 40 L150 110 L128 110 L170 165 L140 165 L182 222 L18 222 L60 165 L30 165 L72 110 L50 110 Z" fill="#2F5A3C"/>' +
    '<path d="M100 40 L150 110 L128 110 L170 165 L140 165 L182 222 L100 222 Z" fill="#284D33"/>' +
    '<path d="M62 104 Q100 124 140 100" stroke="#D6A93A" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M46 160 Q100 186 156 156" stroke="#D6A93A" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<path d="M36 214 Q100 238 170 208" stroke="#D6A93A" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
    '<g>' +
    '<circle class="kugel" cx="84" cy="88" r="5" fill="#C8372D"/>' +
    '<circle class="kugel" cx="118" cy="98" r="4.5" fill="#F2C879"/>' +
    '<circle class="kugel" cx="70" cy="140" r="5.5" fill="#F2C879"/>' +
    '<circle class="kugel" cx="104" cy="148" r="5" fill="#C8372D"/>' +
    '<circle class="kugel" cx="136" cy="134" r="5" fill="#F4EFE6"/>' +
    '<circle class="kugel" cx="58" cy="194" r="5.5" fill="#C8372D"/>' +
    '<circle class="kugel" cx="94" cy="200" r="5" fill="#F4EFE6"/>' +
    '<circle class="kugel" cx="128" cy="192" r="6" fill="#F2C879"/>' +
    '<circle class="kugel" cx="158" cy="206" r="5" fill="#C8372D"/>' +
    '</g>' +
    '<circle class="glanz" cx="100" cy="24" r="26" fill="url(#xg)"/>' +
    '<path class="stern" d="M100 6 L105.3 17.6 L118 19 L108.4 27.5 L111.2 40 L100 33.6 L88.8 40 L91.6 27.5 L82 19 L94.7 17.6 Z" fill="#F2C879" stroke="#D6A93A" stroke-width="1.5" stroke-linejoin="round"/>' +
    '</g>' +
    '<g class="geschenk"><rect x="34" y="226" width="30" height="24" rx="2" fill="#7B2A28"/>' +
    '<rect x="46" y="226" width="6" height="24" fill="#D6A93A"/><rect x="34" y="234" width="30" height="5" fill="#D6A93A"/></g>' +
    '<g class="geschenk" style="animation-delay:1.3s"><rect x="138" y="232" width="24" height="18" rx="2" fill="#D6A93A"/>' +
    '<rect x="147" y="232" width="5" height="18" fill="#7B2A28"/><rect x="138" y="238" width="24" height="4" fill="#7B2A28"/></g>' +
    '</svg>';

  /* Schlitten mit Rentieren, fliegt nach rechts */
  function rentier(x, nase) {
    return '<g transform="translate(' + x + ',0)">' +
      '<rect class="bein-a" x="6" y="62" width="4" height="22" rx="2" fill="#5B3A22"/>' +
      '<rect class="bein-b" x="14" y="62" width="4" height="22" rx="2" fill="#4A2F1B"/>' +
      '<rect class="bein-b" x="36" y="62" width="4" height="22" rx="2" fill="#5B3A22"/>' +
      '<rect class="bein-a" x="44" y="62" width="4" height="22" rx="2" fill="#4A2F1B"/>' +
      '<ellipse cx="28" cy="58" rx="27" ry="12" fill="#8A5A35"/>' +
      '<ellipse cx="26" cy="63" rx="16" ry="5" fill="#C9A27A" opacity=".7"/>' +
      '<path d="M2 54 Q-6 50 -4 44" stroke="#8A5A35" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<path d="M46 52 L58 30 L66 34 L56 56 Z" fill="#8A5A35"/>' +
      '<ellipse cx="68" cy="30" rx="12" ry="7" fill="#8A5A35"/>' +
      '<circle cx="66" cy="27" r="1.8" fill="#1C120A"/>' +
      '<path d="M60 24 L56 16" stroke="#8A5A35" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M62 22 L58 6 M58 12 L50 8 M59 9 L64 2" stroke="#6B4527" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
      '<path d="M66 22 L68 8 M67 14 L74 10 M68 9 L66 2" stroke="#6B4527" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
      (nase
        ? '<circle class="nase" cx="80" cy="31" r="9" fill="#FF4D3D" opacity=".35"/><circle cx="80" cy="31" r="4.5" fill="#E8352B"/>'
        : '<circle cx="80" cy="31" r="3.5" fill="#2A1A10"/>') +
      '<path d="M48 54 L58 40" stroke="#C8372D" stroke-width="3"/>' +
      '<circle cx="50" cy="52" r="2.6" fill="#E8C77A"/>' +
      '</g>';
  }
  var SCHLITTEN_SVG =
    '<svg viewBox="-20 -10 500 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<g class="funken"><circle cx="0" cy="88" r="2.5" fill="#F6D27A"/><circle cx="10" cy="80" r="2" fill="#fff"/><circle cx="4" cy="96" r="1.8" fill="#F6D27A"/></g>' +
    /* Zügel */
    '<path d="M118 62 Q170 72 214 54 Q270 66 314 52 Q370 64 410 50" stroke="#E8C77A" stroke-width="1.6" fill="none"/>' +
    /* Sack */
    '<path d="M18 52 Q14 22 40 20 Q60 22 56 52 Z" fill="#7A5634"/>' +
    '<path d="M30 22 Q38 14 46 22" stroke="#5B3A22" stroke-width="3" fill="none"/>' +
    '<rect x="26" y="30" width="12" height="10" fill="#C8372D"/><rect x="31" y="30" width="2" height="10" fill="#E8C77A"/>' +
    /* Weihnachtsmann */
    '<rect x="62" y="30" width="30" height="28" rx="10" fill="#C8372D"/>' +
    '<rect x="62" y="44" width="30" height="5" fill="#2A1A10"/><rect x="74" y="44" width="6" height="5" fill="#E8C77A"/>' +
    '<circle cx="78" cy="22" r="10" fill="#F2C9A8"/>' +
    '<path d="M68 22 Q78 42 90 22 Q84 30 78 30 Q72 30 68 22 Z" fill="#fff"/>' +
    '<circle cx="82" cy="20" r="1.4" fill="#2A1A10"/>' +
    '<path d="M67 15 Q74 0 92 8 L88 14 Z" fill="#C8372D"/>' +
    '<rect x="66" y="12" width="24" height="5" rx="2.5" fill="#fff"/>' +
    '<circle cx="93" cy="8" r="3.5" fill="#fff"/>' +
    '<path d="M90 36 Q104 42 116 58" stroke="#C8372D" stroke-width="6" stroke-linecap="round" fill="none"/>' +
    /* Schlitten */
    '<path d="M8 50 L120 50 Q132 50 130 64 Q126 78 108 78 L22 78 Q10 78 8 64 Z" fill="#9E2A22"/>' +
    '<path d="M8 50 L120 50" stroke="#E8C77A" stroke-width="3"/>' +
    '<path d="M30 60 Q60 70 100 60" stroke="#E8C77A" stroke-width="2" fill="none"/>' +
    '<path d="M24 78 L22 90 M100 78 L102 90" stroke="#D6A93A" stroke-width="3"/>' +
    '<path d="M0 90 L120 90 Q140 90 142 76" stroke="#D6A93A" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    /* Rentiere */
    rentier(160, false) + rentier(260, false) + rentier(360, true) +
    '</svg>';

  var DRIFT_SVG =
    '<svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M0 34 Q60 14 130 30 T270 28 T410 32 T560 24 T700 34 T850 26 T1000 32 T1120 24 T1200 30 L1200 60 L0 60 Z" fill="#F6F8FB"/>' +
    '<path d="M0 34 Q60 14 130 30 T270 28 T410 32 T560 24 T700 34 T850 26 T1000 32 T1120 24 T1200 30" stroke="#fff" stroke-width="3" fill="none" opacity=".9"/>' +
    '</svg>';

  /* Schnee in einem Bereich */
  function schnee(box, farbe, anzahl, vorElement) {
    var c = document.createElement("canvas");
    c.className = "xmas-snow";
    c.setAttribute("aria-hidden", "true");
    if (vorElement) box.insertBefore(c, vorElement); else box.appendChild(c);
    var ctx = c.getContext("2d");
    var w, h, flocken = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function groesse() {
      w = box.clientWidth; h = box.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function neu(oben) {
      return {
        x: Math.random() * w,
        y: oben ? -10 : Math.random() * h,
        r: 1.2 + Math.random() * 3,
        v: 0.35 + Math.random() * 0.9,
        s: Math.random() * Math.PI * 2,
        a: 0.45 + Math.random() * 0.5
      };
    }
    groesse();
    var n = Math.round(anzahl * Math.min(1, w / 1100) + 20);
    for (var i = 0; i < n; i++) flocken.push(neu(false));

    function zeichnen() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < flocken.length; i++) {
        var f = flocken[i];
        ctx.globalAlpha = f.a;
        ctx.fillStyle = farbe;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function schritt() {
      for (var i = 0; i < flocken.length; i++) {
        var f = flocken[i];
        f.s += 0.01;
        f.y += f.v;
        f.x += Math.sin(f.s) * 0.4;
        if (f.y > h + 10) flocken[i] = neu(true);
      }
      zeichnen();
      if (sichtbar) requestAnimationFrame(schritt); else laeuft = false;
    }

    var sichtbar = true, laeuft = false;
    function start() { if (!laeuft && !ruhig) { laeuft = true; requestAnimationFrame(schritt); } }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        sichtbar = e[0].isIntersecting;
        if (sichtbar) start();
      }).observe(box);
    }
    window.addEventListener("resize", function () { groesse(); zeichnen(); });
    if (ruhig) zeichnen(); else start();
  }

  function los() {
    /* Restaurantseite */
    var hero = document.querySelector(".hero");
    if (hero) {
      schnee(hero, "#ffffff", 170, hero.querySelector(".hero-inner"));

      var himmel = document.createElement("div");
      himmel.className = "xmas-sky";
      himmel.setAttribute("aria-hidden", "true");
      himmel.innerHTML = '<div class="xmas-sleigh"><div class="bob">' + SCHLITTEN_SVG + '</div></div>';
      hero.insertBefore(himmel, hero.querySelector(".hero-inner"));

      var drift = document.createElement("div");
      drift.className = "xmas-drift";
      drift.innerHTML = DRIFT_SVG;
      hero.appendChild(drift);

      var banner = document.createElement("section");
      banner.className = "xmas-banner";
      banner.setAttribute("aria-label", "Weihnachtsfeiern");
      banner.innerHTML =
        '<div class="container">' +
          '<div><span class="xmas-kicker">Frohe Weihnachten</span>' +
          '<h3></h3><p></p></div>' +
          '<a class="btn"></a>' +
        '</div>';
      banner.querySelector("h3").textContent = BANNER_TITEL;
      banner.querySelector("p").textContent = BANNER_TEXT;
      var knopf = banner.querySelector("a");
      knopf.textContent = BANNER_KNOPF;
      knopf.href = BANNER_LINK;
      hero.parentNode.insertBefore(banner, hero.nextSibling);
    }

    /* Auswahlseite: weißer Schnee auf der dunklen Bar-Hälfte */
    var nacht = document.querySelector(".half.night");
    if (nacht) schnee(nacht, "#ffffff", 70, null);

    /* Auswahlseite, Mönchberger-Hälfte: goldene Flocken, Baum, Schild */
    var tag = document.querySelector(".half.day");
    if (tag) {
      schnee(tag, "#B08B57", 60, null);
      var baum = document.createElement("div");
      baum.className = "xmas-tree";
      baum.innerHTML = BAUM_SVG;
      tag.appendChild(baum);
      var schild = document.createElement("span");
      schild.className = "xmas-tag";
      schild.textContent = "Frohe Weihnachten";
      tag.appendChild(schild);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", los);
  else los();
})();
