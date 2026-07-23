import { withDeterministicOptionOrder } from '@/lib/question-utils';
import type { TaxiCategory, TaxiQuestion } from '@/lib/taxi-types';

export type { TaxiCategory, TaxiQuestion, TaxiExamResult, TaxiCategoryScore } from '@/lib/taxi-types';

/**
 * Seed question bank for the Traficom taxi driver qualification exam
 * (taksinkuljettajan ajolupakoe).
 *
 * The real exam is sat in Finnish, so every question, option and explanation is
 * bilingual: Finnish (`*Fi`) is the primary text shown in the UI and English is
 * the learning aid shown beneath it. Content is grounded in Laki liikenteen
 * palveluista 320/2017 (Act on Transport Services), Tieliikennelaki 729/2018 and
 * Traficom's taxi driver guidance.
 *
 * The Finnish translations are written for practice and should be proofread
 * against current official material before relying on them.
 *
 * Distribution — 12 per category, so a full 30-question mock exam (10 per
 * category) can always be assembled without repetition.
 *
 * AUTHORING CONVENTION: write the correct option FIRST (`correctAnswer: 0`).
 * `options` and `optionsFi` are permuted in lockstep at export time.
 */
const authoredTaxiQuestions: TaxiQuestion[] = [
  // ---------------------------------------------------------------------------
  // PASSENGER SAFETY & ACCESSIBILITY — 12
  // ---------------------------------------------------------------------------
  {
    id: 'ts-01',
    category: 'Passenger Safety & Accessibility',
    question:
      'How must a passenger travelling in their own wheelchair be secured in an accessible taxi?',
    questionFi:
      'Miten omalla pyörätuolilla matkustava asiakas on kiinnitettävä esteettömässä taksissa?',
    options: [
      'The wheelchair is anchored facing forward with a four-point tie-down, and the passenger wears a separate occupant restraint',
      'The wheelchair brakes are applied and no further securing is needed',
      'The wheelchair is anchored sideways so the passenger can see out',
      'The passenger holds the grab handle while the driver drives slowly',
    ],
    optionsFi: [
      'Pyörätuoli kiinnitetään menosuuntaan neljän pisteen kiinnitysvöillä, ja matkustajalla on erillinen henkilökohtainen turvavyö',
      'Pyörätuolin jarrut kytketään päälle, eikä muuta kiinnitystä tarvita',
      'Pyörätuoli kiinnitetään sivuttain, jotta matkustaja näkee ulos',
      'Matkustaja pitää kiinni tukikahvasta ja kuljettaja ajaa hitaasti',
    ],
    correctAnswer: 0,
    explanation:
      'A wheelchair must be anchored forward-facing with a four-point tie-down system, and the passenger must be restrained by a separate belt anchored to the vehicle — never by the wheelchair straps alone. Wheelchair brakes are not a restraint: they will not hold in a collision or emergency braking.',
    explanationFi:
      'Pyörätuoli on kiinnitettävä menosuuntaan neljän pisteen kiinnitysjärjestelmällä, ja matkustaja on turvattava ajoneuvoon kiinnitetyllä erillisellä turvavyöllä — ei koskaan pelkästään pyörätuolin omilla hihnoilla. Pyörätuolin jarrut eivät ole turvalaite: ne eivät pidä törmäyksessä tai hätäjarrutuksessa.',
    reference: 'Traficom — accessible transport guidance; standard ISO 10542',
  },
  {
    id: 'ts-02',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger with a guide dog orders a taxi. The driver has an allergy. What is the correct course of action?',
    questionFi:
      'Opaskoiran kanssa matkustava asiakas tilaa taksin. Kuljettajalla on allergia. Mikä on oikea toimintatapa?',
    options: [
      'The trip must be carried out — an assistance dog may not be refused and travels free of charge',
      'The driver may refuse the trip because of the allergy',
      'The trip may be carried out only if the passenger pays an extra cleaning fee',
      'The dog must travel in the luggage compartment',
    ],
    optionsFi: [
      'Kuljetus on suoritettava — avustajakoiraa ei saa kieltäytyä ottamasta, ja se matkustaa maksutta',
      'Kuljettaja saa kieltäytyä kuljetuksesta allergian vuoksi',
      'Kuljetus voidaan suorittaa vain, jos matkustaja maksaa ylimääräisen siivousmaksun',
      'Koiran on matkustettava tavaratilassa',
    ],
    correctAnswer: 0,
    explanation:
      'A guide dog or other assistance dog may not be refused, and it is carried free of charge — refusing amounts to discrimination against a disabled passenger. A driver with a genuine medical barrier should arrange for the trip to be handled by another vehicle rather than leave the passenger stranded.',
    explanationFi:
      'Opaskoiraa tai muuta avustajakoiraa ei saa kieltäytyä ottamasta, ja se kuljetetaan maksutta — kieltäytyminen on vammaisen matkustajan syrjintää. Jos kuljettajalla on todellinen terveydellinen este, hänen tulee järjestää kuljetus toisella autolla sen sijaan, että jättäisi matkustajan avutta.',
    reference: 'Yhdenvertaisuuslaki 1325/2014; Traficom — taxi driver guidance',
  },
  {
    id: 'ts-03',
    category: 'Passenger Safety & Accessibility',
    question: 'What is the correct way to guide a visually impaired passenger to the taxi?',
    questionFi: 'Mikä on oikea tapa opastaa näkövammainen matkustaja taksiin?',
    options: [
      'Speak to them directly, offer your arm and place their hand on the door frame and roof edge',
      'Take them firmly by the arm and steer them into the seat',
      'Ask an accompanying person to handle it and stay in the driver’s seat',
      'Describe the direction from the car and let them find the door alone',
    ],
    optionsFi: [
      'Puhu suoraan hänelle, tarjoa käsivarttasi ja ohjaa hänen kätensä oven karmiin ja katon reunaan',
      'Ota häntä tukevasti käsivarresta ja ohjaa hänet istuimelle',
      'Pyydä saattajaa hoitamaan asia ja pysy itse kuljettajan paikalla',
      'Kuvaile suunta autosta käsin ja anna hänen löytää ovi itse',
    ],
    correctAnswer: 0,
    explanation:
      'Address the passenger directly rather than a companion, identify yourself, and offer your arm so they can hold it and follow half a step behind — being pushed or pulled is disorienting. Guiding their hand to the door frame and roof edge lets them judge the opening and sit down safely on their own.',
    explanationFi:
      'Puhu suoraan matkustajalle etkä saattajalle, esittäydy ja tarjoa käsivarttasi, josta hän voi pitää kiinni ja seurata puoli askelta takana — työntäminen tai vetäminen on hämmentävää. Kun ohjaat hänen kätensä oven karmiin ja katon reunaan, hän voi arvioida aukon ja istua turvallisesti itse.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-04',
    category: 'Passenger Safety & Accessibility',
    question: 'Who is responsible for ensuring that passengers in a taxi wear their seat belts?',
    questionFi: 'Kuka vastaa siitä, että taksin matkustajat käyttävät turvavyötä?',
    options: [
      'Each passenger over 15 answers for themselves, while the driver answers for children under 15',
      'The driver is personally liable for every passenger regardless of age',
      'Nobody — seat belts are voluntary in a taxi',
      'The person who ordered and pays for the trip',
    ],
    optionsFi: [
      'Yli 15-vuotias matkustaja vastaa itsestään, ja kuljettaja vastaa alle 15-vuotiaista lapsista',
      'Kuljettaja on henkilökohtaisesti vastuussa jokaisesta matkustajasta iästä riippumatta',
      'Ei kukaan — turvavyön käyttö on taksissa vapaaehtoista',
      'Se, joka on tilannut ja maksaa matkan',
    ],
    correctAnswer: 0,
    explanation:
      'A passenger aged 15 or over is responsible for their own seat belt, while the driver is responsible for children under 15 being properly restrained. A professional driver should still point out the belts and refuse to move off with an unrestrained child.',
    explanationFi:
      'Vähintään 15-vuotias matkustaja vastaa itse turvavyönsä käytöstä, kun taas kuljettaja vastaa siitä, että alle 15-vuotiaat lapset on kiinnitetty asianmukaisesti. Ammattikuljettajan tulee silti muistuttaa turvavöistä eikä lähteä liikkeelle, jos lapsi on kiinnittämättä.',
    reference: 'Tieliikennelaki 729/2018, 90 §',
  },
  {
    id: 'ts-05',
    category: 'Passenger Safety & Accessibility',
    question:
      'An elderly passenger with a walking frame needs to get into the taxi. What is best practice?',
    questionFi:
      'Iäkäs matkustaja, jolla on rollaattori, tarvitsee apua taksiin nousemisessa. Mikä on paras toimintatapa?',
    options: [
      'Stop as close and level to the kerb as possible, offer assistance, and stow the frame only once they are seated',
      'Take the frame first so it can be loaded while they walk to the car',
      'Let them manage alone to preserve their dignity',
      'Ask them to fold the frame and carry it on their lap during the trip',
    ],
    optionsFi: [
      'Pysähdy mahdollisimman lähelle ja samaan tasoon reunakiveyksen kanssa, tarjoa apua ja aseta rollaattori tavaratilaan vasta, kun matkustaja istuu',
      'Ota rollaattori ensin, jotta se voidaan lastata matkustajan kävellessä autolle',
      'Anna hänen selviytyä yksin arvokkuuden säilyttämiseksi',
      'Pyydä häntä taittamaan rollaattori ja pitämään sitä sylissään matkan ajan',
    ],
    correctAnswer: 0,
    explanation:
      'The passenger needs the frame for support right up to the moment they sit down, so it is stowed last and returned first. Stopping level with a kerb shortens the step and removes a fall risk. Always ask before helping and follow the passenger’s instructions — assistance is offered, not imposed.',
    explanationFi:
      'Matkustaja tarvitsee rollaattoria tuekseen aivan istumaan asti, joten se lastataan viimeisenä ja palautetaan ensimmäisenä. Reunakiveyksen tasolle pysähtyminen lyhentää askelta ja poistaa kaatumisvaaran. Kysy aina ennen auttamista ja noudata matkustajan ohjeita — apua tarjotaan, ei tyrkytetä.',
    reference: 'Traficom — taxi driver guidance, assisting passengers',
  },
  {
    id: 'ts-06',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger becomes unresponsive during the trip and is not breathing normally. What is the correct sequence?',
    questionFi:
      'Matkustaja menee matkan aikana reagoimattomaksi eikä hengitä normaalisti. Mikä on oikea toimintajärjestys?',
    options: [
      'Stop safely, call 112, start CPR and follow the dispatcher’s instructions',
      'Drive as fast as possible to the nearest hospital',
      'Move the passenger out of the vehicle and wait for someone to help',
      'Call the taxi dispatch centre and continue to the destination',
    ],
    optionsFi: [
      'Pysähdy turvallisesti, soita 112, aloita elvytys ja noudata hätäkeskuksen ohjeita',
      'Aja mahdollisimman nopeasti lähimpään sairaalaan',
      'Siirrä matkustaja ulos autosta ja odota, että joku auttaa',
      'Soita taksikeskukseen ja jatka määränpäähän',
    ],
    correctAnswer: 0,
    explanation:
      'Stop in a safe place, call 112 immediately and begin resuscitation under the dispatcher’s guidance. Driving to hospital yourself delays professional care and puts you and other road users at risk. Giving assistance at an emergency is a legal duty, not a choice.',
    explanationFi:
      'Pysähdy turvalliseen paikkaan, soita heti 112 ja aloita elvytys hätäkeskuksen ohjeiden mukaan. Itse sairaalaan ajaminen viivästyttää ammattiapua ja vaarantaa sinut ja muut tienkäyttäjät. Auttaminen hätätilanteessa on lakisääteinen velvollisuus, ei valinta.',
    reference: 'Tieliikennelaki 729/2018, 179 §; Pelastuslaki 379/2011, 3 §',
  },
  {
    id: 'ts-07',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger becomes aggressive and threatening during the trip. What is the safest response?',
    questionFi:
      'Matkustaja käyttäytyy matkan aikana aggressiivisesti ja uhkaavasti. Mikä on turvallisin toimintatapa?',
    options: [
      'Stay calm, avoid confrontation, stop in a safe, public, well-lit place and call for help if needed',
      'Argue back firmly to establish authority',
      'Stop immediately wherever you are and order them out',
      'Speed up to reach the destination and end the trip sooner',
    ],
    optionsFi: [
      'Pysy rauhallisena, vältä vastakkainasettelua, pysähdy turvalliseen, julkiseen ja hyvin valaistuun paikkaan ja pyydä tarvittaessa apua',
      'Väitä tiukasti vastaan osoittaaksesi auktoriteettia',
      'Pysähdy heti mihin tahansa ja käske hänet ulos',
      'Kiihdytä päästäksesi määränpäähän ja lopettaaksesi matkan nopeammin',
    ],
    correctAnswer: 0,
    explanation:
      'De-escalation comes first: keep your voice level, avoid provoking replies and do not challenge the passenger. Stop where there are people and light rather than in an isolated spot, and call 112 if you feel threatened. Speeding adds a traffic risk to a personal-safety problem.',
    explanationFi:
      'Tilanteen rauhoittaminen on tärkeintä: pidä äänensävy tasaisena, vältä provosoivia vastauksia äläkä haasta matkustajaa. Pysähdy paikkaan, jossa on ihmisiä ja valoa, äläkä syrjäiseen paikkaan, ja soita 112, jos tunnet olosi uhatuksi. Ylinopeus lisää liikenneriskin henkilöturvallisuusongelman päälle.',
    reference: 'Traficom — taxi driver guidance, driver safety',
  },
  {
    id: 'ts-08',
    category: 'Passenger Safety & Accessibility',
    question:
      'What is the main reason a taxi driver should prefer card or mobile payment over cash at night?',
    questionFi:
      'Mikä on tärkein syy, miksi taksinkuljettajan kannattaa suosia kortti- tai mobiilimaksua käteisen sijaan yöaikaan?',
    options: [
      'Carrying little cash reduces the risk of robbery and violence against the driver',
      'Card payment is always cheaper for the customer',
      'Cash payments are prohibited in taxis after dark',
      'It removes the obligation to give a receipt',
    ],
    optionsFi: [
      'Vähäinen käteinen vähentää kuljettajaan kohdistuvan ryöstön ja väkivallan riskiä',
      'Korttimaksu on aina asiakkaalle halvempi',
      'Käteismaksu on taksissa kielletty pimeän tultua',
      'Se poistaa velvollisuuden antaa kuitti',
    ],
    correctAnswer: 0,
    explanation:
      'Working alone at night is the highest-risk part of the job, and a driver known to carry cash is a target. Minimising cash, keeping doors locked between trips and using in-car cameras and alarms are standard precautions. The receipt obligation applies to every payment method.',
    explanationFi:
      'Yksin työskentely yöllä on työn riskialttein osa, ja käteistä kantavaksi tiedetty kuljettaja on kohde. Käteisen minimointi, ovien lukitseminen matkojen välillä sekä auton kamerat ja hälyttimet ovat tavanomaisia varotoimia. Kuittivelvollisuus koskee jokaista maksutapaa.',
    reference: 'Traficom — taxi driver guidance, driver safety',
  },
  {
    id: 'ts-09',
    category: 'Passenger Safety & Accessibility',
    question:
      'A child aged about two is to travel in a taxi and no child restraint is available. What applies?',
    questionFi:
      'Noin kaksivuotias lapsi on tarkoitus kuljettaa taksilla, eikä lasten turvalaitetta ole saatavilla. Mitä sovelletaan?',
    options: [
      'A child under three must have an appropriate child restraint; without one the trip cannot be made',
      'Any child may travel on an adult’s lap in the rear seat',
      'The child may use the adult seat belt alone in the rear seat',
      'The rule only applies on motorways',
    ],
    optionsFi: [
      'Alle 3-vuotiaalla on oltava asianmukainen lasten turvalaite; ilman sitä matkaa ei voi tehdä',
      'Lapsi saa matkustaa aikuisen sylissä takapenkillä',
      'Lapsi saa käyttää pelkkää aikuisen turvavyötä takapenkillä',
      'Sääntö koskee vain moottoriteitä',
    ],
    correctAnswer: 0,
    explanation:
      'A child under three needs an approved restraint suited to their size — an adult belt or a lap will not hold a small child in a crash. Taxis do have an exception for older children travelling in the rear, but it never extends to the under-threes, so a suitable seat must be requested when booking.',
    explanationFi:
      'Alle 3-vuotias tarvitsee kokoonsa sopivan hyväksytyn turvalaitteen — aikuisen turvavyö tai syli ei pidä pientä lasta törmäyksessä. Takseja koskee poikkeus takapenkillä matkustavien isompien lasten osalta, mutta se ei koskaan ulotu alle 3-vuotiaisiin, joten sopiva istuin on tilattava jo varausvaiheessa.',
    reference: 'Tieliikennelaki 729/2018, 90 §',
  },
  {
    id: 'ts-10',
    category: 'Passenger Safety & Accessibility',
    question:
      'Where should a passenger using a wheelchair be positioned relative to the direction of travel?',
    questionFi: 'Mihin asentoon pyörätuolia käyttävä matkustaja tulee sijoittaa suhteessa ajosuuntaan?',
    options: [
      'Facing forward, with the head supported by a headrest',
      'Facing sideways, so entry and exit are easier',
      'Facing backwards, to reduce whiplash risk',
      'Any direction, as long as the wheelchair is anchored',
    ],
    optionsFi: [
      'Menosuuntaan, pää niskatuen tukemana',
      'Sivuttain, jotta sisään- ja uloskäynti on helpompaa',
      'Selkä menosuuntaan, niskavamman riskin vähentämiseksi',
      'Mihin tahansa suuntaan, kunhan pyörätuoli on kiinnitetty',
    ],
    correctAnswer: 0,
    explanation:
      'Forward-facing is the only orientation the anchoring systems and the vehicle structure are tested for, and it lets a headrest limit neck injury in a rear impact. Sideways seating exposes the passenger to unrestrained lateral movement in braking and cornering.',
    explanationFi:
      'Menosuunta on ainoa asento, jolle kiinnitysjärjestelmät ja auton rakenne on testattu, ja se antaa niskatuen rajoittaa niskavammaa peräänajossa. Sivuttainen asento altistaa matkustajan hallitsemattomalle sivuttaisliikkeelle jarrutuksessa ja kaarteissa.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-11',
    category: 'Passenger Safety & Accessibility',
    question:
      'What should a driver do before starting a trip with a passenger who has a memory disorder?',
    questionFi:
      'Mitä kuljettajan tulisi tehdä ennen matkan aloittamista muistisairaan matkustajan kanssa?',
    options: [
      'Confirm the destination calmly, check any accompanying documents and make sure the passenger is received at the destination',
      'Rely solely on the address given by the passenger and drop them at the kerb',
      'Ask the passenger to write the address down and follow it exactly',
      'Refuse the trip unless a carer travels with them',
    ],
    optionsFi: [
      'Varmista määränpää rauhallisesti, tarkista mahdolliset mukana olevat asiakirjat ja huolehdi, että matkustaja otetaan vastaan määränpäässä',
      'Luota pelkästään matkustajan antamaan osoitteeseen ja jätä hänet tien reunaan',
      'Pyydä matkustajaa kirjoittamaan osoite ylös ja noudata sitä tarkalleen',
      'Kieltäydy matkasta, ellei hoitaja matkusta mukana',
    ],
    correctAnswer: 0,
    explanation:
      'A passenger with a memory disorder may give an outdated address or forget the purpose of the trip, so confirm it against the booking or accompanying paperwork. Handing the passenger over at the destination — rather than leaving them at the kerb — is part of the duty of care in these trips.',
    explanationFi:
      'Muistisairas matkustaja saattaa antaa vanhentuneen osoitteen tai unohtaa matkan tarkoituksen, joten varmista se varauksesta tai mukana olevista asiakirjoista. Matkustajan luovuttaminen määränpäässä — sen sijaan että jättäisi hänet tien reunaan — kuuluu näiden matkojen huolellisuusvelvollisuuteen.',
    reference: 'Traficom — taxi driver guidance, special groups',
  },
  {
    id: 'ts-12',
    category: 'Passenger Safety & Accessibility',
    question: 'How should luggage be carried in a taxi?',
    questionFi: 'Miten matkatavarat tulee kuljettaa taksissa?',
    options: [
      'Secured in the luggage compartment, never loose on the parcel shelf or stacked above seat backs',
      'On the rear parcel shelf, where it is easy for the passenger to reach',
      'On the empty front passenger seat, unsecured',
      'Anywhere, provided the driver’s view to the front is clear',
    ],
    optionsFi: [
      'Kiinnitettyinä tavaratilaan, ei koskaan irrallaan hattuhyllyllä tai selkänojien yläpuolelle pinottuina',
      'Takahyllyllä, josta matkustajan on helppo ottaa ne',
      'Tyhjällä etumatkustajan istuimella ilman kiinnitystä',
      'Missä tahansa, kunhan kuljettajan näkyvyys eteen on esteetön',
    ],
    correctAnswer: 0,
    explanation:
      'Unsecured luggage becomes a projectile in a collision and can injure or kill an occupant. Load it in the boot, keep it below the level of the seat backs, and never place items on the parcel shelf where they also block the view through the rear window.',
    explanationFi:
      'Kiinnittämätön matkatavara muuttuu törmäyksessä heittäytyväksi kappaleeksi ja voi vammauttaa tai tappaa matkustajan. Lastaa se tavaratilaan, pidä se selkänojien tason alapuolella äläkä koskaan aseta tavaroita hattuhyllylle, jossa ne myös estävät näkyvyyden takaikkunasta.',
    reference: 'Tieliikennelaki 729/2018, 106 §',
  },

  // ---------------------------------------------------------------------------
  // LEGISLATION & TAXI RULES — 12
  // ---------------------------------------------------------------------------
  {
    id: 'tl-01',
    category: 'Legislation & Taxi Rules',
    question: 'Which permit must a person hold in order to drive a taxi in Finland?',
    questionFi: 'Mikä lupa henkilöllä on oltava, jotta hän saa kuljettaa taksia Suomessa?',
    options: [
      'A taxi driver’s licence (taksinkuljettajan ajolupa) granted by Traficom',
      'A taxi transport operator licence (taksiliikennelupa)',
      'A category D driving licence',
      'A professional driver qualification card (CPC) for buses',
    ],
    optionsFi: [
      'Traficomin myöntämä taksinkuljettajan ajolupa',
      'Taksiliikennelupa',
      'D-luokan ajokortti',
      'Linja-autonkuljettajan ammattipätevyyskortti (CPC)',
    ],
    correctAnswer: 0,
    explanation:
      'The driver needs a taksinkuljettajan ajolupa from Traficom. The taksiliikennelupa is a different permit, held by the business operating the service. A taxi is driven on a category B licence — a D licence and bus CPC belong to passenger-service vehicles carrying more than nine people.',
    explanationFi:
      'Kuljettaja tarvitsee Traficomin myöntämän taksinkuljettajan ajoluvan. Taksiliikennelupa on eri lupa, joka on palvelua harjoittavalla yrityksellä. Taksia ajetaan B-luokan ajokortilla — D-luokka ja linja-auton ammattipätevyys kuuluvat yli yhdeksän henkilön ajoneuvoille.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku',
  },
  {
    id: 'tl-02',
    category: 'Legislation & Taxi Rules',
    question: 'What are the main prerequisites for being granted a taxi driver’s licence?',
    questionFi: 'Mitkä ovat taksinkuljettajan ajoluvan myöntämisen keskeiset edellytykset?',
    options: [
      'At least 18 years old, a category B licence held for at least a year, health requirements met, and a passed taxi driver examination',
      'At least 21 years old and five years of driving experience',
      'A category B licence and a completed first aid course only',
      'A category C licence and two years of professional driving',
    ],
    optionsFi: [
      'Vähintään 18 vuoden ikä, B-luokan ajokortti vähintään vuoden ajan, terveysvaatimusten täyttyminen ja hyväksytysti suoritettu taksinkuljettajakoe',
      'Vähintään 21 vuoden ikä ja viisi vuotta ajokokemusta',
      'Pelkkä B-luokan ajokortti ja suoritettu ensiapukurssi',
      'C-luokan ajokortti ja kaksi vuotta ammattimaista ajoa',
    ],
    correctAnswer: 0,
    explanation:
      'The applicant must be at least 18, have held a category B licence for at least one year, meet the medical requirements for professional driving, pass the taxi driver examination, and be judged suitable in a background check. The licence is granted by Traficom.',
    explanationFi:
      'Hakijan on oltava vähintään 18-vuotias, hänellä on oltava B-luokan ajokortti vähintään vuoden ajalta, hänen on täytettävä ammattimaisen ajon terveysvaatimukset, suoritettava taksinkuljettajakoe hyväksytysti ja hänet on taustan perusteella arvioitava sopivaksi. Luvan myöntää Traficom.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku 25 §',
  },
  {
    id: 'tl-03',
    category: 'Legislation & Taxi Rules',
    question: 'For how long is a taxi driver’s licence valid?',
    questionFi: 'Kuinka kauan taksinkuljettajan ajolupa on voimassa?',
    options: ['Five years', 'Two years', 'Ten years', 'Indefinitely, once granted'],
    optionsFi: [
      'Viisi vuotta',
      'Kaksi vuotta',
      'Kymmenen vuotta',
      'Toistaiseksi, kun se on kerran myönnetty',
    ],
    correctAnswer: 0,
    explanation:
      'The licence runs for five years and must be renewed, which keeps the medical and suitability requirements under periodic review. Apply before it expires — driving a taxi on a lapsed licence is unlawful.',
    explanationFi:
      'Ajolupa on voimassa viisi vuotta ja se on uusittava, mikä pitää terveys- ja sopivuusvaatimukset säännöllisessä tarkastelussa. Hae uusimista ennen voimassaolon päättymistä — taksin ajaminen vanhentuneella luvalla on laitonta.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku',
  },
  {
    id: 'tl-04',
    category: 'Legislation & Taxi Rules',
    question: 'What must be told to the customer about the price before the trip begins?',
    questionFi: 'Mitä asiakkaalle on kerrottava hinnasta ennen matkan alkamista?',
    options: [
      'The total price, or when that is not possible, the basis of pricing and the maximum total price',
      'Nothing — the taximeter reading at the end is sufficient',
      'Only the starting fee',
      'Only the price per kilometre',
    ],
    optionsFi: [
      'Matkan kokonaishinta tai, jos se ei ole mahdollista, hinnoitteluperuste ja enimmäiskokonaishinta',
      'Ei mitään — taksamittarin lukema matkan lopussa riittää',
      'Vain perusmaksu',
      'Vain kilometrihinta',
    ],
    correctAnswer: 0,
    explanation:
      'Price transparency is a core duty: the customer must know the total price before the trip, or where distance and time make that impossible, the pricing basis together with a maximum total price. A price disclosed only at the destination does not meet the requirement.',
    explanationFi:
      'Hinnan läpinäkyvyys on keskeinen velvollisuus: asiakkaan on tiedettävä kokonaishinta ennen matkaa, tai jos matka ja aika tekevät sen mahdottomaksi, hinnoitteluperuste sekä enimmäiskokonaishinta. Vasta määränpäässä ilmoitettu hinta ei täytä vaatimusta.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku 15 a §',
  },
  {
    id: 'tl-05',
    category: 'Legislation & Taxi Rules',
    question: 'When must a receipt be given to a taxi customer?',
    questionFi: 'Milloin taksiasiakkaalle on annettava kuitti?',
    options: [
      'Always, for every trip and every payment method',
      'Only when the customer asks for one',
      'Only for trips paid in cash',
      'Only for trips costing more than 50 euros',
    ],
    optionsFi: [
      'Aina, jokaisesta matkasta ja jokaisella maksutavalla',
      'Vain, kun asiakas pyytää sitä',
      'Vain käteisellä maksetuista matkoista',
      'Vain yli 50 euron matkoista',
    ],
    correctAnswer: 0,
    explanation:
      'A receipt must be issued for every journey regardless of how it was paid, and it must show the details required of it, including the price and the trip. It is both a consumer protection measure and the basis for tax supervision of the sector.',
    explanationFi:
      'Kuitti on annettava jokaisesta matkasta riippumatta siitä, miten se maksettiin, ja siinä on oltava vaaditut tiedot, kuten hinta ja matka. Se on sekä kuluttajansuojatoimi että alan verovalvonnan perusta.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku',
  },
  {
    id: 'tl-06',
    category: 'Legislation & Taxi Rules',
    question: 'What must be visible or available to the customer inside the taxi?',
    questionFi: 'Mitä taksin sisällä on oltava asiakkaan nähtävillä tai saatavilla?',
    options: [
      'The driver’s identifying details and the pricing information required by law',
      'The driver’s home address and telephone number',
      'The operator’s tax records',
      'Nothing — all information is provided only on request',
    ],
    optionsFi: [
      'Kuljettajan yksilöintitiedot ja laissa vaaditut hintatiedot',
      'Kuljettajan kotiosoite ja puhelinnumero',
      'Liikenteenharjoittajan verotustiedot',
      'Ei mitään — kaikki tiedot annetaan vain pyynnöstä',
    ],
    correctAnswer: 0,
    explanation:
      'The passenger must be able to see who is driving and on what terms: identifying details of the driver and the required pricing information have to be displayed where the customer can see them. Personal data beyond that, such as a home address, is not disclosed.',
    explanationFi:
      'Matkustajan on voitava nähdä, kuka ajaa ja millä ehdoilla: kuljettajan yksilöintitiedot ja vaaditut hintatiedot on esitettävä paikassa, jossa asiakas ne näkee. Muita henkilötietoja, kuten kotiosoitetta, ei luovuteta.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku 15 a §',
  },
  {
    id: 'tl-07',
    category: 'Legislation & Taxi Rules',
    question: 'What is the blood alcohol limit that applies to a taxi driver at work?',
    questionFi: 'Mikä veren alkoholiraja koskee työssä olevaa taksinkuljettajaa?',
    options: [
      '0.5 ‰, the same statutory limit as for any driver, though the professional standard is zero',
      '0.2 ‰, a special limit for professional drivers',
      '0.8 ‰, because professional drivers are more experienced',
      'There is no limit while the taxi is not carrying passengers',
    ],
    optionsFi: [
      '0,5 ‰, sama lakisääteinen raja kuin kaikilla kuljettajilla, vaikka ammatillinen normi on nolla',
      '0,2 ‰, ammattikuljettajien erityisraja',
      '0,8 ‰, koska ammattikuljettajat ovat kokeneempia',
      'Rajaa ei ole, kun taksissa ei ole matkustajia',
    ],
    correctAnswer: 0,
    explanation:
      'The offence threshold is 0.5 ‰ for every driver. For a professional carrying paying passengers, the only defensible working standard is zero — a conviction also puts the driver’s licence, and therefore their livelihood, at risk.',
    explanationFi:
      'Rattijuopumuksen raja on 0,5 ‰ jokaisella kuljettajalla. Maksavia matkustajia kuljettavalle ammattilaiselle ainoa puolustettava työnormi on nolla — tuomio vaarantaa myös ajoluvan ja siten toimeentulon.',
    reference: 'Rikoslaki 39/1889, 23 luku 3 §',
  },
  {
    id: 'tl-08',
    category: 'Legislation & Taxi Rules',
    question: 'What must the driver do if a passenger leaves property behind in the taxi?',
    questionFi: 'Mitä kuljettajan on tehtävä, jos matkustaja unohtaa omaisuuttaan taksiin?',
    options: [
      'Take reasonable steps to return it to the owner, and otherwise hand it to the police or a lost property office',
      'Keep it for a month and then dispose of it freely',
      'Leave it at the nearest taxi stand',
      'Discard it, since the passenger is responsible for their own belongings',
    ],
    optionsFi: [
      'Ryhtyä kohtuullisiin toimiin sen palauttamiseksi omistajalle ja muutoin toimittaa se poliisille tai löytötavaratoimistoon',
      'Säilyttää se kuukauden ja hävittää sen jälkeen vapaasti',
      'Jättää se lähimmälle taksiasemalle',
      'Heittää se pois, koska matkustaja vastaa omista tavaroistaan',
    ],
    correctAnswer: 0,
    explanation:
      'Found property must be returned to its owner where they can be identified — often straightforward with a booking record — and otherwise passed to the police or a lost property office without undue delay. Keeping or discarding it is unlawful.',
    explanationFi:
      'Löytötavara on palautettava omistajalleen, kun tämä voidaan tunnistaa — usein helppoa varaustietojen avulla — ja muutoin toimitettava poliisille tai löytötavaratoimistoon ilman aiheetonta viivytystä. Sen pitäminen tai hävittäminen on laitonta.',
    reference: 'Löytötavaralaki 778/1988',
  },
  {
    id: 'tl-09',
    category: 'Legislation & Taxi Rules',
    question: 'A trip is priced on the basis of distance and time. What does the vehicle need?',
    questionFi: 'Matka hinnoitellaan matkan ja ajan perusteella. Mitä ajoneuvossa on oltava?',
    options: [
      'A taximeter, so the price is formed and shown in a verifiable way',
      'Nothing beyond the driver’s own estimate',
      'A printed price list only',
      'A tachograph of the type used in heavy vehicles',
    ],
    optionsFi: [
      'Taksamittari, jotta hinta muodostuu ja näytetään todennettavalla tavalla',
      'Ei mitään kuljettajan oman arvion lisäksi',
      'Vain painettu hinnasto',
      'Raskaissa ajoneuvoissa käytettävä ajopiirturi',
    ],
    correctAnswer: 0,
    explanation:
      'When the price depends on distance or time, a taximeter is required so that the fare is formed transparently and can be verified. A fixed price agreed in advance may instead be handled with another suitable device or system. A tachograph is heavy-vehicle equipment and unrelated.',
    explanationFi:
      'Kun hinta riippuu matkasta tai ajasta, tarvitaan taksamittari, jotta maksu muodostuu läpinäkyvästi ja voidaan todentaa. Ennalta sovittu kiinteä hinta voidaan sen sijaan hoitaa muulla soveltuvalla laitteella tai järjestelmällä. Ajopiirturi on raskaan kaluston laite eikä liity tähän.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku 15 a §',
  },
  {
    id: 'tl-10',
    category: 'Legislation & Taxi Rules',
    question: 'The taxi driver’s licence is due to expire next month. What should the driver do?',
    questionFi: 'Taksinkuljettajan ajolupa on umpeutumassa ensi kuussa. Mitä kuljettajan tulee tehdä?',
    options: [
      'Apply for renewal in good time and stop driving a taxi if it expires before the new one is granted',
      'Continue driving — there is a three-month grace period after expiry',
      'Continue driving as long as the renewal application has been submitted',
      'Nothing — Traficom renews the licence automatically',
    ],
    optionsFi: [
      'Hakea uusimista hyvissä ajoin ja lopettaa taksin ajaminen, jos lupa umpeutuu ennen uuden myöntämistä',
      'Jatkaa ajamista — umpeutumisen jälkeen on kolmen kuukauden lisäaika',
      'Jatkaa ajamista, kunhan uusimishakemus on jätetty',
      'Ei mitään — Traficom uusii luvan automaattisesti',
    ],
    correctAnswer: 0,
    explanation:
      'There is no grace period and no automatic renewal: once the licence expires the driver is no longer entitled to drive a taxi, and doing so is an offence that also voids the operator’s insurance position. Apply early enough that the new licence is in hand before the old one lapses.',
    explanationFi:
      'Lisäaikaa ei ole eikä lupaa uusita automaattisesti: kun lupa umpeutuu, kuljettajalla ei ole enää oikeutta ajaa taksia, ja ajaminen on rikkomus, joka mitätöi myös liikenteenharjoittajan vakuutusaseman. Hae niin ajoissa, että uusi lupa on kädessä ennen vanhan umpeutumista.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku',
  },
  {
    id: 'tl-11',
    category: 'Legislation & Taxi Rules',
    question: 'Why are a taxi driver’s working hours and rest periods regulated?',
    questionFi: 'Miksi taksinkuljettajan työaikaa ja lepoaikoja säädellään?',
    options: [
      'Because fatigue impairs reaction time and judgement, endangering passengers and other road users',
      'Only to make payroll calculation easier',
      'Because taxis are subject to EU heavy-vehicle tachograph rules',
      'They are not regulated at all for taxi drivers',
    ],
    optionsFi: [
      'Koska väsymys heikentää reaktioaikaa ja arviointikykyä ja vaarantaa matkustajat ja muut tienkäyttäjät',
      'Vain palkanlaskennan helpottamiseksi',
      'Koska takseja koskevat EU:n raskaan kaluston ajopiirturisäännöt',
      'Niitä ei säädellä lainkaan taksinkuljettajilla',
    ],
    correctAnswer: 0,
    explanation:
      'Working time rules exist for road safety: a fatigued driver has reaction times comparable to an intoxicated one, and microsleeps happen without warning. Taxis are not governed by the EU heavy-vehicle driving-time regime, but Finnish working time legislation and the employer’s duty of care still apply.',
    explanationFi:
      'Työaikasäännöt ovat olemassa liikenneturvallisuuden vuoksi: väsyneen kuljettajan reaktioajat vastaavat päihtyneen reaktioaikoja, ja mikrounet tulevat varoittamatta. Takseja eivät koske EU:n raskaan kaluston ajoaikasäännöt, mutta Suomen työaikalainsäädäntö ja työnantajan huolehtimisvelvollisuus koskevat silti.',
    reference: 'Työaikalaki 872/2019; Traficom — taxi driver guidance',
  },
  {
    id: 'tl-12',
    category: 'Legislation & Taxi Rules',
    question:
      'A customer disputes the fare at the end of the trip and refuses to pay. How should the driver act?',
    questionFi:
      'Asiakas kiistää maksun matkan lopussa ja kieltäytyy maksamasta. Miten kuljettajan tulee toimia?',
    options: [
      'Stay calm, show the pricing basis and the receipt, and settle the matter through the operator or the police rather than by confrontation',
      'Prevent the passenger from leaving the vehicle until they pay',
      'Take an item of the passenger’s property as security',
      'Threaten to report them and drive them to a police station',
    ],
    optionsFi: [
      'Pysyä rauhallisena, näyttää hinnoitteluperuste ja kuitti sekä selvittää asia liikenteenharjoittajan tai poliisin kautta eikä vastakkainasettelulla',
      'Estää matkustajaa poistumasta autosta, kunnes hän maksaa',
      'Ottaa jokin matkustajan omaisuus pantiksi',
      'Uhata ilmoittaa hänet ja ajaa hänet poliisiasemalle',
    ],
    correctAnswer: 0,
    explanation:
      'Explaining the pricing basis and issuing the receipt usually resolves the dispute; if it does not, it is a civil debt to be pursued through the operator or, where the intent was clearly fraudulent, reported to the police. Detaining a passenger or seizing their property is unlawful and turns a payment dispute into a criminal matter for the driver.',
    explanationFi:
      'Hinnoitteluperusteen selittäminen ja kuitin antaminen ratkaisee riidan yleensä; jos ei, kyseessä on siviilioikeudellinen saatava, joka peritään liikenteenharjoittajan kautta tai, jos tarkoitus oli selvästi vilpillinen, ilmoitetaan poliisille. Matkustajan pidättäminen tai hänen omaisuutensa haltuunotto on laitonta ja muuttaa maksuriidan kuljettajan rikosasiaksi.',
    reference: 'Laki liikenteen palveluista 320/2017; Rikoslaki 39/1889',
  },

  // ---------------------------------------------------------------------------
  // CUSTOMER SERVICE & NAVIGATION — 12
  // ---------------------------------------------------------------------------
  {
    id: 'tc-01',
    category: 'Customer Service & Navigation',
    question: 'Which route should the driver take when the customer gives no instructions?',
    questionFi: 'Minkä reitin kuljettajan tulee valita, kun asiakas ei anna ohjeita?',
    options: [
      'The route that is most reasonable in terms of distance, time and cost for the customer',
      'The longest route, since the meter earns more',
      'Always the shortest route by distance, whatever the traffic',
      'Whichever route the driver personally prefers',
    ],
    optionsFi: [
      'Reitin, joka on asiakkaalle kohtuullisin matkan, ajan ja hinnan kannalta',
      'Pisimmän reitin, koska mittari tuottaa enemmän',
      'Aina lyhyimmän reitin matkaltaan, liikenteestä riippumatta',
      'Sen reitin, jonka kuljettaja henkilökohtaisesti mieluiten valitsee',
    ],
    correctAnswer: 0,
    explanation:
      'The customer is entitled to a sensible route: the one that best balances distance, time and cost in the prevailing traffic. That is not always the shortest by distance — a longer but free-flowing route can be cheaper and quicker. If you take a diversion, explain why before doing so.',
    explanationFi:
      'Asiakkaalla on oikeus järkevään reittiin: siihen, joka parhaiten tasapainottaa matkan, ajan ja hinnan vallitsevassa liikenteessä. Se ei ole aina lyhyin matkaltaan — pidempi mutta sujuva reitti voi olla halvempi ja nopeampi. Jos teet kiertoreitin, selitä syy ennen sitä.',
    reference: 'Laki liikenteen palveluista 320/2017; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-02',
    category: 'Customer Service & Navigation',
    question:
      'The customer asks for a specific route that the driver knows is slower and more expensive. What should the driver do?',
    questionFi:
      'Asiakas pyytää tiettyä reittiä, jonka kuljettaja tietää olevan hitaampi ja kalliimpi. Mitä kuljettajan tulee tehdä?',
    options: [
      'Explain the alternative and the likely cost difference, then follow the customer’s wish if they still prefer it',
      'Refuse the trip',
      'Silently take the route the driver considers best',
      'Follow the customer’s route without comment and charge extra for the inconvenience',
    ],
    optionsFi: [
      'Selittää vaihtoehto ja todennäköinen hintaero ja noudattaa sitten asiakkaan toivetta, jos hän edelleen haluaa niin',
      'Kieltäytyä matkasta',
      'Ajaa hiljaa reitti, jota kuljettaja pitää parhaana',
      'Noudattaa asiakkaan reittiä kommentoimatta ja veloittaa lisämaksu vaivasta',
    ],
    correctAnswer: 0,
    explanation:
      'The customer decides the route, but professional service means they decide with the facts: state the alternative and roughly what it saves. If they still prefer their route, drive it. Overriding the customer silently, or adding an unagreed charge, breaches the trust the fare rests on.',
    explanationFi:
      'Asiakas päättää reitin, mutta ammattimainen palvelu tarkoittaa, että hän päättää tosiasioiden pohjalta: kerro vaihtoehto ja suunnilleen mitä se säästää. Jos hän edelleen haluaa oman reittinsä, aja se. Asiakkaan ohittaminen hiljaa tai sopimattoman lisämaksun lisääminen rikkoo luottamuksen, jolle maksu perustuu.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-03',
    category: 'Customer Service & Navigation',
    question: 'What is the rule for picking up passengers at a taxi stand (taksiasema)?',
    questionFi: 'Mikä sääntö koskee matkustajien ottamista taksiasemalta?',
    options: [
      'Vehicles are taken in queue order, with the first taxi in line taking the next customer',
      'The newest and cleanest vehicle takes the customer first',
      'Any driver may take any customer at any time',
      'The driver who has waited the shortest time goes first',
    ],
    optionsFi: [
      'Autot otetaan jonojärjestyksessä, ja jonon ensimmäinen taksi ottaa seuraavan asiakkaan',
      'Uusin ja siistein auto ottaa asiakkaan ensin',
      'Kuka tahansa kuljettaja saa ottaa kenet tahansa asiakkaan milloin tahansa',
      'Vähiten aikaa odottanut kuljettaja menee ensin',
    ],
    correctAnswer: 0,
    explanation:
      'Taxi stands operate on strict queue order — the vehicle at the head of the line takes the next passenger. Jumping the queue is unprofessional and causes disputes. The passenger nevertheless has the right to choose a different vehicle, for example one meeting an accessibility need.',
    explanationFi:
      'Taksiasemat toimivat tiukassa jonojärjestyksessä — jonon kärjessä oleva auto ottaa seuraavan matkustajan. Jonon ohittaminen on epäammattimaista ja aiheuttaa riitoja. Matkustajalla on silti oikeus valita toinen auto, esimerkiksi esteettömyystarpeeseen sopiva.',
    reference: 'Traficom — taxi driver guidance; local taxi stand rules',
  },
  {
    id: 'tc-04',
    category: 'Customer Service & Navigation',
    question: 'How should a driver behave when a customer complains about the service?',
    questionFi: 'Miten kuljettajan tulee toimia, kun asiakas valittaa palvelusta?',
    options: [
      'Listen without interrupting, apologise for the experience and explain how the complaint can be taken forward',
      'Explain immediately why the customer is mistaken',
      'Ignore the complaint and end the trip quickly',
      'Offer a discount to end the conversation, whatever the issue',
    ],
    optionsFi: [
      'Kuunnella keskeyttämättä, pahoitella kokemusta ja kertoa, miten valituksen voi viedä eteenpäin',
      'Selittää heti, miksi asiakas on väärässä',
      'Sivuuttaa valitus ja lopettaa matka nopeasti',
      'Tarjota alennus keskustelun lopettamiseksi, olipa asia mikä tahansa',
    ],
    correctAnswer: 0,
    explanation:
      'Letting the customer finish, acknowledging the experience and directing them to the operator’s complaints process defuses most disputes. Arguing entrenches the position, and buying silence with a discount leaves the underlying problem — and any genuine safety issue — unaddressed.',
    explanationFi:
      'Kun antaa asiakkaan puhua loppuun, myöntää kokemuksen ja ohjaa hänet liikenteenharjoittajan valitusprosessiin, useimmat riidat laukeavat. Väittely lukitsee asemat, ja hiljaisuuden ostaminen alennuksella jättää taustalla olevan ongelman — ja mahdollisen todellisen turvallisuuspuutteen — käsittelemättä.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-05',
    category: 'Customer Service & Navigation',
    question: 'What is the professional standard for a driver’s conduct and appearance at work?',
    questionFi: 'Mikä on ammatillinen normi kuljettajan käytökselle ja ulkoasulle työssä?',
    options: [
      'Clean and appropriate dress, a tidy vehicle, courteous language and no smoking in the car',
      'Whatever the driver prefers, as long as the trip is completed',
      'Formal business dress is legally required',
      'Appearance matters only for pre-booked corporate customers',
    ],
    optionsFi: [
      'Siisti ja asianmukainen pukeutuminen, siisti auto, kohtelias kielenkäyttö eikä tupakointia autossa',
      'Mitä tahansa kuljettaja haluaa, kunhan matka saadaan tehtyä',
      'Muodollinen liikepukeutuminen on lakisääteisesti pakollista',
      'Ulkoasulla on merkitystä vain ennalta varatuille yritysasiakkaille',
    ],
    correctAnswer: 0,
    explanation:
      'The driver is the visible face of the service and often alone with the customer, so clean and appropriate dress, a tidy odour-free vehicle and courteous language are the baseline. Smoking in a taxi is not acceptable — it is a workplace and a public service vehicle.',
    explanationFi:
      'Kuljettaja on palvelun näkyvät kasvot ja usein kahden asiakkaan kanssa, joten siisti ja asianmukainen pukeutuminen, siisti ja hajuton auto sekä kohtelias kielenkäyttö ovat lähtötaso. Tupakointi taksissa ei ole hyväksyttävää — se on työpaikka ja julkinen kulkuneuvo.',
    reference: 'Traficom — taxi driver guidance, professional conduct',
  },
  {
    id: 'tc-06',
    category: 'Customer Service & Navigation',
    question:
      'A customer wants to talk at length while the driver is negotiating heavy traffic. What is appropriate?',
    questionFi:
      'Asiakas haluaa jutella pitkään, kun kuljettaja ajaa vilkkaassa liikenteessä. Mikä on asianmukaista?',
    options: [
      'Respond politely but keep full attention on driving, letting the conversation lapse where necessary',
      'Keep the conversation going at all costs to satisfy the customer',
      'Tell the customer to be quiet',
      'Put on loud music to end the conversation',
    ],
    optionsFi: [
      'Vastata kohteliaasti mutta pitää täysi huomio ajamisessa ja antaa keskustelun hiipua tarvittaessa',
      'Pitää keskustelu käynnissä hinnalla millä hyvänsä asiakkaan tyydyttämiseksi',
      'Käskeä asiakasta olemaan hiljaa',
      'Laittaa kova musiikki keskustelun lopettamiseksi',
    ],
    correctAnswer: 0,
    explanation:
      'Customer service never outranks safety. A brief, polite reply and a return of attention to the road is understood by any reasonable passenger, whereas sustained conversation in demanding traffic is a genuine distraction. Bluntness or loud music is simply poor service.',
    explanationFi:
      'Asiakaspalvelu ei koskaan mene turvallisuuden edelle. Lyhyt kohtelias vastaus ja huomion palauttaminen tiehen on jokaisen järkevän matkustajan ymmärrettävissä, kun taas jatkuva keskustelu vaativassa liikenteessä on todellinen häiriötekijä. Töykeys tai kova musiikki on yksinkertaisesti huonoa palvelua.',
    reference: 'Tieliikennelaki 729/2018, 3 §; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-07',
    category: 'Customer Service & Navigation',
    question:
      'Why should a taxi driver maintain local knowledge rather than rely entirely on satellite navigation?',
    questionFi:
      'Miksi taksinkuljettajan tulisi ylläpitää paikallistuntemusta eikä luottaa täysin satelliittinavigaattoriin?',
    options: [
      'Navigation devices miss road works, temporary closures, event traffic and access details at the destination',
      'Satellite navigation is prohibited in taxis',
      'Local knowledge lets the driver charge a higher fare',
      'Navigation devices are unreliable in Finland',
    ],
    optionsFi: [
      'Navigaattorit eivät huomaa tietöitä, tilapäisiä sulkuja, tapahtumaliikennettä eivätkä määränpään kulkuyksityiskohtia',
      'Satelliittinavigaatio on kielletty takseissa',
      'Paikallistuntemus antaa kuljettajan veloittaa korkeamman maksun',
      'Navigaattorit ovat Suomessa epäluotettavia',
    ],
    correctAnswer: 0,
    explanation:
      'Navigation is a tool, not a substitute for knowing the area. It rarely accounts for road works, closures, event traffic, or which entrance a hospital, terminal or hotel actually uses. Local knowledge is what turns a technically correct route into a good one.',
    explanationFi:
      'Navigaattori on työkalu, ei korvaa alueen tuntemista. Se harvoin ottaa huomioon tietöitä, sulkuja, tapahtumaliikennettä tai sitä, mitä sisäänkäyntiä sairaala, terminaali tai hotelli todella käyttää. Paikallistuntemus tekee teknisesti oikeasta reitistä hyvän.',
    reference: 'Traficom — taxi driver guidance, route selection',
  },
  {
    id: 'tc-08',
    category: 'Customer Service & Navigation',
    question: 'How should the driver handle information learned about a customer during a trip?',
    questionFi: 'Miten kuljettajan tulee käsitellä matkan aikana asiakkaasta saatuja tietoja?',
    options: [
      'Treat it as confidential and not pass it on or discuss it elsewhere',
      'Share it freely, since nothing was agreed in writing',
      'Discuss it with other drivers as long as no name is used',
      'Publish it on social media if it is entertaining',
    ],
    optionsFi: [
      'Käsitellä ne luottamuksellisina eikä välittää tai puhua niistä muualla',
      'Jakaa ne vapaasti, koska mitään ei sovittu kirjallisesti',
      'Keskustella niistä muiden kuljettajien kanssa, kunhan nimeä ei käytetä',
      'Julkaista ne sosiaalisessa mediassa, jos ne ovat viihdyttäviä',
    ],
    correctAnswer: 0,
    explanation:
      'Passengers speak freely in a taxi and often discuss health, finances or private matters. Destinations alone can be sensitive — a clinic, a lawyer, a shelter. Confidentiality is a professional obligation, and personal data is additionally protected by data protection law.',
    explanationFi:
      'Matkustajat puhuvat taksissa vapaasti ja käsittelevät usein terveyttä, taloutta tai yksityisasioita. Jo määränpää voi olla arkaluonteinen — klinikka, lakimies, turvakoti. Luottamuksellisuus on ammatillinen velvollisuus, ja henkilötietoja suojaa lisäksi tietosuojalainsäädäntö.',
    reference: 'Tietosuoja-asetus (EU) 2016/679; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-09',
    category: 'Customer Service & Navigation',
    question:
      'A customer is clearly intoxicated but calm and wants to travel home. What is the professional approach?',
    questionFi:
      'Asiakas on selvästi päihtynyt mutta rauhallinen ja haluaa matkustaa kotiin. Mikä on ammattimainen toimintatapa?',
    options: [
      'Carry them normally, confirm the destination clearly and make sure they get out safely',
      'Refuse the trip because they are intoxicated',
      'Carry them but demand payment in advance in every case',
      'Take them to a police station instead',
    ],
    optionsFi: [
      'Kuljettaa hänet normaalisti, varmistaa määränpää selkeästi ja huolehtia, että hän pääsee turvallisesti ulos',
      'Kieltäytyä matkasta, koska hän on päihtynyt',
      'Kuljettaa hänet mutta vaatia maksu etukäteen joka tapauksessa',
      'Viedä hänet sen sijaan poliisiasemalle',
    ],
    correctAnswer: 0,
    explanation:
      'Getting intoxicated people home safely is part of the social function of a taxi, and a calm passenger is carried normally. Confirm the destination while they can still give it clearly and make sure they leave the vehicle safely. Refusal is reserved for genuine threats to safety or the vehicle.',
    explanationFi:
      'Päihtyneiden turvallinen kotiin saattaminen kuuluu taksin yhteiskunnalliseen tehtävään, ja rauhallinen matkustaja kuljetetaan normaalisti. Varmista määränpää, kun hän vielä voi kertoa sen selkeästi, ja huolehdi, että hän poistuu autosta turvallisesti. Kieltäytyminen on varattu todellisiin turvallisuuden tai auton uhkiin.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-10',
    category: 'Customer Service & Navigation',
    question: 'The driver will arrive noticeably late for a pre-booked pickup. What should be done?',
    questionFi: 'Kuljettaja saapuu selvästi myöhässä ennalta varattuun noutoon. Mitä tulee tehdä?',
    options: [
      'Inform the customer as early as possible and give a realistic new arrival time',
      'Say nothing and drive faster to make up the time',
      'Cancel the booking without explanation',
      'Arrive late and explain only if the customer complains',
    ],
    optionsFi: [
      'Ilmoittaa asiakkaalle mahdollisimman aikaisin ja antaa realistinen uusi saapumisaika',
      'Olla sanomatta mitään ja ajaa kovempaa ajan kiinni saamiseksi',
      'Perua varaus ilman selitystä',
      'Saapua myöhässä ja selittää vasta, jos asiakas valittaa',
    ],
    correctAnswer: 0,
    explanation:
      'An early, honest message lets the customer decide what to do — wait, or make another arrangement — and that is what preserves trust. Driving faster to recover lost minutes converts a service problem into a safety one, which is never an acceptable trade.',
    explanationFi:
      'Aikainen ja rehellinen viesti antaa asiakkaan päättää, mitä tehdä — odottaa vai järjestää toisin — ja juuri se säilyttää luottamuksen. Kovempaa ajaminen menetettyjen minuuttien kiinni saamiseksi muuttaa palveluongelman turvallisuusongelmaksi, mikä ei ole koskaan hyväksyttävä vaihtokauppa.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-11',
    category: 'Customer Service & Navigation',
    question: 'How should the destination and route be confirmed at the start of a trip?',
    questionFi: 'Miten määränpää ja reitti tulisi varmistaa matkan alussa?',
    options: [
      'Repeat the destination back to the customer and agree the route or pricing basis before setting off',
      'Set off immediately and ask for details on the way',
      'Rely on the address in the booking system without mentioning it',
      'Ask the customer to enter the address into the navigation device themselves',
    ],
    optionsFi: [
      'Toistaa määränpää asiakkaalle ja sopia reitti tai hinnoitteluperuste ennen liikkeelle lähtöä',
      'Lähteä heti liikkeelle ja kysyä yksityiskohdat matkalla',
      'Luottaa varausjärjestelmän osoitteeseen mainitsematta sitä',
      'Pyytää asiakasta itse syöttämään osoite navigaattoriin',
    ],
    correctAnswer: 0,
    explanation:
      'Repeating the destination back catches mishearings and outdated booking addresses before they cost time and money, and agreeing the route or pricing basis at the same moment prevents the most common fare dispute. It takes a few seconds and resolves both risks at once.',
    explanationFi:
      'Määränpään toistaminen paljastaa väärinkuulemiset ja vanhentuneet varausosoitteet ennen kuin ne maksavat aikaa ja rahaa, ja reitistä tai hinnoitteluperusteesta sopiminen samalla hetkellä estää yleisimmän maksuriidan. Se vie muutaman sekunnin ja ratkaisee molemmat riskit kerralla.',
    reference: 'Laki liikenteen palveluista 320/2017; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-12',
    category: 'Customer Service & Navigation',
    question:
      'A customer with reduced mobility asks to be dropped somewhere other than the exact address, closer to a step-free entrance. How should the driver respond?',
    questionFi:
      'Liikuntarajoitteinen asiakas pyytää jättämään hänet muualle kuin tarkkaan osoitteeseen, lähemmäs esteetöntä sisäänkäyntiä. Miten kuljettajan tulee vastata?',
    options: [
      'Accommodate the request where it is legal and safe to stop, since the usable entrance is what matters',
      'Refuse, because the booking specifies the address',
      'Charge an additional fee for the change',
      'Drop them at the address and let them walk around the building',
    ],
    optionsFi: [
      'Täyttää pyyntö siellä, missä pysähtyminen on laillista ja turvallista, koska käytettävissä oleva sisäänkäynti on olennainen',
      'Kieltäytyä, koska varaus määrittää osoitteen',
      'Veloittaa lisämaksu muutoksesta',
      'Jättää hänet osoitteeseen ja antaa hänen kävellä rakennuksen ympäri',
    ],
    correctAnswer: 0,
    explanation:
      'Reaching an entrance the passenger can actually use is the point of the journey. Accommodate it wherever stopping is legal and safe. Stopping is permitted for setting down passengers in many places where parking is not, but never where it blocks a crossing, a cycle lane or a junction.',
    explanationFi:
      'Matkan tarkoitus on päästä sisäänkäynnille, jota matkustaja voi todella käyttää. Täytä pyyntö aina, kun pysähtyminen on laillista ja turvallista. Matkustajan jättäminen on sallittua monissa paikoissa, joissa pysäköinti ei ole, mutta ei koskaan siellä, missä se tukkii suojatien, pyörätien tai risteyksen.',
    reference: 'Tieliikennelaki 729/2018, 37–38 §; Traficom — accessible transport guidance',
  },
];

/** The shipped taxi question bank, with option order permuted per question. */
export const taxiQuestions: TaxiQuestion[] = authoredTaxiQuestions.map(
  withDeterministicOptionOrder,
);

/** Taxi questions belonging to a given category. */
export function getTaxiQuestionsByCategory(category: TaxiCategory): TaxiQuestion[] {
  return taxiQuestions.filter((question) => question.category === category);
}

/** Look up a single taxi question by id. */
export function getTaxiQuestionById(id: string): TaxiQuestion | undefined {
  return taxiQuestions.find((question) => question.id === id);
}

/** Look up many taxi questions by id, preserving the order of `ids`. */
export function getTaxiQuestionsByIds(ids: string[]): TaxiQuestion[] {
  const index = new Map(taxiQuestions.map((question) => [question.id, question]));
  return ids
    .map((id) => index.get(id))
    .filter((question): question is TaxiQuestion => question !== undefined);
}

export default taxiQuestions;
