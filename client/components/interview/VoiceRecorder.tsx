"use client";

import {
  useEffect,
  useState,
} from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type Props = {
  value: string;
  onChange: (text: string) => void;
  question?: string;
};

export default function VoiceRecorder({
  value,
  onChange,
  question,
}: Props) {

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const [speaking, setSpeaking] =
    useState(false);

  useEffect(() => {

    if (!transcript) return;

    onChange(transcript);

  }, [transcript]);

  useEffect(() => {

    if (!question) return;

    speakQuestion();

  }, [question]);

  function speakQuestion() {

    if (!("speechSynthesis" in window))
      return;

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        question,
      );

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.volume = 1;

    const voices =
      window.speechSynthesis.getVoices();

    const englishVoice =
      voices.find((v) =>
        v.lang.startsWith("en"),
      );

    if (englishVoice) {
      utterance.voice =
        englishVoice;
    }

    utterance.onstart = () =>
      setSpeaking(true);

    utterance.onend = () =>
      setSpeaking(false);

    window.speechSynthesis.speak(
      utterance,
    );
  }

  function stopSpeaking() {

    window.speechSynthesis.cancel();

    setSpeaking(false);

  }

  if (
    !browserSupportsSpeechRecognition
  ) {

    return (
      <div className="rounded-xl bg-red-500/10 p-4 text-red-400">
        Your browser doesn't support
        Speech Recognition.
      </div>
    );

  }

  return (

    <div className="space-y-5">

      <div className="flex flex-wrap gap-4">

        <button
          onClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
              language: "en-US",
            })
          }
          className="rounded-xl bg-green-500 px-5 py-3 font-bold text-black"
        >
          🎤 Start Recording
        </button>

        <button
          onClick={() =>
            SpeechRecognition.stopListening()
          }
          className="rounded-xl bg-red-500 px-5 py-3 font-bold"
        >
          ⏹ Stop
        </button>

        <button
          onClick={() => {
            resetTranscript();
            onChange("");
          }}
          className="rounded-xl bg-zinc-700 px-5 py-3"
        >
          🗑 Clear
        </button>

        <button
          onClick={speakQuestion}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black"
        >
          🔊 Replay Question
        </button>

        <button
          onClick={stopSpeaking}
          className="rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black"
        >
          🔇 Stop Voice
        </button>

      </div>

      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">

        <div className="mb-2 flex items-center gap-3">

          <div
            className={`h-3 w-3 rounded-full ${
              listening
                ? "bg-green-500 animate-pulse"
                : "bg-zinc-600"
            }`}
          />

          <span>

            {listening
              ? "Listening..."
              : "Microphone Idle"}

          </span>

        </div>

        <div
          className={`mt-3 rounded-lg border p-4 ${
            speaking
              ? "border-cyan-500 bg-cyan-500/10"
              : "border-zinc-700"
          }`}
        >

          {speaking ? (
            <div className="flex items-center gap-3">

              <div className="h-4 w-4 animate-ping rounded-full bg-cyan-500" />

              <span>

                AI Interviewer is speaking...

              </span>

            </div>
          ) : (
            <span>

              AI is waiting for your answer.

            </span>
          )}

        </div>

      </div>

    </div>

  );

}