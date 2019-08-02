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
  *
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
  * @param {any} param1
  * @param {any} param2
  */
  focusIn(param1, param2) {
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
  *
  */
  _privateMethod() {
    console.log('hello');
  },

  actions: {
    /**
    * setActiveItem
    *
    * @method setActiveItem
    * @public
    * @param {any} accordionItemIndex
    */
    setActiveItem(accordionItemIndex) {
      return set(this, 'activeItem', accordionItemIndex);
    },

    /**
    * setFocusIndex
    *
    * @method setFocusIndex
    * @public
    * @param {any} accordionItemIndex
    */
    setFocusIndex(accordionItemIndex) {
      set(this, 'focusIndex', accordionItemIndex);
    },

    /**
    * registerIndex
    *
    * @method registerIndex
    * @public
    * @param {any} accordionItemIndex
    */
    registerIndex(accordionItemIndex) {
      get(this, 'accordionItemIndexes').push(accordionItemIndex);
    },
  }

});
