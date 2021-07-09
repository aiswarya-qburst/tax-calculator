import { getTotalTax, getWithCess, getTotal, getTotalIncome } from '../taxCalculator';
import 'isomorphic-fetch';

async function getSlab(regime: string) {
    return fetch(`http://localhost:8000/tax-slab`)
        .then((result) => result.json())
        .then((data) => data[regime])
        .catch((e) => console.error(e));
}

const income = [1650000, 20000, 5000];

const deduction = [150000, 12000, 8000];

const cess = 4;

const oldRegimetestSet = [
    [20000, 0, 0],
    [100000, 0, 0],
    [300000, 2500, 2600],
    [600000, 32500, 33800],
    [872000, 86900, 90376],
    [1128303, 150991, 157030.64],
    [1445000, 246000, 255840], // 2,55,840 - 9,840 = 246000
    [1499999, 262500, 273000],
    [1500000, 262500, 273000],
    [2054385, 428816, 445968.64]
];

const newRegimetestSet = [
    [20000, 0, 0],
    [100000, 0, 0],
    [300000, 2500, 2600],
    [600000, 22500, 23400],
    [872000, 55800, 58032],
    [1128303, 100661, 104687.44],
    [1445000, 173750, 180700],
    [1499999, 187500, 195000],
    [1500000, 187500, 195000],
    [2054385, 353816, 367968.64],
    [1908000, 309900, 322296] // 3,22,296 - 12,396 = 309900
];

describe("Total of amounts", () => {
    test("Income", () => {
        expect(getTotal(income)).toBe(1675000);
    });
    test("Deductions", () => {
        expect(getTotal(deduction)).toBe(170000);
    });
    test("Total Income - Total Deduction", () => {
        expect(getTotalIncome(getTotal(income), getTotal(deduction))).toBe(1505000);
    });
});

describe("Tax according to Old Regime", () => {
    test.each(oldRegimetestSet)("Annual tax for income of Rs %i", (netIncome, total, totalWithCess) => {
        getSlab("old")
            .then((slab) => expect(Math.round(getTotalTax(netIncome, slab).annual)).toBe(total))
            .then(() => expect(getWithCess(total, cess)).toBe(totalWithCess))
            .catch((e) => console.error(e));
    });
});

describe("Tax according to New Regime", () => {
    test.each(newRegimetestSet)("Annual tax for income of Rs %i", (netIncome, total, totalWithCess) => {
        getSlab("new")
            .then((slab) => expect(Math.round(getTotalTax(netIncome, slab).annual)).toBe(total))
            .then(() => expect(getWithCess(total, cess)).toBe(totalWithCess))
            .catch((e) => console.error(e));
    });
});