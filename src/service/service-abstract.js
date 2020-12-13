export default class ServiceAbstract {
  constructor() {
    if (this.constructor === ServiceAbstract) {
      // Error Type 1. Abstract class can not be constructed.
      throw new TypeError("Can not construct abstract class.");
    }
    //else (called from child)
    // Check if all instance methods are implemented.
    if (this.init === ServiceAbstract.prototype.foo) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError("Please implement abstract method foo.");
    }
  }
  // An abstract method.
  init() {
    // Error Type 6. The child has implemented this method but also called `super.init()`.
    throw new TypeError("Do not call abstract method from child.");
  }
}