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
    
'17': {
        '1701': 'Cane or beet sugar and chemically pure sucrose, in solid form',
        '1702': 'Other sugars, including chemically pure lactose, maltose, glucose and fructose, in solid form; sugar syrups not containing added flavoring or coloring matter; artificial honey, whether or not mixed with natural honey; caramel',
        '1703': 'Molasses resulting from the extraction or refining of sugar',
        '1704': 'Sugar confectionery (including white chocolate), not containing cocoa',
    },
    '18': {
        '1801': 'Cocoa beans, whole or broken, raw or roasted',
        '1802': 'Cocoa shells, husks, skins and other cocoa waste',
        '1803': 'Cocoa paste, whether or not defatted',
        '1804': 'Cocoa butter, fat and oil',
        '1805': 'Cocoa powder, not containing added sugar or other sweetening matter',
        '1806': 'Chocolate and other food preparations containing cocoa',
    },
    '19': {
        '1901': 'Malt extract; food preparations of flour, groats, meal, starch or malt extract, not containing cocoa or containing less than 40% by weight of cocoa',
        '1902': 'Pasta, whether or not cooked or stuffed or otherwise prepared',
        '1903': 'Tapioca and substitutes therefor prepared from starch, in the form of flakes, grains, pearls, siftings or in similar forms',
        '1904': 'Prepared foods obtained by the swelling or roasting of cereals or cereal products; cereals (other than maize (corn)) in grain form or in the form of flakes or other worked grains',
        '1905': 'Bread, pastry, cakes, biscuits and other bakers\' wares, whether or not containing cocoa; communion wafers, empty cachets of a kind suitable for pharmaceutical use, sealing wafers, rice paper and similar products',
    },
    '20': {
        '2001': 'Vegetables, fruit, nuts and other edible parts of plants, prepared or preserved by vinegar or acetic acid',
        '2002': 'Tomatoes prepared or preserved otherwise than by vinegar or acetic acid',
        '2003': 'Mushrooms and truffles, prepared or preserved otherwise than by vinegar or acetic acid',
        '2004': 'Other vegetables prepared or preserved otherwise than by vinegar or acetic acid, frozen',
        '2005': 'Other vegetables prepared or preserved otherwise than by vinegar or acetic acid, not frozen',
        '2006': 'Vegetables, fruit, nuts, fruit-peel and other parts of plants, preserved by sugar (drained, glacé or crystallized)',
        '2007': 'Jams, fruit jellies, marmalades, fruit or nut purée and fruit or nut pastes, obtained by cooking, whether or not containing added sugar or other sweetening matter',
        '2008': 'Fruits, nuts and other edible parts of plants, otherwise prepared or preserved, whether or not containing added sugar or other sweetening matter or spirit',
        '2009': 'Fruit juices (including grape must) and vegetable juices, unfermented and not containing added spirit',
    },
    '21': {
        '2101': 'Extracts, essences and concentrates, of coffee, tea or maté and preparations with a basis of these products',
        '2102': 'Yeasts (active or inactive); other single-cell micro-organisms, dead; prepared baking powders',
        '2103': 'Sauces and preparations therefor; mixed condiments and mixed seasonings; mustard flour and meal and prepared mustard',
        '2104': 'Soups and broths and preparations therefor; homogenized composite food preparations',
        '2105': 'Ice cream and other edible ice, whether or not containing cocoa',
        '2106': 'Food preparations not elsewhere specified or included',
    },
    '22': {
        '2201': 'Waters, including natural or artificial mineral waters and aerated waters, not containing added sugar or sweetening matter nor flavored; ice and snow',
        '2202': 'Waters, including mineral waters and aerated waters, containing added sugar or other sweetening matter or flavored, and other non-alcoholic beverages',
        '2203': 'Beer made from malt',
        '2204': 'Wine of fresh grapes, including fortified wines; grape must other than that of heading 2009',
        '2205': 'Vermouth and other wine of fresh grapes flavored with plants or aromatic substances',
        '2206': 'Other fermented beverages (for example, cider, perry, mead, sake)',
        '2207': 'Undenatured ethyl alcohol of an alcoholic strength by volume of 80% vol. or higher; ethyl alcohol and other spirits, denatured, of any strength',
        '2208': 'Undenatured ethyl alcohol of an alcoholic strength by volume of less than 80% vol.; spirits, liqueurs and other spirituous beverages',
        '2209': 'Vinegar and substitutes for vinegar obtained from acetic acid',
    },
    '23': {
        '2301': 'Flours, meals and pellets, of meat or meat offal, of fish or of crustaceans, molluscs or other aquatic invertebrates, unfit for human consumption; greaves',
        '2302': 'Bran, sharps and other residues, whether or not in the form of pellets, derived from the sifting, milling or other working of cereals or of leguminous plants',
        '2303': 'Residues of starch manufacture and similar residues, beet-pulp, bagasse and other waste of sugar manufacture, brewing or distilling dregs and waste',
        '2304': 'Oil-cake and other solid residues, whether or not ground or in the form of pellets, resulting from the extraction of soybean oil',
        '2305': 'Oil-cake and other solid residues, whether or not ground or in the form of pellets, resulting from the extraction of ground-nut oil',
        '2306': 'Oil-cake and other solid residues, whether or not ground or in the form of pellets, resulting from the extraction of vegetable fats or oils, other than those of heading 2304 or 2305',
        '2307': 'Wine lees; argol',
        '2308': 'Vegetable materials and vegetable waste, vegetable residues and by-products, whether or not in the form of pellets, of a kind used in animal feeding',
        '2309': 'Preparations of a kind used in animal feeding',
    },
    '24': {
        '2401': 'Unmanufactured tobacco; tobacco refuse',
        '2402': 'Cigars, cheroots, cigarillos and cigarettes, of tobacco or of tobacco substitutes',
        '2403': 'Other manufactured tobacco and manufactured tobacco substitutes; "homogenized" or "reconstituted" tobacco; tobacco extracts and essences',
        '2404': 'Products containing tobacco, reconstituted tobacco, nicotine, or tobacco or nicotine substitutes, intended for inhalation without combustion; other nicotine containing products intended for the intake of nicotine into the human body',
    },
    '25': {
        '2501': 'Salt (including table salt and denatured salt) and pure sodium chloride, whether or not in aqueous solution or containing added anti-caking or free-flowing agents; sea water',
        '2502': 'Unroasted iron pyrites',
        '2503': 'Sulphur of all kinds, other than sublimed sulphur, precipitated sulphur and colloidal sulphur',
        '2504': 'Natural graphite',
        '2505': 'Natural sands of all kinds, whether or not colored, other than metal-bearing sands of chapter 26',
        '2506': 'Quartz (other than natural sands); quartzite, whether or not roughly trimmed or merely cut, by sawing or otherwise, into blocks or slabs of a rectangular (including square) shape',
        '2507': 'Kaolin and other kaolinic clays, whether or not calcined',
        '2508': 'Other clays (not including expanded clays of heading 6806), andalusite, kyanite and sillimanite, whether or not calcined; mullite; chamotte or dinas earths',
        '2509': 'Chalk',
        '2510': 'Natural calcium phosphates, natural aluminum calcium phosphates and phosphatic chalk',
        '2511': 'Natural barium sulphate (barytes); natural barium carbonate (witherite), whether or not calcined, other than barium oxide of heading 2816',
        '2512': 'Siliceous fossil meals (for example, kieselguhr, tripolite and diatomite) and similar siliceous earths, whether or not calcined, of an apparent specific gravity of 1 or less',
        '2513': 'Pumice stone; emery; natural corundum, natural garnet and other natural abrasives, whether or not heat-treated',
    },
    '26': {
        '2601': 'Iron ores and concentrates, including roasted iron pyrites',
        '2602': 'Manganese ores and concentrates, including ferruginous manganese ores and concentrates with a manganese content of 20% or more',
        '2603': 'Copper ores and concentrates',
        '2604': 'Nickel ores and concentrates',
        '2605': 'Cobalt ores and concentrates',
        '2606': 'Aluminum ores and concentrates',
        '2607': 'Lead ores and concentrates',
        '2608': 'Zinc ores and concentrates',
        '2609': 'Tin ores and concentrates',
        '2610': 'Chromium ores and concentrates',
        '2611': 'Tungsten ores and concentrates',
        '2612': 'Uranium or thorium ores and concentrates',
        '2613': 'Molybdenum ores and concentrates',
        '2614': 'Titanium ores and concentrates',
        '2615': 'Niobium, tantalum, vanadium or zirconium ores and concentrates',
        '2616': 'Precious metal ores and concentrates',
        '2617': 'Other ores and concentrates',
        '2618': 'Granulated slag (slag sand) from the manufacture of iron or steel',
        '2619': 'Slag, dross (other than granulated slag), scalings and other waste from the manufacture of iron or steel',
        '2620': 'Slag, ash and residues (other than from the manufacture of iron or steel) containing metals, arsenic or their compounds',
        '2621': 'Other slag and ash, including seaweed ash (kelp); ash and residues from the incineration of municipal waste',
    },
    '27': {
        '2701': 'Coal; briquettes, ovoids and similar solid fuels manufactured from coal',
        '2702': 'Lignite, whether or not agglomerated, excluding jet',
        '2703': 'Peat (including peat litter), whether or not agglomerated',
        '2704': 'Coke and semi-coke of coal, of lignite or of peat, whether or not agglomerated; retort carbon',
        '2705': 'Coal gas, water gas, producer gas and similar gases, other than petroleum gases and other gaseous hydrocarbons',
        '2706': 'Tar distilled from coal, from lignite or from peat, and other mineral tars, whether or not dehydrated or partially distilled',
        '2707': 'Oils and other products of the distillation of high temperature coal tar; similar products in which the weight of the aromatic constituents exceeds that of the non-aromatic constituents',
        '2708': 'Pitch and pitch coke, obtained from coal tar or from other mineral tars',
        '2709': 'Petroleum oils and oils obtained from bituminous minerals, crude',
        '2710': 'Petroleum oils and oils obtained from bituminous minerals, other than crude; preparations not elsewhere specified or included, containing by weight 70% or more of petroleum oils',
        '2711': 'Petroleum gases and other gaseous hydrocarbons',
        '2712': 'Petroleum jelly; paraffin wax, micro-crystalline petroleum wax, slack wax, ozokerite, lignite wax, peat wax, other mineral waxes, and similar products obtained by synthesis or by other processes',
        '2713': 'Petroleum coke, petroleum bitumen and other residues of petroleum oils or of oils obtained from bituminous minerals',
        '2714': 'Bitumen and asphalt, natural; bituminous or oil shale and tar sands; asphaltites and asphaltic rocks',
        '2715': 'Bituminous mixtures based on natural asphalt, on natural bitumen, on petroleum bitumen, on mineral tar or on mineral tar pitch (for example, bituminous mastics, cut-backs)',
    },
    '28': {
        '2801': 'Fluorine, chlorine, bromine and iodine',
        '2802': 'Sulphur, sublimed or precipitated; colloidal sulphur',
        '2803': 'Carbon (carbon blacks and other forms of carbon not elsewhere specified or included)',
        '2804': 'Hydrogen, rare gases and other non-metals',
        '2805': 'Alkali or alkaline-earth metals; rare-earth metals, scandium and yttrium, whether or not intermixed or interalloyed; mercury',
        '2806': 'Hydrogen chloride (hydrochloric acid); chlorosulphuric acid',
        '2807': 'Sulphuric acid; oleum',
        '2808': 'Nitric acid; sulphonitric acids',
        '2809': 'Diphosphorus pentaoxide; phosphoric acid; polyphosphoric acids, whether or not chemically defined',
        '2810': 'Oxides of boron; boric acids',
        '2811': 'Other inorganic acids and other inorganic oxygen compounds of non-metals',
        '2812': 'Halides and halide oxides of non-metals',
        '2813': 'Sulphides of non-metals; commercial phosphorus trisulphide',
        '2814': 'Ammonia, anhydrous or in aqueous solution',
        '2815': 'Sodium hydroxide (caustic soda); potassium hydroxide (caustic potash); peroxides of sodium or potassium',
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

    // Chapter 30: Pharmaceutical products
    '30': {
        '3001': 'Glands and other organs for organo-therapeutic uses, dried, whether or not powdered; extracts of glands or other organs or of their secretions for organo-therapeutic uses; heparin and its salts; other human or animal substances prepared for therapeutic or prophylactic uses, not elsewhere specified or included',
        '3002': 'Human blood; animal blood prepared for therapeutic, prophylactic or diagnostic uses; antisera and other blood fractions and modified immunological products, whether or not obtained by means of biotechnological processes; vaccines, toxins, cultures of micro-organisms (excluding yeasts) and similar products',
        '3003': 'Medicaments (excluding goods of heading 3002, 3005 or 3006) consisting of two or more constituents which have been mixed together for therapeutic or prophylactic uses, not put up in measured doses or in forms or packings for retail sale',
        '3004': 'Medicaments (excluding goods of heading 3002, 3005 or 3006) consisting of mixed or unmixed products for therapeutic or prophylactic uses, put up in measured doses (including those in the form of transdermal administration systems) or in forms or packings for retail sale',
        '3005': 'Wadding, gauze, bandages and similar articles (for example, dressings, adhesive plasters, poultices), impregnated or coated with pharmaceutical substances or put up in forms or packings for retail sale for medical, surgical, dental or veterinary purposes',
        '3006': 'Pharmaceutical goods specified in Note 4 to this Chapter',
    },
    
    // Chapter 31: Fertilisers
    '31': {
        '3101': 'Animal or vegetable fertilisers, whether or not mixed together or chemically treated; fertilisers produced by the mixing or chemical treatment of animal or vegetable products',
        '3102': 'Mineral or chemical fertilisers, nitrogenous',
        '3103': 'Mineral or chemical fertilisers, phosphatic',
        '3104': 'Mineral or chemical fertilisers, potassic',
        '3105': 'Mineral or chemical fertilisers containing two or three of the fertilising elements nitrogen, phosphorus and potassium; other fertilisers; goods of this Chapter in tablets or similar forms or in packages of a gross weight not exceeding 10 kg',
    },
    
    // Chapter 32: Tanning or dyeing extracts; tannins and their derivatives; dyes, pigments and other colouring matter; paints and varnishes; putty and other mastics; inks
    '32': {
        '3201': 'Tanning extracts of vegetable origin; tannins and their salts, ethers, esters and other derivatives',
        '3202': 'Synthetic organic tanning substances; inorganic tanning substances; tanning preparations, whether or not containing natural tanning substances; enzymatic preparations for pre-tanning',
        '3203': 'Colouring matter of vegetable or animal origin (including dyeing extracts but excluding animal black), whether or not chemically defined; preparations as specified in Note 3 to this Chapter based on colouring matter of vegetable or animal origin',
        '3204': 'Synthetic organic colouring matter, whether or not chemically defined; preparations as specified in Note 3 to this Chapter based on synthetic organic colouring matter; synthetic organic products of a kind used as fluorescent brightening agents or as luminophores, whether or not chemically defined',
        '3205': 'Colour lakes; preparations as specified in Note 3 to this Chapter based on colour lakes',
        '3206': 'Other colouring matter; preparations as specified in Note 3 to this Chapter, other than those of heading 3203, 3204 or 3205; inorganic products of a kind used as luminophores, whether or not chemically defined',
        '3207': 'Prepared pigments, prepared opacifiers and prepared colours, vitrifiable enamels and glazes, engobes (slips), liquid lustres and similar preparations, of a kind used in the ceramic, enamelling or glass industry; glass frit and other glass, in the form of powder, granules or flakes',
        '3208': 'Paints and varnishes (including enamels and lacquers) based on synthetic polymers or chemically modified natural polymers, dispersed or dissolved in a non-aqueous medium; solutions as defined in Note 4 to this Chapter',
        '3209': 'Paints and varnishes (including enamels and lacquers) based on synthetic polymers or chemically modified natural polymers, dispersed or dissolved in an aqueous medium',
        '3210': 'Other paints and varnishes (including enamels, lacquers and distempers); prepared water pigments of a kind used for finishing leather',
        '3211': 'Prepared driers',
        '3212': 'Pigments (including metallic powders and flakes) dispersed in non-aqueous media, in liquid or paste form, of a kind used in the manufacture of paints (including enamels); stamping foils; dyes and other colouring matter put up in forms or packings for retail sale',
        '3213': 'Artists, students or signboard painters colours, modifying tints, amusement colours and the like, in tablets, tubes, jars, bottles, pans or in similar forms or packings',
        '3214': 'Glaziers putty, grafting putty, resin cements, caulking compounds and other mastics; painters fillings; non-refractory surfacing preparations for façades, interior walls, floors, ceilings or the like',
        '3215': 'Printing ink, writing or drawing ink and other inks, whether or not concentrated or solid',
    },
    
    // Chapter 33: Essential oils and resinoids; perfumery, cosmetic or toilet preparations
    '33': {
        '3301': 'Essential oils (terpeneless or not), including concretes and absolutes; resinoids; extracted oleoresins; concentrates of essential oils in fats, in fixed oils, in waxes or the like, obtained by enfeurage or maceration; terpenic by-products of the deterpenation of essential oils; aqueous distillates and aqueous solutions of essential oils',
        '3302': 'Mixtures of odoriferous substances and mixtures (including alcoholic solutions) with a basis of one or more of these substances, of a kind used as raw materials in industry; other preparations based on odoriferous substances, of a kind used for the manufacture of beverages',
        '3303': 'Perfumes and toilet waters',
        '3304': 'Beauty or make-up preparations and preparations for the care of the skin (other than medicaments), including sunscreen or sun tan preparations; manicure or pedicure preparations',
        '3305': 'Preparations for use on the hair',
        '3306': 'Preparations for oral or dental hygiene, including denture fixative pastes and powders; yarn used to clean between the teeth (dental floss), in individual retail packages',
        '3307': 'Pre-shave, shaving or after-shave preparations, personal deodorants, bath preparations, depilatories and other perfumery, cosmetic or toilet preparations, not elsewhere specified or included; prepared room deodorisers, whether or not perfumed or having disinfectant properties',
    },
    
    // Chapter 34: Soap, organic surface-active agents, washing preparations, lubricating preparations, artificial waxes, prepared waxes, polishing or scouring preparations, candles and similar articles, modelling pastes, dental waxes and dental preparations with a basis of plaster
    '34': {
        '3401': 'Soap; organic surface-active products and preparations for use as soap, in the form of bars, cakes, moulded pieces or shapes, whether or not containing soap; organic surface-active products and preparations for washing the skin, in the form of liquid or cream and put up for retail sale, whether or not containing soap; paper, wadding, felt and nonwovens, impregnated, coated or covered with soap or detergent',
        '3402': 'Organic surface-active agents (other than soap); surface-active preparations, washing preparations (including auxiliary washing preparations) and cleaning preparations, whether or not containing soap, other than those of heading 3401',
        '3403': 'Lubricating preparations (including cutting-oil preparations, bolt or nut release preparations, anti-rust or anti-corrosion preparations and mould release preparations, based on lubricants) and preparations of a kind used for the oil or grease treatment of textile materials, leather, furskins or other materials, but excluding preparations containing, as basic constituents, 70% or more by weight of petroleum oils or of oils obtained from bituminous minerals',
        '3404': 'Artificial waxes and prepared waxes',
        '3405': 'Polishes and creams, for footwear, furniture, floors, coachwork, glass or metal, scouring pastes and powders and similar preparations (whether or not in the form of paper, wadding, felt, nonwovens, cellular plastics or cellular rubber, impregnated, coated or covered with such preparations), excluding waxes of heading 3404',
        '3406': 'Candles, tapers and the like',
        '3407': 'Modelling pastes, including those put up for childrens amusement; preparations known as dental wax or as dental impression compounds, put up in sets, in packings for retail sale or in plates, horseshoe shapes, sticks or similar forms; other preparations for use in dentistry, with a basis of plaster (of calcined gypsum or calcium sulphate)',
    },
    
    // Chapter 35: Albuminoidal substances; modified starches; glues; enzymes
    '35': {
        '3501': 'Casein, caseinates and other casein derivatives; casein glues',
        '3502': 'Albumins (including concentrates of two or more whey proteins, containing by weight more than 80% whey proteins, calculated on the dry matter), albuminates and other albumin derivatives',
        '3503': 'Gelatin (including gelatin in rectangular (including square) sheets, whether or not surface-worked or coloured) and gelatin derivatives; isinglass; other glues of animal origin, excluding casein glues of heading 3501',
        '3504': 'Peptones and their derivatives; other protein substances and their derivatives, not elsewhere specified or included; hide powder, whether or not chromed',
        '3505': 'Dextrins and other modified starches (for example, pregelatinised or esterified starches); glues based on starches, or on dextrins or other modified starches',
        '3506': 'Prepared glues and other prepared adhesives, not elsewhere specified or included; products suitable for use as glues or adhesives, put up for retail sale as glues or adhesives, not exceeding a net weight of 1 kg',
        '3507': 'Enzymes; prepared enzymes not elsewhere specified or included',
    },
    
    // Chapter 36: Explosives; pyrotechnic products; matches; pyrophoric alloys; certain combustible preparations
    '36': {
        '3601': 'Propellant powders',
        '3602': 'Prepared explosives, other than propellant powders',
        '3603': 'Safety fuses; detonating fuses; percussion or detonating caps; igniters; electric detonators',
        '3604': 'Fireworks, signalling flares, rain rockets, fog signals and other pyrotechnic articles',
        '3605': 'Matches, other than pyrotechnic articles of heading 3604',
        '3606': 'Ferro-cerium and other pyrophoric alloys in all forms; articles of combustible materials as specified in Note 2 to this Chapter',
    },
    
    // Chapter 37: Photographic or cinematographic goods
    '37': {
        '3701': 'Photographic plates and film in the flat, sensitised, unexposed, of any material other than paper, paperboard or textiles; instant print film in the flat, sensitised, unexposed, whether or not in packs',
        '3702': 'Photographic film in rolls, sensitised, unexposed, of any material other than paper, paperboard or textiles; instant print film in rolls, sensitised, unexposed',
        '3703': 'Photographic paper, paperboard and textiles, sensitised, unexposed',
        '3704': 'Photographic plates, film, paper, paperboard and textiles, exposed but not developed',
        '3705': 'Photographic plates and film, exposed and developed, other than cinematographic film',
        '3706': 'Cinematographic film, exposed and developed, whether or not incorporating sound track or consisting only of sound track',
        '3707': 'Chemical preparations for photographic uses (other than varnishes, glues, adhesives and similar preparations); unmixed products for photographic uses, put up in measured portions or put up for retail sale in a form ready for use',
    },
    
    // Chapter 38: Miscellaneous chemical products
    '38': {
        '3801': 'Artificial graphite; colloidal or semi-colloidal graphite; preparations based on graphite or other carbon in the form of pastes, blocks, plates or other semi-manufactures',
        '3802': 'Activated carbon; activated natural mineral products; animal black, including spent animal black',
        '3803': 'Tall oil, whether or not refined',
        '3804': 'Residual lyes from the manufacture of wood pulp, whether or not concentrated, desugared or chemically treated, including lignin sulphonates, but excluding tall oil of heading 3803',
        '3805': 'Gum, wood or sulphate turpentine and other terpenic oils produced by the distillation or other treatment of coniferous woods; crude dipentene; sulphite turpentine and other crude para-cymene; pine oil containing alpha-terpineol as the main constituent',
        '3806': 'Rosin and resin acids, and derivatives thereof; rosin spirit and rosin oils; run gums',
        '3807': 'Wood tar; wood tar oils; wood creosote; wood naphtha; vegetable pitch; brewers pitch and similar preparations based on rosin, resin acids or on vegetable pitch',
        '3808': 'Insecticides, rodenticides, fungicides, herbicides, anti-sprouting products and plant-growth regulators, disinfectants and similar products, put up in forms or packings for retail sale or as preparations or articles (for example, sulphur-treated bands, wicks and candles, and fly-papers)',
        '3809': 'Finishing agents, dye carriers to accelerate the dyeing or fixing of dyestuffs and other products and preparations (for example, dressings and mordants), of a kind used in the textile, paper, leather or like industries, not elsewhere specified or included',
        '3810': 'Pickling preparations for metal surfaces; fluxes and other auxiliary preparations for soldering, brazing or welding; soldering, brazing or welding powders and pastes consisting of metal and other materials; preparations of a kind used as cores or coatings for welding electrodes or rods',
        '3811': 'Anti-knock preparations, oxidation inhibitors, gum inhibitors, viscosity improvers, anti-corrosive preparations and other prepared additives, for mineral oils (including gasoline) or for other liquids used for the same purposes as mineral oils',
        '3812': 'Prepared rubber accelerators; compound plasticisers for rubber or plastics, not elsewhere specified or included; anti-oxidising preparations and other compound stabilisers for rubber or plastics',
        '3813': 'Preparations and charges for fire-extinguishers; charged fire-extinguishing grenades',
        '3814': 'Organic composite solvents and thinners, not elsewhere specified or included; prepared paint or varnish removers',
        '3815': 'Reaction initiators, reaction accelerators and catalytic preparations, not elsewhere specified or included',
        '3816': 'Refractory cements, mortars, concretes and similar compositions, other than products of heading 3801',
        '3817': 'Mixed alkylbenzenes and mixed alkylnaphthalenes, other than those of heading 2707 or 2902',
        '3818': 'Chemical elements doped for use in electronics, in the form of discs, wafers or similar forms; chemical compounds doped for use in electronics',
        '3819': 'Hydraulic brake fluids and other prepared liquids for hydraulic transmission, not containing or containing less than 70% by weight of petroleum oils or oils obtained from bituminous minerals',
        '3820': 'Anti-freezing preparations and prepared de-icing fluids',
        '3821': 'Prepared culture media for the development or maintenance of micro-organisms (including viruses and the like) or of plant, human or animal cells',
        '3822': 'Diagnostic or laboratory reagents on a backing, prepared diagnostic or laboratory reagents whether or not on a backing, other than those of heading 3002 or 3006; certified reference materials',
        '3823': 'Industrial monocarboxylic fatty acids; acid oils from refining; industrial fatty alcohols',
        '3824': 'Prepared binders for foundry moulds or cores; chemical products and preparations of the chemical or allied industries (including those consisting of mixtures of natural products), not elsewhere specified or included',
        '3825': 'Residual products of the chemical or allied industries, not elsewhere specified or included; municipal waste; sewage sludge; other wastes specified in Note 6 to this Chapter',
        '3826': 'Biodiesel and mixtures thereof, not containing or containing less than 70% by weight of petroleum oils or oils obtained from bituminous minerals',
    },
    
    // Chapter 39: Plastics and articles thereof
    '39': {
        '3901': 'Polymers of ethylene, in primary forms',
        '3902': 'Polymers of propylene or of other olefins, in primary forms',
        '3903': 'Polymers of styrene, in primary forms',
        '3904': 'Polymers of vinyl chloride or of other halogenated olefins, in primary forms',
        '3905': 'Polymers of vinyl acetate or of other vinyl esters, in primary forms; other vinyl polymers in primary forms',
        '3906': 'Acrylic polymers in primary forms',
        '3907': 'Polyacetals, other polyethers and epoxide resins, in primary forms; polycarbonates, alkyd resins, polyallyl esters and other polyesters, in primary forms',
        '3908': 'Polyamides in primary forms',
        '3909': 'Amino-resins, phenolic resins and polyurethanes, in primary forms',
        '3910': 'Silicones in primary forms',
        '3911': 'Petroleum resins, coumarone-indene resins, polyterpenes, polysulphides, polysulphones and other products specified in Note 3 to this Chapter, not elsewhere specified or included, in primary forms',
        '3912': 'Cellulose and its chemical derivatives, not elsewhere specified or included, in primary forms',
        '3913': 'Natural polymers (for example, alginic acid) and modified natural polymers (for example, hardened proteins, chemical derivatives of natural rubber), not elsewhere specified or included, in primary forms',
        '3914': 'Ion-exchangers based on polymers of headings 3901 to 3913, in primary forms',
        '3915': 'Waste, parings and scrap, of plastics',
        '3916': 'Monofilament of which any cross-sectional dimension exceeds 1 mm, rods, sticks and profile shapes, whether or not surface-worked but not otherwise worked, of plastics',
        '3917': 'Tubes, pipes and hoses, and fittings therefor (for example, joints, elbows, flanges), of plastics',
        '3918': 'Floor coverings of plastics, whether or not self-adhesive, in rolls or in the form of tiles; wall or ceiling coverings of plastics, as defined in Note 9 to this Chapter',
        '3919': 'Self-adhesive plates, sheets, film, foil, tape, strip and other flat shapes, of plastics, whether or not in rolls',
        '3920': 'Other plates, sheets, film, foil and strip, of plastics, non-cellular and not reinforced, laminated, supported or similarly combined with other materials',
        '3921': 'Other plates, sheets, film, foil and strip, of plastics',
        '3922': 'Baths, shower-baths, sinks, wash-basins, bidets, lavatory pans, seats and covers, flushing cisterns and similar sanitary ware, of plastics',
        '3923': 'Articles for the conveyance or packing of goods, of plastics; stoppers, lids, caps and other closures, of plastics',
        '3924': 'Tableware, kitchenware, other household articles and hygienic or toilet articles, of plastics',
        '3925': 'Builders ware of plastics, not elsewhere specified or included',
        '3926': 'Other articles of plastics and articles of other materials of headings 3901 to 3914',
    },
    
    // Chapter 40: Rubber and articles thereof
    '40': {
        '4001': 'Natural rubber, balata, gutta-percha, guayule, chicle and similar natural gums, in primary forms or in plates, sheets or strip',
        '4002': 'Synthetic rubber and factice derived from oils, in primary forms or in plates, sheets or strip; mixtures of any product of heading 4001 with any product of this heading, in primary forms or in plates, sheets or strip',
        '4003': 'Reclaimed rubber in primary forms or in plates, sheets or strip',
        '4004': 'Waste, parings and scrap of rubber (other than hard rubber) and powders and granules obtained therefrom',
        '4005': 'Compounded rubber, unvulcanised, in primary forms or in plates, sheets or strip',
        '4006': 'Other forms (for example, rods, tubes and profile shapes) and articles (for example, discs and rings), of unvulcanised rubber',
        '4007': 'Vulcanised rubber thread and cord',
        '4008': 'Plates, sheets, strip, rods and profile shapes, of vulcanised rubber other than hard rubber',
        '4009': 'Tubes, pipes and hoses, of vulcanised rubber other than hard rubber, with or without their fittings (for example, joints, elbows, flanges)',
        '4010': 'Conveyor or transmission belts or belting, of vulcanised rubber',
        '4011': 'New pneumatic tyres, of rubber',
        '4012': 'Retreaded or used pneumatic tyres of rubber; solid or cushion tyres, tyre treads and tyre flaps, of rubber',
        '4013': 'Inner tubes, of rubber',
        '4014': 'Hygienic or pharmaceutical articles (including teats), of vulcanised rubber other than hard rubber, with or without fittings of hard rubber',
        '4015': 'Articles of apparel and clothing accessories (including gloves, mittens and mitts), for all purposes, of vulcanised rubber other than hard rubber',
        '4016': 'Other articles of vulcanised rubber other than hard rubber',
        '4017': 'Hard rubber (for example, ebonite) in all forms, including waste and scrap; articles of hard rubber',
    },
    
    // Chapter 41: Raw hides and skins (other than furskins) and leather
    '41': {
        '4101': 'Raw hides and skins of bovine (including buffalo) or equine animals (fresh, or salted, dried, limed, pickled or otherwise preserved, but not tanned, parchment-dressed or further prepared), whether or not dehaired or split',
        '4102': 'Raw skins of sheep or lambs (fresh, or salted, dried, limed, pickled or otherwise preserved, but not tanned, parchment-dressed or further prepared), whether or not with wool on or split, other than those excluded by Note 1 (c) to this Chapter',
        '4103': 'Other raw hides and skins (fresh, or salted, dried, limed, pickled or otherwise preserved, but not tanned, parchment-dressed or further prepared), whether or not dehaired or split, other than those excluded by Note 1 (b) or 1 (c) to this Chapter',
        '4104': 'Bovine (including buffalo) or equine leather, without hair on, other than leather of heading 4108 or 4109',
        '4105': 'Sheep or lamb skin leather, without wool on, other than leather of heading 4108 or 4109',
        '4106': 'Goat or kid skin leather, without hair on, other than leather of heading 4108 or 4109',
        '4107': 'Leather of other animals, without hair on, other than leather of heading 4108 or 4109',
        '4108': 'Chamois (including combination chamois) leather',
        '4109': 'Patent leather and patent laminated leather; metallised leather',
        '4110': 'Parings and other waste of leather or of composition leather, not suitable for the manufacture of leather articles; leather dust, powder and flour',
        '4111': 'Composition leather with a basis of leather or leather fibre, in slabs, sheets or strip, whether or not in rolls',
    },
    
    // Chapter 42: Articles of leather; saddlery and harness; travel goods, handbags and similar containers; articles of animal gut (other than silkworm gut)
    '42': {
        '4201': 'Saddlery and harness for any animal (including traces, leads, knee pads, muzzles, saddle cloths, saddle bags, dog coats and the like), of any material',
        '4202': 'Trunks, suit-cases, vanity-cases, executive-cases, brief-cases, school satchels, spectacle cases, binocular cases, camera cases, musical instrument cases, gun cases, holsters and similar containers; travelling-bags, insulated food or beverages bags, toilet bags, rucksacks, handbags, shopping-bags, wallets, purses, map-cases, cigarette-cases, tobacco-pouches, tool bags, sports bags, bottle-cases, jewellery boxes, powder-boxes, cutlery cases and similar containers, of leather or of composition leather, of sheeting of plastics, of textile materials, of vulcanised fibre or of paperboard, or wholly or mainly covered with such materials or with paper',
        '4203': 'Articles of apparel and clothing accessories, of leather or of composition leather',
        '4204': 'Articles of leather or of composition leather of a kind used in machinery or mechanical appliances or for other technical uses',
        '4205': 'Other articles of leather or of composition leather',
        '4206': 'Articles of gut (other than silkworm gut), of goldbeaters skin, of bladders or of tendons',
    },
    
    // Chapter 43: Furskins and artificial fur; manufactures thereof
    '43': {
        '4301': 'Raw furskins (including heads, tails, paws and other pieces or cuttings, suitable for furriers use), other than raw hides and skins of heading 4101, 4102 or 4103',
        '4302': 'Tanned or dressed furskins (including heads, tails, paws and other pieces or cuttings), unassembled, or assembled (without the addition of other materials) other than those of heading 4303',
        '4303': 'Articles of apparel, clothing accessories and other articles of furskin',
        '4304': 'Artificial fur and articles thereof',
    },
    
    // Chapter 44: Wood and articles of wood; wood charcoal
    '44': {
        '4401': 'Fuel wood, in logs, in billets, in twigs, in faggots or in similar forms; wood in chips or particles; sawdust and wood waste and scrap, whether or not agglomerated in logs, briquettes, pellets or similar forms',
        '4402': 'Wood charcoal (including shell or nut charcoal), whether or not agglomerated',
        '4403': 'Wood in the rough, whether or not stripped of bark or sapwood, or roughly squared',
        '4404': 'Hoopwood; split poles; piles, pickets and stakes of wood, pointed but not sawn lengthwise; wooden sticks, roughly trimmed but not turned, bent or otherwise worked, suitable for the manufacture of walking-sticks, umbrellas, tool handles or the like; chipwood and the like',
        '4405': 'Wood wool; wood flour',
        '4406': 'Railway or tramway sleepers (cross-ties) of wood',
        '4407': 'Wood sawn or chipped lengthwise, sliced or peeled, whether or not planed, sanded or end-jointed, of a thickness exceeding 6 mm',
        '4408': 'Sheets for veneering (including those obtained by slicing laminated wood), for plywood or for similar laminated wood and other wood, sawn lengthwise, sliced or peeled, whether or not planed, sanded, spliced or end-jointed, of a thickness not exceeding 6 mm',
        '4409': 'Wood (including strips and friezes for parquet flooring, not assembled) continuously shaped (tongued, grooved, rebated, chamfered, V-jointed, beaded, moulded, rounded or the like) along any of its edges, ends or faces, whether or not planed, sanded or end-jointed',
        '4410': 'Particle board, oriented strand board (OSB) and similar board (for example, waferboard) of wood or other ligneous materials, whether or not agglomerated with resins or other organic binding substances',
        '4411': 'Fibreboard of wood or other ligneous materials, whether or not bonded with resins or other organic substances',
        '4412': 'Plywood, veneered panels and similar laminated wood',
        '4413': 'Densified wood, in blocks, plates, strips or profile shapes',
        '4414': 'Wooden frames for paintings, photographs, mirrors or similar objects',
        '4415': 'Packing cases, boxes, crates, drums and similar packings, of wood; cable-drums of wood; pallets, box pallets and other load boards, of wood; pallet collars of wood',
        '4416': 'Casks, barrels, vats, tubs and other coopers products and parts thereof, of wood, including staves',
        '4417': 'Tools, tool bodies, tool handles, broom or brush bodies and handles, of wood; boot or shoe lasts and trees, of wood',
        '4418': 'Builders joinery and carpentry of wood, including cellular wood panels, assembled flooring panels, shingles and shakes',
        '4419': 'Tableware and kitchenware, of wood',
        '4420': 'Wood marquetry and inlaid wood; caskets and cases for jewellery or cutlery, and similar articles, of wood; statuettes and other ornaments, of wood; wooden articles of furniture not falling in Chapter 94',
        '4421': 'Other articles of wood',
    },
    
    // Chapter 45: Cork and articles of cork
    '45': {
        '4501': 'Natural cork, raw or simply prepared; waste cork; crushed, granulated or ground cork',
        '4502': 'Natural cork, debacked or roughly squared, or in rectangular (including square) blocks, plates, sheets or strip (including sharp-edged blanks for corks or stoppers)',
        '4503': 'Articles of natural cork',
        '4504': 'Agglomerated cork (with or without a binding substance) and articles of agglomerated cork',
    },
    
    // Chapter 46: Manufactures of straw, of esparto or of other plaiting materials; basketware and wickerwork
    '46': {
        '4601': 'Plaits and similar products of plaiting materials, whether or not assembled into strips; plaiting materials, plaits and similar products of plaiting materials, bound together in parallel strands or woven, in sheet form, whether or not being finished articles (for example, mats, matting, screens)',
        '4602': 'Basketwork, wickerwork and other articles, made directly to shape from plaiting materials or made up from goods of heading 4601; articles of loofah',
    },
    
    // Chapter 47: Pulp of wood or of other fibrous cellulosic material; waste and scrap of paper or paperboard
    '47': {
        '4701': 'Mechanical wood pulp',
        '4702': 'Chemical wood pulp, dissolving grades',
        '4703': 'Chemical wood pulp, soda or sulphate, other than dissolving grades',
        '4704': 'Chemical wood pulp, sulphite, other than dissolving grades',
        '4705': 'Semi-chemical wood pulp',
        '4706': 'Pulps of other fibrous cellulosic material',
        '4707': 'Recovered (waste and scrap) paper or paperboard',
    },
    
    // Chapter 48: Paper and paperboard; articles of paper pulp, of paper or of paperboard
    '48': {
        '4801': 'Newsprint, in rolls or sheets',
        '4802': 'Uncoated paper and paperboard, of a kind used for writing, printing or other graphic purposes, and non-perforated punch-cards and punch-tape paper, in rolls or rectangular (including square) sheets, of any size, other than paper of heading 4801 or 4803; hand-made paper and paperboard',
        '4803': 'Toilet or facial tissue stock, towel or napkin stock and similar paper of a kind used for household or sanitary purposes, cellulose wadding and webs of cellulose fibres, whether or not creped, crinkled, embossed, perforated, surface-coloured, surface-decorated or printed, in rolls or sheets',
        '4804': 'Uncoated kraft paper and paperboard, in rolls or sheets, other than that of heading 4802 or 4803',
        '4805': 'Other uncoated paper and paperboard, in rolls or sheets, not further worked or processed than as specified in Note 3 to this Chapter',
        '4806': 'Vegetable parchment, greaseproof papers, tracing papers and glassine and other glazed transparent or translucent papers, in rolls or sheets',
        '4807': 'Composite paper and paperboard (made by sticking flat layers of paper or paperboard together with an adhesive), not surface-coated or impregnated, whether or not internally reinforced, in rolls or sheets',
        '4808': 'Paper and paperboard, corrugated (with or without glued flat surface sheets), creped, crinkled, embossed or perforated, in rolls or sheets, other than paper of the kind described in heading 4803',
        '4809': 'Carbon paper, self-copy paper and other copying or transfer papers (including coated or impregnated paper for duplicator stencils or offset plates), whether or not printed, in rolls or sheets',
        '4810': 'Paper and paperboard, coated on one or both sides with kaolin (China clay) or other inorganic substances, with or without a binder, and with no other coating, whether or not surface-coloured, surface-decorated or printed, in rolls or rectangular (including square) sheets, of any size',
        '4811': 'Paper, paperboard, cellulose wadding and webs of cellulose fibres, coated, impregnated, covered, surface-coloured, surface-decorated or printed, in rolls or rectangular (including square) sheets, of any size, other than goods of the kind described in heading 4803, 4809 or 4810',
        '4812': 'Filter blocks, slabs and plates, of paper pulp',
        '4813': 'Cigarette paper, whether or not cut to size or in the form of booklets or tubes',
        '4814': 'Wallpaper and similar wall coverings; window transparencies of paper',
        '4815': 'Floor coverings on a base of paper or of paperboard, whether or not cut to size',
        '4816': 'Carbon paper, self-copy paper and other copying or transfer papers (other than those of heading 4809), duplicator stencils and offset plates, of paper, whether or not put up in boxes',
        '4817': 'Envelopes, letter cards, plain postcards and correspondence cards, of paper or paperboard; boxes, pouches, wallets and writing compendiums, of paper or paperboard, containing an assortment of paper stationery',
        '4818': 'Toilet paper, handkerchiefs, cleansing tissues, towels, tablecloths, serviettes, napkins for babies, tampons, bed sheets and similar household, sanitary or hospital articles, articles of apparel and clothing accessories, of paper pulp, paper, cellulose wadding or webs of cellulose fibres',
        '4819': 'Cartons, boxes, cases, bags and other packing containers, of paper, paperboard, cellulose wadding or webs of cellulose fibres; box files, letter trays, and similar articles, of paper or paperboard of a kind used in offices, shops or the like',
        '4820': 'Registers, account books, note books, order books, receipt books, letter pads, memorandum pads, diaries and similar articles, exercise books, blotting-pads, binders (loose-leaf or other), folders, file covers, manifold business forms, interleaved carbon sets and other articles of stationery, of paper or paperboard; albums for samples or for collections and book covers, of paper or paperboard',
        '4821': 'Paper or paperboard labels of all kinds, whether or not printed',
        '4822': 'Bobbins, spools, cops and similar supports of paper pulp, paper or paperboard (whether or not perforated or hardened)',
        '4823': 'Other paper, paperboard, cellulose wadding and webs of cellulose fibres, cut to size or shape; other articles of paper pulp, paper, paperboard, cellulose wadding or webs of cellulose fibres',
    },
    
    // Chapter 49: Printed books, newspapers, pictures and other products of the printing industry; manuscripts, typescripts and plans
    '49': {
        '4901': 'Printed books, brochures, leaflets and similar printed matter, whether or not in single sheets',
        '4902': 'Newspapers, journals and periodicals, whether or not illustrated or containing advertising material',
        '4903': 'Childrens picture, drawing or colouring books',
        '4904': 'Music, printed or in manuscript, whether or not bound or illustrated',
        '4905': 'Maps and hydrographic or similar charts of all kinds, including atlases, wall maps, topographical plans and globes, printed',
        '4906': 'Plans and drawings for architectural, engineering, industrial, commercial, topographical or similar purposes, being originals drawn by hand; handwritten texts; photographic reproductions on sensitised paper and carbon copies of the foregoing',
        '4907': 'Unused postage, revenue or similar stamps of current or new issue in the country in which they have, or will have, a recognised face value; stamp-impressed paper; banknotes; cheque forms; stock, share or bond certificates and similar documents of title',
        '4908': 'Transfers (decalcomanias)',
        '4909': 'Printed or illustrated postcards; printed cards bearing personal greetings, messages or announcements, whether or not illustrated, with or without envelopes or trimmings',
        '4910': 'Calendars of any kind, printed, including calendar blocks',
        '4911': 'Other printed matter, including printed pictures and photographs',
    },
    
    // Chapter 50: Silk
    '50': {
        '5001': 'Silk-worm cocoons suitable for reeling',
        '5002': 'Raw silk (not thrown)',
        '5003': 'Silk waste (including cocoons unsuitable for reeling, yarn waste and garnetted stock)',
        '5004': 'Silk yarn (other than yarn spun from silk waste) not put up for retail sale',
        '5005': 'Yarn spun from silk waste, not put up for retail sale',
        '5006': 'Silk yarn and yarn spun from silk waste, put up for retail sale; silkworm gut',
        '5007': 'Woven fabrics of silk or of silk waste',
    },
      
    // Chapter 51: Wool, fine or coarse animal hair; horsehair yarn and woven fabric
    '51': {
        '5101': 'Wool, not carded or combed',
        '5102': 'Fine or coarse animal hair, not carded or combed',
        '5103': 'Waste of wool or of fine or coarse animal hair, including yarn waste but excluding garnetted stock',
        '5104': 'Garnetted stock of wool or of fine or coarse animal hair',
        '5105': 'Wool and fine or coarse animal hair, carded or combed (including combed wool in fragments)',
        '5106': 'Yarn of carded wool, not put up for retail sale',
        '5107': 'Yarn of combed wool, not put up for retail sale',
        '5108': 'Yarn of fine animal hair (carded or combed), not put up for retail sale',
        '5109': 'Yarn of wool or of fine animal hair, put up for retail sale',
        '5110': 'Yarn of coarse animal hair or of horsehair (including gimped horsehair yarn), whether or not put up for retail sale',
        '5111': 'Woven fabrics of carded wool or of carded fine animal hair',
        '5112': 'Woven fabrics of combed wool or of combed fine animal hair',
        '5113': 'Woven fabrics of coarse animal hair or of horsehair',
    },
    
    // Chapter 52: Cotton
    '52': {
        '5201': 'Cotton, not carded or combed',
        '5202': 'Cotton waste (including yarn waste and garnetted stock)',
        '5203': 'Cotton, carded or combed',
        '5204': 'Cotton sewing thread, whether or not put up for retail sale',
        '5205': 'Cotton yarn (other than sewing thread), containing 85% or more by weight of cotton, not put up for retail sale',
        '5206': 'Cotton yarn (other than sewing thread), containing less than 85% by weight of cotton, not put up for retail sale',
        '5207': 'Cotton yarn (other than sewing thread) put up for retail sale',
        '5208': 'Woven fabrics of cotton, containing 85% or more by weight of cotton, weighing not more than 200 g/m²',
        '5209': 'Woven fabrics of cotton, containing 85% or more by weight of cotton, weighing more than 200 g/m²',
        '5210': 'Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing not more than 200 g/m²',
        '5211': 'Woven fabrics of cotton, containing less than 85% by weight of cotton, mixed mainly or solely with man-made fibres, weighing more than 200 g/m²',
        '5212': 'Other woven fabrics of cotton',
    },
    
    // Chapter 53: Other vegetable textile fibres; paper yarn and woven fabrics of paper yarn
    '53': {
        '5301': 'Flax, raw or processed but not spun; flax tow and waste (including yarn waste and garnetted stock)',
        '5302': 'True hemp (Cannabis sativa L.), raw or processed but not spun; tow and waste of true hemp (including yarn waste and garnetted stock)',
        '5303': 'Jute and other textile bast fibres (excluding flax, true hemp and ramie), raw or processed but not spun; tow and waste of these fibres (including yarn waste and garnetted stock)',
        '5304': 'Sisal and other textile fibres of the genus Agave, raw or processed but not spun; tow and waste of these fibres (including yarn waste and garnetted stock)',
        '5305': 'Coconut, abaca (Manila hemp or Musa textilis Nee), ramie and other vegetable textile fibres, not elsewhere specified or included, raw or processed but not spun; tow and waste of these fibres (including yarn waste and garnetted stock)',
        '5306': 'Flax yarn',
        '5307': 'Yarn of jute or of other textile bast fibres of heading 5303',
        '5308': 'Yarn of other vegetable textile fibres; paper yarn',
        '5309': 'Woven fabrics of flax',
        '5310': 'Woven fabrics of jute or of other textile bast fibres of heading 5303',
        '5311': 'Woven fabrics of other vegetable textile fibres; woven fabrics of paper yarn',
    },
    
    // Chapter 54: Man-made filaments
    '54': {
        '5401': 'Sewing thread of man-made filaments, whether or not put up for retail sale',
        '5402': 'Synthetic filament yarn (other than sewing thread), not put up for retail sale, including synthetic monofilament of less than 67 decitex',
        '5403': 'Artificial filament yarn (other than sewing thread), not put up for retail sale, including artificial monofilament of less than 67 decitex',
        '5404': 'Synthetic monofilament of 67 decitex or more and of which no cross-sectional dimension exceeds 1 mm; strip and the like (for example, artificial straw) of synthetic textile materials of an apparent width not exceeding 5 mm',
        '5405': 'Artificial monofilament of 67 decitex or more and of which no cross-sectional dimension exceeds 1 mm; strip and the like (for example, artificial straw) of artificial textile materials of an apparent width not exceeding 5 mm',
        '5406': 'Man-made filament yarn (other than sewing thread), put up for retail sale',
        '5407': 'Woven fabrics of synthetic filament yarn, including woven fabrics obtained from materials of heading 5404',
        '5408': 'Woven fabrics of artificial filament yarn, including woven fabrics obtained from materials of heading 5405',
    },
    
    // Chapter 55: Man-made staple fibres
    '55': {
        '5501': 'Synthetic filament tow',
        '5502': 'Artificial filament tow',
        '5503': 'Synthetic staple fibres, not carded, combed or otherwise processed for spinning',
        '5504': 'Artificial staple fibres, not carded, combed or otherwise processed for spinning',
        '5505': 'Waste (including noils, yarn waste and garnetted stock) of man-made fibres',
        '5506': 'Synthetic staple fibres, carded, combed or otherwise processed for spinning',
        '5507': 'Artificial staple fibres, carded, combed or otherwise processed for spinning',
        '5508': 'Sewing thread of man-made staple fibres, whether or not put up for retail sale',
        '5509': 'Yarn (other than sewing thread) of synthetic staple fibres, not put up for retail sale',
        '5510': 'Yarn (other than sewing thread) of artificial staple fibres, not put up for retail sale',
        '5511': 'Yarn (other than sewing thread) of man-made staple fibres, put up for retail sale',
        '5512': 'Woven fabrics of synthetic staple fibres, containing 85% or more by weight of synthetic staple fibres',
        '5513': 'Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight not exceeding 170 g/m²',
        '5514': 'Woven fabrics of synthetic staple fibres, containing less than 85% by weight of such fibres, mixed mainly or solely with cotton, of a weight exceeding 170 g/m²',
        '5515': 'Other woven fabrics of synthetic staple fibres',
        '5516': 'Woven fabrics of artificial staple fibres',
    },
    
    // Chapter 56: Wadding, felt and nonwovens; special yarns; twine, cordage, ropes and cables and articles thereof
    '56': {
        '5601': 'Textile wadding and articles thereof; textile fibres not exceeding 5 mm in length (flock), textile dust and mill neps',
        '5602': 'Felt, whether or not impregnated, coated, covered or laminated',
        '5603': 'Nonwovens, whether or not impregnated, coated, covered or laminated',
        '5604': 'Rubber thread and cord, textile covered; textile yarn, and strip and the like of heading 5404 or 5405, impregnated, coated, covered or sheathed with rubber or plastics',
        '5605': 'Metallised yarn, whether or not gimped, being textile yarn, or strip or the like of heading 5404 or 5405, combined with metal in the form of thread, strip or powder or covered with metal',
        '5606': 'Gimped yarn, and strip and the like of heading 5404 or 5405, gimped (other than those of heading 5605 and gimped horsehair yarn); chenille yarn (including flock chenille yarn); loop wale-yarn',
        '5607': 'Twine, cordage, ropes and cables, whether or not plaited or braided and whether or not impregnated, coated, covered or sheathed with rubber or plastics',
        '5608': 'Knotted netting of twine, cordage or rope; made up fishing nets and other made up nets, of textile materials',
        '5609': 'Articles of yarn, strip or the like of heading 5404 or 5405, twine, cordage, rope or cables, not elsewhere specified or included',
    },
    
    // Chapter 57: Carpets and other textile floor coverings
    '57': {
        '5701': 'Carpets and other textile floor coverings, knotted, whether or not made up',
        '5702': 'Carpets and other textile floor coverings, woven, not tufted or flocked, whether or not made up, including "Kelem", "Schumacks", "Karamanie" and similar hand-woven rugs',
        '5703': 'Carpets and other textile floor coverings, tufted, whether or not made up',
        '5704': 'Carpets and other textile floor coverings, of felt, not tufted or flocked, whether or not made up',
        '5705': 'Other carpets and other textile floor coverings, whether or not made up',
    },
    
    // Chapter 58: Special woven fabrics; tufted textile fabrics; lace; tapestries; trimmings; embroidery
    '58': {
        '5801': 'Woven pile fabrics and chenille fabrics, other than fabrics of heading 5802 or 5806',
        '5802': 'Terry towelling and similar woven terry fabrics, other than narrow fabrics of heading 5806; tufted textile fabrics, other than products of heading 5703',
        '5803': 'Gauze, other than narrow fabrics of heading 5806',
        '5804': 'Tulles and other net fabrics, not including woven, knitted or crocheted fabrics; lace in the piece, in strips or in motifs, other than fabrics of headings 6002 to 6006',
        '5805': 'Hand-woven tapestries of the type Gobelins, Flanders, Aubusson, Beauvais and the like, and needle-worked tapestries (for example, petit point, cross stitch), whether or not made up',
        '5806': 'Narrow woven fabrics, other than goods of heading 5807; narrow fabrics consisting of warp without weft assembled by means of an adhesive (bolducs)',
        '5807': 'Labels, badges and similar articles of textile materials, in the piece, in strips or cut to shape or size, not embroidered',
        '5808': 'Braids in the piece; ornamental trimmings in the piece, without embroidery, other than knitted or crocheted; tassels, pompons and similar articles',
        '5809': 'Woven fabrics of metal thread and woven fabrics of metallised yarn of heading 5605, of a kind used in apparel, as furnishing fabrics or for similar purposes, not elsewhere specified or included',
        '5810': 'Embroidery in the piece, in strips or in motifs',
        '5811': 'Quilted textile products in the piece, composed of one or more layers of textile materials assembled with padding by stitching or otherwise, other than embroidery of heading 5810',
    },
    
    // Chapter 59: Impregnated, coated, covered or laminated textile fabrics; textile articles of a kind suitable for industrial use
    '59': {
        '5901': 'Textile fabrics coated with gum or amylaceous substances, of a kind used for the outer covers of books or the like; tracing cloth; prepared painting canvas; buckram and similar stiffened textile fabrics of a kind used for hat foundations',
        '5902': 'Tyre cord fabric of high tenacity yarn of nylon or other polyamides, polyesters or viscose rayon',
        '5903': 'Textile fabrics impregnated, coated, covered or laminated with plastics, other than those of heading 5902',
        '5904': 'Linoleum, whether or not cut to shape; floor coverings consisting of a coating or covering applied on a textile backing, whether or not cut to shape',
        '5905': 'Textile wall coverings',
        '5906': 'Rubberised textile fabrics, other than those of heading 5902',
        '5907': 'Textile fabrics otherwise impregnated, coated or covered; painted canvas being theatrical scenery, studio back-cloths or the like',
        '5908': 'Textile wicks, woven, plaited or knitted, for lamps, stoves, lighters, candles or the like; incandescent gas mantles and tubular knitted gas mantle fabric therefor, whether or not impregnated',
        '5909': 'Textile hosepiping and similar textile tubing, with or without lining, armour or accessories of other materials',
        '5910': 'Transmission or conveyor belts or belting, of textile material, whether or not impregnated, coated, covered or laminated with plastics, or reinforced with metal or other material',
        '5911': 'Textile products and articles, for technical uses, specified in Note 7 to this Chapter',
    },
    // Chapter 60: Knitted or crocheted fabrics
    '60': {
        '6001': 'Pile fabrics, including "long pile" fabrics and terry fabrics, knitted or crocheted',
        '6002': 'Other knitted or crocheted fabrics',
        '6003': 'Knitted or crocheted fabrics of a width not exceeding 30 cm, containing by weight 5% or more of elastomeric yarn or rubber thread, other than those of heading 6001',
        '6004': 'Knitted or crocheted fabrics of a width not exceeding 30 cm, containing by weight less than 5% of elastomeric yarn or rubber thread, other than those of heading 6001',
        '6005': 'Knitted or crocheted fabrics of a width exceeding 30 cm, containing by weight 5% or more of elastomeric yarn or rubber thread, other than those of heading 6001',
        '6006': 'Other knitted or crocheted fabrics of a width exceeding 30 cm',
    },
    
    
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



export function getSortedChaptersList(): Array<{code: string, name: string}> {
    return Object.entries(hsChapters)
        .map(([code, name]) => ({ code, name }))
        .sort((a, b) => parseInt(a.code) - parseInt(b.code));
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


export function getSubcategoriesForChapter(chapterCode: string): Array<{code: string, name: string}> {
  const subcategories = hsSubcategories[chapterCode];
  if (!subcategories) return [];
  
  return Object.entries(subcategories)
    .sort(([codeA], [codeB]) => {
      // Sort by numeric value of the subcategory code
      return parseInt(codeA) - parseInt(codeB);
    })
    .map(([code, name]) => ({ code, name }));
}

export function getDetailsForSubcategory(subcategoryCode: string): Array<{code: string, name: string}> {
  const details = hsDetails[subcategoryCode];
  if (!details) return [];
  
  return Object.entries(details)
    .sort(([codeA], [codeB]) => {
      // For codes like "0101.21", we need to handle the dot
      const cleanA = codeA.replace('.', '');
      const cleanB = codeB.replace('.', '');
      return parseInt(cleanA) - parseInt(cleanB);
    })
    .map(([code, name]) => ({ code, name }));
}

// If you want to use the ordered list in a component:
export function getAllChaptersSorted(): Record<string, string> {
  const sortedEntries = Object.entries(hsChapters)
    .sort(([codeA], [codeB]) => parseInt(codeA) - parseInt(codeB));
  
  return Object.fromEntries(sortedEntries);
}

