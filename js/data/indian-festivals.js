// Indian Festivals Data (2000-2050)
class IndianFestivalsData {
    constructor() {
        this.festivals = this.generateFestivalData();
    }

    generateFestivalData() {
        const festivals = {};
        
        // Fixed date festivals (Gregorian calendar)
        const fixedFestivals = [
            { name: "New Year's Day", date: "01-01", type: "national", description: "Beginning of the Gregorian calendar year" },
            { name: "Republic Day", date: "01-26", type: "national", description: "Commemorates the adoption of the Constitution of India" },
            { name: "Independence Day", date: "08-15", type: "national", description: "Celebrates India's independence from British rule" },
            { name: "Gandhi Jayanti", date: "10-02", type: "national", description: "Birthday of Mahatma Gandhi" },
            { name: "Christmas", date: "12-25", type: "religious", description: "Celebrates the birth of Jesus Christ" },
            { name: "Good Friday", date: "variable", type: "religious", description: "Commemorates the crucifixion of Jesus Christ" },
            { name: "Buddha Purnima", date: "variable", type: "religious", description: "Celebrates the birth of Gautama Buddha" },
            { name: "Guru Nanak Jayanti", date: "variable", type: "religious", description: "Birthday of Guru Nanak, founder of Sikhism" }
        ];

        // Variable date festivals (approximate dates - in real implementation, these would be calculated using lunar calendar)
        const variableFestivals = [
            { name: "Makar Sankranti", month: 1, day: 14, type: "religious", description: "Harvest festival marking the transition of the sun into Capricorn" },
            { name: "Vasant Panchami", month: 2, day: 5, type: "religious", description: "Festival dedicated to goddess Saraswati" },
            { name: "Maha Shivratri", month: 2, day: 21, type: "religious", description: "Great night of Lord Shiva" },
            { name: "Holi", month: 3, day: 8, type: "religious", description: "Festival of colors celebrating the arrival of spring" },
            { name: "Ram Navami", month: 4, day: 2, type: "religious", description: "Birthday of Lord Rama" },
            { name: "Hanuman Jayanti", month: 4, day: 15, type: "religious", description: "Birthday of Lord Hanuman" },
            { name: "Akshaya Tritiya", month: 5, day: 3, type: "religious", description: "Auspicious day for new beginnings" },
            { name: "Rath Yatra", month: 6, day: 20, type: "religious", description: "Chariot festival of Lord Jagannath" },
            { name: "Guru Purnima", month: 7, day: 16, type: "religious", description: "Day to honor spiritual teachers" },
            { name: "Raksha Bandhan", month: 8, day: 11, type: "cultural", description: "Festival celebrating the bond between brothers and sisters" },
            { name: "Krishna Janmashtami", month: 8, day: 18, type: "religious", description: "Birthday of Lord Krishna" },
            { name: "Ganesh Chaturthi", month: 8, day: 25, type: "religious", description: "Birthday of Lord Ganesha" },
            { name: "Onam", month: 9, day: 8, type: "regional", description: "Harvest festival of Kerala" },
            { name: "Dussehra", month: 10, day: 5, type: "religious", description: "Victory of good over evil" },
            { name: "Karva Chauth", month: 10, day: 20, type: "cultural", description: "Fast observed by married women for their husbands' well-being" },
            { name: "Diwali", month: 10, day: 25, type: "religious", description: "Festival of lights" },
            { name: "Bhai Dooj", month: 10, day: 27, type: "cultural", description: "Celebrates the bond between brothers and sisters" },
            { name: "Guru Nanak Jayanti", month: 11, day: 15, type: "religious", description: "Birthday of Guru Nanak" },
            { name: "Dev Deepawali", month: 11, day: 23, type: "religious", description: "Festival of lights celebrated in Varanasi" }
        ];

        // Generate festivals for years 2000-2050
        for (let year = 2000; year <= 2050; year++) {
            festivals[year] = {};

            // Add fixed date festivals
            fixedFestivals.forEach(festival => {
                if (festival.date !== "variable") {
                    const [month, day] = festival.date.split('-').map(Number);
                    const dateKey = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    
                    if (!festivals[year][dateKey]) {
                        festivals[year][dateKey] = [];
                    }
                    festivals[year][dateKey].push(festival);
                }
            });

            // Add variable date festivals (with slight variations each year)
            variableFestivals.forEach(festival => {
                // Add some variation to simulate lunar calendar differences
                const dayVariation = Math.floor(Math.random() * 10) - 5; // -5 to +5 days variation
                const adjustedDay = Math.max(1, Math.min(28, festival.day + dayVariation));
                
                const dateKey = `${year}-${festival.month.toString().padStart(2, '0')}-${adjustedDay.toString().padStart(2, '0')}`;
                
                if (!festivals[year][dateKey]) {
                    festivals[year][dateKey] = [];
                }
                festivals[year][dateKey].push(festival);
            });

            // Add some regional festivals
            const regionalFestivals = [
                { name: "Pongal", month: 1, day: 14, type: "regional", description: "Tamil harvest festival" },
                { name: "Baisakhi", month: 4, day: 13, type: "regional", description: "Punjabi New Year and harvest festival" },
                { name: "Poila Boishakh", month: 4, day: 14, type: "regional", description: "Bengali New Year" },
                { name: "Vishu", month: 4, day: 14, type: "regional", description: "Malayalam New Year" },
                { name: "Gudi Padwa", month: 3, day: 25, type: "regional", description: "Marathi New Year" },
                { name: "Ugadi", month: 3, day: 25, type: "regional", description: "Telugu and Kannada New Year" },
                { name: "Navratri", month: 9, day: 15, type: "religious", description: "Nine nights dedicated to Goddess Durga" },
                { name: "Durga Puja", month: 9, day: 20, type: "regional", description: "Bengali festival honoring Goddess Durga" },
                { name: "Kali Puja", month: 10, day: 25, type: "regional", description: "Bengali festival honoring Goddess Kali" }
            ];

            regionalFestivals.forEach(festival => {
                const dayVariation = Math.floor(Math.random() * 6) - 3; // -3 to +3 days variation
                const adjustedDay = Math.max(1, Math.min(28, festival.day + dayVariation));
                
                const dateKey = `${year}-${festival.month.toString().padStart(2, '0')}-${adjustedDay.toString().padStart(2, '0')}`;
                
                if (!festivals[year][dateKey]) {
                    festivals[year][dateKey] = [];
                }
                festivals[year][dateKey].push(festival);
            });
        }

        return festivals;
    }

