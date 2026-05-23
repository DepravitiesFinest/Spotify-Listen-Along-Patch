/**
 * @name SpotifyListenAlong
 * @description Enables Spotify Listen Along feature on Discord without Premium
 * @version 1.2.0
 * @author Nyxthal
 * @authorId DepravitiesFinest
 * @Github https://github.com/DepravitiesFinest
 * @source https://raw.githubusercontent.com/DepravitiesFinest/Spotify-Listen-Along-Patch/main/SpotifyListenAlong.plugin.js
 */

/*
 * SpotifyListenAlong
 * Maintained by Nyxthal (https://github.com/DepravitiesFinest)
 *
 * Based on the original plugin by ordinall
 * (https://github.com/ordinall/BetterDiscord-Stuff)
 *
 * Changes in this version:
 *   - Removed ZeresPluginLibrary dependency entirely
 *   - Migrated to native BdApi.Webpack, BdApi.Patcher, and BdApi.UI
 *   - Added error toast if the Spotify device store cannot be found
 *   - Requires Newer versions of BetterDiscord.
 */

module.exports = class SpotifyListenAlong {
    constructor(meta) {
        this.meta = meta;
        this._patches = [];
    }

    start() {
        // Modern BdApi.Webpack replaces the old ZeresPluginLibrary WebpackModules
        const DeviceStore = BdApi.Webpack.getByKeys("getActiveSocketAndDevice");

        if (!DeviceStore?.getActiveSocketAndDevice) {
            BdApi.UI.showToast(
                "[SpotifyListenAlong] Could not find Spotify device store. Discord may have updated — please check for a plugin update.",
                { type: "error", timeout: 6000 }
            );
            return;
        }

        // Patch getActiveSocketAndDevice to spoof isPremium = true on the socket,
        // which is the flag Discord checks before allowing Listen Along.
        BdApi.Patcher.after(
            this.meta.name,
            DeviceStore,
            "getActiveSocketAndDevice",
            (_, _args, ret) => {
                if (ret?.socket) ret.socket.isPremium = true;
                return ret;
            }
        );

        BdApi.UI.showToast("[SpotifyListenAlong] Listen Along enabled!", { type: "success" });
    }

    stop() {
        // Clean up all patches registered under this plugin's name
        BdApi.Patcher.unpatchAll(this.meta.name);
        BdApi.UI.showToast("[SpotifyListenAlong] Disabled.", { type: "info" });
    }
};