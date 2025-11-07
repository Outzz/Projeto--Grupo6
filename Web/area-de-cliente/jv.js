// Dados de exemplo (em app real esses virão do servidor)
li.classList.add('active')
showView(li.dataset.view)

function showView(id){
document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'))
const el = document.getElementById(id)
if(el) el.classList.remove('hidden')
document.getElementById('view-title').textContent = id.charAt(0).toUpperCase() + id.slice(1)
}


// ---- Faturas ----
function renderInvoices(){
const list = document.getElementById('invoices-list')
const tbody = document.getElementById('invoices-table-body')
list.innerHTML=''
tbody.innerHTML=''
invoices.forEach(inv=>{
const li = document.createElement('li')
li.textContent = `${inv.id} — ${inv.amount} — ${inv.due} — ${inv.status}`
list.appendChild(li)


const tr = document.createElement('tr')
tr.innerHTML = `<td>${inv.id}</td><td>${inv.amount}</td><td>${inv.due}</td><td>${inv.status}</td><td><button onclick="viewInvoice('${inv.id}')">Ver</button></td>`
tbody.appendChild(tr)
})
}
function viewInvoice(id){
const inv = invoices.find(i=>i.id===id)
alert(`Fatura ${inv.id}\nValor: ${inv.amount}\nVenc: ${inv.due}\nStatus: ${inv.status}`)
}


// ---- Helpdesk ----
const ticketForm = document.getElementById('ticket-form')
const ticketsKey = 'renova_tickets'
function loadTickets(){
const stored = JSON.parse(localStorage.getItem(ticketsKey) || '[]')
return stored
}
function saveTicket(ticket){
const arr = loadTickets()
arr.unshift(ticket)
localStorage.setItem(ticketsKey, JSON.stringify(arr))
}
function renderTickets(){
const container = document.getElementById('tickets-list')
const container2 = document.getElementById('tickets-list-2')
const arr = loadTickets()
container.innerHTML=''
container2.innerHTML=''
arr.slice(0,5).forEach(t=>{
const li = document.createElement('li')
li.textContent = `${t.subject} — ${t.date} — ${t.status}`
container.appendChild(li)
const li2 = li.cloneNode(true)
container2.appendChild(li2)
})
}


ticketForm && ticketForm.addEventListener;'submit', e=>{
e.preventDefault
const subject = document.getElementById('ticket-subject').value.trim()
const message = document.getElementById('ticket-message').value.trim()
 }