// ============================================================
// TDS Toolkit - Wheel Spinner Module
// ============================================================

import { allMaps, gameModes, weightedGameModes, standardModifiers, tdsTowers } from './data.js';
import { playTickSound, playChimeSound } from './audio.js';

// DOM references (set by init)
let canvas, ctx, spinBtn, skipBtn, resultDiv, summaryDiv, titleHeader;
let shelfMapContent, shelfModeContent, shelfModsContent, shelfTowersContent;

const center = 300;
const radius = 260;

// Wheel state
export let currentStage = 'MAP';
export let selectedMap = "";
export let selectedMode = "";
export let selectedModifiers = [];
export let selectedTowers = [];
export let spinning = false;

let modifierPoolCopy = [];
let towerPoolCopy = [];
let currentItems = [];
let rotation = 0;
let targetIndex = 0;
let targetAngle = 0;

let totalModsToSpin = 0;
let currentModSpinCount = 0;
let currentTowerSlotCount = 0;
export let awaitingConfirmation = false;

let lastTickSliceIndex = -1;

export function initWheel() {
    canvas = document.getElementById("wheel");
    ctx = canvas.getContext("2d");
    spinBtn = document.getElementById("spinBtn");
    skipBtn = document.getElementById("skipBtn");
    resultDiv = document.getElementById("result");
    summaryDiv = document.getElementById("summary");
    titleHeader = document.getElementById("title");

    shelfMapContent = document.getElementById("shelfMapContent");
    shelfModeContent = document.getElementById("shelfModeContent");
    shelfModsContent = document.getElementById("shelfModsContent");
    shelfTowersContent = document.getElementById("shelfTowersContent");
}

function getModeColor(mode) {
    if (mode === "Casual Mode") return "#475569";
    if (mode === "Easy Mode") return "#16a34a";
    if (mode === "Intermediate Mode") return "#ea580c";
    if (mode === "Molten Mode") return "#dc2626";
    if (mode === "Fallen Mode") return "#9333ea";
    if (mode === "Frost Mode") return "#2563eb";
    if (mode === "Hidden Wave") return "#be123c";
    return "#d97706";
}

function formatTowersList(towersArray) {
    if (towersArray.length === 0) return "None Yet";
    return towersArray.map(t => {
        if (t.startsWith("Golden ")) {
            return `<span style="color: #b45309; font-weight: bold;">🌟 ${t}</span>`;
        }
        return `<span>${t}</span>`;
    }).join(", ");
}

function resetShelfVisuals() {
    if (shelfMapContent) shelfMapContent.innerHTML = "None Yet";
    if (shelfModeContent) shelfModeContent.innerHTML = "None Yet";
    if (shelfModsContent) shelfModsContent.innerHTML = "None Yet";
    if (shelfTowersContent) shelfTowersContent.innerHTML = "None Yet";
}

function updateShelfDashboard(map, mode, mods, towers) {
    let modeColor = getModeColor(mode);
    let modsText = mods.length > 0 ? mods.join(", ") : "None";

    if (map && shelfMapContent) shelfMapContent.innerHTML = `<span style="color: #0ea5e9;">${map}</span>`;
    if (mode && shelfModeContent) shelfModeContent.innerHTML = `<span style="color: ${modeColor}">${mode}</span>`;
    if (currentStage === 'SPINNING_MODS' || mods.length > 0) {
        if (shelfModsContent) shelfModsContent.innerHTML = `<span style="color: #ea580c;">${modsText}</span>`;
    }
    if (currentStage === 'SPINNING_TOWERS' || towers.length > 0) {
        if (shelfTowersContent) shelfTowersContent.innerHTML = formatTowersList(towers);
    }
}

