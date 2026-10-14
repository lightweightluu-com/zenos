const TZ = 'Europe/Zurich';

// Wochentag (Montag = 0) und Minuten seit Mitternacht in Schweizer Zeit.
function zurichNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now);
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday'));
  return { day, minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
}
const toMin = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

export function getStatus(hours, now = new Date()) {
  const { day, minutes } = zurichNow(now);
  const today = hours[day];
  if (today.open && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { today: day, isOpen: true, text: `Jetzt geöffnet · bis ${today.close} Uhr` };
  }
  if (today.open && minutes < toMin(today.open)) {
    return { today: day, isOpen: false, text: `Geschlossen · öffnet heute um ${today.open} Uhr` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = hours[(day + i) % 7];
    if (d.open) return { today: day, isOpen: false, text: `Geschlossen · öffnet ${i === 1 ? 'morgen' : d.day} um ${d.open} Uhr` };
  }
  return { today: day, isOpen: false, text: 'Geschlossen' };
}
