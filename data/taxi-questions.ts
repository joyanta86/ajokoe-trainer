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
 * Distribution — 30 per category (90 total), so a full 30-question mock exam
 * (10 per category, drawn at random) can be assembled in many thousands of
 * distinct combinations without repetition.
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
  {
    id: 'ts-13',
    category: 'Passenger Safety & Accessibility',
    question:
      'A child is too big for an infant seat but shorter than 135 cm. What restraint is required?',
    questionFi:
      'Lapsi on liian iso vauvan turvakaukaloon mutta lyhyempi kuin 135 cm. Millainen turvalaite vaaditaan?',
    options: [
      'A booster seat or cushion suited to the child’s size, positioning the adult belt correctly over shoulder and hip',
      'The adult seat belt alone is always sufficient once the child is out of an infant seat',
      'The child may sit on an adult’s lap if the adult wears the seat belt around both of them',
      'No restraint is required once the child can sit upright unsupported',
    ],
    optionsFi: [
      'Lapsen kokoon sopiva korotusistuin tai -tyyny, joka asettaa aikuisen turvavyön oikein olkapään ja lantion yli',
      'Pelkkä aikuisen turvavyö riittää aina, kun lapsi ei enää tarvitse turvakaukaloa',
      'Lapsi saa istua aikuisen sylissä, jos aikuinen kiinnittää turvavyön molempien ympärille',
      'Turvalaitetta ei tarvita, kun lapsi osaa istua itsenäisesti pystyasennossa',
    ],
    correctAnswer: 0,
    explanation:
      'Until a child reaches 135 cm, the adult belt alone sits across the neck and abdomen instead of the shoulder and hip, which causes injury rather than preventing it in a crash. A booster raises the child so the belt is routed correctly. A shared belt around an adult and child protects neither of them.',
    explanationFi:
      'Ennen kuin lapsi saavuttaa 135 cm:n pituuden, pelkkä aikuisen turvavyö kulkee kaulan ja vatsan yli olkapään ja lantion sijaan, mikä aiheuttaa vamman sen sijaan että estäisi sen törmäyksessä. Korotusistuin nostaa lasta niin, että vyö kulkee oikein. Aikuisen ja lapsen yhteinen vyö ei suojaa kumpaakaan.',
    reference: 'Tieliikennelaki 729/2018, 88–90 §',
  },
  {
    id: 'ts-14',
    category: 'Passenger Safety & Accessibility',
    question: 'How should a folding walker or rollator be handled when its owner boards the taxi?',
    questionFi: 'Miten kokoontaitettava rollaattori tulee käsitellä, kun sen omistaja nousee taksiin?',
    options: [
      'Fold and secure it in the boot or a restrained area so it cannot slide or become a projectile',
      'Leave it open on the pavement until the return trip',
      'Place it loose on the rear seat next to the passenger',
      'Strap it to the roof rack if the boot is full',
    ],
    optionsFi: [
      'Taita se kasaan ja kiinnitä tavaratilaan tai muuhun kiinnitettyyn tilaan, jotta se ei pääse liikkumaan tai lentämään irti',
      'Jätä se auki jalkakäytävälle paluumatkaa varten',
      'Aseta se irrallaan takapenkille matkustajan viereen',
      'Kiinnitä se kattotelineeseen, jos tavaratila on täynnä',
    ],
    correctAnswer: 0,
    explanation:
      'A rollator left unsecured in the cabin becomes a heavy projectile under braking. Fold it and load it in the boot, or otherwise strap it down, before moving off — and keep the passenger’s own mobility aid within reach at the destination rather than buried under other luggage.',
    explanationFi:
      'Kiinnittämättömänä matkustamossa rollaattori muuttuu painavaksi lentäväksi esineeksi jarrutuksessa. Taita se ja lastaa tavaratilaan tai kiinnitä se muuten ennen liikkeelle lähtöä — ja pidä matkustajan oma liikkumisen apuväline helposti saatavilla määränpäässä muun matkatavaran alle hautaamisen sijaan.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-15',
    category: 'Passenger Safety & Accessibility',
    question: 'A passenger travels with portable medical oxygen equipment. What is the driver’s role?',
    questionFi: 'Matkustaja kulkee mukanaan kannettava happilaite. Mikä on kuljettajan rooli?',
    options: [
      'Secure the equipment upright where it cannot fall or roll, keep it away from heat and open flame, and never obstruct the passenger’s access to it',
      'Store the equipment in the boot, separate from the passenger, for the whole trip',
      'Ask the passenger to hold the cylinder loosely on their lap without securing it',
      'Refuse the trip, since oxygen equipment is not permitted in taxis',
    ],
    optionsFi: [
      'Kiinnitä laite pystyasentoon niin, ettei se pääse putoamaan tai vierimään, pidä se etäällä lämmöstä ja avotulesta, äläkä koskaan estä matkustajan pääsyä siihen',
      'Säilytä laite tavaratilassa erillään matkustajasta koko matkan ajan',
      'Pyydä matkustajaa pitämään pulloa löysästi sylissään ilman kiinnitystä',
      'Kieltäydy matkasta, koska happilaitteet eivät ole sallittuja takseissa',
    ],
    correctAnswer: 0,
    explanation:
      'Medical oxygen equipment must stay within the passenger’s reach — it is not ordinary luggage — but still needs to be secured upright and kept clear of heat sources, since a punctured or heated cylinder is a genuine fire and explosion risk. Refusing the trip outright would deny the passenger a service they need.',
    explanationFi:
      'Lääkinnällinen happilaite on pidettävä matkustajan ulottuvilla — se ei ole tavallista matkatavaraa — mutta se on silti kiinnitettävä pystyasentoon ja pidettävä etäällä lämmönlähteistä, koska puhjennut tai kuumentunut pullo on todellinen palo- ja räjähdysriski. Matkasta suoraan kieltäytyminen evää matkustajalta tarvitsemansa palvelun.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-16',
    category: 'Passenger Safety & Accessibility',
    question: 'What is the best way to communicate with a deaf or hard-of-hearing passenger?',
    questionFi: 'Mikä on paras tapa kommunikoida kuuron tai huonokuuloisen matkustajan kanssa?',
    options: [
      'Face the passenger when speaking, use short written notes or a phone screen if needed, and confirm the destination before moving off',
      'Speak loudly and slowly from the driver’s seat without turning around',
      'Avoid communicating at all and rely on the booking address',
      'Insist the passenger lip-reads from the rear-view mirror while the car is moving',
    ],
    optionsFi: [
      'Käänny puhuessasi matkustajaa kohti, käytä tarvittaessa lyhyitä kirjallisia viestejä tai puhelimen näyttöä ja vahvista määränpää ennen liikkeelle lähtöä',
      'Puhu kovaa ja hitaasti kuljettajan paikalta kääntymättä',
      'Vältä kaikkea kommunikointia ja luota pelkkään varausosoitteeseen',
      'Vaadi matkustajaa lukemaan huulilta taustapeilistä auton liikkuessa',
    ],
    correctAnswer: 0,
    explanation:
      'Facing the passenger allows lip-reading and reading facial expressions, which raising your voice from the driver’s seat does not help with. A written note or phone screen is a reliable fallback for confirming details like the destination before the trip starts, when the driver can still face the passenger safely.',
    explanationFi:
      'Matkustajaa kohti kääntyminen mahdollistaa huulilta lukemisen ja ilmeiden tulkinnan, mihin äänen korottaminen kuljettajan paikalta ei auta. Kirjallinen viesti tai puhelimen näyttö on luotettava varakeino esimerkiksi määränpään vahvistamiseen ennen matkan alkua, jolloin kuljettaja voi vielä turvallisesti kääntyä matkustajaa kohti.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-17',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger with a memory disorder becomes anxious mid-trip and insists on getting out immediately, in a location that is not their destination. What should the driver do?',
    questionFi:
      'Muistisairas matkustaja hermostuu kesken matkan ja vaatii pääsyä ulos välittömästi paikassa, joka ei ole hänen määränpäänsä. Mitä kuljettajan tulee tehdä?',
    options: [
      'Stay calm, speak reassuringly, and only stop somewhere safe — never in traffic — while trying to keep the passenger from leaving unsupervised in an unfamiliar place',
      'Stop immediately wherever the car happens to be, including in a live traffic lane',
      'Continue driving to the original destination regardless of the passenger’s distress',
      'Call the police before attempting to calm the passenger',
    ],
    optionsFi: [
      'Pysy rauhallisena, puhu rauhoittavasti ja pysähdy vain turvalliseen paikkaan — ei koskaan keskelle liikennettä — ja yritä samalla estää matkustajaa jäämästä yksin vieraaseen paikkaan',
      'Pysähdy heti siihen, missä auto sattuu olemaan, myös ajokaistalle',
      'Jatka ajoa alkuperäiseen määränpäähän hätääntymisestä huolimatta',
      'Soita poliisille ennen kuin yrität rauhoittaa matkustajaa',
    ],
    correctAnswer: 0,
    explanation:
      'Stopping in live traffic to satisfy an anxious demand trades one danger for another. Find the nearest safe place to stop, stay calm and reassuring, and try to avoid leaving a disoriented passenger alone in an unfamiliar area — contacting dispatch, a listed carer or emergency services is appropriate if the situation does not settle.',
    explanationFi:
      'Pysähtyminen keskelle liikennettä hätääntyneen vaatimuksen täyttämiseksi vaihtaa yhden vaaran toiseen. Etsi lähin turvallinen pysähtymispaikka, pysy rauhallisena ja rauhoittavana, ja yritä välttää hämmentyneen matkustajan jättämistä yksin vieraaseen paikkaan — yhteydenotto tilauskeskukseen, listättyyn omaiseen tai hätäpalveluihin on paikallaan, jos tilanne ei rauhoitu.',
    reference: 'Traficom — taxi driver guidance, special groups',
  },
  {
    id: 'ts-18',
    category: 'Passenger Safety & Accessibility',
    question: 'What safety equipment must be present and accessible in a taxi in use?',
    questionFi: 'Mitä turvavarusteita taksissa on oltava käytön aikana ja saatavilla?',
    options: [
      'A first aid kit and a fire extinguisher, both accessible and within their inspection dates',
      'A fire extinguisher only, stored in the boot under other cargo',
      'Neither item is required if the driver carries a mobile phone',
      'A first aid kit only, since fire extinguishers are optional in passenger cars',
    ],
    optionsFi: [
      'Ensiapupakkaus ja käsisammutin, molemmat saatavilla ja tarkastuspäivämääriensä sisällä',
      'Vain käsisammutin, säilytettynä tavaratilassa muun kuorman alla',
      'Kumpaakaan ei tarvita, jos kuljettajalla on mukanaan matkapuhelin',
      'Vain ensiapupakkaus, koska sammuttimet ovat henkilöautoissa vapaaehtoisia',
    ],
    correctAnswer: 0,
    explanation:
      'A taxi must carry both a first aid kit and a fire extinguisher, kept somewhere they can actually be reached quickly, not buried under luggage. An out-of-date extinguisher or a first aid kit missing basic supplies fails the purpose of carrying either.',
    explanationFi:
      'Taksissa on oltava sekä ensiapupakkaus että käsisammutin, säilytettynä paikassa, josta ne todella saa nopeasti käsiin eikä matkatavaroiden alla. Vanhentunut sammutin tai puutteellinen ensiapupakkaus ei täytä tarkoitustaan.',
    reference: 'Traficom — taxi vehicle equipment requirements',
  },
  {
    id: 'ts-19',
    category: 'Passenger Safety & Accessibility',
    question: 'What matters most when choosing exactly where to set a passenger down?',
    questionFi: 'Mikä on tärkeintä valittaessa tarkkaa paikkaa, johon matkustaja jätetään?',
    options: [
      'A spot that is legal to stop at and lets the passenger step out safely onto a pavement or verge, away from moving traffic',
      'The single closest point to the destination address, regardless of traffic conditions',
      'Wherever a gap in traffic first appears, even mid-lane',
      'The driver’s convenience for continuing the route afterwards',
    ],
    optionsFi: [
      'Paikka, jossa pysähtyminen on laillista ja josta matkustaja pääsee turvallisesti jalkakäytävälle tai pientareelle, poissa liikkuvasta liikenteestä',
      'Ehdottomasti lähin piste määränpään osoitteeseen liikennetilanteesta riippumatta',
      'Ensimmäinen aukko liikenteessä, vaikka keskellä kaistaa',
      'Kuljettajalle sopivin paikka reitin jatkamiseksi sen jälkeen',
    ],
    correctAnswer: 0,
    explanation:
      'The exact address matters less than putting the passenger out where they can open the door and step onto safe ground without crossing live traffic. A stop that is technically closer but forces the passenger into a traffic lane is worse, not better.',
    explanationFi:
      'Tarkka osoite on vähemmän tärkeä kuin se, että matkustaja pääsee avaamaan oven ja astumaan turvalliselle alustalle ylittämättä liikkuvaa liikennettä. Pysähdys, joka on teknisesti lähempänä mutta pakottaa matkustajan ajokaistalle, on huonompi, ei parempi vaihtoehto.',
    reference: 'Tieliikennelaki 729/2018, 37–38 §',
  },
  {
    id: 'ts-20',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger says the trip is a Kela-reimbursed journey (Kela-kyyti). What should the driver check?',
    questionFi:
      'Matkustaja kertoo matkan olevan Kelan korvaama kyyti. Mitä kuljettajan tulee tarkistaa?',
    options: [
      'That the trip matches what was booked through the authorised system and that the passenger’s identity and entitlement can be confirmed as required',
      'Nothing — Kela-kyyti trips do not require any verification',
      'Only the passenger’s home address, without checking booking details',
      'The passenger’s bank account number',
    ],
    optionsFi: [
      'Että matka vastaa valtuutetun järjestelmän kautta tehtyä varausta ja että matkustajan henkilöllisyys ja oikeus korvaukseen voidaan tarvittaessa vahvistaa',
      'Ei mitään — Kela-kyydit eivät vaadi mitään tarkistusta',
      'Vain matkustajan kotiosoitteen tarkistamatta varaustietoja',
      'Matkustajan pankkitilin numeron',
    ],
    correctAnswer: 0,
    explanation:
      'Reimbursed trips run through an authorised booking and billing system, and mismatches between the booked trip and what is actually driven are the basis for reimbursement fraud investigations. Confirming identity and matching the trip to the booking protects both the passenger’s entitlement and the driver.',
    explanationFi:
      'Korvattavat matkat kulkevat valtuutetun varaus- ja laskutusjärjestelmän kautta, ja poikkeamat varatun ja todella ajetun matkan välillä ovat korvauspetostutkintojen perusta. Henkilöllisyyden vahvistaminen ja matkan täsmääminen varaukseen suojaa sekä matkustajan etuutta että kuljettajaa.',
    reference: 'Laki liikenteen palveluista 320/2017; Kela guidance',
  },
  {
    id: 'ts-21',
    category: 'Passenger Safety & Accessibility',
    question: 'A passenger has a seizure while the taxi is moving. What is the correct response?',
    questionFi: 'Matkustajalla alkaa kohtaus taksin liikkuessa. Mikä on oikea toimintatapa?',
    options: [
      'Pull over as soon as it is safe to do so, do not restrain the passenger’s movements, protect them from injury and call for medical help if the seizure continues or they do not recover normally',
      'Continue driving to the destination as quickly as possible',
      'Hold the passenger firmly still to stop the movements',
      'Pull over immediately regardless of surrounding traffic',
    ],
    optionsFi: [
      'Pysähdy heti kun se on turvallista, älä pidättele matkustajan liikkeitä, suojaa häntä vammoilta ja soita apua, jos kohtaus jatkuu tai toipuminen ei etene normaalisti',
      'Jatka ajoa määränpäähän mahdollisimman nopeasti',
      'Pidä matkustajaa tiukasti paikallaan liikkeiden pysäyttämiseksi',
      'Pysähdy heti liikennetilanteesta riippumatta',
    ],
    correctAnswer: 0,
    explanation:
      'Restraining someone during a seizure can injure them; the correct approach is to clear the area around them, protect the head, and let the seizure run its course while getting the vehicle stopped safely. An ambulance is warranted if it lasts more than a few minutes, repeats, or the passenger does not regain normal awareness.',
    explanationFi:
      'Kohtauksen aikana pidätteleminen voi vahingoittaa matkustajaa; oikea tapa on suojata pään ympäristö, antaa kohtauksen edetä ja pysäyttää ajoneuvo turvallisesti sen aikana. Ambulanssi on tarpeen, jos kohtaus kestää useita minuutteja, toistuu, tai matkustaja ei palaudu normaaliin tajuntaan.',
    reference: 'Traficom — taxi driver guidance, first aid',
  },
  {
    id: 'ts-22',
    category: 'Passenger Safety & Accessibility',
    question: 'A passenger leaves their walking cane behind in the taxi after getting out. What should the driver do?',
    questionFi: 'Matkustaja unohtaa kävelykeppinsä taksiin poistuttuaan. Mitä kuljettajan tulee tehdä?',
    options: [
      'Try to return it immediately if the passenger is still nearby, since a mobility aid left behind can strand them; otherwise handle it as lost property',
      'Leave it in the vehicle and deal with it only if the passenger calls',
      'Drop it off at the nearest police station without contacting the passenger first',
      'Keep it in the taxi indefinitely in case another passenger needs one',
    ],
    optionsFi: [
      'Yritä palauttaa se heti, jos matkustaja on vielä lähellä, koska unohtunut liikkumisen apuväline voi jättää hänet avuttomaksi; muuten toimi kuten löytötavaran kanssa',
      'Jätä se ajoneuvoon ja hoida asia vain, jos matkustaja soittaa',
      'Vie se lähimmälle poliisiasemalle ottamatta ensin yhteyttä matkustajaan',
      'Pidä sitä taksissa toistaiseksi siltä varalta, että toinen matkustaja tarvitsee sellaista',
    ],
    correctAnswer: 0,
    explanation:
      'A forgotten mobility aid is not ordinary lost property — without it the passenger may be unable to move safely at their destination. If they are still within reach, return it immediately; otherwise it still goes through the normal lost-property process, just with more urgency.',
    explanationFi:
      'Unohtunut liikkumisen apuväline ei ole tavallista löytötavaraa — ilman sitä matkustaja ei ehkä pysty liikkumaan turvallisesti määränpäässään. Jos hän on vielä lähellä, palauta se heti; muuten asia hoidetaan tavallisen löytötavaramenettelyn mukaisesti, mutta kiireellisemmin.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'ts-23',
    category: 'Passenger Safety & Accessibility',
    question: 'How should driving style change when carrying an elderly or frail passenger on icy roads?',
    questionFi: 'Miten ajotapaa tulee muuttaa iäkkään tai hauraan matkustajan kanssa liukkaalla kelillä?',
    options: [
      'Increase following distance, brake and accelerate gently, and choose the smoothest available route to reduce jolts and fall risk when boarding or leaving',
      'Drive normally, since the vehicle’s stability systems compensate for the road conditions',
      'Prioritise the fastest possible arrival over ride smoothness',
      'No adjustment is needed as long as winter tyres are fitted',
    ],
    optionsFi: [
      'Kasvata seuraamisetäisyyttä, jarruta ja kiihdytä pehmeästi ja valitse mahdollisimman tasainen reitti vähentääksesi tärähdyksiä ja kaatumisriskiä noustessa tai poistuttaessa',
      'Aja normaalisti, koska ajoneuvon vakausjärjestelmät kompensoivat tieolosuhteet',
      'Aseta mahdollisimman nopea saapuminen ajomukavuuden edelle',
      'Mukautusta ei tarvita, kunhan talvirenkaat ovat käytössä',
    ],
    correctAnswer: 0,
    explanation:
      'Sudden braking or sharp turns are harder on a frail passenger’s body and increase fall risk both inside the car and while boarding or exiting on an icy surface. Winter tyres reduce, but do not eliminate, the extra stopping distance and reduced grip that icy roads bring.',
    explanationFi:
      'Äkkijarrutukset tai jyrkät käännökset rasittavat hauraan matkustajan kehoa enemmän ja lisäävät kaatumisriskiä sekä auton sisällä että liukkaalla alustalla noustessa tai poistuttaessa. Talvirenkaat vähentävät, mutta eivät poista, liukkaan tien tuomaa pidempää jarrutusmatkaa ja heikentynyttä pitoa.',
    reference: 'Traficom — winter driving guidance',
  },
  {
    id: 'ts-24',
    category: 'Passenger Safety & Accessibility',
    question: 'How should a driver handle luggage for a blind passenger travelling alone?',
    questionFi: 'Miten kuljettajan tulee käsitellä matkatavaroita yksin matkustavan näkövammaisen kanssa?',
    options: [
      'Tell the passenger what is being done before touching their belongings, load the luggage, and hand back anything they will need to carry themselves at the destination',
      'Load the luggage without comment, since explaining wastes time',
      'Ask the passenger to load their own luggage unassisted',
      'Leave luggage decisions entirely to any accompanying person',
    ],
    optionsFi: [
      'Kerro matkustajalle, mitä ollaan tekemässä, ennen kuin koskee hänen tavaroihinsa, lastaa matkatavarat ja anna takaisin se, mitä hänen tulee kantaa itse määränpäässä',
      'Lastaa matkatavarat kommentoimatta, koska selittäminen vie aikaa',
      'Pyydä matkustajaa lastaamaan omat tavaransa ilman apua',
      'Jätä matkatavarapäätökset kokonaan mahdollisen saattajan tehtäväksi',
    ],
    correctAnswer: 0,
    explanation:
      'Narrating actions before touching a blind passenger’s belongings avoids startling them and keeps them oriented to what is happening. Handing back items they will need immediately at the destination — rather than leaving everything in the boot — respects their independence.',
    explanationFi:
      'Toiminnan selittäminen ennen näkövammaisen matkustajan tavaroihin koskemista estää säikäyttämästä häntä ja pitää hänet perillä tapahtumista. Määränpäässä heti tarvittavien tavaroiden antaminen takaisin — sen sijaan että kaikki jätettäisiin tavaratilaan — kunnioittaa hänen itsenäisyyttään.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-25',
    category: 'Passenger Safety & Accessibility',
    question: 'A parent briefly steps away from the taxi at the destination, leaving a young child inside. What should the driver do?',
    questionFi: 'Vanhempi poistuu hetkeksi taksin luota määränpäässä ja jättää pienen lapsen ajoneuvoon. Mitä kuljettajan tulee tehdä?',
    options: [
      'Not drive off or leave the child unsupervised in the vehicle, and ask the parent to take the child with them or return promptly',
      'Continue to the next booking once the fare is settled, since the child is not the driver’s responsibility',
      'Lock the child inside for their own safety and wait indefinitely',
      'Call the child’s guardian only if the parent does not return within an hour',
    ],
    optionsFi: [
      'Ei aja pois eikä jätä lasta valvomatta ajoneuvoon, ja pyytää vanhempaa ottamaan lapsen mukaansa tai palaamaan viipymättä',
      'Jatkaa seuraavaan tilaukseen, kun matka on maksettu, koska lapsi ei ole kuljettajan vastuulla',
      'Lukitsee lapsen sisään tämän omaksi turvallisuudeksi ja odottaa toistaiseksi',
      'Soittaa lapsen huoltajalle vasta, jos vanhempi ei palaa tunnin kuluessa',
    ],
    correctAnswer: 0,
    explanation:
      'A child left alone in a stationary vehicle is still the driver’s duty of care while in the taxi, and driving off with an unsupervised minor aboard — or without one, leaving them stranded — creates a serious safety and liability problem either way. The driver should insist the parent takes the child or stays with them.',
    explanationFi:
      'Ajoneuvoon yksin jäänyt lapsi kuuluu edelleen kuljettajan huolellisuusvelvollisuuteen niin kauan kuin hän on taksissa, ja ajaminen pois valvomaton alaikäinen kyydissä — tai ilman häntä, jolloin lapsi jää avuttomaksi — on molemmissa tapauksissa vakava turvallisuus- ja vastuuongelma. Kuljettajan tulee vaatia, että vanhempi ottaa lapsen mukaansa tai jää tämän luo.',
    reference: 'Laki liikenteen palveluista 320/2017; Traficom — taxi driver guidance',
  },
  {
    id: 'ts-26',
    category: 'Passenger Safety & Accessibility',
    question: 'How does an assistance dog differ from an ordinary pet for taxi purposes?',
    questionFi: 'Miten avustajakoira eroaa tavallisesta lemmikistä taksin kannalta?',
    options: [
      'An assistance dog performing a task for a disabled passenger may not be refused and travels free of charge, unlike an ordinary pet, which the driver may decline to carry',
      'There is no legal difference — both may always be refused at the driver’s discretion',
      'An assistance dog must always travel in the boot, exactly like a pet',
      'Ordinary pets take priority over assistance dogs when the vehicle is already carrying luggage',
    ],
    optionsFi: [
      'Vammaista matkustajaa avustavaa avustajakoiraa ei saa kieltäytyä ottamasta, ja se matkustaa maksutta, toisin kuin tavallinen lemmikki, jonka kuljettaja voi kieltäytyä ottamasta',
      'Lakisääteistä eroa ei ole — molemmat voi aina kieltäytyä kuljettajan harkinnan mukaan',
      'Avustajakoiran on aina matkustettava tavaratilassa, aivan kuten lemmikin',
      'Tavallinen lemmikki menee avustajakoiran edelle, jos ajoneuvossa on jo matkatavaraa',
    ],
    correctAnswer: 0,
    explanation:
      'An assistance dog is working, not a pet, and refusing it is treated as discrimination against the disabled passenger it supports. A driver retains ordinary discretion over pets, including the right to decline or charge for extra cleaning, which does not apply to a recognised assistance animal.',
    explanationFi:
      'Avustajakoira on työssä, ei lemmikki, ja sen kieltäminen katsotaan sitä tarvitsevan vammaisen matkustajan syrjinnäksi. Kuljettajalla säilyy tavanomainen harkintavalta lemmikkien suhteen, mukaan lukien oikeus kieltäytyä tai veloittaa ylimääräisestä siivouksesta, mikä ei koske tunnustettua avustajaeläintä.',
    reference: 'Yhdenvertaisuuslaki 1325/2014; Traficom — taxi driver guidance',
  },
  {
    id: 'ts-27',
    category: 'Passenger Safety & Accessibility',
    question: 'What must a driver check before operating a wheelchair ramp or lift?',
    questionFi: 'Mitä kuljettajan tulee tarkistaa ennen pyörätuoliramppin tai -hissin käyttöä?',
    options: [
      'That the surrounding area is level, clear of obstacles and bystanders, and that the mechanism is used within its rated weight and operating limits',
      'Only that the passenger has given verbal consent to proceed',
      'Nothing in particular — the mechanism is fail-safe by design',
      'That other passengers have already boarded, to save time',
    ],
    optionsFi: [
      'Että ympäröivä alue on tasainen, vapaa esteistä ja sivullisista, ja että laitetta käytetään sen painoluokituksen ja käyttörajojen mukaisesti',
      'Vain sen, että matkustaja on antanut suullisen suostumuksensa jatkaa',
      'Ei mitään erityistä — laite on rakenteeltaan vikasietoinen',
      'Että muut matkustajat ovat jo nousseet kyytiin, ajan säästämiseksi',
    ],
    correctAnswer: 0,
    explanation:
      'A ramp or lift on an uneven surface, or loaded beyond its rated capacity, can fail or tip. Checking the surrounding ground and keeping within the mechanism’s rated limits is a mechanical safety check, not a formality — it comes before the passenger’s consent, not instead of it.',
    explanationFi:
      'Epätasaisella alustalla oleva tai ylikuormitettu ramppi tai hissi voi pettää tai kaatua. Ympäröivän alustan tarkistaminen ja laitteen käyttörajoissa pysyminen on mekaaninen turvatarkastus, ei muodollisuus — se tulee ennen matkustajan suostumusta, ei sen sijaan.',
    reference: 'Traficom — accessible transport guidance; standard ISO 10542',
  },
  {
    id: 'ts-28',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger on the autism spectrum is visibly overwhelmed by noise and conversation. What is the best approach?',
    questionFi:
      'Autismikirjon matkustaja vaikuttaa selvästi ylikuormittuneelta äänistä ja keskustelusta. Mikä on paras lähestymistapa?',
    options: [
      'Lower the radio, keep instructions short and predictable, and let the passenger set the pace of any conversation',
      'Keep the radio and conversation as normal, since routine helps everyone adjust',
      'Insist on small talk to make the passenger feel welcome',
      'Ask the passenger to explain their condition before proceeding',
    ],
    optionsFi: [
      'Hiljennä radio, pidä ohjeet lyhyinä ja ennakoitavina ja anna matkustajan itse säädellä mahdollisen keskustelun tahtia',
      'Pidä radio ja keskustelu tavanomaisena, koska rutiini auttaa kaikkia sopeutumaan',
      'Vaadi small talkia, jotta matkustaja tuntee olonsa tervetulleeksi',
      'Pyydä matkustajaa selittämään tilansa ennen kuin jatketaan',
    ],
    correctAnswer: 0,
    explanation:
      'Reducing sensory input — lower volume, fewer unpredictable prompts — and letting the passenger control social interaction respects how sensory overload actually works, rather than forcing normalcy on them. Demanding an explanation of a disability is neither necessary nor appropriate.',
    explanationFi:
      'Aistiärsykkeiden vähentäminen — hiljaisempi äänenvoimakkuus, vähemmän ennakoimattomia kehotuksia — ja sosiaalisen vuorovaikutuksen jättäminen matkustajan hallintaan kunnioittaa sitä, miten aistiylikuormitus todella toimii, sen sijaan että pakotettaisiin normaaliutta. Vamman selittämisen vaatiminen ei ole tarpeen eikä asianmukaista.',
    reference: 'Traficom — taxi driver guidance, special groups',
  },
  {
    id: 'ts-29',
    category: 'Passenger Safety & Accessibility',
    question: 'A passenger needs extra time to board because of a mobility impairment. What is appropriate?',
    questionFi: 'Matkustaja tarvitsee liikkumisrajoitteen vuoksi enemmän aikaa kyytiin nousemiseen. Mikä on asianmukaista?',
    options: [
      'Allow the time needed without rushing or showing impatience, and offer help only if it is wanted',
      'Politely ask the passenger to hurry, since other bookings are waiting',
      'Assist by lifting the passenger without asking first',
      'Start driving as soon as the door is closed, regardless of whether the passenger is seated safely',
    ],
    optionsFi: [
      'Anna tarvittava aika kiirehtimättä tai osoittamatta kärsimättömyyttä, ja tarjoa apua vain, jos sitä halutaan',
      'Pyydä kohteliaasti matkustajaa kiirehtimään, koska muita tilauksia odottaa',
      'Auta nostamalla matkustajaa kysymättä ensin',
      'Lähde ajamaan heti, kun ovi on suljettu, riippumatta siitä, onko matkustaja istunut turvallisesti',
    ],
    correctAnswer: 0,
    explanation:
      'Rushing a passenger with a mobility impairment increases fall risk and is poor practice regardless of schedule pressure. Physical assistance should be offered, not imposed — grabbing or lifting someone without consent can injure them or feel disrespectful, even when well intended.',
    explanationFi:
      'Liikkumisrajoitteisen matkustajan kiirehtiminen lisää kaatumisriskiä ja on huonoa käytäntöä aikataulupaineista riippumatta. Fyysistä apua tulee tarjota, ei pakottaa — kiinni tarttuminen tai nostaminen ilman suostumusta voi vahingoittaa tai tuntua kunnioittamattomalta, vaikka tarkoitus olisi hyvä.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-30',
    category: 'Passenger Safety & Accessibility',
    question: 'The driver needs to pull over urgently because of a passenger’s medical issue. What is the correct sequence?',
    questionFi: 'Kuljettajan on pysähdyttävä kiireellisesti matkustajan terveydentilan vuoksi. Mikä on oikea toimintajärjestys?',
    options: [
      'Signal, choose the nearest safe place clear of traffic, stop, then assess the passenger and call for help if needed',
      'Stop immediately in the current lane, then signal afterwards',
      'Call emergency services first and only stop once they answer',
      'Continue to the original destination, since it may be closer than any stopping place',
    ],
    optionsFi: [
      'Vilkuta, valitse lähin turvallinen paikka poissa liikenteestä, pysähdy ja arvioi sen jälkeen matkustajan tila ja soita tarvittaessa apua',
      'Pysähdy heti nykyiselle kaistalle ja vilkuta vasta sen jälkeen',
      'Soita ensin hätäkeskukseen ja pysähdy vasta, kun sinne vastataan',
      'Jatka alkuperäiseen määränpäähän, koska se voi olla lähempänä kuin mikään pysähtymispaikka',
    ],
    correctAnswer: 0,
    explanation:
      'Stopping safely comes before assessment and before the phone call — an unsignalled stop in a live lane risks a collision that turns one emergency into two. Only once the vehicle is stopped somewhere safe should the driver check the passenger and call for help.',
    explanationFi:
      'Turvallinen pysähtyminen tulee ennen tilanteen arviointia ja ennen puhelua — vilkuttamaton pysähdys ajokaistalle voi aiheuttaa yhteentörmäyksen, joka muuttaa yhden hätätilanteen kahdeksi. Vasta kun ajoneuvo on pysähtynyt turvallisesti, kuljettajan tulee tarkistaa matkustajan tila ja soittaa apua.',
    reference: 'Traficom — taxi driver guidance, first aid',
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
  {
    id: 'tl-13',
    category: 'Legislation & Taxi Rules',
    question: 'Must a taxi driver carry proof of their driver’s qualification while working?',
    questionFi: 'Onko taksinkuljettajan pidettävä ajolupansa todiste mukanaan työssään?',
    options: [
      'Yes — the qualification must be carried or otherwise verifiable during driving and shown to the authorities on request',
      'No — it only needs to be valid, not carried',
      'Only when driving outside the driver’s home municipality',
      'Only during the first year after it was granted',
    ],
    optionsFi: [
      'Kyllä — lupa on pidettävä mukana tai muuten todennettavissa ajon aikana ja esitettävä viranomaiselle pyydettäessä',
      'Ei — sen tarvitsee vain olla voimassa, ei mukana',
      'Vain ajettaessa kuljettajan kotikunnan ulkopuolella',
      'Vain ensimmäisen vuoden ajan sen myöntämisestä',
    ],
    correctAnswer: 0,
    explanation:
      'A working taxi driver must be able to verify their qualification to an inspecting authority. Not carrying or being able to show it is treated the same as driving without the required qualification, regardless of whether it is actually valid.',
    explanationFi:
      'Työssä olevan taksinkuljettajan on kyettävä todentamaan pätevyytensä valvovalle viranomaiselle. Sen mukana pitämättä jättäminen tai esittämättä jättäminen rinnastetaan ajamiseen ilman vaadittua pätevyyttä, riippumatta siitä, onko lupa tosiasiassa voimassa.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-14',
    category: 'Legislation & Taxi Rules',
    question: 'What health requirement applies to holding a taxi driver’s licence?',
    questionFi: 'Mikä terveysvaatimus koskee taksinkuljettajan ajoluvan haltijaa?',
    options: [
      'The driver must meet the health requirements set for professional drivers and provide medical certification when required',
      'No health certification is required beyond the ordinary car licence',
      'A health check is required only once, at first application, and never again',
      'Health requirements apply only to drivers over 70',
    ],
    optionsFi: [
      'Kuljettajan on täytettävä ammattikuljettajille asetetut terveysvaatimukset ja esitettävä lääkärintodistus tarvittaessa',
      'Muuta terveystodistusta ei vaadita tavallisen ajokortin lisäksi',
      'Terveystarkastus vaaditaan vain kerran ensimmäisen hakemuksen yhteydessä eikä koskaan uudelleen',
      'Terveysvaatimukset koskevat vain yli 70-vuotiaita kuljettajia',
    ],
    correctAnswer: 0,
    explanation:
      'A taxi driver’s licence is a professional qualification, and professional driving carries stricter medical fitness standards than ordinary private driving, with certification renewed on the schedule set for professional drivers — not a one-time check at first application.',
    explanationFi:
      'Taksinkuljettajan ajolupa on ammatillinen pätevyys, ja ammattiajoa koskevat tiukemmat terveydelliset vaatimukset kuin tavallista yksityisajoa, ja todistus uusitaan ammattikuljettajille asetetun aikataulun mukaisesti — ei vain kertaluonteisesti ensimmäisen hakemuksen yhteydessä.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-15',
    category: 'Legislation & Taxi Rules',
    question: 'How does a serious traffic offence affect an existing taxi driver’s licence?',
    questionFi: 'Miten vakava liikennerikkomus vaikuttaa voimassa olevaan taksinkuljettajan ajolupaan?',
    options: [
      'It can lead to the licence being suspended or revoked, since holding it depends on continuing to meet the reliability requirements',
      'It has no effect on the taxi licence, only on the ordinary driving licence',
      'It only matters if the offence happened while driving a taxi passenger',
      'It results in a fine but never affects the licence itself',
    ],
    optionsFi: [
      'Se voi johtaa luvan peruuttamiseen tai keskeyttämiseen, koska luvan säilyminen edellyttää jatkuvaa luotettavuusvaatimusten täyttymistä',
      'Sillä ei ole vaikutusta taksilupaan, vain tavalliseen ajokorttiin',
      'Sillä on merkitystä vain, jos rikkomus tapahtui taksimatkustajaa kuljetettaessa',
      'Siitä seuraa sakko, mutta se ei koskaan vaikuta itse lupaan',
    ],
    correctAnswer: 0,
    explanation:
      'The reliability requirement behind a taxi driver’s licence is ongoing, not a one-time check at the application stage — a serious offence, on or off duty, can trigger a reassessment and lead to suspension or revocation, since the licensing authority must be able to trust every holder to carry passengers safely.',
    explanationFi:
      'Taksinkuljettajan ajoluvan taustalla oleva luotettavuusvaatimus on jatkuva, ei kertaluonteinen tarkastus hakuvaiheessa — vakava rikkomus, työssä tai vapaa-ajalla, voi käynnistää uudelleenarvioinnin ja johtaa luvan keskeyttämiseen tai peruuttamiseen, koska lupaviranomaisen on voitava luottaa jokaisen luvanhaltijan kykyyn kuljettaa matkustajia turvallisesti.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-16',
    category: 'Legislation & Taxi Rules',
    question: 'What must a taxi vehicle have completed before it can be used to carry fare-paying passengers?',
    questionFi: 'Mikä taksiajoneuvon on oltava suoritettuna ennen kuin sitä voi käyttää maksavien matkustajien kuljettamiseen?',
    options: [
      'A valid periodic vehicle inspection (katsastus) confirming it meets roadworthiness and taxi-use requirements',
      'A one-time factory certificate that never needs renewal',
      'Registration only, with no separate inspection requirement',
      'Inspection only if the vehicle is more than ten years old',
    ],
    optionsFi: [
      'Voimassa oleva määräaikaiskatsastus, joka vahvistaa ajoneuvon liikennekelpoisuuden ja taksikäytön vaatimusten täyttymisen',
      'Kertaluonteinen tehdastodistus, jota ei koskaan tarvitse uusia',
      'Pelkkä rekisteröinti ilman erillistä katsastusvaatimusta',
      'Katsastus vain, jos ajoneuvo on yli kymmenen vuotta vanha',
    ],
    correctAnswer: 0,
    explanation:
      'A taxi is subject to periodic inspection like any vehicle in professional use, and an expired inspection makes the vehicle unfit for carrying fare-paying passengers regardless of how it looks or drives — registration alone does not substitute for it.',
    explanationFi:
      'Taksi on määräaikaiskatsastuksen alainen kuten mikä tahansa ammattikäytössä oleva ajoneuvo, ja umpeutunut katsastus tekee ajoneuvosta kelvottoman maksavien matkustajien kuljettamiseen riippumatta siitä, miltä se näyttää tai miten se ajaa — pelkkä rekisteröinti ei korvaa sitä.',
    reference: 'Ajoneuvolaki 82/2021',
  },
  {
    id: 'tl-17',
    category: 'Legislation & Taxi Rules',
    question: 'What pricing information must be displayed or otherwise made available inside the taxi?',
    questionFi: 'Mitä hinnoittelutietoa taksissa on esitettävä tai muuten oltava saatavilla?',
    options: [
      'The basis on which the fare is determined, in a form the customer can check before or during the trip',
      'Nothing — verbal confirmation at the end of the trip is always sufficient',
      'Only the driver’s personal identification number',
      'Prices are only required to be published on the operator’s website',
    ],
    optionsFi: [
      'Perusteet, joiden mukaan hinta määräytyy, muodossa, jonka asiakas voi tarkistaa ennen matkaa tai sen aikana',
      'Ei mitään — suullinen vahvistus matkan lopussa riittää aina',
      'Vain kuljettajan henkilötunnus',
      'Hinnat on julkaistava vain liikenteenharjoittajan verkkosivuilla',
    ],
    correctAnswer: 0,
    explanation:
      'Price transparency is a core consumer protection in taxi regulation: the customer must be able to see or ask for the pricing basis before committing to the trip, not discover it only at the end. A website listing does not satisfy the requirement to make it available in the vehicle itself.',
    explanationFi:
      'Hinnoittelun läpinäkyvyys on taksisääntelyn keskeinen kuluttajansuoja: asiakkaan on voitava nähdä tai kysyä hinnoitteluperuste ennen matkaan sitoutumista, ei vasta sen lopussa. Verkkosivulla julkaiseminen ei täytä vaatimusta tiedon saatavuudesta itse ajoneuvossa.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-18',
    category: 'Legislation & Taxi Rules',
    question: 'What information must a taxi receipt contain?',
    questionFi: 'Mitä tietoja taksikuitissa on oltava?',
    options: [
      'Enough detail to verify the fare charged, including the price and the basis it was calculated on',
      'Only the total amount paid, with no other detail',
      'Only the driver’s name, with no pricing detail',
      'Receipts are optional and need contain nothing specific',
    ],
    optionsFi: [
      'Riittävät tiedot veloitetun hinnan tarkistamiseksi, mukaan lukien hinta ja sen laskentaperuste',
      'Vain maksettu kokonaissumma ilman muita tietoja',
      'Vain kuljettajan nimi ilman hintatietoja',
      'Kuitti on vapaaehtoinen eikä sen tarvitse sisältää mitään tiettyä',
    ],
    correctAnswer: 0,
    explanation:
      'A receipt exists to let the customer verify what they were charged and why — a bare total with no basis defeats that purpose and would not satisfy a fare dispute or an expense claim. It is required, not optional.',
    explanationFi:
      'Kuitti on olemassa, jotta asiakas voi tarkistaa, mistä häntä on veloitettu ja miksi — pelkkä loppusumma ilman perustetta ei täytä tätä tarkoitusta eikä kelpaisi maksuriidassa tai kulukorvausvaatimuksessa. Kuitti on pakollinen, ei vapaaehtoinen.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-19',
    category: 'Legislation & Taxi Rules',
    question: 'What must a driver do after a road traffic accident involving a passenger in the taxi?',
    questionFi: 'Mitä kuljettajan on tehtävä liikenneonnettomuuden jälkeen, jossa taksissa on ollut matkustaja?',
    options: [
      'Stop, assist anyone injured, exchange the required information, and report the accident as required by law and to the operator or insurer',
      'Continue the trip if the passenger says they are unharmed',
      'Only report the accident if the vehicle is visibly damaged',
      'Handle it privately with the passenger and skip any formal report',
    ],
    optionsFi: [
      'Pysähtyä, auttaa loukkaantuneita, vaihtaa tarvittavat tiedot ja ilmoittaa onnettomuudesta lain edellyttämällä tavalla sekä liikenteenharjoittajalle tai vakuutusyhtiölle',
      'Jatkaa matkaa, jos matkustaja sanoo olevansa vahingoittumaton',
      'Ilmoittaa onnettomuudesta vain, jos ajoneuvo on näkyvästi vaurioitunut',
      'Hoitaa asian yksityisesti matkustajan kanssa ilman virallista ilmoitusta',
    ],
    correctAnswer: 0,
    explanation:
      'The duty to stop, render assistance and report applies regardless of how minor the accident looks or what the passenger says in the moment — injuries and liability are not always apparent immediately, and an unreported accident leaves both the passenger and the driver unprotected.',
    explanationFi:
      'Velvollisuus pysähtyä, auttaa ja ilmoittaa asiasta koskee riippumatta siitä, kuinka vähäiseltä onnettomuus vaikuttaa tai mitä matkustaja sillä hetkellä sanoo — vammat ja vastuukysymykset eivät aina näy heti, ja ilmoittamaton onnettomuus jättää sekä matkustajan että kuljettajan ilman suojaa.',
    reference: 'Tieliikennelaki 729/2018',
  },
  {
    id: 'tl-20',
    category: 'Legislation & Taxi Rules',
    question: 'What insurance must be in force for a vehicle operating as a taxi?',
    questionFi: 'Mikä vakuutus taksina toimivalla ajoneuvolla on oltava voimassa?',
    options: [
      'Valid motor liability insurance covering the vehicle and its passengers, as required for any vehicle in traffic',
      'No insurance beyond what a private car requires',
      'Insurance is only required for vehicles used exclusively for airport transfers',
      'Passenger injury is never covered by the vehicle’s insurance',
    ],
    optionsFi: [
      'Voimassa oleva liikennevakuutus, joka kattaa ajoneuvon ja sen matkustajat, kuten miltä tahansa liikenteessä olevalta ajoneuvolta vaaditaan',
      'Ei muuta vakuutusta kuin mitä yksityisautolta vaaditaan',
      'Vakuutus vaaditaan vain ajoneuvoilta, joita käytetään yksinomaan lentokenttäkuljetuksiin',
      'Matkustajan loukkaantumista ei koskaan korvata ajoneuvon vakuutuksesta',
    ],
    correctAnswer: 0,
    explanation:
      'Statutory motor liability insurance applies to every vehicle in traffic, taxi or not, and covers injury to passengers and third parties. A vehicle carrying fare-paying passengers without valid insurance is not roadworthy for that use.',
    explanationFi:
      'Lakisääteinen liikennevakuutus koskee jokaista liikenteessä olevaa ajoneuvoa, taksia tai ei, ja se kattaa matkustajille ja kolmansille osapuolille aiheutuneet vahingot. Ilman voimassa olevaa vakuutusta maksavia matkustajia kuljettava ajoneuvo ei ole tähän käyttöön liikennekelpoinen.',
    reference: 'Liikennevakuutuslaki 460/2016',
  },
  {
    id: 'tl-21',
    category: 'Legislation & Taxi Rules',
    question: 'How may a taxi driver lawfully refuse a fare?',
    questionFi: 'Miten taksinkuljettaja voi laillisesti kieltäytyä ajosta?',
    options: [
      'Only for a legitimate reason such as a genuine safety concern or the vehicle being unsuitable for the request, never on discriminatory grounds',
      'For any reason at all, since accepting a fare is always optional',
      'Only if the driver has already completed ten trips that day',
      'Refusal is never lawful under any circumstance',
    ],
    optionsFi: [
      'Vain hyväksyttävästä syystä, kuten aidosta turvallisuushuolesta tai siitä, ettei ajoneuvo sovellu pyyntöön, ei koskaan syrjivin perustein',
      'Mistä tahansa syystä, koska ajon vastaanottaminen on aina vapaaehtoista',
      'Vain, jos kuljettaja on jo ajanut kymmenen matkaa sinä päivänä',
      'Kieltäytyminen ei ole koskaan laillista missään tilanteessa',
    ],
    correctAnswer: 0,
    explanation:
      'A driver is not an unconditional service and may decline on genuine, non-discriminatory grounds — a safety risk, an unsuitable vehicle for the request — but refusing because of a passenger’s disability, ethnicity or similar protected characteristic is unlawful discrimination, not a legitimate business decision.',
    explanationFi:
      'Kuljettaja ei ole ehdoton palvelu, ja hän voi kieltäytyä aidosta, ei-syrjivästä syystä — turvallisuusriski, pyyntöön sopimaton ajoneuvo — mutta kieltäytyminen matkustajan vamman, etnisen taustan tai vastaavan suojatun ominaisuuden vuoksi on laitonta syrjintää, ei hyväksyttävä liiketoimintapäätös.',
    reference: 'Yhdenvertaisuuslaki 1325/2014; Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-22',
    category: 'Legislation & Taxi Rules',
    question: 'What is required of the pricing or metering equipment used to calculate a distance-and-time fare?',
    questionFi: 'Mitä vaaditaan matka- ja aikaperusteisen hinnan laskentaan käytettävältä mittaus- tai taksamittarilaitteelta?',
    options: [
      'It must be an approved, calibrated device, and the fare actually charged must match what it calculates',
      'Any smartphone app is acceptable with no approval or calibration needed',
      'Equipment requirements only apply to trips longer than 50 km',
      'The device only needs to be accurate at the start of the year it was purchased',
    ],
    optionsFi: [
      'Sen on oltava hyväksytty ja kalibroitu laite, ja veloitetun hinnan on vastattava sen laskemaa hintaa',
      'Mikä tahansa älypuhelinsovellus kelpaa ilman hyväksyntää tai kalibrointia',
      'Laitevaatimukset koskevat vain yli 50 km matkoja',
      'Laitteen on oltava tarkka vain sen ostovuoden alussa',
    ],
    correctAnswer: 0,
    explanation:
      'Charging by distance and time requires equipment that is both approved for the purpose and kept calibrated, and the amount charged must actually match what the device calculates — an uncalibrated or mismatched charge undermines the price transparency the customer is entitled to.',
    explanationFi:
      'Matka- ja aikaperusteinen hinnoittelu edellyttää laitetta, joka on sekä tähän tarkoitukseen hyväksytty että pidetty kalibroituna, ja veloitetun summan on todella vastattava laitteen laskemaa — kalibroimaton tai poikkeava veloitus heikentää asiakkaalle kuuluvaa hinnoittelun läpinäkyvyyttä.',
    reference: 'Laki liikenteen palveluista 320/2017; Mittauslaitelaki 707/2011',
  },
  {
    id: 'tl-23',
    category: 'Legislation & Taxi Rules',
    question: 'What is the general obligation on recording a taxi driver’s working and rest time?',
    questionFi: 'Mikä on yleinen velvollisuus taksinkuljettajan työ- ja lepoajan kirjaamiseen?',
    options: [
      'Working and rest periods must be tracked so the statutory limits can be verified, not left to memory or informal estimates',
      'No record is needed as long as the driver feels rested',
      'Records are required only for drivers employed by large companies',
      'Only trips over 100 km need to be logged',
    ],
    optionsFi: [
      'Työ- ja lepoajat on kirjattava niin, että lakisääteiset rajat voidaan todentaa, ei jätettävä muistin tai epävirallisten arvioiden varaan',
      'Kirjausta ei tarvita, kunhan kuljettaja tuntee itsensä levänneeksi',
      'Kirjaus vaaditaan vain suurten yritysten palveluksessa olevilta kuljettajilta',
      'Vain yli 100 km matkat on kirjattava',
    ],
    correctAnswer: 0,
    explanation:
      'Working-time and rest limits exist to prevent fatigue-related crashes, and a limit that cannot be checked is not enforceable — records let the driver, the operator and the authorities verify compliance, rather than relying on how rested the driver subjectively feels.',
    explanationFi:
      'Työaika- ja lepoaikarajat on säädetty väsymyksestä johtuvien onnettomuuksien estämiseksi, eikä rajaa, jota ei voida tarkistaa, voida valvoa — kirjaukset mahdollistavat sen, että kuljettaja, liikenteenharjoittaja ja viranomaiset voivat todentaa vaatimusten täyttymisen sen sijaan, että luotettaisiin kuljettajan subjektiiviseen tuntemukseen levänneisyydestä.',
    reference: 'Laki liikenteen palveluista 320/2017; Työaikalaki 872/2019',
  },
  {
    id: 'tl-24',
    category: 'Legislation & Taxi Rules',
    question: 'How must a taxi driver handle personal data collected about customers, such as trip history?',
    questionFi: 'Miten taksinkuljettajan on käsiteltävä asiakkaista kerättyjä henkilötietoja, kuten matkahistoriaa?',
    options: [
      'In line with data protection law: collected only for a legitimate purpose, kept secure, and not shared or used beyond that purpose',
      'Freely, since a paying customer has no expectation of privacy',
      'Trip data may be sold to third parties without consent',
      'Data protection rules do not apply to sole-trader taxi drivers',
    ],
    optionsFi: [
      'Tietosuojalainsäädännön mukaisesti: kerätään vain hyväksyttävään tarkoitukseen, säilytetään turvallisesti eikä jaeta tai käytetä tarkoituksen ulkopuolella',
      'Vapaasti, koska maksavalla asiakkaalla ei ole yksityisyydensuojaa',
      'Matkatietoja saa myydä kolmansille osapuolille ilman suostumusta',
      'Tietosuojasäännöt eivät koske yksityisenä elinkeinonharjoittajana toimivaa taksinkuljettajaa',
    ],
    correctAnswer: 0,
    explanation:
      'Trip and customer data are personal data like any other, and GDPR-based data protection rules apply regardless of the business’s size — a sole-trader driver collecting booking or trip history is still bound by purpose limitation, security and the customer’s rights over their own data.',
    explanationFi:
      'Matka- ja asiakastiedot ovat henkilötietoja siinä missä muutkin, ja GDPR:ään perustuvat tietosuojasäännöt koskevat yrityksen koosta riippumatta — myös yksityisenä elinkeinonharjoittajana toimiva kuljettaja, joka kerää varaus- tai matkahistoriaa, on sidottu käyttötarkoitussidonnaisuuteen, tietoturvaan ja asiakkaan oikeuksiin omiin tietoihinsa.',
    reference: 'EU 2016/679 (GDPR); Tietosuojalaki 1050/2018',
  },
  {
    id: 'tl-25',
    category: 'Legislation & Taxi Rules',
    question: 'What effect does a drink-driving conviction have on a taxi driver’s professional licence?',
    questionFi: 'Mikä vaikutus rattijuopumustuomiolla on taksinkuljettajan ammattiluvalle?',
    options: [
      'It undermines the reliability the licence depends on and typically leads to suspension or revocation, even for an offence committed off duty',
      'It has no effect if the offence happened in the driver’s own time, off duty',
      'Only a second conviction has any consequence for the licence',
      'It results only in a fine, with the licence unaffected',
    ],
    optionsFi: [
      'Se murentaa luvan edellyttämän luotettavuuden ja johtaa yleensä keskeyttämiseen tai peruuttamiseen, myös silloin kun rikkomus tapahtui vapaa-ajalla',
      'Sillä ei ole vaikutusta, jos rikkomus tapahtui kuljettajan omalla ajalla, työn ulkopuolella',
      'Vain toisella tuomiolla on vaikutusta lupaan',
      'Siitä seuraa vain sakko, eikä lupaan kohdistu vaikutusta',
    ],
    correctAnswer: 0,
    explanation:
      'The reliability standard behind a taxi licence is about the person, not just their on-duty conduct — a drink-driving conviction, even off duty, signals exactly the kind of risk the licensing system exists to screen out, and is treated as grounds for suspension or revocation.',
    explanationFi:
      'Taksiluvan taustalla oleva luotettavuusvaatimus koskee henkilöä, ei vain työaikaista käytöstä — rattijuopumustuomio, myös vapaa-ajalla tapahtuneena, on juuri sellainen riski, jonka seulomiseksi lupajärjestelmä on olemassa, ja se katsotaan perusteeksi keskeyttää tai peruuttaa lupa.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-26',
    category: 'Legislation & Taxi Rules',
    question: 'May a driver charge a passenger more than the price basis shown or agreed for the trip?',
    questionFi: 'Saako kuljettaja veloittaa matkustajalta enemmän kuin näytetty tai sovittu hinnoitteluperuste osoittaa?',
    options: [
      'No — the amount charged must match the disclosed pricing basis; overcharging is a breach of the price transparency requirement',
      'Yes, if the driver judges the trip was more difficult than expected',
      'Yes, freely, as long as a receipt is still issued',
      'Yes, but only in cash payments',
    ],
    optionsFi: [
      'Ei — veloitetun summan on vastattava ilmoitettua hinnoitteluperustetta; ylihinnoittelu rikkoo hinnoittelun läpinäkyvyysvaatimusta',
      'Kyllä, jos kuljettaja arvioi matkan olleen odotettua vaikeampi',
      'Kyllä, vapaasti, kunhan kuitti annetaan silti',
      'Kyllä, mutta vain käteismaksuissa',
    ],
    correctAnswer: 0,
    explanation:
      'Price transparency requires that what is charged actually matches what was disclosed — a driver cannot unilaterally raise the price mid-trip because it felt harder than expected. Issuing a receipt afterwards does not make an overcharge lawful; the amount itself has to match the basis shown.',
    explanationFi:
      'Hinnoittelun läpinäkyvyys edellyttää, että veloitettu summa todella vastaa ilmoitettua perustetta — kuljettaja ei voi yksipuolisesti korottaa hintaa kesken matkan sillä perusteella, että se tuntui odotettua vaikeammalta. Kuitin antaminen jälkikäteen ei tee ylihinnoittelusta laillista; itse summan on vastattava esitettyä perustetta.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-27',
    category: 'Legislation & Taxi Rules',
    question: 'Which authority supervises taxi licensing and handles complaints about taxi services in Finland?',
    questionFi: 'Mikä viranomainen valvoo taksilupia ja käsittelee taksipalveluita koskevia valituksia Suomessa?',
    options: [
      'Traficom (the Finnish Transport and Communications Agency)',
      'The local municipal building inspector',
      'The Finnish Tax Administration exclusively',
      'There is no supervising authority — the industry is entirely self-regulated',
    ],
    optionsFi: [
      'Traficom (Liikenne- ja viestintävirasto)',
      'Kunnan rakennustarkastaja',
      'Yksinomaan Verohallinto',
      'Valvovaa viranomaista ei ole — ala on täysin itsesäänneltyä',
    ],
    correctAnswer: 0,
    explanation:
      'Traficom is the licensing and supervisory authority for taxi transport in Finland — it issues taxi driver qualifications and operator licences and is the body a passenger or driver escalates a regulatory complaint to, distinct from tax matters handled by the Tax Administration.',
    explanationFi:
      'Traficom on taksiliikenteen lupa- ja valvontaviranomainen Suomessa — se myöntää taksinkuljettajan ajoluvat ja liikenneluvat, ja sille matkustaja tai kuljettaja voi viedä sääntelyyn liittyvän valituksen, erillään Verohallinnon hoitamista veroasioista.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-28',
    category: 'Legislation & Taxi Rules',
    question: 'What is required if a taxi business changes ownership or the driver starts working for a new operator?',
    questionFi: 'Mitä vaaditaan, jos taksiyrityksen omistus vaihtuu tai kuljettaja siirtyy uuden liikenteenharjoittajan palvelukseen?',
    options: [
      'The relevant licence and registration details must be kept current with the authority — driving under an operator not properly on record is not permitted',
      'Nothing — the original licence automatically transfers with no update needed',
      'Only the vehicle registration needs updating, never the operator details',
      'Updates are optional and can be done at the driver’s convenience, at any time',
    ],
    optionsFi: [
      'Asianomaiset lupa- ja rekisteritiedot on pidettävä ajan tasalla viranomaisella — ajaminen liikenteenharjoittajan lukuun, joka ei ole asianmukaisesti rekisterissä, ei ole sallittua',
      'Ei mitään — alkuperäinen lupa siirtyy automaattisesti ilman päivitystarvetta',
      'Vain ajoneuvon rekisteröinti tarvitsee päivittää, ei koskaan liikenteenharjoittajan tietoja',
      'Päivitykset ovat vapaaehtoisia ja voidaan tehdä milloin kuljettajalle sopii',
    ],
    correctAnswer: 0,
    explanation:
      'Taxi licensing is tied to specific, registered parties, so a change in ownership or operator has to be reflected in the official records before driving continues under the new arrangement — the licensing system otherwise loses track of who is actually responsible for the service.',
    explanationFi:
      'Taksilupa on sidottu tiettyihin, rekisteröityihin osapuoliin, joten omistuksen tai liikenteenharjoittajan muutos on kirjattava viralliseen rekisteriin ennen kuin ajamista jatketaan uuden järjestelyn alaisuudessa — muuten lupajärjestelmä menettää seurannan siitä, kuka palvelusta todella vastaa.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-29',
    category: 'Legislation & Taxi Rules',
    question: 'Is a taxi driver’s licence tied to a specific region, or valid across Finland?',
    questionFi: 'Onko taksinkuljettajan ajolupa sidottu tiettyyn alueeseen vai voimassa koko Suomessa?',
    options: [
      'A taxi driver’s licence granted under current law is nationally valid, though local knowledge is still expected wherever the driver actually operates',
      'It is strictly limited to the municipality where it was issued',
      'It is valid only within the driver’s home region and one neighbouring region',
      'It is valid only in the capital region regardless of where it was issued',
    ],
    optionsFi: [
      'Nykylainsäädännön mukaan myönnetty taksinkuljettajan ajolupa on voimassa koko maassa, vaikka paikallistuntemusta odotetaan silti siellä, missä kuljettaja tosiasiassa toimii',
      'Se on tiukasti rajattu siihen kuntaan, jossa se on myönnetty',
      'Se on voimassa vain kuljettajan kotialueella ja yhdellä naapurialueella',
      'Se on voimassa vain pääkaupunkiseudulla myöntämispaikasta riippumatta',
    ],
    correctAnswer: 0,
    explanation:
      'The deregulation of the taxi market removed the old region-locked permit system — a licence is nationally valid — but that does not remove the practical expectation of knowing the streets, stands and typical routes of wherever the driver actually works.',
    explanationFi:
      'Taksimarkkinan sääntelyn purku poisti vanhan alueellisesti sidotun lupajärjestelmän — lupa on voimassa koko maassa — mutta tämä ei poista käytännön odotusta tuntea sen alueen kadut, asemat ja tyypilliset reitit, jossa kuljettaja tosiasiassa toimii.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tl-30',
    category: 'Legislation & Taxi Rules',
    question: 'What happens if a taxi driver’s licence expires while they continue to drive fare-paying passengers?',
    questionFi: 'Mitä tapahtuu, jos taksinkuljettajan ajolupa umpeutuu ja hän jatkaa maksavien matkustajien kuljettamista?',
    options: [
      'Driving fare-paying passengers without a valid licence is unlawful, regardless of how routine or brief the lapse feels',
      'It is allowed for up to 30 days as an automatic grace period',
      'It is allowed as long as the renewal application has merely been started',
      'It only matters if a passenger files a complaint',
    ],
    optionsFi: [
      'Maksavien matkustajien kuljettaminen ilman voimassa olevaa lupaa on lainvastaista riippumatta siitä, miten rutiininomaiselta tai lyhyeltä katko tuntuu',
      'Se on sallittua enintään 30 päivän automaattisen siirtymäajan verran',
      'Se on sallittua, kunhan uusimishakemus on vain aloitettu',
      'Sillä on merkitystä vain, jos matkustaja tekee valituksen',
    ],
    correctAnswer: 0,
    explanation:
      'The licence has to be valid at the moment of driving, not merely in the process of being renewed — an expired licence means the driver is not currently qualified to carry fare-paying passengers, and continuing to do so is a violation whether or not any passenger ever complains.',
    explanationFi:
      'Luvan on oltava voimassa juuri sillä hetkellä kun ajetaan, ei vain uusimisprosessin ollessa käynnissä — umpeutunut lupa tarkoittaa, ettei kuljettaja ole tällä hetkellä pätevä kuljettamaan maksavia matkustajia, ja jatkaminen on rikkomus riippumatta siitä, valittaako kukaan matkustaja koskaan.',
    reference: 'Laki liikenteen palveluista 320/2017',
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
  {
    id: 'tc-13',
    category: 'Customer Service & Navigation',
    question: 'Two passengers with different destinations share one taxi. How should the route be handled?',
    questionFi: 'Kaksi eri määränpäähän matkustavaa asiakasta jakaa saman taksin. Miten reitti tulee hoitaa?',
    options: [
      'Agree the drop-off order and pricing basis with both passengers before starting, choosing a sensible combined route',
      'Let whichever passenger got in first decide everything unilaterally',
      'Drop the furthest passenger first regardless of route efficiency',
      'Refuse to carry more than one paying destination in a single trip',
    ],
    optionsFi: [
      'Sovi molempien matkustajien kanssa jättöjärjestyksestä ja hinnoitteluperusteesta ennen matkan alkua ja valitse järkevä yhdistetty reitti',
      'Anna sen matkustajan, joka nousi kyytiin ensin, päättää kaikesta yksin',
      'Jätä kauimpana oleva matkustaja ensin reitin tehokkuudesta riippumatta',
      'Kieltäydy kuljettamasta useampaa maksavaa määränpäätä samalla matkalla',
    ],
    correctAnswer: 0,
    explanation:
      'A shared trip needs the drop-off order and how the fare is split or calculated agreed with everyone before departure — sorting it out mid-route invites disputes. A sensible combined route serves both passengers reasonably rather than favouring whoever spoke first or is travelling furthest.',
    explanationFi:
      'Jaetussa kyydissä jättöjärjestyksestä ja hinnan jakautumisesta tai laskentatavasta on sovittava kaikkien kanssa ennen lähtöä — asian selvittäminen kesken matkan johtaa helposti riitaan. Järkevä yhdistetty reitti palvelee molempia matkustajia kohtuullisesti sen sijaan, että suosisi sitä, joka puhui ensin tai matkustaa kauimmas.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tc-14',
    category: 'Customer Service & Navigation',
    question: 'How should a driver confirm identity for a pre-booked pickup at a busy location?',
    questionFi: 'Miten kuljettajan tulee varmistaa henkilöllisyys ennalta varatussa noudossa vilkkaassa paikassa?',
    options: [
      'Check the passenger’s name or booking reference against the order before starting the trip',
      'Assume the first person who approaches the car is the correct passenger',
      'Skip verification entirely to save time',
      'Ask only for a destination, without checking any booking detail',
    ],
    optionsFi: [
      'Tarkista matkustajan nimi tai varaustunnus tilausta vasten ennen matkan aloittamista',
      'Oleta, että ensimmäinen autolle lähestyvä henkilö on oikea matkustaja',
      'Ohita varmistus kokonaan ajan säästämiseksi',
      'Kysy vain määränpää tarkistamatta mitään varaustietoa',
    ],
    correctAnswer: 0,
    explanation:
      'At a busy pickup point — a station, an airport, a nightclub queue — several people may approach the same car. Matching a name or booking reference before starting avoids picking up the wrong passenger and leaving the actual customer stranded.',
    explanationFi:
      'Vilkkaassa noutopaikassa — asemalla, lentokentällä, yökerhon jonossa — useampi henkilö voi lähestyä samaa autoa. Nimen tai varaustunnuksen täsmääminen ennen lähtöä estää väärän matkustajan poimimisen ja todellisen asiakkaan jäämisen ilman kyytiä.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-15',
    category: 'Customer Service & Navigation',
    question: 'The card payment terminal fails to read the customer’s card at the end of the trip. What should the driver do?',
    questionFi: 'Maksupääte ei lue asiakkaan korttia matkan lopussa. Mitä kuljettajan tulee tehdä?',
    options: [
      'Stay calm, offer an alternative payment method, and avoid pressuring or accusing the customer',
      'Assume the customer is trying to avoid paying and call the police immediately',
      'Insist on cash only, even if the customer has none available',
      'Drive the customer back to where they were picked up until payment succeeds',
    ],
    optionsFi: [
      'Pysy rauhallisena, tarjoa vaihtoehtoista maksutapaa äläkä painosta tai syytä asiakasta',
      'Oleta asiakkaan yrittävän välttää maksamisen ja soita poliisille heti',
      'Vaadi vain käteistä, vaikka asiakkaalla ei olisi sitä mukana',
      'Aja asiakas takaisin noutopaikkaan, kunnes maksu onnistuu',
    ],
    correctAnswer: 0,
    explanation:
      'A failed card reader is usually a technical problem, not an attempt to defraud, and treating an honest customer as a suspect damages trust and can escalate an ordinary hiccup into a real conflict. Offering another payment method — a different card, mobile payment, an invoice — resolves most cases calmly.',
    explanationFi:
      'Toimimaton maksupääte on yleensä tekninen ongelma, ei petosyritys, ja rehellisen asiakkaan kohtelu epäiltynä murentaa luottamusta ja voi muuttaa tavallisen kömmähdyksen todelliseksi konfliktiksi. Toisen maksutavan tarjoaminen — eri kortti, mobiilimaksu, lasku — ratkaisee useimmat tapaukset rauhallisesti.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-16',
    category: 'Customer Service & Navigation',
    question: 'A customer wants to smoke inside the taxi. What is the correct response?',
    questionFi: 'Asiakas haluaa tupakoida taksin sisällä. Mikä on oikea vastaus?',
    options: [
      'Politely decline, since smoking is not permitted inside the vehicle, and explain why',
      'Allow it if the customer offers extra payment',
      'Allow it only if the windows are opened',
      'Allow it without comment to avoid conflict',
    ],
    optionsFi: [
      'Kieltäydy kohteliaasti, koska tupakointi ei ole sallittua ajoneuvon sisällä, ja selitä syy',
      'Salli se, jos asiakas tarjoaa lisämaksua',
      'Salli se vain, jos ikkunat avataan',
      'Salli se kommentoimatta konfliktin välttämiseksi',
    ],
    correctAnswer: 0,
    explanation:
      'Smoking inside a public-facing vehicle affects the health and comfort of every passenger who rides after, and no amount of extra payment changes that. A brief, polite explanation usually resolves it without conflict — the driver is enforcing a standing rule, not making a personal judgment.',
    explanationFi:
      'Tupakointi yleisölle tarkoitetun ajoneuvon sisällä vaikuttaa jokaisen sen jälkeen matkustavan terveyteen ja viihtyvyyteen, eikä mikään lisämaksu muuta sitä. Lyhyt, kohtelias selitys ratkaisee tilanteen yleensä ilman konfliktia — kuljettaja noudattaa pysyvää sääntöä, ei tee henkilökohtaista arviota.',
    reference: 'Tupakkalaki 549/2016',
  },
  {
    id: 'tc-17',
    category: 'Customer Service & Navigation',
    question: 'A customer wants to bring a pet, which is not an assistance animal. What applies?',
    questionFi: 'Asiakas haluaa tuoda mukaan lemmikin, joka ei ole avustajaeläin. Mitä sovelletaan?',
    options: [
      'The driver may use reasonable discretion — accepting, declining, or asking for the pet to be carried or contained — since this differs from the mandatory acceptance of an assistance animal',
      'The driver must always accept, exactly as with an assistance animal',
      'Pets are always banned by law from any taxi',
      'The driver must charge exactly double the fare whenever a pet travels',
    ],
    optionsFi: [
      'Kuljettaja voi käyttää kohtuullista harkintaa — hyväksyä, kieltäytyä tai pyytää lemmikin kantamista tai häkittämistä — koska tämä eroaa avustajaeläimen pakollisesta hyväksymisestä',
      'Kuljettajan on aina hyväksyttävä lemmikki, aivan kuten avustajaeläin',
      'Lemmikit ovat lain nojalla aina kiellettyjä kaikissa takseissa',
      'Kuljettajan on aina veloitettava tarkalleen kaksinkertainen hinta, kun lemmikki matkustaa mukana',
    ],
    correctAnswer: 0,
    explanation:
      'An ordinary pet does not carry the legal protection an assistance animal has — the driver can reasonably decline, ask for a carrier, or agree to it on a case-by-case basis, which is a business judgment rather than a fixed legal requirement in either direction.',
    explanationFi:
      'Tavallisella lemmikillä ei ole samaa lakisääteistä suojaa kuin avustajaeläimellä — kuljettaja voi kohtuudella kieltäytyä, pyytää kuljetushäkkiä tai suostua tapauskohtaisesti, mikä on liiketoiminnallinen harkinta eikä kummankaan suuntainen kiinteä lakivaatimus.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-18',
    category: 'Customer Service & Navigation',
    question: 'A pre-booked customer does not appear at the pickup point after a reasonable wait. What should the driver do?',
    questionFi: 'Ennalta varannut asiakas ei ilmesty noutopaikalle kohtuullisen odotuksen jälkeen. Mitä kuljettajan tulee tehdä?',
    options: [
      'Try to contact the customer, wait a reasonable time as agreed by the booking terms, then follow the operator’s no-show procedure',
      'Leave immediately without any attempt to make contact',
      'Wait indefinitely regardless of other bookings',
      'Charge the next customer for the missed trip',
    ],
    optionsFi: [
      'Yritä tavoittaa asiakas, odota varausehtojen mukaisen kohtuullisen ajan ja noudata sitten liikenteenharjoittajan no-show-menettelyä',
      'Lähde heti ilman yhteydenottoyritystä',
      'Odota rajattomasti muista tilauksista riippumatta',
      'Veloita seuraavalta asiakkaalta menetetystä matkasta',
    ],
    correctAnswer: 0,
    explanation:
      'A no-show still deserves a genuine attempt at contact before the driver moves on — the customer may simply be delayed or at the wrong entrance. Beyond a reasonable wait, following the operator’s documented no-show process protects the driver’s time without abandoning the customer instantly.',
    explanationFi:
      'No-show-tilanteessakin kannattaa yrittää aidosti tavoittaa asiakas ennen kuin kuljettaja jatkaa eteenpäin — asiakas voi yksinkertaisesti olla myöhässä tai väärällä sisäänkäynnillä. Kohtuullisen odotuksen jälkeen liikenteenharjoittajan dokumentoidun no-show-menettelyn noudattaminen suojaa kuljettajan aikaa hylkäämättä asiakasta välittömästi.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-19',
    category: 'Customer Service & Navigation',
    question: 'A customer asks the driver to exceed the speed limit to save time. What is the correct response?',
    questionFi: 'Asiakas pyytää kuljettajaa ylittämään nopeusrajoituksen ajan säästämiseksi. Mikä on oikea vastaus?',
    options: [
      'Decline and explain that traffic law applies regardless of the customer’s request',
      'Comply if the customer offers to pay any resulting fine',
      'Comply if traffic is light and the risk seems low',
      'Comply only outside built-up areas',
    ],
    optionsFi: [
      'Kieltäytyä ja selittää, että liikennesääntöjä noudatetaan asiakkaan pyynnöstä riippumatta',
      'Suostua, jos asiakas tarjoutuu maksamaan mahdollisen sakon',
      'Suostua, jos liikenne on vähäistä ja riski vaikuttaa pieneltä',
      'Suostua vain taajaman ulkopuolella',
    ],
    correctAnswer: 0,
    explanation:
      'The driver, not the customer, is legally and professionally responsible for the vehicle’s speed, and a passenger offering to cover a fine does not transfer the risk to injury, licence points or liability. Traffic law does not bend to a passenger’s schedule.',
    explanationFi:
      'Kuljettaja, ei asiakas, vastaa laillisesti ja ammatillisesti ajoneuvon nopeudesta, eikä matkustajan tarjous maksaa mahdollinen sakko siirrä loukkaantumis-, pisteitys- tai vastuuriskiä. Liikennesäännöt eivät jousta matkustajan aikataulun mukaan.',
    reference: 'Tieliikennelaki 729/2018',
  },
  {
    id: 'tc-20',
    category: 'Customer Service & Navigation',
    question: 'A group booking arrives with more luggage than the vehicle can safely carry. What should the driver do?',
    questionFi: 'Ryhmävaraus saapuu enemmän matkatavaraa kuin ajoneuvo pystyy turvallisesti kuljettamaan. Mitä kuljettajan tulee tehdä?',
    options: [
      'Explain the limit clearly and suggest a practical solution, such as a second vehicle, rather than overloading the car',
      'Load the excess anyway and drive carefully',
      'Refuse the whole booking without offering any alternative',
      'Leave some of the group’s luggage behind without discussion',
    ],
    optionsFi: [
      'Selitä rajoitus selkeästi ja ehdota käytännön ratkaisua, kuten toista ajoneuvoa, sen sijaan että ylikuormittaisi auton',
      'Lastaa ylimäärä joka tapauksessa ja aja varovasti',
      'Kieltäytyä koko varauksesta tarjoamatta mitään vaihtoehtoa',
      'Jättää osa ryhmän matkatavarasta huomiotta keskustelematta',
    ],
    correctAnswer: 0,
    explanation:
      'An overloaded vehicle handles worse and can exceed its rated capacity, which is a safety problem, not just a comfort one. Explaining the limit and proposing a practical fix — a second car, a later trip for the excess — serves the customer better than either overloading the vehicle or refusing outright.',
    explanationFi:
      'Ylikuormattu ajoneuvo käyttäytyy huonommin ja voi ylittää sallitun kuormituksensa, mikä on turvallisuusongelma, ei vain mukavuuskysymys. Rajoituksen selittäminen ja käytännön ratkaisun ehdottaminen — toinen auto, myöhempi matka ylimäärälle — palvelee asiakasta paremmin kuin ajoneuvon ylikuormittaminen tai suora kieltäytyminen.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-21',
    category: 'Customer Service & Navigation',
    question: 'An airport pickup customer’s flight is delayed. What is good practice?',
    questionFi: 'Lentokentän noutoasiakkaan lento on myöhässä. Mikä on hyvä käytäntö?',
    options: [
      'Check the flight status where possible and adjust the pickup time rather than leaving without any attempt to confirm',
      'Leave at the originally booked time regardless of the flight status',
      'Charge a waiting fee immediately without checking the reason for the delay',
      'Cancel the booking automatically as soon as the flight is delayed',
    ],
    optionsFi: [
      'Tarkista lennon tilanne mahdollisuuksien mukaan ja mukauta noutoaikaa sen sijaan, että lähtisit ilman varmistusyritystä',
      'Lähde alun perin varattuna aikana lennon tilanteesta riippumatta',
      'Veloita odotusmaksu heti tarkistamatta viivästyksen syytä',
      'Peruuta varaus automaattisesti heti, kun lento myöhästyy',
    ],
    correctAnswer: 0,
    explanation:
      'Flight delays are common and outside the customer’s control, so checking the actual status and adjusting the pickup accordingly is better service than rigidly following the original time or cancelling automatically — a waiting fee, where applicable, is a separate matter from abandoning the booking.',
    explanationFi:
      'Lentojen viivästykset ovat yleisiä eivätkä asiakkaan hallinnassa, joten todellisen tilanteen tarkistaminen ja noutoajan mukauttaminen on parempaa palvelua kuin jäykkä alkuperäisessä ajassa pysyminen tai automaattinen peruutus — odotusmaksu, jos sellainen sovelletaan, on eri asia kuin varauksen hylkääminen.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-22',
    category: 'Customer Service & Navigation',
    question: 'A tourist gives directions in a language the driver does not speak well. What is the best approach?',
    questionFi: 'Turisti antaa ohjeita kielellä, jota kuljettaja ei osaa hyvin. Mikä on paras lähestymistapa?',
    options: [
      'Use simple language, gestures, a map, or a translation app to confirm the destination clearly before starting',
      'Guess the destination and start driving to save time',
      'Refuse the trip because of the language barrier',
      'Insist the customer speak only Finnish',
    ],
    optionsFi: [
      'Käytä yksinkertaista kieltä, eleitä, karttaa tai käännössovellusta varmistaaksesi määränpään selkeästi ennen lähtöä',
      'Arvaa määränpää ja aloita ajo ajan säästämiseksi',
      'Kieltäydy matkasta kielimuurin vuoksi',
      'Vaadi asiakasta puhumaan vain suomea',
    ],
    correctAnswer: 0,
    explanation:
      'Guessing a destination risks driving a paying customer to the wrong place entirely, which wastes both their time and money. A map, a written address or a translation app resolves most language barriers in under a minute and is worth that pause before setting off.',
    explanationFi:
      'Määränpään arvaaminen voi viedä maksavan asiakkaan täysin väärään paikkaan, mikä tuhlaa sekä hänen aikaansa että rahaansa. Kartta, kirjoitettu osoite tai käännössovellus ratkaisee useimmat kielimuurit alle minuutissa, ja se tauko kannattaa ottaa ennen lähtöä.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-23',
    category: 'Customer Service & Navigation',
    question: 'A customer asks for the receipt to be sent by email rather than printed. What should the driver do?',
    questionFi: 'Asiakas pyytää kuitin sähköpostitse painetun sijaan. Mitä kuljettajan tulee tehdä?',
    options: [
      'Provide it electronically if the system supports it, since the requirement is that a proper receipt is given, not a specific paper format',
      'Refuse, since only a printed paper receipt counts as valid',
      'Charge an extra fee for an electronic receipt',
      'Ignore the request and hand over nothing',
    ],
    optionsFi: [
      'Toimita se sähköisesti, jos järjestelmä tukee sitä, koska vaatimuksena on asianmukaisen kuitin antaminen, ei tietty paperimuoto',
      'Kieltäytyä, koska vain painettu paperikuitti kelpaa',
      'Veloittaa lisämaksu sähköisestä kuitista',
      'Jättää pyyntö huomiotta eikä antaa mitään',
    ],
    correctAnswer: 0,
    explanation:
      'The substance of the receipt requirement — verifiable pricing detail handed to the customer — matters more than the medium. An email or app-delivered receipt satisfies that just as well as paper, provided the system used actually supports it.',
    explanationFi:
      'Kuittivaatimuksen ydin — asiakkaalle annettu todennettava hintaerittely — on tärkeämpi kuin väline. Sähköpostitse tai sovelluksen kautta toimitettu kuitti täyttää tämän yhtä hyvin kuin paperi, kunhan käytetty järjestelmä todella tukee sitä.',
    reference: 'Laki liikenteen palveluista 320/2017',
  },
  {
    id: 'tc-24',
    category: 'Customer Service & Navigation',
    question: 'A booking is for an unaccompanied minor. What extra care applies?',
    questionFi: 'Varaus koskee ilman saattajaa matkustavaa alaikäistä. Mitä lisähuolellisuutta sovelletaan?',
    options: [
      'Confirm the booking details carefully, ensure the child is handed over safely at the destination, and follow any specific instructions from the guardian or operator',
      'Treat it exactly like any adult booking with no extra care',
      'Refuse all bookings involving unaccompanied minors',
      'Leave the child at the nearest convenient point rather than the exact destination',
    ],
    optionsFi: [
      'Varmista varaustiedot huolellisesti, varmista lapsen turvallinen luovutus määränpäässä ja noudata huoltajan tai liikenteenharjoittajan erityisohjeita',
      'Kohtele varausta täsmälleen kuten mitä tahansa aikuisen varausta ilman lisähuolellisuutta',
      'Kieltäydy kaikista varauksista, jotka koskevat ilman saattajaa matkustavia alaikäisiä',
      'Jätä lapsi lähimpään sopivaan pisteeseen tarkan määränpään sijaan',
    ],
    correctAnswer: 0,
    explanation:
      'A child travelling alone carries a heightened duty of care — confirming who is expected to receive them and following any guardian instructions matters more than it would for an adult passenger, and dropping them somewhere other than the agreed, supervised destination defeats the point of those precautions.',
    explanationFi:
      'Yksin matkustava lapsi edellyttää korostettua huolellisuusvelvollisuutta — sen varmistaminen, kuka lapsen on tarkoitus ottaa vastaan, ja huoltajan ohjeiden noudattaminen on tärkeämpää kuin aikuisen matkustajan kohdalla, ja lapsen jättäminen muualle kuin sovittuun, valvottuun määränpäähän tekee tyhjäksi näiden varotoimien tarkoituksen.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-25',
    category: 'Customer Service & Navigation',
    question: 'What is good practice for a driver’s own safety on a late-night trip to an unfamiliar address?',
    questionFi: 'Mikä on hyvä käytäntö kuljettajan omalle turvallisuudelle yömyöhäisellä matkalla vieraaseen osoitteeseen?',
    options: [
      'Let the dispatch system or operator know the destination and trip details, as the normal system supports',
      'Turn off any tracking so the customer feels more comfortable',
      'Avoid night trips to unfamiliar addresses altogether, without exception',
      'Rely only on personal judgement with no system support',
    ],
    optionsFi: [
      'Anna tilausjärjestelmän tai liikenteenharjoittajan tietää määränpää ja matkan tiedot normaalin järjestelmän mukaisesti',
      'Sammuta kaikki seuranta, jotta asiakas tuntee olonsa mukavammaksi',
      'Vältä yöaikaisia matkoja vieraisiin osoitteisiin poikkeuksetta',
      'Luota vain henkilökohtaiseen harkintaan ilman järjestelmän tukea',
    ],
    correctAnswer: 0,
    explanation:
      'Modern taxi dispatch and payment systems typically log trip details, which is a safety net for the driver on an unfamiliar late-night trip — deliberately switching that off removes a protection with no real benefit to the customer, who is not asked to consent to it being off.',
    explanationFi:
      'Nykyaikaiset taksien tilaus- ja maksujärjestelmät tallentavat yleensä matkatiedot, mikä toimii turvaverkkona kuljettajalle vieraalla yömyöhäisellä matkalla — sen tarkoituksellinen sammuttaminen poistaa suojan ilman todellista hyötyä asiakkaalle, jolta ei edes kysytä suostumusta sen pois kytkemiseen.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-26',
    category: 'Customer Service & Navigation',
    question: 'Satellite navigation suggests a route that the driver knows is currently blocked by roadworks. What should the driver do?',
    questionFi: 'Satelliittinavigointi ehdottaa reittiä, jonka kuljettaja tietää olevan parhaillaan tietöiden vuoksi suljettu. Mitä kuljettajan tulee tehdä?',
    options: [
      'Use local knowledge to take a suitable alternative and briefly explain the change to the customer',
      'Follow the navigation instruction exactly, even into a road that is closed',
      'Stop the trip and ask the customer to find another taxi',
      'Take a much longer detour without explanation to be safe',
    ],
    optionsFi: [
      'Käytä paikallistuntemusta ja valitse sopiva vaihtoehtoinen reitti sekä selitä muutos lyhyesti asiakkaalle',
      'Noudata navigointiohjetta tarkalleen, vaikka se johtaisi suljetulle tielle',
      'Keskeytä matka ja pyydä asiakasta etsimään toinen taksi',
      'Ota paljon pidempi kiertotie ilman selitystä varmuuden vuoksi',
    ],
    correctAnswer: 0,
    explanation:
      'Navigation software works from data that is not always current — roadworks, temporary closures and local detours are exactly where a driver’s own knowledge should override the app. A brief explanation to the customer avoids the impression of an unexplained, unnecessary detour.',
    explanationFi:
      'Navigointiohjelmisto perustuu dataan, joka ei aina ole ajan tasalla — tietyöt, tilapäiset sulut ja paikalliset kiertotiet ovat juuri niitä tilanteita, joissa kuljettajan oman tietämyksen tulee ohittaa sovellus. Lyhyt selitys asiakkaalle estää vaikutelman selittämättömästä, tarpeettomasta kiertotiestä.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-27',
    category: 'Customer Service & Navigation',
    question: 'How should a driver use a mobile phone while driving with a customer aboard?',
    questionFi: 'Miten kuljettajan tulee käyttää matkapuhelinta ajaessaan asiakkaan kanssa?',
    options: [
      'Only hands-free and only as far as it does not distract from safe driving, with dispatch or booking matters kept brief',
      'Freely, including handheld texting, as long as traffic is light',
      'Never, even for hands-free navigation or dispatch calls',
      'Handheld is fine as long as the customer does not object',
    ],
    optionsFi: [
      'Vain käsiä vapaana ja vain siinä määrin, ettei se häiritse turvallista ajamista, ja tilaus- tai välitysasiat pidetään lyhyinä',
      'Vapaasti, myös käsin kirjoittaen tekstiviestejä, kunhan liikenne on vähäistä',
      'Ei koskaan, ei edes käsivapaana navigointiin tai välityspuheluihin',
      'Käsin käyttö on sallittua, kunhan asiakas ei vastusta',
    ],
    correctAnswer: 0,
    explanation:
      'Handheld phone use while driving is both a legal violation and a direct safety risk to the passenger being carried — hands-free use for dispatch or navigation is the accepted middle ground, and even that should stay brief enough not to divide the driver’s attention from the road.',
    explanationFi:
      'Käsin tapahtuva puhelimen käyttö ajon aikana on sekä lainvastaista että suora turvallisuusriski kyydissä olevalle matkustajalle — käsivapaa käyttö välitys- tai navigointiasioihin on hyväksytty välimuoto, ja senkin tulee pysyä riittävän lyhyenä, ettei kuljettajan huomio jakaudu pois tieltä.',
    reference: 'Tieliikennelaki 729/2018',
  },
  {
    id: 'tc-28',
    category: 'Customer Service & Navigation',
    question: 'A customer wants to cancel a pre-booked trip shortly before pickup. What is good practice?',
    questionFi: 'Asiakas haluaa peruuttaa ennalta varatun matkan hieman ennen noutoa. Mikä on hyvä käytäntö?',
    options: [
      'Explain the operator’s cancellation terms clearly and calmly, without pressuring the customer to keep the booking',
      'Refuse to allow any cancellation once a booking is made',
      'Charge the full original fare regardless of the stated cancellation terms',
      'Ignore the cancellation request and arrive anyway',
    ],
    optionsFi: [
      'Selitä liikenteenharjoittajan peruutusehdot selkeästi ja rauhallisesti painostamatta asiakasta pitämään varausta voimassa',
      'Kieltäytyä sallimasta mitään peruutusta varauksen tekemisen jälkeen',
      'Veloita koko alkuperäinen hinta ilmoitetuista peruutusehdoista riippumatta',
      'Jättää peruutuspyyntö huomiotta ja saapua joka tapauksessa',
    ],
    correctAnswer: 0,
    explanation:
      'Cancellation terms are set in advance by the operator and should simply be communicated clearly, not enforced through pressure or ignored outright — a customer who feels pressured or overcharged is unlikely to book again, and disregarding a cancellation wastes the driver’s own time too.',
    explanationFi:
      'Peruutusehdot on asetettu etukäteen liikenteenharjoittajan toimesta, ja ne tulee vain selittää selkeästi, ei toteuttaa painostamalla tai jättää huomiotta — painostetuksi tai ylihinnoitelluksi tunteva asiakas ei todennäköisesti varaa uudelleen, ja peruutuksen huomiotta jättäminen tuhlaa myös kuljettajan omaa aikaa.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-29',
    category: 'Customer Service & Navigation',
    question: 'A nervous first-time flyer needs a taxi to the airport with time pressure. What is good service?',
    questionFi: 'Ensimmäistä kertaa lentävä, hermostunut asiakas tarvitsee taksin lentokentälle aikapaineen alla. Mikä on hyvää palvelua?',
    options: [
      'Stay calm and reassuring, confirm the timing realistically, and choose an efficient, safe route without transmitting the passenger’s anxiety into rushed driving',
      'Match the passenger’s anxiety and drive as fast as possible regardless of conditions',
      'Dismiss the passenger’s concerns as unnecessary',
      'Take the scenic route to keep the passenger calm, ignoring the time pressure',
    ],
    optionsFi: [
      'Pysy rauhallisena ja rauhoittavana, vahvista aikataulu realistisesti ja valitse tehokas, turvallinen reitti siirtämättä matkustajan ahdistusta hätäiseen ajotapaan',
      'Vastaa matkustajan ahdistukseen ajamalla mahdollisimman nopeasti olosuhteista riippumatta',
      'Vähättele matkustajan huolta tarpeettomana',
      'Valitse maisemareitti matkustajan rauhoittamiseksi aikapaineesta huolimatta',
    ],
    correctAnswer: 0,
    explanation:
      'A calm, competent driver reduces a nervous passenger’s anxiety more than speed does, and matching their anxiety with rushed driving only compounds the risk. A realistic, honest estimate of arrival time is more reassuring than false confidence or an unnecessarily long route.',
    explanationFi:
      'Rauhallinen, osaava kuljettaja vähentää hermostuneen matkustajan ahdistusta enemmän kuin nopeus, ja ahdistukseen vastaaminen hätäisellä ajolla vain kasvattaa riskiä. Realistinen, rehellinen arvio saapumisajasta on rauhoittavampi kuin valheellinen varmuus tai tarpeettoman pitkä reitti.',
    reference: 'Traficom — taxi driver guidance',
  },
  {
    id: 'tc-30',
    category: 'Customer Service & Navigation',
    question: 'What best describes professional conduct expected of a taxi driver overall?',
    questionFi: 'Mikä kuvaa parhaiten taksinkuljettajalta odotettua ammattimaista käytöstä kokonaisuutena?',
    options: [
      'Calm, courteous, safety-focused service that treats every passenger with equal respect, regardless of who they are',
      'Whatever style of driving and interaction earns the highest tips in the moment',
      'Strict formality with no adaptation to individual passenger needs',
      'Prioritising the fastest possible trip over passenger comfort in every situation',
    ],
    optionsFi: [
      'Rauhallinen, kohtelias ja turvallisuuteen keskittyvä palvelu, joka kohtelee jokaista matkustajaa yhtäläisellä kunnioituksella riippumatta siitä, kuka hän on',
      'Mikä tahansa ajo- ja vuorovaikutustyyli, joka tuottaa parhaat juomarahat sillä hetkellä',
      'Tiukka muodollisuus ilman mukautumista yksittäisen matkustajan tarpeisiin',
      'Mahdollisimman nopean matkan asettaminen matkustajan mukavuuden edelle joka tilanteessa',
    ],
    correctAnswer: 0,
    explanation:
      'Professional standards exist independent of tips or individual preference — calm, safe, respectful service to every passenger is the baseline, and adapting communication style to a passenger’s needs (as with disability, language or age) is part of that standard, not a departure from formality.',
    explanationFi:
      'Ammatilliset standardit ovat olemassa riippumatta juomarahoista tai yksittäisistä mieltymyksistä — rauhallinen, turvallinen ja kunnioittava palvelu jokaiselle matkustajalle on perustaso, ja viestintätyylin mukauttaminen matkustajan tarpeisiin (esimerkiksi vamman, kielen tai iän vuoksi) kuuluu tähän standardiin, ei ole poikkeama muodollisuudesta.',
    reference: 'Traficom — taxi driver guidance',
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
