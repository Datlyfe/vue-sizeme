import {
  ref,
  onMounted,
  reactive,
  onUnmounted,
  Ref,
  toRefs
} from '@vue/composition-api'

export const useWithSize = (elementRef: Ref<Element>, onResize: Function) => {
  const state = reactive({
    width: (undefined as unknown) as number,
    height: (undefined as unknown) as number
  })
  const previous = ref({
    width: (undefined as unknown) as number,
    height: (undefined as unknown) as number
  })

  const resizeObserver = new ResizeObserver(entries => {
    if (!Array.isArray(entries) || !entries.length) {
      return
    }

    const entry = entries[0]
    const newWidth = Math.round(entry.contentRect.width)
    const newHeight = Math.round(entry.contentRect.height)
    if (
      previous.value.width !== newWidth ||
      previous.value.height !== newHeight
    ) {
      const newSize = { width: newWidth, height: newHeight }
      if (onResize && typeof onResize === 'function') {
        onResize(newSize)
      } else {
        previous.value.width = newWidth
        previous.value.height = newHeight
        state.width = newSize.width
        state.height = newSize.height
      }
    }
  })

  onMounted(() => {
    if (
      typeof elementRef !== 'object' ||
      elementRef === null ||
      !(elementRef.value instanceof Element)
    ) {
      return
    }
    resizeObserver.observe(elementRef.value)
  })

  onUnmounted(() => {
    resizeObserver.unobserve(elementRef.value)
  })

  return toRefs(state)
}

export default useWithSize
