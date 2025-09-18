const mockData = {
  markets: [
    {
      id: 1,
      name_en: "Central Market",
      name_km: "ផ្សារធំថ្មី",
      items: [
        { id: 1, name_en: "Rice (1kg)", name_km: "អង្ករ (១គីឡូ)", price: 2500 },
        { id: 2, name_en: "Fish (1kg)", name_km: "ត្រី (១គីឡូ)", price: 8000 },
        { id: 3, name_en: "Cooking Oil (1L)", name_km: "ប្រេងចម្អិន (១លីត្រ)", price: 4500 },
        { id: 4, name_en: "Chicken (1kg)", name_km: "សាច់មាន់ (១គីឡូ)", price: 12000 },
        { id: 5, name_en: "Pork (1kg)", name_km: "សាច់ជ្រូក (១គីឡូ)", price: 15000 },
        { id: 6, name_en: "Eggs (10 pieces)", name_km: "ស៊ុប (១០គ្រាប់)", price: 3000 },
        { id: 7, name_en: "Onions (1kg)", name_km: "ខ្ញី (១គីឡូ)", price: 2000 },
        { id: 8, name_en: "Garlic (1kg)", name_km: "ខ្ទឹម (១គីឡូ)", price: 3500 },
        { id: 9, name_en: "Tomatoes (1kg)", name_km: "ប៉េងប៉ោង (១គីឡូ)", price: 4000 },
        { id: 10, name_en: "Salt (1kg)", name_km: "អំបិល (១គីឡូ)", price: 1000 }
      ]
    },
    {
      id: 2,
      name_en: "Orussey Market",
      name_km: "ផ្សារអូរទស្សី",
      items: [
        { id: 1, name_en: "Rice (1kg)", name_km: "អង្ករ (១គីឡូ)", price: 2400 },
        { id: 2, name_en: "Fish (1kg)", name_km: "ត្រី (១គីឡូ)", price: 7500 },
        { id: 3, name_en: "Cooking Oil (1L)", name_km: "ប្រេងចម្អិន (១លីត្រ)", price: 4200 },
        { id: 4, name_en: "Chicken (1kg)", name_km: "សាច់មាន់ (១គីឡូ)", price: 11500 },
        { id: 5, name_en: "Pork (1kg)", name_km: "សាច់ជ្រូក (១គីឡូ)", price: 14500 },
        { id: 6, name_en: "Eggs (10 pieces)", name_km: "ស៊ុប (១០គ្រាប់)", price: 2800 },
        { id: 7, name_en: "Onions (1kg)", name_km: "ខ្ញី (១គីឡូ)", price: 1800 },
        { id: 8, name_en: "Garlic (1kg)", name_km: "ខ្ទឹម (១គីឡូ)", price: 3200 },
        { id: 9, name_en: "Tomatoes (1kg)", name_km: "ប៉េងប៉ោង (១គីឡូ)", price: 3800 },
        { id: 10, name_en: "Salt (1kg)", name_km: "អំបិល (១គីឡូ)", price: 900 }
      ]
    },
    {
      id: 3,
      name_en: "Russian Market",
      name_km: "ផ្សាររុស្ស៊ី",
      items: [
        { id: 1, name_en: "Rice (1kg)", name_km: "អង្ករ (១គីឡូ)", price: 2600 },
        { id: 2, name_en: "Fish (1kg)", name_km: "ត្រី (១គីឡូ)", price: 8200 },
        { id: 3, name_en: "Cooking Oil (1L)", name_km: "ប្រេងចម្អិន (១លីត្រ)", price: 4700 },
        { id: 4, name_en: "Chicken (1kg)", name_km: "សាច់មាន់ (១គីឡូ)", price: 12500 },
        { id: 5, name_en: "Pork (1kg)", name_km: "សាច់ជ្រូក (១គីឡូ)", price: 15200 },
        { id: 6, name_en: "Eggs (10 pieces)", name_km: "ស៊ុប (១០គ្រាប់)", price: 3100 },
        { id: 7, name_en: "Onions (1kg)", name_km: "ខ្ញី (១គីឡូ)", price: 2100 },
        { id: 8, name_en: "Garlic (1kg)", name_km: "ខ្ទឹម (១គីឡូ)", price: 3600 },
        { id: 9, name_en: "Tomatoes (1kg)", name_km: "ប៉េងប៉ោង (១គីឡូ)", price: 4100 },
        { id: 10, name_en: "Salt (1kg)", name_km: "អំបិល (១គីឡូ)", price: 1100 }
      ]
    },
    {
      id: 4,
      name_en: "Phsar Thmei",
      name_km: "ផ្សារថ្មី",
      items: [
        { id: 1, name_en: "Rice (1kg)", name_km: "អង្ករ (១គីឡូ)", price: 2300 },
        { id: 2, name_en: "Fish (1kg)", name_km: "ត្រី (១គីឡូ)", price: 7800 },
        { id: 3, name_en: "Cooking Oil (1L)", name_km: "ប្រេងចម្អិន (១លីត្រ)", price: 4300 },
        { id: 4, name_en: "Chicken (1kg)", name_km: "សាច់មាន់ (១គីឡូ)", price: 11800 },
        { id: 5, name_en: "Pork (1kg)", name_km: "សាច់ជ្រូក (១គីឡូ)", price: 14800 },
        { id: 6, name_en: "Eggs (10 pieces)", name_km: "ស៊ុប (១០គ្រាប់)", price: 2900 },
        { id: 7, name_en: "Onions (1kg)", name_km: "ខ្ញី (១គីឡូ)", price: 1900 },
        { id: 8, name_en: "Garlic (1kg)", name_km: "ខ្ទឹម (១គីឡូ)", price: 3300 },
        { id: 9, name_en: "Tomatoes (1kg)", name_km: "ប៉េងប៉ោង (១គីឡូ)", price: 3900 },
        { id: 10, name_en: "Salt (1kg)", name_km: "អំបិល (១គីឡូ)", price: 950 }
      ]
    },
    {
      id: 5,
      name_en: "Boeung Keng Kang Market",
      name_km: "ផ្សារបឹងកេងកង",
      items: [
        { id: 1, name_en: "Rice (1kg)", name_km: "អង្ករ (១គីឡូ)", price: 2550 },
        { id: 2, name_en: "Fish (1kg)", name_km: "ត្រី (១គីឡូ)", price: 8100 },
        { id: 3, name_en: "Cooking Oil (1L)", name_km: "ប្រេងចម្អិន (១លីត្រ)", price: 4600 },
        { id: 4, name_en: "Chicken (1kg)", name_km: "សាច់មាន់ (១គីឡូ)", price: 12200 },
        { id: 5, name_en: "Pork (1kg)", name_km: "សាច់ជ្រូក (១គីឡូ)", price: 15100 },
        { id: 6, name_en: "Eggs (10 pieces)", name_km: "ស៊ុប (១០គ្រាប់)", price: 2950 },
        { id: 7, name_en: "Onions (1kg)", name_km: "ខ្ញី (១គីឡូ)", price: 1950 },
        { id: 8, name_en: "Garlic (1kg)", name_km: "ខ្ទឹម (១គីឡូ)", price: 3400 },
        { id: 9, name_en: "Tomatoes (1kg)", name_km: "ប៉េងប៉ោង (១គីឡូ)", price: 3950 },
        { id: 10, name_en: "Salt (1kg)", name_km: "អំបិល (១គីឡូ)", price: 1050 }
      ]
    }
  ]
};

module.exports = mockData;
