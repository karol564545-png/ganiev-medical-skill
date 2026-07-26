/**
 * "Ganiev Medical" — Yandex Alice (Dialogs) skill webhook
 * Node.js + Express
 *
 * Bu fayl Yandex Dialogs konsolida "Backend" turi tanlanganda
 * ishlatiladigan webhook manzili uchun kod.
 *
 * O'rnatish:
 *   npm init -y
 *   npm install express
 *   node webhook.js
 *
 * Yandex Dialogs konsolida webhook URL sifatida serveringiz
 * manzilini ko'rsating, masalan: https://sizning-domen.uz/webhook
 */

const express = require('express');
const app = express();
app.use(express.json());

// ==========================================================
// 1. KLINIKA MA'LUMOTLARI (bu yerni yangilab turing)
// ==========================================================
const CLINIC = {
  name: 'Ganiev Medical',
  address_uz: "Samarqand viloyati, Oqdaryo tumani, Loyish shaharchasi, Amir Temur ko'chasi 13-uy (mo'ljal: sobiq prokuratura binosi)",
  address_ru: 'Самаркандская область, Акдарьинский район, город Лоиш, улица Амира Темура, дом 13 (ориентир: бывшее здание прокуратуры)',

  hours_uz: "Har kuni soat 8:30 dan 16:30 gacha ishlaymiz, bayram kunlari ham. Dam olish kuni — yakshanba.",
  hours_ru: 'Мы работаем ежедневно с 8:30 до 16:30, включая праздничные дни. Выходной день — воскресенье.',

  phones: ['+998 90 198-50-01', '+998 55 707-56-45'],

  services_uz: [
    'Barcha turdagi laboratoriya xizmatlari',
    'EKG',
    'UZI',
    'Massaj',
    'Fizioterapiya',
    'Girudoterapiya (zuluk / piyavka)',
    'Akupunktura (igna bilan davolash)',
    'Statsionar davolash',
    'Terapiya',
    'Nevrologiya',
    'Kardiologiya',
    'Urologiya',
    "Bo'g'inlarni operatsiyasiz davolash",
    'Bel grijalarini operatsiyasiz davolash',
  ],
  services_ru: [
    'Все виды лабораторных услуг',
    'ЭКГ',
    'УЗИ',
    'Массаж',
    'Физиотерапия',
    'Гирудотерапия (пиявки)',
    'Акупунктура (иглотерапия)',
    'Стационарное лечение',
    'Терапия',
    'Неврология',
    'Кардиология',
    'Урология',
    'Лечение суставов без операции',
    'Лечение грыж поясничного отдела без операции',
  ],

  // Narxlar
  prices_uz: [
    "Statsionar yotoq: 280 000 dan 350 000 so'mgacha (kunlik)",
    "UZI: 40 000 so'm",
    "Massaj: 100 000 so'm",
    "Laboratoriya tahlillari: 15 000 dan 80 000 so'mgacha (tahlil turiga qarab)",
  ].join('. '),
  prices_ru: [
    'Стационарная койка: от 280 000 до 350 000 сум (в сутки)',
    'УЗИ: 40 000 сум',
    'Массаж: 100 000 сум',
    'Лабораторные анализы: от 15 000 до 80 000 сум (в зависимости от вида анализа)',
  ].join('. '),

  // Parking
  parking_uz: "Ha, klinikada avtomobillar uchun yetarlicha parkovka joyi mavjud.",
  parking_ru: 'Да, при клинике есть достаточно места для парковки автомобилей.',

  // Hygiene / cleaning
  hygiene_uz: "Klinikada gigienaga qattiq amal qilinadi: pol kuniga 3 marta artiladi, xonalar doimiy tozalab turiladi.",
  hygiene_ru: 'В клинике строго соблюдается гигиена: полы моются 3 раза в день, помещения регулярно убираются.',

  // Room amenities
  rooms_uz: "Xonalarda barcha shart-sharoit mavjud: televizor, xolodilnik, konditsioner va isitish tizimi bor. Xonalar yozda salqin, qishda esa iliq bo'ladi.",
  rooms_ru: 'В палатах есть все условия: телевизор, холодильник, кондиционер и система отопления. Летом прохладно, зимой тепло.',

  // Meals
  meals_uz: "Kuniga 3 mahal ovqat beriladi. Nonushtaga: tushum, sosiska, kasha, shakar va sariyog' bilan non beriladi. Tushlikka: osh, shurbo, golubtsi, o'noshi, mastava, moshxo'rda, non, choy, kompot va mevalar beriladi. Kechki ovqatga: non, choy, shurbo, golubtsi, moshxo'rda va osh beriladi.",
  meals_ru: 'Питание 3 раза в день. На завтрак: творог, сосиски, каша, сахар, сливочное масло и хлеб. На обед: плов, шурпа, голубцы, уноши, мастава, машхурда, хлеб, чай, компот и фрукты. На ужин: хлеб, чай, шурпа, голубцы, машхурда и плов.',

  // Equipment
  equipment_uz: "UZI apparatimiz eng zamonaviy, dopler funksiyasi ham mavjud. Laboratoriya apparatlarimiz Germaniyada ishlab chiqarilgan EDAN firmasiniki — zamonaviy va aniq natija beradi.",
  equipment_ru: 'Наш аппарат УЗИ самый современный, есть функция допплера. Лабораторное оборудование немецкой фирмы EDAN — современное и даёт точные результаты.',

  // Staff
  staff_uz: "Bosh vrach — Ganiev Burhonboy Samiyevich, 45 yillik stajga ega, 10 yil chet elda malaka oshirgan, tumanning eng taniqli vrachi. Laborant vrach — Qoriyeva Madina opa, 10 yillik stajga ega, tumanda ko'p yosh mutaxassislarga ustozlik qilgan.",
  staff_ru: 'Главный врач — Ганиев Бурхонбой Самиевич, стаж 45 лет, 10 лет повышал квалификацию за рубежом, самый известный врач в районе. Врач-лаборант — Кориева Мадина, стаж 10 лет, наставник для многих молодых специалистов района.',

  // Wi-Fi
  wifi_uz: "Wi-Fi klinikada mavjud, parolini qabulxonadagi xodimlardan so'rab olishingiz mumkin.",
  wifi_ru: 'Wi-Fi в клинике есть, пароль можно узнать у сотрудников на ресепшене.',

  // Appointment booking
  booking_uz: "Qabulga yozilish uchun telefon qilishingiz kifoya: " ,
  booking_ru: 'Для записи на приём достаточно позвонить по телефону: ',
};

