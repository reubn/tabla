export default class Lens {
  constructor(element){
    this.element = element
  }

  get key(){
    return this.constructor.name
  }
}
