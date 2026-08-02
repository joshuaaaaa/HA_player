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
| 📻 **Rádio** | Vlastní panel: nejdřív země, pak stanice; hledání podle země i podle jména stanice, dva nezávislé zdroje dat |
| 🎵 **Vlastní stanice** | 10 předvolených stanic + libovolná stream URL |
| 🟢 **Spotify panel** | Vlastní tlačítko: procházení knihovny, hledání, výběr cílového přehrávače, oblíbené |
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
show_spotify: true
audio_only: true
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
| `show_radio` | bool | `true` | Tlačítko panelu Rádio |
| `show_spotify` | bool | `true` | Tlačítko panelu Spotify (skryje se, když Spotify entita neexistuje) |
| `audio_only` | bool | `true` | Skrýt nehudební zdroje (kamery, Frigate, obrázky, TTS) |
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
2. **Klik na zemi** → seznam jejích stanic.
3. **Hledání stanice** — v seznamu stanic filtruje pole podle názvu okamžitě.
   Tlačítko *Search everywhere* hledá podle jména napříč všemi zeměmi.
4. Klik na stanici ji pustí. **Hvězdička ukazuje, jestli už stanici v oblíbených
   máš** — uložená svítí barevně, neuložená je jen slabý obrys. Klikem se
   přepíná oběma směry, takže se dá i odebrat.

![Radio Browser panel](docs/images/panel-radio.png)

### Odkud se stanice berou

Panel má dva zdroje a přepíná mezi nimi sám — v hlavičce je vidět, který zrovna
odpověděl:

1. **Home Assistant** (výchozí) — integrace `radio_browser`. Panel ale záměrně
   **nesahá na kořen** `media-source://radio_browser`. Ten totiž dělá *pět*
   dotazů na Radio Browser API najednou (populární, tagy, jazyky, lokální, země)
   a když selže jediný z nich, celý výpis spadne na
   *„Error occurred while communicating with Radio Browser"*. Panel jde rovnou
   na `media-source://radio_browser/country`, což je **jeden** dotaz — a proto
   funguje i tam, kde kořen padá.
2. **radio-browser.info přímo z prohlížeče** — použije se, když HA cesta selže
   nebo integraci vůbec nemáš. Zkouší zrcadla `de1`, `de2`, `nl1`, `at1`, `fi1`
   a první funkční si zapamatuje.

*Search everywhere* (hledání napříč zeměmi) jde vždy přes API, protože HA
integrace hledání podle jména nenabízí ve všech verzích.

---

## 🟢 Spotify

Tlačítko 🟢 otevře vlastní Spotify panel. Karta **nemá vlastní API klíče ani
přihlašování** — používá `media_player` entity, které už v Home Assistantu máš.

### ⚠️ Důležité: Spotify entita jde procházet jen když zrovna hraje

Tohle je omezení Home Assistantu, ne karty. Integrace Spotify hlásí své
schopnosti takhle:

```python
if product != PREMIUM:                       return 0            # žádné funkce
if not currently_playing or is_restricted:   return SELECT_SOURCE # jen výběr zdroje
return SUPPORT_SPOTIFY                                            # včetně procházení
```

Takže **nečinná Spotify entita procházení vůbec nenabízí** a HA odpoví
*„Player does not support browsing media"*. Karta se s tím vypořádá sama:
vybere entitu, která procházet **umí** — přednostně Spotify (když zrovna hraje),
jinak přehrávač z **Music Assistantu** se Spotify providerem, který knihovnu
zvládne kdykoliv. V hlavičce panelu je vidět `via <entita>`.

Když přes Music Assistant, karta při prvním otevření rovnou skočí do jeho
Spotify větve — i když ji MA schovává o úroveň níž pod složkou *Browse* /
*Providers*. Tlačítkem *Top* se dostaneš na skutečný kořen.

### Dvě různé věci: odkud se čte a kam se hraje

V panelu jsou dva samostatné rozbalovací seznamy a **pletou se snadno**:

| | Co dělá |
|---|---|
| **Browse via** | Jen **odkud se načítá seznam**. Na téhle entitě se nic nepřehrává. Nabízí se jen přehrávače, které umí `browse_media` |
| **Play on** | **Kam se pustí hudba.** Může to být úplně jiný přehrávač — klidně takový, co procházet neumí |

Takže `SPOTIFY list from media_player.kodi_obyvak` v hlavičce znamená pouze
„seznam čtu přes Kodi" — přehrávat se bude tam, co máš v *Play on*.

- **Zkratky knihovny** — nad seznamem je řádek tlačítek generovaný z toho, co
  daná entita v kořeni nabízí: **Playlists**, **Liked Songs**, **Albums**,
  Recently Played… Jedním klikem se dostaneš na uložené playlisty i na oblíbené
  skladby, aktivní zkratka je zvýrazněná
- **Procházení knihovny** s drobečkovou navigací
- **Hledání** — tlačítko *Search* pošle dotaz do Home Assistantu
  (`media_player/search_media`) přes tutéž entitu. Samotná Spotify integrace
  hledání **neimplementuje vůbec**, Music Assistant ano. Když dotaz nic nevrátí,
  karta ho zopakuje s `media_filter_classes` (některé integrace bez toho vrací
  prázdno). Každý dotaz má 15s časový limit a pomalá starší odpověď už nikdy
  nepřepíše novější výsledky
- **Play on** — rozbalovací seznam určuje, kam se hudba pošle. Výchozí je
  samotná Spotify entita
