# 🎵 Retro Media Player Card

Vlastní Lovelace karta pro Home Assistant v **retro skin vzhledu MP3 přehrávačů
z přelomu tisíciletí** – s vizualizací, ekvalizérem, rádii, oblíbenými, tématy
vzhledu a exportem/importem nastavení.

![Retro Media Player Card](docs/images/hero.png)

---

## ✨ Co karta umí

| Funkce | Popis |
|---|---|
| 🎛 **Retro vzhled** | Titulek, LCD displej s časem, běžící text (marquee), obal alba, klasická tlačítka |
| 📊 **Vizualizace** | 5 režimů: spektrum, zrcadlené spektrum, osciloskop, bodová matice, VU metry |
| 🎨 **8 témat + HA téma** | Classic Skin, Modern Dark, Neon Nights, Vaporwave, Terminal Green, Amber CRT, Light Minimal, Follow HA Theme |
| ▶️ **Plné ovládání** | Play/pauza, stop, další/předchozí, shuffle, repeat, zapnutí/vypnutí, hlasitost, mute, přetáčení |
| 🔊 **Výběr přehrávače** | Rozbalovací seznam všech `media_player` entit – hudbu pustíš kamkoliv |
| 📻 **Radio Browser** | Vlastní panel: nejdřív seznam zemí, pak stanice; hledání země i stanice, řazení podle popularity |
| 🎵 **Vlastní stanice** | 10 předvolených stanic + libovolná stream URL |
| ⭐ **Oblíbené** | Ulož si co právě hraje, nebo cokoliv z prohlížeče médií; řazení, mazání |
| 📁 **Prohlížeč médií** | Prochází vše, co HA nabízí – Spotify, Music Assistant, lokální média, TTS; zkratky se generují z reálné nabídky přehrávače |
| 🎚 **Ekvalizér** | 10pásmový EQ + preamp a 9 předvoleb; přepínání `sound_mode` přehrávače |
| ⚙️ **Nastavení v kartě** | Vše se dá měnit za běhu, bez editace YAML |
| 💾 **Export / Import** | Záloha nastavení, oblíbených a stanic do JSON souboru nebo schránky |
| 🧩 **Vizuální editor** | Karta jde přidat a nakonfigurovat klikáním v UI Lovelace |

---

## 📦 Instalace přes HACS (custom repository)

1. V Home Assistantu otevři **HACS**.
2. Vpravo nahoře ⋮ → **Custom repositories**.
3. Vlož URL tohoto repozitáře:
   ```
   https://github.com/joshuaaaaa/HA_player
   ```
4. Jako kategorii vyber **Dashboard** (dříve „Lovelace“ / „Plugin“) a klikni **Add**.
5. Najdi **Retro Media Player Card** v seznamu, dej **Download**.
6. **Restartuj / obnov prohlížeč** (Ctrl+F5), aby se načetl nový JS.

HACS zdroj přidá do Lovelace automaticky. Pokud používáš YAML režim dashboardu,
přidej zdroj ručně:

```yaml
# configuration.yaml
lovelace:
  mode: yaml
  resources:
    - url: /hacsfiles/HA_player/ha-retro-player-card.js
      type: module
```

### Ruční instalace (bez HACS)

1. Zkopíruj `dist/ha-retro-player-card.js` do `config/www/ha-retro-player-card.js`.
2. **Nastavení → Dashboardy → ⋮ → Zdroje → Přidat zdroj**
   - URL: `/local/ha-retro-player-card.js`
   - Typ: `JavaScript Module`

---

## 🚀 Použití

Nejjednodušší konfigurace:

```yaml
type: custom:ha-retro-player-card
entity: media_player.obyvak
```

Plná konfigurace:

```yaml
type: custom:ha-retro-player-card
entity: media_player.obyvak
title: Obývák
theme: classic
visualizer: bars
show_visualizer: true
show_artwork: true
show_eq: true
show_playlist: true
show_browser: true
show_radio: true
show_player_select: true
compact: false
storage_key: obyvak
# omezí seznam přehrávačů v rozbalovacím menu
entities:
  - media_player.obyvak
  - media_player.kuchyne
  - media_player.spotify
# vlastní rádia (přepíšou výchozí seznam)
stations:
  - name: Radio Paradise
    url: https://stream.radioparadise.com/mp3-192
    genre: Eclectic
  - name: SomaFM Groove Salad
    url: https://ice1.somafm.com/groovesalad-128-mp3
    genre: Downtempo
```

