if (typeof jQuery == 'undefined') {
    steal.map('jquery/jquery.js', parent.motopress.wpJQueryUrl + 'jquery.js')
    .then(parent.motopress.wpJQueryUrl + 'jquery.js');
} else {
    steal.loaded('jquery/jquery.js');
}
steal.then(
    'bootstrap/bootstrap-icon.min.css' + parent.motopress.pluginVersionParam,
    'mp/css/mpPreview.css' + parent.motopress.pluginVersionParam
)
.then('bootstrap/bootstrap.min.js' + parent.motopress.pluginVersionParam)
.then('mp/previewTooltip/previewTooltip.js' + parent.motopress.pluginVersionParam)
.then(
    function($) {
        // On first preview load
        parent.MP.Navbar.myThis.configurePreview();
        parent.MP.Navbar.myThis.preload(false);
    }
);