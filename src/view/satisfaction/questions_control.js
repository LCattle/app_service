// widgetType 1.单选  2.多选  3.填写  4.下拉框
// widgetCode   控件编码
// widgetName	 控件名称
// valueName    答案
let controls = {
    _init: function (data) {
        if (!data || data.length <= 0) {
            alert('获取问卷信息异常！');
        } else {
            console.log(data);
            for (var item of data) {
                console.log(item);
                if (item.widgetType) {
                    let widgetType = item.widgetType;
                    // 题目是否为单选或者多选
                    if (widgetType == 1) {
                        
                    } else if (widgetType == 2) {

                    } else {
                        console.log('暂未操作!');
                    }
                }
                // 一级答案
                for (let an of item.answer) {
                    // 二级答案
                    if (an.answer) {
                        for (let suban of an.answer) {
                            console.log(suban.valueName);
                        }
                    }
                }
            }
        }
    },
    _singleSelection: function () {

    },
    _multiselect: function() {

    },
    _inputCause: function () {

    },
    _selectInput: function () {

    }

};

module.exports = controls;