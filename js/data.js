// ============================================================
// TDS Toolkit - Data / Constants Module
// ============================================================

// Tower roster
export const tdsTowers = [
    "Scout", "Sniper", "Paintballer", "Demoman", "Slime Trooper", "Soldier", "Shotgunner",
    "Freezer", "Assassin", "Militant", "Hunter", "Pyromancer", "Ace Pilot", "Medic",
    "Farm", "Electroshocker", "Rocketeer", "Trapper", "Military Base", "Crook Boss",
    "Commander", "Warden", "Cowboy", "DJ Booth", "Tesla", "Saboteur", "Minigunner",
    "Ranger", "Pursuit", "Gatling Gun", "Turret", "Mortar", "Mercenary Base",
    "Brawler", "Necromancer", "Accelerator", "Engineer", "Hacker",
    "Gladiator", "Commando", "Slasher", "Frost Blaster", "Archer", "Swarmer",
    "Toxic Gunner", "Sledger", "Executioner", "Elf Camp", "Jester", "Cryomancer",
    "Hallow Punk", "Harvester", "Snowballer", "Elementalist", "Firework Technician",
    "Biologist", "Warlock", "Spotlight Tech",
    "Golden Minigunner", "Golden Pyromancer", "Golden Crook Boss", "Golden Scout",
    "Golden Cowboy", "Golden Soldier"
];

// All maps
export const allMaps = [
    "Abandoned City", "Abyssal Trench", "Autumn Falling", "Black Spot Exchange", "Candy Valley",
    "Cataclysm", "Chess Board", "Construction Crazy", "Coral Deep", "Crossroads",
    "Crystal Cave", "Cyber City", "Dead Ahead", "Deserted Village", "Dusty Bridges",
    "Farm Lands", "Forest Camp", "Forgetten Docks", "Four Seasons", "Fungi Island",
    "Gilded Path", "Grass Isle", "Harbor", "Hot Spot", "Iceville",
    "Infernal Abyss", "Lay By", "Lighthaos", "Marshlands", "Mason Arch",
    "Medieval Times", "Meltdown", "Midnight Issue", "Moon Base", "Nether",
    "Necropolis", "Night Station", "Northern Lights", "Pier Pressure", "Portland",
    "Retro Crossroads", "Retro Lighthouse", "Retro Rocket Arena", "Retro Stained Temple", "Retro The Heights",
    "Retro Zone", "Rocket Arena", "Ruby Escort", "Sacred Mountains", "Simplicity",
    "Sky Islands", "Space City", "Spring Fever", "Stained Temple", "Sugar Rush",
    "Summer Castle", "The Heights", "Toyboard", "Tropical Industries", "Tropical Isles",
    "U-Turn", "Winter Abyss", "Winter Bridges", "Winter Stronghold", "Wrecked Battlefield",
    "Wrecked Battlefield II"
];

// Game modes
export const gameModes = [
    "Casual Mode", "Easy Mode", "Intermediate Mode", "Molten Mode", "Fallen Mode", "Frost Mode", "Hidden Wave"
];

// Weighted game modes for random selection
export const weightedGameModes = [
    { mode: "Casual Mode", weight: 10 },
    { mode: "Easy Mode", weight: 10 },
    { mode: "Intermediate Mode", weight: 10 },
    { mode: "Molten Mode", weight: 25 },
    { mode: "Fallen Mode", weight: 22 },
    { mode: "Frost Mode", weight: 22 },
    { mode: "Hidden Wave", weight: 1 }
];

// Standard modifiers
export const standardModifiers = [
    "Hidden Enemies", "Glass", "Jailed", "Exploding Enemies", "Limitation",
    "Committed", "Healthy Enemies", "Speedy Enemies", "Fog", "Flying Enemies",
    "Broke", "Quarantine", "Inflation"
];

// ============================================================
// Skill Tree Data
// ============================================================

export const talentMaxCaps = {
    resource: 25, budget: 25, stonks: 20, scavenger: 20,
    fortify: 50, overheal: 25, bandages: 25, cond: 25, minions: 25,
    optics: 20, gunpowder: 25, fightdirty: 25, precision: 15,
    accelerator: 25, scholar: 20, barracks: 20, reinf: 10
};

