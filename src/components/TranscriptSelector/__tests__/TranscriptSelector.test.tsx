import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranscriptSelector from '..';

describe('TranscriptSelector', () => {
    const mockTranscripts = [
        { id: 1, name: 'Transcript 1' },
        { id: 2, name: 'Transcript 2' },
    ];

    it('renders with given transcripts', () => {
        render(
            <TranscriptSelector
                transcripts={mockTranscripts}
                selectedTranscriptID={0}
                onSelectTranscript={jest.fn()}
            />
        );

        expect(screen.getByRole('option', { name: 'Select a Transcript' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Transcript 1' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Transcript 2' })).toBeInTheDocument();
    });

    it('calls onSelectTranscript when a new transcript is selected', () => {
        const onSelectTranscript = jest.fn();
        render(
            <TranscriptSelector
                transcripts={mockTranscripts}
                selectedTranscriptID={0}
                onSelectTranscript={onSelectTranscript}
            />
        );

        fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

        expect(onSelectTranscript).toHaveBeenCalledWith(1);
    });
});
