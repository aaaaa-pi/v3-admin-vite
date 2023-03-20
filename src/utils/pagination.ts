export function pagination(value: any, pageSize: number, List: any) {
  if (value) {
    const startIndex = (value - 1) * pageSize
    const endIndex = value * pageSize
    const newList = JSON.parse(JSON.stringify(List))
    const result = newList.slice(startIndex, endIndex)
    return result
  }
}
