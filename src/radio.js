var Radio = (function () {
    function Radio(label, value, disabled, radioTemplate) {
        this.label = label;
        this.value = value;
        this.disabled = disabled;
        this.radioTemplate = radioTemplate || "\n    <label role=\"radio\" class=\"lyj-radio\">\n      <span class=\"lyj-radio__input\">\n        <span class=\"lyj-radio__inner\"></span>\n        <input type=\"radio\" aria-hidden=\"true\" tabindex=\"-1\" class=\"lyj-radio__original\" value=\"1\">\n      </span>\n      <span class=\"lyj-radio__label\"></span>\n    </label>\n    ";
        this.element = this.createElement();
    }
    Radio.prototype.createElement = function () {
        return $(this.radioTemplate).find('input[type=radio]').attr('value', this.value)
            .end().find('.lyj-radio__label').text(this.label)
            .end();
    };
    return Radio;
}());
var RadioGroup = (function () {
    function RadioGroup(element, options) {
        this.checkedClass = 'is-checked';
        this.name = options.name;
        this.value = options.value;
        this.radioGroup = options.radioGroup.map(function (item, i) {
            return new Radio(item.label, item.value, item.disabled, item.radioTemplate);
        });
        this.disabled = options.disabled;
        this.element = this.createElement(element);
        this.initEvent();
    }
    RadioGroup.prototype.createElement = function (element) {
        var _this = this;
        var obj = $(element).addClass('lyj-radio-group');
        this.radioGroup.forEach(function (item, i) {
            if (_this.value === item.value) {
                item.element.addClass(_this.checkedClass)
                    .find('.lyj-radio__input')
                    .addClass(_this.checkedClass);
            }
            obj.append(item.element);
        });
        return obj[0];
    };
    RadioGroup.prototype.initEvent = function () {
    };
    return RadioGroup;
}());
$.fn.extend({
    'lyj_radiogroup': function (options) {
        var implementOptions = $.extend(true, {}, defaluts, options);
        this.each(function () {
            var el = $(this);
            if (el.data('radiogroup'))
                el.data('radiogroup').remove();
            el.data('radiogroup', new RadioGroup(el, implementOptions));
        });
        return this;
    }
});
var defaluts = {
    disabled: false
};
//# sourceMappingURL=radio.js.map