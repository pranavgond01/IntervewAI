"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { sendViolation } from "@/services/violation";

type Props = {
  interviewId: string;
};

export default function WebcamProctor({
  interviewId,
}: Props) {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [status, setStatus] =
    useState("Loading AI...");

  const [faces, setFaces] =
    useState(0);

const [violations, setViolations] =
  useState(0);

  const violationReasons = useRef<string[]>([]);

const violationCountRef = useRef(0);

const noFaceRef = useRef(false);

const multipleFaceRef = useRef(false);

  useEffect(() => {

    start();

  }, []);

  async function start() {

    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

    await faceapi.nets.faceExpressionNet.loadFromUri("/models");

    const stream =
      await navigator.mediaDevices.getUserMedia({

        video: true,

      });

    if (videoRef.current)
      videoRef.current.srcObject = stream;

    setStatus("Monitoring...");
  }

  async function addViolation(reason: string) {

  violationCountRef.current++;

  setViolations(violationCountRef.current);

  await sendViolation(
    interviewId,
    reason,
  );

  if (violationCountRef.current >= 3) {

    alert(
      "Maximum violations reached.\nInterview will now end.",
    );

    window.location.href =
      `/interview/${interviewId}/report`;

  }

}

  useEffect(() => {

    const interval = setInterval(async () => {
      

      if (!videoRef.current) return;

      const detections =
        await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions(),
        );

      setFaces(detections.length);

      if (detections.length === 0) {

  setStatus("❌ No face detected");

  if (!noFaceRef.current) {

  noFaceRef.current = true;

  setViolations(prev => {

    const total = prev + 1;

    sendViolation(
    interviewId,
    "No face detected"
);

    if (total >= 3) {
      window.dispatchEvent(
        new CustomEvent("force-submit")
      );
    }

    return total;

  });

}

  multipleFaceRef.current = false;

}

else if (detections.length > 1) {

  setStatus("⚠ Multiple faces");

  if (!multipleFaceRef.current) {

  multipleFaceRef.current = true;

  setViolations(prev => {

    const total = prev + 1;

    sendViolation(
    interviewId,
    "Multiple faces detected"
);

    if (total >= 3) {
      window.dispatchEvent(
        new CustomEvent("force-submit")
      );
    }

    return total;

  });

}

  noFaceRef.current = false;

}
      else {

  setStatus("✅ Candidate Verified");

  noFaceRef.current = false;

  multipleFaceRef.current = false;

}


    }, 1000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

  function addViolation(reason: string) {

    setViolations(v => {

      const next = v + 1;

      violationReasons.current.push(reason);

      sendViolation(interviewId, reason)

      if (next >= 3) {

        window.location.href =
          `/interview/${window.location.pathname.split("/")[2]}/report`;

      }

      return next;

    });

  }

  function handleBlur() {

    addViolation("Tab switched");

  }

  function handleVisibility() {

    if (document.hidden) {

      addViolation("Browser minimized");

    }

  }

  function handleCopy() {

    addViolation("Copied content");

  }

  function handlePaste() {

    addViolation("Pasted content");

  }

  function handleContext(e: MouseEvent) {

    e.preventDefault();

    addViolation("Right click");

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

  return (

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">

      <h2 className="mb-4 text-xl font-bold">

        AI Proctor

      </h2>

      <video

        ref={videoRef}

        autoPlay

        muted

        playsInline

        className="rounded-xl"

      />

      <div className="mt-4">

        <p>{status}</p>

        <p>Faces: {faces}</p>

        <p className="text-red-400">
Violations:
{" "}
{violations}
/3
</p>

      </div>

    </div>

  );

}