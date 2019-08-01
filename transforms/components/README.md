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

**Input** (<small>[basic.input.js](transforms/docgen/__testfixtures__/basic.input.js)</small>):
```js
export default Component.extend({
  layout,

  classNames: ['accordion'],

  accordionState: null,

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
  }

});

```

**Output** (<small>[basic.output.js](transforms/docgen/__testfixtures__/basic.output.js)</small>):
```js
export default Component.extend({
  /**
  * The title of something
  *
  * @property layout
  * @type Identifier
  * @public
  */
  layout,

  /**
  * The title of something
  *
  * @property classNames
  * @type ArrayExpression
  * @public
  */
  classNames: ['accordion'],

  /**
  * The title of something
  *
  * @property accordionState
  * @type NullLiteral
  * @public
  */
  accordionState: null,

  /**
  * The title of something
  *
  * @property availabilityMessage
  * @type CallExpression
  * @public
  */
  availabilityMessage: computed('availability', function() {
    const availability = get(this, 'availability');

    return isPresent(availability) ? availability : 'Not yet available';
  }),

  /**
  * The title of something
  *
  * @property init
  * @type ObjectMethod
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
  * The title of something
  *
  * @property focusIn
  * @type ObjectMethod
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
  }

});

```
<!--FIXTURES_CONTENT_END-->