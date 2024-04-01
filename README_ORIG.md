# Verbit Karaoke Assignment

## General Guidelines
* The output for this assignment should be a working project that can run locally. You should provide installation/running instructions if necessary.
* You should push the code to this repository. _Ideally_, try to use version control with commits that outline your progress (not a must).

## How we'll review your work
**The end result should ideally be a working app**. You can leave some features aside, but write them out in the project's README with an idea of how you’d approach the implementation. Try to avoid using hacks and tricks that you would absolutely not use in production code.

We will review your work with the following topics in mind:

* **Correctness**: Does the application do its job? If there's anything missing, does the README explain why it is missing and how you might implement it?
* **Code Quality & Clarity**: Is the code simple and easy to understand? Are there any code smells or other red flags? Does the code follow general modern JS guidelines and idioms? Is the coding style and naming generally consistent?
* **Responsiveness**: The application should feel as responsive as possible to the user.

## The Assignment: Karaoke App
Create a Karaoke-like web application that plays an audio file with accompanying words, while highlighting the current spoken word.
The app will request a transcript from an API, which includes a URL to the audio file, the words in the transcript and the word timings from an API (provided below).

## App Components

### Transcription Text
The app should display the transcription text in paragraphs (scrollable if needed) and the word that's currently being played should be highlighted in some way. It's possible that no words will be highlighted at a given time when the audio is playing (because there's time between words).

### Audio Player
The app should have a functioning audio player with a play, pause and an audio track to seek the audio.
**Tip:** The `<audio>` element is quite powerful and can be used to easily provide both the playback and the UI of this component.

## API

The base URL for the API is available at https://verbit-karaoke-assignment.vercel.app/api/

### `GET /transcripts`
Get a list of available transcripts.

Example response:
```
[
  {
    "id": 1,
    "name": "Awesome TED talk"
  },
  {
    "id": 2,
    "name": "Yet another TED talk"
  }
]
```

Full URL: https://verbit-karaoke-assignment.vercel.app/api/transcripts

### `GET /transcripts/:id`
Get a transcript by id.

Example response:
```
{
  "id": 1,
  "name": "Awesome TED talk",
  "audio_url": "https://example.com/1.mp4",
  "speakers": [
    {
      "id": "b09bb4e8-1a99-4c13-905c-5e85f4b91c20",
      "name": "David Mazières"
    }
  ],
  "paragraphs": [
    {
      "id": "32e72281-c543-4d45-b16d-35b89575b9dc",
      "time": 15.69,
      "duration": 1.02,
      "speaker_id": "b09bb4e8-1a99-4c13-905c-5e85f4b91c20"
    }
  ],
  "words": [
    {
      "time": 15.69,
      "duration": 0.27,
      "text": "that",
      "paragraph_id": "32e72281-c543-4d45-b16d-35b89575b9dc"
    },
    {
      "time": 16.35,
      "duration": 0.15,
      "text": "you",
      "paragraph_id": "32e72281-c543-4d45-b16d-35b89575b9dc"
    },
    {
      "time": 16.5,
      "duration": 0.21,
      "text": "know,",
      "paragraph_id": "32e72281-c543-4d45-b16d-35b89575b9dc"
    }
  ]
}
```

**Notes:**
* a paragraph is made of words, and is spoken by a single speaker.
* All times are measured in seconds.

Full URL: https://verbit-karaoke-assignment.vercel.app/api/transcripts/:id

### `GET /transcripts/random`
Get a random transcript from the list of available transcripts.

Full URL: https://verbit-karaoke-assignment.vercel.app/api/transcripts/random

## Bonus Points (not required!)

### Automatic Scrolling
When the audio is playing, automatically scroll to a position where it's comfortable for the user to read the current text.

### Transcript List
Use the `GET /transcripts` endpoint to allow the user to view and select a transcript to play.

### Videos!
All the transcript media tracks for this assignment are actually videos. Show the video instead of the audio only :)

### Playback Speed
Allow the user to control the playback speed (slower or faster), while still correctly highlighting the current word.

## README
Please spend the last 10-15 minutes writing a short README to accompany the code. It should address the following:

* Short description about the structure/architecture of the application.
* Reasoning behind technical choices (if needed).
* Things you didn't implement or trade-offs you made. This can also include details about how you would implement things differently if you were to spend more time on the assignment or if it was for production use.

Feel free to reach out about any issue and ask if something is unclear.

* Harel - 054-3973929 harel.coman@verbit.ai
* Ishai - 054-3985292 ishai@verbit.ai

Once you're done, please reach out to our HR team and let them know.

Good luck! :)
