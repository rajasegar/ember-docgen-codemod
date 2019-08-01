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
  }

});
