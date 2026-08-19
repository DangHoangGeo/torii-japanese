export function speakJapanese(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const ja = voices.find((v) => v.lang.toLowerCase().startsWith("ja"));
  if (ja) u.voice = ja;
  window.speechSynthesis.speak(u);
}
