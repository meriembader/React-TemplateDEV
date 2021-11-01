import EventEmitter from 'eventemitter3';
import Event from "../utils/Event";

export const NAVIGATION_EVENT = "navigation";
export const LOCAL_NAVIGATION_EVENT = "navigation-local";

export class NavigationManager extends EventEmitter {
    constructor(props) {
        super(props);
    }

    /**
     * Generates and emits the navigation events
     * @param {string} target
     * @return {Promise}
     */
    fireNavigationRequest(target,extrainfo) {
        let event = new Event('navigation', false, true, target);

        let promise = new Promise((resolved, rejected) => {
            let returned = false;

            event.accept = () => {
                if (returned) {
                    return;
                }
                returned = true;
                resolved(true);

            };
            event.refuse = () => {
                if (returned) {
                    return;
                }
                returned = true;
                resolved(false);
            };

            this.emit(LOCAL_NAVIGATION_EVENT, event);
            this.emit(NAVIGATION_EVENT, event);

            if (!event.defaultPrevented) {
                resolved(true);
            }

        });

        return promise;
    }
}
