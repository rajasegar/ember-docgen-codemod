
function methodComment(name) {
return `*
* ${name}
*
* @method ${name}
* @public
`;
}

const compComment = (componentName) => `*
  ${componentName} Usage:
  @class ${componentName}
  @namespace Components
  @extends Ember.Component
  @public
`;

const fieldComment = (description, name, type) => `*
* ${description}
*
* @field ${name}
* @type ${type}
* @public
`;

const computedComment = (description, name) => `*
* ${description}
*
* @computed ${name}
`;

module.exports =  { 
  methodComment, 
  compComment,
  fieldComment,
  computedComment
};
