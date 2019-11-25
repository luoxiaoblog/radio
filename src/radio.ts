declare var $: any;


class Radio {
  label: string;
  value: any;
  disabled: boolean;
  radioTemplate: string;

  constructor(label: string, value: any, disabled: boolean, radioTemplate: string) {
    this.label = label;
    this.value = value;
    this.disabled = disabled;
    this.radioTemplate = radioTemplate;
  }
}

interface IRadioGroupOptions {
  name?: string;
  value?: any;
  radioGroup?: Radio[];
  radioTemplate?: string;
  disabled?: boolean;
}

class RadioGroup {
  name: string;
  value: any;
  radioGroup: Radio[];
  disabled: boolean;
  radioTemplate: string;
  element: any;

  constructor(element: any, options: IRadioGroupOptions) {
    this.name = options.name;
    this.value = options.value;
    this.radioGroup = options.radioGroup;
    this.disabled = options.disabled;
    this.radioTemplate = options.radioTemplate;
    this.element = this.createElement(element);
    this.initEvent();
  }

  createElement(element: any): Element {
    let obj = $(element).addClass('lyj-radio-group');
    this.radioGroup.forEach((item: Radio, i: number) => {
      $(this.radioTemplate).find('input[type=radio]').attr('value', item.value)
                            .end().find('.lyj-radio__label').text(item.label)
                            .end().appendTo(obj);
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
  disabled: false,
  radioTemplate: `
  <label role="radio" class="lyj-radio">
    <span class="lyj-radio__input">
      <span class="lyj-radio__inner"></span>
      <input type="radio" aria-hidden="true" tabindex="-1" class="lyj-radio__original" value="1">
    </span>
    <span class="lyj-radio__label"></span>
  </label>
  `
}