export function setupWheel() {
    awaitingConfirmation = false;
    if (skipBtn) skipBtn.style.display = "none";

    if (currentStage === 'MAP') {
        titleHeader.textContent = "🎡 TDS Map Wheel";
        spinBtn.textContent = "🎲 Spin Map";
        spinBtn.style.background = "#d93838";
        spinBtn.style.boxShadow = "0 4px 14px rgba(217, 56, 56, 0.3)";

        let copy = [...allMaps];
        currentItems = [];
        for (let i = 0; i < 8; i++) {
            let r = Math.floor(Math.random() * copy.length);
            currentItems.push(copy[r]);
            copy.splice(r, 1);
        }
    } else if (currentStage === 'MODE') {
        titleHeader.textContent = "⚙️ TDS Gamemode Wheel";
        spinBtn.textContent = "⚡ Spin Gamemode";
        spinBtn.style.background = "#0ea5e9";
        spinBtn.style.boxShadow = "0 4px 14px rgba(14, 165, 233, 0.3)";
        currentItems = [...gameModes];
    } else if (currentStage === 'MOD_COUNT') {
        titleHeader.textContent = "⚠️ TDS Modifiers Count";
        spinBtn.textContent = "🔥 Spin Modifiers Count";
        spinBtn.style.background = "#a855f7";
        spinBtn.style.boxShadow = "0 4px 14px rgba(168, 85, 247, 0.3)";
        currentItems = ["0", "1", "2", "3", "4", "5", "6", "7"];
    } else if (currentStage === 'SPINNING_MODS') {
        titleHeader.textContent = `🔮 Spinning Modifier ${currentModSpinCount + 1} of ${totalModsToSpin}`;
        spinBtn.textContent = `🌀 Spin Modifier #${currentModSpinCount + 1}`;
        spinBtn.style.background = "#ec4899";
        spinBtn.style.boxShadow = "0 4px 14px rgba(236, 72, 153, 0.3)";

        let tempCopy = [...modifierPoolCopy];
        currentItems = [];
        let slicesCount = Math.min(6, tempCopy.length);
        for (let i = 0; i < slicesCount; i++) {
            let r = Math.floor(Math.random() * tempCopy.length);
            currentItems.push(tempCopy[r]);
            tempCopy.splice(r, 1);
        }
    } else if (currentStage === 'SPINNING_TOWERS') {
        titleHeader.textContent = `🛡️ Drafting Tower Slot ${currentTowerSlotCount + 1} of 5`;
        spinBtn.textContent = `🚀 Spin Tower Slot #${currentTowerSlotCount + 1}`;
        spinBtn.style.background = "#10b981";
        spinBtn.style.boxShadow = "0 4px 14px rgba(16, 185, 129, 0.3)";

        let tempCopy = [...towerPoolCopy];
        currentItems = [];
        let slicesCount = Math.min(6, tempCopy.length);
        for (let i = 0; i < slicesCount; i++) {
            let r = Math.floor(Math.random() * tempCopy.length);
            currentItems.push(tempCopy[r]);
            tempCopy.splice(r, 1);
        }
    }
    rotation = 0;
    lastTickSliceIndex = -1;
    drawWheel();
}

export function drawWheel() {
    if (!ctx) return;

    ctx.clearRect(0, 0, 600, 600);
    let slice = (Math.PI * 2) / currentItems.length;

    let normalizedRotation = rotation % (Math.PI * 2);
    if (normalizedRotation < 0) normalizedRotation += Math.PI * 2;

    let pointerAngle = (Math.PI * 1.5) - normalizedRotation;
    if (pointerAngle < 0) pointerAngle += Math.PI * 2;
    let currentSliceAtPointer = Math.floor(pointerAngle / slice) % currentItems.length;

    if (spinning && currentSliceAtPointer !== lastTickSliceIndex) {
        playTickSound();
        lastTickSliceIndex = currentSliceAtPointer;
    }

    for (let i = 0; i < currentItems.length; i++) {
        let start = rotation + i * slice;
        let end = start + slice;

        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, end);

        if (currentStage === 'MAP') {
            ctx.fillStyle = i % 2 ? "#e0f2fe" : "#bae6fd";
        } else if (currentStage === 'MODE') {
            if (currentItems[i] === "Casual Mode") {
                ctx.fillStyle = "#cbd5e1";
            } else if (currentItems[i] === "Easy Mode") {
                ctx.fillStyle = "#86efac";
            } else if (currentItems[i] === "Intermediate Mode") {
                ctx.fillStyle = "#fdbb74";
            } else if (currentItems[i] === "Molten Mode") {
                ctx.fillStyle = "#fca5a5";
            } else if (currentItems[i] === "Fallen Mode") {
                ctx.fillStyle = "#d8b4fe";
            } else if (currentItems[i] === "Frost Mode") {
                ctx.fillStyle = "#7dd3fc";
            } else if (currentItems[i] === "Hidden Wave") {
                ctx.fillStyle = "#f472b6";
            } else {
                ctx.fillStyle = i % 2 ? "#f1f5f9" : "#e2e8f0";
            }
        } else if (currentStage === 'MOD_COUNT') {
            ctx.fillStyle = i % 2 ? "#e9d5ff" : "#c084fc";
        } else if (currentStage === 'SPINNING_MODS') {
            ctx.fillStyle = i % 2 ? "#fbcfe8" : "#f472b6";
        } else {
            if (currentItems[i] && currentItems[i].startsWith("Golden ")) {
                ctx.fillStyle = i % 2 ? "#fef08a" : "#facc15";
            } else {
                ctx.fillStyle = i % 2 ? "#a7f3d0" : "#34d399";
            }
        }
        ctx.fill();

        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(start + slice / 2);

        if (currentStage === 'SPINNING_TOWERS' && currentItems[i] && currentItems[i].startsWith("Golden ")) {
            ctx.fillStyle = "#78350f";
        } else {
            ctx.fillStyle = "#1e293b";
        }

        ctx.font = "bold 13px Arial";
        ctx.textAlign = "right";
        ctx.fillText(currentItems[i], radius - 25, 5);
        ctx.restore();
    }

    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.moveTo(300, 56);
    ctx.lineTo(280, 16);
    ctx.lineTo(320, 16);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();
}

