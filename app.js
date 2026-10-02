const dateInput = document.querySelector('#date');
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
dateInput.min = today;
document.querySelector('#year').textContent = now.getFullYear();
document.querySelectorAll('[data-treatment]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#treatment').value = link.dataset.treatment;
    document.querySelector('#request-result').hidden = true;
  });
});
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  if (dateInput.value < today) {
    dateInput.setCustomValidity('Scegli una data di oggi o futura.');
    dateInput.reportValidity();
    return;
  }
  const name = document.querySelector('#name').value.trim();
  if (!name) {
    document.querySelector('#name').setCustomValidity('Inserisci il tuo nome.');
    document.querySelector('#name').reportValidity();
    return;
  }
  const date = new Date(`${dateInput.value}T12:00:00`).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
  const result = document.querySelector('#request-result');
  result.textContent = `La tua richiesta è pronta:\n«Ciao, sono ${name}. Vorrei prenotare: ${document.querySelector('#treatment').value}, per il ${date}.»\n\nRichiesta non inviata. Condividila con il salone quando saranno disponibili i contatti. La prenotazione richiede conferma.`;
  result.hidden = false;
});
dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
document.querySelector('#name').addEventListener('input', event => event.target.setCustomValidity(''));
