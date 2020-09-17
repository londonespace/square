/*!
 * mmenu.js
 * mmenujs.com
 *
 * Copyright (c) Fred Heusschen
 * frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */

//	Core
import Mmenu from '../../../../node_modules/mmenu-js/dist/core/oncanvas/mmenu.oncanvas';

//	Core add-ons
import offcanvas from '../../../../node_modules/mmenu-js/dist/core/offcanvas/mmenu.offcanvas';
import screenReader from '../../../../node_modules/mmenu-js/dist/core/screenreader/mmenu.screenreader';
import scrollBugFix from '../../../../node_modules/mmenu-js/dist/core/scrollbugfix/mmenu.scrollbugfix';

//	Add-ons
import autoHeight from '../../../../node_modules/mmenu-js/dist/addons/autoheight/mmenu.autoheight';
import backButton from '../../../../node_modules/mmenu-js/dist/addons/backbutton/mmenu.backbutton';
import columns from '../../../../node_modules/mmenu-js/dist/addons/columns/mmenu.columns';
import counters from '../../../../node_modules/mmenu-js/dist/addons/counters/mmenu.counters';
import dividers from '../../../../node_modules/mmenu-js/dist/addons/dividers/mmenu.dividers';
import drag from '../../../../node_modules/mmenu-js/dist/addons/drag/mmenu.drag';
import dropdown from '../../../../node_modules/mmenu-js/dist/addons/dropdown/mmenu.dropdown';
import fixedElements from '../../../../node_modules/mmenu-js/dist/addons/fixedelements/mmenu.fixedelements';
import iconbar from '../../../../node_modules/mmenu-js/dist/addons/iconbar/mmenu.iconbar';
import iconPanels from '../../../../node_modules/mmenu-js/dist/addons/iconpanels/mmenu.iconpanels';
import keyboardNavigation from '../../../../node_modules/mmenu-js/dist/addons/keyboardnavigation/mmenu.keyboardnavigation';
import lazySubmenus from '../../../../node_modules/mmenu-js/dist/addons/lazysubmenus/mmenu.lazysubmenus';
import navbars from '../../../../node_modules/mmenu-js/dist/addons/navbars/mmenu.navbars';
import pageScroll from '../../../../node_modules/mmenu-js/dist/addons/pagescroll/mmenu.pagescroll';
import searchfield from '../../../../node_modules/mmenu-js/dist/addons/searchfield/mmenu.searchfield';
import sectionIndexer from '../../../../node_modules/mmenu-js/dist/addons/sectionindexer/mmenu.sectionindexer';
import setSelected from '../../../../node_modules/mmenu-js/dist/addons/setselected/mmenu.setselected';
import sidebar from '../../../../node_modules/mmenu-js/dist/addons/sidebar/mmenu.sidebar';
import toggles from '../../../../node_modules/mmenu-js/dist/addons/toggles/mmenu.toggles';

//	Wrappers
import angular from '../../../../node_modules/mmenu-js/dist/wrappers/angular/mmenu.angular';
import bootstrap from '../../../../node_modules/mmenu-js/dist/wrappers/bootstrap/mmenu.bootstrap';
import olark from '../../../../node_modules/mmenu-js/dist/wrappers/olark/mmenu.olark';
import turbolinks from '../../../../node_modules/mmenu-js/dist/wrappers/turbolinks/mmenu.turbolinks';
import wordpress from '../../../../node_modules/mmenu-js/dist/wrappers/wordpress/mmenu.wordpress';

Mmenu.addons = {
    //	Core add-ons
    offcanvas,
    screenReader,
    scrollBugFix,

    //	Add-ons
    autoHeight,
    backButton,
    columns,
    counters,
    dividers,
    drag,
    dropdown,
    fixedElements,
    iconbar,
    iconPanels,
    keyboardNavigation,
    lazySubmenus,
    navbars,
    pageScroll,
    searchfield,
    sectionIndexer,
    setSelected,
    sidebar,
    toggles
};

//	Wrappers
Mmenu.wrappers = {
    angular,
    bootstrap,
    olark,
    turbolinks,
    wordpress
};

//  Export module
export default Mmenu;

//	Global namespace
if (window) {
    window.Mmenu = Mmenu;
}

//	jQuery plugin
(function($) {
    if ($) {
        $.fn.mmenu = function(options, configs) {
            var $result = $();

            this.each(function(e, element) {
                //	Don't proceed if the element already is a mmenu.
                if (element.mmApi) {
                    return;
                }

                var menu = new Mmenu(element, options, configs),
                    $menu = $(menu.node.menu);

                //	Store the API for backward compat.
                $menu.data('mmenu', menu.API);

                $result = $result.add($menu);
            });

            return $result;
        };
    }
})(window.jQuery || window.Zepto || null);
