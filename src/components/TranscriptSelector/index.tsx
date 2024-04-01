import React from 'react';
import { Transcript } from '../../types';
import styles from './TranscriptSelector.module.css';

interface TranscriptSelectorProps {
    transcripts: Transcript[];
    selectedTranscriptID: number | "";
    onSelectTranscript: (id: number) => void;
    toggleHighlighting: () => void;
    isHighlightingEnabled: boolean;
}

const TranscriptSelector: React.FC<TranscriptSelectorProps> = ({
    transcripts,
    selectedTranscriptID,
    onSelectTranscript,
    toggleHighlighting,
    isHighlightingEnabled
}) => {
    const buttonLabel = isHighlightingEnabled ? "Disable Highlighting" : "Enable Highlighting";

    return (
        <div className={styles.selectorWrapper}>
            <select
                className={styles.selector}
                value={selectedTranscriptID}
                onChange={(e) => onSelectTranscript(Number(e.target.value))}
            >
                <option value="0">Select a Transcript</option>
                {transcripts.map((transcript) => (
                    <option key={transcript.id} value={transcript.id}>
                        {transcript.name}
                    </option>
                ))}
            </select>
            <button className={`${styles.toggleButton} ${isHighlightingEnabled ? styles.toggleButtonActive : ''}`}
                onClick={toggleHighlighting}>{buttonLabel}</button>
        </div>
    );
};

export default TranscriptSelector;
