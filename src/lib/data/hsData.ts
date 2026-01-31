export interface HSChapter {
    code: string;
    name: string;
}

export interface HSSubcategory {
    code: string;
    name: string;
    parentChapter: string;
}

export interface HSDetail {
    code: string;
    name: string;
    parentSubcategory: string;
}

// HS Chapters (2-digit)
export const hsChapters: Record<string, string> = {
    '01': 'Live animals',
    '02': 'Meat and edible meat offal',
    '03': 'Fish and crustaceans, molluscs and other aquatic invertebrates',
    '04': 'Dairy produce; birds eggs; natural honey; edible products of animal origin, not elsewhere specified or included',
    '05': 'Products of animal origin, not elsewhere specified or included',
    '06': 'Live trees and other plants; bulbs, roots and the like; cut flowers and ornamental foliage',
    '07': 'Edible vegetables and certain roots and tubers',
    '08': 'Edible fruit and nuts; peel of citrus fruit or melons',
    '09': 'Coffee, tea, maté and spices',
    '10': 'Cereals',
    '11': 'Products of the milling industry; malt; starches; inulin; wheat gluten',
    '12': 'Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit; industrial or medicinal plants; straw and fodder',
    '13': 'Lac; gums, resins and other vegetable saps and extracts',
    '14': 'Vegetable plaiting materials; vegetable products not elsewhere specified or included',
    '15': 'Animal or vegetable fats and oils and their cleavage products; prepared edible fats; animal or vegetable waxes',
    '16': 'Preparations of meat, of fish or of crustaceans, molluscs or other aquatic invertebrates',
    '17': 'Sugars and sugar confectionery',
    '18': 'Cocoa and cocoa preparations',
    '19': 'Preparations of cereals, flour, starch or milk; pastrycooks products',
    '20': 'Preparations of vegetables, fruit, nuts or other parts of plants',
    '21': 'Miscellaneous edible preparations',
    '22': 'Beverages, spirits and vinegar',
    '23': 'Residues and waste from the food industries; prepared animal fodder',
    '24': 'Tobacco and manufactured tobacco substitutes',
    '25': 'Salt; sulphur; earths and stone; plastering materials, lime and cement',
    '26': 'Ores, slag and ash',
    '27': 'Mineral fuels, mineral oils and products of their distillation; bituminous substances; mineral waxes',
    '28': 'Inorganic chemicals; organic or inorganic compounds of precious metals, of rare-earth metals, of radioactive elements or of isotopes',
    '29': 'Organic chemicals',
    '30': 'Pharmaceutical products',
    '31': 'Fertilisers',
    '32': 'Tanning or dyeing extracts; tannins and their derivatives; dyes, pigments and other colouring matter; paints and varnishes; putty and other mastics; inks',
    '33': 'Essential oils and resinoids; perfumery, cosmetic or toilet preparations',
    '34': 'Soap, organic surface-active agents, washing preparations, lubricating preparations, artificial waxes, prepared waxes, polishing or scouring preparations, candles and similar articles, modelling pastes, dental waxes and dental preparations with a basis of plaster',
    '35': 'Albuminoidal substances; modified starches; glues; enzymes',
    '36': 'Explosives; pyrotechnic products; matches; pyrophoric alloys; certain combustible preparations',
    '37': 'Photographic or cinematographic goods',
    '38': 'Miscellaneous chemical products',
    '39': 'Plastics and articles thereof',
    '40': 'Rubber and articles thereof',
    '41': 'Raw hides and skins (other than furskins) and leather',
    '42': 'Articles of leather; saddlery and harness; travel goods, handbags and similar containers; articles of animal gut (other than silkworm gut)',
    '43': 'Furskins and artificial fur; manufactures thereof',
    '44': 'Wood and articles of wood; wood charcoal',
    '45': 'Cork and articles of cork',
    '46': 'Manufactures of straw, of esparto or of other plaiting materials; basketware and wickerwork',
    '47': 'Pulp of wood or of other fibrous cellulosic material; waste and scrap of paper or paperboard',
    '48': 'Paper and paperboard; articles of paper pulp, of paper or of paperboard',
    '49': 'Printed books, newspapers, pictures and other products of the printing industry; manuscripts, typescripts and plans',
    '50': 'Silk',
    '51': 'Wool, fine or coarse animal hair; horsehair yarn and woven fabric',
    '52': 'Cotton',
    '53': 'Other vegetable textile fibres; paper yarn and woven fabrics of paper yarn',
    '54': 'Man-made filaments',
    '55': 'Man-made staple fibres',
    '56': 'Wadding, felt and nonwovens; special yarns; twine, cordage, ropes and cables and articles thereof',
    '57': 'Carpets and other textile floor coverings',
    '58': 'Special woven fabrics; tufted textile fabrics; lace; tapestries; trimmings; embroidery',
    '59': 'Impregnated, coated, covered or laminated textile fabrics; textile articles of a kind suitable for industrial use',
    '60': 'Knitted or crocheted fabrics',
    '61': 'Articles of apparel and clothing accessories, knitted or crocheted',
    '62': 'Articles of apparel and clothing accessories, not knitted or crocheted',
    '63': 'Other made-up textile articles; sets; worn clothing and worn textile articles; rags',
    '64': 'Footwear, gaiters and the like; parts of such articles',
    '65': 'Headgear and parts thereof',
    '66': 'Umbrellas, sun umbrellas, walking sticks, seat-sticks, whips, riding-crops and parts thereof',
    '67': 'Prepared feathers and down and articles made of feathers or of down; artificial flowers; articles of human hair',
    '68': 'Articles of stone, plaster, cement, asbestos, mica or similar materials',
    '69': 'Ceramic products',
    '70': 'Glass and glassware',
    '71': 'Natural or cultured pearls, precious or semi-precious stones, precious metals, metals clad with precious metal, and articles thereof; imitation jewellery; coin',
    '72': 'Iron and steel',
    '73': 'Articles of iron or steel',
    '74': 'Copper and articles thereof',
    '75': 'Nickel and articles thereof',
    '76': 'Aluminium and articles thereof',
    '77': 'Reserved for possible future use',
    '78': 'Lead and articles thereof',
    '79': 'Zinc and articles thereof',
    '80': 'Tin and articles thereof',
    '81': 'Other base metals; cermets; articles thereof',
    '82': 'Tools, implements, cutlery, spoons and forks, of base metal; parts thereof of base metal',
    '83': 'Miscellaneous articles of base metal',
    '84': 'Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof',
    '85': 'Electrical machinery and equipment and parts thereof; sound recorders and reproducers, television image and sound recorders and reproducers, and parts and accessories of such articles',
    '86': 'Railway or tramway locomotives, rolling stock and parts thereof; railway or tramway track fixtures and fittings and parts thereof; mechanical (including electro-mechanical) traffic signalling equipment of all kinds',
    '87': 'Vehicles other than railway or tramway rolling stock, and parts and accessories thereof',
    '88': 'Aircraft, spacecraft, and parts thereof',
    '89': 'Ships, boats and floating structures',
    '90': 'Optical, photographic, cinematographic, measuring, checking, precision, medical or surgical instruments and apparatus; parts and accessories thereof',
    '91': 'Clocks and watches and parts thereof',
    '92': 'Musical instruments; parts and accessories of such articles',
    '93': 'Arms and ammunition; parts and accessories thereof',
    '94': 'Furniture; bedding, mattresses, mattress supports, cushions and similar stuffed furnishings; lamps and lighting fittings, not elsewhere specified or included; illuminated signs, illuminated nameplates and the like; prefabricated buildings',
    '95': 'Toys, games and sports requisites; parts and accessories thereof',
    '96': 'Miscellaneous manufactured articles',
    '97': 'Works of art, collectors pieces and antiques',
    '98': 'Reserved for special uses by contracting parties',
    '99': 'Reserved for special uses by contracting parties'
};



