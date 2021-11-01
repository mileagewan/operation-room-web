export default class Localstorage {
  get(key: string): string {
    return localStorage.getItem(key) as string || '';
  }

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
