steal('jquery/controller', 'jquery/view/ejs')
    .then('mp/flash/views/init.ejs' + motopress.pluginVersionParam, function($) {
    /**
     * @class MP.Flash
     */
    $.Controller('MP.Flash',
    /** @Static */
    {
        type: 'warning',
        message: null,
        cssClass: 'alert fade in',
        newCssClass: '',
        element: null,

        setFlash: function(message, type) {
            MP.Flash.message = message;
            if (typeof type !== 'undefined') MP.Flash.type = type;
            MP.Flash.newCssClass = MP.Flash.cssClass;
            switch(MP.Flash.type) {
                case 'info':
                    MP.Flash.newCssClass += ' alert-info';
                    break;
                case 'success':
                    MP.Flash.newCssClass += ' alert-success';
                    break;
                case 'error':
                    MP.Flash.newCssClass += ' alert-error';
                    break;
            }
        },

        showMessage: function() {
            if (MP.Flash.message) {
                MP.Flash.element.html("//mp/flash/views/init.ejs" + motopress.pluginVersionParam, {
                    cssClass: MP.Flash.newCssClass,
                    type: MP.Flash.type,
                    message: MP.Flash.message
                });

                var alert = MP.Flash.element.find('.alert');
                var flashTimer = setTimeout(function() {
                    alert.alert('close');
                    MP.Flash.message = '';
                    clearTimeout(flashTimer);
                }, 10000);
            }
        }
    },
    /** @Prototype */
    {
        init: function() {
            MP.Flash.element = this.element;

            this.element.html("//mp/flash/views/init.ejs" + motopress.pluginVersionParam,{
                cssClass: MP.Flash.cssClass,
                type: MP.Flash.type,
                message: MP.Flash.message
            });
        }
    })
});
steal('jquery/class', function($) {
    /**
    * @class MP.Utils
    */
    $.Class('MP.Utils',
    /** @Static */
    {
        validationError: $('<div />', {
            'class': 'motopress-validation-error'
        }),

        strtr: function (str, from, to) {
            /*
            * strtr by Kedo
            * 2009
            * Example 1: strtr('hi all, I said hello', {'hi':'hello', 'hello':'hi'}); //hello all, I said hi
            * Example 2: strtr('abcdcdb', 'ab', 'AB')); //ABcdcdB
            */
            if (typeof from === 'object') {
                var cmpStr = '';
                for (var j=0; j < str.length; j++){
                    cmpStr += '0';
                }
                var offset = 0;
                var find = -1;
                var addStr = '';
                for (fr in from) {
                    offset = 0;
                    while ((find = str.indexOf(fr, offset)) != -1){
                        if (parseInt(cmpStr.substr(find, fr.length)) != 0){
                            offset = find + 1;
                            continue;
                        }
                        for (var k =0 ; k < from[fr].length; k++){
                            addStr += '1';
                        }
                        cmpStr = cmpStr.substr(0, find) + addStr + cmpStr.substr(find + fr.length, cmpStr.length - (find + fr.length));
                        str = str.substr(0, find) + from[fr] + str.substr(find + fr.length, str.length - (find + fr.length));
                        offset = find + from[fr].length + 1;
                        addStr = '';
                    }
                }
                return str;
            }

            for(var i = 0; i < from.length; i++) {
                str = str.replace(new RegExp(from.charAt(i),'g'), to.charAt(i));
            }

            return str;
        },

        uniqid: function(prefix, more_entropy) {
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Kankrelune (http://www.webfaktory.info/)
            // %        note 1: Uses an internal counter (in php_js global) to avoid collision
            // *     example 1: uniqid();
            // *     returns 1: 'a30285b160c14'
            // *     example 2: uniqid('foo');
            // *     returns 2: 'fooa30285b1cd361'
            // *     example 3: uniqid('bar', true);
            // *     returns 3: 'bara20285b23dfd1.31879087'
            if (typeof prefix == 'undefined') {
                prefix = "";
            }

            var retId;
            var formatSeed = function (seed, reqWidth) {
                seed = parseInt(seed, 10).toString(16); // to hex str
                if (reqWidth < seed.length) { // so long we split
                    return seed.slice(seed.length - reqWidth);
                }
                if (reqWidth > seed.length) { // so short we pad
                    return Array(1 + (reqWidth - seed.length)).join('0') + seed;
                }
                return seed;
            };

            // BEGIN REDUNDANT
            if (!this.php_js) {
                this.php_js = {};
            }
            // END REDUNDANT
            if (!this.php_js.uniqidSeed) { // init seed with big random int
                this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
            }
            this.php_js.uniqidSeed++;

            retId = prefix; // start with prefix, add current milliseconds hex string
            retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
            retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
            if (more_entropy) {
                // for more entropy we add a float lower to 10
                retId += (Math.random() * 10).toFixed(8).toString();
            }

            return retId;
        },

        inObject: function (value, obj) {
            var result = false;
            for (var key in obj) {
                if (obj[key].toLowerCase() == value.toLowerCase()) {
                    result = true;
                    break;
                }
            }
            return result;
        },

        removeByValue: function(value, arr) {
            if (arr.indexOf(value) !== -1) {
                arr.splice(arr.indexOf(value), 1);
                return true;
            } else {
                return false;
            }
        },

        doSortSelectByText: function(select) {
            if (!select.children('optgroup').length) {
                var sortedVals = $.makeArray(select.children('option')).sort(function(a, b) {
                    return $(a).text() > $(b).text() ? 1 : $(a).text() < $(b).text() ? -1 : 0 ;
                });
                select.empty().html(sortedVals);
            } else {
                select.children('optgroup').each(function() {
                    var sortedVals = $.makeArray($(this).children('option')).sort(function(a, b) {
                        return $(a).text() > $(b).text() ? 1 : $(a).text() < $(b).text() ? -1 : 0 ;
                    });
                    $(this).empty().html(sortedVals);
                });
            }
        },

        addParamToUrl: function (url, key, value) {
            var query = url.indexOf('?');
            var anchor = url.indexOf('#');
            if (query == url.length - 1) {
                url = url.substring(0, query);
                query = -1;
            }
            return (anchor > 0 ? url.substring(0, anchor) : url)
                + (query > 0 ? '&' + key + '=' + value : '?' + key + '=' + value)
                + (anchor > 0 ? url.substring(anchor) : '');
        },

        removeParamFromUrl: function(url, param) {
            var expr = new RegExp(param+'\\=([a-z0-9]+)', 'i');
            var match = url.match(expr);
            if (match) {
                var urlPart = match[0];
                if (url.search('&'+urlPart) >= 0) {
                    url = url.replace('&'+urlPart, '');
                } else if (url.search('\\?'+urlPart+'&') >= 0) {
                    url = url.replace('?'+urlPart+'&', '');
                } else if (url.search('\\?'+urlPart) >= 0) {
                    url = url.replace('?'+urlPart, '');
                }
            }
            return url;
        },

        showValidationError: function(message, afterElement) {
            var oldValidationError = afterElement.next('.motopress-validation-error');
            if (oldValidationError.length) oldValidationError.remove();
            var validationError = this.validationError.clone();
            validationError.text(message).insertAfter(afterElement);
        },

        setup: function() {
            var userAgent = navigator.userAgent.toLowerCase();
            this.Browser = {
                Version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
                Chrome: /chrome/.test(userAgent),
                Safari: /webkit/.test(userAgent),
                Opera: /opera/.test(userAgent),
                IE: /msie/.test(userAgent) && !/opera/.test(userAgent),
                Mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
            };
        }
    },
    /** @Prototype */
    {})
});
steal('jquery/class')
    .then('mp/language/language.js' + motopress.pluginVersionParam, function($) {
   /**
    * @class MP.Settings
    */
    $.Class('MP.Settings',
    /** @Static */
    {
        siteUrl: null,

        pluginRootUrl: null,
        pluginName: null,

        themeRoot: null,
        themeRootUrl: null,
        currentTheme: null,

        themeWrapperRoot: null,
        themeWrapperRootUrl: null,

        themeLoopRoot: null,
        themeLoopRootUrl: null,

        lang: null,

        loadScriptsUrl: null,

        setup: function() {
            this.removeWpPanels();
            this.getSiteUrl();
            this.getWpSettings();
        },

        removeWpPanels: function() {
            $("#footer, #adminmenuwrap, #adminmenuback, .update-nag").remove();
            $('#wpcontent').css('margin-left', 0);
            $('#wpbody-content').css('padding-bottom', 0);
            $('#wpfooter').remove();
        },

        getSiteUrl: function() {
            var href = window.location.href;
            var hrefLen = href.indexOf('/wp-admin/');
            this.siteUrl = href.substr(0, hrefLen);
        },

        getWpSettings: function() {
            $.ajax({
                url: motopress.ajaxUrl,
                data: {
                    action: 'motopress_get_wp_settings',
                    nonce: motopress.nonces.motopress_get_wp_settings
                },
                dataType: 'json',
                type: 'POST',
                success: function(data) {
                    MP.Settings.debug = data.debug;
                    MP.Settings.adminUrl = data.admin_url;
                    MP.Settings.pluginRootUrl = data.plugin_root_url;
                    MP.Settings.pluginName = data.plugin_name;

                    MP.Settings.themeRoot = data.theme_root;
                    MP.Settings.themeRootUrl = data.theme_root_url;
                    MP.Settings.currentTheme = data.current_theme;
                    MP.Settings.parentTheme = data.parent_theme;

                    MP.Settings.themeWrapperRoot = data.theme_wrapper_root;
                    MP.Settings.themeWrapperRootUrl = data.theme_wrapper_root_url;

                    MP.Settings.themeLoopRoot = data.theme_loop_root;
                    MP.Settings.parentThemeLoopRoot = data.parent_theme_loop_root;
                    MP.Settings.themeLoopRootUrl = data.theme_loop_root_url;

                    MP.Settings.lang = data.lang;

                    MP.Settings.loadScriptsUrl = data.load_scripts_url;

                    if (MP.Utils.Browser.IE || MP.Utils.Browser.Opera) {
                        window.location = MP.Settings.adminUrl + '?page=' + MP.Settings.pluginName;
                    }

                    new MP.Language();
                },
                error: function() {
                    MP.Flash.setFlash(localStorage.getItem('wpSettingsError'), 'error');
                    MP.Flash.showMessage();
                }
            });
        }
    },
    /** @Prototype */
    {})
});
steal('jquery/controller', function($){
    /**
    * @class MP.Iframe
    */
    $.Controller('MP.Iframe',
    /** @Static */
    {
        myThis: null,
        window: null,
        contents: null,
        height: null
        //element: null

        /*
        setHeight: function() {
            var height = MP.Iframe.contents.height();
            MP.Iframe.element.css({
                height: height,
                top: -height
            });
            MP.Grid.setHeight(height);
        }
        */
    },
    /** @Prototype */
    {
        grid: $('<div />', {
            id: 'motopress-grid',
            'class': 'container'
        }),

        init: function() {
            MP.Iframe.myThis = this;
            MP.Iframe.window = this.element[0].contentWindow;

            this.element.on('load', this.proxy('onLoad'));
        },

        onLoad: function() {
            // Create StaticEditor
            if (MP.StaticEditor.myThis === null) new MP.StaticEditor();

            MP.Iframe.contents = this.element.contents();
            //MP.Iframe.element = this.element;
            //MP.Iframe.setHeight();

            MP.Iframe.contents.find('#wpadminbar').remove();

            var iframeHtml = MP.Iframe.contents.find('html');

            //iframeHtml.find('link[href*="bootstrap"]').remove();
            //MP.Iframe.contents.find('script[src*="bootstrap"]').remove();

            var head = MP.Iframe.contents.find('head')[0];

            var stealVerScript = $('<script />', {
                text: 'var steal = { production: "mp/iframeProd/production.js" + parent.motopress.pluginVersionParam };'
            })[0];
            this.appendScript(head, stealVerScript);
            var script = $('<script />', {
                src: MP.Settings.pluginRootUrl + '/' + MP.Settings.pluginName + '/steal/steal.production.js?mp/iframeProd'
            })[0];
            this.appendScript(head, script);

            iframeHtml.find('body').prepend(this.grid);
        },

        appendScript: function(head, script) {
            head.appendChild(script);
        }
    })
});
steal('jquery/controller', function($){
    /**
     * @class MP.Navbar
     */
    $.Controller('MP.Navbar',
    /** @Static*/
    {
        myThis: null
    },
    /** @Prototype*/
    {
        iframe: $("#motopress-iframe"),
        iframeWrapper: $("#motopress-iframe-wrapper"),
        previewIframeWrapper: $("#motopress-preview-iframe-wrapper"),
        previewIframe: $("#motopress-preview-iframe"),
        duplicateModal: $("#motopress-duplicate-modal"),
        preloader: $('#motopress-preload'),
        DEFAULT_WIDTH: '100%',
        TABLET_WIDTH: '800px',
        PHONE_WIDTH: '480px',
        includesDir: MP.Settings.pluginRootUrl + '/' + MP.Settings.pluginName + '/includes/',
        currentViewMode: 'editor',
        scrollWidth: 15,
        previewLoaded: false,
        welcomeWindowShown: false,

        //blockTools: $('<div class="motopress-tools label" />'),
        //wrapperTools: $('<div class="motopress-layout-wrapper-tools label" />'),
        blockTools: $('<div class="motopress-tools motopress-default" />'),
        blockToolsInner: $('<div class="motopress-tools-inner motopress-default">'),
        wrapperTools: $('<div class="motopress-layout-wrapper-tools motopress-default" />'),
        disableContentBlock: $('<div class="motopress-disable-content" />'),
        showHideBtn: $('<div />', {
            'class': 'motopress-show-hide-btn motopress-default',
            title: localStorage.getItem('hideDevice')
        }),

        init: function() {
            MP.Navbar.myThis = this;
            this.firstSteps();
            this.loadIframe();
            this.makeDuplicateTemplate();
        },

        firstSteps: function() {
            // Cross-browser resize
            if ($('#motopress-iframe-wrapper').height() == 0) {
                var h = $('#motopress-iframe-wrapper').parent().height() - 60;
                if (h > 0) $('#motopress-iframe-wrapper').height(h);
                h = $('#motopress-preview-iframe-wrapper').parent().height() - 60;
                if (h > 0) $('#motopress-preview-iframe-wrapper').height(h);
                $(window).resize(function() {
                    h = $('#motopress-iframe-wrapper').parent().height() - 60;
                    if (h > 0) $('#motopress-iframe-wrapper').height(h);
                    h = $('#motopress-preview-iframe-wrapper').parent().height() - 60;
                    if (h > 0) $('#motopress-preview-iframe-wrapper').height(h);
                });
            }
            this.blockToolsInner.append(this.showHideBtn.clone());
            this.blockTools.append(this.blockToolsInner.clone());
            this.wrapperTools.append(this.showHideBtn.clone());

            // page, template
            MP.Utils.doSortSelectByText($('#motopress-pages'));
            var selected = $('#motopress-pages option[selected]');
            if (!selected.length) selected = $('#motopress-pages option:first');
            $('#motopress-pages option:selected').prop('selected', false); //fix firefox bug (two options selected)
            selected.prop('selected', true);

            var selectedTemplate = selected.attr('data-template');
            $('#motopress-page-templates option[value="' + selectedTemplate + '"]').prop('selected', true);
            $('#motopress-pages').selectpicker({size: 20});
            $('#motopress-page-templates').selectpicker({size: 10});

            if (typeof selected.attr('data-motopress-hide-template') !== 'undefined' || selected.parent().attr('id') == 'system') {
                $('#motopress-page-templates-wrapper').hide();
                $('#motopress-duplicate-template').hide();
            }else {
                $('#motopress-page-templates-wrapper').show();
                $('#motopress-duplicate-template').show();
            }

            // Show/Hide hidden blocks by mode
            var eye = $('#motopress-show-hide-blocks').find('i');
            var eyeText = $('#motopress-show-hide-blocks').find('span');
            $('#motopress-show-hide-blocks').on('click', function() {
                if (eye.hasClass('motopress-icon-eye-close')) {
                    $(this).addClass('active');
                    eye.attr('class', 'motopress-icon-eye-open');
                    eyeText.text(localStorage.getItem('showHiddenBlocks'));
                    MP.Navbar.myThis.hideHiddenBlocks(MP.Navbar.myThis.previewIframe, true);
                } else {
                    $(this).removeClass('active');
                    eye.attr('class', 'motopress-icon-eye-close');
                    eyeText.text(localStorage.getItem('hideHiddenBlocks'));
                    MP.Navbar.myThis.showHiddenBlocks(MP.Navbar.myThis.previewIframe, true);
                }
            });

            // On Iframe load
            this.iframe.on('load', function() {
//                MP.Navbar.myThis.preload(false);
                MP.Navbar.myThis.scrollWidth = MP.Navbar.myThis.getScrollbarWidth();
                var minWidth = MP.Navbar.myThis.scrollWidth + 980;
                $('#motopress-iframe').css('min-width', minWidth);
                $('.motopress-navbar.mp_navbar').css('min-width', minWidth);
            });

            // On Preview load
            this.previewIframe.on('load', function() {
                var head = MP.Navbar.myThis.previewIframe.contents().find('head')[0];

                var stealVerScript = $('<script />', {
                    text: 'steal = { production: "mp/previewProd/production.js" + parent.motopress.pluginVersionParam };'
                })[0];
                MP.Iframe.myThis.appendScript(head, stealVerScript);

                var script = $('<script />', {
                    src: MP.Settings.pluginRootUrl + '/' + MP.Settings.pluginName + '/steal/steal.production.js?mp/previewProd'
                })[0];
                MP.Iframe.myThis.appendScript(head, script);

                MP.Navbar.myThis.previewLoaded = true;
            });
        },

        updatePreview: function() {
            // Update preview
            if (this.previewIframeWrapper.is(':visible')) {
                this.preview();
                /*
                var w = this.previewIframe.width();
                this.previewIframe.width(w+1);
                this.previewIframe.width(w-1);
                */
                if ($('#motopress-show-hide-blocks').find('i').hasClass('motopress-icon-eye-close')) {
                    this.showHiddenBlocks(this.previewIframe, true);
                } else {
                    this.hideHiddenBlocks(this.previewIframe, true);
                }
            }
        },

        '#motopress-pages change': function(el) {
            this.previewLoaded = false;
            var selected = el.find('option:selected');
            var selectedSrc = selected.val();
            this.setIframeSrc(selectedSrc);
            var template = selected.attr('data-template');

            var templateOption = $('#motopress-page-templates option[value="' + template + '"]');
            MP.BootstrapSelect.setSelected(templateOption);

            if (selected.parent().attr('id') == 'pages') {
                $('#motopress-page-templates-wrapper').show();
                if (typeof selected.attr('data-motopress-hide-template') !== 'undefined') {
                    $('#motopress-page-templates-wrapper').hide();
                    $('#motopress-duplicate-template').hide();
                } else {
                    $('#motopress-duplicate-template').show();
                }
            } else {
                $('#motopress-page-templates-wrapper').hide();
                $('#motopress-duplicate-template').hide();
            }
        },

        '#motopress-save click': function() {
            //this.save(false);
            MP.Confirm.show(localStorage.getItem('save'), localStorage.getItem('saveConfirm'), 'save');
        },

        '#motopress-reset click': function() {
            //this.reset();
            MP.Confirm.show(localStorage.getItem('reset'), localStorage.getItem('resetConfirm'), 'reset');
        },

        '#motopress-visit-site click': function() {
            //this.save(true);
            MP.Confirm.show(localStorage.getItem('visitSite'), localStorage.getItem('visitSiteConfirm'), 'visit-site');
        },

        '#motopress-page-templates change': function(el) {
            this.previewLoaded = false;
            var selectedPage = $('#motopress-pages').find('option:selected');
            var pageId = selectedPage.attr('data-motopress-entity-id');
            var template = el.find('option:selected').val();
            if (typeof pageId !== 'undefined' && selectedPage.attr('data-template') !== template) {
                this.setPageTemplate(pageId, template);
            }
        },

        makeDuplicateTemplate: function() {
            $('#motopress-duplicate-template').on('mousedown', function() {
                var currentTemplateName = $('#motopress-page-templates').find('option:selected').text();
                $('#motopress-new-template-name').val('New ' + currentTemplateName);
            });

            this.duplicateModal.on('hide', function() {
                $(this).find('.motopress-validation-error').remove();
            });

            $('body').on('click', '#motopress-duplicate-template-create', function() {
                var pageId = $('#motopress-pages').find('option:selected').attr('data-motopress-entity-id');
                var templateToDuplicate = $('#motopress-page-templates').find('option:selected').val();
                var templateNameInput = $('#motopress-new-template-name');
                var newTemplateName = templateNameInput.val();

                if (typeof pageId == 'undefined' || !templateToDuplicate) {
                    MP.Utils.showValidationError(localStorage.getItem('duplicateError'), templateNameInput);
                } else if (!new RegExp('^[^\*\/]{1,30}$', 'i').test(newTemplateName)) {
                    MP.Utils.showValidationError(localStorage.getItem('validationName'), templateNameInput);
                } else {
                    MP.Navbar.myThis.duplicateTemplate(pageId, templateToDuplicate, newTemplateName);
                    //MP.Navbar.myThis.duplicateModal.modal('hide');
                }
            });
        },

        showNavbarByType: function(type) {
            switch (type) {
                case 'editor':
                    $('#motopress-editor-group').show();
                    $('#motopress-preview-group').hide();
                    break;
                case 'preview':
                    $('#motopress-editor-group').hide();
                    $('#motopress-preview-group').show();
                    break;
                default:
                    break;
            }
        },

        '#editorView click' : function(el) {
            MP.Iframe.window.MP.Resizer.myThis.updateSplitterHeight(null, 'init');

            this.currentViewMode = 'editor';

            $('.motopress-navbar.mp_navbar').removeClass('motopress-navbar-preview');

            this.changeModeIcon(el);

            this.showIframe('editor');

            this.showNavbarByType('editor');
        },
        '#defaultScreenView click' : function(el) {
            this.currentViewMode = 'desktop';

            this.changeModeIcon(el);

            this.previewIframe.css({'width': MP.Navbar.myThis.DEFAULT_WIDTH});
            /*this.previewIframe.css({
                'width' : '100%',
                'min-width' : MP.Navbar.myThis.DEFAULT_WIDTH + this.scrollWidth + 'px'
            });*/
            this.preview();

            this.showNavbarByType('preview');
        },
        '#tabletScreenView click' : function(el) {
            this.currentViewMode = 'tablet';

            this.changeModeIcon(el);

            this.previewIframe.css({'width': MP.Navbar.myThis.TABLET_WIDTH});
            /*this.previewIframe.css({
                'width' : MP.Navbar.myThis.TABLET_WIDTH + this.scrollWidth + 'px',
                'min-width' : MP.Navbar.myThis.TABLET_WIDTH + this.scrollWidth + 'px'
            });*/
            this.preview();

            this.showNavbarByType('preview');
        },
        '#phoneScreenView click' : function(el) {
            this.currentViewMode = 'phone';

            this.changeModeIcon(el);

            this.previewIframe.css({'width': MP.Navbar.myThis.PHONE_WIDTH});
            /*MP.Navbar.myThis.previewIframe.css({
                'width' : MP.Navbar.myThis.PHONE_WIDTH + this.scrollWidth + 'px',
                'min-width' : MP.Navbar.myThis.PHONE_WIDTH + this.scrollWidth + 'px'
            });*/
            this.preview();

            this.showNavbarByType('preview');
        },

        changeModeIcon: function(el) {
            var bgPosition = el.find('.screen-views-icon').css('background-position');
            $("#currentViewMode").css('background-position', bgPosition);
        },

        setIframeSrc: function(src) {
            src = MP.Utils.addParamToUrl(src, 'motopress', 1);
            this.preload(true);
            MP.Iframe.window.location.replace(src);
        },

        preview: function() {
            if (this.previewLoaded) {
                this.configurePreview();
            } else {
                this.preload(true);
                this.showIframe('preview');
                var src = $('select#motopress-pages option:selected').val();
                src = MP.Utils.addParamToUrl(src, 'motopress', 1);
                this.previewIframe[0].contentWindow.location.replace(src);
            }
        },

        configurePreview: function() {
            this.previewIframeWrapper.css('top', 0);
            $('.motopress-navbar.mp_navbar').addClass('motopress-navbar-preview');

            this.identify();

            var content = MP.Iframe.contents.find('body #motopress-main').clone();
            var body = this.previewIframe.contents().find('body');
            body.empty().append(content.find('.motopress-inactive script').remove().end().children());

            var previewIframeContent = this.previewIframe.contents();
            this.clearHelpers(previewIframeContent);

            body.append($('<div />', {'class': 'motopress-helper-container'}));

            this.makeShowHideBlocks(previewIframeContent);

            this.showIframe('preview');
        },

        identify: function() {
            this.iframe.contents().find('.container [class*="span"]').each(function() {
                if (typeof $(this).attr('data-motopress-wrapper-type') != 'undefined' || !$(this).children('.row').length) {
                    if (typeof($(this).attr('data-motopress-block-id')) == 'undefined') {
                        $(this).attr('data-motopress-block-id', MP.Utils.uniqid());
                    }
                }
            });
        },

        clearHelpers: function(obj) {
            obj.find("#wpadminbar").remove();
            obj.find(".motopress-helper").remove();
            obj.find(".motopress-wrapper-helper").remove();
            obj.find(".motopress-helper-container").remove();
            obj.find(".motopress-handle-middle-out").remove();
            obj.find(".motopress-handle-middle-in").remove();
            obj.find(".motopress-left-menu").remove();
            obj.find(".motopress-helper-container").remove();
            obj.find(".motopress-helper").remove();
            obj.find(".ui-resizable-handle").remove();
            obj.find('[class*="motopress-handle"]').remove();
            obj.find('div').removeClass('ui-draggable ui-resizable');
            obj.find('#motopress-grid').remove();
        },

        clearParams: function(obj) {
            var spans = obj.find('[class*="span"]');
            spans.removeAttr('data-motopress-block-id');
            spans.removeAttr('data-motopress-responsive-utility');
            spans.removeClass('motopress-block-highlight');
        },

        save: function(openInNewTab) {
            var obj = this.iframe.contents().find('html').clone();
            this.clearHelpers(obj);
            this.hideHiddenBlocks(obj, false);
            this.clearParams(obj);
            var data = obj.find('body div#motopress-main').html();
            var page = $('#motopress-pages').find('option:selected').attr('data-template');

            $.ajax({
                url: motopress.ajaxUrl,
                async: false,
                data: {
                    action: 'motopress_save',
                    nonce: motopress.nonces.motopress_save,
                    page: page,
                    data: data
                },
                type: 'POST',
                success: function() {
                    if (MP.Navbar.myThis.currentViewMode === 'editor') {
                        MP.Navbar.myThis.previewLoaded = false;
                    }

                    MP.Flash.setFlash(localStorage.getItem('templateSaved'), 'success');
                    MP.Navbar.myThis.loadIframe();
                    if (openInNewTab) {
                        window.open(MP.Utils.removeParamFromUrl(MP.Iframe.window.location.href, 'motopress'), '_blank');
                        window.focus();
                    }

                    if (MP.Navbar.myThis.currentViewMode !== 'editor') { //fix grid
                        MP.Navbar.myThis.showIframe('editor');
                    }
                },
                error: function(jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    if (error.debug) {
                        console.log(localStorage.getItem('templateSavingError'));
                    } else {
                        if (!error.message) {
                            MP.Flash.setFlash(localStorage.getItem('templateSavingError'), 'error');
                        } else {
                            MP.Flash.setFlash(error.message, 'error');
                        }
                    }
                    MP.Navbar.myThis.preload(false);
                }
            });
        },

        reset: function() {
            $.ajax({
                url: motopress.ajaxUrl,
                data: {
                    action: 'motopress_reset',
                    nonce: motopress.nonces.motopress_reset
                },
                type: 'POST',
                success: function(data) {
                    MP.Flash.setFlash(localStorage.getItem('themeReseted'), 'success');
                    MP.Navbar.myThis.loadIframe();
                },
                error: function(jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    if (error.debug) {
                        console.log(localStorage.getItem('errorReset'));
                    } else {
                        if (!error.message) {
                            MP.Flash.setFlash(localStorage.getItem('errorReset'), 'error');
                        } else {
                            MP.Flash.setFlash(error.message, 'error');
                        }
                    }
                    MP.Navbar.myThis.preload(false);
                }
            });
        },

        setPageTemplate: function(pageId, template) {
            $.ajax({
                url: motopress.ajaxUrl,
                data: {
                    action: 'motopress_set_page_template',
                    nonce: motopress.nonces.motopress_set_page_template,
                    pageId: pageId,
                    template: template
                },
                type: 'POST',
                success: function(data) {
                    $('#motopress-pages').find('option:selected').attr('data-template', template);
                    MP.Flash.setFlash(localStorage.getItem('templateLinked'), 'success');
                    MP.Navbar.myThis.loadIframe();
                },
                error: function(jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    if (error.debug) {
                        console.log(error.message);
                    } else {
                        MP.Flash.setFlash(error.message, 'error');
                    }
                    MP.Navbar.myThis.preload(false);
                }
            });
        },

        duplicateTemplate: function(pageId, templateToDuplicate, newTemplateName) {
            $.ajax({
                url: motopress.ajaxUrl,
                data: {
                    action: 'motopress_duplicate_template',
                    nonce: motopress.nonces.motopress_duplicate_template,
                    pageId: pageId,
                    templateToDuplicate: templateToDuplicate,
                    newTemplateName: newTemplateName
                },
                type: 'POST',
                success: function(data) {
                    MP.Flash.setFlash(localStorage.getItem('templateDuplicated'), 'success');
                    MP.Navbar.myThis.loadIframe();

                    data = JSON.parse(data);
                    $('#motopress-page-templates').next().remove();
                    var pageTemplatesClone = $('#motopress-page-templates').clone();
                    pageTemplatesClone.append(
                        $('<option />', {
                            'value': data.value,
                            'text': data.name
                        })
                    );
                    $('#motopress-page-templates').replaceWith(pageTemplatesClone);
                    pageTemplatesClone.find('[value="'+data.value+'"]').prop('selected', true);
                    MP.Utils.doSortSelectByText(pageTemplatesClone);
                    pageTemplatesClone.selectpicker({size: 10});
                    pageTemplatesClone.next().find('span.filter-option').text(data.name);
                    $('#motopress-pages').find('option:selected').attr('data-template', data.value);
                    MP.Navbar.myThis.duplicateModal.modal('hide');
                },
                error: function(jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    if (error.debug) {
                        console.log(error.message);
                    } else {
    //                    MP.Flash.setFlash(error.message, 'error');
                        MP.Utils.showValidationError(error.message, $('#motopress-new-template-name'));
                    }
                    MP.Navbar.myThis.preload(false);
                }
            });
        },

        loadIframe: function() {
            var selected = $('select#motopress-pages').find('option:selected');
            var selectedSrc = selected.val();
            this.setIframeSrc(selectedSrc);
            $('#motopress-page-template').html(selected.attr('data-template'));
        },

        makeShowHideBlocks: function(previewContent) {
            $('#motopress-show-hide-blocks').addClass('active').find('i').removeClass('motopress-icon-eye-close').addClass('motopress-icon-eye-open');
            $('#motopress-show-hide-blocks').find('span').text(localStorage.getItem('showHiddenBlocks'));
            this.hideHiddenBlocks(previewContent, true);

            var visibility = false;
            var toolsClone = null;
            var flag = false;

            previewContent.find('.container [class*="span"]:not([data-motopress-wrapper-type])').each(function() {
                if (!$(this).closest('.motopress-block-content').length) {
                    flag = false;
                    if (typeof $(this).attr('data-motopress-wrapper-type') != 'undefined') {
                        toolsClone = MP.Navbar.myThis.wrapperTools.clone();
                        flag = true;
                    } else if (!$(this).children('.row').length) {
                        toolsClone = MP.Navbar.myThis.blockTools.clone();
                        flag = true;
                    }

                    if (flag) {
                        visibility = MP.Navbar.myThis.getBlockVisibility($(this));
                        var showHideBtn = toolsClone.find('.motopress-show-hide-btn');
                        if (visibility) {
                            showHideBtn.removeClass('motopress-icon-eye-close').addClass('motopress-icon-eye-open');
                            showHideBtn.attr('title', localStorage.getItem('hideDevice'));
                        } else {
                            showHideBtn.removeClass('motopress-icon-eye-open').addClass('motopress-icon-eye-close');
                            showHideBtn.attr('title', localStorage.getItem('showDevice'));
                        }
                        $(this).append(toolsClone);
                        $(this).append(MP.Navbar.myThis.disableContentBlock.clone());
                        MP.Navbar.myThis.makeShowHideBtn(toolsClone);
                    }
                }
            });
            this.previewIframe[0].contentWindow.MP.previewTooltip.previewTooltip();
        },

        makeShowHideBtn: function(tools) {
            var btn = tools.find('.motopress-show-hide-btn');
            var block = tools.closest('[class*="span"]');
            tools.on('click', function() {
                var visibilityMode = $('#motopress-show-hide-blocks').find('i').hasClass('motopress-icon-eye-open');
                var btnTooltip = $('#motopress-preview-iframe').contents().find('body .tooltip > .tooltip-inner');
                if (btn.hasClass('motopress-icon-eye-open')) {
                    btn.removeClass('motopress-icon-eye-open').addClass('motopress-icon-eye-close');
                    MP.Navbar.myThis.writeDataUtitlity(block, 'hide');
                    btn.attr('data-original-title', localStorage.getItem('showDevice'));
                    btnTooltip.text(localStorage.getItem('showDevice'));
                    if (visibilityMode) MP.Navbar.myThis.hideSingleHiddenBlock(block);
                } else {
                    btn.removeClass('motopress-icon-eye-close').addClass('motopress-icon-eye-open');
                    MP.Navbar.myThis.writeDataUtitlity(block, 'show');
                    btn.attr('data-original-title', localStorage.getItem('hideDevice'));
                    btnTooltip.text(localStorage.getItem('hideDevice'));
                    if (visibilityMode) MP.Navbar.myThis.showSingleHiddenBlock(block);
                }
            });
        },

        writeDataUtitlity: function(block, mode) {
            var utilityStr = block.attr('data-motopress-responsive-utility');
            if (typeof(utilityStr) != 'undefined') {
                var utilityObj = JSON.parse(utilityStr);
                switch (mode) {
                    case 'show':
                        utilityObj['visible-' + this.currentViewMode] = false;
                        utilityObj['hidden-' + this.currentViewMode] = false;
                        break;
                    case 'hide':
                        utilityObj['visible-' + this.currentViewMode] = false;
                        utilityObj['hidden-' + this.currentViewMode] = true;
                        break;
                }
                utilityStr = JSON.stringify(utilityObj);
                block.attr('data-motopress-responsive-utility', utilityStr);
                this.iframe.contents()
                    .find('[data-motopress-block-id="'+block.attr('data-motopress-block-id')+'"]')
                    .attr('data-motopress-responsive-utility', utilityStr);
            }
        },

        getBlockVisibility: function(block) {
            var utilityStr = block.attr('data-motopress-responsive-utility');
            if (typeof(utilityStr) != 'undefined') {
                var utilityObj = JSON.parse(utilityStr);
                if (utilityObj['visible-' + this.currentViewMode]) {
                    return true;
                } else if (utilityObj['hidden-' + this.currentViewMode]) {
                    return false;
                }
            }
            return true;
        },

        hideHiddenBlocks: function(obj, mode) {
            var previewContent = null;
            if (mode) {
                previewContent = obj.contents().find('.container');
            } else {
                previewContent = obj.find('.container');
            }
            previewContent.find('[class*="span"]').each(function() {
    //            $(this).find('.motopress-tools, .motopress-layout-wrapper-tools').hide();
                var utilityStr = $(this).attr('data-motopress-responsive-utility');
                if (typeof(utilityStr) != 'undefined') {
                    var utilityObj = JSON.parse(utilityStr);
                    for (var name in utilityObj) {
                        if (utilityObj[name]) {
                            $(this).addClass(name);
                        }
                    }
                }
            });
        },

        hideSingleHiddenBlock: function(obj) {
            var utilityStr = obj.attr('data-motopress-responsive-utility');
            if (typeof(utilityStr) != 'undefined') {
                var utilityObj = JSON.parse(utilityStr);
                for (var name in utilityObj) {
                    if (utilityObj[name]) {
                        obj.addClass(name);
                    }
                }
            }
        },

        showHiddenBlocks: function(obj, mode) {
            var previewContent = null;
            if (mode) {
                previewContent = obj.contents().find('.container');
            } else {
                previewContent = obj.find('.container');
            }
            previewContent.find('[class*="span"]').each(function() {
    //            $(this).find('.motopress-tools, .motopress-layout-wrapper-tools').show();
                var utilityStr = $(this).attr('data-motopress-responsive-utility');
                if (typeof(utilityStr) != 'undefined') {
                    var utilityObj = JSON.parse(utilityStr);
                    for (var name in utilityObj) {
                        if ($(this).hasClass(name)) {
                            utilityObj[name] = true;
                            $(this).removeClass(name);
                        } else {
                            utilityObj[name] = false;
                        }
                    }
                    $(this).attr('data-motopress-responsive-utility', JSON.stringify(utilityObj));
                }
            });
        },

        showSingleHiddenBlocks: function(obj) {
            var utilityStr = obj.attr('data-motopress-responsive-utility');
            if (typeof(utilityStr) != 'undefined') {
                var utilityObj = JSON.parse(utilityStr);
                for (var name in utilityObj) {
                    if (obj.hasClass(name)) {
                        utilityObj[name] = true;
                        obj.removeClass(name);
                    } else {
                        utilityObj[name] = false;
                    }
                }
                obj.attr('data-motopress-responsive-utility', JSON.stringify(utilityObj));
            }
        },

        preload: function(flag) {
            if (flag) {
                this.preloader.show();
            } else {
                this.preloader.fadeOut('slow');
                MP.Flash.showMessage();
            }
        },

        showIframe: function(iframe) {
            if (iframe === 'editor') {
                this.previewIframeWrapper.hide();
                this.iframeWrapper.show();
            } else if (iframe === 'preview') {
                this.iframeWrapper.hide();
                this.previewIframeWrapper.show();
            }
        },

        getScrollbarWidth: function() {
            var scrollWidth = window.browserScrollbarWidth;
            if (typeof scrollWidth === 'undefined') {
                var div = $('<div style="width: 50px; height: 50px; position: absolute; left: -100px; top: -100px; overflow: auto;"><div style="width: 1px; height: 100px;"></div></div>');
                $('body').append(div);
                scrollWidth = div[0].offsetWidth - div[0].clientWidth;
                div.remove();
            }
            return scrollWidth;
        },

        showWelcomeWindow: function() {
            if (!this.welcomeWindowShown) {
                $('#motopress-welcome-modal').modal('show');
                this.welcomeWindowShown = true;
            }
        }

    })
});
steal( 'jquery/class', function($) {
   /**
    * @class MP.StaticEditor
    */
    $.Class('MP.StaticEditor',
    /** @Static */
    {
        myThis: null
    },
    /** @Prototype */
    {
        modal: null,
        modalStaticName: null,
        modalStaticContent: null,
        modalSave: null,
        editor: null,

        setup: function() {
            this.modal = $('#motopress-static-editor-modal');
            this.modalStaticName = $('#motopress-static-editor-modal #motopress-static-name');
            this.modalStaticContent = $('#motopress-static-editor-modal #motopress-static-content');
            this.modalSave = $('#motopress-static-editor-modal #motopress-save-static-content');

            this.modal.on('hide', this.proxy('hideModal'));
            this.modalSave.on('click', this.proxy('saveStaticContent'));
        },

        init: function() {
            MP.StaticEditor.myThis = this;

            this.modal.modal({
                'show': false
            });

            if (typeof tinyMCE.get('motopress-static-content') !== 'undefined') {
                this.editor = tinyMCE.get('motopress-static-content');
            }

            this.fixTBWindow();
        },

        saveStaticContent: function() {
            this.modalStaticName.val($.trim(this.modalStaticName.val()));
            var expr = new RegExp('^[^\*\/]{1,30}$', 'i');
            if (!expr.test(this.modalStaticName.val())) {
                MP.Utils.showValidationError(localStorage.getItem('validationName'), this.modalStaticName);
                return;
            }

            var staticName = this.modalStaticName.val();
            var staticFile = this.modalStaticName.attr('data-motopress-static-file');
            var isNew = false;
            if (staticFile == 'default') isNew = true;
            if (isNew) {
                var uniqid = MP.Utils.uniqid();
                staticFile = 'static/static-' + uniqid + '.php';
            }
            var arr = staticFile.split('/');
            var file = arr[1];

            if(!MP.Utils.inObject(staticName, MP.Iframe.window.MP.DragDrop.myThis.staticBlockList) || (MP.Utils.inObject(staticName, MP.Iframe.window.MP.DragDrop.myThis.staticBlockList) && MP.Iframe.window.MP.DragDrop.myThis.staticBlockList[file] == staticName)) {
                var activeMode = this.getActiveMode($('#wp-motopress-static-content-wrap').prop('class').split(' '));
                var staticContent = null;
                /*
                switch (activeMode) {
                    case 'tmce-active':
                        if (this.editor == null) {
                            this.editor = tinyMCE.get('motopress-static-content');
                        }
                        staticContent = this.editor.getContent();
                        break;
                    case 'html-active':
                        staticContent = this.modalStaticContent.val();
                        break;
                }
                */
                if (activeMode == 'tmce-active') {
                    switchEditors.switchto($('#motopress-static-content-html')[0]);
                }
                staticContent = this.modalStaticContent.val();

                $.ajax({
                    url: motopress.ajaxUrl,
                    data: {
                        action: 'motopress_save_static_content',
                        nonce: motopress.nonces.motopress_save_static_content,
                        staticName: staticName,
                        staticFile: staticFile,
                        staticContent: staticContent
                    },
                    dataType: 'html',
                    type: 'POST',
                    success: function(data) {
                        var editingSpan = $('[class*="span"][data-motopress-type="static"][data-motopress-editing="1"]', MP.Iframe.contents);
                        if (isNew) {
                            editingSpan.attr({
                                'data-motopress-id': uniqid,
                                'data-motopress-file': editingSpan.parent('.row').attr('data-motopress-file'),
                                'data-motopress-static-file': staticFile
                            });
                        }
                        editingSpan.find('.motopress-block-content:first').html(data);

                        MP.Iframe.window.MP.DragDrop.myThis.staticBlockList[file] = staticName;

                        var staticSpans = $('[class*="span"][data-motopress-type="static"]', MP.Iframe.contents);
                        staticSpans.each(function() {
                            var select = $(this).find('select.motopress-content-select');
                            var selectedOptionVal = select.find(':selected').val();
                            if (editingSpan[0] == $(this)[0]) selectedOptionVal = staticFile;
                            var option = null;
                            var selectClone = select.clone();
                            select.next().remove();

                            if (isNew) {
                                option = MP.Iframe.window.MP.Tools.myThis.contentOption.clone();
                                option.prop({
                                    value: staticFile,
                                    text: staticName
                                }).appendTo(selectClone);
//                                parent.MP.BootstrapSelect.appendOption(select, option);
                            } else {
                                option = selectClone.children('option[value="'+ staticFile +'"]');
                                option.text(staticName);
                                //parent.MP.BootstrapSelect.updateOptionText(option, staticName);

                                //option = select.children('option[value="'+ staticFile +'"]');
                                //parent.MP.BootstrapSelect.updateOptionText(option, staticName);
                            }

                            select.replaceWith(selectClone);
                            MP.Iframe.window.MP.Tools.myThis.changeStaticBlockType(selectClone);
//                            selectClone.find('[value="'+selectedOptionVal+'"]').prop('selected', true);
                            var defaultOption = selectClone.find('[value="default"]').detach();
                            MP.Utils.doSortSelectByText(selectClone);
                            selectClone.prepend(defaultOption);
                            selectClone.find('[value="'+selectedOptionVal+'"]').prop('selected', true);
                            selectClone.selectpicker({size: 10});

//                            if ($(this)[0] == editingSpan[0]) parent.MP.BootstrapSelect.setSelected(option);
                        });

                        MP.StaticEditor.myThis.modal.modal('hide');
                        MP.Flash.setFlash(localStorage.getItem('saveStaticContentSuccess'), 'success');
                        MP.Flash.showMessage();
                    },
                    error: function() {
                        MP.StaticEditor.myThis.modal.modal('hide');
                        MP.Flash.setFlash(localStorage.getItem('saveStaticContentError'), 'error');
                        MP.Flash.showMessage();
                    }
                });
            } else {
                MP.Utils.showValidationError(localStorage.getItem('staticNameExists'), this.modalStaticName);
            }
        },

        hideModal: function() {
            $('#TB_closeWindowButton').click();

            this.modalStaticName.closest('.modal-body').find('.motopress-validation-error').remove();

            this.modalStaticName.val('');
            this.modalStaticContent.val('');
            if (this.editor !== null) {
                this.editor.setContent('');
            }

            var editingSpan = $('[class*="span"][data-motopress-type="static"][data-motopress-editing="1"]', MP.Iframe.contents)
            editingSpan.removeAttr('data-motopress-editing');
        },

        getActiveMode: function(classes) {
            var expr = new RegExp('^(tmce|html)-active$', 'i');
            var activeMode = null;
            for(var i = 0; i < classes.length; i++) {
                if (expr.test(classes[i])) {
                    activeMode = classes[i];
                }
            }
            return activeMode;
        },

        fixTBWindow: function() {
            $('<style />', {
                text: '#TB_window {z-index: 1051;} #TB_overlay {display: none;}'
            }).appendTo('body');
        }
    })
});
