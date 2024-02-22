export const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
    (index: number) =>
      active && index === originalIndex
        ? {
            y: curIndex * 50 + y,
            scale: 1.1,
            zIndex: 1,
            shadow: 15,
            immediate: (key: string) => key === 'y' || key === 'zIndex'
          }
        : {
            y: order.indexOf(index) * 50,
            scale: 1,
            zIndex: 0,
            shadow: 1,
            immediate: false
          }
