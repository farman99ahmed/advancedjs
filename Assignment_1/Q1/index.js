const battles = require('./data');

let attacker_king = {};
let defender_king = {};
let region = {};
let name = {};

let result = {
    most_active: {
        attacker_king: "",
        defender_king: "",
        region: "",
        name: "",
    },
    attacker_outcome: {
        win: 0,
        loss: 0
    },
    battle_type: [],
    defender_size: {
        average: 0,
        min: battles[0]['defender_size'],
        max: battles[0]['defender_size']
    }
};

const getMaxFromObject = (obj) => Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);

const getPartialResult = () => battles.forEach(battle => {
    attacker_king[battle['attacker_king']] = attacker_king[battle['attacker_king']] ? attacker_king[battle['attacker_king']] + 1 : 1;
    defender_king[battle['defender_king']] = defender_king[battle['defender_king']] ? defender_king[battle['defender_king']] + 1 : 1;
    region[battle['region']] = region[battle['region']] ? region[battle['region']] + 1 : 1;
    name[battle['name']] = name[battle['name']] ? name[battle['name']] + 1 : 1;
    if (battle['attacker_outcome'] != "") result.attacker_outcome[battle['attacker_outcome']] += 1;
    if (battle['battle_type'] != "" && !result.battle_type.includes(battle['battle_type'])) result.battle_type.push(battle['battle_type']);
    if (battle['defender_size'] != "" && battle['defender_size'] != null) {
        result.defender_size.min > battle['defender_size'] ? result.defender_size.min = battle['defender_size'] : result.defender_size.min;
        result.defender_size.max < battle['defender_size'] ? result.defender_size.max = battle['defender_size'] : battle['defender_size'];
        result.defender_size.average += battle['defender_size'];
    }
});

getPartialResult();

result.most_active.attacker_king = getMaxFromObject(attacker_king);
result.most_active.defender_king = getMaxFromObject(defender_king);
result.most_active.region = getMaxFromObject(region);
result.most_active.name = getMaxFromObject(name);
result.defender_size.average /= battles.length;

console.log(result);