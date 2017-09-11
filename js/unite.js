(function($) {
    "use strict";
    $(document).ready(function() {

        const keynote = $('#keynote');
        keynote.hide();
        const showFn = () => keynote.show();
        const hideFn = () => keynote.hide();

        const keynoteLink = $('#ln_keynote');
        keynoteLink.hover(showFn, hideFn);

    })
})(jQuery);