"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function useSpeechRecognition() {

  const [transcript, setTranscript] =
    useState("");

  const [listening, setListening] =
    useState(false);

  const recognitionRef =
    useRef<any>(null);

  useEffect(() => {

    if (
      typeof window === "undefined"
    ) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {

      let text = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        text +=
          event.results[i][0].transcript;

      }

      setTranscript(text);

    };

    recognition.onstart = () => {

      setListening(true);

    };

    recognition.onend = () => {

      setListening(false);

    };

    recognitionRef.current =
      recognition;

  }, []);

  function startListening() {

    recognitionRef.current?.start();

  }

  function stopListening() {

    recognitionRef.current?.stop();

  }

  return {

    transcript,

    listening,

    startListening,

    stopListening,

    setTranscript,

  };

}