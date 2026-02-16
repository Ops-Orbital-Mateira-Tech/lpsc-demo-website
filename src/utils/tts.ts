export function isSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string) {
  if (!isSupported()) return;
  const u = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export function stop() {
  if (!isSupported()) return;
  window.speechSynthesis.cancel();
}