### Možnosti konfigurace

| Klíč | Typ | Výchozí | Popis |
|---|---|---|---|
| `entity` | string | – | **Povinné.** Výchozí `media_player` entita |
| `title` | string | `Retro Player` | Text v titulkové liště |
| `theme` | string | `classic` | `classic`, `modern`, `neon`, `vapor`, `terminal`, `amber`, `light`, `ha` |
| `visualizer` | string | `bars` | `bars`, `mirror`, `wave`, `dots`, `vu`, `off` |
| `show_visualizer` | bool | `true` | Zobrazit vizualizaci |
| `show_artwork` | bool | `true` | Zobrazit obal alba |
| `show_eq` | bool | `true` | Tlačítko ekvalizéru |
| `show_playlist` | bool | `true` | Tlačítko playlistu / oblíbených |
| `show_browser` | bool | `true` | Tlačítko prohlížeče médií |
| `show_radio` | bool | `true` | Tlačítko panelu Radio Browser |
| `show_player_select` | bool | `true` | Rozbalovací výběr přehrávače |
| `compact` | bool | `false` | Kompaktní (nižší) rozvržení |
| `entities` | list | všechny | Omezení nabídky přehrávačů |
| `stations` | list | 10 stanic | Výchozí seznam rádií |
| `favorites` | list | `[]` | Předvyplněné oblíbené |
| `storage_key` | string | podle entity | Klíč pro uložení nastavení v prohlížeči |

> **Pozor:** hodnoty z YAML jsou jen *výchozí*. Jakmile něco změníš v nastavení
> přímo v kartě (ozubené kolečko), uloží se to do prohlížeče a má přednost.
> Tlačítko **Reset to defaults** v nastavení se vrátí zpět k YAML konfiguraci.
> Chceš-li, aby dvě karty sdílely stejná nastavení, dej jim stejný `storage_key`.

---

## 📻 Radio Browser

Tlačítko 📻 otevře vlastní prohlížeč internetových rádií. Protože stanic jsou
desetitisíce, načítá se to postupně:

1. **Seznam zemí** s počtem stanic — psaním do pole se seznam okamžitě filtruje
   (funguje i kód země, např. `CZ`).
2. **Klik na zemi** → její stanice seřazené podle popularity, po 150; tlačítkem
   *Load more* se dotáhnou další.
3. **Hledání stanice** — v seznamu stanic pole hledá podle názvu přímo v API,
   ve vybrané zemi. Tlačítko *Search everywhere* hledá napříč všemi zeměmi.
4. Klik na stanici ji pustí, ⭐ ji uloží mezi oblíbené.

![Radio Browser panel](docs/images/panel-radio.png)

**Karta se ptá Radio Browser API přímo z prohlížeče**, ne přes Home Assistant.
Díky tomu rádia fungují i tehdy, když na HA server integrace `radio_browser`
hlásí *„Error occurred while communicating with Radio Browser"*. Zkouší se
postupně několik zrcadel (`de1`, `de2`, `nl1`, `at1`, `fi1`), první funkční si
karta zapamatuje. Integraci `radio_browser` k tomuhle panelu **nepotřebuješ**.

---

## 🎧 Propojení se Spotify, YouTube a rádii

Karta záměrně **nemá vlastní účty ani API klíče** – používá přehrávače a zdroje médií,
které už v Home Assistantu máš. Tlačítko 📁 (prohlížeč médií) automaticky ukáže vše dostupné:

