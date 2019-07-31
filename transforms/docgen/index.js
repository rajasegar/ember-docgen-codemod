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
  'classNames'
];

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
* @computed
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
