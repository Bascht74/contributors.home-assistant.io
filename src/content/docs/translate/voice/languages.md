---
title: Supported languages
description: The languages Assist understands with the built-in conversation agent, their leaders, and how to add a new language.
order: 4
---

The [intents repository](https://github.com/OHF-Voice/intents) lists 66 languages. How far each one is differs a lot: some cover nearly every intent, others have just started. The [progress overview](https://ohf-voice.github.io/intents/) shows the score of each language, per intent.

## Where the list comes from

[`languages.yaml`](https://github.com/OHF-Voice/intents/blob/main/languages.yaml) in the intents repository is the source. For every language, it has:

- `nativeName`: the name of the language, in that language.
- `isRTL`: `true` for languages written right to left.
- `leaders`: the GitHub usernames of the [language leaders](/translate/voice/language-leaders/).
- `support`: per region, which speech-to-text and text-to-speech engines work for the language, like Whisper, Speech-to-Phrase, Piper, or Home Assistant Link.

The table below is a snapshot of that file. When they differ, `languages.yaml` is right.

## Languages

| Code | Language | Language leaders |
| --- | --- | --- |
| `af` | Afrikaans | None yet |
| `ar` | العربية | [Ahmed-farag36](https://github.com/Ahmed-farag36), [Natfaji](https://github.com/Natfaji) |
| `bg` | Български | [hristo-atanasov](https://github.com/hristo-atanasov) |
| `bn` | বাংলা | [poltalashka](https://github.com/poltalashka), [DrHaque](https://github.com/DrHaque) |
| `ca` | Català | [duhow](https://github.com/duhow) |
| `cs` | Čeština | [halecivo](https://github.com/halecivo), [schizza](https://github.com/schizza) |
| `cy` | Cymraeg | None yet |
| `da` | Dansk | [fadamsen](https://github.com/fadamsen), [MTrab](https://github.com/MTrab) |
| `de` | Deutsch | [andreasbrett](https://github.com/andreasbrett), [easterapps](https://github.com/easterapps), [hecktech27](https://github.com/hecktech27), [mib1185](https://github.com/mib1185) |
| `de-CH` | Schwyzerdütsch | [dontinelli](https://github.com/dontinelli) |
| `el` | Ελληνικά | [apo-mak](https://github.com/apo-mak), [chatziko](https://github.com/chatziko) |
| `en` | English | [mrdarrengriffin](https://github.com/mrdarrengriffin), [vividboarder](https://github.com/vividboarder) |
| `es` | Español | [davefx](https://github.com/davefx), [duhow](https://github.com/duhow) |
| `et` | Eesti | None yet |
| `eu` | Euskara | [urtzai](https://github.com/urtzai) |
| `fa` | فارسی | None yet |
| `fi` | Suomi | [Arkkimaagi](https://github.com/Arkkimaagi), [salleq](https://github.com/salleq) |
| `fr` | Français | [jlpouffier](https://github.com/jlpouffier), [piitaya](https://github.com/piitaya) |
| `ga` | Gaeilge | [AlanGreene](https://github.com/AlanGreene) |
| `gl` | Galician | [cibernox](https://github.com/cibernox) |
| `gu` | Gujarati | None yet |
| `he` | עברית | [leranp](https://github.com/leranp), [haim-b](https://github.com/haim-b) |
| `hi` | हिन्दी | [amankrokx](https://github.com/amankrokx) |
| `hr` | Hrvatski | [spuljko](https://github.com/spuljko) |
| `hu` | Magyar | [nagyrobi](https://github.com/nagyrobi), [v1k70rk4](https://github.com/v1k70rk4) |
| `hy` | հայերեն | [eantonya](https://github.com/eantonya), [shahen94](https://github.com/shahen94) |
| `id` | Bahasa Indonesia | None yet |
| `is` | íslenska | [thdg](https://github.com/thdg) |
| `it` | Italiano | [auanasgheps](https://github.com/auanasgheps), [xraver](https://github.com/xraver) |
| `ja` | 日本語 | None yet |
| `ka` | ქართული | [hertzg](https://github.com/hertzg) |
| `kn` | ಕನ್ನಡ | None yet |
| `ko` | 한국어 | [limitless00net](https://github.com/limitless00net) |
| `kw` | kernewek | None yet |
| `lb` | Lëtzebuergesch | [mojikosu](https://github.com/mojikosu) |
| `lt` | Lietuvių | None yet |
| `lv` | Latviešu | [makstech](https://github.com/makstech), [klejejs](https://github.com/klejejs) |
| `ml` | മലയാളം | [arunshekher](https://github.com/arunshekher) |
| `mn` | монгол хэл | [chuk-a](https://github.com/chuk-a) |
| `mr` | Marathi | None yet |
| `ms` | Bahasa Melayu | [zubir2k](https://github.com/zubir2k) |
| `nb` | Norsk Bokmål | [LaStrada](https://github.com/LaStrada) |
| `ne` | नेपाली | [Rrp13](https://github.com/Rrp13) |
| `nl` | Nederlands | [TheFes](https://github.com/TheFes) |
| `pa` | Punjabi | [kmlkrwl](https://github.com/kmlkrwl) |
| `pl` | Polski | [Uriziel01](https://github.com/Uriziel01), [witold-gren](https://github.com/witold-gren) |
| `pt` | Português | [joaorgoncalves](https://github.com/joaorgoncalves), [abmantis](https://github.com/abmantis) |
| `pt-BR` | Português (Brasil) | [mhentschke](https://github.com/mhentschke), [luyzfernando08](https://github.com/luyzfernando08), [staticdev](https://github.com/staticdev) |
| `ro` | Română | [tetele](https://github.com/tetele), [gabimarchidan](https://github.com/gabimarchidan) |
| `ru` | Русский | [HepoH3](https://github.com/HepoH3) |
| `sk` | Slovenčina | [LubosKadasi](https://github.com/LubosKadasi) |
| `sl` | Slovenščina | [andrejs2](https://github.com/andrejs2) |
| `sr` | Српски | [cvladan](https://github.com/cvladan), [ddxic](https://github.com/ddxic), [darkobg79](https://github.com/darkobg79), [PengBG](https://github.com/PengBG) |
| `sr-Latn` | Srpski | None yet |
| `sv` | Svenska | [larsdunemark](https://github.com/larsdunemark), [Robin-St](https://github.com/Robin-St) |
| `sw` | Kiswahili | [BCorbeek](https://github.com/BCorbeek) |
| `ta` | தமிழ் | None yet |
| `te` | తెలుగు | None yet |
| `th` | ภาษาไทย | None yet |
| `tr` | Türkçe | [alpdmrel](https://github.com/alpdmrel) |
| `uk` | Українська | [skynetua](https://github.com/skynetua) |
| `ur` | اُردُو | [AalianKhan](https://github.com/AalianKhan) |
| `vi` | Tiếng Việt | [dinhchinh82](https://github.com/dinhchinh82) |
| `zh-CN` | 简体中文 | [al-one](https://github.com/al-one) |
| `zh-HK` | 繁體中文（香港） | [swonge](https://github.com/swonge) |
| `zh-TW` | 繁體中文（台灣） | [bluefoxlee](https://github.com/bluefoxlee) |

Marathi (`mr`) is listed, but has no sentences yet. `sr-Latn` is generated from `sr`: change Serbian in `sr`, and the Latin script version follows.

## Add a new language

Is your language missing? You can add it. This is a bigger first step than improving an existing language, so plan for a few rounds of review.

### 1. Create the files

Set up the repository as described in [Contribute sentences and responses](/translate/voice/contributing/#pick-your-setup), then run:

```shell
python3 -m script.intentfest add_language <code> <native name>
```

- `<code>` is the language code. Use the two letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code where there is one, like `pl`. Regional or script variants add a suffix, like `pt-BR` or `sr-Latn`.
- `<native name>` is the name of the language in the language itself, like `Polski`.
- Add `--rtl` for a language written right to left.

The script adds your language to `languages.yaml`, and creates its sentence, response, and test files from the English ones. The sentences are left empty, and the responses start with `TODO` so you can see what still needs translating.

Cannot run the script yourself? Ask in the **#language-leaders** channel on the Home Assistant [Discord server](https://www.home-assistant.io/join-chat), and a maintainer can run it for you.

### 2. Keep the first pull request small

Limit your first pull request to:

- The error responses in `sentences/<code>/_common.yaml`.
- The slot combinations of `HassTurnOn` and `HassTurnOff` that `intents.yaml` marks as `required`, with their tests.
- The lists in `lists/<code>/` and the rules in `rules/<code>/` that those sentences need.

That is enough for people to start turning things on and off in your language. More intents follow in later pull requests, one at a time.

### 3. Find a leader

A new language starts without a leader. If you keep contributing, consider [becoming the language leader](/translate/voice/language-leaders/#become-a-language-leader).

> [!NOTE]
> Voice and the interface are separate. Adding a language here does not add it to the Home Assistant interface. For that, see [Request a new language](/translate/guides/new-language/).
