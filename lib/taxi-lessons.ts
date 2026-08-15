import type { TaxiCategory } from './taxi-types';

/**
 * Bilingual study notes for the taxi driver qualification track
 * (taksinkuljettajan ajolupakoe), shown above the practice questions on each
 * category's study page. These are a revision aid, not a substitute for
 * Traficom's own material — content should be checked against the current
 * official guidance before an exam attempt.
 */
export interface TaxiLessonSection {
  heading: string;
  headingFi: string;
  points: string[];
  pointsFi: string[];
}

export interface TaxiLesson {
  intro: string;
  introFi: string;
  sections: TaxiLessonSection[];
}

export const TAXI_LESSONS: Record<TaxiCategory, TaxiLesson> = {
  'Passenger Safety & Accessibility': {
    intro:
      'This category tests whether a driver can carry every kind of passenger — wheelchair users, guide dog owners, children, elderly and cognitively impaired passengers — safely and with dignity, and can respond correctly when something goes wrong mid-trip.',
    introFi:
      'Tämä kategoria testaa, osaako kuljettaja kuljettaa kaikenlaisia matkustajia — pyörätuolin käyttäjiä, opaskoiran omistajia, lapsia sekä iäkkäitä ja kognitiivisesti rajoittuneita matkustajia — turvallisesti ja arvokkaasti, ja osaako hän toimia oikein, jos jotain menee pieleen kesken matkan.',
    sections: [
      {
        heading: 'Securing wheelchairs and mobility aids',
        headingFi: 'Pyörätuolien ja liikkumisen apuvälineiden kiinnittäminen',
        points: [
          'A wheelchair is always anchored forward-facing with a four-point tie-down; the passenger needs a separate occupant belt, not just the wheelchair straps.',
          'Wheelchair brakes alone are never a valid restraint — they will not hold in a collision.',
          'Fold and secure a rollator or walker in the boot rather than leaving it loose in the cabin.',
          'Check the surrounding ground is level and clear before operating a ramp or lift, and stay within its rated weight limit.',
        ],
        pointsFi: [
          'Pyörätuoli kiinnitetään aina menosuuntaan neljän pisteen kiinnityksellä; matkustaja tarvitsee erillisen turvavyön, ei pelkkiä pyörätuolin hihnoja.',
          'Pyörätuolin jarrut eivät koskaan yksin riitä turvalaitteeksi — ne eivät pidä törmäyksessä.',
          'Taita ja kiinnitä rollaattori tai kävelyteline tavaratilaan sen sijaan, että se jää irralleen matkustamoon.',
          'Tarkista ramppia tai hissiä käyttäessäsi, että ympäröivä alusta on tasainen ja vapaa, ja pysy laitteen painorajoissa.',
        ],
      },
      {
        heading: 'Assistance animals vs. pets',
        headingFi: 'Avustajaeläimet vs. lemmikit',
        points: [
          'A guide or assistance dog performing a task may never be refused and travels free of charge — refusing is treated as discrimination.',
          'A driver’s own allergy does not justify refusing an assistance dog; arrange the trip through another vehicle instead.',
          'An ordinary pet is different: the driver may reasonably decline, ask for a carrier, or agree case by case.',
        ],
        pointsFi: [
          'Työtehtävää suorittavaa opas- tai avustajakoiraa ei saa koskaan kieltäytyä ottamasta, ja se matkustaa maksutta — kieltäytyminen katsotaan syrjinnäksi.',
          'Kuljettajan oma allergia ei oikeuta kieltäytymään avustajakoirasta; järjestä matka toisella ajoneuvolla.',
          'Tavallinen lemmikki on eri asia: kuljettaja voi kohtuudella kieltäytyä, pyytää kuljetushäkkiä tai suostua tapauskohtaisesti.',
        ],
      },
      {
        heading: 'Children in the taxi',
        headingFi: 'Lapset taksissa',
        points: [
          'Under 3 years: an appropriate child restraint is mandatory; without one, the trip cannot legally be made.',
          'Under 135 cm: a booster or cushion is needed so the adult belt routes correctly over shoulder and hip — the bare adult belt is not enough.',
          'Passengers over 15 are responsible for their own belt; the driver answers for children under 15.',
          'Never drive off — or leave — with a young child unsupervised in the vehicle.',
        ],
        pointsFi: [
          'Alle 3-vuotiaat: asianmukainen turvalaite on pakollinen; ilman sitä matkaa ei voi laillisesti tehdä.',
          'Alle 135 cm: tarvitaan korotusistuin tai -tyyny, jotta aikuisen turvavyö kulkee oikein olkapään ja lantion yli — pelkkä aikuisen vyö ei riitä.',
          'Yli 15-vuotias matkustaja vastaa itse turvavyöstään; kuljettaja vastaa alle 15-vuotiaista lapsista.',
          'Älä koskaan aja pois — äläkä jätä — pientä lasta valvomatta ajoneuvoon.',
        ],
      },
      {
        heading: 'Sensory, memory and developmental needs',
        headingFi: 'Aisti-, muisti- ja kehitykselliset erityistarpeet',
        points: [
          'Guide a blind passenger by offering your arm and placing their hand on the door frame — never push or pull them.',
          'Face a deaf or hard-of-hearing passenger when speaking; use notes or a phone screen as backup.',
          'For a passenger with a memory disorder, confirm the destination against the booking and hand them over at the destination rather than leaving them at the kerb.',
          'For sensory overload (e.g. autism spectrum passengers), lower the radio and let the passenger set the pace of conversation.',
        ],
        pointsFi: [
          'Opasta näkövammaista matkustajaa tarjoamalla käsivartesi ja ohjaamalla hänen kätensä oven karmiin — älä koskaan työnnä tai vedä.',
          'Käänny kuuroa tai huonokuuloista matkustajaa kohti puhuessasi; käytä tarvittaessa muistiinpanoja tai puhelimen näyttöä.',
          'Muistisairaan matkustajan kohdalla varmista määränpää varauksesta ja luovuta hänet perille sen sijaan, että jättäisit hänet tien reunaan.',
          'Aistiylikuormituksessa (esim. autismikirjon matkustaja) hiljennä radio ja anna matkustajan säädellä keskustelun tahtia.',
        ],
      },
      {
        heading: 'Emergencies and first aid',
        headingFi: 'Hätätilanteet ja ensiapu',
        points: [
          'A first aid kit and a fire extinguisher must be carried and genuinely reachable, not buried under luggage.',
          'For an unresponsive passenger: stop safely first, then assess and call for help.',
          'During a seizure: never restrain the movements — clear the area, protect the head, and time it.',
          'Always find a safe place to stop before assessing a medical issue — never stop in a live traffic lane.',
        ],
        pointsFi: [
          'Ensiapupakkaus ja käsisammutin on oltava mukana ja aidosti saatavilla, ei matkatavaroiden alla.',
          'Reagoimattoman matkustajan kohdalla: pysähdy ensin turvallisesti, arvioi tilanne ja soita apua.',
          'Kohtauksen aikana: älä koskaan pidättele liikkeitä — vapauta ympäristö, suojaa pää ja seuraa kestoa.',
          'Etsi aina turvallinen pysähtymispaikka ennen terveydentilan arviointia — älä koskaan pysähdy keskelle liikennettä.',
        ],
      },
    ],
  },
  'Legislation & Taxi Rules': {
    intro:
      'This category covers the legal framework a taxi driver operates under: who may hold a licence and how it is kept valid, what the vehicle and pricing equipment must meet, and how pricing, receipts and passenger rights are protected in law.',
    introFi:
      'Tämä kategoria kattaa taksinkuljettajan toimintaa säätelevän lainsäädännön: kuka voi saada ajoluvan ja miten se pidetään voimassa, mitä ajoneuvolta ja hinnoittelulaitteilta vaaditaan, sekä miten hinnoittelu, kuitit ja matkustajan oikeudet on suojattu laissa.',
    sections: [
      {
        heading: 'Getting and keeping the licence',
        headingFi: 'Luvan saaminen ja voimassa pitäminen',
        points: [
          'A taxi driver’s licence (ajolupa) is required to drive a taxi in Finland and must be carried or otherwise verifiable while working.',
          'Reliability is an ongoing requirement, not a one-time check — a serious traffic offence or a drink-driving conviction, even off duty, can lead to suspension or revocation.',
          'Health certification follows the stricter standard set for professional drivers, renewed on a schedule, not checked only once.',
          'Driving fare-paying passengers with an expired licence is unlawful, even for a short lapse or mid-renewal.',
        ],
        pointsFi: [
          'Taksinkuljettajan ajolupa vaaditaan taksin kuljettamiseen Suomessa, ja se on pidettävä mukana tai muuten todennettavissa työn aikana.',
          'Luotettavuusvaatimus on jatkuva, ei kertaluonteinen tarkastus — vakava liikennerikkomus tai rattijuopumustuomio, myös vapaa-ajalla, voi johtaa luvan keskeyttämiseen tai peruuttamiseen.',
          'Terveystodistus noudattaa ammattikuljettajille asetettua tiukempaa standardia ja uusitaan aikataulun mukaan, ei vain kerran.',
          'Maksavien matkustajien kuljettaminen umpeutuneella luvalla on lainvastaista, myös lyhyen katkon tai uusimisen ollessa kesken.',
        ],
      },
      {
        heading: 'Vehicle and equipment requirements',
        headingFi: 'Ajoneuvo- ja laitevaatimukset',
        points: [
          'The vehicle needs a valid periodic inspection (katsastus) and statutory motor liability insurance before carrying fare-paying passengers.',
          'A distance-and-time fare requires an approved, calibrated metering device, and the amount charged must match what it calculates.',
          'Overcharging beyond the disclosed pricing basis — even mid-trip — breaches the price transparency requirement.',
        ],
        pointsFi: [
          'Ajoneuvolla on oltava voimassa oleva määräaikaiskatsastus ja lakisääteinen liikennevakuutus ennen maksavien matkustajien kuljettamista.',
          'Matka- ja aikaperusteinen hinnoittelu edellyttää hyväksyttyä, kalibroitua mittauslaitetta, ja veloitetun summan on vastattava sen laskemaa.',
          'Ylihinnoittelu ilmoitetun hinnoitteluperusteen yli — myös kesken matkan — rikkoo hinnoittelun läpinäkyvyysvaatimusta.',
        ],
      },
      {
        heading: 'Pricing, receipts and lost property',
        headingFi: 'Hinnoittelu, kuitit ja löytötavarat',
        points: [
          'The pricing basis must be shown or available to the customer before the trip, not only revealed at the end.',
          'A receipt must contain enough detail to verify the fare charged — a bare total is not sufficient, and the format (paper or electronic) does not matter as long as the substance is there.',
          'Property left behind by a passenger must be handled through the proper lost-property process; a forgotten mobility aid needs faster action since the passenger may be stranded without it.',
        ],
        pointsFi: [
          'Hinnoitteluperuste on esitettävä tai oltava saatavilla asiakkaalle ennen matkaa, ei paljastettava vasta lopussa.',
          'Kuitissa on oltava riittävät tiedot veloitetun hinnan tarkistamiseksi — pelkkä loppusumma ei riitä, eikä muoto (paperi vai sähköinen) ole olennainen, kunhan sisältö on kunnossa.',
          'Matkustajan jättämä omaisuus käsitellään asianmukaisen löytötavaramenettelyn kautta; unohtunut liikkumisen apuväline vaatii nopeampaa toimintaa, koska matkustaja voi jäädä avuttomaksi ilman sitä.',
        ],
      },
      {
        heading: 'Working time, data protection and refusal',
        headingFi: 'Työaika, tietosuoja ja kieltäytyminen',
        points: [
          'Working hours and rest periods are regulated and must be recorded, since an unenforceable limit protects no one from fatigue.',
          'Customer data (bookings, trip history) is personal data under GDPR — collect only for a legitimate purpose, keep it secure, never sell it.',
          'A driver may refuse a fare only for a genuine reason (safety, an unsuitable vehicle) — refusing because of a passenger’s disability or similar protected characteristic is unlawful discrimination.',
        ],
        pointsFi: [
          'Työ- ja lepoaikoja säädellään, ja ne on kirjattava, koska valvomaton raja ei suojaa ketään väsymykseltä.',
          'Asiakastiedot (varaukset, matkahistoria) ovat GDPR:n mukaisia henkilötietoja — niitä kerätään vain hyväksyttävään tarkoitukseen, säilytetään turvallisesti eikä koskaan myydä.',
          'Kuljettaja voi kieltäytyä ajosta vain aidosta syystä (turvallisuus, sopimaton ajoneuvo) — kieltäytyminen matkustajan vamman tai vastaavan suojatun ominaisuuden vuoksi on laitonta syrjintää.',
        ],
      },
      {
        heading: 'Oversight and accidents',
        headingFi: 'Valvonta ja onnettomuudet',
        points: [
          'Traficom is the licensing and supervisory authority for taxi transport and the body complaints are escalated to.',
          'After any accident involving a passenger: stop, assist, exchange information and report it — regardless of how minor it looks.',
          'A licence granted under current law is nationally valid, though local route knowledge is still expected wherever the driver actually works.',
        ],
        pointsFi: [
          'Traficom on taksiliikenteen lupa- ja valvontaviranomainen, jolle valitukset viedään.',
          'Matkustajaa koskevan onnettomuuden jälkeen: pysähdy, auta, vaihda tiedot ja tee ilmoitus — riippumatta siitä, kuinka vähäiseltä se vaikuttaa.',
          'Nykylainsäädännön mukainen lupa on voimassa koko maassa, mutta paikallista reittituntemusta odotetaan silti siellä, missä kuljettaja tosiasiassa toimii.',
        ],
      },
    ],
  },
  'Customer Service & Navigation': {
    intro:
      'This category tests professional conduct under real conditions: choosing routes without instructions, handling disputes and difficult passengers calmly, and communicating clearly across language, age and ability differences.',
    introFi:
      'Tämä kategoria testaa ammattimaista käytöstä todellisissa tilanteissa: reitin valintaa ilman ohjeita, riitojen ja hankalien matkustajien rauhallista käsittelyä sekä selkeää viestintää kieli-, ikä- ja kykyeroista huolimatta.',
    sections: [
      {
        heading: 'Route and navigation',
        headingFi: 'Reitti ja navigointi',
        points: [
          'With no instructions, take the most direct, efficient route — never the one that maximises the fare.',
          'A customer requesting a slower, costlier route should be told the faster option, but the customer’s explicit choice is respected.',
          'Local knowledge should override satellite navigation when it is out of date — roadworks and temporary closures are the classic case — with a brief explanation to the customer.',
        ],
        pointsFi: [
          'Ilman ohjeita valitaan suorin, tehokkain reitti — ei koskaan sitä, joka maksimoi hinnan.',
          'Hitaampaa ja kalliimpaa reittiä pyytävälle asiakkaalle kerrotaan nopeampi vaihtoehto, mutta asiakkaan nimenomaista valintaa kunnioitetaan.',
          'Paikallistuntemuksen tulee ohittaa satelliittinavigointi, kun se on vanhentunutta — tietyöt ja tilapäiset sulut ovat tyyppiesimerkki — ja asiakkaalle annetaan lyhyt selitys.',
        ],
      },
      {
        heading: 'Disputes and difficult situations',
        headingFi: 'Riidat ja hankalat tilanteet',
        points: [
          'A fare dispute: stay calm, show the pricing basis and receipt, and resolve it through the operator or police rather than by confrontation — never detain the passenger or take their property.',
          'A calm but intoxicated passenger who wants to go home: professional service, not automatic refusal.',
          'An aggressive or threatening passenger: prioritise safety — de-escalate, and involve the operator or police where needed.',
        ],
        pointsFi: [
          'Maksuriita: pysy rauhallisena, näytä hinnoitteluperuste ja kuitti, ja ratkaise asia liikenteenharjoittajan tai poliisin kautta, ei vastakkainasettelulla — älä koskaan pidätä matkustajaa tai hänen omaisuuttaan.',
          'Rauhallinen mutta päihtynyt matkustaja, joka haluaa kotiin: ammattimaista palvelua, ei automaattista kieltäytymistä.',
          'Aggressiivinen tai uhkaava matkustaja: aseta turvallisuus etusijalle — rauhoita tilannetta ja ota tarvittaessa yhteyttä liikenteenharjoittajaan tai poliisiin.',
        ],
      },
      {
        heading: 'Communication across differences',
        headingFi: 'Viestintä eroista huolimatta',
        points: [
          'A language barrier: use simple language, a map or a translation app to confirm the destination — never guess and start driving.',
          'An unaccompanied minor: confirm booking details carefully and ensure a safe hand-over at the destination.',
          'Confidential information learned during a trip stays confidential — it is not shared onward.',
        ],
        pointsFi: [
          'Kielimuuri: käytä yksinkertaista kieltä, karttaa tai käännössovellusta määränpään varmistamiseen — älä koskaan arvaa ja lähde ajamaan.',
          'Ilman saattajaa matkustava alaikäinen: varmista varaustiedot huolellisesti ja huolehdi turvallisesta luovutuksesta määränpäässä.',
          'Matkan aikana opitut luottamukselliset tiedot pysyvät luottamuksellisina — niitä ei jaeta eteenpäin.',
        ],
      },
      {
        heading: 'Bookings, cancellations and logistics',
        headingFi: 'Varaukset, peruutukset ja logistiikka',
        points: [
          'A pre-booked no-show: attempt contact first, wait a reasonable time, then follow the operator’s process.',
          'Running late for a booking: notify the customer rather than letting them find out by waiting.',
          'A shared trip with multiple destinations: agree the drop-off order and pricing basis with everyone before starting.',
          'Cancellation requests: explain the operator’s terms calmly, without pressuring the customer to keep the booking.',
        ],
        pointsFi: [
          'Ennalta varattu no-show: yritä ensin tavoittaa asiakas, odota kohtuullinen aika ja noudata sitten liikenteenharjoittajan menettelyä.',
          'Myöhästyminen varatusta noudosta: ilmoita asiakkaalle sen sijaan, että hän huomaa asian odottamalla.',
          'Useamman määränpään jaettu kyyti: sovi jättöjärjestyksestä ja hinnoitteluperusteesta kaikkien kanssa ennen lähtöä.',
          'Peruutuspyynnöt: selitä liikenteenharjoittajan ehdot rauhallisesti painostamatta asiakasta pitämään varausta voimassa.',
        ],
      },
      {
        heading: 'Professional conduct on the road',
        headingFi: 'Ammattimainen käytös liikenteessä',
        points: [
          'Only hands-free phone use, kept brief, even for dispatch or navigation.',
          'Never exceed the speed limit at a customer’s request — the driver, not the passenger, carries the legal responsibility.',
          'Calm, courteous, equally respectful service to every passenger is the baseline — not something earned by tips or adjusted by who the passenger is.',
        ],
        pointsFi: [
          'Vain käsivapaa puhelimen käyttö, ja senkin lyhyenä, myös välitys- tai navigointiasioissa.',
          'Älä koskaan ylitä nopeusrajoitusta asiakkaan pyynnöstä — kuljettaja, ei matkustaja, kantaa laillisen vastuun.',
          'Rauhallinen, kohtelias ja yhtäläisen kunnioittava palvelu jokaiselle matkustajalle on perustaso — ei jotain, joka ansaitaan juomarahoilla tai mukautetaan sen mukaan, kuka matkustaja on.',
        ],
      },
    ],
  },
};
