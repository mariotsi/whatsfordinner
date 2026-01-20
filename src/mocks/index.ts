export async function initMocks() {
  if (typeof window === 'undefined') {
    return;
  }

  if (process.env.NEXT_PUBLIC_ENABLE_MSW !== 'true') {
    return;
  }

  const { worker } = await import('./browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}
