// const API_BASE = 'http://localhost:5000/api';
const API_BASE = 'https://maktaba-back.onrender.com/api';

let authToken = localStorage.getItem('maktaba_token');

export function setAuthToken(token) {
  authToken = token;
}

export function removeAuthToken() {
  authToken = null;
}

export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data = {};
  try {
    data = await response.json();
  } catch (e) {
    // Empty body
  }

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

// Taxonomy data
export const UNIVERSITIES = [
  { key: 'algiers1', ar: 'جامعة الجزائر 1', en: 'University of Algiers 1', region: { ar: 'الجزائر', en: 'Algiers' } },
  { key: 'algiers2', ar: 'جامعة الجزائر 2', en: 'University of Algiers 2', region: { ar: 'الجزائر', en: 'Algiers' } },
  { key: 'algiers3', ar: 'جامعة الجزائر 3', en: 'University of Algiers 3', region: { ar: 'الجزائر', en: 'Algiers' } },
  { key: 'usthb', ar: 'جامعة هواري بومدين للعلوم والتكنولوجيا', en: 'USTHB - Houari Boumediene', region: { ar: 'الجزائر', en: 'Algiers' } },
  { key: 'constantine1', ar: 'جامعة منتوري قسنطينة', en: 'University of Constantine 1', region: { ar: 'قسنطينة', en: 'Constantine' } },
  { key: 'oran1', ar: 'جامعة وهران 1', en: 'University of Oran 1', region: { ar: 'وهران', en: 'Oran' } },
  { key: 'oran2', ar: 'جامعة وهران 2', en: 'University of Oran 2', region: { ar: 'وهران', en: 'Oran' } },
  { key: 'setif1', ar: 'جامعة سطيف 1', en: 'University of Setif 1', region: { ar: 'سطيف', en: 'Setif' } },
  { key: 'setif2', ar: 'جامعة سطيف 2', en: 'University of Setif 2', region: { ar: 'سطيف', en: 'Setif' } },
  { key: 'batna', ar: 'جامعة باتنة', en: 'University of Batna', region: { ar: 'باتنة', en: 'Batna' } },
  { key: 'annaba', ar: 'جامعة عنابة', en: 'University of Annaba', region: { ar: 'عنابة', en: 'Annaba' } },
  { key: 'tlemcen', ar: 'جامعة تلمسان', en: 'University of Tlemcen', region: { ar: 'تلمسان', en: 'Tlemcen' } },
  { key: 'biskra', ar: 'جامعة بسكرة', en: 'University of Biskra', region: { ar: 'بسكرة', en: 'Biskra' } },
  { key: 'tiziouzou', ar: 'جامعة تيزي وزو', en: 'University of Tizi Ouzou', region: { ar: 'تيزي وزو', en: 'Tizi Ouzou' } },
  { key: 'bejaia', ar: 'جامعة بجاية', en: 'University of Bejaia', region: { ar: 'بجاية', en: 'Bejaia' } },
  { key: 'skikda', ar: 'جامعة سكيكدة', en: 'University of Skikda', region: { ar: 'سكيكدة', en: 'Skikda' } },
  { key: 'oeb', ar: 'جامعة أم البواقي', en: 'University of Oum El Bouaghi', region: { ar: 'أم البواقي', en: 'Oum El Bouaghi' } },
  { key: 'khenchela', ar: 'جامعة خنشلة', en: 'University of Khenchela', region: { ar: 'خنشلة', en: 'Khenchela' } },
  { key: 'jijel', ar: 'جامعة جيجل', en: 'University of Jijel', region: { ar: 'جيجل', en: 'Jijel' } },
  { key: 'saida', ar: 'جامعة سعيدة', en: 'University of Saida', region: { ar: 'سعيدة', en: 'Saida' } },
  { key: 'ghardaia', ar: 'جامعة غرداية', en: 'University of Ghardaia', region: { ar: 'غرداية', en: 'Ghardaia' } },
  { key: 'tiaret', ar: 'جامعة تيارت', en: 'University of Tiaret', region: { ar: 'تيارت', en: 'Tiaret' } },
  { key: 'polytech', ar: 'المدرسة الوطنية المتعددة التقنيات', en: 'National Polytechnic School', region: { ar: 'الجزائر', en: 'Algiers' } },
  { key: 'blida', ar: 'جامعة البليدة', en: 'University of Blida', region: { ar: 'البليدة', en: 'Blida' } },
  { key: 'medea', ar: 'جامعة المدية', en: 'University of Medea', region: { ar: 'المدية', en: 'Medea' } },
  { key: 'aintemouchent', ar: 'جامعة عين تموشنت', en: 'University of Ain Temouchent', region: { ar: 'عين تموشنت', en: 'Ain Temouchent' } }
];

