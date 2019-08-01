/**
 * TODO
 * 2. Support for private properties
 * 6. Handle function params
 * 7. Handle actions
*/

const path = require('path');
const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const { 
  methodComment,
  compComment,
  fieldComment,
  computedComment
}  = require('./utils/comments');


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
  'classNameBindings',
  'tagName'
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

      path.value.comments = [j.commentBlock(compComment(componentName), true)];

      let props =
        path.value.declaration.arguments[0].properties;

      props.forEach(p => {
        if(!IGNORE_PROPS.includes(p.key.name)) {
          const _valueType = p.value ? p.value.type : p.type;
          //console.log(_valueType);
          const valueType = VALUE_MAP[_valueType];


          if(p.value && p.value.type === "CallExpression" && p.value.callee.name === "computed") {
            p.comments = [j.commentBlock(computedComment(p.key.name, p.key.name), true)];
          } else if(_valueType === "ObjectMethod") {
            p.comments = [j.commentBlock(methodComment(p.key.name), true)];
          } else {
            p.comments = [j.commentBlock(fieldComment(p.key.name, p.key.name, valueType), true)];
          }
        }
      });
    })
    .toSource();
}
