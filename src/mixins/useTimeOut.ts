export default function useTimeOut():any {
  const latter = (hook: () => any, times = 300) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          hook()
        } catch (e) {
          console.log(e)
        }
        resolve(true)
      }, times)
    })
  }

  return {
    latter
  }
}
