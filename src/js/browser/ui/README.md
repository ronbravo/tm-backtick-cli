
## Terms

These are the commone design concepts and terms at a high level. They provide a way to think about how to organize a component when creating it.

- basic (aka atom)
  - made up of only html element
- composite (aka molecule)
  - composite of basic elements
  - bulk of ui elements go here
  - NOTE: no analagy for organism
    - composites are either simple or complex
    - the line between the two can often be unclear
- layout - (aka template)
  - used by pages
  - defines the placement of composite items on a page
- view - (aka page)
  - the highest level of the displayed app or website
  - usually where a url route leads to
  - can be the app itself when self contained component for 3rd party distribution
  - variants will usually re-use a layout
- NOTE:
  - The above are just top level categories
  - It is ok to have sub-categories inside of the top level
    - useful for composite componenets which may grow large
  - use barrel files for top categories
    - isoloate or limit breakage on refactor or moving of components

## Naming

In compliance with the W3C Web Components defintion, component names need to be made up of two or more parts (ex: `my-component`). The idea will be to typically prefix the component with it's associated package in order to avoid name collisions. For exampled Tamed UI components will start with `tm-` and The TRG components would be `trg-`.

- tm-button
- tm-text-input
- tm-text-area
- trg-user-login
- trg-text-input

Components can also have a sub category or group in the name to help organize large component sets.

- tm-dashboard-button
- tm-dashboard-text-input

A `registerComponent ()` function or tooling could maybe be used to determine conflicts in nameing. Maybe even an option to provide an alternative name on conclict.

## Resources

- [Atomic Desgin](https://bradfrost.com/blog/post/atomic-web-design/#molecules)
- [Semantic UI](https://semantic-ui.com/introduction/glossary.html)
- [HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Atomic Design Alternatives](https://www.reddit.com/r/UXDesign/comments/16ugv25/what_are_alternatives_to_atomic_design_language/)
- [Dissecting the Disadvantages of Atomic Design in UI Design](https://medium.com/@martinezhillaryfrosh/dissecting-the-disadvantages-of-atomic-design-in-ui-design-8247e1c33f6f)
