/**
 * Event implementation for internal usage
 */
export default class Event {

    /**
     *
     * @param {string} [type]
     * @param {boolean} [bubbles]
     * @param {boolean} [cancelable]
     * @param {*} [target]
     */
    constructor(type, bubbles, cancelable, target) {
        this._type = type;
        this._bubbles = bubbles;
        this._cancelable = cancelable;
        this._defaultPrevented = false;
        this._target = target;
    }

    /**
     * @returns void
     */
    stopPropagation() {
        this._bubbles = false;
    }

    preventDefault() {
        this._defaultPrevented = true;
    }

    /**
     *
     * @returns {boolean}
     */
    get bubbles() {
        return this._bubbles;
    }

    /**
     *
     * @returns {boolean}
     */
    get cancelable() {
        return this._cancelable;
    }

    /**
     *
     * @returns {boolean}
     */
    get composed() {
        return false;
    }

    /**
     *
     * @returns {*}
     */
    get currentTarget() {
        return this.target;
    }

    /**
     *
     * @returns {boolean}
     */
    get defaultPrevented() {
        return this._defaultPrevented;
    }

    /**
     *
     * @returns {string}
     */
    get eventPhase() {
        return "";
    }

    /**
     *
     * @returns {*}
     */
    get target() {
        return this._target;
    }

    /**
     *
     * @returns {type}
     */
    get type() {
        return this._type;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return "[Event type=" + this.type + " cancelable=" + this.cancelable + " preventDefaulted=" + this.defaultPrevented + " target=" + this.target + "]";
    }
}
