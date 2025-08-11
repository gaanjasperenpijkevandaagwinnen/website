const fs = require("fs");
const path = require("path");

// YYYY-MM-DD voor Europe Amsterdam met Intl
function yyyyMmDdAmsterdam(date) {
  const fmt = new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(date);
  const y = parts.find(p => p.type === "year").value;
  const m = parts.find(p => p.type === "month").value;
  const d = parts.find(p => p.type === "day").value;
  return `${y}-${m}-${d}`;
}

function getDailyHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function answerFor(date) {
  return getDailyHash(yyyyMmDdAmsterdam(date)) % 2 === 0 ? "Ja" : "Nee";
}

// maak output map
const outDir = path.join("website", "api", "forecast");
fs.mkdirSync(outDir, { recursive: true });

// vandaag in Amsterdam
const now = new Date();
const todayAnswer = answerFor(now);

// morgen in Amsterdam
// neem lokale middernacht als basis en tel 1 dag op
const partsFmt = new Intl.DateTimeFormat("nl-NL", {
  timeZone: "Europe/Amsterdam",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const parts = partsFmt.formatToParts(now);
const y = Number(parts.find(p => p.type === "year").value);
const m = Number(parts.find(p => p.type === "month").value);
const d = Number(parts.find(p => p.type === "day").value);
// UTC datum object op lokale middernacht
const localMidnightUTC = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
const tomorrowDate = new Date(localMidnightUTC.getTime() + 24 * 60 * 60 * 1000);
const tomorrowAnswer = answerFor(tomorrowDate);

// schrijf JSON
fs.writeFileSync(path.join(outDir, "today.json"), JSON.stringify({
  gaanjasperenpijkevandaagwinnen: todayAnswer
}, null, 2));

fs.writeFileSync(path.join(outDir, "tomorrow.json"), JSON.stringify({
  gaanjasperenpijkemorgenwinnen: tomorrowAnswer
}, null, 2));

console.log("Forecasts generated", { todayAnswer, tomorrowAnswer });
