![react](https://img.shields.io/badge/react-16.13.1-green.svg?style=flat-square)
![version](https://img.shields.io/badge/version-0.00.1-51b1c5.svg?style=flat-square)
![stage-0](https://img.shields.io/badge/ECMAScript-6-c55197.svg?style=flat-square)

# Color Stack Builder and other Goodies

![splash](./splash.png)
![splash](./splash2.png)
Some tools and things to build / consume and work on the design tokens from the USWDS - [USWDS](https://designsystem.digital.gov/design-tokens/color/overview/)

Current build is a simple theme color stack builder that lets you edit set amount of colors to match the USWDS color 'family' and it's grade values. These grade values translate to the luminance of each color for WCAG AA/AAA contrast accessibility. These stacks would then be used to override the default theme, and brand the USWDS for other divisions or groups/projects.

ToDo:

- Contrast checker for selected colors
- Import / Export of YAML and JSON files
- Component preview

## Run the example

Requires Node v12.xx.xx or greater

```bash
$ npm install
$ npm start
```

open http://localhost:2020/
