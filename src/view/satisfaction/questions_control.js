// widgetType 1.单选  2.多选  3.填写  4.下拉框
// widgetCode   控件编码
// widgetName	 控件名称
// valueName    答案
let controls = {
    _init: function (data) {
        const _t = this || controls;
        if (!data || data.length <= 0) {
            alert('获取问卷信息异常, 请重新刷新页面！');
        } else {
            let id = 0,
                tempItem = {},
                letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
                chooseType = '';
            for (var i = 0; i < data.length; i++) {
                tempItem = data[i];
                if (tempItem.widgetType) {
                    let widgetType = tempItem.widgetType;
                    // 题目是否为单选或者多选
                    if (widgetType == 1) {
                        id = 1;
                        chooseType = '单选题';
                    } else if (widgetType == 2) {
                        id = 2;
                        chooseType = '多选题';
                    } else {
                        console.log('暂未操作!');
                    }
                }

                let answers = tempItem.answer,
                    answersItem = {},
                    number = '',
                    subAnswerHtml = '',
                    sInputHtml = '',
                    answerHtml = '',
                    twoLevelAnswerCode = '';
                // 一级答案
                for (let j = 0; j < answers.length; j++) {
                    // 二级答案
                    number = letters[j];
                    answersItem = answers[j];
                    if (answersItem.answer) {
                        for (let k = 0; k < answersItem.answer.length; k++) {
                            sInputHtml += `<span class="select-item" data-txt="${answersItem.answer[k].valueName}">${letters[k]}、${answersItem.answer[k].valueName}</span>`
                        }
                        // 填充下拉输入框
                        answerHtml = _t._selectInput(sInputHtml)
                    } else {
                        // 填充输入框
                        answerHtml = _t._inputCause();
                    }
                    twoLevelAnswerCode = answersItem.widgetCode ? answersItem.widgetCode : null;
                    subAnswerHtml += _t._answer(answersItem.widgetType, number, twoLevelAnswerCode, answersItem.valueName, answerHtml);


                }
                // 题目数据填充
                let quseItem = _t._quseItem(id, (i + 1), tempItem.widgetCode, tempItem.widgetName, chooseType, subAnswerHtml);
                $('.ques-items-box').append(quseItem);
                subAnswerHtml = null;
                _t._initEvent();
                _t._submitData();
            }
        }
    },
    /**
     * 其它： 添加输入框
     */
    _inputCause: function () {
        return `
            <p class="inp-cause-box select-inp-box hide">
                <input class="inp-cause" type="text" placeholder="请填写其他原因">
            </p>
        `;
    },
    /**
     * 其他： 添加下拉输入框
     */
    _selectInput: function (itemsHtml) {
        return `
            <div class="select-items-box select-inp-box hide">
                <span class="select-inp-item ">
                    <input class="inp-cause" type="text" placeholder="请选择或者填写不满意原因">
                    <span class="select-icon"></span>
                </span>
                <div class="slide-box hide">
                    ${ itemsHtml}
                </div>
            </div>
        `;
    },
    /**
     * 添加一级答案
     */
    _quseItem: function (type, idx, code, quseTip, chooseType, answer_html) {
        return `
            <li class="ques-item" data-type="${ type ? type : ''}">
                <span class="ques-txt" data-code="${ code ? code : ''}" data-type="${type ? type : ''}" > ${idx}、 ${quseTip}?（${ chooseType }） </span>
                <div class="answer-box">
                        ${ answer_html}
                </div>
            </li>       
        `;
    },
    /**
     * 添加二级答案
     */
    _answer: function (subId, orderNumber, code, answerTxt, otherAnswer) {
        return `
        <div class="answer-item-box">
            <span class="answer-txt-icon" data-code="${ code ? code : ''}" data-type="${subId ? subId : ''}">
                <span class="icon"></span>
                <span class="answer-txt" data-txt="${ answerTxt}">${orderNumber}.${answerTxt}</span>
            </span>
             ${ otherAnswer}
            </div>
        `;
    },
    _initEvent: function () {
        $('.answer-txt-icon').unbind('click').on('click', function () {
            let self = this;
            let iconDom = $(self).children('.icon'),
                questionType = $(self).parents('.ques-item').find('.ques-txt').attr('data-type'),
                answerType = $(self).attr('data-type'),
                inpAnswerBox = $(self).siblings('.inp-cause-box'),
                selectAnswerBox = $(self).siblings('.select-items-box'),
                parentsBox = $(self).parents('.ques-item');
            if ($(self).hasClass('clicked')) {
                iconDom.removeClass('checked');
                $(self).removeClass('clicked');
                 parentsBox.removeClass('answer-checked');
                inpAnswerBox.slideUp(500);
                selectAnswerBox.slideUp(500);
                return;
            }
            $(self).addClass('clicked');
            parentsBox.addClass('answer-checked');
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
            if (answerType == 3) {
                inpAnswerBox.slideDown(500);
            } else if (answerType == 4) {
                selectAnswerBox.slideDown(500);
                $('.select-icon').unbind('click').on('click', function () {
                    if ($(this).hasClass('click-end')) {
                        selectAnswerBox.children('.slide-box').slideUp(500);
                        $(this).removeClass('click-end');
                        return;
                    }
                    $(this).addClass('click-end');
                    selectAnswerBox.children('.slide-box').slideDown(500);
                })
                let selectInputDom = selectAnswerBox.find('.inp-cause');
                selectAnswerBox.children('.slide-box').children('.select-item').unbind('click').on('click', function () {
                    let that = this;
                    let checkTxt = $(that).attr('data-txt');
                    selectInputDom.val(checkTxt);
                });
            }

        });
    },
    _submitData: function () {
        $('.submit-btn').unbind('click').on('click', function () {
            let quesItems = $('.ques-item');
            let isSubmit = false;
            quesItems.each(function () {
                let _it = $(this);
                if (_it.hasClass('answer-checked')) {
                    isSubmit = true;
                } else {
                    isSubmit = false;
                }
            })
            if (!isSubmit) {
                alert('抱歉，所有题目都为必填！');
                return;
            }
            let answers = {
            examCode: 'aaaaa',
            answers: []
        };
            // 获取编号 答案
            // 获取子编号 答案
            let quesItemBox = $('.ques-item');
            /*quesItemBox.each(function () {
                const _q = $(this);

            });*/
            // 单选
            let code = '', valName = '';
            quesItemBox.find('.ques-txt[data-type="1"]').each(function () {
                const _s = $(this);
                code = _s.attr('data-code');
                valName = '';
               // valName = quesItemBox.find('span.clicked').children('.answer-txt').attr('data-txt');
               valName = _s.siblings('.answer-box').children('.answer-item-box')
                                .children('.clicked').children('.answer-txt').attr('data-txt');
                if (valName) {
                    answers.answers.push({
                        widgetCode: code,
                        valueName: valName
                    });
                }
            });
            // 多选 
            quesItemBox.find('.ques-txt[data-type="2"]').each(function () {
                const _q = $(this);
                code = _q.attr('data-code');
                valName = '';
                console.log('333333');
                _q.siblings('.answer-box').find('.clicked').each(function () {
                    valName = valName + $(this).children('.answer-txt').attr('data-txt') + '&';
                });
                valName = valName.lastIndexOf('&') != -1 ? valName.substr(0, valName.lastIndexOf('&')) : valName;
                if (valName) {
                    answers.answers.push({
                        widgetCode: code,
                        valueName: valName
                    });
                }
            });

            // 下拉填写
            
            quesItemBox.find('.answer-item-box').find('.clicked').each(function () {
                let _c = $(this);
                code = _c.attr('data-code');
                if (code) {
                    valName = '';
                    valName = _c.siblings('.select-inp-box').find('.inp-cause').val();
                    if (valName) {
                        answers.answers.push({
                            widgetCode: code,
                            valueName: valName
                        });
                    }
                }
            });
            console.log(answers.answers);
            $.ajax({
                url: 'http://mall1.coolpad.com/questionnaire/submit.html',
                data: answers,
                dataType: 'JSON',
                type: 'POST',
                success: function (data) {
                    if (data.code == 200) {
                        alert('提交问卷成功，谢谢参与！');
                    } else {
                        alert('提交问卷失败！');
                    }
                },
                error: function (err) {

                }
            });
        });
    }

};

module.exports = controls;