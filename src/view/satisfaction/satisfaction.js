require('./../../public/sass/module/satisfaction.scss');
import Header from './../../components/Header/Header';
const questions = window.questions;
import Control from './questions_control';
Control._init(questions);


; (function ($) {
    $('.answer-txt-icon').unbind('click').on('click', function () {
        let self = this;
        let iconDom = $(self).children('.icon'),
            questionType = $(self).parents('.ques-item').find('.ques-txt').attr('data-type'),
            answerType = $(self).attr('data-type'),
            inpAnswerBox = $(self).siblings('.inp-cause-box'),
            selectAnswerBox = $(self).siblings('.select-items-box');
        if ($(self).hasClass('clicked')) {
            iconDom.removeClass('checked');
            $(self).removeClass('clicked');
            inpAnswerBox.slideUp(500);
            selectAnswerBox.slideUp(500);
            return;
        }
        $(self).addClass('clicked');
        // 设置ICON
        iconDom.addClass('checked');
        // 判断是否为单选多选（建议在渲染的时候添加类别）          
        if (questionType == 1) {
            console.log('单选');
            $(self).parents('.answer-box').find('.answer-txt-icon').children('.icon').removeClass('checked');
            $(self).parents('.answer-box').find('.answer-txt-icon').removeClass('clicked');
            iconDom.addClass('checked');
            $(self).addClass('clicked');
        } else if (questionType == 2) {
            // 多选
            iconDom.addClass('checked');
            $(self).addClass('clicked');
        }

        // 判断答案是否可以填写或者下拉
        if (answerType == 3){
            inpAnswerBox.slideDown(500);
        } else if (answerType == 4) {
            selectAnswerBox.slideDown(500);
            let selectInputDom = selectAnswerBox.find('.inp-cause');
            $('.select-item').unbind('click').on('click', function () {
                let that = this;
                let checkTxt = $(that).attr('data-txt');
                selectInputDom.val(checkTxt);
            });
        }

    });

})(jQuery);