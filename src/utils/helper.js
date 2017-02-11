export default class Helper {
    static getSelectorName(selectorStr) {
        return selectorStr.replace(/^(\.|#)/g, '');
    }
}