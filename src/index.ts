import { useState, useEffect, Dispatch } from 'react'

export const store: { [key: string]: any } = {}
export const setStore = (key: string, value: any) => {
  const item = store[key]
  if (!item) return
  item.value = value
  item.ob.forEach((fn: Dispatch<any>) => fn(value))
}

export default (key: string): [any, (value: any) => void] => {
  const { value, ob, set } = store[key] || (store[key] = {
    value: null,
    ob: [],
    set: (value: any) => setStore(key, value)
  })

  const [state, setState] = useState(value)

  useEffect(() => {
    ob.push(setState)
    return () => ob.splice(ob.findIndex((fn: Dispatch<any>) => fn === setState), 1)
  }, [])

  return [state, set]
}
