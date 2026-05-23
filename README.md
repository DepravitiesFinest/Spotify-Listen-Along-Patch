# SpotifyListenAlong

> A modernized BetterDiscord plugin that enables Spotify **Listen Along** without Premium.  
> Maintained by **[Nyxthal](https://github.com/DepravitiesFinest)** — updated from the original by ordinall.

---

## What it does

Discord locks the Listen Along feature behind Premium. This plugin patches Discord's internal Spotify device store at runtime to spoof a premium flag, tricking Discord into thinking your account is eligible without touching your account, your token, or anything server-side.

---

## Installation

1. Make sure [BetterDiscord](https://betterdiscord.app/) is installed.
2. Download **[SpotifyListenAlong.plugin.js](https://github.com/DepravitiesFinest/Spotify-Listen-Along-Patch/raw/main/SpotifyListenAlong.plugin.js)**.
3. Drop the file into your BetterDiscord plugins folder:
   - **Windows:** `%APPDATA%\BetterDiscord\plugins\`
   - **macOS:** `~/Library/Application Support/BetterDiscord/plugins/`
   - **Linux:** `~/.config/BetterDiscord/plugins/`
4. Open Discord → **Settings → Plugins** → enable **SpotifyListenAlong**.

---

## Requirements

| Requirement | Details |
|---|---|
| BetterDiscord | **Newest Version** |
| ZeresPluginLibrary | No longer needed |
| Spotify | Free or Premium (plugin works either way) |

---

## What changed from the original (Old → New)
 
The original plugin by ordinall broke because it depended on **ZeresPluginLibrary** and used the old `WebpackModules` API both of which are either broken or completely unnecessary in modern BetterDiscord.
 
|                    | Original                           | This version                                   |
|--------------------|------------------------------------|------------------------------------------------|
| Library dependency | Requires ZeresPluginLibrary        | None — uses native BdApi                       |
| Webpack access     | `WebpackModules.getByProps(...)`   | `BdApi.Webpack.getByKeys(...)`                 |
| Patching           | `Patcher.after(store, method, fn)` | `BdApi.Patcher.after(name, store, method, fn)` |
| Cleanup            | `Patcher.unpatchAll()`             | `BdApi.Patcher.unpatchAll(pluginName)`         |
| Toasts             | `BdApi.showToast(...)`             | `BdApi.UI.showToast(...)`                      |
 
The core patch logic is **identical** — `getActiveSocketAndDevice` is still patched to set `isPremium = true` on the socket object. Only the surrounding infrastructure was updated to use BetterDiscord's modern built-in APIs so that it works again.
 
---

## Troubleshooting

**Plugin doesn't load at all**  
Make sure you're on the newest BetterDiscord. Go to Settings → BetterDiscord → check the version number and update if needed.

**Toast says "Could not find Spotify device store"**  
Discord updated their internal module names. Open a GitHub issue and I'll push a fix.

**Listen Along still grayed out**  
Make sure Spotify is actually open and connected to Discord (Settings → Connections). The plugin patches the premium check but Spotify still needs to be linked.

---

## Disclaimer

This plugin does not bypass any Spotify restrictions it only spoofs a client-side flag within Discord's UI. It does not grant Spotify Premium features, does not touch any Spotify account, and does not communicate with any external servers. Use at your own risk modifying Discord's client with BetterDiscord is against Discord's ToS.

---

## Credits

- **[ordinall](https://github.com/ordinall)** — original plugin concept and implementation.
- **[Nyxthal](https://github.com/DepravitiesFinest)** — modernization for BetterDiscord to work again properly.