// ==========================================================
// 2. TIL ANIQLASH (oddiy heuristika)
// ==========================================================
const RU_HINTS = ['привет', 'здравствуйте', 'время работы', 'адрес', 'услуги', 'цена', 'сколько стоит', 'да', 'нет', 'спасибо', 'график'];
const UZ_HINTS = ['salom', 'assalomu', 'ish vaqti', 'manzil', 'xizmat', 'narx', 'qancha turadi', 'ha', "yo'q", 'rahmat', 'qayerda'];

function detectLang(text, sessionLang) {
  const t = (text || '').toLowerCase();
  const ruScore = RU_HINTS.filter((w) => t.includes(w)).length;
  const uzScore = UZ_HINTS.filter((w) => t.includes(w)).length;

  if (ruScore > uzScore) return 'ru';
  if (uzScore > ruScore) return 'uz';

  // Kalit so'zlar bo'yicha teng bo'lsa (yoki hech biri topilmasa),
  // yozuv turiga qaraymiz: lotin harflar bo'lsa — o'zbek (lotin),
  // kirill harflar bo'lsa — o'zbek kirill so'zlariga qarab rus yoki o'zbek
  const hasCyrillic = /[а-яё]/i.test(t);
  const hasLatin = /[a-z]/i.test(t);

  // O'zbek tiliga xos kirill harflar/so'zlar (ў, қ, ғ, ҳ) — bular
  // rus tilida umuman ishlatilmaydi
  const uzCyrillicMarkers = /[ўқғҳ]/i.test(t);

  if (uzCyrillicMarkers) return 'uz';
  if (hasCyrillic && !hasLatin) return 'ru'; // faqat kirill, o'zbekka xos harf yo'q — ehtimol rus
  if (hasLatin && !hasCyrillic) return 'uz'; // lotin yozuv — o'zbek

  return sessionLang || 'uz'; // standart holat: o'zbek tili
}

