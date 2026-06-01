// ============================================================
// TDS Toolkit - Main Application Entry Point
// ============================================================

import { calculateTowerMetrics } from './calculator.js';
import { updateCoinsWallet, adjustPerk, resetSkillTree } from './skilltree.js';
import { initWheel, setupWheel, drawWheel, handleButtonClick, handleSkipClick, spinning } from './wheel.js';

// Tab routing state
let currentAppTab = 'wheel';

// ============================================================
// SYSTEM NAVIGATION TABS ROUTER
// ============================================================
function switchAppTab(selectedTargetTab) {
    if (spinning) return;

    currentAppTab = selectedTargetTab;

    document.querySelectorAll('.chrome-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content-view').forEach(v => v.style.display = 'none');

    document.getElementById('tab-' + selectedTargetTab).classList.add('active');

    let activeViewNode = document.getElementById('view-' + selectedTargetTab);
    if (selectedTargetTab === 'wheel') {
        activeViewNode.style.display = 'flex';
        drawWheel();
    } else {
        activeViewNode.style.display = 'block';
    }
}

// ============================================================
// INITIALIZATION
// ============================================================
function init() {
    // Expose functions globally for inline onclick handlers in HTML
    window.switchAppTab = switchAppTab;
    window.calculateTowerMetrics = calculateTowerMetrics;
    window.updateCoinsWallet = updateCoinsWallet;
    window.adjustPerk = adjustPerk;
    window.resetSkillTree = resetSkillTree;

    // Initialize wheel module
    initWheel();

    // Set up event listeners
    document.getElementById('spinBtn').addEventListener('click', handleButtonClick);
    const skipBtn = document.getElementById('skipBtn');
    if (skipBtn) skipBtn.addEventListener('click', handleSkipClick);

    // Start the wheel
    setupWheel();

    // Initialize wallet tracker
    updateCoinsWallet();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
