import { ref, watch, type ShallowRef } from 'vue'
import { useElementVisibility } from '@vueuse/core'

export const useInfiniteScroll = (target: Readonly<ShallowRef<HTMLDivElement | null>>) => {
  const page = ref(1)

  const targetIsVisible = useElementVisibility(target, {
    rootMargin: '0px 0px 100px 0px',
  })

  watch(targetIsVisible, () => {
    if (targetIsVisible.value) {
      page.value++
    }
  })

  return {
    page,
  }
}