function startTowerDraftStage() {
    towerPoolCopy = [...tdsTowers];
    currentTowerSlotCount = 0;
    selectedTowers = [];
    currentStage = 'SPINNING_TOWERS';
    setupWheel();
}

function finishGame() {
    let displayMods = selectedModifiers.length > 0 ? selectedModifiers.join(", ") : "None";
    let displayTowers = formatTowersList(selectedTowers);
    let modeColor = getModeColor(selectedMode);

    summaryDiv.innerHTML = `⚔️ <strong>FINAL SETUP:</strong> ${selectedMap} (<span style="color:${modeColor}; font-weight: bold;">${selectedMode}</span>)<br>
                            <span style="font-size: 16px; color: #ea580c;">⚠️ Modifiers: ${displayMods}</span><br>
                            <span style="font-size: 18px; color: #059669;">🛡️ Defending Towers: ${displayTowers}</span>`;

    updateShelfDashboard(selectedMap, selectedMode, selectedModifiers, selectedTowers);

    currentStage = 'FINISHED';
    spinBtn.textContent = "🔄 Reset Wheel";
    spinBtn.style.background = "#059669";
    spinBtn.style.boxShadow = "0 4px 14px rgba(5, 150, 105, 0.3)";
    awaitingConfirmation = false;
}

function finalizeSpinResult() {
    spinning = false;
    if (skipBtn) skipBtn.style.display = "none";

    rotation = targetAngle % (Math.PI * 2);
    drawWheel();

    playChimeSound();

    awaitingConfirmation = true;
    spinBtn.textContent = "Continue ➡️";
    spinBtn.style.background = "#16a34a";
    spinBtn.style.boxShadow = "0 4px 14px rgba(22, 163, 74, 0.3)";

    if (currentStage === 'MAP') {
        selectedMap = currentItems[targetIndex];
        resultDiv.textContent = "🎯 Map Picked: " + selectedMap;

    } else if (currentStage === 'MODE') {
        selectedMode = currentItems[targetIndex];
        let displayColor = getModeColor(selectedMode);

        if (selectedMode === "Hidden Wave") {
            resultDiv.innerHTML = "💀 <span style='color: #be123c;'>MODE: HIDDEN WAVE</span> 💀";
        } else if (selectedMode === "Frost Mode") {
            resultDiv.innerHTML = "❄️ <span style='color: #2563eb;'>MODE: FROST MODE</span> ❄️";
        } else {
            resultDiv.innerHTML = `🎮 Mode Picked: <span style="color: ${displayColor}; font-weight: bold;">${selectedMode}</span>`;
        }

    } else if (currentStage === 'MOD_COUNT') {
        totalModsToSpin = parseInt(currentItems[targetIndex]);
        resultDiv.textContent = `🎲 Total Modifiers to Spin: ${totalModsToSpin}`;

        let displayMods = selectedModifiers.length > 0 ? selectedModifiers.join(", ") : "None";
        let modeColor = getModeColor(selectedMode);
        summaryDiv.innerHTML = `⚔️ Match: ${selectedMap} (<span style="color: ${modeColor}">${selectedMode}</span>)<br><span style="font-size: 14px; color: #ea580c;">Modifiers: ${displayMods}</span>`;

    } else if (currentStage === 'SPINNING_MODS') {
        let pickedMod = currentItems[targetIndex];
        selectedModifiers.push(pickedMod);

        let indexInPool = modifierPoolCopy.indexOf(pickedMod);
        if (indexInPool > -1) modifierPoolCopy.splice(indexInPool, 1);

        currentModSpinCount++;
        resultDiv.textContent = `✨ Rolled Modifier: ${pickedMod}`;

        let displayMods = selectedModifiers.join(", ");
        let modeColor = getModeColor(selectedMode);
        summaryDiv.innerHTML = `⚔️ Match: ${selectedMap} (<span style="color: ${modeColor}">${selectedMode}</span>)<br><span style="font-size: 14px; color: #ea580c;">Modifiers: ${displayMods}</span>`;

        if (currentModSpinCount >= totalModsToSpin || modifierPoolCopy.length === 0) {
            spinBtn.textContent = "Proceed to Tower Slots 🛡️";
        }

    } else if (currentStage === 'SPINNING_TOWERS') {
        let pickedTower = currentItems[targetIndex];
        selectedTowers.push(pickedTower);

        let indexInPool = towerPoolCopy.indexOf(pickedTower);
        if (indexInPool > -1) towerPoolCopy.splice(indexInPool, 1);

        currentTowerSlotCount++;

        if (pickedTower.startsWith("Golden ")) {
            resultDiv.innerHTML = `🌟 Slot #${currentTowerSlotCount} Picked: <span style="color: #b45309; font-weight: bold;">${pickedTower}</span>`;
        } else {
            resultDiv.textContent = `🛡️ Slot #${currentTowerSlotCount} Picked: ${pickedTower}`;
        }

        let displayMods = selectedModifiers.length > 0 ? selectedModifiers.join(", ") : "None";
        let displayTowers = formatTowersList(selectedTowers);
        let modeColor = getModeColor(selectedMode);
        summaryDiv.innerHTML = `⚔️ Match: ${selectedMap} (<span style="color: ${modeColor}">${selectedMode}</span>)<br>
                                <span style="font-size: 14px; color: #ea580c;">Modifiers: ${displayMods}</span><br>
                                <span style="font-size: 14px; color: #059669;">Towers Layout: ${displayTowers}</span>`;

        if (currentTowerSlotCount >= 5 || towerPoolCopy.length === 0) {
            spinBtn.textContent = "See Final Match Setup 🏁";
        }
    }

    updateShelfDashboard(selectedMap, selectedMode, selectedModifiers, selectedTowers);
}

