// const API_BASE = 'http://localhost:5000/api' ;
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
// export const UNIVERSITIES = [
//   { key: 'algiers1', ar: 'جامعة الجزائر 1', en: 'University of Algiers 1', region: { ar: 'الجزائر', en: 'Algiers' } },
//   { key: 'algiers2', ar: 'جامعة الجزائر 2', en: 'University of Algiers 2', region: { ar: 'الجزائر', en: 'Algiers' } },
//   { key: 'algiers3', ar: 'جامعة الجزائر 3', en: 'University of Algiers 3', region: { ar: 'الجزائر', en: 'Algiers' } },
//   { key: 'usthb', ar: 'جامعة هواري بومدين للعلوم والتكنولوجيا', en: 'USTHB - Houari Boumediene', region: { ar: 'الجزائر', en: 'Algiers' } },
//   { key: 'constantine1', ar: 'جامعة منتوري قسنطينة', en: 'University of Constantine 1', region: { ar: 'قسنطينة', en: 'Constantine' } },
//   { key: 'oran1', ar: 'جامعة وهران 1', en: 'University of Oran 1', region: { ar: 'وهران', en: 'Oran' } },
//   { key: 'oran2', ar: 'جامعة وهران 2', en: 'University of Oran 2', region: { ar: 'وهران', en: 'Oran' } },
//   { key: 'setif1', ar: 'جامعة سطيف 1', en: 'University of Setif 1', region: { ar: 'سطيف', en: 'Setif' } },
//   { key: 'setif2', ar: 'جامعة سطيف 2', en: 'University of Setif 2', region: { ar: 'سطيف', en: 'Setif' } },
//   { key: 'batna', ar: 'جامعة باتنة', en: 'University of Batna', region: { ar: 'باتنة', en: 'Batna' } },
//   { key: 'annaba', ar: 'جامعة عنابة', en: 'University of Annaba', region: { ar: 'عنابة', en: 'Annaba' } },
//   { key: 'tlemcen', ar: 'جامعة تلمسان', en: 'University of Tlemcen', region: { ar: 'تلمسان', en: 'Tlemcen' } },
//   { key: 'biskra', ar: 'جامعة بسكرة', en: 'University of Biskra', region: { ar: 'بسكرة', en: 'Biskra' } },
//   { key: 'tiziouzou', ar: 'جامعة تيزي وزو', en: 'University of Tizi Ouzou', region: { ar: 'تيزي وزو', en: 'Tizi Ouzou' } },
//   { key: 'bejaia', ar: 'جامعة بجاية', en: 'University of Bejaia', region: { ar: 'بجاية', en: 'Bejaia' } },
//   { key: 'skikda', ar: 'جامعة سكيكدة', en: 'University of Skikda', region: { ar: 'سكيكدة', en: 'Skikda' } },
//   { key: 'oeb', ar: 'جامعة أم البواقي', en: 'University of Oum El Bouaghi', region: { ar: 'أم البواقي', en: 'Oum El Bouaghi' } },
//   { key: 'khenchela', ar: 'جامعة خنشلة', en: 'University of Khenchela', region: { ar: 'خنشلة', en: 'Khenchela' } },
//   { key: 'jijel', ar: 'جامعة جيجل', en: 'University of Jijel', region: { ar: 'جيجل', en: 'Jijel' } },
//   { key: 'saida', ar: 'جامعة سعيدة', en: 'University of Saida', region: { ar: 'سعيدة', en: 'Saida' } },
//   { key: 'ghardaia', ar: 'جامعة غرداية', en: 'University of Ghardaia', region: { ar: 'غرداية', en: 'Ghardaia' } },
//   { key: 'tiaret', ar: 'جامعة تيارت', en: 'University of Tiaret', region: { ar: 'تيارت', en: 'Tiaret' } },
//   { key: 'polytech', ar: 'المدرسة الوطنية المتعددة التقنيات', en: 'National Polytechnic School', region: { ar: 'الجزائر', en: 'Algiers' } },
//   { key: 'blida', ar: 'جامعة البليدة', en: 'University of Blida', region: { ar: 'البليدة', en: 'Blida' } },
//   { key: 'medea', ar: 'جامعة المدية', en: 'University of Medea', region: { ar: 'المدية', en: 'Medea' } },
//   { key: 'aintemouchent', ar: 'جامعة عين تموشنت', en: 'University of Ain Temouchent', region: { ar: 'عين تموشنت', en: 'Ain Temouchent' } }
// ];




