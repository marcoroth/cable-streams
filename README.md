# Cable Streams

Extend Turbo Stream with Custom Turbo Stream Actions or CableReady operations.

## Getting Started

```bash
yarn add cable-streams
```

```js
import CableStreams from 'cable-streams'
```

## Adding Custom Turbo Stream Actions

You can define your own Turbo Stream actions on the `window.CustomTurboStreamActions` object.

```js
window.CustomTurboStreamActions.log = function() {
  console.log(this.templateContent)
}
```

Now if you insert a `turbo-stream` into the DOM it will be picked up and processed by your custom action.

```html
<turbo-stream action="log">
  <template>
    This will be logged
  </template>
</turbo-stream>
```

## Register CableReady operations as Turbo Stream Actions

You can register all available CableReady operations as Turbo Stream Actions.

```js
CableStreams.registerCableReadyOperations()
```

Now you can use any CableReady operations serialized as JSON in the `<template>` tag.

For example:

```html
<turbo-stream action="consoleLog">
  <template>
    { "message": "Hello from CableReady", "operation": "consoleLog" }
  </template>
</turbo-stream>
```

You can also leave out the `operation` option in the CableReady operation object, since it's already present on the `<turbo-stream>` element.

```html
<turbo-stream action="consoleLog">
  <template>
    { "message": "Hello from CableReady without the operation key" }
  </template>
</turbo-stream>
```

It also works with multiple operations, passed in as an array.

```html
<turbo-stream action="consoleLog">
  <template>
    [
      { "message": "Message 1" },
      { "message": "Message 2" }
    ]
  </template>
</turbo-stream>
```