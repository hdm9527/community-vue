export function getQuery(name) {
  const url = new URL(location.href)
  const value = url.searchParams.get(name)
  return value === null ? '' : value
}
