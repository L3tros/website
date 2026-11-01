// Fragt die Öffnungszeiten beim Google-Unternehmensprofil ab (Places API New)
// und schreibt sie nach oeffnungszeiten.json. Zwei Orte: Mönchberger und Déjà Vu.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

// Prüfzeiten in deutscher Zeit, immer kurz vor dem Aufmachen.
// 0 = Sonntag, 1 = Montag ... 6 = Samstag
const ORTE = {
  moench: {
    name: "Zum Mönchberger",
    placeId: process.env.GOOGLE_PLACE_ID,
    pruefzeiten: {
      0: ["09:00", "10:45", "16:15"],
      1: ["09:00"],
      2: ["09:00", "16:45"],
      3: ["09:00"],
      4: ["09:00", "16:45"],
      5: ["09:00", "16:45"],
      6: ["09:00", "15:45"],
    },
  },
  deja: {
    name: "Déjà Vu",
    placeId: process.env.GOOGLE_PLACE_ID_DEJA,
    pruefzeiten: {
      0: ["09:00"],
      1: ["09:00"],
      2: ["09:00"],
      3: ["09:00", "19:45"],
      4: ["09:00", "19:45"],
      5: ["09:00", "19:45"],
      6: ["09:00", "19:45"],
    },
  },
};

const DATEI = "oeffnungszeiten.json";
const key = process.env.GOOGLE_PLACES_KEY;
const sofort = process.env.SOFORT === "1";

if (!key) {
  console.log("GOOGLE_PLACES_KEY fehlt noch. Nichts zu tun.");
  process.exit(0);
}

// Aktuelle Zeit in Deutschland
const teile = Object.fromEntries(
  new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin", weekday: "short", year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date()).map((p) => [p.type, p.value])
);
const wochentag = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].indexOf(teile.weekday.replace(".", ""));
const heute = `${teile.year}-${teile.month}-${teile.day}`;
const jetzt = `${teile.hour}:${teile.minute}`;

let daten = { orte: {} };
if (existsSync(DATEI)) {
  try { daten = JSON.parse(readFileSync(DATEI, "utf8")); } catch { daten = { orte: {} }; }
}
if (!daten.orte) daten = { orte: {} };

let geaendert = false;
let fehler = false;

for (const [id, ort] of Object.entries(ORTE)) {
  if (!ort.placeId) { console.log(`${ort.name}: keine Place ID hinterlegt, übersprungen.`); continue; }

  const faellig = (ort.pruefzeiten[wochentag] || []).filter((z) => z <= jetzt).pop();
  const alt = daten.orte[id];
  const schonGeprueft = alt && alt.pruefung === `${heute} ${faellig}`;
  if (!sofort && (!faellig || schonGeprueft)) {
    console.log(`${ort.name}: jetzt ${heute} ${jetzt}, keine Prüfung fällig.`);
    continue;
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(ort.placeId)}`, {
    headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "currentOpeningHours" },
  });
  if (!res.ok) {
    console.error(`${ort.name}: Google antwortet mit ${res.status}: ${await res.text()}`);
    fehler = true;
    continue;
  }
  const aktuell = (await res.json()).currentOpeningHours || {};
  daten.orte[id] = {
    name: ort.name,
    stand: new Date().toISOString(),
    pruefung: `${heute} ${faellig || jetzt}`,
    perioden: aktuell.periods || [],
    sondertage: aktuell.specialDays || [],
    text: aktuell.weekdayDescriptions || [],
  };
  geaendert = true;
  console.log(`${ort.name}: gespeichert, ${daten.orte[id].perioden.length} Zeiträume.`);
}

if (geaendert) writeFileSync(DATEI, JSON.stringify(daten, null, 2) + "\n");
if (fehler) process.exit(1);