export const UNIVERSITIES = [
  {
    key: 'adrar',
    ar: 'جامعة أحمد دراية أدرار',
    en: 'Ahmed Draia University of Adrar',
    region: { ar: 'أدرار', en: 'Adrar' }
  },
  {
    key: 'ain_temouchent',
    ar: 'جامعة بلحاج بوشعيب عين تموشنت',
    en: 'Belhadj Bouchaib University of Ain Temouchent',
    region: { ar: 'عين تموشنت', en: 'Ain Temouchent' }
  },
  {
    key: 'algiers1',
    ar: 'جامعة الجزائر 1 بن يوسف بن خدة',
    en: 'University of Algiers 1 Benyoucef Benkhedda',
    region: { ar: 'الجزائر', en: 'Algiers' }
  },
  {
    key: 'algiers2',
    ar: 'جامعة الجزائر 2 أبو القاسم سعد الله',
    en: 'University of Algiers 2 Abou El Kacem Saadallah',
    region: { ar: 'الجزائر', en: 'Algiers' }
  },
  {
    key: 'algiers3',
    ar: 'جامعة الجزائر 3 إبراهيم سلطان شيبوط',
    en: 'University of Algiers 3 Ibrahim Soltane Chaibout',
    region: { ar: 'الجزائر', en: 'Algiers' }
  },
  {
    key: 'annaba',
    ar: 'جامعة باجي مختار عنابة',
    en: 'Badji Mokhtar University of Annaba',
    region: { ar: 'عنابة', en: 'Annaba' }
  },
  {
    key: 'batna1',
    ar: 'جامعة باتنة 1 الحاج لخضر',
    en: 'University of Batna 1 Hadj Lakhdar',
    region: { ar: 'باتنة', en: 'Batna' }
  },
  {
    key: 'batna2',
    ar: 'جامعة باتنة 2 مصطفى بن بولعيد',
    en: 'University of Batna 2 Mostefa Ben Boulaid',
    region: { ar: 'باتنة', en: 'Batna' }
  },
  {
    key: 'bechar',
    ar: 'جامعة طاهري محمد بشار',
    en: 'Tahri Mohamed University of Bechar',
    region: { ar: 'بشار', en: 'Bechar' }
  },
  {
    key: 'bejaia',
    ar: 'جامعة عبد الرحمان ميرة بجاية',
    en: 'Abderrahmane Mira University of Bejaia',
    region: { ar: 'بجاية', en: 'Bejaia' }
  },
  {
    key: 'biskra',
    ar: 'جامعة محمد خيضر بسكرة',
    en: 'Mohamed Khider University of Biskra',
    region: { ar: 'بسكرة', en: 'Biskra' }
  },
  {
    key: 'blida1',
    ar: 'جامعة سعد دحلب البليدة 1',
    en: 'Saad Dahlab University of Blida 1',
    region: { ar: 'البليدة', en: 'Blida' }
  },
  {
    key: 'blida2',
    ar: 'جامعة لونيسي علي البليدة 2',
    en: 'Lounici Ali University of Blida 2',
    region: { ar: 'البليدة', en: 'Blida' }
  },
  {
    key: 'bordj_bou_arreridj',
    ar: 'جامعة محمد البشير الإبراهيمي برج بوعريريج',
    en: 'Mohamed El Bachir El Ibrahimi University of Bordj Bou Arreridj',
    region: { ar: 'برج بوعريريج', en: 'Bordj Bou Arreridj' }
  },
  {
    key: 'bouira',
    ar: 'جامعة أكلي محند أولحاج البويرة',
    en: 'Akli Mohand Oulhadj University of Bouira',
    region: { ar: 'البويرة', en: 'Bouira' }
  },
  {
    key: 'boumerdes',
    ar: 'جامعة أمحمد بوقرة بومرداس',
    en: 'M’Hamed Bougara University of Boumerdes',
    region: { ar: 'بومرداس', en: 'Boumerdes' }
  },
  {
    key: 'chlef',
    ar: 'جامعة حسيبة بن بوعلي بالشلف',
    en: 'Hassiba Benbouali University of Chlef',
    region: { ar: 'الشلف', en: 'Chlef' }
  },
  {
    key: 'constantine1',
    ar: 'جامعة الإخوة منتوري قسنطينة 1',
    en: 'University of Constantine 1 Brothers Mentouri',
    region: { ar: 'قسنطينة', en: 'Constantine' }
  },
  {
    key: 'constantine2',
    ar: 'جامعة عبد الحميد مهري قسنطينة 2',
    en: 'University of Constantine 2 Abdelhamid Mehri',
    region: { ar: 'قسنطينة', en: 'Constantine' }
  },
  {
    key: 'constantine3',
    ar: 'جامعة صالح بوبنيدر قسنطينة 3',
    en: 'University of Constantine 3 Salah Boubnider',
    region: { ar: 'قسنطينة', en: 'Constantine' }
  },
  {
    key: 'djelfa',
    ar: 'جامعة زيان عاشور بالجلفة',
    en: 'Ziane Achour University of Djelfa',
    region: { ar: 'الجلفة', en: 'Djelfa' }
  },
  {
    key: 'el_oued',
    ar: 'جامعة الشهيد حمه لخضر الوادي',
    en: 'Hamma Lakhdar University of El Oued',
    region: { ar: 'الوادي', en: 'El Oued' }
  },
  {
    key: 'el_tarf',
    ar: 'جامعة الشاذلي بن جديد الطارف',
    en: 'Chadli Bendjedid University of El Tarf',
    region: { ar: 'الطارف', en: 'El Tarf' }
  },
  {
    key: 'el_bayadh',
    ar: 'جامعة البيض',
    en: 'University of El Bayadh',
    region: { ar: 'البيض', en: 'El Bayadh' }
  },
  {
    key: 'ghardaia',
    ar: 'جامعة غرداية',
    en: 'University of Ghardaia',
    region: { ar: 'غرداية', en: 'Ghardaia' }
  },
  {
    key: 'guelma',
    ar: 'جامعة 8 ماي 1945 قالمة',
    en: '8 May 1945 University of Guelma',
    region: { ar: 'قالمة', en: 'Guelma' }
  },
  {
    key: 'jijel',
    ar: 'جامعة محمد الصديق بن يحيى جيجل',
    en: 'Mohamed Seddik Ben Yahia University of Jijel',
    region: { ar: 'جيجل', en: 'Jijel' }
  },
  {
    key: 'khenchela',
    ar: 'جامعة عباس لغرور خنشلة',
    en: 'Abbes Laghrour University of Khenchela',
    region: { ar: 'خنشلة', en: 'Khenchela' }
  },
  {
    key: 'khemis_miliana',
    ar: 'جامعة الجيلالي بونعامة خميس مليانة',
    en: 'Djilali Bounaama University of Khemis Miliana',
    region: { ar: 'عين الدفلى', en: 'Ain Defla' }
  },
  {
    key: 'laghouat',
    ar: 'جامعة عمار ثليجي الأغواط',
    en: 'Amar Telidji University of Laghouat',
    region: { ar: 'الأغواط', en: 'Laghouat' }
  },
  {
    key: 'mascara',
    ar: 'جامعة مصطفى اسطمبولي معسكر',
    en: 'Mustapha Stambouli University of Mascara',
    region: { ar: 'معسكر', en: 'Mascara' }
  },
  {
    key: 'medea',
    ar: 'جامعة يحيى فارس بالمدية',
    en: 'Yahia Fares University of Medea',
    region: { ar: 'المدية', en: 'Medea' }
  },
  {
    key: 'mila',
    ar: 'جامعة عبد الحفيظ بوصوف ميلة',
    en: 'Abdelhafid Boussouf University of Mila',
    region: { ar: 'ميلة', en: 'Mila' }
  },
  {
    key: 'msila',
    ar: 'جامعة محمد بوضياف المسيلة',
    en: 'Mohamed Boudiaf University of M’Sila',
    region: { ar: 'المسيلة', en: 'M’Sila' }
  },
  {
    key: 'mostaganem',
    ar: 'جامعة عبد الحميد بن باديس مستغانم',
    en: 'Abdelhamid Ibn Badis University of Mostaganem',
    region: { ar: 'مستغانم', en: 'Mostaganem' }
  },
  {
    key: 'naama',
    ar: 'جامعة أحمد صالحي النعامة',
    en: 'Ahmed Salhi University of Naama',
    region: { ar: 'النعامة', en: 'Naama' }
  },
  {
    key: 'oran1',
    ar: 'جامعة أحمد بن بلة وهران 1',
    en: 'Ahmed Ben Bella University of Oran 1',
    region: { ar: 'وهران', en: 'Oran' }
  },
  {
    key: 'oran2',
    ar: 'جامعة محمد بن أحمد وهران 2',
    en: 'Mohamed Ben Ahmed University of Oran 2',
    region: { ar: 'وهران', en: 'Oran' }
  },
  {
    key: 'ouargla',
    ar: 'جامعة قاصدي مرباح ورقلة',
    en: 'Kasdi Merbah University of Ouargla',
    region: { ar: 'ورقلة', en: 'Ouargla' }
  },
  {
    key: 'saida',
    ar: 'جامعة الدكتور مولاي الطاهر سعيدة',
    en: 'Dr. Moulay Tahar University of Saida',
    region: { ar: 'سعيدة', en: 'Saida' }
  },
  {
    key: 'setif1',
    ar: 'جامعة فرحات عباس سطيف 1',
    en: 'Ferhat Abbas University Setif 1',
    region: { ar: 'سطيف', en: 'Setif' }
  },
  {
    key: 'setif2',
    ar: 'جامعة محمد لمين دباغين سطيف 2',
    en: 'Mohamed Lamine Debaghine University Setif 2',
    region: { ar: 'سطيف', en: 'Setif' }
  },
  {
    key: 'sidi_bel_abbes',
    ar: 'جامعة جيلالي ليابس سيدي بلعباس',
    en: 'Djillali Liabes University of Sidi Bel Abbes',
    region: { ar: 'سيدي بلعباس', en: 'Sidi Bel Abbes' }
  },
  {
    key: 'skikda',
    ar: 'جامعة 20 أوت 1955 سكيكدة',
    en: '20 August 1955 University of Skikda',
    region: { ar: 'سكيكدة', en: 'Skikda' }
  },
  {
    key: 'soukahras',
    ar: 'جامعة محمد الشريف مساعدية سوق أهراس',
    en: 'Mohamed Cherif Messaadia University of Souk Ahras',
    region: { ar: 'سوق أهراس', en: 'Souk Ahras' }
  },
  {
    key: 'tamanrasset',
    ar: 'جامعة تمنراست',
    en: 'University of Tamanrasset',
    region: { ar: 'تمنراست', en: 'Tamanrasset' }
  },
  {
    key: 'tebessa',
    ar: 'جامعة العربي التبسي تبسة',
    en: 'Larbi Tebessi University of Tebessa',
    region: { ar: 'تبسة', en: 'Tebessa' }
  },
  {
    key: 'tindouf',
    ar: 'جامعة تندوف علي كافي',
    en: 'Ali Kafi University of Tindouf',
    region: { ar: 'تندوف', en: 'Tindouf' }
  },
  {
    key: 'tissemsilt',
    ar: 'جامعة تيسمسيلت',
    en: 'University of Tissemsilt',
    region: { ar: 'تيسمسيلت', en: 'Tissemsilt' }
  },
  {
    key: 'tizi_ouzou',
    ar: 'جامعة مولود معمري تيزي وزو',
    en: 'Mouloud Mammeri University of Tizi Ouzou',
    region: { ar: 'تيزي وزو', en: 'Tizi Ouzou' }
  },
  {
    key: 'tlemcen',
    ar: 'جامعة أبو بكر بلقايد تلمسان',
    en: 'Abou Bekr Belkaid University of Tlemcen',
    region: { ar: 'تلمسان', en: 'Tlemcen' }
  },
  {
    key: 'tiaret',
    ar: 'جامعة ابن خلدون تيارت',
    en: 'Ibn Khaldoun University of Tiaret',
    region: { ar: 'تيارت', en: 'Tiaret' }
  },
  {
    key: 'tipaza',
    ar: 'جامعة عبد الله مرسلي تيبازة',
    en: 'Abdallah Morsli University of Tipaza',
    region: { ar: 'تيبازة', en: 'Tipaza' }
  },
  {
    key: 'usthb',
    ar: 'جامعة هواري بومدين للعلوم والتكنولوجيا',
    en: 'USTHB - Houari Boumediene University',
    region: { ar: 'الجزائر', en: 'Algiers' }
  },
  {
    key: 'usto',
    ar: 'جامعة العلوم والتكنولوجيا محمد بوضياف وهران',
    en: 'Mohamed Boudiaf University of Science and Technology of Oran',
    region: { ar: 'وهران', en: 'Oran' }
  },
  {
    key: 'constantine_islamic',
    ar: 'جامعة الأمير عبد القادر للعلوم الإسلامية',
    en: 'Emir Abdelkader University of Islamic Sciences',
    region: { ar: 'قسنطينة', en: 'Constantine' }
  },
  {
    key: 'university_formation_continue',
    ar: 'جامعة التكوين المتواصل',
    en: 'University of Continuing Education',
    region: { ar: 'الجزائر', en: 'Algiers' }
  },
  {
    key: 'relizane',
    ar: 'جامعة غليزان',
    en: 'University of Relizane',
    region: { ar: 'غليزان', en: 'Relizane' }
  },
  {
    key: 'ouargla',
    ar: 'جامعة قاصدي مرباح ورقلة',
    en: 'Kasdi Merbah University of Ouargla',
    region: { ar: 'ورقلة', en: 'Ouargla' }
  }
];









