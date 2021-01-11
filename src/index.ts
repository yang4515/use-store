import { useState, useEffect, useCallback, Dispatch } from 'react'

export const store: { [key: string]: any } = {}
export const setStore = (key: string, value: any) => {
  const item = store[key]
  if (!item) return
  item.value = value
  item.ob.forEach((fn: Dispatch<any>) => fn(value))
}

export default (key: string): [any, (value: any) => void] => {
  const item = store[key] || (store[key] = { value: null, ob: [] })
  const { value, ob } = item
  const [state, setState] = useState(value)
  const set = useCallback((value: any) => setStore(key, value), [])

  useEffect(() => {
    ob.push(setState)
    return () => {
      item.ob = ob.filter((fn: Dispatch<any>) => fn !== setState)
    }
  }, [])

  return [state, set]
}
