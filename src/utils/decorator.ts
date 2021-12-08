export const Timeout = (time = 300) => {
  return (target: any, name: string, decorators: any) => {
    const { value } = decorators;
    decorators.value = function(...p:any) {
      setTimeout(() => {
        value.apply(this, ...p)
      }, time)
    };
    return decorators;
  };
}
