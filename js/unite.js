(function($) {
    "use strict";
    $(document).ready(function() {

        let currOpenOverlay = undefined;
        const keynote = $('#keynote');
        const serverless = $('#serverless');
        const tbc = $('#TBC');
        const microservices = $('#microservices');
        const sessie5 = $('#sessieTomMichiel')
        const cqrs = $('#cqrs');
        const reactive = $('#reactive');

        const openOverlay = function(el) {
            if (currOpenOverlay) {
                currOpenOverlay.hide();
            }
            el.show();
            currOpenOverlay = el;
        }

        const closeoverlay = function(el) {
            el.hide();
            currOpenOverlay = undefined;
        }

        const keynoteCloseBtn = $('#keynote .closeoverlay');
        keynoteCloseBtn.click(() => closeoverlay(keynote));
        const keynoteLink = $('#ln_keynote');
        keynoteLink.click(() => openOverlay(keynote));

        const serverlessCloseBtn = $('#serverless .closeoverlay');
        serverlessCloseBtn.click(() => closeoverlay(serverless));
        const serverlessLink = $('#ln_serverless');
        serverlessLink.click(() => openOverlay(serverless));

        const tbcCloseBtn = $('#TBC .closeoverlay');
        tbcCloseBtn.click(() => closeoverlay(tbc));
        const tbcLink = $('#ln_tbc');
        tbcLink.click(() => openOverlay(tbc));

        const microservicesCloseBtn = $('#microservices .closeoverlay');
        microservicesCloseBtn.click(() => closeoverlay(microservices));
        const microservLink = $('#ln_microserv');
        microservLink.click(() => openOverlay(microservices));

        const sessie5CloseBtn = $('#sessieTomMichiel .closeoverlay');
        sessie5CloseBtn.click(() => closeoverlay(sessie5));
        const sessie5Link = $('#ln_sessie5');
        sessie5Link.click(() => openOverlay(sessie5));

        const cqrsCloseBtn = $('#cqrs .closeoverlay');
        cqrsCloseBtn.click(() => closeoverlay(cqrs));
        const cqrsLink = $('#ln_CQRS');
        cqrsLink.click(() => openOverlay(cqrs));

        const reactiveCloseBtn = $('#reactive .closeoverlay');
        reactiveCloseBtn.click(() => closeoverlay(reactive));
        const reactivelink = $('#ln_reactive');
        reactivelink.click(() => openOverlay(reactive));

    })
})(jQuery);