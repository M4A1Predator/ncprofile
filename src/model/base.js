export default class Base {
    instance(obj) {
        obj && Object.assign(this, obj);
    }
}