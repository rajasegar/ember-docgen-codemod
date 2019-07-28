export default Component.extend({
  layout,

  /**
  * classNames
  *
  * @property classNames
  * @type array
  * @public
  */
  classNames: ['accordion'],

  /**
  * accordionState
  *
  * @property accordionState
  * @type null
  * @public
  */
  accordionState: null,

  /**
  * availabilityMessage
  *
  * @property availabilityMessage
  * @type function
  * @public
  */
  availabilityMessage: computed('availability', function() {
    const availability = get(this, 'availability');

    return isPresent(availability) ? availability : 'Not yet available';
  }),

  /**
  * init
  *
  * @property init
  * @type function
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
  * @property focusIn
  * @type function
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
