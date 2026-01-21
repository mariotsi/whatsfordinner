import '@testing-library/jest-dom';

// Mock requestIdleCallback for tests (used in history.ts)
global.requestIdleCallback = (callback: IdleRequestCallback) => {
  return setTimeout(
    () =>
      callback({
        didTimeout: false,
        timeRemaining: () => 50,
      } as IdleDeadline),
    0
  ) as unknown as number;
};

global.cancelIdleCallback = (id: number) => {
  clearTimeout(id);
};