export const MAJORS = [
  { key: 'medicine', ar: 'طب', en: 'Medicine' },
  { key: 'pharmacy', ar: 'صيدلة', en: 'Pharmacy' },
  { key: 'dentistry', ar: 'طب أسنان', en: 'Dentistry' },
  { key: 'medsci', ar: 'علوم طبية', en: 'Medical Sciences' },
  { key: 'civileng', ar: 'هندسة مدنية', en: 'Civil Engineering' },
  { key: 'mecheng', ar: 'هندسة ميكانيكية', en: 'Mechanical Engineering' },
  { key: 'eleceng', ar: 'هندسة كهربائية', en: 'Electrical Engineering' },
  { key: 'energyeng', ar: 'هندسة طاقة', en: 'Energy Engineering' },
  { key: 'cs', ar: 'علم الحاسوب', en: 'Computer Science' },
  { key: 'math', ar: 'رياضيات', en: 'Mathematics' },
  { key: 'physics', ar: 'فيزياء', en: 'Physics' },
  { key: 'chem', ar: 'كيمياء', en: 'Chemistry' },
  { key: 'matsci', ar: 'علوم المادة', en: 'Materials Science' },
  { key: 'econ', ar: 'اقتصاد', en: 'Economics' },
  { key: 'business', ar: 'علوم تجارية', en: 'Business Studies' },
  { key: 'finance', ar: 'علوم مالية', en: 'Finance' },
  { key: 'econsci', ar: 'علوم اقتصادية', en: 'Economic Sciences' },
  { key: 'law', ar: 'قانون', en: 'Law' },
  { key: 'polsci', ar: 'علوم سياسية', en: 'Political Science' },
  { key: 'pubadmin', ar: 'علوم إدارية', en: 'Public Administration' },
  { key: 'forlang', ar: 'لغات أجنبية', en: 'Foreign Languages' },
  { key: 'arabiclit', ar: 'آداب عربية', en: 'Arabic Literature' },
  { key: 'islamic', ar: 'علوم إسلامية', en: 'Islamic Studies' },
  { key: 'philosophy', ar: 'فلسفة', en: 'Philosophy' },
  { key: 'softeng', ar: 'إعلام آلي', en: 'Software Engineering' },
  { key: 'automation', ar: 'تحكم آلي', en: 'Automation' },
  { key: 'telecom', ar: 'اتصالات', en: 'Telecommunications' }
];

export const CONDITIONS = [
  { key: 'new', ar: 'جديد', en: 'New' },
  { key: 'likenew', ar: 'مثل الجديد', en: 'Like new' },
  { key: 'verygood', ar: 'جيد جدا', en: 'Very good' },
  { key: 'good', ar: 'جيد', en: 'Good' },
  { key: 'acceptable', ar: 'مقبول', en: 'Acceptable' },
  { key: 'worn', ar: 'ضعيف', en: 'Worn' }
];

export const EXCHANGE_TYPES = [
  { key: 'sell', ar: 'بيع', en: 'Sell', icon: 'fa-tag', badge: 'sell' },
  { key: 'exchange', ar: 'مبادلة', en: 'Exchange', icon: 'fa-exchange-alt', badge: 'exchange' },
  { key: 'donate', ar: 'تبرع', en: 'Donate', icon: 'fa-hand-holding-heart', badge: 'exchange' },
  { key: 'free', ar: 'مجاني', en: 'Free', icon: 'fa-gift', badge: 'free' }
];

export const YEARS = [
  { key: 'y1', ar: 'السنة الأولى', en: '1st Year' },
  { key: 'y2', ar: 'السنة الثانية', en: '2nd Year' },
  { key: 'y3', ar: 'السنة الثالثة', en: '3rd Year' },
  { key: 'y4', ar: 'السنة الرابعة', en: '4th Year' }
];

export const CURRENCY = { ar: 'دج', en: 'DZD' };

// Helper functions
export function byKey(list, key) {
  return list.find(x => x.key === key);
}

export function label(item, lang) {
  return item ? item[lang] : '';
}

export function taxLabel(list, key, lang) {
  const item = byKey(list, key);
  return item ? item[lang] : key;
}

export function bookTitle(book, lang) {
  return lang === 'ar' ? (book.title_ar || book.title || '') : (book.title_en || book.title || '');
}

export function bookDesc(book, lang) {
  return lang === 'ar' ? (book.desc_ar || book.description || '') : (book.desc_en || book.description || '');
}

export function bookAuthor(book, lang) {
  return lang === 'ar' ? (book.author_ar || book.author || '') : (book.author_en || book.author || '');
}

export function bookOwner(book, lang) {
  return lang === 'ar' ? (book.owner_ar || book.owner || '') : (book.owner_en || book.owner || '');
}

export function bookCity(book, lang) {
  return lang === 'ar' ? (book.city_ar || book.city || '') : (book.city_en || book.city || '');
}

export function bookUniversity(book, lang) {
  return taxLabel(UNIVERSITIES, book.university_key, lang);
}

export function bookMajor(book, lang) {
  return taxLabel(MAJORS, book.major_key, lang);
}

export function bookYear(book, lang) {
  return taxLabel(YEARS, book.year_key, lang);
}

export function bookCondition(book, lang) {
  return taxLabel(CONDITIONS, book.condition_key, lang);
}

export function bookExchange(book) {
  return byKey(EXCHANGE_TYPES, book.exchange_key);
}

export function bookImages(book) {
  if (Array.isArray(book.images)) return book.images;
  if (typeof book.images === 'string') {
    try { return JSON.parse(book.images); } catch (e) { return []; }
  }
  return [];
}
