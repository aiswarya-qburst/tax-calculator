import { getTotalTax, getWithCess, getTotal, getTotalIncome } from '../taxCalculator';
import 'isomorphic-fetch';

async function getSlab(regime) {
    return fetch(`http://localhost:8000/tax-slab`)
        .then((result) => result.json())
        .then((data) => data[regime])
        .catch((e) => console.error(e));
}

const oldRegimetestSet = [
    [20000, 0],
    [100000, 0],
    [300000, 2500],
    [600000, 32500],
    [872000, 86900],
    [1128303, 150991],
    [1445000, 246000], // 2,55,840 - 9,840 = 246000
    [1499999, 262500],
    [1500000, 262500],
    [2054385, 428816]
];

const newRegimetestSet = [
    // [22000, 2000, 20000, 0, 0],
    [100000, 0],
    [300000, 2500],
    [600000, 22500],
    [872000, 55800],
    [1128303, 100661],
    [1445000, 173750],
    [1499999, 187500],
    [1500000, 187500],
    [2054385, 353816],
    [1908000, 309900] // 3,22,296 - 12,396 = 309900
];

describe("Tax according to Old Regime", () => {
    test.each(oldRegimetestSet)("Annual tax for income of Rs %i", (a, expected) => {
        getSlab("old")
            .then((slab) => expect(Math.round(getTotalTax(a, slab))).toBe(expected))
            .catch((e) => console.error(e));
    });
});

describe("Tax according to New Regime", () => {
    test.each(newRegimetestSet)("Annual tax for income of Rs %i", (a, expected) => {
        getSlab("new")
            .then((slab) => expect(Math.round(getTotalTax(a, slab))).toBe(expected))
            .catch((e) => console.error(e));
    });
});

// const calc = (netTaxIncome, slab) => {
//     let annual = 0;
//     let result = [{ range: 'Gross income', rate: netTaxIncome, final: '-' }];

//     slab.every((s) => {
//         //if rate is 0, can return 0. No calculation necessary
//         if (!s.end || (netTaxIncome > s.start && netTaxIncome <= s.end)) {
//             annual = annual + (netTaxIncome - s.start) * (s.rate / 100);
//             result = [
//                 ...result,
//                 {
//                     range: `${s.start} - ${s.end}`,
//                     rate: `${s.rate}% [${s.rate}% of (Rs ${netTaxIncome} - Rs ${s.start})]`,
//                     final: `${(netTaxIncome - s.start) * (s.rate / 100)}`,
//                 },
//             ];
//             return false;
//         } else if (netTaxIncome > s.end) {
//             annual = annual + (s.end - s.start) * (s.rate / 100);
//             result = [
//                 ...result,
//                 {
//                     range: `${s.start} - ${s.end}`,
//                     rate: `${s.rate}% [${s.rate}% of (Rs ${s.end} - Rs ${s.start})]`,
//                     final: `${(s.end - s.start) * (s.rate / 100)}`,
//                 },
//             ];
//         }

//         return true;
//     });
//     console.table([
//         ...result,
//         {
//             range: '-',
//             rate: 'Total:',
//             final: Math.round(annual),
//         },
//     ]);

//     return Math.round(annual);
// };
