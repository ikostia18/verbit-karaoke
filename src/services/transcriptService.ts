import { Transcript, TranscriptDetail } from "../types";
import { CACHE_DURATION } from "../utils/constants";

export const baseURL = 'https://verbit-karaoke-assignment.vercel.app/api/';

const isCacheValid = (cachedItem: string) => {
    if (!cachedItem) return false;
    const now = new Date().getTime();
    const { timestamp } = JSON.parse(cachedItem);
    return now - timestamp < CACHE_DURATION;
};

const getCachedData = (key: string) => {
    const cachedItem = localStorage.getItem(key);
    if (cachedItem && isCacheValid(cachedItem)) {
        return JSON.parse(cachedItem).data;
    }
    return null;
};

const setCacheData = (key: string, data: any) => {
    const cacheEntry = JSON.stringify({ timestamp: new Date().getTime(), data });
    localStorage.setItem(key, cacheEntry);
};

export const fetchTranscriptsList = async (): Promise<Transcript[]> => {
    const cacheKey = 'transcriptsList';
    try {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) return cachedData;

        const response = await fetch(`${baseURL}transcripts`);
        if (!response.ok) throw new Error('Failed to fetch transcripts list.');
        const data = await response.json();

        setCacheData(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Error fetching transcripts list:", error);
        throw error;
    }
};

export const fetchTranscriptDetails = async (id: number): Promise<TranscriptDetail | null> => {
    const cacheKey = `transcriptDetails-${id}`;
    try {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) return cachedData;

        const response = await fetch(`${baseURL}transcripts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch transcript details.');
        const data = await response.json();

        setCacheData(cacheKey, data);
        return data;
    } catch (error) {
        console.error("Error fetching transcript details:", error);
        throw error;
    }
};
