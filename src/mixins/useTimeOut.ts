export default function useTimeOut():any {
  const latter = (hook: () => any, times = 300) => {
    setTimeout(() => {
      try {
        hook()
      } catch (e) {
        console.log(e)
      }
    }, times)
  }

  return {
    latter
  }
}
