"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import api from "@/lib/api";
import CodingEditor from "@/components/interview/CodingEditor";
import WebcamProctor from "@/components/interview/WebcamProctor";
import ProblemStatement from "@/components/interview/ProblemStatement";
import { speak, stopSpeaking } from "@/lib/voice";
import LanguageSelector from "@/components/interview/LanguageSelector";

import CodeToolbar from "@/components/interview/CodeToolbar";

import ConsolePanel from "@/components/interview/ConsolePanel";

import VoiceRecorder from "@/components/interview/VoiceRecorder";
import InterviewSidebar from "@/components/interview/InterviewSidebar";
import InterviewThinkingModal from "@/components/interview/InterviewThinkingModal";
import EvaluationModal from "@/components/interview/EvaluationModal";
import AIAvatar from "@/components/interview/AIAvatar";
import LiveAnalytics from "@/components/interview/LiveAnalytics";
import ConversationHistory from "@/components/interview/ConversationHistory";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

const TECH_KEYWORDS = [

"react",

"next",

"node",

"javascript",

"typescript",

"api",

"rest",

"graphql",

"docker",

"kubernetes",

"jwt",

"authentication",

"authorization",

"mongodb",

"sql",

"redis",

"cache",

"aws",

"azure",

"gcp",

"oop",

"class",

"interface",

"algorithm",

"array",

"linked list",

"binary tree",

"dfs",

"bfs",

"stack",

"queue",

"hashmap",

"time complexity",

"space complexity",

"big o",

];

const FILLERS = [

"um",

"uh",

"like",

"basically",

"actually",

"you know",

"kind of",

"sort of",

"hmm",

];





