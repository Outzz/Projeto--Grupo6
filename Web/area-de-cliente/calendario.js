// Calendário Interativo

let currentDate = new Date(); // Data atual

// Função para renderizar o calendário de acordo com o mês e ano
function renderCalendar(month, year) {
    // Ajuste da data com o novo mês e ano
    currentDate.setMonth(month);
    currentDate.setFullYear(year);

    const firstDay = new Date(year, month).getDay(); // Primeiro dia do mês
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês

    let calendarHTML = `
        <div class="calendar-nav">
            <button onclick="changeMonth(-1)" class="nav-btn">&lt; Mês Anterior</button>
            <span class="month-year">${currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
            <button onclick="changeMonth(1)" class="nav-btn">Próximo Mês &gt;</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Dom</th>
                    <th>Seg</th>
                    <th>Ter</th>
                    <th>Qua</th>
                    <th>Qui</th>
                    <th>Sex</th>
                    <th>Sáb</th>
                </tr>
            </thead>
            <tbody>
                <tr>`;

    // Preenche os dias do mês
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<td></td>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = new Date(year, month, day);
        calendarHTML += `<td>${day}</td>`;
        if ((firstDay + day) % 7 === 0) {
            calendarHTML += `</tr><tr>`;
        }
    }

    calendarHTML += `</tr></tbody></table>`;
    document.getElementById('calendar').innerHTML = calendarHTML;
}

// Função para mudar o mês ao clicar nos botões
function changeMonth(increment) {
    const newMonth = currentDate.getMonth() + increment;
    const newYear = currentDate.getFullYear();

    // Verifica se o mês mudou para o próximo ano
    if (newMonth < 0) {
        currentDate.setMonth(11); // Dezembro
        currentDate.setFullYear(newYear - 1);
    } else if (newMonth > 11) {
        currentDate.setMonth(0); // Janeiro
        currentDate.setFullYear(newYear + 1);
    } else {
        currentDate.setMonth(newMonth);
    }

    renderCalendar(currentDate.getMonth(), currentDate.getFullYear()); // Re-renderiza o calendário
}

// Inicializa o calendário com o mês e ano atuais
renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
