import {
  ref,
  onMounted,
  reactive,
  onUnmounted,
  computed,
  Ref
} from '@vue/composition-api'

export interface IDimenstions{
  width:number,
  height:number
}

export interface IUseWithSizeParams{
  elementRef:Ref<Element>,
  onResize?:Function
}

const useWithSize = ({ elementRef, onResize } = {} as IUseWithSizeParams) => {
  const state = reactive({
      width: undefined,
      height: undefined
    } as unknown as  IDimenstions)
  const previous = ref({
    width: undefined,
    height: undefined
  } as unknown as IDimenstions)

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

  return computed(() => {
    return state
  })
}

export default useWithSize


