export function objectContainsKeys (
  requiredKeys: string[],
  obj?: object,
  log?: any
) {
  if (obj === undefined) return false
  for (const requiredKeyIndex in requiredKeys) {
    const requiredKey: string = requiredKeys[requiredKeyIndex]
    if (!(requiredKey in obj)) {
      if (log) console.error(`Could not find key: ${requiredKey}`)
      return false
    }
  }
  return true
}
