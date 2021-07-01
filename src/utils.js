export function serialize(obj, prefix) {
  return Object.entries(obj)
    .map(entry => {
      const [key, val] = entry
      const k = prefix ? prefix + '[' + key + ']' : key
      return val !== null && typeof val === 'object'
        ? serialize(val, k)
        : `${encodeURIComponent(k)}=${encodeURIComponent(val)}`
    })
    .join('&')
}
