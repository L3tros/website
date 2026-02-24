document.addEventListener("DOMContentLoaded", () => {
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
    const domain = "zum-moenchberger.de"; // falls anders, hier ändern
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
    "E Mail anzeigen",
    "E Mail ausblenden"
  );
});