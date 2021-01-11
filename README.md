# useStore

## install
  yarn add @ovis/use-store

## use
```
  import useStore from '@ovis/use-store'

  const A = () => {
    const [state, set] = useStore('someKey')

    return <div onClick={() => set('Change From A')}>A{state}</div>
  }

  export default () => (
    <>
      <A />
      <A />
      <A />
    </>
  )
```
