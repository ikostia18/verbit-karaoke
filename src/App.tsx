import { useState, useEffect } from 'react';
import { fetchTranscriptsList, fetchTranscriptDetails } from './services/transcriptService';
import { Transcript, TranscriptDetail } from './types';
import Loading from './components/Loading';
import MediaPlayer from './components/MediaPlayer';
import TranscriptSelector from './components/TranscriptSelector';
import TranscriptionText from './components/TranscriptionText';
import styles from './App.module.css';
import SkeletonHomeScreen from './components/SkeletonHomeScreen';

function App() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [selectedTranscriptID, setSelectedTranscriptID] = useState<number | "">(0);
  const [selectedTranscript, setSelectedTranscript] = useState<TranscriptDetail | null>(null);

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [isHighlightingEnabled, setIsHighlightingEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const loadTranscripts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTranscriptsList();
        setTranscripts(data);
        setLoadError('');
      } catch (error) {
        console.error(error);
        setLoadError('Failed to load transcripts. Please try to refresh the page.');
      }
      setIsLoading(false);
    };

    loadTranscripts();
  }, []);

  useEffect(() => {
    const loadTranscriptDetails = async () => {
      if (!selectedTranscriptID || selectedTranscriptID === 0) {
        setSelectedTranscript(null);
        return;
      }
      setIsPlayerReady(false);

      try {
        const data = await fetchTranscriptDetails(selectedTranscriptID);
        setSelectedTranscript(data);
        setLoadError('');
      } catch (error) {
        console.error(error);
        setLoadError('Failed to load transcript details. Please try to refresh the page.');
      }
      setIsPlayerReady(true);
    };

    loadTranscriptDetails();
  }, [selectedTranscriptID]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const onSelectTranscript = (id: number) => {
    setSelectedTranscriptID(id);
  };

  const toggleHighlighting = () => {
    setIsHighlightingEnabled(!isHighlightingEnabled);
  };

  return (
    <>
      <div className={styles.app}>
        <div className={styles.container}>
          <h1>Verbit Karaoke</h1>

          {loadError ?
            <div className={styles.error} >
              {loadError}
            </div> :

            isLoading ?
              <>
                <SkeletonHomeScreen />
                <Loading label='Loading transcripts...' />
              </>
              :

              <>
                <TranscriptSelector
                  transcripts={transcripts}
                  selectedTranscriptID={selectedTranscriptID}
                  onSelectTranscript={onSelectTranscript}
                  toggleHighlighting={toggleHighlighting}
                  isHighlightingEnabled={isHighlightingEnabled}
                />

                {!isPlayerReady && !(selectedTranscriptID === 0) && (
                  <>
                    <SkeletonHomeScreen />
                    <Loading label='Loading...' />
                  </>
                )}

                {selectedTranscript && isPlayerReady && (
                  <>
                    <TranscriptionText
                      transcript={selectedTranscript}
                      currentTime={currentTime}
                      isHighlightingEnabled={isHighlightingEnabled}
                    />

                    <MediaPlayer mediaUrl={selectedTranscript.audio_url} onTimeUpdate={handleTimeUpdate} />
                  </>
                )}
              </>
          }
        </div>
      </div>
    </>
  );
}

export default App;

