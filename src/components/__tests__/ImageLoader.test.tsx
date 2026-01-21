import { render, screen, fireEvent } from '@testing-library/react';
import ImageLoader from '../ImageLoader';

describe('ImageLoader', () => {
  it('shows loading skeleton initially', () => {
    render(
      <ImageLoader src="/test.jpg" alt="Test image" width={200} height={200} />
    );

    expect(
      screen.getByRole('progressbar', { name: /loading image/i })
    ).toBeInTheDocument();
  });

  it('shows image as hidden initially during loading state', () => {
    render(
      <ImageLoader src="/test.jpg" alt="Test image" width={200} height={200} />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveStyle({ visibility: 'hidden' });
  });

  it('shows image as visible after load completes', () => {
    render(
      <ImageLoader src="/test.jpg" alt="Test image" width={200} height={200} />
    );

    const image = screen.getByAltText('Test image');
    fireEvent.load(image);

    expect(image).toHaveStyle({ visibility: 'visible' });
  });

  it('removes skeleton after image loads', () => {
    render(
      <ImageLoader src="/test.jpg" alt="Test image" width={200} height={200} />
    );

    const image = screen.getByAltText('Test image');
    fireEvent.load(image);

    // Skeleton should be removed after loading
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('removes image and shows fallback on error', () => {
    render(
      <ImageLoader
        src="/broken.jpg"
        alt="Broken image"
        width={200}
        height={200}
      />
    );

    const image = screen.getByAltText('Broken image');
    fireEvent.error(image);

    // Image should be removed from DOM on error
    expect(screen.queryByAltText('Broken image')).not.toBeInTheDocument();

    // Default fallback (BrokenImageIcon) should be shown
    expect(screen.getByTestId('BrokenImageIcon')).toBeInTheDocument();
  });

  it('renders custom fallback on error', () => {
    const customFallback = (
      <span data-testid="custom-fallback">Custom Error</span>
    );

    render(
      <ImageLoader
        src="/broken.jpg"
        alt="Broken image"
        width={200}
        height={200}
        fallback={customFallback}
      />
    );

    const image = screen.getByAltText('Broken image');
    fireEvent.error(image);

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });
});
