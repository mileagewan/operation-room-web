export default function useTimeInterval():any {
  const interval = (hook: () => any, times = 30000) => {
    setInterval(() => {
      try {
        hook()
      } catch (e) {
        console.log(e)
      }
    }, times)
  }

  return {
    interval
  }
}
