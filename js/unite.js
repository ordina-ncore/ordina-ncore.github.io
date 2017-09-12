(function($) {
    "use strict";
    $(document).ready(function() {

        const keynote = $('#keynote');
        const serverless = $('#serverless');
        const tbc = $('#TBC');
        const microservices = $('#microservices');
        const sessie5 = $('#sessieTomMichiel')
        const cqrs = $('#cqrs');
        const reactive = $('#reactive');

        const keynoteLink = $('#ln_keynote');
        keynoteLink.hover(
            () => keynote.show(),
            () => keynote.hide()
        );


        const serverlessLink = $('#ln_serverless');
        serverlessLink.hover(
            () => serverless.show(),
            () => serverless.hide()
        );

        const tbcLink = $('#ln_tbc');
        tbcLink.hover(
            () => tbc.show(),
            () => tbc.hide()
        );

        const microservLink = $('#ln_microserv');
        microservLink.hover(
            () => microservices.show(),
            () => microservices.hide()
        );
        const cqrsLink = $('#ln_CQRS');
        cqrsLink.hover(
            () => cqrs.show(),
            () => cqrs.hide()
        )

        const sessie5Link = $('#ln_sessie5');
        sessie5Link.hover(
            () => sessie5.show(),
            () => sessie5.hide()
        )

        const reactivelink = $('#ln_reactive');
        reactivelink.hover(
            () => reactive.show(),
            () => reactive.hide()
        );

    })
})(jQuery);