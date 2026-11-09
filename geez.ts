const GE_EZ: Record<number, string> = {
  1:'፩',2:'፪',3:'፫',4:'፬',5:'፭',6:'፮',7:'፯',8:'፰',9:'፱',
  10:'፲',20:'፳',30:'፴',40:'፵',50:'፶',60:'፷',70:'፸',80:'፹',90:'፺',100:'፻',10000:'፼'
};
export function toGeez(value: number | string): string {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n <= 0) return n === 0 ? '0' : '';
  if (n < 10) return GE_EZ[n];
  if (n < 100) return (Math.floor(n/10) > 1 ? GE_EZ[Math.floor(n/10)*10] : '፲') + (n%10 ? GE_EZ[n%10] : '');
  if (n === 100) return '፻';
  if (n < 1000) return (Math.floor(n/100) > 1 ? GE_EZ[Math.floor(n/100)] : '') + '፻' + (n%100 ? toGeez(n%100) : '');
  if (n < 10000) return toGeez(Math.floor(n/100)) + '፻' + (n%100 ? toGeez(n%100) : '');
  return toGeez(Math.floor(n/10000)) + '፼' + (n%10000 ? toGeez(n%10000) : '');
}
export function normalizeGeezDigits(s: string): string {
  const map: Record<string,string> = {'0':'0','1':'፩','2':'፪','3':'፫','4':'፬','5':'፭','6':'፮','7':'፯','8':'፰','9':'፱'};
  return s.replace(/[0-9]/g, d => map[d]);
}
export function geezToArabic(s: string): number | null {
  const vals: Record<string,number> = {'፩':1,'፪':2,'፫':3,'፬':4,'፭':5,'፮':6,'፯':7,'፰':8,'፱':9,'፲':10,'፳':20,'፴':30,'፵':40,'፶':50,'፷':60,'፸':70,'፹':80,'፺':90,'፻':100,'፼':10000};
  if (/^[0-9]+$/.test(s)) return Number(s);
  let total=0, section=0, pending=0;
  for (const c of s) {
    if (vals[c] == null) return null;
    const v=vals[c];
    if (v===100 || v===10000) { section += (pending || 1)*v; pending=0; }
    else pending += v;
  }
  total=section+pending;
  return total || null;
}