import { withDeterministicOptionOrder } from '@/lib/question-utils';
import type { TaxiCategory, TaxiQuestion } from '@/lib/taxi-types';

export type { TaxiCategory, TaxiQuestion, TaxiExamResult, TaxiCategoryScore } from '@/lib/taxi-types';

/**
 * Seed question bank for the Traficom taxi driver qualification exam
 * (taksinkuljettajan ajolupakoe).
 *
 * Content is grounded in Laki liikenteen palveluista 320/2017 (Act on Transport
 * Services), Tieliikennelaki 729/2018 and Traficom's taxi driver guidance.
 *
 * Distribution — 12 per category, so a full 30-question mock exam (10 per
 * category) can always be assembled without repetition:
 *   Passenger Safety & Accessibility  12
 *   Legislation & Taxi Rules          12
 *   Customer Service & Navigation     12
 *
 * AUTHORING CONVENTION: write the correct option FIRST (`correctAnswer: 0`).
 * Option order is permuted deterministically at export time.
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
    options: [
      'The wheelchair is anchored facing forward with a four-point tie-down, and the passenger wears a separate occupant restraint',
      'The wheelchair brakes are applied and no further securing is needed',
      'The wheelchair is anchored sideways so the passenger can see out',
      'The passenger holds the grab handle while the driver drives slowly',
    ],
    correctAnswer: 0,
    explanation:
      'A wheelchair must be anchored forward-facing with a four-point tie-down system, and the passenger must be restrained by a separate belt anchored to the vehicle — never by the wheelchair straps alone. Wheelchair brakes are not a restraint: they will not hold in a collision or emergency braking.',
    reference: 'Traficom — accessible transport guidance; standard ISO 10542',
  },
  {
    id: 'ts-02',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger with a guide dog orders a taxi. The driver has an allergy. What is the correct course of action?',
    options: [
      'The trip must be carried out — an assistance dog may not be refused and travels free of charge',
      'The driver may refuse the trip because of the allergy',
      'The trip may be carried out only if the passenger pays an extra cleaning fee',
      'The dog must travel in the luggage compartment',
    ],
    correctAnswer: 0,
    explanation:
      'A guide dog or other assistance dog may not be refused, and it is carried free of charge — refusing amounts to discrimination against a disabled passenger. A driver with a genuine medical barrier should arrange for the trip to be handled by another vehicle rather than leave the passenger stranded.',
    reference: 'Yhdenvertaisuuslaki 1325/2014; Traficom — taxi driver guidance',
  },
  {
    id: 'ts-03',
    category: 'Passenger Safety & Accessibility',
    question: 'What is the correct way to guide a visually impaired passenger to the taxi?',
    options: [
      'Speak to them directly, offer your arm and place their hand on the door frame and roof edge',
      'Take them firmly by the arm and steer them into the seat',
      'Ask an accompanying person to handle it and stay in the driver’s seat',
      'Describe the direction from the car and let them find the door alone',
    ],
    correctAnswer: 0,
    explanation:
      'Address the passenger directly rather than a companion, identify yourself, and offer your arm so they can hold it and follow half a step behind — being pushed or pulled is disorienting. Guiding their hand to the door frame and roof edge lets them judge the opening and sit down safely on their own.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-04',
    category: 'Passenger Safety & Accessibility',
    question:
      'Who is responsible for ensuring that passengers in a taxi wear their seat belts?',
    options: [
      'Each passenger over 15 answers for themselves, while the driver answers for children under 15',
      'The driver is personally liable for every passenger regardless of age',
      'Nobody — seat belts are voluntary in a taxi',
      'The person who ordered and pays for the trip',
    ],
    correctAnswer: 0,
    explanation:
      'A passenger aged 15 or over is responsible for their own seat belt, while the driver is responsible for children under 15 being properly restrained. A professional driver should still point out the belts and refuse to move off with an unrestrained child.',
    reference: 'Tieliikennelaki 729/2018, 90 §',
  },
  {
    id: 'ts-05',
    category: 'Passenger Safety & Accessibility',
    question:
      'An elderly passenger with a walking frame needs to get into the taxi. What is best practice?',
    options: [
      'Stop as close and level to the kerb as possible, offer assistance, and stow the frame only once they are seated',
      'Take the frame first so it can be loaded while they walk to the car',
      'Let them manage alone to preserve their dignity',
      'Ask them to fold the frame and carry it on their lap during the trip',
    ],
    correctAnswer: 0,
    explanation:
      'The passenger needs the frame for support right up to the moment they sit down, so it is stowed last and returned first. Stopping level with a kerb shortens the step and removes a fall risk. Always ask before helping and follow the passenger’s instructions — assistance is offered, not imposed.',
    reference: 'Traficom — taxi driver guidance, assisting passengers',
  },
  {
    id: 'ts-06',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger becomes unresponsive during the trip and is not breathing normally. What is the correct sequence?',
    options: [
      'Stop safely, call 112, start CPR and follow the dispatcher’s instructions',
      'Drive as fast as possible to the nearest hospital',
      'Move the passenger out of the vehicle and wait for someone to help',
      'Call the taxi dispatch centre and continue to the destination',
    ],
    correctAnswer: 0,
    explanation:
      'Stop in a safe place, call 112 immediately and begin resuscitation under the dispatcher’s guidance. Driving to hospital yourself delays professional care and puts you and other road users at risk. Giving assistance at an emergency is a legal duty, not a choice.',
    reference: 'Tieliikennelaki 729/2018, 179 §; Pelastuslaki 379/2011, 3 §',
  },
  {
    id: 'ts-07',
    category: 'Passenger Safety & Accessibility',
    question:
      'A passenger becomes aggressive and threatening during the trip. What is the safest response?',
    options: [
      'Stay calm, avoid confrontation, stop in a safe, public, well-lit place and call for help if needed',
      'Argue back firmly to establish authority',
      'Stop immediately wherever you are and order them out',
      'Speed up to reach the destination and end the trip sooner',
    ],
    correctAnswer: 0,
    explanation:
      'De-escalation comes first: keep your voice level, avoid provoking replies and do not challenge the passenger. Stop where there are people and light rather than in an isolated spot, and call 112 if you feel threatened. Speeding adds a traffic risk to a personal-safety problem.',
    reference: 'Traficom — taxi driver guidance, driver safety',
  },
  {
    id: 'ts-08',
    category: 'Passenger Safety & Accessibility',
    question:
      'What is the main reason a taxi driver should prefer card or mobile payment over cash at night?',
    options: [
      'Carrying little cash reduces the risk of robbery and violence against the driver',
      'Card payment is always cheaper for the customer',
      'Cash payments are prohibited in taxis after dark',
      'It removes the obligation to give a receipt',
    ],
    correctAnswer: 0,
    explanation:
      'Working alone at night is the highest-risk part of the job, and a driver known to carry cash is a target. Minimising cash, keeping doors locked between trips and using in-car cameras and alarms are standard precautions. The receipt obligation applies to every payment method.',
    reference: 'Traficom — taxi driver guidance, driver safety',
  },
  {
    id: 'ts-09',
    category: 'Passenger Safety & Accessibility',
    question:
      'A child aged about two is to travel in a taxi and no child restraint is available. What applies?',
    options: [
      'A child under three must have an appropriate child restraint; without one the trip cannot be made',
      'Any child may travel on an adult’s lap in the rear seat',
      'The child may use the adult seat belt alone in the rear seat',
      'The rule only applies on motorways',
    ],
    correctAnswer: 0,
    explanation:
      'A child under three needs an approved restraint suited to their size — an adult belt or a lap will not hold a small child in a crash. Taxis do have an exception for older children travelling in the rear, but it never extends to the under-threes, so a suitable seat must be requested when booking.',
    reference: 'Tieliikennelaki 729/2018, 90 §',
  },
  {
    id: 'ts-10',
    category: 'Passenger Safety & Accessibility',
    question:
      'Where should a passenger using a wheelchair be positioned relative to the direction of travel?',
    options: [
      'Facing forward, with the head supported by a headrest',
      'Facing sideways, so entry and exit are easier',
      'Facing backwards, to reduce whiplash risk',
      'Any direction, as long as the wheelchair is anchored',
    ],
    correctAnswer: 0,
    explanation:
      'Forward-facing is the only orientation the anchoring systems and the vehicle structure are tested for, and it lets a headrest limit neck injury in a rear impact. Sideways seating exposes the passenger to unrestrained lateral movement in braking and cornering.',
    reference: 'Traficom — accessible transport guidance',
  },
  {
    id: 'ts-11',
    category: 'Passenger Safety & Accessibility',
    question:
      'What should a driver do before starting a trip with a passenger who has a memory disorder?',
    options: [
      'Confirm the destination calmly, check any accompanying documents and make sure the passenger is received at the destination',
      'Rely solely on the address given by the passenger and drop them at the kerb',
      'Ask the passenger to write the address down and follow it exactly',
      'Refuse the trip unless a carer travels with them',
    ],
    correctAnswer: 0,
    explanation:
      'A passenger with a memory disorder may give an outdated address or forget the purpose of the trip, so confirm it against the booking or accompanying paperwork. Handing the passenger over at the destination — rather than leaving them at the kerb — is part of the duty of care in these trips.',
    reference: 'Traficom — taxi driver guidance, special groups',
  },
  {
    id: 'ts-12',
    category: 'Passenger Safety & Accessibility',
    question: 'How should luggage be carried in a taxi?',
    options: [
      'Secured in the luggage compartment, never loose on the parcel shelf or stacked above seat backs',
      'On the rear parcel shelf, where it is easy for the passenger to reach',
      'On the empty front passenger seat, unsecured',
      'Anywhere, provided the driver’s view to the front is clear',
    ],
    correctAnswer: 0,
    explanation:
      'Unsecured luggage becomes a projectile in a collision and can injure or kill an occupant. Load it in the boot, keep it below the level of the seat backs, and never place items on the parcel shelf where they also block the view through the rear window.',
    reference: 'Tieliikennelaki 729/2018, 106 §',
  },

  // ---------------------------------------------------------------------------
  // LEGISLATION & TAXI RULES — 12
  // ---------------------------------------------------------------------------
  {
    id: 'tl-01',
    category: 'Legislation & Taxi Rules',
    question: 'Which permit must a person hold in order to drive a taxi in Finland?',
    options: [
      'A taxi driver’s licence (taksinkuljettajan ajolupa) granted by Traficom',
      'A taxi transport operator licence (taksiliikennelupa)',
      'A category D driving licence',
      'A professional driver qualification card (CPC) for buses',
    ],
    correctAnswer: 0,
    explanation:
      'The driver needs a taksinkuljettajan ajolupa from Traficom. The taksiliikennelupa is a different permit, held by the business operating the service. A taxi is driven on a category B licence — a D licence and bus CPC belong to passenger-service vehicles carrying more than nine people.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku',
  },
  {
    id: 'tl-02',
    category: 'Legislation & Taxi Rules',
    question: 'What are the main prerequisites for being granted a taxi driver’s licence?',
    options: [
      'At least 18 years old, a category B licence held for at least a year, health requirements met, and a passed taxi driver examination',
      'At least 21 years old and five years of driving experience',
      'A category B licence and a completed first aid course only',
      'A category C licence and two years of professional driving',
    ],
    correctAnswer: 0,
    explanation:
      'The applicant must be at least 18, have held a category B licence for at least one year, meet the medical requirements for professional driving, pass the taxi driver examination, and be judged suitable in a background check. The licence is granted by Traficom.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku 25 §',
  },
  {
    id: 'tl-03',
    category: 'Legislation & Taxi Rules',
    question: 'For how long is a taxi driver’s licence valid?',
    options: ['Five years', 'Two years', 'Ten years', 'Indefinitely, once granted'],
    correctAnswer: 0,
    explanation:
      'The licence runs for five years and must be renewed, which keeps the medical and suitability requirements under periodic review. Apply before it expires — driving a taxi on a lapsed licence is unlawful.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku',
  },
  {
    id: 'tl-04',
    category: 'Legislation & Taxi Rules',
    question: 'What must be told to the customer about the price before the trip begins?',
    options: [
      'The total price, or when that is not possible, the basis of pricing and the maximum total price',
      'Nothing — the taximeter reading at the end is sufficient',
      'Only the starting fee',
      'Only the price per kilometre',
    ],
    correctAnswer: 0,
    explanation:
      'Price transparency is a core duty: the customer must know the total price before the trip, or where distance and time make that impossible, the pricing basis together with a maximum total price. A price disclosed only at the destination does not meet the requirement.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku 15 a §',
  },
  {
    id: 'tl-05',
    category: 'Legislation & Taxi Rules',
    question: 'When must a receipt be given to a taxi customer?',
    options: [
      'Always, for every trip and every payment method',
      'Only when the customer asks for one',
      'Only for trips paid in cash',
      'Only for trips costing more than 50 euros',
    ],
    correctAnswer: 0,
    explanation:
      'A receipt must be issued for every journey regardless of how it was paid, and it must show the details required of it, including the price and the trip. It is both a consumer protection measure and the basis for tax supervision of the sector.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku',
  },
  {
    id: 'tl-06',
    category: 'Legislation & Taxi Rules',
    question: 'What must be visible or available to the customer inside the taxi?',
    options: [
      'The driver’s identifying details and the pricing information required by law',
      'The driver’s home address and telephone number',
      'The operator’s tax records',
      'Nothing — all information is provided only on request',
    ],
    correctAnswer: 0,
    explanation:
      'The passenger must be able to see who is driving and on what terms: identifying details of the driver and the required pricing information have to be displayed where the customer can see them. Personal data beyond that, such as a home address, is not disclosed.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku 15 a §',
  },
  {
    id: 'tl-07',
    category: 'Legislation & Taxi Rules',
    question: 'What is the blood alcohol limit that applies to a taxi driver at work?',
    options: [
      '0.5 ‰, the same statutory limit as for any driver, though the professional standard is zero',
      '0.2 ‰, a special limit for professional drivers',
      '0.8 ‰, because professional drivers are more experienced',
      'There is no limit while the taxi is not carrying passengers',
    ],
    correctAnswer: 0,
    explanation:
      'The offence threshold is 0.5 ‰ for every driver. For a professional carrying paying passengers, the only defensible working standard is zero — a conviction also puts the driver’s licence, and therefore their livelihood, at risk.',
    reference: 'Rikoslaki 39/1889, 23 luku 3 §',
  },
  {
    id: 'tl-08',
    category: 'Legislation & Taxi Rules',
    question: 'What must the driver do if a passenger leaves property behind in the taxi?',
    options: [
      'Take reasonable steps to return it to the owner, and otherwise hand it to the police or a lost property office',
      'Keep it for a month and then dispose of it freely',
      'Leave it at the nearest taxi stand',
      'Discard it, since the passenger is responsible for their own belongings',
    ],
    correctAnswer: 0,
    explanation:
      'Found property must be returned to its owner where they can be identified — often straightforward with a booking record — and otherwise passed to the police or a lost property office without undue delay. Keeping or discarding it is unlawful.',
    reference: 'Löytötavaralaki 778/1988',
  },
  {
    id: 'tl-09',
    category: 'Legislation & Taxi Rules',
    question:
      'A trip is priced on the basis of distance and time. What does the vehicle need?',
    options: [
      'A taximeter, so the price is formed and shown in a verifiable way',
      'Nothing beyond the driver’s own estimate',
      'A printed price list only',
      'A tachograph of the type used in heavy vehicles',
    ],
    correctAnswer: 0,
    explanation:
      'When the price depends on distance or time, a taximeter is required so that the fare is formed transparently and can be verified. A fixed price agreed in advance may instead be handled with another suitable device or system. A tachograph is heavy-vehicle equipment and unrelated.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 1 luku 15 a §',
  },
  {
    id: 'tl-10',
    category: 'Legislation & Taxi Rules',
    question:
      'The taxi driver’s licence is due to expire next month. What should the driver do?',
    options: [
      'Apply for renewal in good time and stop driving a taxi if it expires before the new one is granted',
      'Continue driving — there is a three-month grace period after expiry',
      'Continue driving as long as the renewal application has been submitted',
      'Nothing — Traficom renews the licence automatically',
    ],
    correctAnswer: 0,
    explanation:
      'There is no grace period and no automatic renewal: once the licence expires the driver is no longer entitled to drive a taxi, and doing so is an offence that also voids the operator’s insurance position. Apply early enough that the new licence is in hand before the old one lapses.',
    reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku',
  },
  {
    id: 'tl-11',
    category: 'Legislation & Taxi Rules',
    question: 'Why are a taxi driver’s working hours and rest periods regulated?',
    options: [
      'Because fatigue impairs reaction time and judgement, endangering passengers and other road users',
      'Only to make payroll calculation easier',
      'Because taxis are subject to EU heavy-vehicle tachograph rules',
      'They are not regulated at all for taxi drivers',
    ],
    correctAnswer: 0,
    explanation:
      'Working time rules exist for road safety: a fatigued driver has reaction times comparable to an intoxicated one, and microsleeps happen without warning. Taxis are not governed by the EU heavy-vehicle driving-time regime, but Finnish working time legislation and the employer’s duty of care still apply.',
    reference: 'Työaikalaki 872/2019; Traficom — taxi driver guidance',
  },
  {
    id: 'tl-12',
    category: 'Legislation & Taxi Rules',
    question:
      'A customer disputes the fare at the end of the trip and refuses to pay. How should the driver act?',
    options: [
      'Stay calm, show the pricing basis and the receipt, and settle the matter through the operator or the police rather than by confrontation',
      'Prevent the passenger from leaving the vehicle until they pay',
      'Take an item of the passenger’s property as security',
      'Threaten to report them and drive them to a police station',
    ],
    correctAnswer: 0,
    explanation:
      'Explaining the pricing basis and issuing the receipt usually resolves the dispute; if it does not, it is a civil debt to be pursued through the operator or, where the intent was clearly fraudulent, reported to the police. Detaining a passenger or seizing their property is unlawful and turns a payment dispute into a criminal matter for the driver.',
    reference: 'Laki liikenteen palveluista 320/2017; Rikoslaki 39/1889',
  },

  // ---------------------------------------------------------------------------
  // CUSTOMER SERVICE & NAVIGATION — 12
  // ---------------------------------------------------------------------------
  {
    id: 'tc-01',
    category: 'Customer Service & Navigation',
    question: 'Which route should the driver take when the customer gives no instructions?',
    options: [
      'The route that is most reasonable in terms of distance, time and cost for the customer',
      'The longest route, since the meter earns more',
      'Always the shortest route by distance, whatever the traffic',
      'Whichever route the driver personally prefers',
    ],
    correctAnswer: 0,
    explanation:
      'The customer is entitled to a sensible route: the one that best balances distance, time and cost in the prevailing traffic. That is not always the shortest by distance — a longer but free-flowing route can be cheaper and quicker. If you take a diversion, explain why before doing so.',
    reference: 'Laki liikenteen palveluista 320/2017; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-02',
    category: 'Customer Service & Navigation',
    question:
      'The customer asks for a specific route that the driver knows is slower and more expensive. What should the driver do?',
    options: [
      'Explain the alternative and the likely cost difference, then follow the customer’s wish if they still prefer it',
      'Refuse the trip',
      'Silently take the route the driver considers best',
      'Follow the customer’s route without comment and charge extra for the inconvenience',
    ],
    correctAnswer: 0,
    explanation:
      'The customer decides the route, but professional service means they decide with the facts: state the alternative and roughly what it saves. If they still prefer their route, drive it. Overriding the customer silently, or adding an unagreed charge, breaches the trust the fare rests on.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-03',
    category: 'Customer Service & Navigation',
    question: 'What is the rule for picking up passengers at a taxi stand (taksiasema)?',
    options: [
      'Vehicles are taken in queue order, with the first taxi in line taking the next customer',
      'The newest and cleanest vehicle takes the customer first',
      'Any driver may take any customer at any time',
      'The driver who has waited the shortest time goes first',
    ],
    correctAnswer: 0,
    explanation:
      'Taxi stands operate on strict queue order — the vehicle at the head of the line takes the next passenger. Jumping the queue is unprofessional and causes disputes. The passenger nevertheless has the right to choose a different vehicle, for example one meeting an accessibility need.',
    reference: 'Traficom — taxi driver guidance; local taxi stand rules',
  },
  {
    id: 'tc-04',
    category: 'Customer Service & Navigation',
    question: 'How should a driver behave when a customer complains about the service?',
    options: [
      'Listen without interrupting, apologise for the experience and explain how the complaint can be taken forward',
      'Explain immediately why the customer is mistaken',
      'Ignore the complaint and end the trip quickly',
      'Offer a discount to end the conversation, whatever the issue',
    ],
    correctAnswer: 0,
    explanation:
      'Letting the customer finish, acknowledging the experience and directing them to the operator’s complaints process defuses most disputes. Arguing entrenches the position, and buying silence with a discount leaves the underlying problem — and any genuine safety issue — unaddressed.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-05',
    category: 'Customer Service & Navigation',
    question:
      'What is the professional standard for a driver’s conduct and appearance at work?',
    options: [
      'Clean and appropriate dress, a tidy vehicle, courteous language and no smoking in the car',
      'Whatever the driver prefers, as long as the trip is completed',
      'Formal business dress is legally required',
      'Appearance matters only for pre-booked corporate customers',
    ],
    correctAnswer: 0,
    explanation:
      'The driver is the visible face of the service and often alone with the customer, so clean and appropriate dress, a tidy odour-free vehicle and courteous language are the baseline. Smoking in a taxi is not acceptable — it is a workplace and a public service vehicle.',
    reference: 'Traficom — taxi driver guidance, professional conduct',
  },
  {
    id: 'tc-06',
    category: 'Customer Service & Navigation',
    question:
      'A customer wants to talk at length while the driver is negotiating heavy traffic. What is appropriate?',
    options: [
      'Respond politely but keep full attention on driving, letting the conversation lapse where necessary',
      'Keep the conversation going at all costs to satisfy the customer',
      'Tell the customer to be quiet',
      'Put on loud music to end the conversation',
    ],
    correctAnswer: 0,
    explanation:
      'Customer service never outranks safety. A brief, polite reply and a return of attention to the road is understood by any reasonable passenger, whereas sustained conversation in demanding traffic is a genuine distraction. Bluntness or loud music is simply poor service.',
    reference: 'Tieliikennelaki 729/2018, 3 §; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-07',
    category: 'Customer Service & Navigation',
    question:
      'Why should a taxi driver maintain local knowledge rather than rely entirely on satellite navigation?',
    options: [
      'Navigation devices miss road works, temporary closures, event traffic and access details at the destination',
      'Satellite navigation is prohibited in taxis',
      'Local knowledge lets the driver charge a higher fare',
      'Navigation devices are unreliable in Finland',
    ],
    correctAnswer: 0,
    explanation:
      'Navigation is a tool, not a substitute for knowing the area. It rarely accounts for road works, closures, event traffic, or which entrance a hospital, terminal or hotel actually uses. Local knowledge is what turns a technically correct route into a good one.',
    reference: 'Traficom — taxi driver guidance, route selection',
  },
  {
    id: 'tc-08',
    category: 'Customer Service & Navigation',
    question: 'How should the driver handle information learned about a customer during a trip?',
    options: [
      'Treat it as confidential and not pass it on or discuss it elsewhere',
      'Share it freely, since nothing was agreed in writing',
      'Discuss it with other drivers as long as no name is used',
      'Publish it on social media if it is entertaining',
    ],
    correctAnswer: 0,
    explanation:
      'Passengers speak freely in a taxi and often discuss health, finances or private matters. Destinations alone can be sensitive — a clinic, a lawyer, a shelter. Confidentiality is a professional obligation, and personal data is additionally protected by data protection law.',
    reference: 'Tietosuoja-asetus (EU) 2016/679; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-09',
    category: 'Customer Service & Navigation',
    question:
      'A customer is clearly intoxicated but calm and wants to travel home. What is the professional approach?',
    options: [
      'Carry them normally, confirm the destination clearly and make sure they get out safely',
      'Refuse the trip because they are intoxicated',
      'Carry them but demand payment in advance in every case',
      'Take them to a police station instead',
    ],
    correctAnswer: 0,
    explanation:
      'Getting intoxicated people home safely is part of the social function of a taxi, and a calm passenger is carried normally. Confirm the destination while they can still give it clearly and make sure they leave the vehicle safely. Refusal is reserved for genuine threats to safety or the vehicle.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-10',
    category: 'Customer Service & Navigation',
    question:
      'The driver will arrive noticeably late for a pre-booked pickup. What should be done?',
    options: [
      'Inform the customer as early as possible and give a realistic new arrival time',
      'Say nothing and drive faster to make up the time',
      'Cancel the booking without explanation',
      'Arrive late and explain only if the customer complains',
    ],
    correctAnswer: 0,
    explanation:
      'An early, honest message lets the customer decide what to do — wait, or make another arrangement — and that is what preserves trust. Driving faster to recover lost minutes converts a service problem into a safety one, which is never an acceptable trade.',
    reference: 'Traficom — taxi driver guidance, customer service',
  },
  {
    id: 'tc-11',
    category: 'Customer Service & Navigation',
    question:
      'How should the destination and route be confirmed at the start of a trip?',
    options: [
      'Repeat the destination back to the customer and agree the route or pricing basis before setting off',
      'Set off immediately and ask for details on the way',
      'Rely on the address in the booking system without mentioning it',
      'Ask the customer to enter the address into the navigation device themselves',
    ],
    correctAnswer: 0,
    explanation:
      'Repeating the destination back catches mishearings and outdated booking addresses before they cost time and money, and agreeing the route or pricing basis at the same moment prevents the most common fare dispute. It takes a few seconds and resolves both risks at once.',
    reference: 'Laki liikenteen palveluista 320/2017; Traficom — taxi driver guidance',
  },
  {
    id: 'tc-12',
    category: 'Customer Service & Navigation',
    question:
      'A customer with reduced mobility asks to be dropped somewhere other than the exact address, closer to a step-free entrance. How should the driver respond?',
    options: [
      'Accommodate the request where it is legal and safe to stop, since the usable entrance is what matters',
      'Refuse, because the booking specifies the address',
      'Charge an additional fee for the change',
      'Drop them at the address and let them walk around the building',
    ],
    correctAnswer: 0,
    explanation:
      'Reaching an entrance the passenger can actually use is the point of the journey. Accommodate it wherever stopping is legal and safe. Stopping is permitted for setting down passengers in many places where parking is not, but never where it blocks a crossing, a cycle lane or a junction.',
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
