export interface Transcript {
    id: number;
    name: string;
}

export interface TranscriptDetail {
    id: number;
    name: string;
    audio_url: string;
    speakers: Array<{ id: string; name: string; }>;
    paragraphs: Paragraph[];
    words: Word[];
}

export interface Paragraph {
    id: string;
    time: number;
    duration: number;
    speaker_id: string;
}

export interface Word {
    time: number;
    duration: number;
    text: string;
    paragraph_id: string;
}

