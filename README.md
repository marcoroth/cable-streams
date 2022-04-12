# Cable Streams

Extend Turbo Stream with Custom Turbo Stream Actions or CableReady operations.

## Getting Started

```bash
yarn add cable-streams
```

```js
import * as Turbo from '@hotwired/turbo'
import CableReady from 'cable_ready'
import CableStreams from 'cable-streams'
```

## Adding Custom Turbo Stream Actions

You can define your own Turbo Stream actions on the `CableStreams.customActions` object.

```js
// IMPORTANT: make sure you are explicitly using the `function` keyword for defining your custom action in order to keep the right scope!

CableStreams.customActions.log = function() {
  console.log(this.templateContent)
}
```

Now if you insert a `<turbo-stream>` element into the DOM it will be picked up and processed by your custom action.

```html
<turbo-stream action="log" target="body">
  <template>
    This will be logged
  </template>
</turbo-stream>
```

Inside your custom action function you can assess the `targetElements` via `this.targetElements` which get determined by the `[target]` attribute on the `<turbo-stream>` element.

You can also access the content of the content of the `<template>` element within the `<turbo-stream>` via `this.templateContent`.


## Register CableReady operations as Turbo Stream Actions

You can register [all available CableReady operations](https://cableready.stimulusreflex.com/v/v5/reference/operations) as Turbo Stream Actions.

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

## Usage with Rails

There is a [Rails companion gem](https://github.com/marcoroth/cable-streams-rails) which ships view helpers for all CableReady operations. All options are identical to [the regular CableReady operations](https://cableready.stimulusreflex.com/v/v5/reference/operations).


### Installation

```bash
bundle add cable_streams
```

### Example

Here's the same example from above using the `console_log` operation:

```html+erb
<%= turbo_stream.console_log(message: "hello world") %>
```

Which renders to:
```html
<turbo-stream action="consoleLog" target="body">
  <template>
    [
      { "message": "hello world", "operation": "consoleLog" }
    ]
  </template>
</turbo-stream>
```
