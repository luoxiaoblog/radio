var Radio = (function () {
    function Radio(label, value, disabled, radioTemplate) {
        this.label = label;
        this.value = value;
        this.disabled = disabled;
        this.radioTemplate = radioTemplate;
    }
    return Radio;
}());
var RadioGroup = (function () {
    function RadioGroup(element, options) {
        this.name = options.name;
        this.value = options.value;
        this.radioGroup = options.radioGroup;
        this.disabled = options.disabled;
        this.radioTemplate = options.radioTemplate;
        this.element = this.createElement(element);
        this.initEvent();
    }
    RadioGroup.prototype.createElement = function (element) {
        var _this = this;
        var obj = $(element).addClass('lyj-radio-group');
        this.radioGroup.forEach(function (item, i) {
            $(_this.radioTemplate).find('input[type=radio]').attr('value', item.value)
                .end().find('.lyj-radio__label').text(item.label)
                .end().appendTo(obj);
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
    disabled: false,
    radioTemplate: "\n  <label role=\"radio\" class=\"lyj-radio\">\n    <span class=\"lyj-radio__input\">\n      <span class=\"lyj-radio__inner\"></span>\n      <input type=\"radio\" aria-hidden=\"true\" tabindex=\"-1\" class=\"lyj-radio__original\" value=\"1\">\n    </span>\n    <span class=\"lyj-radio__label\"></span>\n  </label>\n  "
};
//# sourceMappingURL=radio.js.map