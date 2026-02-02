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
  '21': 'Mining, Quarrying, and Oil and Gas Extraction',
  '22': 'Utilities',
  '23': 'Construction',
  '31': 'Manufacturing',
  '32': 'Manufacturing',
  '33': 'Manufacturing',    
  '42': 'Wholesale Trade',
  '44': 'Retail Trade',
  '45': 'Retail Trade',  
  '48': 'Transportation and Warehousing',
  '49': 'Transportation and Warehousing',  
  '51': 'Information',
  '52': 'Finance and Insurance',
  '53': 'Real Estate and Rental and Leasing',
  '54': 'Professional, Scientific, and Technical Services',
  '55': 'Management of Companies and Enterprises',
  '56': 'Administrative and Support and Waste Management and Remediation Services',
  '61': 'Educational Services',
  '62': 'Health Care and Social Assistance',
  '71': 'Arts, Entertainment, and Recreation',
  '72': 'Accommodation and Food Services',
  '81': 'Other Services (except Public Administration)',
  '92': 'Public Administration'
};


export const naicsSubsectors: Record<string, Record<string, string>> = {
  '11': {
    '111': 'Crop Production',
    '112': 'Animal Production and Aquaculture',
    '113': 'Forestry and Logging',
    '114': 'Fishing, Hunting and Trapping',
    '115': 'Support Activities for Agriculture and Forestry'
  },
  '21': {
    '211': 'Oil and Gas Extraction',
    '212': 'Mining (except Oil and Gas)',
    '213': 'Support Activities for Mining'
  },
  '22': {
    '221': 'Utilities'
  },
  '23': {
    '236': 'Construction of Buildings',
    '237': 'Heavy and Civil Engineering Construction',
    '238': 'Specialty Trade Contractors'
  },
  '31': {
      '311': 'Food Manufacturing',
      '312': 'Beverage and Tobacco Product Manufacturing',
      '313': 'Textile Mills',
      '314': 'Textile Product Mills',
      '315': 'Apparel Manufacturing',
      '316': 'Leather and Allied Product Manufacturing',
  },
  '32': {
    '321': 'Wood Product Manufacturing',
    '322': 'Paper Manufacturing',
    '323': 'Printing and Related Support Activities',
    '324': 'Petroleum and Coal Products Manufacturing',
    '325': 'Chemical Manufacturing',
    '326': 'Plastics and Rubber Products Manufacturing',
    '327': 'Nonmetallic Mineral Product Manufacturing'
  },
  '33': {
    '331': 'Primary Metal Manufacturing',
    '332': 'Fabricated Metal Product Manufacturing',
    '333': 'Machinery Manufacturing',
    '334': 'Computer and Electronic Product Manufacturing',
    '335': 'Electrical Equipment, Appliance, and Component Manufacturing',
    '336': 'Transportation Equipment Manufacturing',
    '337': 'Furniture and Related Product Manufacturing',
    '339': 'Miscellaneous Manufacturing'
  },
  '42': {
    '423': 'Merchant Wholesalers, Durable Goods',
    '424': 'Merchant Wholesalers, Nondurable Goods',
    '425': 'Wholesale Trade Agents and Brokers'
  },
  '44': {
    '441': 'Motor Vehicle and Parts Dealers',
    '444': 'Building Material and Garden Equipment and Supplies Dealers',
    '445': 'Food and Beverage Retailers',
    '449': 'Furniture, Home Furnishings, Electronics, and Appliance Retailers',
  },
  '45': {
    '455': 'General Merchandise Retailers',
    '456': 'Health and Personal Care Retailers',
    '457': 'Gasoline Stations and Fuel Dealers',
    '458': 'Clothing, Clothing Accessories, Shoe, and Jewelry Retailers',
    '459': 'Sporting Goods, Hobby, Musical Instrument, Book, and Miscellaneous Retailers'
  },
  '48': {
    '481': 'Air Transportation',
    '482': 'Rail Transportation',
    '483': 'Water Transportation',
    '484': 'Truck Transportation',
    '485': 'Transit and Ground Passenger Transportation',
    '486': 'Pipeline Transportation',
    '487': 'Scenic and Sightseeing Transportation',
    '488': 'Support Activities for Transportation'
  },
  '51': {
    '512': 'Motion Picture and Sound Recording Industries',
    '513': 'Publishing Industries',
    '516': 'Broadcasting and Content Providers',
    '517': 'Telecommunications',
    '518': 'Computing Infrastructure, Data Processing, Web Hosting, and Related Services',
    '519': 'Other Information Services'
  },
  '52': {
    '521': 'Monetary Authorities-Central Bank',
    '522': 'Credit Intermediation and Related Activities',
    '523': 'Securities, Commodity Contracts, and Other Financial Investments and Related Activities',
    '524': 'Insurance Carriers and Related Activities',
    '525': 'Funds, Trusts, and Other Financial Vehicles'
  },
  '53': {
    '531': 'Real Estate',
    '532': 'Rental and Leasing Services',
    '533': 'Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)'
  },
  '54': {
    '541': 'Professional, Scientific, and Technical Services' 
    // Note: 541 is the only sub-sector for 54, but it is broken down further at the 4-digit level.
  },
  '55': {
    '551': 'Management of Companies and Enterprises'
  },
  '56': {
    '561': 'Administrative and Support Services',
    '562': 'Waste Management and Remediation Services'
  },
  '61': {
    '611': 'Educational Services'
  },
  '62': {
    '621': 'Ambulatory Health Care Services',
    '622': 'Hospitals',
    '623': 'Nursing and Residential Care Facilities',
    '624': 'Social Assistance'
  },
  '71': {
    '711': 'Performing Arts, Spectator Sports, and Related Industries',
    '712': 'Museums, Historical Sites, and Similar Institutions',
    '713': 'Amusement, Gambling, and Recreation Industries'
  },
  '72': {
    '721': 'Accommodation',
    '722': 'Food Services and Drinking Places'
  },
  '81': {
    '811': 'Repair and Maintenance',
    '812': 'Personal and Laundry Services',
    '813': 'Religious, Grantmaking, Civic, Professional, and Similar Organizations',
    '814': 'Private Households'
  },
  '92': {
    '921': 'Executive, Legislative, and Other General Government Support',
    '922': 'Justice, Public Order, and Safety Activities',
    '923': 'Administration of Human Resource Programs',
    '924': 'Administration of Environmental Quality Programs',
    '925': 'Administration of Housing Programs, Urban Planning, and Community Development',
    '926': 'Administration of Economic Programs',
    '927': 'Space Research and Technology',
    '928': 'National Security and International Affairs'
  }
};



