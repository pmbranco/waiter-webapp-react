import { enums } from '../helpers/index';

/**
 * middleware de gestion d'action asynchrone pour redux
 * @returns {function(*=): function(*=)}
 */
function promiseMiddleware() {
    return next => action => {
        const { promise, type, ...rest } = action;
        const FAILURE = `${type}_${enums.failure}`;
        const REQUEST = `${type}_${enums.request}`;
        const SUCCESS = `${type}_${enums.success}`;

        if (!promise) {
            return next(action);
        }

        next({ ...rest, promise: promise, type: REQUEST });
        return promise
            .then((res) => {
                next({ ...rest, data: res, type: SUCCESS });
                return true;
            }, (error) => {
                next({ ...rest, error, type: FAILURE });
                return false;
            });
    }
}

export default promiseMiddleware;
