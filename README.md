# Public EV charging stations in Europe, by country

How many public charging stations each of 42 countries has (41 in Europe, plus Georgia), how many of them are DC fast chargers, how they split by power, which connectors they offer, and which networks run the most fast chargers.

The figures come from the catalogue behind [GeoCharge](https://geocharge.net/), a free EV charger map for Android and iPhone. New snapshots are added over time; the country pages on geocharge.net update every night.

**Snapshot:** 16 November 2026 · **Countries:** 42 · **Stations:** 411,903 · **Plugs:** 1,324,024 · **Stations with 150 kW or more:** 40,192

## Files

| File | What it is |
|---|---|
| `europe-ev-charging-by-country.csv` | one row per country, sorted by number of stations |
| `europe-ev-charging-by-country.json` | the same rows as JSON |
| `YYYY-MM-DD/` | earlier snapshots, kept unchanged |

## Columns

| Column | Meaning |
|---|---|
| `cc`, `iso` | ISO 3166-1 alpha-2 country code (lower and upper case) |
| `country` | country name in English |
| `as_of` | date of the snapshot |
| `stations` | public charging locations. A car park with ten plugs counts once |
| `plugs` | charging points (connectors that can be used at the same time) at those stations, as reported by the source |
| `dc_stations`, `ac_stations` | stations with at least one DC fast charger, and the rest |
| `dc_share_pct` | `dc_stations / stations`, in percent |
| `kw_150_plus`, `kw_50_149`, `kw_22_49`, `kw_under_22` | stations by the highest power one car can draw there |
| `kw_unknown` | stations whose power is not reported, or is reported above 400 kW (see below) |
| `stations_with_type2`, `stations_with_ccs2`, `stations_with_chademo` | stations offering at least one connector of that type |
| `top_dc_networks` | the five networks with the most DC stations in the country, with their station count |
| `page` | the country's page on geocharge.net, with the same figures plus cities and all networks |

## Method

- **Sources.** National registers and access points (for example Norway's and Sweden's NOBIL, Germany's Federal Network Agency, Spain's Ministry for the Ecological Transition, France's IRVE consolidation, Poland's national register, Türkiye's EPDK register), the United Kingdom's open data under the Public Charge Point Regulations, the roaming platform Hubject, operators' own open feeds, and Open Charge Map where national registers are incomplete.
- **Gap filling.** Where a national register is incomplete, an Open Charge Map entry is added only if no register station lies within 300 m of it.
- **Power.** Some feeds report the output of a whole charging cabinet rather than what one car can draw. Values above 400 kW are therefore counted as unknown.
- **Coverage differs.** Registers are complete in some countries and partial in others, so small differences between countries should be read with care. The figures describe what is published, not every charger that exists.

## Licence

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Use it for anything, including commercially; credit **GeoCharge (geocharge.net)** with a link.

Suggested citation:

> GeoCharge (2026). *Public EV charging stations in Europe, by country* (snapshot 2026-11-16). https://geocharge.net/

## Contact

geocharge.app@gmail.com · per-country pages at [geocharge.net](https://geocharge.net/)
