const locale = document.documentElement.lang === "es" ? "es" : "en";
const spanishCopy = {
  "A Cachai product": "Un producto de Cachai",
  "Your climbing, from the wall to your watch and phone.": "Tu escalada, de la pared a tu reloj y tu móvil.",
  "Rockstats brings rock climbing, bouldering, climbing training and multipitch activities to Garmin, with a companion experience on your phone.": "Rockstats lleva la escalada en roca, el búlder, el entrenamiento y las vías de varios largos a Garmin, con una experiencia complementaria en el móvil.",
  "Interactive climbing": "Escalada interactiva",
  "Turn any wall into an endless source of boulder problems.": "Convierte cualquier pared en una fuente inagotable de problemas de búlder.",
  "Laserwall guides you through your training. Take a photo of the wall, create a problem, send it and share it.": "Laserwall te guía durante el entrenamiento. Haz una foto de la pared, crea un problema, envíalo y compártelo.",
  "Let’s talk about ": "Hablemos de ",
  "Ask us about this work": "Pregúntanos por este proyecto",
  "Cachai project enquiry — ": "Consulta de proyecto Cachai - ",
  "Choose a time in the future.": "Elige una hora futura.",
  "Please enter your name.": "Introduce tu nombre.",
  "20-minute meeting request — ": "Solicitud de reunión de 20 minutos - "
};
const t = text => locale === "es" ? (spanishCopy[text] ?? text) : text;

const copyrightYear = document.getElementById('year');
if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

const projects = {
  rockstats: {
    title: 'Rockstats',
    label: t('A Cachai product'),
    text: t('Your climbing, from the wall to your watch and phone.'),
    detail: t('Rockstats brings rock climbing, bouldering, climbing training and multipitch activities to Garmin, with a companion experience on your phone.'),
  },
  laserwall: {
    title: 'Laserwall',
    label: t('Interactive climbing'),
    text: t('Turn any wall into an endless source of boulder problems.'),
    detail: t('Laserwall guides you through your training. Take a photo of the wall, create a problem, send it and share it.'),
  },
};
const dialog = document.getElementById('project-dialog');
let previousFocus;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.project;
    const project = projects[key];
    previousFocus = button;
    const container = document.getElementById('dialog-content');
    container.replaceChildren();
    const label = document.createElement('div');
    label.className = 'eyebrow';
    label.textContent = project.label;
    const heading = document.createElement('h2');
    heading.id = 'dialog-title';
    heading.textContent = project.title;
    const text = document.createElement('p');
    text.textContent = project.text;
    const detail = document.createElement('p');
    detail.textContent = project.detail;
    const link = document.createElement('a');
    link.href = 'mailto:dante.loi@cachai.eu?subject=' + encodeURIComponent(t('Let’s talk about ') + project.title);
    link.textContent = t('Ask us about this work');
    const actionIcon = document.createElement('span');
    actionIcon.className = 'action-icon';
    actionIcon.setAttribute('aria-hidden', 'true');
    const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('viewBox', '0 0 24 24');
    chevron.setAttribute('fill', 'none');
    chevron.setAttribute('stroke', 'currentColor');
    chevron.setAttribute('stroke-width', '1.8');
    chevron.setAttribute('stroke-linecap', 'round');
    chevron.setAttribute('stroke-linejoin', 'round');
    chevron.setAttribute('aria-hidden', 'true');
    chevron.setAttribute('focusable', 'false');
    const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevronPath.setAttribute('d', 'm9 6 6 6-6 6');
    chevron.append(chevronPath);
    actionIcon.append(chevron);
    link.append(' ', actionIcon);
    container.append(label, heading, text, detail);
    container.append(link);
    dialog.showModal();
  });
});
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog?.addEventListener('close', () => previousFocus?.focus());

const formCopy = (en, es) => locale === 'es' ? es : en;
const sendEndpoint = 'https://formsubmit.co/ajax/dante.loi@cachai.eu';
async function sendContactForm(form, note, payload) {
  if (form.dataset.sending === 'true' || !form.reportValidity()) return false;
  if (form.querySelector('[name="_honey"]').value) return false;
  if (!['http:', 'https:'].includes(window.location.protocol)) {
    note.textContent = formCopy('Open the website through a web server to send this form, or use an email link on this page.', 'Abre la web desde un servidor para enviar el formulario, o utiliza un enlace de correo de esta página.');
    return false;
  }
  form.dataset.sending = 'true';
  form.setAttribute('aria-busy', 'true');
  const controls = Array.from(form.querySelectorAll('input, select, textarea, button'));
  const disabledStates = controls.map(control => control.disabled);
  controls.forEach(control => { control.disabled = true; });
  note.textContent = formCopy('Sending…', 'Enviando…');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(sendEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
      signal: controller.signal,
      body: JSON.stringify({ ...payload, _replyto: payload.email, _template: 'table', _honey: '', _url: window.location.origin + window.location.pathname })
    });
    const data = await response.json();
    if (/activat|confirm.*email|verify.*email/i.test(String(data.message || ''))) {
      note.textContent = formCopy('Email delivery is awaiting activation. Please use an email link on this page for now.', 'El envío de correo está pendiente de activación. Por ahora, utiliza un enlace de correo de esta página.');
      return false;
    }
    if (!response.ok || !(data.success === true || data.success === 'true')) throw new Error('Submission rejected');
    note.textContent = formCopy('Message submitted. We’ll reply by email.', 'Mensaje enviado. Te responderemos por correo.');
    return true;
  } catch {
    note.textContent = formCopy('We couldn’t confirm the submission. Your details have been kept. Try again or use an email link on this page; retrying may send a duplicate.', 'No hemos podido confirmar el envío. Tus datos se han conservado. Inténtalo de nuevo o utiliza un enlace de correo de esta página; un nuevo intento podría duplicar el mensaje.');
    return false;
  } finally {
    clearTimeout(timeout);
    controls.forEach((control, index) => { control.disabled = disabledStates[index]; });
    delete form.dataset.sending;
    form.removeAttribute('aria-busy');
  }
}

