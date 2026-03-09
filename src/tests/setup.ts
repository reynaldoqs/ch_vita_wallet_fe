import "@testing-library/jest-dom";

class ResizeObserverMock {
	observe = () => undefined;
	unobserve = () => undefined;
	disconnect = () => undefined;
}
window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
