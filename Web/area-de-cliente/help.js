// client.js
const TICKETS_KEY = 'renova_tickets_v2';

function loadTickets() { return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]'); }
function saveTickets(arr) { localStorage.setItem(TICKETS_KEY, JSON.stringify(arr)); }
function formatDate(d = new Date()) { return new Date(d).toLocaleString(); }

function seedIfEmpty() {
    if (!localStorage.getItem(TICKETS_KEY)) {
        const sample = [
            { id: 'TCK-1001', subject: 'Catraca não libera', clientName: 'João', createdAt: '2025-10-20 09:12', status: 'Aberto', messages: [{ from: 'client', text: 'Ao passar meu cartão a catraca não abre.', at: '2025-10-20 09:12' }] }
        ];
        saveTickets(sample);
    }
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;" }[m])); }

function renderChat(ticket) {
    const chat = document.getElementById('c-chat'); chat.innerHTML = '';
    document.getElementById('c-title').textContent = `${ticket.id} — ${ticket.subject} — Status: ${ticket.status}`;
    ticket.messages.forEach(m => {
        const div = document.createElement('div'); div.className = 'msg ' + (m.from === 'client' ? 'client' : 'admin');
        div.innerHTML = `<div>${escapeHtml(m.text)}</div><div class="meta">${m.at} • ${m.from}</div>`;
        chat.appendChild(div);
    });
    chat.scrollTop = chat.scrollHeight;
}

function openLatestTicketForClient() {
    const tickets = loadTickets();
    if (tickets.length === 0) { document.getElementById('c-title').textContent = 'Nenhum chamado aberto'; return; }
    const latest = tickets.find(t => t.clientName === 'Você') || tickets[0];
    localStorage.setItem('renova_active_ticket', latest.id);
    renderChat(latest);
}

function createTicket() {
    const subj = document.getElementById('c-subject').value.trim();
    const desc = document.getElementById('c-desc').value.trim();
    if (!subj || !desc) { alert('Preencha assunto e descrição'); return; }
    const tickets = loadTickets();
    const id = 'TCK-' + (Math.floor(Math.random() * 900000) + 1000);
    const t = { id, subject: subj, clientName: 'Você', createdAt: formatDate(), status: 'Aberto', messages: [{ from: 'client', text: desc, at: formatDate() }] };
    tickets.unshift(t);
    saveTickets(tickets);
    document.getElementById('c-subject').value = ''; document.getElementById('c-desc').value = '';
    localStorage.setItem('renova_active_ticket', id);
    renderChat(t);
}

function sendClientMessage() {
    const txt = document.getElementById('c-msg').value.trim();
    if (!txt) return;
    const active = localStorage.getItem('renova_active_ticket');
    if (!active) { alert('Abra um chamado antes de enviar mensagens.'); return; }
    const tickets = loadTickets(); const t = tickets.find(x => x.id === active);
    t.messages.push({ from: 'client', text: txt, at: formatDate() });
    saveTickets(tickets); renderChat(t); document.getElementById('c-msg').value = '';
}

// init
window.addEventListener('DOMContentLoaded', () => {
    seedIfEmpty();
    openLatestTicketForClient();
    document.getElementById('c-create').addEventListener('click', createTicket);
    document.getElementById('c-send').addEventListener('click', sendClientMessage);

    // if admin updates storage in other tab, refresh view
    window.addEventListener('storage', (e) => {
        if (e.key === TICKETS_KEY || e.key === 'renova_active_ticket') { openLatestTicketForClient(); }
    });
});