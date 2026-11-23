export async function speak(text: string) {
if (typeof window === "undefined") return;

const synth = window.speechSynthesis;

synth.cancel();

const utterance = new SpeechSynthesisUtterance(text);

const voices = synth.getVoices();

const preferred =
voices.find((v) =>
v.name.toLowerCase().includes("aria"),
) ||
voices.find((v) =>
v.name.toLowerCase().includes("jenny"),
) ||
voices.find((v) =>
v.name.toLowerCase().includes("samantha"),
) ||
voices.find((v) =>
v.lang.startsWith("en"),
);

if (preferred) utterance.voice = preferred;

utterance.rate = 0.95;
utterance.pitch = 1;
utterance.volume = 1;

synth.speak(utterance);
}

export function stopSpeaking() {
if (typeof window === "undefined") return;
window.speechSynthesis.cancel();
}