document.getElementById('brief-form')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const note = document.getElementById('form-note');
  const name = document.getElementById('project-name').value.trim();
  const email = document.getElementById('project-email').value.trim();
  const message = document.getElementById('project-message').value.trim();
  const kind = document.getElementById('project-kind').value;
  if (!name || !message) {
    note.textContent = formCopy('Please enter your name and a message.', 'Introduce tu nombre y un mensaje.');
    document.getElementById(!name ? 'project-name' : 'project-message').focus();
    return;
  }
  if (await sendContactForm(form, note, { name, email, message, topic: kind, language: locale, _subject: t('Cachai project enquiry — ') + kind })) form.reset();
});

const meetingDialog = document.getElementById('meeting-dialog');
if (meetingDialog) {
  const openButton = document.getElementById('open-meeting');
  const form = document.getElementById('meeting-form');
  const result = document.getElementById('meeting-result');
  const days = document.getElementById('calendar-days');
  const time = document.getElementById('meeting-time');
  const note = document.getElementById('meeting-note');
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateLabel = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });
  let month = new Date();
  month = new Date(month.getFullYear(), month.getMonth(), 1);
  let selected;
  document.getElementById('meeting-timezone').textContent = locale === "es" ? `Las horas se muestran en tu zona horaria: ${zone}. Elige la hora que prefieras; confirmaremos la disponibilidad por correo.` : `Times are in your timezone: ${zone}. Choose a preferred time; availability is confirmed by email.`;
  function renderCalendar() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    document.getElementById('calendar-month').textContent = month.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    document.getElementById('previous-month').disabled = month <= new Date(today.getFullYear(), today.getMonth(), 1);
    days.replaceChildren();
    const offset = (month.getDay() + 6) % 7;
    for (let i = 0; i < offset; i++) days.append(document.createElement('span'));
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= count; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = day;
      button.disabled = date < today;
      button.setAttribute('aria-label', dateLabel.format(date));
      button.setAttribute('aria-pressed', String(selected?.getTime() === date.getTime()));
      if (date.getTime() === today.getTime()) button.setAttribute('aria-current', 'date');
      button.addEventListener('click', () => {
        selected = date;
        time.disabled = false;
        time.setCustomValidity('');
        document.getElementById('meeting-submit').disabled = false;
        document.getElementById('selected-date').textContent = dateLabel.format(date);
        renderCalendar();
        days.querySelector('[aria-pressed="true"]').focus();
      });
      days.append(button);
    }
  }
  openButton.addEventListener('click', () => {
    renderCalendar();
    meetingDialog.showModal();
  });
  meetingDialog.querySelector('.meeting-close').addEventListener('click', () => meetingDialog.close());
  meetingDialog.addEventListener('close', () => openButton.focus());
  meetingDialog.addEventListener('click', event => {
    const box = meetingDialog.getBoundingClientRect();
    if (event.target === meetingDialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) meetingDialog.close();
  });
  for (const [id, increment] of [['previous-month', -1], ['next-month', 1]]) {
    document.getElementById(id).addEventListener('click', () => {
      month = new Date(month.getFullYear(), month.getMonth() + increment, 1);
      renderCalendar();
    });
  }
  time.addEventListener('input', () => time.setCustomValidity(''));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!selected) return;
    const [hours, minutes] = time.value.split(':').map(Number);
    const start = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), hours, minutes);
    if (start <= new Date()) {
      time.setCustomValidity(t('Choose a time in the future.'));
      time.reportValidity();
      return;
    }
    const end = new Date(start.getTime() + 20 * 60 * 1000);
    const name = document.getElementById('meeting-name').value.trim();
    if (!name) {
      note.textContent = t('Please enter your name.');
      document.getElementById('meeting-name').focus();
      return;
    }
    const formatTime = date => date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    const summary = `${dateLabel.format(start)} · ${formatTime(start)} – ${formatTime(end)} (${zone}) · ${locale === "es" ? "20 minutos" : "20 minutes"}`;
    const sent = await sendContactForm(form, note, {
      name,
      email: document.getElementById('meeting-email').value.trim(),
      message: document.getElementById('meeting-message').value.trim(),
      preferred_time: summary,
      utc_start: start.toISOString(),
      timezone: zone,
      language: locale,
      _subject: t('20-minute meeting request — ') + name
    });
    if (!sent) return;
    document.getElementById('meeting-summary').textContent = summary;
    form.hidden = true;
    result.hidden = false;
    document.getElementById('meeting-result-title').focus();
  });
  document.getElementById('edit-meeting').addEventListener('click', () => {
    result.hidden = true;
    form.hidden = false;
    note.textContent = '';
    renderCalendar();
    time.focus();
  });
}
