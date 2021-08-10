const fetch = require('cross-fetch');

const result = async () => {
    try {
        const res = await fetch('http://api.nobelprize.org/v1/prize.json');
        if (res.status != 200) {
            throw new Error(`Error Code: ${res.status}. Try again later.`)
        } else {
            const prizes = await res.json();
            prizes.prizes.forEach(prize => {
                if ((prize.year >= 2000) && (prize.year <= 2019) && (prize.category === "chemistry")) {
                    console.log(`\nYEAR: ${prize.year}`);
                    prize.laureates.forEach(laureate => {
                        console.log(`${laureate.firstname} ${laureate.surname}`);
                    });
                }
            });
        }
    } catch (err) {
        console.error(err.message);
    }
};

result();