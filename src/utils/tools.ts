export function throttle(fn: () => void, wait: number) {
  let timer: NodeJS.Timeout | null = null
  return function (this: any) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments as any)
      timer = null
    }, wait)
  }
}
