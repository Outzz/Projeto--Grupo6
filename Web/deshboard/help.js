// admin.js
const TICKETS_KEY = 'renova_tickets_v2';
function loadTickets() { return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]'); }
function saveTickets(arr) { localStorage.setItem(TICKETS_KEY, JSON.stringify(arr)); }
function formatDate(d = new Date()) { return new Date(d).toLocaleString(); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;" }[m])); }

function seedIfEmpty() {
    if (!localStorage.getItem(TICKETS_KEY)) {
        const sample = [
            { id: 'TCK-1001', subject: 'Catraca não libera', clientName: 'João', createdAt: '2025-10-20 09:12', status: 'Aberto', messages: [{ from: 'client', text: 'Ao passar meu cartão a catraca não abre.', at: '2025-10-20 09:12' }] },
            { id: 'TCK-1002', subject: 'Dúvida sobre plano', clientName: 'Maria', createdAt: '2025-10-22 14:05', status: 'Resolvido', messages: [{ from: 'client', text: 'Posso trocar de plano durante o mês?', at: '2025-10-22 14:05' }, { from: 'admin', text: 'Sim, com ajuste proporcional.', at: '2025-10-22 14:15' }] }
        ];
        saveTickets(sample);
    }
}

let selectedId = null;

function renderList(filter = '') {
    const ul = document.getElementById('a-list'); ul.innerHTML = '';
    const tickets = loadTickets();
    tickets.filter(t => {
        if (!filter) return true;
        const f = filter.toLowerCase();
        return t.id.toLowerCase().includes(f) || t.subject.toLowerCase().includes(f) || t.clientName.toLowerCase().includes(f);
    }).forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${t.id}</strong> — ${escapeHtml(t.subject)} <div class="meta small">${escapeHtml(t.clientName)} • ${t.createdAt} • <em>${t.status}</em></div>`;
        li.addEventListener('click', () => selectTicket(t.id));
        ul.appendChild(li);
    });
}

function renderChat(ticket) {
    const chat = document.getElementById('a-chat'); chat.innerHTML = '';
    document.getElementById('a-title').textContent = `${ticket.id} — ${ticket.subject} — ${ticket.clientName}`;
    document.getElementById('a-status').value = ticket.status;
    ticket.messages.forEach(m => {
        const div = document.createElement('div'); div.className = 'msg ' + (m.from === 'client' ? 'client' : 'admin');
        div.innerHTML = `<div>${escapeHtml(m.text)}</div><div class="meta">${m.at} • ${m.from}</div>`;
        chat.appendChild(div);
    });
    chat.scrollTop = chat.scrollHeight;
}

function selectTicket(id) {
    const tickets = loadTickets(); const t = tickets.find(x => x.id === id);
    if (!t) return;
    selectedId = id; localStorage.setItem('renova_active_ticket', id);
    renderChat(t);
}

function sendAdminMessage() {
    const txt = document.getElementById('a-msg').value.trim(); if (!txt || !selectedId) { if (!selectedId) alert('Selecione um chamado.'); return; }
    const tickets = loadTickets(); const t = tickets.find(x => x.id === selectedId);
    t.messages.push({ from: 'admin', text: txt, at: formatDate() });
    saveTickets(tickets); renderChat(t); document.getElementById('a-msg').value = '';
    renderList(document.getElementById('a-search').value.trim());
}

function saveStatus() {
    if (!selectedId) { alert('Selecione um chamado.'); return; }
    const newStatus = document.getElementById('a-status').value;
    const tickets = loadTickets(); const t = tickets.find(x => x.id === selectedId);
    t.status = newStatus; saveTickets(tickets); renderList(document.getElementById('a-search').value.trim());
}

// init
window.addEventListener('DOMContentLoaded', () => {
    seedIfEmpty();
    renderList();
    document.getElementById('a-search').addEventListener('input', (e) => renderList(e.target.value.trim()));
    document.getElementById('a-send').addEventListener('click', sendAdminMessage);
    document.getElementById('a-save-status').addEventListener('click', saveStatus);

    // if client updates storage in other tab, refresh list/chat
    window.addEventListener('storage', (e) => {
        if (e.key === TICKETS_KEY || e.key === 'renova_active_ticket') {
            renderList(document.getElementById('a-search').value.trim());
            const active = localStorage.getItem('renova_active_ticket');
            if (active) {
                const tickets = loadTickets(); const t = tickets.find(x => x.id === active);
                if (t) selectTicket(active);
            }
        }
    });
});