export default function InterviewPage() {
  const params = useParams();

  const router = useRouter();

  const interviewId = params.id as string;

  const [loading, setLoading] = useState(true);
  
  

  const [interview, setInterview] = useState<any>(null);

  const [answer, setAnswer] = useState("");
  

  const [submitting, setSubmitting] = useState(false);

  const [thinking, setThinking] = useState(false);

  const [showEvaluation, setShowEvaluation] =
    useState(false);

  const [communication, setCommunication] =
    useState(0);

const [violations, setViolations] =
  useState(0);

const lastViolationTime = useRef(0);
const violationLock = useRef(false);


const silenceTimer = useRef<NodeJS.Timeout | null>(null);
const lastSpeechTime = useRef(Date.now());


  const [violationHistory, setViolationHistory] =
  useState<string[]>([]);
  const [violationReason, setViolationReason] =
  useState("");

const [warning, setWarning] =
  useState("");

const [isFullscreen, setIsFullscreen] =
  useState(false);


  const [technical, setTechnical] =
    useState(0);

  const [problemSolving, setProblemSolving] =
    useState(0);

  const [confidence, setConfidence] =
    useState(0);

  const [clarity, setClarity] = useState(0);

const [fluency, setFluency] = useState(0);

const [vocabulary, setVocabulary] = useState(0);

  const [overallScore, setOverallScore] =
    useState(0);

  const [feedback, setFeedback] =
    useState("");

  

  const [integrityScore, setIntegrityScore] =
  useState(100);



  
  const [conversationHistory, setConversationHistory] =
  useState<any[]>([]);

const [language, setLanguage] =
  useState("Java");

const [code, setCode] =
  useState(`public class Solution {

    public static void main(String[] args) {

    }

}`);


    

  const [liveCommunication, setLiveCommunication] = useState(0);

const [liveTechnical, setLiveTechnical] = useState(0);

const [liveConfidence, setLiveConfidence] = useState(0);

const [liveProblemSolving, setLiveProblemSolving] = useState(0);

const [liveOverall, setLiveOverall] = useState(0);

const [fillerWords, setFillerWords] = useState(0);

const [keywordsFound, setKeywordsFound] = useState<string[]>([]);

const [emotion, setEmotion] =
  useState("Thinking");

const [speakingSpeed, setSpeakingSpeed] =
  useState("Normal");

const [aiSuggestion, setAiSuggestion] =
  useState(
    "Start answering the question clearly."
  );

  const [transcript, setTranscript] = useState<
  {
    role: "ai" | "user";
    text: string;
  }[]
>([]);

const [liveNotes, setLiveNotes] = useState<
  string[]
>([]);

  const [secondsLeft, setSecondsLeft] =
    useState(120);

  const [elapsed, setElapsed] = useState(0);
  

  const speechRef =
    useRef<SpeechSynthesisUtterance | null>(
      null,
    );
    

  const [speaking, setSpeaking] =
  useState(false);

  const [listening, setListening] =
    useState(false);

  

    

  useEffect(() => {
    loadInterview();
    document.documentElement
  .requestFullscreen()
  .catch(() => {});
  }, []);

  useEffect(() => {
  lastSpeechTime.current = Date.now();

  if (silenceTimer.current)
    clearTimeout(silenceTimer.current);

  silenceTimer.current = setTimeout(() => {
    speak(
      "Take your time. Can you elaborate on your previous point?",
    );
  }, 6000);

  return () => {
    if (silenceTimer.current)
      clearTimeout(silenceTimer.current);
  };
}, [answer]);

 useEffect(() => {
  if (!interview) return;

  speakQuestion(
    interview.questions[
      interview.currentQuestion - 1
    ]?.text,
  );
}, [interview?.currentQuestion]);



useEffect(() => {
  const lastViolationTime = { current: 0 };
  function addViolation(reason: string) {

  const now = Date.now();

  if (now - lastViolationTime.current < 1000) return;

  lastViolationTime.current = now;

  setViolations(v => v + 1);

  setViolationReason(reason);

  setViolationHistory(prev => [
    ...prev,
    `${new Date().toLocaleTimeString()} - ${reason}`,
  ]);

}

  function handleBlur() {

    addViolation("Window Lost Focus");

  }

  function handleVisibility() {

    if (document.hidden) {

      addViolation("Tab Switched");

    }

  }

  function handleCopy(e: ClipboardEvent) {

    e.preventDefault();

    addViolation("Copy Attempt");

  }

  function handlePaste(e: ClipboardEvent) {

    e.preventDefault();

    addViolation("Paste Attempt");

  }

  function handleContext(e: MouseEvent) {

    e.preventDefault();

    addViolation("Right Click");

  }

  window.addEventListener("blur", handleBlur);

  document.addEventListener(
    "visibilitychange",
    handleVisibility,
  );

  document.addEventListener("copy", handleCopy);

  document.addEventListener("paste", handlePaste);

  document.addEventListener(
    "contextmenu",
    handleContext,
  );

  return () => {

    window.removeEventListener("blur", handleBlur);

    document.removeEventListener(
      "visibilitychange",
      handleVisibility,
    );

    document.removeEventListener(
      "copy",
      handleCopy,
    );

    document.removeEventListener(
      "paste",
      handlePaste,
    );

    document.removeEventListener(
      "contextmenu",
      handleContext,
    );

  };

}, []);



useEffect(() => {
  const preventCopy = (e: ClipboardEvent) => {
    e.preventDefault();

    addViolation(
      "Copy/Paste is disabled.",
    );
  };

  document.addEventListener(
    "copy",
    preventCopy,
  );

  document.addEventListener(
    "paste",
    preventCopy,
  );

  return () => {
    document.removeEventListener(
      "copy",
      preventCopy,
    );

    document.removeEventListener(
      "paste",
      preventCopy,
    );
  };
}, []);


useEffect(() => {
  const fullscreenHandler = () => {
    const full =
      !!document.fullscreenElement;

    setIsFullscreen(full);

    if (!full) {
      addViolation(
        "Fullscreen exited.",
      );
    }
  };

  document.addEventListener(
    "fullscreenchange",
    fullscreenHandler,
  );

  return () =>
    document.removeEventListener(
      "fullscreenchange",
      fullscreenHandler,
    );
}, []);
  

  useEffect(() => {
    if (!interview) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          submitAnswer(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interview?.currentQuestion]);


  useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) {
      addViolation(
        "You left the interview tab.",
      );
    }
  };

  document.addEventListener(
    "visibilitychange",
    handleVisibility,
  );

  return () =>
    document.removeEventListener(
      "visibilitychange",
      handleVisibility,
    );
}, []);


