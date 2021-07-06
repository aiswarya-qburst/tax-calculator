import { Slab } from '../../models/common.interface';

/**
 * Gets the total tax amount to be paid annually and montly using income and deduction.
 * @param netTaxIncome (income - deduction) amount
 * @param slab tax slab
 * @returns annual tax amount
 */
export const getTotalTax = ((netTaxIncome: number, slab: Slab[]): number => {
    let annual = 0;

    slab.every((s) => {
        if (!s.end || (netTaxIncome > s.start && netTaxIncome <= s.end)) {
            annual = annual + (netTaxIncome - s.start) * (s.rate / 100);
            return false;
        } else if (netTaxIncome > s.end) {
            annual = annual + (s.end - s.start) * (s.rate / 100);
        }

        return true;
    });

    return annual;
});

/**
 * Gets total annual tax amount with cess included
 * @param totalTax Total annual tax amount
 * @returns tax with cess included
 */
export const getWithCess = (totalTax: number, cess: number): number =>
    totalTax + totalTax * (cess / 100);

/**
 * Calculate sum of all incoming values 
 * @param data array of values  
 * @returns sum of array elements
 */
export const getTotal = (data: number[]): number =>
    data.reduce((acc: number, val: number) => acc + val, 0);

/**
 * Gets total income
 * @param income total income
 * @param deduction total deduction
 * @returns (income - deduction) amount
 */
export const getTotalIncome = (income: number, deduction: number): number => income - deduction;