- **Hvězdičky** fungují stejně jako u rádií — barevná = uloženo

![Spotify panel](docs/images/panel-spotify.png)

> **Kam se dá Spotify pustit:** obsah Spotify přehraje jen zařízení, které to
> umí — Spotify Connect reproduktor, samotná Spotify entita, nebo přehrávač
> z **Music Assistant** se Spotify providerem. Poslat `spotify:` URI na obyčejný
> Chromecast nebo Kodi nefunguje a karta to řekne.

V nastavení (⚙️) je sekce **Spotify** se třemi volbami: účet (Spotify entita),
**Browse via** (kterou entitou procházet) a výchozí cílový přehrávač — kdyby
automatika vybrala špatně.

**Nevidíš nic?** Buď nemáš Premium, nebo na Spotify zrovna nic nehraje a zároveň
nemáš Music Assistant. Pusť si v Spotify aplikaci cokoliv a panel začne fungovat,
nebo nainstaluj Music Assistant se Spotify providerem.

### Proč ne napřímo přes Spotify Web API

Šlo by to napsat (OAuth s PKCE, bez klientského tajemství), ale Spotify u
redirect URI **vyžaduje HTTPS** — jedinou výjimkou je `http://127.0.0.1`.
Typické `http://192.168.x.x:8123` tedy Spotify odmítne zaregistrovat a
přihlášení se nedá dokončit. Navíc by Web API dalo hlavně procházení a hledání;
přehrávání přes něj vyžaduje Premium a míří jen na Spotify Connect zařízení,
takže samotné pouštění hudby by stejně zůstalo na Home Assistantu — přesně jak
to dělá tenhle panel.

---

## 🎧 Propojení se Spotify, YouTube a rádii

Karta záměrně **nemá vlastní účty ani API klíče** – používá přehrávače a zdroje médií,
které už v Home Assistantu máš. Tlačítko 📁 (prohlížeč médií) automaticky ukáže vše dostupné:

| Služba | Co nainstalovat | Jak to funguje |
|---|---|---|
| **Rádia** | [Radio Browser](https://www.home-assistant.io/integrations/radio_browser/) (oficiální integrace) | Prohledávání tisíců stanic podle země/žánru, přehrání na vybrané entitě |
| **Spotify** | [Spotify integrace](https://www.home-assistant.io/integrations/spotify/) | Má vlastní panel 🟢 — viz sekce výše |
| **YouTube / SoundCloud** | [Media Extractor](https://www.home-assistant.io/integrations/media_extractor/) nebo [Music Assistant](https://music-assistant.io/) | Odkaz na YouTube je **webová stránka, ne stream** — sám o sobě se nepřehraje. Když máš Media Extractor, karta ho pro takové odkazy použije automaticky |
| **Lokální hudba** | Vestavěné `media_source` | Soubory z `config/media` |
| **Libovolný stream** | – | Pole „Paste a stream / media URL“ v prohlížeči médií |

Zkratky nad seznamem se generují z toho, co tvůj přehrávač opravdu nabízí —
nezobrazí se tedy nic, co nemáš nainstalované. **Nehudební zdroje se skrývají**
(kamery, Frigate, obrázky, text-to-speech), protože je stejně nemá co přehrát;
vypnout to jde přepínačem *Music sources only* v nastavení nebo
`audio_only: false`.

> **Spotify a Music Assistant nemají `media-source://`.** Jejich knihovna je
> dostupná jen na jejich vlastní `media_player` entitě — vyber ji v rozbalovacím
> seznamu vpravo nahoře a prohlížeč ukáže její obsah. Proto
> `media-source://spotify` hlásilo *Unknown media source*.

Vše nalezené jde jedním kliknutím ⭐ uložit do oblíbených.

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

**Nefunguje hlasitost u Spotify.**
Částečně normální. `SUPPORT_SPOTIFY` v Home Assistantu obsahuje `VOLUME_SET`, ale
**`VOLUME_MUTE` ani `VOLUME_STEP` ne** — ztlumení přes Spotify entitu tedy nejde
nikdy. A posuvník hlasitosti je aktivní jen tehdy, když Spotify **zrovna hraje**
na Premium účtu (stejná podmínka jako u procházení). I když aktivní je, Spotify
Web API umí měnit hlasitost jen na některých Connect zařízeních.

Řešení: v seznamu vpravo nahoře přepni na **přehrávač, který zvuk skutečně
vydává** (tvůj Kodi, Zahrada speaker…) a hlasitost ovládej na něm. Karta u
zašedlého ovladače teď po najetí myší napíše, proč je vypnutý.

**Proč jsou některá tlačítka šedá?**
Karta čte `supported_features` entity. Co přehrávač neumí, se vypne.

**Kde jsou uložená nastavení?**
V `localStorage` prohlížeče pod klíčem `ha-retro-player-card:<storage_key>`. Na jiném
zařízení použij export/import.

---

## 🔄 Aktualizace

HACS stažený soubor **neaktualizuje sám**. Po nové verzi:

1. HACS → **Retro Media Player Card** → ⋮ → **Redownload**
2. V prohlížeči tvrdý refresh (**Ctrl+Shift+R**), na mobilu smaž cache

Jestli běží nová verze poznáš v prohlížeči médií (📁) — vlevo nahoře je verze
karty a entita, na které právě prohlížíš. Aktuální je **v1.3.2**.

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
