import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaPlayer from '..';

jest.useFakeTimers();

describe('MediaPlayer', () => {
    it('renders a video element with the given media URL', () => {
        const testMediaUrl = 'http://example.com/video.mp4';
        render(<MediaPlayer mediaUrl={testMediaUrl} onTimeUpdate={() => { }} />);

        // eslint-disable-next-line testing-library/no-node-access
        const videoElement = document.querySelector('video');
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute('src', testMediaUrl);
    });

    it('calls onTimeUpdate at regular intervals', () => {
        const testMediaUrl = 'http://example.com/video.mp4';
        const onTimeUpdateMock = jest.fn();

        const { getByTestId } = render(<MediaPlayer mediaUrl={testMediaUrl} onTimeUpdate={onTimeUpdateMock} />);

        // Fast-forward time to trigger the interval callback
        jest.advanceTimersByTime(10);

        expect(onTimeUpdateMock).toHaveBeenCalled();
    });
});

afterEach(() => {
    jest.clearAllTimers();
});