export const skillCostDatabase = {
    // 🟢 UTILITY & ECONOMY
    resource: [
        10, 40, 75, 130, 190, 260, 340, 430, 530, 635, 750, 875,
        1005, 1145, 1295, 1450, 1610, 1780, 1955, 2140, 2330, 2530, 2730, 2945, 3160
    ],
    budget: [
        10, 45, 90, 155, 235, 325, 430, 550, 680, 825, 980, 1145,
        1325, 1520, 1720, 1935, 2165, 2400, 2650, 2910, 3180, 3460, 3750, 4050, 4365
    ],
    stonks: [
        30, 110, 225, 375, 560, 775, 1020, 1295, 1595, 1925, 2280, 2660,
        3070, 3500, 3960, 4440, 4950, 5480, 6030, 6610
    ],
    scavenger: [
        35, 135, 290, 500, 760, 1065, 1420, 1820, 2270, 2760, 3300, 3880,
        4505, 5170, 5880, 6635, 7430, 8265, 9140, 10060
    ],
    // 🔵 DEFENSE & VITALITY
    fortify: [
        5, 10, 20, 30, 45, 55, 70, 85, 100, 115, 135, 150, 170, 185, 205, 225, 245, 265, 285, 310,
        330, 350, 375, 400, 420, 445, 470, 495, 520, 545, 570, 595, 620, 650, 675, 700, 730, 755,
        785, 815, 845, 880, 910, 940, 975, 1010, 1045, 1080, 1120, 1160
    ],
    overheal: [
        15, 50, 100, 160, 235, 325, 420, 530, 645, 775, 910, 1055, 1205, 1370, 1540, 1720, 1905,
        2100, 2300, 2510, 2730, 2955, 3185, 3425, 3670
    ],
    bandages: [
        15, 50, 100, 160, 235, 325, 420, 530, 645, 775, 910, 1055, 1205, 1370, 1540, 1720, 1905,
        2100, 2300, 2510, 2730, 2955, 3185, 3425, 3670
    ],
    cond: [
        15, 55, 105, 175, 255, 355, 460, 580, 710, 850, 1005, 1165, 1340, 1525, 1715, 1915, 2130,
        2350, 2580, 2820, 3065, 3320, 3585, 3860, 4140
    ],
    minions: [
        20, 65, 130, 210, 305, 410, 535, 665, 815, 970, 1140, 1320, 1510, 1710, 1920, 2140, 2370,
        2605, 2855, 3110, 3375, 3650, 3935, 4225, 4525
    ],
    // 🔴 OFFENSE & WEAPONRY
    optics: [
        20, 75, 150, 245, 360, 490, 645, 810, 995, 1190, 1405, 1635, 1875, 2135, 2405, 2685, 2985,
        3295, 3615, 3955
    ],
    gunpowder: [
        15, 55, 105, 175, 255, 355, 460, 580, 710, 850, 1005, 1165, 1340, 1525, 1715, 1915, 2130,
        2350, 2580, 2820, 3065, 3320, 3585, 3860, 4140
    ],
    fightdirty: [
        15, 60, 120, 200, 300, 410, 540, 685, 845, 1015, 1205, 1405, 1615, 1845, 2085, 2335, 2600,
        2875, 3165, 3465, 3780, 4105, 4440, 4785, 5145
    ],
    precision: [
        50, 215, 490, 880, 1385, 2010, 2750, 3610, 4590, 5685, 6900, 8240, 9695, 11275, 12975
    ],
    // 🟣 TRAINING & LOGISTICS
    accelerator: [
        10, 40, 80, 135, 200, 275, 365, 460, 570, 685, 810, 945, 1090, 1240, 1405, 1575, 1750,
        1940, 2135, 2335, 2545, 2765, 2990, 3225, 3465
    ],
    scholar: [
        20, 65, 140, 240, 360, 505, 670, 855, 1060, 1285, 1530, 1795, 2075, 2380, 2700, 3040,
        3395, 3770, 4160, 4570
    ],
    barracks: [
        30, 100, 215, 370, 560, 785, 1045, 1340, 1670, 2030, 2420, 2850, 3305, 3795, 4315, 4865,
        5445, 6055, 6695, 7365
    ],
    reinf: [
        1000, 2830, 5195, 8000, 11180, 14695, 18520, 22625, 27000, 31620
    ]
};

export const progressionDependencies = {
    budget: { skill: 'resource', rank: 10 },
    stonks: { skill: 'budget', rank: 10 },
    scavenger: { skill: 'stonks', rank: 10 },
    overheal: { skill: 'fortify', rank: 10 },
    bandages: { skill: 'overheal', rank: 10 },
    cond: { skill: 'bandages', rank: 10 },
    minions: { skill: 'cond', rank: 10 },
    gunpowder: { skill: 'optics', rank: 10 },
    fightdirty: { skill: 'gunpowder', rank: 10 },
    precision: { skill: 'fightdirty', rank: 10 },
    scholar: { skill: 'accelerator', rank: 10 },
    barracks: { skill: 'accelerator', rank: 10 },
    reinf: { skill: 'barracks', rank: 10 }
};
