// ============================================================
// TDS Toolkit - DPS & Cost Efficiency Calculator Module
// ============================================================

export function calculateTowerMetrics() {
    let dmg = parseFloat(document.getElementById('calc-damage').value) || 0;
    let rate = parseFloat(document.getElementById('calc-firerate').value) || 0;
    let cost = parseFloat(document.getElementById('calc-cost').value) || 0;

    let computedDPS = 0;
    let computedEfficiency = 0;

    if (rate > 0) {
        computedDPS = dmg / rate;
    }

    if (computedDPS > 0) {
        computedEfficiency = cost / computedDPS;
    }

    document.getElementById('res-dps').textContent = computedDPS.toFixed(2);
    document.getElementById('res-efficiency').textContent = '$' + computedEfficiency.toFixed(2);
}
