# vue-sizeme

A Vue3 hook that uses Vue's composition api to make components aware of their width and height.

## Installation

At this point in time Vue version 3 is not released yet so you have to use the [Vue composition api plugin](https://github.com/vuejs/composition-api) in order for this to work.

```sh
yarn add @vue/composition-api vue-sizeme
```

```javascript
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```

The useWithSize hook takes an element ref as the first argument.


```js
<template>
  <div ref="root">
    {{size}}
  </div>
</template>

<script>
import { useWithSize } from 'vue-sizeme'
import { ref } from '@vue/composition-api'
export default {
  setup() {
    const root = ref(null)
    const size = useWithSize(root)

    // size => {width,height}
    return {
      root,
      size
    }
  }
}
</script>
```