export const hsSubcategories: Record<string, Record<string, string>> = {
    // Chapter 01: Live animals
    '01': {
        '0101': 'Live horses, asses, mules and hinnies',
        '0102': 'Live bovine animals',
        '0103': 'Live swine',
        '0104': 'Live sheep and goats',
        '0105': 'Live poultry, that is to say, fowls of the species Gallus domesticus, ducks, geese, turkeys and guinea fowls',
        '0106': 'Other live animals',
    },
    
    // Chapter 02: Meat and edible meat offal
    '02': {
        '0201': 'Meat of bovine animals, fresh or chilled',
        '0202': 'Meat of bovine animals, frozen',
        '0203': 'Meat of swine, fresh, chilled or frozen',
        '0204': 'Meat of sheep or goats, fresh, chilled or frozen',
        '0205': 'Meat of horses, asses, mules or hinnies, fresh, chilled or frozen',
        '0206': 'Edible offal of bovine animals, swine, sheep, goats, horses, asses, mules or hinnies, fresh, chilled or frozen',
        '0207': 'Meat and edible offal, of the poultry of heading 0105, fresh, chilled or frozen',
        '0208': 'Other meat and edible meat offal, fresh, chilled or frozen',
        '0209': 'Pig fat, free of lean meat, and poultry fat, not rendered or otherwise extracted, fresh, chilled, frozen, salted, in brine, dried or smoked',
        '0210': 'Meat and edible meat offal, salted, in brine, dried or smoked; edible flours and meals of meat or meat offal',
    },
    
    // Chapter 03: Fish and crustaceans, molluscs and other aquatic invertebrates
    '03': {
        '0301': 'Live fish',
        '0302': 'Fish, fresh or chilled, excluding fish fillets and other fish meat of heading 0304',
        '0303': 'Fish, frozen, excluding fish fillets and other fish meat of heading 0304',
        '0304': 'Fish fillets and other fish meat (whether or not minced), fresh, chilled or frozen',
        '0305': 'Fish, dried, salted or in brine; smoked fish, whether or not cooked before or during the smoking process; flours, meals and pellets of fish, fit for human consumption',
        '0306': 'Crustaceans, whether in shell or not, live, fresh, chilled, frozen, dried, salted or in brine; crustaceans, in shell, cooked by steaming or by boiling in water, whether or not chilled, frozen, dried, salted or in brine; flours, meals and pellets of crustaceans, fit for human consumption',
        '0307': 'Molluscs, whether in shell or not, live, fresh, chilled, frozen, dried, salted or in brine; aquatic invertebrates other than crustaceans and molluscs, live, fresh, chilled, frozen, dried, salted or in brine; flours, meals and pellets of aquatic invertebrates other than crustaceans and molluscs, fit for human consumption',
    },
    
    // Chapter 04: Dairy produce; birds eggs; natural honey; edible products of animal origin
    '04': {
        '0401': 'Milk and cream, not concentrated nor containing added sugar or other sweetening matter',
        '0402': 'Milk and cream, concentrated or containing added sugar or other sweetening matter',
        '0403': 'Buttermilk, curdled milk and cream, yogurt, kephir and other fermented or acidified milk and cream, whether or not concentrated or containing added sugar or other sweetening matter or flavoured or containing added fruit, nuts or cocoa',
        '0404': 'Whey, whether or not concentrated or containing added sugar or other sweetening matter; products consisting of natural milk constituents, whether or not containing added sugar or other sweetening matter, not elsewhere specified or included',
        '0405': 'Butter and other fats and oils derived from milk; dairy spreads',
        '0406': 'Cheese and curd',
        '0407': 'Birds eggs, in shell, fresh, preserved or cooked',
        '0408': 'Birds eggs, not in shell, and egg yolks, fresh, dried, cooked by steaming or by boiling in water, moulded, frozen or otherwise preserved, whether or not containing added sugar or other sweetening matter',
        '0409': 'Natural honey',
        '0410': 'Edible products of animal origin, not elsewhere specified or included',
    },
    
    // Chapter 05: Products of animal origin, not elsewhere specified or included
    '05': {
        '0501': 'Human hair, unworked, whether or not washed or scoured; waste of human hair',
        '0502': 'Pigs, hogs or boars bristles and hair; badger hair and other brush making hair; waste of such bristles or hair',
        '0504': 'Guts, bladders and stomachs of animals (other than fish), whole and pieces thereof',
        '0505': 'Skins and other parts of birds, with their feathers or down, feathers and parts of feathers (whether or not with trimmed edges) and down, not further worked than cleaned, disinfected or treated for preservation; powder and waste of feathers or parts of feathers',
        '0506': 'Bones and horn-cores, unworked, defatted, simply prepared (but not cut to shape), treated with acid or degelatinised; powder and waste of these products',
        '0507': 'Ivory, tortoise-shell, whalebone and whalebone hair, horns, antlers, hooves, nails, claws and beaks, unworked or simply prepared but not cut to shape; powder and waste of these products',
        '0508': 'Coral and similar materials, unworked or simply prepared but not otherwise worked; shells of molluscs, crustaceans or echinoderms and cuttle-bone, unworked or simply prepared but not cut to shape, powder and waste thereof',
        '0510': 'Ambergris, castoreum, civet and musk; cantharides; bile, whether or not dried; glands and other animal products used in the preparation of pharmaceutical products, fresh, chilled, frozen or otherwise provisionally preserved',
        '0511': 'Animal products not elsewhere specified or included; dead animals of Chapter 1 or 3, unfit for human consumption',
    },
    
    // Chapter 06: Live trees and other plants; bulbs, roots and the like; cut flowers and ornamental foliage
    '06': {
        '0601': 'Bulbs, tubers, tuberous roots, corms, crowns and rhizomes, dormant, in growth or in flower; chicory plants and roots other than roots of heading 1212',
        '0602': 'Other live plants (including their roots), cuttings and slips; mushroom spawn',
        '0603': 'Cut flowers and flower buds of a kind suitable for bouquets or for ornamental purposes, fresh, dried, dyed, bleached, impregnated or otherwise prepared',
        '0604': 'Foliage, branches and other parts of plants, without flowers or flower buds, and grasses, mosses and lichens, being goods of a kind suitable for bouquets or for ornamental purposes, fresh, dried, dyed, bleached, impregnated or otherwise prepared',
    },
    
    // Chapter 07: Edible vegetables and certain roots and tubers
    '07': {
        '0701': 'Potatoes, fresh or chilled',
        '0702': 'Tomatoes, fresh or chilled',
        '0703': 'Onions, shallots, garlic, leeks and other alliaceous vegetables, fresh or chilled',
        '0704': 'Cabbages, cauliflowers, kohlrabi, kale and similar edible brassicas, fresh or chilled',
        '0705': 'Lettuce (Lactuca sativa) and chicory (Cichorium spp.), fresh or chilled',
        '0706': 'Carrots, turnips, salad beetroot, salsify, celeriac, radishes and similar edible roots, fresh or chilled',
        '0707': 'Cucumbers and gherkins, fresh or chilled',
        '0708': 'Leguminous vegetables, shelled or unshelled, fresh or chilled',
        '0709': 'Other vegetables, fresh or chilled',
        '0710': 'Vegetables (uncooked or cooked by steaming or boiling in water), frozen',
        '0711': 'Vegetables provisionally preserved (for example, by sulphur dioxide gas, in brine, in sulphur water or in other preservative solutions), but unsuitable in that state for immediate consumption',
        '0712': 'Dried vegetables, whole, cut, sliced, broken or in powder, but not further prepared',
        '0713': 'Dried leguminous vegetables, shelled, whether or not skinned or split',
        '0714': 'Manioc, arrowroot, salep, Jerusalem artichokes, sweet potatoes and similar roots and tubers with high starch or inulin content, fresh, chilled, frozen or dried, whether or not sliced or in the form of pellets; sago pith',
    },
    
    // Chapter 08: Edible fruit and nuts; peel of citrus fruit or melons
    '08': {
        '0801': 'Coconuts, Brazil nuts and cashew nuts, fresh or dried, whether or not shelled or peeled',
        '0802': 'Other nuts, fresh or dried, whether or not shelled or peeled',
        '0803': 'Bananas, including plantains, fresh or dried',
        '0804': 'Dates, figs, pineapples, avocados, guavas, mangoes and mangosteens, fresh or dried',
        '0805': 'Citrus fruit, fresh or dried',
        '0806': 'Grapes, fresh or dried',
        '0807': 'Melons (including watermelons) and papaws (papayas), fresh',
        '0808': 'Apples, pears and quinces, fresh',
        '0809': 'Apricots, cherries, peaches (including nectarines), plums and sloes, fresh',
        '0810': 'Other fruit, fresh',
        '0811': 'Fruit and nuts, uncooked or cooked by steaming or boiling in water, frozen, whether or not containing added sugar or other sweetening matter',
        '0812': 'Fruit and nuts, provisionally preserved (for example, by sulphur dioxide gas, in brine, in sulphur water or in other preservative solutions), but unsuitable in that state for immediate consumption',
        '0813': 'Fruit, dried, other than that of headings 0801 to 0806; mixtures of nuts or dried fruits of this Chapter',
        '0814': 'Peel of citrus fruit or melons (including watermelons), fresh, frozen, dried or provisionally preserved in brine, in sulphur water or in other preservative solutions',
    },
    
    // Chapter 09: Coffee, tea, maté and spices
    '09': {
        '0901': 'Coffee, whether or not roasted or decaffeinated; coffee husks and skins; coffee substitutes containing coffee in any proportion',
        '0902': 'Tea, whether or not flavoured',
        '0903': 'Maté',
        '0904': 'Pepper of the genus Piper; dried or crushed or ground fruits of the genus Capsicum or of the genus Pimenta',
        '0905': 'Vanilla',
        '0906': 'Cinnamon and cinnamon-tree flowers',
        '0907': 'Cloves (whole fruit, cloves and stems)',
        '0908': 'Nutmeg, mace and cardamoms',
        '0909': 'Seeds of anise, badian, fennel, coriander, cumin or caraway; juniper berries',
        '0910': 'Ginger, saffron, turmeric (curcuma), thyme, bay leaves, curry and other spices',
    },
    
    // Chapter 10: Cereals
    '10': {
        '1001': 'Wheat and meslin',
        '1002': 'Rye',
        '1003': 'Barley',
        '1004': 'Oats',
        '1005': 'Maize (corn)',
        '1006': 'Rice',
        '1007': 'Grain sorghum',
        '1008': 'Buckwheat, millet and canary seed; other cereals',
    },
    
    // Chapter 11: Products of the milling industry; malt; starches; inulin; wheat gluten
    '11': {
        '1101': 'Wheat or meslin flour',
        '1102': 'Cereal flours other than of wheat or meslin',
        '1103': 'Cereal groats, meal and pellets',
        '1104': 'Cereal grains otherwise worked (for example, hulled, rolled, flaked, pearled, sliced or kibbled), except rice of heading 1006; germ of cereals, whole, rolled, flaked or ground',
        '1105': 'Flour, meal, powder, flakes, granules and pellets of potatoes',
        '1106': 'Flour, meal and powder of the dried leguminous vegetables of heading 0713, of sago or of roots or tubers of heading 0714 or of the products of Chapter 8',
        '1107': 'Malt, whether or not roasted',
        '1108': 'Starche; inulin',
        '1109': 'Wheat gluten, whether or not dried',
    },
    
    // Chapter 12: Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit; industrial or medicinal plants; straw and fodder
    '12': {
        '1201': 'Soya beans, whether or not broken',
        '1202': 'Ground-nuts, not roasted or otherwise cooked, whether or not shelled or broken',
        '1203': 'Copra',
        '1204': 'Linseed, whether or not broken',
        '1205': 'Rape or colza seeds, whether or not broken',
        '1206': 'Sunflower seeds, whether or not broken',
        '1207': 'Other oil seeds and oleaginous fruits, whether or not broken',
        '1208': 'Flours and meals of oil seeds or oleaginous fruits, other than those of mustard',
        '1209': 'Seeds, fruit and spores, of a kind used for sowing',
        '1210': 'Hop cones, fresh or dried, whether or not ground, powdered or in the form of pellets; lupulin',
        '1211': 'Plants and parts of plants (including seeds and fruits), of a kind used primarily in perfumery, in pharmacy or for insecticidal, fungicidal or similar purposes, fresh or dried, whether or not cut, crushed or powdered',
        '1212': 'Locust beans, seaweeds and other algae, sugar beet and sugar cane, fresh, chilled, frozen or dried, whether or not ground; fruit stones and kernels and other vegetable products (including unroasted chicory roots of the variety Cichorium intybus sativum) of a kind used primarily for human consumption, not elsewhere specified or included',
        '1213': 'Cereal straw and husks, unprepared, or chopped, but not otherwise prepared',
        '1214': 'Swedes, mangolds, fodder roots, hay, lucerne (alfalfa), clover, sainfoin, forage kale, lupines, vetches and similar forage products, whether or not in the form of pellets',
    },
    
    // Chapter 13: Lac; gums, resins and other vegetable saps and extracts
    '13': {
        '1301': 'Lac; natural gums, resins, gum-resins and oleoresins (for example, balsams)',
        '1302': 'Vegetable saps and extracts; pectic substances, pectinates and pectates; agar-agar and other mucilages and thickeners, whether or not modified, derived from vegetable products',
    },
    
    // Chapter 14: Vegetable plaiting materials; vegetable products not elsewhere specified or included
    '14': {
        '1401': 'Vegetable materials of a kind used primarily for plaiting (for example, bamboos, rattans, reeds, rushes, osier, raffia, cleaned, bleached or dyed cereal straw, and lime bark)',
        '1402': 'Vegetable materials of a kind used primarily as stuffing or as padding (for example, kapok, vegetable hair and eel-grass), whether or not put up as a layer with or without supporting material',
        '1403': 'Vegetable materials of a kind used primarily in brooms or in brushes (for example, broomcorn, piassava, couch-grass and istle), whether or not in hanks or bundles',
        '1404': 'Vegetable products not elsewhere specified or included',
    },
    
    // Chapter 15: Animal or vegetable fats and oils and their cleavage products; prepared edible fats; animal or vegetable waxes
    '15': {
        '1501': 'Pig fat (including lard) and poultry fat, other than that of heading 0209 or 1503',
        '1502': 'Fats of bovine animals, sheep or goats, other than those of heading 1503',
        '1503': 'Lard stearin, lard oil, oleostearin, oleo-oil and tallow oil, not emulsified or mixed or otherwise prepared',
        '1504': 'Fats and oils and their fractions, of fish or marine mammals, whether or not refined, but not chemically modified',
        '1505': 'Wool grease and fatty substances derived therefrom (including lanolin)',
        '1506': 'Other animal fats and oils and their fractions, whether or not refined, but not chemically modified',
        '1507': 'Soya-bean oil and its fractions, whether or not refined, but not chemically modified',
        '1508': 'Ground-nut oil and its fractions, whether or not refined, but not chemically modified',
        '1509': 'Olive oil and its fractions, whether or not refined, but not chemically modified',
        '1510': 'Other oils and their fractions, obtained solely from olives, whether or not refined, but not chemically modified, including blends of these oils or fractions with oils or fractions of heading 1509',
        '1511': 'Palm oil and its fractions, whether or not refined, but not chemically modified',
        '1512': 'Sunflower-seed, safflower or cotton-seed oil and fractions thereof, whether or not refined, but not chemically modified',
        '1513': 'Coconut (copra), palm kernel or babassu oil and fractions thereof, whether or not refined, but not chemically modified',
        '1514': 'Rape, colza or mustard oil and fractions thereof, whether or not refined, but not chemically modified',
        '1515': 'Other fixed vegetable fats and oils (including jojoba oil) and their fractions, whether or not refined, but not chemically modified',
        '1516': 'Animal or vegetable fats and oils and their fractions, partly or wholly hydrogenated, inter-esterified, re-esterified or elaidinised, whether or not refined, but not further prepared',
        '1517': 'Margarine; edible mixtures or preparations of animal or vegetable fats or oils or of fractions of different fats or oils of this Chapter, other than edible fats or oils or their fractions of heading 1516',
        '1518': 'Animal or vegetable fats and oils and their fractions, boiled, oxidised, dehydrated, sulphurised, blown, polymerised by heat in vacuum or in inert gas or otherwise chemically modified, excluding those of heading 1516; inedible mixtures or preparations of animal or vegetable fats or oils or of fractions of different fats or oils of this Chapter, not elsewhere specified or included',
        '1520': 'Glycerol, crude; glycerol waters and glycerol lyes',
        '1521': 'Vegetable waxes (other than triglycerides), beeswax, other insect waxes and spermaceti, whether or not refined or coloured',
        '1522': 'Degras; residues resulting from the treatment of fatty substances or animal or vegetable waxes',
    },
    
    // Continue with remaining chapters...
    '16': {
        '1601': 'Sausages and similar products, of meat, meat offal or blood; food preparations based on these products',
        '1602': 'Other prepared or preserved meat, meat offal or blood',
        '1603': 'Extracts and juices of meat, fish or crustaceans, molluscs or other aquatic invertebrates',
        '1604': 'Prepared or preserved fish; caviar and caviar substitutes prepared from fish eggs',
        '1605': 'Crustaceans, molluscs and other aquatic invertebrates, prepared or preserved',
    },
    
    // Chapter 29: Organic chemicals (example with more details)
    '29': {
        '2901': 'Acyclic hydrocarbons',
        '2902': 'Cyclic hydrocarbons',
        '2903': 'Halogenated derivatives of hydrocarbons',
        '2904': 'Sulphonated, nitrated or nitrosated derivatives of hydrocarbons, whether or not halogenated',
        '2905': 'Acyclic alcohols and their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2906': 'Cyclic alcohols and their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2907': 'Phenols; phenol-alcohols',
        '2908': 'Halogenated, sulphonated, nitrated or nitrosated derivatives of phenols or phenol-alcohols',
        '2909': 'Ethers, ether-alcohols, ether-phenols, ether-alcohol-phenols, alcohol peroxides, ether peroxides, ketone peroxides (whether or not chemically defined), and their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2910': 'Epoxides, epoxyalcohols, epoxyphenols and epoxyethers, with a three-membered ring, and their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2911': 'Acetals and hemiacetals, whether or not with other oxygen function, and their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2912': 'Aldehydes, whether or not with other oxygen function; cyclic polymers of aldehydes; paraformaldehyde',
        '2913': 'Halogenated, sulphonated, nitrated or nitrosated derivatives of products of heading 2912',
        '2914': 'Ketones and quinones, whether or not with other oxygen function, and their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2915': 'Saturated acyclic monocarboxylic acids and their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2916': 'Unsaturated acyclic monocarboxylic acids, cyclic monocarboxylic acids, their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2917': 'Polycarboxylic acids, their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2918': 'Carboxylic acids with additional oxygen function and their anhydrides, halides, peroxides and peroxyacids; their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2919': 'Phosphoric esters and their salts, including lactophosphates; their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2920': 'Esters of other inorganic acids (excluding esters of hydrogen halides) and their salts; their halogenated, sulphonated, nitrated or nitrosated derivatives',
        '2921': 'Amine-function compounds',
        '2922': 'Oxygen-function amino-compounds',
        '2923': 'Quaternary ammonium salts and hydroxides; lecithins and other phosphoaminolipids',
        '2924': 'Carboxyamide-function compounds; amide-function compounds of carbonic acid',
        '2925': 'Carboxyimide-function compounds (including saccharin and its salts) and imine-function compounds',
        '2926': 'Nitrile-function compounds',
        '2927': 'Diazo-, azo- or azoxy-compounds',
        '2928': 'Organic derivatives of hydrazine or of hydroxylamine',
        '2929': 'Compounds with other nitrogen function',
        '2930': 'Organo-sulphur compounds',
        '2931': 'Other organo-inorganic compounds',
        '2932': 'Heterocyclic compounds with oxygen hetero-atom(s) only',
        '2933': 'Heterocyclic compounds with nitrogen hetero-atom(s) only',
        '2934': 'Nucleic acids and their salts; other heterocyclic compounds',
    },
    // You would continue adding all 99 chapters...
};


