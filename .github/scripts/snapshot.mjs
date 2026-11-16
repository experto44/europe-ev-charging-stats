// Pulls the current per-country table from geocharge.net/data/ and stores it as a
// dated snapshot. Prints the snapshot date to $GITHUB_OUTPUT, or nothing if unchanged.
import fs from 'node:fs';

const BASE = 'https://geocharge.net/data/europe-ev-charging-by-country';
const get = async (ext) => {
  const r = await fetch(`${BASE}.${ext}`, { headers: { 'user-agent': 'europe-ev-charging-stats snapshot' } });
  if (!r.ok) throw new Error(`${ext}: HTTP ${r.status}`);
  return r.text();
};
const [csv, json] = await Promise.all([get('csv'), get('json')]);
const rows = JSON.parse(json);
const date = rows.map((r) => r.as_of).sort().pop();
const out = (k, v) => process.env.GITHUB_OUTPUT && fs.appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);

// Sanity: a broken build upstream must not become a DOI version.
const sum = (rs, k) => rs.reduce((a, r) => a + (r[k] || 0), 0);
const prev = JSON.parse(fs.readFileSync('europe-ev-charging-by-country.json', 'utf8'));
if (rows.length < prev.length - 2) throw new Error(`only ${rows.length} countries (was ${prev.length})`);
if (sum(rows, 'stations') < 0.85 * sum(prev, 'stations')) throw new Error('station total fell by more than 15%');
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`bad as_of ${date}`);
if (fs.existsSync(date)) { console.log(`snapshot ${date} already stored`); process.exit(0); }

for (const dir of ['.', date]) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/europe-ev-charging-by-country.csv`, csv);
  fs.writeFileSync(`${dir}/europe-ev-charging-by-country.json`, json);
}

const n = (v) => v.toLocaleString('en-US');
const d = new Date(`${date}T00:00:00Z`);
const long = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
let readme = fs.readFileSync('README.md', 'utf8');
readme = readme
  .replace(/^\*\*Snapshot:\*\*.*$/m,
    `**Snapshot:** ${long} · **Countries:** ${rows.length} · **Stations:** ${n(sum(rows, 'stations'))} · **Plugs:** ${n(sum(rows, 'plugs'))} · **Stations with 150 kW or more:** ${n(sum(rows, 'kw_150_plus'))}`)
  .replace(/GeoCharge \(\d{4}\)\. \*Public EV charging stations in Europe, by country\* \(snapshot \d{4}-\d{2}-\d{2}\)/,
    `GeoCharge (${date.slice(0, 4)}). *Public EV charging stations in Europe, by country* (snapshot ${date})`);
fs.writeFileSync('README.md', readme);
console.log(`stored snapshot ${date}: ${rows.length} countries, ${sum(rows, 'stations')} stations`);
out('date', date);