    getFestivalsForDate(year, month, day) {
        const dateKey = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return this.festivals[year] && this.festivals[year][dateKey] ? this.festivals[year][dateKey] : [];
    }

    getFestivalsForMonth(year, month) {
        if (!this.festivals[year]) return [];
        
        const monthFestivals = [];
        Object.keys(this.festivals[year]).forEach(dateKey => {
            const [y, m, d] = dateKey.split('-').map(Number);
            if (m === month) {
                this.festivals[year][dateKey].forEach(festival => {
                    monthFestivals.push({
                        ...festival,
                        date: new Date(y, m - 1, d),
                        dateString: dateKey
                    });
                });
            }
        });
        
        return monthFestivals.sort((a, b) => a.date - b.date);
    }

    getFestivalsForYear(year) {
        if (!this.festivals[year]) return [];
        
        const yearFestivals = [];
        Object.keys(this.festivals[year]).forEach(dateKey => {
            const [y, m, d] = dateKey.split('-').map(Number);
            this.festivals[year][dateKey].forEach(festival => {
                yearFestivals.push({
                    ...festival,
                    date: new Date(y, m - 1, d),
                    dateString: dateKey
                });
            });
        });
        
        return yearFestivals.sort((a, b) => a.date - b.date);
    }
}

// Initialize the festivals data
window.indianFestivalsData = new IndianFestivalsData();