// ==========================================================
// 3. INTENT ANIQLASH (kalit so'zlar bo'yicha, oddiy versiya)
// ==========================================================
function detectIntent(text) {
  const t = (text || '').toLowerCase();
  const has = (arr) => arr.some((w) => t.includes(w));

  if (has(['ish vaqt', 'ишлайсиз', 'время работ', 'график работ', 'qachon ishlaydi', 'соат нечада', 'во сколько']))
    return 'hours';

  if (has(['bayram', 'праздник', 'выходной']))
    return 'hours';

  if (has(['manzil', 'qayerda joylash', 'joylashgan', 'адрес', 'где находит', 'куда ехать', "yo'nalish"]))
    return 'address';

  if (has(['parkov', 'mashina qo\'yish', 'парков', 'стоянк']))
    return 'parking';

  if (has(['gigiena', 'artil', 'toza', 'гигиен', 'убор', 'чист']))
    return 'hygiene';

  if (has(['xona', 'konditsioner', 'isitish', 'palata', 'палат', 'кондиционер', 'отоплен', 'температур']))
    return 'rooms';

  if (has(['nonushta', 'tushlik', 'kechki ovqat', 'ovqat', 'завтрак', 'обед', 'ужин', 'питани', 'еда']))
    return 'meals';

  if (has(['aппarat', 'apparat', 'zamonaviy', 'аппарат', 'современ', 'доплер', 'dopler']))
    return 'equipment';

  if (has(['vrach', 'врач', 'doktor', 'доктор', 'laborant', 'лаборант', 'mutaxassis', 'специалист']))
    return 'staff';

  if (has(['wifi', 'wi-fi', 'вайфай', 'вай-фай', 'интернет']))
    return 'wifi';

  if (has(['yozil', 'navbat', 'qabulga', 'запис', 'очеред', 'прием']))
    return 'booking';

  if (has(['xizmat', 'nima qiladi', 'услуг', 'что лечите', "yo'nalish", 'направлени']))
    return 'services';

  if (has(['yoto', 'кoyka', 'койк', 'ётоқ']))
    return 'prices';

  if (has(['narx', 'qancha turadi', 'qancha pul', 'цена', 'сколько стоит', 'стоимость', 'прайс']))
    return 'prices';

  if (has(['telefon', 'raqam', "bog'lan", 'телефон', 'номер', 'связаться', 'позвонить']))
    return 'contact';

  if (has(['salom', 'assalomu', 'привет', 'здравствуйте', 'добрый']))
    return 'greeting';

  if (has(['rahmat', 'спасибо', 'raxmat']))
    return 'thanks';

  if (has(['yordam', 'nima qila olasiz', 'помощь', 'что ты умеешь', 'что умеешь']))
    return 'help';

  return 'fallback';
}

// ==========================================================
// 3-B. YANDEXGPT ORQALI ERKIN SAVOLLARGA JAVOB (fallback uchun)
// ==========================================================
// Ishlatish uchun 2 ta environment variable kerak:
//   YANDEX_API_KEY   — Yandex Cloud'dan olingan API kalit
//   YANDEX_FOLDER_ID — Yandex Cloud katalog (folder) ID'si
// Railway/boshqa hostingda "Variables" bo'limiga shu ikkalasini kiritasiz.

const YANDEX_API_KEY = process.env.YANDEX_API_KEY;
const YANDEX_FOLDER_ID = process.env.YANDEX_FOLDER_ID;

async function askYandexGPT(userText, lang) {
  if (!YANDEX_API_KEY || !YANDEX_FOLDER_ID) {
    return null;
  }

  const systemPrompt =
    lang === 'ru'
      ? `Ты — голосовой ассистент клиники "Ganiev Medical". Отвечай кратко (1-2 предложения), дружелюбно, на русском языке. На вопросы не по теме клиники тоже можно ответить коротко и по-простому. Но если вопрос касается конкретного медицинского диагноза, лечения или дозировки лекарств — не давай медицинских советов, а порекомендуй позвонить в клинику по телефону +998 90 198-50-01.`
      : `Sen "Ganiev Medical" klinikasining ovozli yordamchisisan. Qisqa (1-2 gap), do'stona va o'zbek tilida javob ber. Klinikaga aloqasi bo'lmagan savollarga ham qisqa va sodda javob berishing mumkin. Lekin agar savol aniq tibbiy tashxis, davolash usuli yoki dori dozasiga oid bo'lsa — tibbiy maslahat berma, buning o'rniga +998 90 198-50-01 raqamiga qo'ng'iroq qilishni tavsiya qil.`;

  try {
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Api-Key ${YANDEX_API_KEY}`,
      },
      body: JSON.stringify({
        modelUri: `gpt://${YANDEX_FOLDER_ID}/yandexgpt-lite`,
        completionOptions: { stream: false, temperature: 0.4, maxTokens: 200 },
        messages: [
          { role: 'system', text: systemPrompt },
          { role: 'user', text: userText },
        ],
      }),
    });

    const data = await response.json();
    const answer = data?.result?.alternatives?.[0]?.message?.text;
    return answer || null;
  } catch (err) {
    console.error('YandexGPT xatolik:', err);
    return null;
  }
}

