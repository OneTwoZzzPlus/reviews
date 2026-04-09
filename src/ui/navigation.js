const listeners = new Set();

function getPath() {
    return location.hash.slice(1) || "/";
}

function notify() {
    const path = getPath();
    listeners.forEach(cb => cb(path));
}

window.addEventListener("hashchange", notify);

export const navigation = {
    getPath,

    go(path) {
        location.hash = path;
    },

    refresh() {
        notify();
    },

    subscribe(cb) {
        listeners.add(cb);
        return () => listeners.delete(cb);
    },

    start() {
        if (!location.hash) {
            location.hash = "/";
        }
        notify();
    }
};