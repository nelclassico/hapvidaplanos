if (typeof jQuery == 'undefined') {
    steal.map('jquery/jquery.js', parent.motopress.wpJQueryUrl + 'jquery.js')
    .then(parent.motopress.wpJQueryUrl + 'jquery.js');
} else {
    steal.loaded('jquery/jquery.js');
}
steal.then(
    'mp/css/mp.css' + motopress.pluginVersionParam,
    'bootstrap/select/bootstrap-select.css' + motopress.pluginVersionParam,
    'bootstrap/bootstrap-combined.min.css' + motopress.pluginVersionParam
)
.then('bootstrap/bootstrap.min.js' + motopress.pluginVersionParam)
.then('bootstrap/select/bootstrap-select.js' + motopress.pluginVersionParam)
.then('mp/bootstrapSelect/bootstrapSelect.js' + motopress.pluginVersionParam)
.then('mp/concat.js' + motopress.pluginVersionParam,
    function($) {
        //console.log($().jquery); //1.9.0
        //console.log(jQuery.fn.jquery); //1.7.2

        new MP.Flash($('#motopress-flash'));
        new MP.Utils();
        new MP.Settings();
        new MP.BootstrapSelect();
        new MP.Iframe($('#motopress-iframe'));
        new MP.Navbar($('.motopress-navbar'));
    }
);
