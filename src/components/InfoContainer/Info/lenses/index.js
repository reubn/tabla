import ElectronicLens from './Electronic'

const lenses = [ElectronicLens]

export default element => lenses.reduce((active, Current) => {
  const inst = new Current(element)

  if(inst.test) return [...active, inst.component]

  return active
}, [])
