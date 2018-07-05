cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
        "id": "cordova-plugin-fullscreen.AndroidFullScreen",
        "pluginId": "cordova-plugin-fullscreen",
        "clobbers": [
            "AndroidFullScreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-android-support-gradle-release": "1.4.4",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-fullscreen": "1.1.0"
}
// BOTTOM OF METADATA
});