// Product claims checked on 2026-10-05, before the split into DanteCpp/rockstats-app and DanteCpp/rockstats-watch.
// These are illustrative sessions, not a running recorder or real user data.
const language = document.documentElement.lang;
const isEs = language === 'es';
const isIt = language === 'it';
const assetPrefix = isEs || isIt ? '../' : '';
const sessionsEn = {
  rock: {title:'A day at Margalef.',label:'Rock climbing',icon:'assets/rock-climbing/rockstats-rock-climbing-mark.png',color:'#F2B493',meta:'SAMPLE SESSION · FRENCH',one:'6b+',two:'7/12',oneLabel:'Hardest send',twoLabel:'Routes sent',grades:['6c','6b+','6b','6a'],scale:'French',status:'Rock climbing · sample session',heading:'Less on your wrist. More perspective.',description:'Record the grade, time and outcome on the wall. Return to the phone for route names, notes and patterns across sessions.',note:'12 routes. Every go in the story. Sample session.'},
  boulder: {title:'One more go.',label:'Boulder',icon:'assets/boulder.svg',color:'#D8CAEB',meta:'SAMPLE SESSION · FONT',one:'6B+',two:'7/12',oneLabel:'Hardest send',twoLabel:'Goes sent',grades:['6C','6B+','6B','6A'],scale:'Font',status:'Boulder · sample session',heading:'Small sequences. A bigger story.',description:'Start with the difficulty, then record problems and rests. Font and V grades give your bouldering sessions their own context, without the walking legs.',note:'12 goes. Room for every attempt. Sample session.'},
  training: {title:'The work between.',label:'Climbing training',icon:'assets/climbing-training.svg',color:'#C9D7AE',meta:'SAMPLE SESSION · CLIMBING INDOOR',one:'06',two:'42 min',oneLabel:'Sets recorded',twoLabel:'Session duration',grades:[],scale:'',status:'Indoor sets · sample session',heading:'Time on. Time off. All part of it.',description:'The Climbing Indoor activity records your sets and rests, without grades or GPS. Review session time and pulse on your phone. See how your training time builds across sessions.',note:'Indoor sets and rests. Sample session.'},
  multipitch: {title:'Pared d’Aragó.',label:'Multipitch',icon:'assets/multipitch.svg',color:'#B8D5E5',meta:'SAMPLE SESSION · FRENCH',one:'6b',two:'5/5',oneLabel:'Hardest pitch',twoLabel:'Pitches sent',grades:['6b','6a+','6a','5c'],scale:'French',status:'Multipitch · sample session',heading:'Pitch after pitch. Every stance recorded.',description:'Record pitch difficulty, stance rests, and transitions as you climb. Review each pitch time and grade on your phone alongside the full mountain profile.',note:'5 pitches. Room for every stance. Sample session.'}
};
const sessionsEs = {
  rock: {title:'Un día en Margalef.',label:'Escalada en roca',icon:'assets/rock-climbing/rockstats-rock-climbing-mark.png',color:'#F2B493',meta:'SESIÓN DE EJEMPLO · FRANCESA',one:'6b+',two:'7/12',oneLabel:'Mejor encadene',twoLabel:'Vías encadenadas',grades:['6c','6b+','6b','6a'],scale:'Francesa',status:'Escalada en roca · sesión de ejemplo',heading:'Menos en la muñeca. Más perspectiva.',description:'Registra el grado, el tiempo y el resultado en la pared. Vuelve al móvil para ver los nombres de las vías, las notas y la evolución entre sesiones.',note:'12 vías. Cada intento en la historia. Sesión de ejemplo.'},
  boulder: {title:'Un pegue más.',label:'Búlder',icon:'assets/boulder.svg',color:'#D8CAEB',meta:'SESIÓN DE EJEMPLO · FONT',one:'6B+',two:'7/12',oneLabel:'Mejor encadene',twoLabel:'Bloques encadenados',grades:['6C','6B+','6B','6A'],scale:'Font',status:'Búlder · sesión de ejemplo',heading:'Secuencias cortas. Una historia mayor.',description:'Empieza por la dificultad y registra bloques y descansos. Las escalas Font y V dan a tus sesiones de búlder su propio contexto, sin tramos de aproximación.',note:'12 intentos. Espacio para cada pegue. Sesión de ejemplo.'},
  training: {title:'El trabajo entre salidas.',label:'Entrenamiento',icon:'assets/climbing-training.svg',color:'#C9D7AE',meta:'SESIÓN DE EJEMPLO · CLIMBING INDOOR',one:'06',two:'42 min',oneLabel:'Series registradas',twoLabel:'Duración de la sesión',grades:[],scale:'',status:'Series indoor · sesión de ejemplo',heading:'Tiempo de trabajo. Tiempo de descanso. Todo suma.',description:'La actividad Climbing Indoor registra tus series y descansos, sin grados ni GPS. Revisa la duración y el pulso en el móvil y observa cómo se acumula tu entrenamiento.',note:'Series y descansos indoor. Sesión de ejemplo.'},
  multipitch: {title:'Pared d’Aragó.',label:'Vías de varios largos',icon:'assets/multipitch.svg',color:'#B8D5E5',meta:'SESIÓN DE EJEMPLO · FRANCESA',one:'6b',two:'5/5',oneLabel:'Largo más duro',twoLabel:'Largos encadenados',grades:['6b','6a+','6a','5c'],scale:'Francesa',status:'Vías de varios largos · sesión de ejemplo',heading:'Largo tras largo. Cada reunión registrada.',description:'Registra la dificultad de cada largo, los descansos en reunión y las transiciones mientras escalas. Revisa el tiempo y el grado de cada largo en el móvil junto al perfil completo.',note:'5 largos. Espacio para cada reunión. Sesión de ejemplo.'}
};
const sessionsIt = {
  rock: {...sessionsEn.rock, title:'Una giornata a Margalef.', label:'Arrampicata su roccia', meta:'SESSIONE DI ESEMPIO · FRANCESE', oneLabel:'Grado massimo chiuso', twoLabel:'Vie chiuse', scale:'francese', status:'Arrampicata su roccia · sessione di esempio', heading:'Meno al polso. Più prospettiva.', description:'Registra grado, tempo ed esito in parete. Ritrova sul telefono nomi delle vie, note e andamento delle sessioni.', note:'12 vie. Ogni tentativo fa parte della storia. Sessione di esempio.'},
  boulder: {...sessionsEn.boulder, title:'Un altro tentativo.', label:'Boulder', meta:'SESSIONE DI ESEMPIO · FONT', oneLabel:'Grado massimo chiuso', twoLabel:'Blocchi chiusi', scale:'Font', status:'Boulder · sessione di esempio', heading:'Sequenze brevi. Una storia più grande.', description:'Parti dalla difficoltà, poi registra blocchi e recuperi. I gradi Font e V danno alle tue sessioni di boulder il giusto contesto, senza tratti di avvicinamento.', note:'12 tentativi. Spazio per ogni prova. Sessione di esempio.'},
  training: {...sessionsEn.training, title:'Il lavoro tra le uscite.', label:'Allenamento', meta:'SESSIONE DI ESEMPIO · CLIMBING INDOOR', oneLabel:'Serie registrate', twoLabel:'Durata della sessione', status:'Serie indoor · sessione di esempio', heading:'Tempo di lavoro. Tempo di recupero. Tutto conta.', description:'L’attività Climbing Indoor registra serie e recuperi, senza gradi né GPS. Rivedi durata e frequenza cardiaca sul telefono e osserva come si accumula il tempo dedicato all’allenamento.', note:'Serie e recuperi indoor. Sessione di esempio.'},
  multipitch: {...sessionsEn.multipitch, label:'Vie a più tiri', meta:'SESSIONE DI ESEMPIO · FRANCESE', oneLabel:'Tiro più difficile', twoLabel:'Tiri chiusi', scale:'francese', status:'Vie a più tiri · sessione di esempio', heading:'Tiro dopo tiro. Ogni sosta registrata.', description:'Registra la difficoltà dei tiri, i recuperi in sosta e le transizioni mentre sali. Rivedi sul telefono tempi e gradi di ogni tiro insieme al profilo completo della montagna.', note:'5 tiri. Spazio per ogni sosta. Sessione di esempio.'}
};
const sessions = isIt ? sessionsIt : isEs ? sessionsEs : sessionsEn;
const watchCaptures = {
  rock: {file:'rock-climbing',title:'Rock Climbing'},
  boulder: {file:'bouldering',title:'Bouldering'},
  training: {file:'climbing-training',title:'Climbing Training'},
  multipitch: {file:'multipitch',title:'Multipitch'}
};
function selectActivity(key, announce = true) {
  const data = sessions[key];
  if (!data) return;
  const values = {'session-title':data.title,'activity-chip-label':data.label,'session-meta':data.meta,'stat-one':data.one,'stat-two':data.two,'stat-one-label':data.oneLabel,'stat-two-label':data.twoLabel,'preview-status':data.status,'preview-heading':data.heading,'preview-description':data.description,'phone-note':data.note};
  for(const [id,value] of Object.entries(values)) document.getElementById(id).textContent=value;
  const capture=watchCaptures[key];
  const watch=document.getElementById('watch-image');
  watch.src=assetPrefix+'assets/garmin/rockstats-fenix7-'+capture.file+'-409x560-v1.png';
  watch.alt=isIt ? ('Garmin fēnix 7 argentato con la schermata iniziale di '+capture.title) : isEs ? ('Garmin fēnix 7 plateado con la pantalla de inicio de '+capture.title) : ('Silver Garmin fēnix 7 showing the '+capture.title+' start screen');
  document.getElementById('watch-caption').textContent='Garmin fēnix 7 · '+data.label;
  document.querySelectorAll('[data-activity]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.activity===key)));
  const icon=document.getElementById('activity-preview-icon');
  if(data.icon) icon.src=assetPrefix+data.icon; else icon.removeAttribute('src');
  icon.style.visibility=data.icon?'visible':'hidden';
  document.getElementById('activity-chip').style.background=data.color;
  document.getElementById('phone').style.setProperty('--preview-activity',data.color);
  document.getElementById('climb-chart').hidden=key==='training';
  document.getElementById('training-preview').hidden=key!=='training';
  document.querySelectorAll('[data-grade]').forEach((el,i)=>el.textContent=data.grades[i]||'');
  if(data.grades.length) document.getElementById('pyramid').setAttribute('aria-label',isIt ? ('Gradi '+data.scale+': '+data.grades.map((grade,i)=>grade+', '+[0,1,2,4][i]+' chiusi e '+[2,1,1,1][i]+' tentati').join('; ')) : isEs ? ('Grados '+data.scale+': '+data.grades.map((grade,i)=>grade+', '+[0,1,2,4][i]+' encadenados y '+[2,1,1,1][i]+' intentados').join('; ')) : (data.scale+' grades: '+data.grades.map((grade,i)=>grade+', '+[0,1,2,4][i]+' sent and '+[2,1,1,1][i]+' attempted').join('; ')));
  if(announce) document.getElementById('preview-announcement').textContent=isIt ? ('Esempio selezionato: '+data.label+'. '+data.status) : isEs ? ('Ejemplo seleccionado: '+data.label+'. '+data.status) : (data.label+' sample selected. '+data.status);
}
document.querySelectorAll('[data-activity]').forEach(button=>button.addEventListener('click',()=>selectActivity(button.dataset.activity)));
document.querySelectorAll('[data-preview-link]').forEach(link=>link.addEventListener('click',()=>selectActivity(link.dataset.previewLink)));
document.getElementById('theme-toggle').addEventListener('click',event=>{
  const phone=document.getElementById('phone');
  const dark=phone.dataset.theme!=='dark';
  phone.dataset.theme=dark?'dark':'light';
  event.currentTarget.setAttribute('aria-pressed',String(dark));
  event.currentTarget.textContent=isIt ? (dark?'Anteprima chiara del telefono ◐':'Anteprima scura del telefono ◐') : isEs ? (dark?'Vista clara del móvil ◐':'Vista oscura del móvil ◐') : (dark?'Light phone preview ◐':'Dark phone preview ◐');
});
selectActivity('rock',false);
