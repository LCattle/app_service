require('./../../public/sass/module/findparts.scss');
import Header from './../../components/Header/Header';

(function($) {
    $('.pup').on('click', function () {
        $('.search-inp').addClass('show-inp');
    });
})(jQuery);