# next

main changes:

- Extract template engine as `ReForge` from `Reface`
- Stay in `Reface`: `Reface`, `islands` and `partials`
- Create `ReStory` as a new project for storybook
- Create `Reface UI` as a new project for UI components
- update source structure to monorepo style in `source` folder
- cli: select free port

todo:

- styled: seporate `css` as template tag function from `styled`
- styled: allow customization any of tag Template
- template: always normalize raw children
- jsx: fix escape issue for unsafe html

## Reface

**fixed**

- **ErrorScreen**: strip ansi code from error message

## Recast

- added `test-utils` for testing `recast` templates

**fixed**

- **Styled**: fix css parser for `&::` selector

## Reface UI

## ReStory
