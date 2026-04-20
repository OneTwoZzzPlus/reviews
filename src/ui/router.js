let route_default = { handle: "/", params: {}, render: () => {} };
const listeners = [];
const routes = [];

function getPath() {
    return location.hash.slice(1) || "/";
}

function compileRoute(handle) {
    const regexString = handle
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\\\{(\w+)\\}/g, '(?<$1>[^/]+)');
    const regex = new RegExp(`^${regexString}$`);
    return (path) => {
        const match = path.match(regex);
        return match ? { ...match.groups} : null;
    };
}

function matchRoute() {
    const path = getPath();
    for (const route of routes) {
        const params = route.extractParams(path);
        if (params !== null) {
            return {
                handle: path,
                params: {...params, ...route.params},
                render: route.render,
            };
        }
    }
    return route_default;
}

function notify() {
    const route = matchRoute();
    for (const listener of listeners) listener(route.params);
    route.render(route.params)
}

window.addEventListener("hashchange", notify);

export const router = {
    init(handle, params, render) {
        const extractParams = compileRoute(handle);
        route_default = {
            handle,
            params,
            render,
            extractParams
        };
        routes.push(route_default);
    },
    subscribe(listener) {
        listeners.push(listener);
    },
    route(handle, params, render) {
        const extractParams = compileRoute(handle);
        routes.push({
            handle: handle || route_default.handle,
            params: params || route_default.params,
            render: render || route_default.render,
            extractParams: extractParams
        });
    },
    start() {
        if (!location.hash) location.hash = route_default.handle;
        notify();
    },
    go(path) {
        location.hash = path;
    },
    notify,
    getPath,
};