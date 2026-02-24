/* script.js */
document.addEventListener("DOMContentLoaded", () => {

  // Burger Menü
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      navToggle.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.classList.remove("open");
      });
    });
  }

  // Telefon und Mail Toggle
  const showToggle = (btn, wrap, link, makeValueFn, labelShow, labelHide) => {
    if (!btn || !wrap || !link) return;
    let visible = false;

    btn.addEventListener("click", () => {
      if (!visible) {
        const v = makeValueFn();
        link.href = v.href;
        link.textContent = v.text;
        wrap.style.display = "block";
        btn.textContent = labelHide;
        visible = true;
      } else {
        wrap.style.display = "none";
        btn.textContent = labelShow;
        visible = false;
      }
    });
  };

  const makePhone = () => {
    const pretty = "07032 73552";
    const dial = "+49703273552";
    return { href: "tel:" + dial, text: pretty };
  };

  const makeMail = () => {
    const user = "info";
    const domain = "zum-moenchberger.de";
    const mail = user + "@" + domain;
    return { href: "mailto:" + mail, text: mail };
  };

  showToggle(
    document.getElementById("showPhoneBtn"),
    document.getElementById("phoneWrap"),
    document.getElementById("phoneLink"),
    makePhone,
    "Telefon anzeigen",
    "Telefon ausblenden"
  );

  showToggle(
    document.getElementById("showMailBtn"),
    document.getElementById("mailWrap"),
    document.getElementById("mailLink"),
    makeMail,
    "Mail anzeigen",
    "Mail ausblenden"
  );

  // Reveal Animation
  const items = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(el => obs.observe(el));
  } else {
    items.forEach(el => el.classList.add("in"));
  }

  // Header erst ab #restaurant anzeigen (nur Startseite)
if (!document.body.classList.contains("is-home")) return;

const header = document.getElementById("siteHeader");
const trigger = document.getElementById("restaurant");

if (!header || !trigger) return;

// Startzustand auf Home immer versteckt
// Header erst ab #restaurant anzeigen (nur Startseite)
if (document.body.classList.contains("is-home")) {

  const header = document.getElementById("siteHeader");
  const trigger = document.getElementById("restaurant");
  if (!header || !trigger) return;

  const triggerTop = trigger.offsetTop;

  const onScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY >= triggerTop - 80) {
      header.style.transform = "translateY(0)";
    } else {
      header.style.transform = "translateY(-110%)";
    }
  };

  // Startzustand prüfen
  onScroll();

  window.addEventListener("scroll", onScroll);
}
});