// More detailed items (6-digit level) - expanded sample
export const hsDetails: Record<string, Record<string, string>> = {
    // Chapter 01 details
    '0101': {
        '0101.21': 'Pure-bred breeding horses',
        '0101.29': 'Other horses',
        '0101.30': 'Asses',
        '0101.90': 'Other',
    },
    '0102': {
        '0102.21': 'Pure-bred breeding bovine animals',
        '0102.29': 'Other bovine animals',
        '0102.31': 'Pure-bred breeding buffalo',
        '0102.39': 'Other buffalo',
        '0102.90': 'Other',
    },
    
    // Chapter 29 details (Organic chemicals)
    '2901': {
        '2901.10': 'Ethane and butane',
        '2901.21': 'Propane',
        '2901.22': 'Butene (butylene) and isomers thereof',
        '2901.23': 'Buta-1,3-diene and isoprene',
        '2901.24': 'Ethylene',
        '2901.29': 'Other unsaturated acyclic hydrocarbons',
        '2901.90': 'Other',
    },
    '2902': {
        '2902.11': 'Cyclohexane',
        '2902.19': 'Other cyclanes, cyclenes and cycloterpenes',
        '2902.20': 'Benzene',
        '2902.30': 'Toluene',
        '2902.41': 'o-Xylene',
        '2902.42': 'm-Xylene',
        '2902.43': 'p-Xylene',
        '2902.44': 'Mixed xylene isomers',
        '2902.50': 'Styrene',
        '2902.60': 'Ethylbenzene',
        '2902.70': 'Cumene',
        '2902.90': 'Other',
    },
    
    // Chapter 39 details (Plastics)
    '3901': {
        '3901.10': 'Polyethylene having a specific gravity of less than 0.94',
        '3901.20': 'Polyethylene having a specific gravity of 0.94 or more',
        '3901.30': 'Ethylene-vinyl acetate copolymers',
        '3901.40': 'Ethylene-alpha-olefin copolymers, having a specific gravity of less than 0.94',
        '3901.90': 'Other',
    },
    '3902': {
        '3902.10': 'Polypropylene',
        '3902.20': 'Polyisobutylene',
        '3902.30': 'Propylene copolymers',
        '3902.90': 'Other',
    },
    
    // Chapter 84 details (Machinery)
    '8401': {
        '8401.10': 'Nuclear reactors',
        '8401.20': 'Fuel elements (cartridges), non-irradiated',
        '8401.30': 'Parts of nuclear reactors',
        '8401.40': 'Machinery and apparatus for isotopic separation, and parts thereof',
    },
    '8402': {
        '8402.11': 'Watertube boilers with a steam production exceeding 45 t per hour',
        '8402.12': 'Watertube boilers with a steam production not exceeding 45 t per hour',
        '8402.19': 'Other vapor generating boilers',
        '8402.20': 'Super-heated water boilers',
        '8402.90': 'Parts',
    },
};

