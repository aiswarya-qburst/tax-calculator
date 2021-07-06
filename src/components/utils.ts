/**
 * Transform input text. eg: Total Income -> total_income
 * @param label 
 * @returns all lowercase text with underscrore as word separator
 */
export const getName = (label: string): string => label.toLowerCase().replace(/ /g, '_');