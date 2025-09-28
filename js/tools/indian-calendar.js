// Indian Calendar Tool
class IndianCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
        document.getElementById('todayBtn').addEventListener('click', () => this.goToToday());

        // Year and month selectors
        document.getElementById('yearSelect').addEventListener('change', (e) => {
            this.currentYear = parseInt(e.target.value);
            this.render();
        });

        document.getElementById('monthSelect').addEventListener('change', (e) => {
            this.currentMonth = parseInt(e.target.value);
            this.render();
        });
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.render();
    }

    goToToday() {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.render();
    }

    render() {
        this.renderControls();
        this.renderCalendar();
        this.renderFestivalsList();
    }

    renderControls() {
        // Update current month display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        document.getElementById('currentMonth').textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

        // Update year selector
        const yearSelect = document.getElementById('yearSelect');
        yearSelect.innerHTML = '';
        for (let year = 2000; year <= 2050; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            option.selected = year === this.currentYear;
            yearSelect.appendChild(option);
        }

        // Update month selector
        const monthSelect = document.getElementById('monthSelect');
        monthSelect.innerHTML = '';
        monthNames.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            option.selected = index === this.currentMonth;
            monthSelect.appendChild(option);
        });

        // Update navigation buttons
        document.getElementById('prevMonth').disabled = this.currentYear === 2000 && this.currentMonth === 0;
        document.getElementById('nextMonth').disabled = this.currentYear === 2050 && this.currentMonth === 11;
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const prevMonthDay = new Date(this.currentYear, this.currentMonth, 0 - (startingDayOfWeek - 1 - i));
            this.createDayCell(prevMonthDay, true);
        }

        // Add days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            this.createDayCell(date, false);
        }

        // Add empty cells for days after the last day of the month
        const totalCells = calendarGrid.children.length - 7; // Subtract header cells
        const remainingCells = 42 - totalCells; // 6 rows * 7 days = 42 total cells
        for (let i = 1; i <= remainingCells; i++) {
            const nextMonthDay = new Date(this.currentYear, this.currentMonth + 1, i);
            this.createDayCell(nextMonthDay, true);
        }
    }

    createDayCell(date, isOtherMonth) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayCell.classList.add('other-month');
        }

        // Check if it's today
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            dayCell.classList.add('today');
        }

        // Check if it's selected
        if (this.selectedDate && date.toDateString() === this.selectedDate.toDateString()) {
            dayCell.classList.add('selected');
        }

        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayCell.appendChild(dayNumber);

        // Get festivals for this date
        const festivals = window.indianFestivalsData.getFestivalsForDate(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );

        // Add festival indicators
        if (festivals.length > 0) {
            dayCell.setAttribute('data-has-festivals', 'true');
            
            if (festivals.length === 1) {
                const festivalName = document.createElement('div');
                festivalName.className = 'festival-name';
                festivalName.textContent = festivals[0].name;
                festivalName.title = festivals[0].description;
                dayCell.appendChild(festivalName);
            } else {
                const multipleFestivals = document.createElement('div');
                multipleFestivals.className = 'multiple-festivals';
                multipleFestivals.textContent = `${festivals.length} festivals`;
                multipleFestivals.title = festivals.map(f => f.name).join(', ');
                dayCell.appendChild(multipleFestivals);
            }

            // Add festival indicator dot
            const indicator = document.createElement('div');
            indicator.className = 'festival-indicator';
            dayCell.appendChild(indicator);
        }

        // Add click event
        dayCell.addEventListener('click', () => {
            // Remove previous selection
            document.querySelectorAll('.calendar-day.selected').forEach(cell => {
                cell.classList.remove('selected');
            });
            
            // Add selection to clicked day
            dayCell.classList.add('selected');
            this.selectedDate = date;
            
            // Show festivals for selected date
            this.showFestivalsForDate(date);
        });

        document.getElementById('calendarGrid').appendChild(dayCell);
    }

    renderFestivalsList() {
        const festivals = window.indianFestivalsData.getFestivalsForMonth(this.currentYear, this.currentMonth + 1);
        const festivalsList = document.getElementById('festivalsList');
        
        if (festivals.length === 0) {
            festivalsList.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No festivals this month</p>';
            return;
        }

        festivalsList.innerHTML = '';
        festivals.forEach(festival => {
            const festivalItem = document.createElement('div');
            festivalItem.className = 'festival-item';

            const festivalDetails = document.createElement('div');
            festivalDetails.className = 'festival-details';

            const festivalTitle = document.createElement('div');
            festivalTitle.className = 'festival-title';
            festivalTitle.textContent = festival.name;

            const festivalDescription = document.createElement('div');
            festivalDescription.className = 'festival-description';
            festivalDescription.textContent = festival.description;

            const festivalType = document.createElement('span');
            festivalType.className = `festival-type ${festival.type}`;
            festivalType.textContent = festival.type;

            festivalDetails.appendChild(festivalTitle);
            festivalDetails.appendChild(festivalDescription);
            festivalDetails.appendChild(festivalType);

            const festivalDate = document.createElement('div');
            festivalDate.className = 'festival-date';
            festivalDate.textContent = festival.date.toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            });

            festivalItem.appendChild(festivalDetails);
            festivalItem.appendChild(festivalDate);
            festivalsList.appendChild(festivalItem);
        });
    }

    showFestivalsForDate(date) {
        const festivals = window.indianFestivalsData.getFestivalsForDate(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );

        if (festivals.length === 0) return;

        // Create a modal or tooltip to show festival details
        const existingModal = document.getElementById('festivalModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'festivalModal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            max-width: 400px;
            width: 90%;
        `;

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        `;

        const title = document.createElement('h3');
        title.textContent = `Festivals on ${date.toLocaleDateString('en-IN')}`;
        title.style.marginBottom = '1rem';
        modal.appendChild(title);

        festivals.forEach(festival => {
            const festivalDiv = document.createElement('div');
            festivalDiv.style.marginBottom = '1rem';
            festivalDiv.innerHTML = `
                <strong>${festival.name}</strong>
                <span class="festival-type ${festival.type}" style="margin-left: 0.5rem;">${festival.type}</span>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--text-secondary);">${festival.description}</p>
            `;
            modal.appendChild(festivalDiv);
        });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.cssText = `
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        `;
        closeBtn.onclick = () => {
            modal.remove();
            overlay.remove();
        };
        modal.appendChild(closeBtn);

        overlay.onclick = () => {
            modal.remove();
            overlay.remove();
        };

        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    }
}

// Initialize Indian Calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.indianCalendar = new IndianCalendar();
});