// export const MAJORS = [
//   { key: 'medicine', ar: 'طب', en: 'Medicine' },
//   { key: 'pharmacy', ar: 'صيدلة', en: 'Pharmacy' },
//   { key: 'dentistry', ar: 'طب أسنان', en: 'Dentistry' },
//   { key: 'medsci', ar: 'علوم طبية', en: 'Medical Sciences' },
//   { key: 'civileng', ar: 'هندسة مدنية', en: 'Civil Engineering' },
//   { key: 'mecheng', ar: 'هندسة ميكانيكية', en: 'Mechanical Engineering' },
//   { key: 'eleceng', ar: 'هندسة كهربائية', en: 'Electrical Engineering' },
//   { key: 'energyeng', ar: 'هندسة طاقة', en: 'Energy Engineering' },
//   { key: 'cs', ar: 'علم الحاسوب', en: 'Computer Science' },
//   { key: 'math', ar: 'رياضيات', en: 'Mathematics' },
//   { key: 'physics', ar: 'فيزياء', en: 'Physics' },
//   { key: 'chem', ar: 'كيمياء', en: 'Chemistry' },
//   { key: 'matsci', ar: 'علوم المادة', en: 'Materials Science' },
//   { key: 'econ', ar: 'اقتصاد', en: 'Economics' },
//   { key: 'business', ar: 'علوم تجارية', en: 'Business Studies' },
//   { key: 'finance', ar: 'علوم مالية', en: 'Finance' },
//   { key: 'econsci', ar: 'علوم اقتصادية', en: 'Economic Sciences' },
//   { key: 'law', ar: 'قانون', en: 'Law' },
//   { key: 'polsci', ar: 'علوم سياسية', en: 'Political Science' },
//   { key: 'pubadmin', ar: 'علوم إدارية', en: 'Public Administration' },
//   { key: 'forlang', ar: 'لغات أجنبية', en: 'Foreign Languages' },
//   { key: 'arabiclit', ar: 'آداب عربية', en: 'Arabic Literature' },
//   { key: 'islamic', ar: 'علوم إسلامية', en: 'Islamic Studies' },
//   { key: 'philosophy', ar: 'فلسفة', en: 'Philosophy' },
//   { key: 'softeng', ar: 'إعلام آلي', en: 'Software Engineering' },
//   { key: 'automation', ar: 'تحكم آلي', en: 'Automation' },
//   { key: 'telecom', ar: 'اتصالات', en: 'Telecommunications' }
// ];