// Helper function to get chapter name by code
export function getChapterName(code: string): string {
    return hsChapters[code] || 'Unknown Chapter';
}

// Helper function to get subcategory name by code
export function getSubcategoryName(chapterCode: string, subcategoryCode: string): string {
    return hsSubcategories[chapterCode]?.[subcategoryCode] || 'Unknown Subcategory';
}

// Helper function to get detail name by code
export function getDetailName(subcategoryCode: string, detailCode: string): string {
    return hsDetails[subcategoryCode]?.[detailCode] || 'Unknown Detail';
}




// Helper functions
export function getSubcategoriesForChapter(chapterCode: string): Array<{code: string, name: string}> {
    const subcategories = hsSubcategories[chapterCode];
    if (!subcategories) return [];
    
    return Object.entries(subcategories).map(([code, name]) => ({ code, name }));
}

export function getDetailsForSubcategory(subcategoryCode: string): Array<{code: string, name: string}> {
    const details = hsDetails[subcategoryCode];
    if (!details) return [];
    
    return Object.entries(details).map(([code, name]) => ({ code, name }));
}

export function parseHSCode(fullCode: string): {
    chapter?: string;
    subcategory?: string;
    detail?: string;
} {
    const result: { chapter?: string; subcategory?: string; detail?: string } = {};
    
    if (!fullCode) return result;
    
    // Try to extract chapter (first 2 digits)
    if (fullCode.length >= 2) {
        result.chapter = fullCode.substring(0, 2);
    }
    
    // Try to extract subcategory (first 4 digits, handle dots)
    if (fullCode.length >= 4) {
        const cleanCode = fullCode.replace('.', '');
        if (cleanCode.length >= 4) {
            result.subcategory = cleanCode.substring(0, 4);
        }
    }
    
    // Try to extract detail (full code with dot format)
    if (fullCode.includes('.')) {
        result.detail = fullCode;
    } else if (fullCode.length >= 6) {
        // Format as HS code with dot: 1234.56
        result.detail = `${fullCode.substring(0, 4)}.${fullCode.substring(4, 6)}`;
    }
    
    return result;
}

