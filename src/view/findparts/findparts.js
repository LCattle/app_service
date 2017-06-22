require('./../../public/sass/module/findparts.scss');
import Header from './../../components/Header/Header';
Header.HeaderInit('配件查询');
(function($) {
    console.log('========');
    $('.type-item').unbind('click').on('click', function () {
        let _t = $(this);
        console.log('----');
        let checkIconDom = _t.children('.is-checked');
        if (checkIconDom.hasClass('checked')) {
            checkIconDom.removeClass('checked');
            return;
        }
        checkIconDom.addClass('checked');
        _t.siblings('.type-item').children('.is-checked').removeClass('checked');
    });


    $('.pup').on('click', function () {
        $('.search-inp').addClass('show-inp');
    });
})(jQuery);