const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const VALUE_MAP = {
  'NullLiteral': 'null',
  'ArrayExpression': 'array',
  'CallExpression': 'function',
  'ObjectMethod': 'function'
};

const IGNORE_PROPS = ['layout'];

module.exports = function transformer(file, api) {
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
      let props =
        path.value.declaration.arguments[0].properties;
      props.forEach(p => {
        if(!IGNORE_PROPS.includes(p.key.name)) {
          const _valueType = p.value ? p.value.type : p.type;
          const valueType = VALUE_MAP[_valueType];
          let comment = `*
* ${p.key.name}
*
* @property ${p.key.name}
* @type ${valueType}
* @public
`;
          p.comments = [j.commentBlock(comment, true)];
        }
      });
    })
    .toSource();
}
