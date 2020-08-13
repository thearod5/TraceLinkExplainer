export function objectContainsKeys(
  requiredKeys: string[],
  obj?: object,
  log?: any
) {
  if (obj === undefined) return false;
  for (let requiredKeyIndex in requiredKeys) {
    let requiredKey: string = requiredKeys[requiredKeyIndex];
    if (!(requiredKey in obj)) {
      if (log) console.log(`Could not find key: ${requiredKey}`);
      return false;
    }
  }
  return true;
}
