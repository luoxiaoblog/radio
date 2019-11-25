declare var $: any;


class Radio {
  label: string;
  value: any;
  disabled: boolean;
  radioTemplate: string;
  element: any;

  constructor(label: string, value: any, disabled: boolean, radioTemplate: string) {
    this.label = label;
    this.value = value;
    this.disabled = disabled;
    this.radioTemplate = radioTemplate ||  `
    <label role="radio" class="lyj-radio">
      <span class="lyj-radio__input">
        <span class="lyj-radio__inner"></span>
        <input type="radio" aria-hidden="true" tabindex="-1" class="lyj-radio__original" value="1">
      </span>
      <span class="lyj-radio__label"></span>
    </label>
    `;
    this.element = this.createElement();
  }

  createElement() {
    return $(this.radioTemplate).find('input[type=radio]').attr('value', this.value)
          .end().find('.lyj-radio__label').text(this.label)
          .end();
  }
}

interface IRadioGroupOptions {
  name?: string;
  value?: any;
  radioGroup?: Radio[];
  disabled?: boolean;
}

class RadioGroup {
  name: string;
  value: any;
  radioGroup: Radio[];
  disabled: boolean;
  element: any;
  checkedClass: string = 'is-checked';

  constructor(element: any, options: IRadioGroupOptions) {
    this.name = options.name;
    this.value = options.value;
    this.radioGroup = options.radioGroup.map((item: any, i) => {
      return new Radio(item.label, item.value, item.disabled, item.radioTemplate);
    });
    this.disabled = options.disabled;
    this.element = this.createElement(element);
    this.initEvent();
  }

  createElement(element: any): Element {
    let obj = $(element).addClass('lyj-radio-group');
    this.radioGroup.forEach((item: Radio, i: number) => {
      if (this.value === item.value) {
        item.element.addClass(this.checkedClass)
                    .find('.lyj-radio__input')
                    .addClass(this.checkedClass);
      }
      obj.append(item.element);
    });
    return obj[0];
  }

  initEvent(): void {

  }
}

$.fn.extend({
  'lyj_radiogroup': function(options: IRadioGroupOptions){
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


let defaluts: IRadioGroupOptions = {
  disabled: false
}