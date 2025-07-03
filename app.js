let currentDate = new Date();
let selectedDate = new Date();

const months = ['January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November', 'December'];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('monthTitle').textContent = `${year} ${months[month]}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const daysContainer = document.getElementById('daysContainer');
    daysContainer.innerHTML = '';
    
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('button');
        day.className = 'day other-month';
        day.textContent = daysInPrevMonth - i;
        daysContainer.appendChild(day);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'day';
        dayBtn.textContent = day;
        
        if (selectedDate.getFullYear() === year && 
            selectedDate.getMonth() === month && 
            selectedDate.getDate() === day) {
            dayBtn.classList.add('selected');
        }
        
        dayBtn.onclick = () => selectDate(year, month, day);
        daysContainer.appendChild(dayBtn);
    }
    
    const totalCells = daysContainer.children.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'day other-month';
        dayBtn.textContent = day;
        daysContainer.appendChild(dayBtn);
    }
}

function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    updateSelectedDate();
    renderCalendar();
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function updateSelectedDate() {
    const dayName = weekdays[selectedDate.getDay()];
    const monthName = months[selectedDate.getMonth()];
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    
    document.getElementById('selectedDate').textContent = 
        `${dayName} ${monthName} ${day}, ${year}`;
}

currentDate = new Date(selectedDate);
renderCalendar();