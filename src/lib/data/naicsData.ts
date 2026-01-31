// src/lib/data/naicsData.ts


// Add this to your existing naicsData.ts

export function getNAICSDescription(code: string): string {
  if (!code) return 'Unclassified';

  // 1. Identify the parent keys
  const sectorKey = getSectorKey(code); // Handles '31-33' range logic
  const subsectorKey = code.substring(0, 3);

  // 2. Lookup based on length
  // Industry Level (6-digits)
  if (code.length === 6) {
    return naicsIndustries[subsectorKey]?.[code] || 'Unknown Industry';
  }

  // Subsector Level (3-digits)
  if (code.length === 3) {
    return naicsSubsectors[sectorKey]?.[code] || 'Unknown Subsector';
  }

  // Sector Level (2-digits or range)
  if (naicsSectors[sectorKey]) {
    return naicsSectors[sectorKey];
  }

  return 'Unknown Category';
}



export const naicsSectors: Record<string, string> = {
  '11': 'Agriculture, Forestry, Fishing and Hunting',
  '23': 'Construction',
  '31-33': 'Manufacturing',
  '54': 'Professional, Scientific, and Technical Services',
  '81': 'Other Services (except Public Administration)'
};

export const naicsSubsectors: Record<string, Record<string, string>> = {
  '11': {
    '111': 'Crop Production',
    '112': 'Animal Production and Aquaculture',
    '114': 'Fishing, Hunting and Trapping'
  },
  '23': {
    '236': 'Construction of Buildings',
    '237': 'Heavy and Civil Engineering Construction',
    '238': 'Specialty Trade Contractors'
  },
  '31-33': {
    '311': 'Food Manufacturing',
    '332': 'Fabricated Metal Product Manufacturing',
    '339': 'Miscellaneous Manufacturing'
  },
  '54': {
    '541': 'Professional, Scientific, and Technical Services'
  },
  '81': {
    '811': 'Repair and Maintenance',
    '812': 'Personal and Laundry Services'
  }
};

export const naicsIndustries: Record<string, Record<string, string>> = {
  // Agriculture
  '111': { '111110': 'Soybean Farming', '111421': 'Nursery and Tree Production' },
  // Construction
  '236': { '236115': 'New Single-Family Housing Construction', '236220': 'Commercial Building Construction' },
  '238': { '238210': 'Electrical Contractors', '238220': 'Plumbing and HVAC Contractors' },
  // Manufacturing
  '311': { '311111': 'Dog and Cat Food Manufacturing', '311811': 'Retail Bakeries' },
  '339': { '339995': 'Burial Casket Manufacturing', '339112': 'Surgical and Medical Instrument Manufacturing' },
  // Professional
  '541': { '541110': 'Offices of Lawyers', '541211': 'Offices of CPAs', '541511': 'Custom Computer Programming Services', '541810': 'Advertising Agencies' },
  // Other Services
  '811': { '811111': 'General Automotive Repair', '811212': 'Computer and Office Machine Repair' },
  '812': { '812112': 'Beauty Salons', '812320': 'Drycleaning and Laundry Services' }
};

/**
 * Helper to find the correct sector key (handles ranges like 31-33)
 */
export function getSectorKey(code: string): string {
  if (!code) return '';
  const prefix = code.substring(0, 2);
  const numericPrefix = parseInt(prefix);

  if (numericPrefix >= 31 && numericPrefix <= 33) return '31-33';
  return prefix;
}