// ==========================================================
// 4. JAVOBLAR (til bo'yicha)
// ==========================================================
function buildResponse(intent, lang) {
  const isRu = lang === 'ru';

  switch (intent) {
    case 'greeting':
      return isRu
        ? `Здравствуйте! Это голосовой ассистент клиники «${CLINIC.name}». Вы можете спросить про часы работы, адрес, услуги, цены, парковку, питание, врачей и многое другое. Что вас интересует?`
        : `Assalomu alaykum! Bu «${CLINIC.name}» klinikasining ovozli yordamchisi. Ish vaqti, manzil, xizmatlar, narxlar, parkovka, ovqatlanish, vrachlar va boshqa ko'p narsalar haqida so'rashingiz mumkin. Nima bilan qiziqasiz?`;

    case 'hours':
      return isRu ? CLINIC.hours_ru : CLINIC.hours_uz;

    case 'address':
      return isRu ? `Наш адрес: ${CLINIC.address_ru}.` : `Bizning manzilimiz: ${CLINIC.address_uz}.`;

    case 'parking':
      return isRu ? CLINIC.parking_ru : CLINIC.parking_uz;

    case 'hygiene':
      return isRu ? CLINIC.hygiene_ru : CLINIC.hygiene_uz;

    case 'rooms':
      return isRu ? CLINIC.rooms_ru : CLINIC.rooms_uz;

    case 'meals':
      return isRu ? CLINIC.meals_ru : CLINIC.meals_uz;

    case 'equipment':
      return isRu ? CLINIC.equipment_ru : CLINIC.equipment_uz;

    case 'staff':
      return isRu ? CLINIC.staff_ru : CLINIC.staff_uz;

    case 'wifi':
      return isRu ? CLINIC.wifi_ru : CLINIC.wifi_uz;

    case 'booking':
      return (isRu ? CLINIC.booking_ru : CLINIC.booking_uz) + CLINIC.phones.join(isRu ? ' или ' : ' yoki ') + '.';

    case 'services': {
      const list = isRu ? CLINIC.services_ru : CLINIC.services_uz;
      const intro = isRu ? 'Мы оказываем следующие услуги: ' : 'Bizda quyidagi xizmatlar mavjud: ';
      return intro + list.join(', ') + '.';
    }

    case 'prices':
      return isRu ? CLINIC.prices_ru + '.' : CLINIC.prices_uz + '.';

    case 'contact':
      return isRu
        ? `Наши телефоны: ${CLINIC.phones.join(', ')}.`
        : `Bog'lanish uchun telefonlar: ${CLINIC.phones.join(', ')}.`;

    case 'thanks':
      return isRu ? 'Пожалуйста! Будьте здоровы.' : "Marhamat! Sog' bo'ling.";

    case 'help':
      return isRu
        ? 'Я могу рассказать про часы работы, адрес, парковку, услуги, цены, питание, палаты, оборудование, врачей, Wi-Fi и запись на приём. Что вас интересует?'
        : "Men klinikaning ish vaqti, manzili, parkovkasi, xizmatlari, narxlari, ovqatlanishi, xonalari, apparaturasi, vrachlari, Wi-Fi va qabulga yozilish haqida ma'lumot bera olaman. Nima haqida bilmoqchisiz?";

    default:
      return isRu
        ? 'Извините, я не поняла вопрос. Вы можете спросить про часы работы, адрес, услуги, цены и многое другое.'
        : "Kechirasiz, savolingizni tushunmadim. Ish vaqti, manzil, xizmatlar, narxlar va boshqa ko'p narsalar haqida so'rashingiz mumkin.";
  }
}

// ==========================================================
// 5. WEBHOOK ENDPOINT
// ==========================================================
app.post('/webhook', async (req, res) => {
  const body = req.body || {};
  const utterance = body.request ? body.request.original_utterance : '';
  const isNewSession = body.session ? body.session.new : true;

  const prevState = (body.state && body.state.session) || {};
  const lang = detectLang(utterance, prevState.lang);

  const intent = isNewSession ? 'greeting' : detectIntent(utterance);

  let text;
  if (intent === 'fallback' && !isNewSession) {
    const gptAnswer = await askYandexGPT(utterance, lang);
    text = gptAnswer || buildResponse('fallback', lang);
  } else {
    text = buildResponse(intent, lang);
  }

  res.json({
    response: { text, end_session: false },
    session_state: { lang },
    version: body.version || '1.0',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ganiev Medical skill webhook ${PORT}-portda ishga tushdi`);
});
