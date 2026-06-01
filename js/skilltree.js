// ============================================================
// TDS Toolkit - Skill Tree Module
// ============================================================

import { talentMaxCaps, skillCostDatabase, progressionDependencies } from './data.js';

// Talent allocation state
export let talentAllocation = {
    resource: 0, budget: 0, stonks: 0, scavenger: 0,
    fortify: 0, overheal: 0, bandages: 0, cond: 0, minions: 0,
    optics: 0, gunpowder: 0, fightdirty: 0, precision: 0,
    accelerator: 0, scholar: 0, barracks: 0, reinf: 0
};

function getPerkRankCost(perkKey, currentRank) {
    if (skillCostDatabase[perkKey]) {
        if (currentRank >= talentMaxCaps[perkKey]) return 0;
        return skillCostDatabase[perkKey][currentRank];
    }
    return 0;
}

function calculateTotalSpentCoins() {
    let totalCoinsSpent = 0;
    for (let key in talentAllocation) {
        let allocatedRanks = talentAllocation[key];
        if (skillCostDatabase[key]) {
            for (let i = 0; i < allocatedRanks; i++) {
                totalCoinsSpent += skillCostDatabase[key][i];
            }
        }
    }
    return totalCoinsSpent;
}

function updateAllCostLabels() {
    for (let key in talentAllocation) {
        let currentRank = talentAllocation[key];
        let labelNode = document.getElementById('cost-lbl-' + key);
        if (labelNode) {
            if (currentRank >= talentMaxCaps[key]) {
                labelNode.textContent = "MAX RANK REACHED";
                labelNode.style.color = "#16a34a";
            } else {
                let nextCost = getPerkRankCost(key, currentRank);
                labelNode.textContent = "Next Rank: " + nextCost.toLocaleString() + " 🪙";
                labelNode.style.color = "#b45309";
            }
        }
    }
}

export function updateCoinsWallet() {
    let startingCoinsValue = parseFloat(document.getElementById('tree-start-coins').value) || 0;
    let spent = calculateTotalSpentCoins();
    let balance = startingCoinsValue - spent;

    let balanceDisplay = document.getElementById('tree-remaining-coins');
    balanceDisplay.textContent = balance.toLocaleString();

    if (balance < 0) {
        balanceDisplay.style.color = '#ef4444';
    } else {
        balanceDisplay.style.color = '#047857';
    }

    updateAllCostLabels();
}

export function adjustPerk(perkKey, amount) {
    let startingCoinsValue = parseFloat(document.getElementById('tree-start-coins').value) || 0;
    let currentLevel = talentAllocation[perkKey];
    let nextLevel = currentLevel + amount;

    // Check rank caps
    if (nextLevel < 0 || nextLevel > talentMaxCaps[perkKey]) return;

    // 🔒 Enforce dynamic layout tree dependency paths
    if (amount > 0) {
        let dep = progressionDependencies[perkKey];
        if (dep && talentAllocation[dep.skill] < dep.rank) {
            let parentCard = document.getElementById('rank-' + dep.skill);
            let parentName = parentCard ? parentCard.parentElement.previousElementSibling.innerText : dep.skill;
            alert(`🔒 Locked! Requires Rank ${dep.rank} in ${parentName}.`);
            return;
        }
    } else if (amount < 0) {
        // Prevent downgrading a prerequisite parent if a child skill relies on it
        for (let childKey in progressionDependencies) {
            let dep = progressionDependencies[childKey];
            if (dep.skill === perkKey && talentAllocation[childKey] > 0 && nextLevel < dep.rank) {
                alert(`Cannot downgrade! Downstream active upgrades depend on keeping this branching pathway open.`);
                return;
            }
        }
    }

    // Check cost validation limits
    if (amount > 0) {
        let potentialAllocation = { ...talentAllocation };
        potentialAllocation[perkKey] = nextLevel;

        let dynamicCostSum = 0;
        for (let key in potentialAllocation) {
            let ranks = potentialAllocation[key];
            if (skillCostDatabase[key]) {
                for (let i = 0; i < ranks; i++) dynamicCostSum += skillCostDatabase[key][i];
            }
        }

        if (dynamicCostSum > startingCoinsValue) {
            alert("⚠️ Not enough coins to purchase this upgrade rank!");
            return;
        }
    }

    // Apply allocation changes
    talentAllocation[perkKey] = nextLevel;

    // Update display nodes
    document.getElementById('val-' + perkKey).textContent = nextLevel;
    document.getElementById('rank-' + perkKey).textContent = nextLevel;

    updateCoinsWallet();
}

export function resetSkillTree() {
    for (let key in talentAllocation) {
        talentAllocation[key] = 0;
        let valNode = document.getElementById('val-' + key);
        let rankNode = document.getElementById('rank-' + key);
        if (valNode) valNode.textContent = 0;
        if (rankNode) rankNode.textContent = 0;
    }
    updateCoinsWallet();
}
