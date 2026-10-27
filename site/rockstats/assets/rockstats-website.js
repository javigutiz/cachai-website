// Product claims checked on 2026-10-05, before the split into DanteCpp/rockstats-app and DanteCpp/rockstats-watch.
// These are illustrative sessions, not a running recorder or real user data.
const language = document.documentElement.lang;
const isEs = language === 'es';
const isIt = language === 'it';
const assetPrefix = isEs || isIt ? '../' : '';
const sessionsEn = {
  rock: {title:'A day at Margalef.',label:'Rock climbing',icon:'assets/rock-climbing/rockstats-rock-climbing-mark.png',color:'#F2B493',meta:'SAMPLE SESSION · FRENCH',one:'6b+',two:'7/12',oneLabel:'Hardest send',twoLabel:'Routes sent',grades:['6c','6b+','6b','6a'],scale:'French',status:'Rock climbing',heading:"Every send counts.",description:"Keep your sends, attempts and route notes together. Approach logging is optional.",note:'12 routes. Every go in the story.'},
  boulder: {title:'One more go.',label:'Boulder',icon:'assets/boulder.svg',color:'#D8CAEB',meta:'SAMPLE SESSION · BOULDER',one:'6B+',two:'7/12',oneLabel:'Hardest send',twoLabel:'Goes sent',grades:['6C','6B+','6B','6A'],scale:'Font',status:'Boulder',heading:"One more go.",description:"Your problems, attempts and rests, all in one session. Approach logging is optional.",note:'12 goes. Room for every attempt.'},
  training: {title:'The work between.',label:'Climbing training',icon:'assets/climbing-training.svg',color:'#C9D7AE',meta:'SAMPLE SESSION · CLIMBING INDOOR',one:'06',two:'42 min',oneLabel:'Sets recorded',twoLabel:'Session duration',grades:[],scale:'',status:'Indoor sets',heading:"Make training count.",description:"Keep track of your training sessions and the work between climbing days.",note:'Indoor sets and rests.'},
  multipitch: {title:'Pared d’Aragó.',label:'Multipitch',icon:'assets/multipitch.svg',color:'#B8D5E5',meta:'SAMPLE SESSION · FRENCH',one:'6b',two:'5/5',oneLabel:'Hardest pitch',twoLabel:'Pitches sent',grades:['6b','6a+','6a','5c'],scale:'French',status:'Multipitch',heading:"Pitch by pitch.",description:"Look back at the grades, rests and duration of your climb.",note:'5 pitches. Room for every stance.'}
};
const sessionsEs = {
  rock: {title:'Un día en Margalef.',label:'Escalada en roca',icon:'assets/rock-climbing/rockstats-rock-climbing-mark.png',color:'#F2B493',meta:'SESIÓN DE EJEMPLO · FRANCESA',one:'6b+',two:'7/12',oneLabel:'Mejor encadene',twoLabel:'Vías encadenadas',grades:['6c','6b+','6b','6a'],scale:'Francesa',status:'Escalada en roca',heading:"Cada encadene cuenta.",description:"Reúne tus encadenes, intentos y notas de las vías. El registro de la aproximación es opcional.",note:'12 vías. Cada intento en la historia.'},
  boulder: {title:'Un pegue más.',label:'Búlder',icon:'assets/boulder.svg',color:'#D8CAEB',meta:'SESIÓN DE EJEMPLO · BÚLDER',one:'6B+',two:'7/12',oneLabel:'Mejor encadene',twoLabel:'Bloques encadenados',grades:['6C','6B+','6B','6A'],scale:'Font',status:'Búlder',heading:"Un pegue más.",description:"Tus bloques, pegues y descansos, en una misma sesión. El registro de la aproximación es opcional.",note:'12 intentos. Espacio para cada pegue.'},
  training: {title:'El trabajo entre salidas.',label:'Entrenamiento',icon:'assets/climbing-training.svg',color:'#C9D7AE',meta:'SESIÓN DE EJEMPLO · CLIMBING INDOOR',one:'06',two:'42 min',oneLabel:'Series registradas',twoLabel:'Duración de la sesión',grades:[],scale:'',status:'Series indoor',heading:"Cada entrenamiento suma.",description:"Lleva el control de tus entrenamientos y del trabajo entre salidas.",note:'Series y descansos indoor.'},
  multipitch: {title:'Pared d’Aragó.',label:'Vías de varios largos',icon:'assets/multipitch.svg',color:'#B8D5E5',meta:'SESIÓN DE EJEMPLO · FRANCESA',one:'6b',two:'5/5',oneLabel:'Largo más duro',twoLabel:'Largos encadenados',grades:['6b','6a+','6a','5c'],scale:'Francesa',status:'Vías de varios largos',heading:"Largo a largo.",description:"Repasa los grados, los descansos y la duración de tu escalada.",note:'5 largos. Espacio para cada reunión.'}
};
const sessionsIt = {
  rock: {...sessionsEn.rock, title:'Una giornata a Margalef.', label:'Arrampicata su roccia', meta:'SESSIONE DI ESEMPIO · FRANCESE', oneLabel:'Grado massimo chiuso', twoLabel:'Vie chiuse', scale:'francese', status:'Arrampicata su roccia', heading:"Ogni via chiusa conta.", description:"Riunisci le vie chiuse, i tentativi e le note sulle vie. La registrazione dell’avvicinamento è facoltativa.", note:'12 vie. Ogni tentativo fa parte della storia.'},
  boulder: {...sessionsEn.boulder, title:'Un altro tentativo.', label:'Boulder', meta:'SESSIONE DI ESEMPIO · BOULDER', oneLabel:'Grado massimo chiuso', twoLabel:'Blocchi chiusi', scale:'Font', status:'Boulder', heading:"Un altro tentativo.", description:"Blocchi, tentativi e recuperi, tutti nella stessa sessione. La registrazione dell’avvicinamento è facoltativa.", note:'12 tentativi. Spazio per ogni prova.'},
  training: {...sessionsEn.training, title:'Il lavoro tra le uscite.', label:'Allenamento', meta:'SESSIONE DI ESEMPIO · CLIMBING INDOOR', oneLabel:'Serie registrate', twoLabel:'Durata della sessione', status:'Serie indoor', heading:"Ogni allenamento conta.", description:"Tieni traccia dei tuoi allenamenti e del lavoro tra le uscite.", note:'Serie e recuperi indoor.'},
  multipitch: {...sessionsEn.multipitch, label:'Vie a più tiri', meta:'SESSIONE DI ESEMPIO · FRANCESE', oneLabel:'Tiro più difficile', twoLabel:'Tiri chiusi', scale:'francese', status:'Vie a più tiri', heading:"Tiro per tiro.", description:"Rivedi i gradi, le soste e la durata della tua salita.", note:'5 tiri. Spazio per ogni sosta.'}
};
const sessions = isIt ? sessionsIt : isEs ? sessionsEs : sessionsEn;
const watchCaptures = {
  rock: {file:'rock-climbing',title:'Rock Climbing'},
  boulder: {file:'bouldering',title:'Bouldering'},
  training: {file:'climbing-training',title:'Climbing Training'},
  multipitch: {file:'multipitch',title:'Multipitch'}
};
const dashboardCopy = isIt ? {
 hardest:'Grado massimo chiuso',rate:'Tasso di riuscita',sessions:'Sessioni',wall:'In parete',pyramid:'Piramide dei gradi',sent:'Chiuso',attempted:'Tentato',progress:'Grado massimo per sessione',recent:'Sessioni recenti',last:'Ultima: 24 ott',outcomes:(s,t)=>`${s} su ${t} salite`,training:'Tempo di allenamento',work:'Lavoro',rest:'Recupero',duration:'Durata delle sessioni',sets:'Serie registrate',total:'Tempo totale',recovery:'Recupero',minutes:'Minuti'
} : isEs ? {
 hardest:'Mejor encadene',rate:'Tasa de encadene',sessions:'Sesiones',wall:'En la pared',pyramid:'Pirámide de grados',sent:'Encadenado',attempted:'Intentado',progress:'Mejor encadene por sesión',recent:'Sesiones recientes',last:'Última: 24 oct',outcomes:(s,t)=>`${s} de ${t} escaladas`,training:'Tiempo de entrenamiento',work:'Trabajo',rest:'Descanso',duration:'Duración de las sesiones',sets:'Series registradas',total:'Tiempo total',recovery:'Descanso',minutes:'Minutos'
} : {
 hardest:'Hardest send',rate:'Send rate',sessions:'Sessions',wall:'On the wall',pyramid:'Grade pyramid',sent:'Sent',attempted:'Attempted',progress:'Hardest send per session',recent:'Recent sessions',last:'Last: 24 Oct',outcomes:(s,t)=>`${s} of ${t} climbs`,training:'Training time',work:'Work',rest:'Rest',duration:'Session duration',sets:'Sets recorded',total:'Total time',recovery:'Rest time',minutes:'Minutes'
};
const dashboards={
 rock:{grades:['7a+','7a','6c+','6c','6b+','6b','6a+','6a'],sent:[0,0,0,7,16,30,26,19],attempts:[1,2,3,5,7,3,0,2],sessions:24,time:'18h 42m',trend:[1,2,1,2,3,2,3,3,2,4,3,4]},
 boulder:{grades:['7B','7A+','7A','6C+','6C','6B+','6B','6A+'],sent:[0,0,0,7,12,18,23,14],attempts:[2,3,5,6,5,4,2,1],sessions:18,time:'12h 24m',trend:[1,2,2,1,3,2,3,2,4,3,4,4]},
 multipitch:{grades:['7a','6c+','6b+','6b','6a+','6a','5c','5b'],sent:[0,0,2,3,5,8,7,4],attempts:[1,2,1,1,1,0,0,0],sessions:8,time:'22h 18m',trend:[1,2,1,3,2,3,4,5]},
 training:{grades:['24 Oct','22 Oct','19 Oct','17 Oct','14 Oct','12 Oct','9 Oct','7 Oct'],sent:[24,28,20,32,25,30,22,26],attempts:[18,16,15,20,17,18,16,18],sessions:8,time:'5h 45m',trend:[44,38,48,42,52,35,44,42]}
};
let activeActivity='rock';
let pyramidChart,trendChart;
// Use a real canvas chart rather than an image, so the preview remains readable and interactive.
const totalsPlugin={id:'totals',afterDatasetsDraw(chart){
 const {ctx}=chart;ctx.save();ctx.font='10px Arial';ctx.fillStyle=getComputedStyle(document.getElementById('phone')).getPropertyValue('--dashboard-muted').trim();
 chart.data.labels.forEach((_,i)=>{const total=chart.data.datasets.reduce((sum,d)=>sum+d.data[i],0);const bar=chart.getDatasetMeta(1).data[i];ctx.fillText(String(total),bar.x+6,bar.y+3);});ctx.restore();
}};
function renderDashboard(key){
 activeActivity=key;
 const d=dashboards[key],c=dashboardCopy,training=key==='training';
 const sent=d.sent.reduce((a,b)=>a+b,0),attempted=d.attempts.reduce((a,b)=>a+b,0),total=sent+attempted;
 const labels=training?[c.sets,c.total,c.sessions,c.recovery]:[c.hardest,c.rate,c.sessions,c.wall];
 const values=training?['48',d.time,String(d.sessions),'2h 18m']:[d.grades[d.sent.findIndex(n=>n>0)],Math.round(sent/total*100)+'%',String(d.sessions),d.time];
 const notes=training?['','',c.last,'']:['',c.outcomes(sent,total),c.last,''];
 labels.forEach((label,i)=>{document.getElementById('metric-label-'+i).textContent=label;document.getElementById('metric-value-'+i).textContent=values[i];document.getElementById('metric-note-'+i).textContent=notes[i];});
 const text={'dashboard-chart-title':training?c.training:c.pyramid,'dashboard-sent-label':training?c.work:c.sent,'dashboard-attempt-label':training?c.rest:c.attempted,'dashboard-progress-title':training?c.duration:c.progress,'dashboard-progress-note':c.recent};
 Object.entries(text).forEach(([id,value])=>document.getElementById(id).textContent=value);
 const style=getComputedStyle(document.getElementById('phone'));
 const color=name=>style.getPropertyValue('--dashboard-'+name).trim();
 const teal=color('teal'),purple=color('purple'),muted=color('muted'),border=color('border');
 const hatch=document.createElement('canvas');hatch.width=7;hatch.height=7;const h=hatch.getContext('2d');h.fillStyle=purple;h.fillRect(0,0,7,7);h.strokeStyle='rgba(0,0,0,.24)';h.lineWidth=1;h.beginPath();h.moveTo(-1,0);h.lineTo(7,8);h.moveTo(5,0);h.lineTo(12,7);h.stroke();
 const ctx=document.getElementById('dashboard-pyramid').getContext('2d');
 const pattern=ctx.createPattern(hatch,'repeat');
 if(pyramidChart)pyramidChart.destroy();if(trendChart)trendChart.destroy();
 const max=Math.max(...d.sent.map((n,i)=>n+d.attempts[i]));
 pyramidChart=new Chart(ctx,{type:'bar',data:{labels:d.grades,datasets:[{label:training?c.work:c.sent,data:d.sent,backgroundColor:teal,barThickness:16},{label:training?c.rest:c.attempted,data:d.attempts,backgroundColor:pattern,barThickness:16,borderRadius:{topRight:3,bottomRight:3}}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,animation:false,events:[],layout:{padding:{right:22}},plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{x:{stacked:true,display:false,max:max*1.05},y:{stacked:true,border:{display:false},grid:{display:false},ticks:{color:muted,font:{family:'Arial',size:10},padding:7}}}},plugins:[totalsPlugin]});
 const ascending=[...d.grades].reverse();
 trendChart=new Chart(document.getElementById('dashboard-trend'),{type:'line',data:{labels:d.trend.map((_,i)=>String(i+1)),datasets:[{label:training?c.minutes:c.hardest,data:d.trend,borderColor:teal,borderWidth:2,pointRadius:0,pointHitRadius:9,tension:0}]},options:{responsive:true,maintainAspectRatio:false,animation:false,events:[],plugins:{legend:{display:false},tooltip:{callbacks:{label:item=>training?item.raw+' min':ascending[item.raw]}}},scales:{x:{display:false},y:{min:training?20:0,max:training?60:Math.max(...d.trend),border:{display:false},grid:{color:border},ticks:{stepSize:training?20:2,color:muted,font:{family:'Arial',size:10},callback:value=>training?value:ascending[value]}}}}});
 document.getElementById('dashboard-pyramid').setAttribute('aria-label',(training?c.training:c.pyramid)+': '+d.grades.map((g,i)=>`${g}: ${d.sent[i]} ${training?c.work:c.sent}, ${d.attempts[i]} ${training?c.rest:c.attempted}`).join('; '));
 document.getElementById('dashboard-trend').setAttribute('aria-label',(training?c.duration:c.progress)+': '+d.trend.map(n=>training?n+' min':ascending[n]).join(', '));
}

function selectActivity(key, announce = true) {
  const data = sessions[key];
  if (!data) return;
  const values = {'preview-status':data.status,'preview-heading':data.heading,'preview-description':data.description};
  for(const [id,value] of Object.entries(values)) document.getElementById(id).textContent=value;
  renderDashboard(key);
  const capture=watchCaptures[key];
  const watch=document.getElementById('watch-image');
  watch.src=assetPrefix+'assets/garmin/rockstats-fenix7-'+capture.file+'-409x560-v1.png';
  watch.alt=isIt ? ('Garmin fēnix 7 argentato con la schermata iniziale di '+capture.title) : isEs ? ('Garmin fēnix 7 plateado con la pantalla de inicio de '+capture.title) : ('Silver Garmin fēnix 7 showing the '+capture.title+' start screen');
  document.querySelectorAll('[data-activity]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.activity===key)));
  if(announce) document.getElementById('preview-announcement').textContent=isIt ? ('Esempio selezionato: '+data.label+'. '+data.status) : isEs ? ('Ejemplo seleccionado: '+data.label+'. '+data.status) : (data.label+' sample selected. '+data.status);
}
document.querySelectorAll('[data-activity]').forEach(button=>button.addEventListener('click',()=>selectActivity(button.dataset.activity)));
document.querySelectorAll('[data-preview-link]').forEach(link=>link.addEventListener('click',()=>selectActivity(link.dataset.previewLink)));
document.getElementById('theme-toggle').addEventListener('click',event=>{
  const phone=document.getElementById('phone');
  const dark=phone.dataset.theme!=='dark';
  phone.dataset.theme=dark?'dark':'light';
  renderDashboard(activeActivity);
  event.currentTarget.setAttribute('aria-pressed',String(dark));
  event.currentTarget.textContent=isIt ? (dark?'Anteprima chiara del telefono ◐':'Anteprima scura del telefono ◐') : isEs ? (dark?'Vista clara del móvil ◐':'Vista oscura del móvil ◐') : (dark?'Light phone preview ◐':'Dark phone preview ◐');
});
selectActivity('rock',false);
