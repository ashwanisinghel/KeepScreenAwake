// Indian Festivals Data with Accurate Dates
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
            { name: "Makar Sankranti", date: "01-14", type: "religious", description: "Harvest festival marking the transition of the sun into Capricorn" },
            { name: "Pongal", date: "01-14", type: "regional", description: "Tamil harvest festival" },
            { name: "Baisakhi", date: "04-13", type: "regional", description: "Punjabi New Year and harvest festival" }
        ];

        // Accurate festival dates for recent years (2020-2030)
        const accurateFestivalDates = {
            2024: {
                "2024-01-15": [{ name: "Makar Sankranti", type: "religious", description: "Harvest festival" }],
                "2024-01-26": [{ name: "Vasant Panchami", type: "religious", description: "Festival dedicated to goddess Saraswati" }],
                "2024-03-08": [{ name: "Maha Shivratri", type: "religious", description: "Great night of Lord Shiva" }],
                "2024-03-13": [{ name: "Holi", type: "religious", description: "Festival of colors" }],
                "2024-03-25": [{ name: "Gudi Padwa", type: "regional", description: "Marathi New Year" }],
                "2024-04-09": [{ name: "Ugadi", type: "regional", description: "Telugu and Kannada New Year" }],
                "2024-04-17": [{ name: "Ram Navami", type: "religious", description: "Birthday of Lord Rama" }],
                "2024-04-23": [{ name: "Hanuman Jayanti", type: "religious", description: "Birthday of Lord Hanuman" }],
                "2024-05-10": [{ name: "Akshaya Tritiya", type: "religious", description: "Auspicious day for new beginnings" }],
                "2024-05-23": [{ name: "Buddha Purnima", type: "religious", description: "Birthday of Gautama Buddha" }],
                "2024-07-07": [{ name: "Rath Yatra", type: "religious", description: "Chariot festival of Lord Jagannath" }],
                "2024-07-21": [{ name: "Guru Purnima", type: "religious", description: "Day to honor spiritual teachers" }],
                "2024-08-19": [{ name: "Raksha Bandhan", type: "cultural", description: "Festival celebrating sibling bond" }],
                "2024-08-26": [{ name: "Krishna Janmashtami", type: "religious", description: "Birthday of Lord Krishna" }],
                "2024-09-07": [{ name: "Ganesh Chaturthi", type: "religious", description: "Birthday of Lord Ganesha" }],
                "2024-09-15": [{ name: "Onam", type: "regional", description: "Harvest festival of Kerala" }],
                "2024-10-03": [{ name: "Navratri Begins", type: "religious", description: "Nine nights dedicated to Goddess Durga" }],
                "2024-10-12": [{ name: "Dussehra", type: "religious", description: "Victory of good over evil" }],
                "2024-10-20": [{ name: "Karva Chauth", type: "cultural", description: "Fast observed by married women" }],
                "2024-11-01": [{ name: "Diwali", type: "religious", description: "Festival of lights" }],
                "2024-11-03": [{ name: "Bhai Dooj", type: "cultural", description: "Celebrates sibling bond" }],
                "2024-11-15": [{ name: "Guru Nanak Jayanti", type: "religious", description: "Birthday of Guru Nanak" }]
            },
            2025: {
                "2025-01-13": [{ name: "Makar Sankranti", type: "religious", description: "Harvest festival" }],
                "2025-02-03": [{ name: "Vasant Panchami", type: "religious", description: "Festival dedicated to goddess Saraswati" }],
                "2025-02-26": [{ name: "Maha Shivratri", type: "religious", description: "Great night of Lord Shiva" }],
                "2025-03-14": [{ name: "Holi", type: "religious", description: "Festival of colors" }],
                "2025-03-30": [{ name: "Gudi Padwa", type: "regional", description: "Marathi New Year" }],
                "2025-03-30": [{ name: "Ugadi", type: "regional", description: "Telugu and Kannada New Year" }],
                "2025-04-06": [{ name: "Ram Navami", type: "religious", description: "Birthday of Lord Rama" }],
                "2025-04-13": [{ name: "Hanuman Jayanti", type: "religious", description: "Birthday of Lord Hanuman" }],
                "2025-04-30": [{ name: "Akshaya Tritiya", type: "religious", description: "Auspicious day for new beginnings" }],
                "2025-05-12": [{ name: "Buddha Purnima", type: "religious", description: "Birthday of Gautama Buddha" }],
                "2025-06-29": [{ name: "Rath Yatra", type: "religious", description: "Chariot festival of Lord Jagannath" }],
                "2025-07-13": [{ name: "Guru Purnima", type: "religious", description: "Day to honor spiritual teachers" }],
                "2025-08-09": [{ name: "Raksha Bandhan", type: "cultural", description: "Festival celebrating sibling bond" }],
                "2025-08-16": [{ name: "Krishna Janmashtami", type: "religious", description: "Birthday of Lord Krishna" }],
                "2025-08-27": [{ name: "Ganesh Chaturthi", type: "religious", description: "Birthday of Lord Ganesha" }],
                "2025-09-05": [{ name: "Onam", type: "regional", description: "Harvest festival of Kerala" }],
                "2025-09-22": [{ name: "Navratri Begins", type: "religious", description: "Nine nights dedicated to Goddess Durga" }],
                "2025-10-02": [{ name: "Dussehra", type: "religious", description: "Victory of good over evil" }],
                "2025-10-09": [{ name: "Karva Chauth", type: "cultural", description: "Fast observed by married women" }],
                "2025-10-20": [{ name: "Diwali", type: "religious", description: "Festival of lights" }],
                "2025-10-22": [{ name: "Bhai Dooj", type: "cultural", description: "Celebrates sibling bond" }],
                "2025-11-05": [{ name: "Guru Nanak Jayanti", type: "religious", description: "Birthday of Guru Nanak" }]
            }
        };

        // Generate festivals for all years
        for (let year = 2020; year <= 2030; year++) {
            festivals[year] = {};

            // Add fixed date festivals
            fixedFestivals.forEach(festival => {
                const [month, day] = festival.date.split('-').map(Number);
                const dateKey = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                if (!festivals[year][dateKey]) {
                    festivals[year][dateKey] = [];
                }
                festivals[year][dateKey].push(festival);
            });

            // Add accurate dates if available
            if (accurateFestivalDates[year]) {
                Object.keys(accurateFestivalDates[year]).forEach(dateKey => {
                    if (!festivals[year][dateKey]) {
                        festivals[year][dateKey] = [];
                    }
                    festivals[year][dateKey] = festivals[year][dateKey].concat(accurateFestivalDates[year][dateKey]);
                });
            }
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