export function handleButtonClick() {
    if (spinning) return;

    if (currentStage === 'FINISHED') {
        currentStage = 'MAP';
        selectedMap = "";
        selectedMode = "";
        selectedModifiers = [];
        selectedTowers = [];
        totalModsToSpin = 0;
        currentModSpinCount = 0;
        currentTowerSlotCount = 0;
        resultDiv.textContent = "";
        summaryDiv.textContent = "";
        resetShelfVisuals();
        setupWheel();
        return;
    }

    if (awaitingConfirmation) {
        if (currentStage === 'MAP') {
            currentStage = 'MODE';
            setupWheel();
        } else if (currentStage === 'MODE') {
            currentStage = 'MOD_COUNT';
            setupWheel();
        } else if (currentStage === 'MOD_COUNT') {
            if (totalModsToSpin === 0) {
                if (shelfModsContent) shelfModsContent.innerHTML = `<span style="color: #64748b;">None (Skipped)</span>`;
                startTowerDraftStage();
            } else {
                modifierPoolCopy = [...standardModifiers];
                currentModSpinCount = 0;
                selectedModifiers = [];
                currentStage = 'SPINNING_MODS';
                setupWheel();
            }
        } else if (currentStage === 'SPINNING_MODS') {
            if (currentModSpinCount < totalModsToSpin && modifierPoolCopy.length > 0) {
                setupWheel();
            } else {
                startTowerDraftStage();
            }
        } else if (currentStage === 'SPINNING_TOWERS') {
            if (currentTowerSlotCount < 5 && towerPoolCopy.length > 0) {
                setupWheel();
            } else {
                finishGame();
            }
        }
        return;
    }

    spinning = true;
    resultDiv.textContent = "Spinning...";
    if (skipBtn) skipBtn.style.display = "inline-block";

    if (currentStage === 'MODE') {
        let totalWeight = weightedGameModes.reduce((sum, item) => sum + item.weight, 0);
        let randomWeightChoice = Math.floor(Math.random() * totalWeight);

        let chosenModeName = "";
        for (let i = 0; i < weightedGameModes.length; i++) {
            randomWeightChoice -= weightedGameModes[i].weight;
            if (randomWeightChoice < 0) {
                chosenModeName = weightedGameModes[i].mode;
                break;
            }
        }
        targetIndex = currentItems.indexOf(chosenModeName);
    } else {
        targetIndex = Math.floor(Math.random() * currentItems.length);
    }

    let sliceSize = (Math.PI * 2) / currentItems.length;
    let fullSpins = 5 * Math.PI * 2;

    targetAngle = fullSpins + (1.5 * Math.PI) - (targetIndex * sliceSize) - (sliceSize / 2);
    let startTime = null;
    let startRotation = rotation;

    function animate(time) {
        if (!spinning) return;

        if (!startTime) startTime = time;
        let progress = (time - startTime) / 4000;
        if (progress > 1) progress = 1;

        let ease = 1 - Math.pow(1 - progress, 4);
        rotation = startRotation + (targetAngle * ease);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            finalizeSpinResult();
        }
    }
    requestAnimationFrame(animate);
}

export function handleSkipClick() {
    if (!spinning) return;
    spinning = false;
    finalizeSpinResult();
}
