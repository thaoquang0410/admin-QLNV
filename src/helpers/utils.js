/* global navigator, performance */
/* eslint no-console: 0 */
export function isAndroid(userAgent = navigator.userAgent) {
    const android = /Android/;
    return android.test(userAgent);
}

export function isIos(userAgent = navigator.userAgent) {
    const android = /iPhone|iPad/;
    return android.test(userAgent);
}

const perfNow = window.performance && (
    performance.now
    || performance.mozNow
    || performance.msNow
    || performance.oNow
    || performance.webkitNow
);

export function now() {
    return (perfNow && perfNow.call(performance)) || (new Date().getTime());
}

export function appInitMonitor() {
    window.addEventListener('load', () => {
        const { timing } = window.performance;
        const interactive = timing.domInteractive - timing.domLoading;
        const dcl = timing.domContentLoadedEventStart - timing.domLoading;
        const complete = timing.domComplete - timing.domLoading;
    console.log(`interactive ${interactive}ms, dcl ${dcl}ms, complete ${complete}ms`);
    });
}