useEffect(() => {
  const start = Date.now();

  const timer = setInterval(() => {
    setElapsed(
      Math.floor((Date.now() - start) / 1000),
    );
  }, 1000);

  return () => clearInterval(timer);
}, []);



useEffect(() => {
  const interval = setInterval(() => {
    const text = answer.toLowerCase().trim();

    const words = text.length
      ? text.split(/\s+/).filter(Boolean)
      : [];

    const wordCount = words.length;

    // --------------------------
    // Filler Words
    // --------------------------

    let fillerCount = 0;

    FILLERS.forEach((word) => {
      fillerCount += words.filter(
        (w) => w === word,
      ).length;
    });

    setFillerWords(fillerCount);

    // --------------------------
    // Technical Keywords
    // --------------------------

    const found = TECH_KEYWORDS.filter((keyword) =>
      text.includes(keyword),
    );

    setKeywordsFound(found);

    // --------------------------
    // Communication Score
    // --------------------------

    let communication = 40;

    communication += Math.min(
      wordCount * 0.8,
      35,
    );

    communication -= fillerCount * 3;

    communication = Math.max(
      0,
      Math.min(100, Math.round(communication)),
    );

    setLiveCommunication(communication);

    // --------------------------
    // Technical Score
    // --------------------------

    let technical = 20;

    technical += found.length * 8;

    technical = Math.min(100, technical);

    setLiveTechnical(technical);

    // --------------------------
    // Confidence
    // --------------------------

    let confidence = 55;

    if (wordCount > 30)
      confidence += 10;

    if (wordCount > 60)
      confidence += 10;

    if (wordCount > 120)
      confidence += 10;

    confidence -= fillerCount * 2;

    confidence = Math.max(
      0,
      Math.min(100, confidence),
    );

    setLiveConfidence(confidence);



    

    // --------------------------
    // Problem Solving
    // --------------------------

    let problem = 30;

    if (text.includes("because"))
      problem += 15;

    if (text.includes("therefore"))
      problem += 15;

    if (text.includes("example"))
      problem += 15;

    if (text.includes("solution"))
      problem += 15;

    if (text.includes("approach"))
      problem += 15;

    problem = Math.min(problem, 100);

    setLiveProblemSolving(problem);

    // --------------------------
    // Overall
    // --------------------------

    const overall = Math.round(
      (communication +
        technical +
        confidence +
        problem) /
        4,
    );

    setLiveOverall(overall);


    const notes: string[] = [];

// No answer yet
if (wordCount === 0) {
  notes.push("Start speaking to begin AI analysis.");
}

// Very short answer
else if (wordCount < 15) {
  notes.push("Try explaining your answer in more detail.");
}

// Medium answer
else if (wordCount < 40) {
  notes.push("Good start. Add more technical depth.");
}

// Long answer
else {
  notes.push("Answer length is good.");
}

// Technical keywords
if (found.length >= 5) {
  notes.push("Excellent technical vocabulary.");
} else if (found.length >= 2) {
  notes.push("Good use of technical terms.");
} else {
  notes.push("Use more technical keywords.");
}

// Filler words
if (fillerCount >= 5) {
  notes.push("Too many filler words.");
} else if (fillerCount > 0) {
  notes.push("Try reducing filler words.");
}

// Reasoning
if (text.includes("because")) {
  notes.push("Strong reasoning detected.");
}

// Examples
if (
  text.includes("example") ||
  text.includes("for instance") ||
  text.includes("for example")
) {
  notes.push("Good use of examples.");
}

// Confidence
if (confidence > 90) {
  notes.push("Confident speaking style.");
}

setLiveNotes(notes);
    // --------------------------
    // Emotion
    // --------------------------

    if (wordCount === 0)
      setEmotion("Waiting");

    else if (confidence > 85)
      setEmotion("Confident");

    else if (confidence > 70)
      setEmotion("Calm");

    else
      setEmotion("Thinking");

    // --------------------------
    // Speaking Speed
    // --------------------------

    if (wordCount < 15)
      setSpeakingSpeed("Slow");

    else if (wordCount < 80)
      setSpeakingSpeed("Normal");

    else
      setSpeakingSpeed("Fast");

    // --------------------------
    // AI Coach
    // --------------------------

    if (wordCount < 20)
      setAiSuggestion(
        "Explain your answer with more detail.",
      );

    else if (found.length < 2)
      setAiSuggestion(
        "Use more technical terminology.",
      );

    else if (fillerCount > 3)
      setAiSuggestion(
        "Reduce filler words for better clarity.",
      );

    else
      setAiSuggestion(
        "Excellent answer. Keep explaining your reasoning.",
      );
  }, 1000);

  return () => clearInterval(interval);
}, [answer]);
  

  async function loadInterview() {
    try {
      const res = await api.get(
        `/interview/${interviewId}`,
      );

      setInterview(res.data);
      setConversationHistory(
      res.data.conversationHistory || [],
    );
    } finally {
      setLoading(false);
    }
  }

  function speakQuestion(question: any) {

  const text =
    typeof question === "string"
      ? question
      : question?.text ?? "";


  if (!text) return;
  setTranscript((prev) => [
  ...prev,
  {
    role: "ai",
    text,
  },
]);

  window.speechSynthesis.cancel();

  setSpeaking(true);
  setListening(false);

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.rate = 1;

  utterance.pitch = 1;

  utterance.volume = 1;

  utterance.onend = () => {
    setSpeaking(false);
    setListening(true);
  };

  utterance.onerror = () => {
    setSpeaking(false);
    setListening(true);
  };

  speechRef.current = utterance;

  window.speechSynthesis.speak(
    utterance,
  );
}

  function speakFeedback(text: string) {
  if (!text) return;

  window.speechSynthesis.cancel();

  setSpeaking(true);

  setListening(false);

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.rate = 1;

  utterance.pitch = 1;

  utterance.volume = 1;

  utterance.onend = () => {
    setSpeaking(false);
    setListening(true);
  };

  speechRef.current = utterance;

  window.speechSynthesis.speak(
    utterance,
  );
}

  async function submitAnswer(
    automatic = false,
  ) {
    if (
      !automatic &&
      answer.trim().length === 0
    ) {
      alert("Please answer first.");

      return;
    }

    try {
      setSubmitting(true);

      setThinking(true);
      setSpeaking(false);

      setListening(false);

      window.speechSynthesis.cancel();
      setTranscript((prev) => [
  ...prev,
  {
    role: "user",
    text: answer,
  },
]);

      const res = await api.post(
        `/interview/${interviewId}/answer`,
        {
    answer:
      isCodingQuestion
        ? code
        : answer,
},
      );

      setThinking(false);

      setCommunication(
        res.data.communication ?? 8,
      );

      setTechnical(
        res.data.technical ?? 8,
      );

      setProblemSolving(
        res.data.problemSolving ?? 8,
      );

      setConfidence(
        res.data.confidence ?? 8,
      );

      setClarity(
        res.data.clarity ?? 0
        );


        setFluency(
        res.data.fluency ?? 0
        );

        setVocabulary(
        res.data.vocabulary ?? 0
        );

      setOverallScore(
        res.data.score,
      );

      setFeedback(
        res.data.feedback,
      );

      speakFeedback(
        res.data.feedback,
      );

      setShowEvaluation(true);

      if (res.data.completed) {
        setTimeout(() => {
          router.push(
            `/interview/${interviewId}/report`,
          );
        }, 5000);

        return;
      }

      setTimeout(() => {
  setInterview((prev: any) => ({
    ...prev,

    currentQuestion:
      res.data.currentQuestion,

    overallScore:
      res.data.overallScore,

    questions: [
      ...prev.questions,
      res.data.question,
    ],
  }));

  setConversationHistory(
    res.data.conversationHistory || [],
  );

  setAnswer("");
  setCode(`function solution() {

}`);

  setSecondsLeft(120);
}, 5000);
    } finally {
      setSubmitting(false);
    }
  }

  function addViolation(message: string) {
  setViolations((prev) => {
    const total = prev + 1;

    setWarning(message);

    setTimeout(() => {
      setWarning("");
    }, 3000);

    if (total >= 5) {
      alert(
        "Interview terminated due to repeated violations.",
      );

      router.push(
        `/interview/${interviewId}/report`,
      );
    }

    return total;
  });
}

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  if (!interview)
    return (
      <div className="flex h-screen items-center justify-center">
        Interview not found
      </div>
    );

  const currentQuestion =
  interview.questions[
    interview.currentQuestion - 1
  ];

