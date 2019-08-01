# docgen


## Usage

```
npx ember-docgen-codemod docgen path/of/files/ or/some**/*glob.js

# or

yarn global add ember-docgen-codemod
ember-docgen-codemod docgen path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/components/__testfixtures__/basic.input.js)</small>):
```js
export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['accordion'],

  attributeBindings: ['attr1', 'attr2'],

  classNameBindings: ['active','inactive'],

  accordionState: null,

  _myprivate: null,

  availabilityMessage: computed('availability', function() {
    const availability = get(this, 'availability');

    return isPresent(availability) ? availability : 'Not yet available';
  }),

  init() {
    this._super(...arguments);

    const {
      'accordionState.registerIndex': registerIndex,
      accordionItemIndex,
      status,
      statuses,
    } = getProperties(this, [
      'accordionState.registerIndex',
      'accordionItemIndex',
      'status',
      'statuses',
    ]);
    const statusObject = A(statuses).findBy('status', status);

    setProperties(this, {
      statusLabel: statusObject.label,
      statusIcon: statusObject.icon,
      statusTextColor: statusObject.color,
    });

    registerIndex(accordionItemIndex);
  },

  focusIn() {
    const {
      accordionItemIndex,
      'accordionState.setFocusIndex': setFocusIndex,
    } = getProperties(this, [
      'accordionItemIndex',
      'accordionState.setFocusIndex',
    ]);

    setFocusIndex(accordionItemIndex);
  },

  _privateMethod() {
    console.log('hello');
  }

});

```

**Output** (<small>[basic.output.js](transforms/components/__testfixtures__/basic.output.js)</small>):
```js
/**
  Basic.input Usage:
  @class Basic.input
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,

  tagName: 'span',

  classNames: ['accordion'],

  attributeBindings: ['attr1', 'attr2'],

  classNameBindings: ['active','inactive'],

  /**
  * accordionState
  *
  * @field accordionState
  * @type null
  * @public
  */
  accordionState: null,

  /**
  * _myprivate
  *
  * @field _myprivate
  * @type null
  * @private
  */
  _myprivate: null,

  /**
  * availabilityMessage
  *
  * @computed availabilityMessage
  */
  availabilityMessage: computed('availability', function() {
    const availability = get(this, 'availability');

    return isPresent(availability) ? availability : 'Not yet available';
  }),

  /**
  * init
  *
  * @method init
  * @public
  */
  init() {
    this._super(...arguments);

    const {
      'accordionState.registerIndex': registerIndex,
      accordionItemIndex,
      status,
      statuses,
    } = getProperties(this, [
      'accordionState.registerIndex',
      'accordionItemIndex',
      'status',
      'statuses',
    ]);
    const statusObject = A(statuses).findBy('status', status);

    setProperties(this, {
      statusLabel: statusObject.label,
      statusIcon: statusObject.icon,
      statusTextColor: statusObject.color,
    });

    registerIndex(accordionItemIndex);
  },

  /**
  * focusIn
  *
  * @method focusIn
  * @public
  */
  focusIn() {
    const {
      accordionItemIndex,
      'accordionState.setFocusIndex': setFocusIndex,
    } = getProperties(this, [
      'accordionItemIndex',
      'accordionState.setFocusIndex',
    ]);

    setFocusIndex(accordionItemIndex);
  },

  /**
  * _privateMethod
  *
  * @method _privateMethod
  * @private
  */
  _privateMethod() {
    console.log('hello');
  }

});

```
<!--FIXTURES_CONTENT_END-->