# ZAMBU – pořizovač záznamů

Mobilní webová aplikace (PWA) pro záznamy v terénu a po hovorech: fotky, poznámka (diktování klávesnicí), zvuk, malé orientační video, měření a rozměry oken, s kým a termín. Čas a GPS se zapíšou samy. Funguje offline, data zůstávají v telefonu, dokud je neodešlete.

Odesílá do soukromého repozitáře Infoc (`inbox/zambu/RRMMDD_HHMMSS/`, jeden commit na dávku) přes GitHub API s klíčem uloženým jen v telefonu. Záloha: ZIP se `zaznamy.json`, `zaznamy.csv` a médii, sdílením.

Kód neobsahuje žádná osobní data ani klíč.

## Nasazení

1. Nahrát soubory do kořene repozitáře `zambu`.
2. Settings → Pages → Deploy from a branch → `main`, složka `/ (root)`.
3. Na iPhonu otevřít `https://zdaravla.github.io/zambu/` v Safari → Sdílet → Přidat na plochu.
4. V aplikaci Odeslat → Spojení s Infoc vložit klíč (fine-grained token jen pro `infoc`, Contents: Read and write, 90 dní).

Při změně aplikace zvýšit `CACHE` v `sw.js`, aby se telefon aktualizoval.

## Soubory

| soubor | účel |
|---|---|
| `index.html` | celá aplikace |
| `sw.js` | offline provoz |
| `manifest.webmanifest`, `ikona-*.png` | instalace na plochu |

Formát dávky `zambu-1` je popsaný v repozitáři Infoc, `inbox/2026-11-10_ZAMBU_rozhrani.md`.
