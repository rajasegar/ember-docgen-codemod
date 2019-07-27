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