export const MAJORS = [
  // 🩺 Health & Medical Sciences
  { key: 'medicine', ar: 'طب', en: 'Medicine' },
  { key: 'dentistry', ar: 'طب الأسنان', en: 'Dentistry' },
  { key: 'pharmacy', ar: 'صيدلة', en: 'Pharmacy' },
  { key: 'veterinary', ar: 'الطب البيطري', en: 'Veterinary Medicine' },
  { key: 'medical_sciences', ar: 'العلوم الطبية', en: 'Medical Sciences' },
  { key: 'nursing', ar: 'علوم التمريض', en: 'Nursing Sciences' },
  { key: 'public_health', ar: 'الصحة العمومية', en: 'Public Health' },

  // 💻 Computer Science & Technology
  { key: 'computer_science', ar: 'الإعلام الآلي', en: 'Computer Science' },
  { key: 'software_engineering', ar: 'هندسة البرمجيات', en: 'Software Engineering' },
  { key: 'information_systems', ar: 'نظم المعلومات', en: 'Information Systems' },
  { key: 'artificial_intelligence', ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
  { key: 'data_science', ar: 'علم البيانات', en: 'Data Science' },
  { key: 'cybersecurity', ar: 'الأمن السيبراني', en: 'Cybersecurity' },
  { key: 'information_technology', ar: 'تكنولوجيا المعلومات', en: 'Information Technology' },
  { key: 'computer_networks', ar: 'شبكات الحاسوب', en: 'Computer Networks' },

  // ⚙️ Engineering
  { key: 'civil_engineering', ar: 'الهندسة المدنية', en: 'Civil Engineering' },
  { key: 'mechanical_engineering', ar: 'الهندسة الميكانيكية', en: 'Mechanical Engineering' },
  { key: 'electrical_engineering', ar: 'الهندسة الكهربائية', en: 'Electrical Engineering' },
  { key: 'industrial_engineering', ar: 'الهندسة الصناعية', en: 'Industrial Engineering' },
  { key: 'process_engineering', ar: 'هندسة الطرائق', en: 'Process Engineering' },
  { key: 'chemical_engineering', ar: 'الهندسة الكيميائية', en: 'Chemical Engineering' },
  { key: 'energy_engineering', ar: 'هندسة الطاقة', en: 'Energy Engineering' },
  { key: 'mining_engineering', ar: 'هندسة المناجم', en: 'Mining Engineering' },
  { key: 'materials_engineering', ar: 'هندسة المواد', en: 'Materials Engineering' },
  { key: 'automation', ar: 'التحكم الآلي', en: 'Automation and Control' },
  { key: 'electromechanical', ar: 'الهندسة الكهروميكانيكية', en: 'Electromechanical Engineering' },
  { key: 'telecommunications', ar: 'الاتصالات', en: 'Telecommunications' },
  { key: 'electronics', ar: 'الإلكترونيات', en: 'Electronics' },
  { key: 'optics', ar: 'البصريات', en: 'Optics' },

  // 🔬 Exact Sciences
  { key: 'mathematics', ar: 'الرياضيات', en: 'Mathematics' },
  { key: 'applied_mathematics', ar: 'الرياضيات التطبيقية', en: 'Applied Mathematics' },
  { key: 'physics', ar: 'الفيزياء', en: 'Physics' },
  { key: 'applied_physics', ar: 'الفيزياء التطبيقية', en: 'Applied Physics' },
  { key: 'chemistry', ar: 'الكيمياء', en: 'Chemistry' },
  { key: 'applied_chemistry', ar: 'الكيمياء التطبيقية', en: 'Applied Chemistry' },
  { key: 'materials_science', ar: 'علوم المادة', en: 'Materials Science' },

  // 🌱 Natural & Life Sciences
  { key: 'biology', ar: 'علوم الطبيعة والحياة', en: 'Natural and Life Sciences' },
  { key: 'biochemistry', ar: 'الكيمياء الحيوية', en: 'Biochemistry' },
  { key: 'microbiology', ar: 'علم الأحياء الدقيقة', en: 'Microbiology' },
  { key: 'biotechnology', ar: 'التكنولوجيا الحيوية', en: 'Biotechnology' },
  { key: 'ecology', ar: 'علم البيئة', en: 'Ecology' },
  { key: 'food_science', ar: 'علوم الأغذية', en: 'Food Science' },
  { key: 'agronomy', ar: 'العلوم الزراعية', en: 'Agricultural Sciences' },
  { key: 'forestry', ar: 'علوم الغابات', en: 'Forestry' },
  { key: 'fisheries', ar: 'علوم الصيد البحري', en: 'Fisheries Science' },

  // 💰 Economics & Management
  { key: 'economics', ar: 'العلوم الاقتصادية', en: 'Economic Sciences' },
  { key: 'commercial_sciences', ar: 'العلوم التجارية', en: 'Commercial Sciences' },
  { key: 'management', ar: 'علوم التسيير', en: 'Management Sciences' },
  { key: 'finance', ar: 'العلوم المالية والمحاسبة', en: 'Finance and Accounting' },
  { key: 'accounting', ar: 'المحاسبة', en: 'Accounting' },
  { key: 'marketing', ar: 'التسويق', en: 'Marketing' },
  { key: 'business_management', ar: 'إدارة الأعمال', en: 'Business Administration' },
  { key: 'human_resources', ar: 'تسيير الموارد البشرية', en: 'Human Resources Management' },
  { key: 'international_economics', ar: 'الاقتصاد الدولي', en: 'International Economics' },

  // ⚖️ Law & Political Sciences
  { key: 'law', ar: 'الحقوق', en: 'Law' },
  { key: 'political_science', ar: 'العلوم السياسية', en: 'Political Science' },
  { key: 'international_relations', ar: 'العلاقات الدولية', en: 'International Relations' },
  { key: 'public_administration', ar: 'الإدارة العمومية', en: 'Public Administration' },

  // 📚 Humanities & Languages
  { key: 'arabic_language', ar: 'اللغة والأدب العربي', en: 'Arabic Language and Literature' },
  { key: 'french', ar: 'اللغة الفرنسية', en: 'French Language' },
  { key: 'english', ar: 'اللغة الإنجليزية', en: 'English Language' },
  { key: 'german', ar: 'اللغة الألمانية', en: 'German Language' },
  { key: 'spanish', ar: 'اللغة الإسبانية', en: 'Spanish Language' },
  { key: 'translation', ar: 'الترجمة', en: 'Translation' },
  { key: 'foreign_languages', ar: 'اللغات الأجنبية', en: 'Foreign Languages' },
  { key: 'literature', ar: 'الآداب', en: 'Literature' },
  { key: 'philosophy', ar: 'الفلسفة', en: 'Philosophy' },
  { key: 'history', ar: 'التاريخ', en: 'History' },
  { key: 'geography', ar: 'الجغرافيا', en: 'Geography' },
  { key: 'archaeology', ar: 'علم الآثار', en: 'Archaeology' },

  // 🧠 Social Sciences
  { key: 'psychology', ar: 'علم النفس', en: 'Psychology' },
  { key: 'sociology', ar: 'علم الاجتماع', en: 'Sociology' },
  { key: 'education_sciences', ar: 'علوم التربية', en: 'Educational Sciences' },
  { key: 'library_science', ar: 'علم المكتبات والمعلومات', en: 'Library and Information Science' },
  { key: 'communication', ar: 'علوم الإعلام والاتصال', en: 'Communication and Media Sciences' },
  { key: 'information_communication', ar: 'الإعلام والاتصال', en: 'Information and Communication' },

  // 🕌 Islamic Sciences
  { key: 'islamic_sciences', ar: 'العلوم الإسلامية', en: 'Islamic Sciences' },
  { key: 'islamic_law', ar: 'الشريعة الإسلامية', en: 'Islamic Law' },
  { key: 'quranic_sciences', ar: 'علوم القرآن', en: 'Quranic Sciences' },

  // 🏗️ Architecture & Urbanism
  { key: 'architecture', ar: 'الهندسة المعمارية', en: 'Architecture' },
  { key: 'urbanism', ar: 'العمران', en: 'Urban Planning' },
  { key: 'landscape_architecture', ar: 'هندسة المناظر الطبيعية', en: 'Landscape Architecture' },

  // 🎨 Arts & Design
  { key: 'fine_arts', ar: 'الفنون الجميلة', en: 'Fine Arts' },
  { key: 'graphic_design', ar: 'التصميم الجرافيكي', en: 'Graphic Design' },
  { key: 'visual_arts', ar: 'الفنون البصرية', en: 'Visual Arts' },
  { key: 'music', ar: 'الموسيقى', en: 'Music' },

  // 🏃 Sports
  { key: 'sports_sciences', ar: 'علوم وتقنيات النشاطات البدنية والرياضية', en: 'Sports Sciences and Physical Activities' },

  // 🌍 Earth & Environmental Sciences
  { key: 'geology', ar: 'علوم الأرض', en: 'Earth Sciences' },
  { key: 'geophysics', ar: 'الجيوفيزياء', en: 'Geophysics' },
  { key: 'environmental_sciences', ar: 'العلوم البيئية', en: 'Environmental Sciences' },
  { key: 'hydraulics', ar: 'الهندسة الهيدروليكية', en: 'Hydraulics' },

  // 🏨 Tourism & Hospitality
  { key: 'tourism', ar: 'السياحة', en: 'Tourism' },
  { key: 'hotel_management', ar: 'الفندقة', en: 'Hotel Management' },

  // 🚢 Transport & Logistics
  { key: 'transportation', ar: 'النقل', en: 'Transportation' },
  { key: 'logistics', ar: 'اللوجستيك', en: 'Logistics' },

  // 🧑‍🏫 Education
  { key: 'physical_education', ar: 'التربية البدنية والرياضية', en: 'Physical Education' },
  { key: 'teacher_education', ar: 'علوم التربية والتعليم', en: 'Teacher Education' }
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
  { key: 'y4', ar: 'السنة الرابعة', en: '4th Year' },
  { key: 'y5', ar: 'السنة الخامسة', en: '5th Year' }

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
