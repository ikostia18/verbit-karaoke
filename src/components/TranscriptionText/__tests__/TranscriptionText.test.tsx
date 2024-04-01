import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptionText from '..';
import { TranscriptDetail } from '../../../types';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const mockTranscript: TranscriptDetail = {
    id: 1,
    name: "Sample Transcript",
    audio_url: "http://example.com/audio.mp3",
    speakers: [
        {
            id: "speaker1",
            name: "John Doe",
        },
    ],
    paragraphs: [
        {
            id: "p1",
            time: 0,
            duration: 3,
            speaker_id: "speaker1",
        },
    ],
    words: [
        { time: 0, duration: 1, text: "Hello", paragraph_id: '1' },
        { time: 1, duration: 1, text: "World", paragraph_id: '1' },
        { time: 2, duration: 1, text: "Test", paragraph_id: '1' },
    ],
};


describe('TranscriptionText', () => {
    it('renders the correct number of words', () => {
        render(
            <TranscriptionText
                transcript={mockTranscript}
                currentTime={0}
            />
        );

        const words = screen.getAllByText(/Hello|World|Test/);
        expect(words.length).toBe(mockTranscript.words.length);
    });

    it('highlights the active word based on currentTime', () => {
        render(
            <TranscriptionText
                transcript={mockTranscript}
                currentTime={1}
            />
        );

        // Get the word "World" and check if it's highlighted
        const activeWord = screen.getByText('World');
        expect(activeWord).toHaveClass('activeWord');
    });
});
