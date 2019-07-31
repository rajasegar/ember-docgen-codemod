/**
 * TODO
 * 2. Support for private properties
 * 3. Ignore tagName props
 * 4. Refactor different comments - move them to functions
 * 5. Change transform name to components
*/

const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const path = require('path');

const VALUE_MAP = {
  'NullLiteral': 'null',
  'ArrayExpression': 'array',
  'CallExpression': 'function',
  'ObjectMethod': 'function'
};

const IGNORE_PROPS = [
  'layout',
  'classNames',
  'attributeBindings',
  'classNameBindings'
];

module.exports = function transformer(file, api) {

  const j = getParser(api);
  const options = getOptions();

  // Ignore non-js files
  if(path.extname(file.path) !== '.js') {
    return;
  }

  const capitalize = n => n.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  const componentName = capitalize(path.basename(file.path, '.js'));

  return j(file.source)
    .find(j.ExportDefaultDeclaration, {
      declaration: {
        callee: {
          object: { name: "Component" },
          property: { name: "extend" }
        }
      }
    })
    .forEach(path => {
      const compComment = `*
  ${componentName} Usage:
  @class ${componentName}
  @namespace Components
  @extends Ember.Component
  @public
`;
      path.value.comments = [j.commentBlock(compComment, true)];
      let props =
        path.value.declaration.arguments[0].properties;
      props.forEach(p => {
        if(!IGNORE_PROPS.includes(p.key.name)) {
          const _valueType = p.value ? p.value.type : p.type;
          //console.log(_valueType);
          const valueType = VALUE_MAP[_valueType];
          let fieldComment = `*
* ${p.key.name}
*
* @field ${p.key.name}
* @type ${valueType}
* @public
`;

          const computedComment = `*
* ${p.key.name}
*
* @computed ${p.key.name}
`;

          const methodComment = `*
* ${p.key.name}
*
* @method ${p.key.name}
* @public
`;
          if(p.value && p.value.type === "CallExpression" && p.value.callee.name === "computed") {
            p.comments = [j.commentBlock(computedComment, true)];
          } else if(_valueType === "ObjectMethod") {
            p.comments = [j.commentBlock(methodComment, true)];
          } else {
            p.comments = [j.commentBlock(fieldComment, true)];
          }
        }
      });
    })
    .toSource();
}
