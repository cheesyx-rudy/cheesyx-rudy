# 🔗 kafka-sub

**Бесплатная агрегированная подписка с прокси-конфигурациями.**

Сбор конфигураций из открытых источников → обработка → готовые подписки.

## 📦 Подписки

### `proxies.txt` — Proxy URL

Список отдельных прокси-конфигураций в URI-формате.

**Подписка:**

```text
https://raw.githubusercontent.com/kafka-def/kafka-sub/refs/heads/main/proxies.txt
```

[Открыть proxies.txt](https://raw.githubusercontent.com/kafka-def/kafka-sub/refs/heads/main/proxies.txt)

### `config.yaml` — Mihomo / Clash Meta

Готовая YAML-подписка для клиентов на базе Mihomo / Clash Meta.

**Подписка:**

```text
https://raw.githubusercontent.com/kafka-def/kafka-sub/refs/heads/main/config.yaml
```

[Открыть config.yaml](https://raw.githubusercontent.com/kafka-def/kafka-sub/refs/heads/main/config.yaml)

## ⚙️ Как это работает

```text
┌──────────────────────┐
│  Источники конфигов  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Парсер         │
│  сбор и обработка    │
└──────────┬───────────┘
           │
           ├───────────────► proxies.txt
           │
           └───────────────► config.yaml
```

Обновление автоматизируется через **GitHub Actions**. Парсеры получают конфигурации из указанных источников, обрабатывают их, удаляют дубликаты и формируют готовые файлы подписок.

> Подписка является агрегатором конфигураций из сторонних источников. Мы не являемся владельцами всех размещённых конфигураций и не гарантируем постоянную работоспособность каждого отдельного узла.

## 🧩 Поддерживаемые форматы

В зависимости от источника и клиента могут встречаться:

- VLESS
- VMess
- Trojan
- Shadowsocks
- ShadowsocksR
- Hysteria / Hysteria2
- TUIC
- AnyTLS
- SOCKS
- HTTP

Некоторые конфигурации могут быть несовместимы с конкретным клиентом или перестать работать со временем.

# 📱 Клиенты

Ниже — популярные клиенты, которые можно скачать из официальных GitHub Releases.

> **Совет:** скачивайте приложения только из официальных репозиториев разработчиков. Не используйте случайные APK/EXE из сторонних сайтов.

## 🪟 Windows / 🍎 macOS / 🐧 Linux

### v2rayN

GUI-клиент для Windows, Linux и macOS с поддержкой Xray, sing-box и других ядер.

- [Скачать](https://github.com/2dust/v2rayN/releases)
- [Репозиторий](https://github.com/2dust/v2rayN)

### Hiddify

Мультиплатформенный клиент на базе sing-box с поддержкой VLESS, VMess, Reality, TUIC, Hysteria2, WireGuard, Trojan и других протоколов. Поддерживает Windows, macOS, Linux, Android и iOS.

- [Скачать](https://github.com/hiddify/hiddify-app/releases)
- [Репозиторий](https://github.com/hiddify/hiddify-app)

### Clash Verge Rev

Современный GUI-клиент для Windows, macOS и Linux с поддержкой Mihomo/Clash Meta.

- [Скачать](https://github.com/clash-verge-rev/clash-verge-rev/releases)
- [Репозиторий](https://github.com/clash-verge-rev/clash-verge-rev)

### NekoRay

Кроссплатформенный GUI-клиент на базе sing-box.

> Репозиторий NekoRay архивирован разработчиками, поэтому проект лучше рассматривать как дополнительный вариант, а не основной клиент для новых установок.

- [Releases](https://github.com/MatsuriDayo/nekoray/releases)
- [Репозиторий](https://github.com/MatsuriDayo/nekoray)

## 🤖 Android

### v2rayNG

Android-клиент с поддержкой Xray и v2fly.

- [Скачать](https://github.com/2dust/v2rayNG/releases)
- [Репозиторий](https://github.com/2dust/v2rayNG)

### NekoBox for Android

Android-клиент на базе sing-box с поддержкой VLESS, VMess, Trojan, Hysteria2, TUIC, AnyTLS, WireGuard и других протоколов.

- [Скачать](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases)
- [Репозиторий](https://github.com/MatsuriDayo/NekoBoxForAndroid)

### Clash Meta for Android

Android-клиент на базе Clash.Meta.

- [Скачать](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)
- [Репозиторий](https://github.com/MetaCubeX/ClashMetaForAndroid)

### Hiddify

Поддерживает Android и импорт подписок.

- [Скачать](https://github.com/hiddify/hiddify-app/releases)
- [Репозиторий](https://github.com/hiddify/hiddify-app)

## 🍎 iOS

### Hiddify

Мультиплатформенный клиент с поддержкой iOS и удалённых профилей/подписок.

- [GitHub Releases](https://github.com/hiddify/hiddify-app/releases)
- [Репозиторий](https://github.com/hiddify/hiddify-app)

## 🧠 Ядра

- [Mihomo](https://github.com/MetaCubeX/mihomo) — современное ядро для Clash Meta-совместимых конфигураций.
- [sing-box](https://github.com/SagerNet/sing-box) — универсальная proxy-платформа, используемая рядом современных клиентов.

## 📋 Быстрый выбор

| Платформа | Клиенты |
|---|---|
| 🪟 Windows | [v2rayN](https://github.com/2dust/v2rayN), [Hiddify](https://github.com/hiddify/hiddify-app), [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) |
| 🍎 macOS | [v2rayN](https://github.com/2dust/v2rayN), [Hiddify](https://github.com/hiddify/hiddify-app), [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) |
| 🐧 Linux | [v2rayN](https://github.com/2dust/v2rayN), [Hiddify](https://github.com/hiddify/hiddify-app), [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) |
| 🤖 Android | [v2rayNG](https://github.com/2dust/v2rayNG), [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid), [Clash Meta](https://github.com/MetaCubeX/ClashMetaForAndroid), [Hiddify](https://github.com/hiddify/hiddify-app) |
| 🍎 iOS | [Hiddify](https://github.com/hiddify/hiddify-app) |

## ⚠️ Важно

- Конфигурации собираются из сторонних источников.
- Работоспособность отдельных конфигураций не гарантируется.
- Конфигурации могут перестать работать без предупреждения.
- Разные клиенты поддерживают разные протоколы и параметры.
- Если конкретный конфиг не подключается, попробуйте другой клиент или другой узел.
- Не скачивайте клиенты из непроверенных источников.

## 👥 Авторы и контакты

**Оператор подписки / Telegram-канала:**  
[@rudy_bd](https://t.me/rudy_bd)

**Администратор канала / оператор подписки:**  
[@cheesyx](https://t.me/cheesyx)

**Telegram-канал проекта:**  
[@parser_url](https://t.me/parser_url)

## 📄 Лицензия

Код проекта распространяется согласно лицензии, указанной в репозитории.

Конфигурации, поступающие из сторонних источников, не являются собственностью проекта.

---

<div align="center">

### ⭐ Если проект оказался полезен — поставьте звезду репозиторию

[GitHub](https://github.com/kafka-def/kafka-sub) · [Parser URL](https://t.me/parser_url)

</div>
