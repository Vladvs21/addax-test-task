export function getData<T>(url: string): Promise<T> {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data as T);
}

export const dateToStandartFormat = (date: number) => {
  return `${date < 9 ? `0${date + 1}` : date + 1}`
}