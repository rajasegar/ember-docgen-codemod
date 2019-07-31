const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const path = require('path');

const VALUE_MAP = {
  'NullLiteral': 'null',
  'ArrayExpression': 'array',
  'CallExpression': 'function',
  'ObjectMethod': 'function'
};

const IGNORE_PROPS = ['layout'];

module.exports = function transformer(file, api) {
  const capitalize = n => n.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  const componentName = capitalize(path.basename(file.path, '.js'));
  const j = getParser(api);
  const options = getOptions();

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
          const valueType = VALUE_MAP[_valueType];
          let comment = `*
* ${p.key.name}
*
* @field ${p.key.name}
* @type ${valueType}
* @public
`;
          p.comments = [j.commentBlock(comment, true)];
        }
      });
    })
    .toSource();
}
