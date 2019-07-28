# ember-docgen-codemod


A collection of codemod's for ember-docgen-codemod.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-docgen-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-docgen-codemod
ember-docgen-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [docgen](transforms/docgen/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`