export const naicsIndustries: Record<string, Record<string, string>> = {
  // Agriculture
  '111': {
    '111110': 'Soybean Farming',
    '111120': 'Oilseed (except Soybean) Farming',
    '111130': 'Dry Pea and Bean Farming',
    '111140': 'Wheat Farming',
    '111150': 'Corn Farming',
    '111160': 'Rice Farming',
    '111191': 'Oilseed and Grain Combination Farming',
    '111199': 'All Other Grain Farming',
    '111211': 'Potato Farming',
    '111219': 'Other Vegetable (except Potato) and Melon Farming',
    '111331': 'Apple Orchards',
    '111332': 'Grape Vineyards',
    '111333': 'Strawberry Farming',
    '111334': 'Berry (except Strawberry) Farming',
    '111335': 'Tree Nut Farming',
    '111336': 'Fruit and Tree Nut Combination Farming',
    '111339': 'Other Noncitrus Fruit Farming',
    '111411': 'Mushroom Production',
    '111419': 'Other Food Crops Grown Under Cover',
    '111421': 'Nursery and Tree Production',
    '111422': 'Floriculture Production',
    '111910': 'Tobacco Farming',
    '111920': 'Cotton Farming',
    '111930': 'Sugarcane Farming',
    '111940': 'Hay Farming',
    '111991': 'Sugar Beet Farming',
    '111992': 'Peanut Farming',
    '111998': 'All Other Miscellaneous Crop Farming'
  },
  '112': {
    '112111': 'Beef Cattle Ranching and Farming',
    '112112': 'Cattle Feedlots',
    '112120': 'Dairy Cattle and Milk Production',
    '112210': 'Hog and Pig Farming',
    '112310': 'Chicken Egg Production',
    '112320': 'Broiler and Other Meat Type Chicken Production',
    '112330': 'Turkey Production',
    '112340': 'Poultry Hatcheries',
    '112390': 'Other Poultry Production',
    '112410': 'Sheep Farming',
    '112420': 'Goat Farming',
    '112511': 'Finfish Farming and Fish Hatcheries',
    '112512': 'Shellfish Farming',
    '112519': 'Other Animal Aquaculture',
    '112910': 'Apiculture (Beekeeping)',
    '112920': 'Horse and Other Equine Production',
    '112930': 'Fur-Bearing Animal and Rabbit Production',
    '112990': 'All Other Animal Production'
  },
  '113': {
    '113110': 'Timber Tract Operations',
    '113210': 'Forest Nurseries and Gathering of Forest Products',
    '113310': 'Logging'
  },
  '114': {
    '114111': 'Finfish Fishing',
    '114112': 'Shellfish Fishing',
    '114119': 'Other Marine Fishing',
    '114210': 'Hunting and Trapping'
  },
  '115': {
    '115111': 'Cotton Ginning',
    '115112': 'Soil Preparation, Planting, and Cultivating',
    '115113': 'Crop Harvesting, Primarily by Machine',
    '115114': 'Postharvest Crop Activities (except Cotton Ginning)',
    '115115': 'Farm Labor Contractors and Crew Leaders',
    '115116': 'Farm Management Services',
    '115210': 'Support Activities for Animal Production',
    '115310': 'Support Activities for Forestry'
  },
  // Construction
  '236': { '236115': 'New Single-Family Housing Construction', '236220': 'Commercial Building Construction' },
  '238': { '238210': 'Electrical Contractors', '238220': 'Plumbing and HVAC Contractors' },
  // Manufacturing
  '311': { '311111': 'Dog and Cat Food Manufacturing', '311811': 'Retail Bakeries' },
  '339': { '339995': 'Burial Casket Manufacturing', '339112': 'Surgical and Medical Instrument Manufacturing' },
  '481': {
    '481112': 'Scheduled Freight Air Transportation'
  },
  // Professional
  '541': { 
    '541110': 'Offices of Lawyers', 
    '541211': 'Offices of CPAs',
    '541511': 'Custom Computer Programming Services', 
    '541810': 'Advertising Agencies',
    '541690': 'Other Scientific and Technical Consulting Services'
  },
  // Other Services
  '811': { '811111': 'General Automotive Repair', '811212': 'Computer and Office Machine Repair' },
  '812': { '812112': 'Beauty Salons', '812320': 'Drycleaning and Laundry Services' },
  '561': {
    '561720': 'Janitorial Services'
  },
  '713': {
    '713940': 'Fitness and Recreational Sports Centers'
  },
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