const isCodingQuestion =
  currentQuestion?.type === "coding";
    return (
  <>
    <InterviewThinkingModal open={thinking} />

    <EvaluationModal
      open={showEvaluation}
      communication={communication}
      technical={technical}
      problemSolving={problemSolving}
      confidence={confidence}
      score={overallScore}
      feedback={feedback}
      onFinish={() => setShowEvaluation(false)}
    />

    <main className="min-h-screen bg-zinc-950 text-white">

    {warning && (

<div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-xl bg-red-600 px-8 py-4 font-bold text-white shadow-2xl">

⚠ {warning}

</div>

)}  

    <div className="mx-auto grid max-w-[1850px] grid-cols-[320px_1fr_380px] gap-8 p-8">

  <div className="space-y-8">

    <AIAvatar
      speaking={speaking}
      listening={listening}
      thinking={thinking}
    />
    <WebcamProctor
  interviewId={interviewId}
/>

    <LiveAnalytics
    confidence={confidence}
    communication={communication}
    technical={technical}
    fluency={fluency}
    vocabulary={vocabulary}
    clarity={clarity}
    problemSolving={problemSolving}
    score={overallScore}
    difficulty={interview.difficulty}
  />

    

  </div>

 

    


        <div className="space-y-8">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 shadow-2xl backdrop-blur-xl">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h1 className="text-4xl font-bold">
                  {interview.role}
                </h1>

                <p className="mt-2 text-zinc-400">
                  AI Technical Interview
                </p>

              </div>

              <div className="rounded-2xl bg-cyan-500 px-6 py-3 text-lg font-bold text-black">

                Question {interview.currentQuestion} / 10

              </div>

            </div>

            <div className="mb-8">

              <div className="mb-3 flex justify-between">

                <span className="text-zinc-400">
                  Interview Progress
                </span>

                <span className="font-bold">

                  {Math.round(
                    (interview.currentQuestion /
                      10) *
                      100,
                  )}
                  %

                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                <div
                  className="h-full rounded-full bg-cyan-500 transition-all duration-700"
                  style={{
                    width: `${
                      (interview.currentQuestion /
                        10) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

            <div className="rounded-3xl border border-cyan-500/30 bg-zinc-800 p-10 shadow-xl">

              <h2 className="mb-5 text-xl font-bold">

                Sarah asks

              </h2>

              <div className="mb-5 flex flex-wrap gap-3">

  <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-400">
  {currentQuestion?.difficulty}
</span>

  <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
  {currentQuestion?.type}
</span>

  <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-400">
    {interview.role}
  </span>

</div>

              <p className="text-2xl leading-[52px] font-medium">

                {currentQuestion?.text}

              </p>

            </div>
            

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

  <div className="mb-3 flex items-center justify-between">

    <h3 className="font-semibold">
      🎙 Live Transcript
    </h3>

    <span className="text-sm text-cyan-400">
      {listening ? "Listening..." : "Idle"}
    </span>

  </div>

  <div className="min-h-[120px] rounded-xl bg-zinc-950 p-4 text-zinc-300">

    {answer.length
      ? answer
      : "Start speaking to see your transcript..."}

  </div>

  <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

  <h2 className="mb-5 text-2xl font-bold">

    📝 Live Interview Transcript

  </h2>

  <div className="max-h-[350px] space-y-4 overflow-y-auto">

    {transcript.map((item, i) => (

      <div
        key={i}
        className={`rounded-xl p-4 ${
          item.role === "ai"
            ? "border border-cyan-500/30 bg-cyan-500/10"
            : "bg-zinc-800"
        }`}
      >

        

        <p className="mb-2 text-sm font-bold">

          {item.role === "ai"
            ? "👩 Sarah"
            : "👤 You"}

        </p>

        <p>{item.text}</p>

      </div>
      
      

    ))}

  </div>
  

</div>


</div>

<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

  <h2 className="mb-4 text-2xl font-bold">

    💡 AI Coach

  </h2>

  <div className="rounded-2xl bg-zinc-800 p-5">

    <p className="text-lg text-cyan-300">

      {aiSuggestion}

    </p>

  </div>

</div>

            <div className="mt-8">

              <VoiceRecorder
                value={answer}
                onChange={setAnswer}
              />
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

  <div className="mb-4 flex justify-between">

    <span>Answer Quality</span>

    <span className="font-bold">

      {answer.length < 80
        ? "Poor"
        : answer.length < 200
        ? "Average"
        : answer.length < 500
        ? "Good"
        : "Excellent"}

    </span>

  </div>

  <div className="h-3 rounded-full bg-zinc-800">

    <div
      className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all"
      style={{
        width: `${Math.min(
          answer.length / 6,
          100,
        )}%`,
      }}
    />

  </div>

</div>

  </div>


     




<div className="mt-8 grid grid-cols-2 gap-5">

  <div className="rounded-2xl bg-zinc-900 p-5 border border-zinc-800">

    <p className="text-zinc-400">

      Emotion

    </p>

    <p className="mt-2 text-2xl font-bold text-green-400">

      {emotion}

    </p>

  </div>

  <div className="rounded-2xl bg-zinc-900 p-5 border border-zinc-800">

    <p className="text-zinc-400">

      Speaking Speed

    </p>

    <p className="mt-2 text-2xl font-bold text-cyan-400">

      {speakingSpeed}

    </p>

  </div>

</div>


<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

  <h2 className="mb-5 text-2xl font-bold">

    📚 Technical Keywords Detected

  </h2>

  <div className="flex flex-wrap gap-3">

    {keywordsFound.length === 0 ? (

      <span className="text-zinc-500">

        No technical keywords detected yet.

      </span>

    ) : (

      keywordsFound.map((keyword) => (

        <span
          key={keyword}
          className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300"
        >

          {keyword}

        </span>

      ))

    )}

  </div>

</div>


 
            <div className="mb-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">

  <h3 className="mb-2 font-bold text-cyan-400">

    💡 AI Interview Tip

  </h3>

  <p className="text-zinc-300">

    Explain your reasoning step by step.
    Mention real-world examples whenever possible.

  </p>

</div>

 

<textarea
value={answer}
onChange={(e)=>
setAnswer(e.target.value)
}
rows={8}
placeholder="Explain your answer..."
className="mt-8 w-full rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-lg outline-none transition focus:border-cyan-500"
/>


            <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

  <h3 className="mb-4 font-bold text-cyan-400">

    💡 AI Suggestions

  </h3>

  <ul className="space-y-3 text-zinc-300">

    <li>• Explain your reasoning.</li>

    <li>• Mention real-world experience.</li>

    <li>• Include technical terms.</li>

    <li>• End with a conclusion.</li>

  </ul>

</div>

            <div className="mt-3 flex justify-between text-sm text-zinc-400">

  <span>

    Words:
    {" "}
    {
      answer.trim() === ""
        ? 0
        : answer.trim().split(/\s+/).length
    }

  </span>

  <span>

    Characters:
    {" "}
    {answer.length}

  </span>

</div>
<div className="mt-6">

  <div className="mb-2 flex justify-between">

    <span>Confidence</span>

    <span>{confidence}%</span>

  </div>

  <div className="h-3 rounded-full bg-zinc-800">

    <div
      className="h-full rounded-full bg-green-500 transition-all duration-700"
      style={{
        width: `${confidence}%`,
      }}
    />

  </div>

</div>

<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

  <h2 className="mb-5 text-2xl font-bold">

    🧠 AI Notes

  </h2>
  

  <div className="space-y-3">

    {liveNotes.length === 0 ? (

      <div className="rounded-xl bg-zinc-800 p-4 text-zinc-400">

        AI is analysing your answer...

      </div>

    ) : (

      liveNotes.map((note, index) => (

        <div
          key={index}
          className="rounded-xl bg-zinc-800 p-4"
        >

          ✓ {note}

        </div>

      ))

    )}

  </div>

</div>

            <div className="mt-8 flex items-center justify-between">

              <div className="text-zinc-400">

                Time Remaining

                <span className="ml-3 font-bold text-cyan-400">

                  {Math.floor(secondsLeft / 60)}
                  :
                  {String(
                    secondsLeft % 60,
                  ).padStart(2, "0")}

                </span>

              </div>

<div className="mt-10 flex flex-wrap items-center justify-between gap-4">

  <div className="flex flex-1 gap-4">

    <button
      onClick={() => speak(currentQuestion?.text || "")}
      className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-500 bg-cyan-500/5 px-6 font-semibold text-cyan-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500 hover:text-black hover:shadow-lg hover:shadow-cyan-500/30"
    >
      🔊
      <span>Replay Question</span>
    </button>

    <button
      onClick={() => submitAnswer(true)}
      className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-500 bg-amber-500/5 px-6 font-semibold text-amber-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-500 hover:text-black hover:shadow-lg hover:shadow-amber-500/30"
    >
      ⏭
      <span>Skip Question</span>
    </button>

  </div>

  <button
    disabled={submitting}
    onClick={() => submitAnswer(false)}
    className="flex h-14 min-w-[240px] items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-400 px-10 font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {submitting ? "Evaluating..." : "Submit Answer →"}
  </button>

</div>
              

            </div>

          </div>

        </div>

        <InterviewSidebar
  candidate={
    JSON.parse(
      localStorage.getItem("user") || "{}",
    ).firstName || "Candidate"
  }
  role={interview.role}
  company="Google"
  elapsed={elapsed}
  secondsLeft={secondsLeft}
  currentQuestion={interview.currentQuestion}
  totalQuestions={10}
  answered={interview.answers.length}
  skipped={
    interview.currentQuestion -
    1 -
    interview.answers.length
  }
  
  score={interview.overallScore}
  confidence={confidence}
  communication={communication}
  technical={technical}
  problemSolving={problemSolving}
  violations={violations}
  violationReason={violationReason}
words={
    answer.trim()
      ? answer.trim().split(/\s+/).length
      : 0
  }
  characters={answer.length}

  
/>




      </div>

    </main>
  </>
);
}