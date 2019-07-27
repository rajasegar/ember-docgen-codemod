const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

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
      //console.log( path.value.declaration.arguments[0].properties);
      let props =
        path.value.declaration.arguments[0].properties;
      props.forEach(p => {
        //console.log(p);
        let comment = `*
* The title of something
*
* @property ${p.key.name}
* @type ${p.value ? p.value.type : p.type}
* @public
`;
        p.comments = [j.commentBlock(comment, true)];
      });
    })
    .toSource();
}
