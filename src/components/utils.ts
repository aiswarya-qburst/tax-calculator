import { Slab } from "../models/slab.interface";
import { StageTotal } from "../models/tax.interface";

/**
 * Transform input text. eg: Total Income -> total_income
 * @param label 
 * @returns all lowercase text with underscrore as word separator
 */
export const getName = (label: string): string => label.toLowerCase().replace(/ /g, '_');

/**
 * Get the tax amount in between stages
 * @param slab Slab at the incoming stage
 * @param amount amount at the incoming stage
 */
export const getFormattedResult = (slab: Slab, amount: number, total: number): StageTotal => {
    return {
        range: `${slab.start} - ${slab.end}`,
        rate: `${slab.rate}% [${slab.rate}% of (Rs ${amount} - Rs ${slab.start})]`,
        totalOfStage: `${total}`,
    }
};