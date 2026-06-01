// ============================================================
// TDS Toolkit - Audio Module
// ============================================================

let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

export function playTickSound() {
    initAudio();
    if (!audioCtx) return;

    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(850, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.025);
}

export function playChimeSound() {
    initAudio();
    if (!audioCtx) return;

    let now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, index) => {
        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();

        osc.type = 'sine';
        let noteDelay = index * 0.04;

        osc.frequency.setValueAtTime(freq, now + noteDelay);
        gain.gain.setValueAtTime(0.06, now + noteDelay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + noteDelay + 0.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + noteDelay);
        osc.stop(now + noteDelay + 0.4);
    });
}