| Služba | Co nainstalovat | Jak to funguje |
|---|---|---|
| **Rádia** | [Radio Browser](https://www.home-assistant.io/integrations/radio_browser/) (oficiální integrace) | Prohledávání tisíců stanic podle země/žánru, přehrání na vybrané entitě |
| **Spotify** | [Spotify integrace](https://www.home-assistant.io/integrations/spotify/) | V prohlížeči se objeví tvoje playlisty a alba; přehraje se na Spotify Connect zařízení |
| **YouTube / SoundCloud** | [Media Extractor](https://www.home-assistant.io/integrations/media_extractor/) nebo [Music Assistant](https://music-assistant.io/) | Odkaz na YouTube je **webová stránka, ne stream** — sám o sobě se nepřehraje. Když máš Media Extractor, karta ho pro takové odkazy použije automaticky |
| **Lokální hudba** | Vestavěné `media_source` | Soubory z `config/media` |
| **Libovolný stream** | – | Pole „Paste a stream / media URL“ v prohlížeči médií |

Zkratky nad seznamem se generují z toho, co tvůj přehrávač opravdu nabízí —
nezobrazí se tedy nic, co nemáš nainstalované. Vše nalezené jde jedním
kliknutím ⭐ uložit do oblíbených.

| Prohlížeč médií | Rádia a oblíbené |
|---|---|
| ![Prohlížeč médií](docs/images/panel-browser.png) | ![Playlist s rádii](docs/images/panel-playlist.png) |

| Ekvalizér | Nastavení |
|---|---|
| ![Ekvalizér](docs/images/panel-eq.png) | ![Nastavení](docs/images/panel-settings.png) |

---

## 🎨 Témata

| Téma | Popis |
|---|---|
| `classic` | Šedý retro skin se zeleným LCD |
| `modern` | Tmavé, čisté, modrý akcent |
| `neon` | Černá + magenta/cyan záře |
| `vapor` | Fialovo-růžová vaporwave |
| `terminal` | Černý terminál se zeleným textem |
| `amber` | Jantarový CRT monitor |
| `light` | Světlé minimalistické |
| `ha` | Přebírá barvy tvého Home Assistant tématu |

Téma se přepíná v nastavení karty (⚙️) nebo klíčem `theme` v YAML.

![Všech osm témat](docs/images/themes.png)

---

## 💾 Export a import

V panelu nastavení (⚙️ → **Backup & restore**):

- **Export file** – stáhne `retro-player-card-*.json` se všemi nastaveními, oblíbenými, stanicemi a EQ
- **Copy to clipboard** – to samé do schránky
- **Import file** / **Import from text** – obnovení ze zálohy
- **Reset to defaults** – smaže uložená nastavení a vrátí YAML výchozí hodnoty

Formát zálohy:

```json
{
  "app": "ha-retro-player-card",
  "version": 1,
  "exported": "2026-08-02T10:00:00.000Z",
  "settings": { "theme": "neon", "favorites": [], "stations": [], "eq": [] }
}
```

---

## ❓ Časté dotazy

**Reaguje vizualizace na skutečnou hudbu?**
Ne – a ani nemůže. Zvuk přehrává reproduktor/zařízení, ne prohlížeč, takže webová
stránka k audio streamu nemá přístup. Vizualizace je proto syntetická: reaguje na stav
přehrávání a na nastavení ekvalizéru, při pauze plynule dozní. Když neběží přehrávání,
kreslení se úplně zastaví (nulová zátěž CPU).

**Mění ekvalizér opravdu zvuk?**
Home Assistant nemá univerzální EQ API, takže posuvníky tvarují vizualizaci a ukládají se
s nastavením karty. Pokud tvůj přehrávač hlásí `sound_mode_list`, zobrazí se pod EQ
tlačítka režimů zvuku – ta zařízení skutečně přepínají.

**Prohlížeč médií hlásí „Error occurred while communicating with Radio Browser".**
Tuhle chybu vrací Home Assistant — jeho integrace `radio_browser` se nedovolá na
službu. Použij panel 📻, ten jde na API přímo z prohlížeče a na HA serveru
nezávisí.

**Odkaz na YouTube se nepřehraje.**
YouTube odkaz je webová stránka, ne audio stream, takže ho `media_player.play_media`
předá zařízení a nic se nestane. Nainstaluj **Media Extractor** — karta pak takové
odkazy pošle přes `media_extractor.play_media`, který je nejdřív rozbalí na
skutečný stream. Alternativa je přehrávač z **Music Assistant**.

**Proč jsou některá tlačítka šedá?**
Karta čte `supported_features` entity. Co přehrávač neumí, se vypne.

**Kde jsou uložená nastavení?**
V `localStorage` prohlížeče pod klíčem `ha-retro-player-card:<storage_key>`. Na jiném
zařízení použij export/import.

---

## 🛠 Vývoj

Karta je jeden soubor bez build kroku – `dist/ha-retro-player-card.js` je zároveň zdroj.
Stačí ho upravit a v prohlížeči udělat hard refresh.

---

## 📄 Licence

MIT – viz [LICENSE](LICENSE).

Veškerá grafika karty je vykreslená čistě přes CSS a canvas. Karta neobsahuje
žádné cizí skiny, obrázky ani jiná díla třetích stran a není spojená s žádným
existujícím produktem ani značkou.
