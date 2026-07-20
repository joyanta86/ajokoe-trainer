import { withDeterministicOptionOrder } from '@/lib/question-utils';
import type { Question, QuestionCategory, QuestionType } from '@/lib/types';

export type {
  Question,
  QuestionCategory,
  QuestionType,
  DiagramKey,
  ExamResult,
  CategoryScore,
  SectionBreakdown,
} from '@/lib/types';

/**
 * Seed question bank for the Traficom-style B-license theory exam.
 *
 * Content is grounded in Tieliikennelaki 729/2018 (Finnish Road Traffic Act),
 * Ajoneuvolaki 82/2021 and Traficom regulations. Explanations cite the source
 * so learners can verify every answer against the statute.
 *
 * Distribution (a full mock exam consumes 15 / 50 / 5):
 *   theory            20
 *   hazard_perception 52
 *   risk_assessment    8
 *
 * AUTHORING CONVENTION: write the correct option FIRST (`correctAnswer: 0`).
 * Option order is permuted deterministically at export time by
 * `withDeterministicOptionOrder`, so the answer position is not predictable to
 * a learner while the source stays easy to review.
 */
const authoredQuestions: Question[] = [
  // ---------------------------------------------------------------------------
  // THEORY — 20
  // ---------------------------------------------------------------------------
  {
    id: 'th-01',
    category: 'Priority Rules',
    type: 'theory',
    question:
      'You approach an intersection with no signs, no traffic lights and no road markings. Another car approaches at the same time from your right. What must you do?',
    options: [
      'Give way to the vehicle coming from the right',
      'Proceed first, because the vehicle on the right must yield',
      'The larger vehicle always has priority',
      'Whoever reaches the intersection line first has priority',
    ],
    correctAnswer: 0,
    explanation:
      'At an equal (unmarked) intersection the right-hand rule applies: you must give way to any vehicle approaching from your right. Size of the vehicle and arrival order are irrelevant — the only deciding factor is which side the other vehicle comes from.',
    lawReference: 'Tieliikennelaki 729/2018, 24 §',
  },
  {
    id: 'th-02',
    category: 'Traffic Signs',
    type: 'theory',
    question:
      'A yellow diamond-shaped sign with a white border is posted along the road you are driving on. What does it mean?',
    diagram: 'sign-priority-road',
    options: [
      'You are on a priority road — traffic from side roads must give way to you',
      'You must give way at the next intersection',
      'Parking is prohibited from this point onward',
      'The road narrows ahead',
    ],
    correctAnswer: 0,
    explanation:
      'The yellow diamond (sign B1, etuajo-oikeutettu tie) marks a priority road. Drivers entering from side roads must give way to you. It does not remove your duty to yield to trams, emergency vehicles, or to obey any signs or lights placed at a specific intersection.',
    lawReference: 'Tieliikennelaki 729/2018, liite 3 (sign B1)',
  },
  {
    id: 'th-03',
    category: 'Hazardous Conditions',
    type: 'theory',
    question:
      'What is the general speed limit on a road outside a built-up area in Finland when no speed limit sign is posted?',
    options: ['80 km/h', '100 km/h', '70 km/h', '60 km/h'],
    correctAnswer: 0,
    explanation:
      'When no sign is posted, the general speed limit outside built-up areas is 80 km/h. Inside a built-up area (taajama sign) it is 50 km/h. Motorways are separately signposted, typically 120 km/h in summer and 100 km/h in winter.',
    lawReference: 'Tieliikennelaki 729/2018, 99 §',
  },
  {
    id: 'th-04',
    category: 'Vehicle Tech',
    type: 'theory',
    question:
      'What is the minimum legal tread depth for winter tyres on a passenger car in Finland?',
    options: ['3.0 mm', '1.6 mm', '4.0 mm', '2.0 mm'],
    correctAnswer: 0,
    explanation:
      'Winter tyres must have at least 3.0 mm of tread in the main grooves; summer tyres require at least 1.6 mm. Below 3.0 mm a winter tyre loses most of its ability to displace slush, and aquaplaning risk rises sharply.',
    lawReference: 'Valtioneuvoston asetus ajoneuvojen käytöstä tiellä 1257/1992, 17 §',
  },
  {
    id: 'th-05',
    category: 'Vehicle Tech',
    type: 'theory',
    question: 'When are winter tyres required on a passenger car in Finland?',
    options: [
      'From November to March whenever the weather or road conditions require it',
      'Always between 1 October and 30 April, regardless of conditions',
      'Only when snow is actually lying on the road surface',
      'Winter tyres are always optional; only tread depth is regulated',
    ],
    correctAnswer: 0,
    explanation:
      'Since the 2020 reform the requirement is condition-based: winter tyres must be used from November through March when the weather or road conditions require them. Studded tyres may be used from 1 November until the first Monday after Easter, and outside that period whenever conditions demand.',
    lawReference: 'Tieliikennelaki 729/2018, 108 §',
  },
  {
    id: 'th-06',
    category: 'Hazardous Conditions',
    type: 'theory',
    question: 'What is the legal blood alcohol limit for driving in Finland?',
    options: [
      '0.5 ‰ in blood (0.22 mg/l in breath)',
      '0.8 ‰ in blood (0.35 mg/l in breath)',
      '0.2 ‰ in blood (0.10 mg/l in breath)',
      'There is no fixed limit; impairment is judged case by case',
    ],
    correctAnswer: 0,
    explanation:
      'Driving while intoxicated (rattijuopumus) begins at 0.5 ‰ blood alcohol or 0.22 mg/l in breath. At 1.2 ‰ or above the offence becomes aggravated (törkeä rattijuopumus). Note that impairment starts well below the legal limit — the safe amount before driving is none.',
    lawReference: 'Rikoslaki 39/1889, 23 luku 3 §',
  },
  {
    id: 'th-07',
    category: 'Traffic Signs',
    type: 'theory',
    question: 'What does a red-bordered triangular sign pointing downward mean?',
    diagram: 'sign-yield',
    options: [
      'Give way — yield to crossing traffic before entering',
      'Stop unconditionally and only then proceed',
      'Priority over oncoming traffic in a narrow section',
      'End of the priority road',
    ],
    correctAnswer: 0,
    explanation:
      'The downward-pointing triangle (sign B5, väistämisvelvollisuus risteyksessä) requires you to give way. You may roll through without stopping if the way is genuinely clear. The octagonal STOP sign (B6) additionally requires a complete stop at the line every time.',
    lawReference: 'Tieliikennelaki 729/2018, liite 3 (signs B5, B6)',
  },
  {
    id: 'th-08',
    category: 'Priority Rules',
    type: 'theory',
    question:
      'You are turning left at an intersection. A cyclist is riding straight ahead on the cycle crossing you are about to cross. What is the rule?',
    options: [
      'You must give way to the cyclist going straight',
      'The cyclist must give way because you signalled first',
      'Whoever entered the intersection first has priority',
      'The cyclist must dismount and walk across',
    ],
    correctAnswer: 0,
    explanation:
      'A driver who turns must always give way to cyclists and pedestrians crossing the road being entered. Turning never creates priority — cyclists on a cycle crossing (pyörätien jatke) travelling straight keep theirs.',
    lawReference: 'Tieliikennelaki 729/2018, 25 §',
  },
  {
    id: 'th-09',
    category: 'Vehicle Tech',
    type: 'theory',
    question: 'When must the headlights of a car be switched on in Finland?',
    options: [
      'Always while driving — daytime running lights suffice in daylight, dipped beam in darkness or poor visibility',
      'Only between sunset and sunrise',
      'Only on unlit roads outside built-up areas',
      'Only from 1 November to 31 March',
    ],
    correctAnswer: 0,
    explanation:
      'Lights are mandatory whenever the vehicle is in motion, year-round and around the clock. Daytime running lights are enough in daylight, but darkness, twilight, fog, heavy rain or snow require dipped headlights, which also illuminate the rear lights.',
    lawReference: 'Tieliikennelaki 729/2018, 36 §',
  },
  {
    id: 'th-10',
    category: 'Vehicle Tech',
    type: 'theory',
    question: 'When may you use rear fog lights?',
    options: [
      'Only in fog or heavy precipitation that seriously reduces visibility',
      'Whenever it is dark outside',
      'Any time you want to be more visible in traffic',
      'Only on motorways in winter',
    ],
    correctAnswer: 0,
    explanation:
      'Rear fog lights are only permitted when fog, heavy snow or rain seriously reduces visibility. In clear conditions they dazzle drivers behind you and mask your brake lights, so they must be switched off as soon as visibility improves.',
    lawReference: 'Tieliikennelaki 729/2018, 38 §',
  },
  {
    id: 'th-11',
    category: 'Priority Rules',
    type: 'theory',
    question:
      'You are driving in a 50 km/h zone. A bus signals and begins to pull out from a bus stop. What must you do?',
    options: [
      'Give way to the bus, slowing or stopping if necessary',
      'Maintain speed — the bus must wait for a gap',
      'Sound the horn and continue',
      'Give way only if the bus has already entered your lane',
    ],
    correctAnswer: 0,
    explanation:
      'On roads where the speed limit is 60 km/h or lower, a driver must give way to a bus signalling its departure from a bus stop. The bus driver must still pull out without causing obvious danger — the duty is mutual, but yours is the yielding role.',
    lawReference: 'Tieliikennelaki 729/2018, 26 §',
  },
  {
    id: 'th-12',
    category: 'Hazardous Conditions',
    type: 'theory',
    question: 'If you double your speed, how does the braking distance change?',
    options: [
      'It becomes roughly four times longer',
      'It becomes roughly twice as long',
      'It becomes roughly three times longer',
      'It stays the same; only reaction distance grows',
    ],
    correctAnswer: 0,
    explanation:
      'Braking distance grows with the square of speed, so doubling speed quadruples it. Reaction distance grows only linearly. This is why a small speed reduction produces a disproportionately large safety gain, especially on slippery surfaces.',
    lawReference: 'Traficom — driver training curriculum, hazard theory',
  },
  {
    id: 'th-13',
    category: 'Hazardous Conditions',
    type: 'theory',
    question:
      'You collide with an elk (moose) on a rural road. Nobody is injured. What are you required to do?',
    options: [
      'Report the collision to the emergency number 112 and mark the site',
      'Nothing, if your vehicle is still drivable',
      'Only inform your insurance company within seven days',
      'Move the animal off the road and continue your journey',
    ],
    correctAnswer: 0,
    explanation:
      'A collision with a large game animal (elk, deer, reindeer) must always be reported to 112, because a wounded animal is a danger to other road users and must be tracked. Mark the collision point — for example with a ribbon or reflector — so the tracking team can find it.',
    lawReference: 'Metsästyslaki 615/1993, 84 §; Tieliikennelaki 729/2018, 179 §',
  },
  {
    id: 'th-14',
    category: 'Vehicle Tech',
    type: 'theory',
    question:
      'A rear-facing child seat is to be installed in the front passenger seat. What must be done first?',
    options: [
      'Deactivate the passenger airbag',
      'Move the seat as far forward as possible',
      'Nothing — modern airbags detect child seats automatically',
      'Recline the backrest fully',
    ],
    correctAnswer: 0,
    explanation:
      'A deploying airbag strikes the back of a rear-facing seat with lethal force. The passenger airbag must be switched off before installing one. A child shorter than 135 cm must otherwise use an approved restraint suitable for their size.',
    lawReference: 'Tieliikennelaki 729/2018, 90 §',
  },
  {
    id: 'th-15',
    category: 'Hazardous Conditions',
    type: 'theory',
    question: 'Which driving style reduces fuel consumption and emissions the most?',
    options: [
      'Anticipating traffic, shifting up early and using engine braking',
      'Accelerating hard to reach cruising speed as quickly as possible',
      'Keeping the engine in a low gear at high revs',
      'Idling at every stop so the engine stays warm',
    ],
    correctAnswer: 0,
    explanation:
      'Eco-driving (taloudellinen ajotapa) is built on anticipation: read the traffic far ahead, shift up early, keep revs low and let the vehicle roll on engine braking, which cuts fuel injection entirely. Correct tyre pressure and removing an unused roof box also help significantly.',
    lawReference: 'Traficom — eco-driving guidance',
  },
  {
    id: 'th-16',
    category: 'Vehicle Tech',
    type: 'theory',
    question:
      'For how long may you leave the engine of a parked car idling in a built-up area at −5 °C?',
    options: [
      'Two minutes',
      'Four minutes',
      'Ten minutes',
      'There is no limit as long as the driver stays in the vehicle',
    ],
    correctAnswer: 0,
    explanation:
      'Idling a stationary vehicle is limited to two minutes. Below −15 °C the limit is four minutes. The rule does not apply while waiting in traffic or when the engine powers necessary equipment. Use a block heater instead — it warms the engine faster and without emissions.',
    lawReference: 'Tieliikennelaki 729/2018, 191 §',
  },
  {
    id: 'th-17',
    category: 'Traffic Signs',
    type: 'theory',
    question: 'What does a circular blue sign with a white symbol indicate?',
    options: [
      'A mandatory instruction that must be followed',
      'A prohibition',
      'A warning of a hazard ahead',
      'General information with no legal force',
    ],
    correctAnswer: 0,
    explanation:
      'Blue circles give mandatory instructions — for instance a compulsory direction of travel or a mandatory cycle track. Red-bordered circles prohibit, red-bordered triangles warn, and blue rectangles inform.',
    lawReference: 'Tieliikennelaki 729/2018, liite 3 (D-series signs)',
  },
  {
    id: 'th-18',
    category: 'Priority Rules',
    type: 'theory',
    question: 'When is overtaking on the right permitted?',
    options: [
      'When the vehicle ahead is signalling and turning left, or when lanes are marked and traffic moves in queues',
      'Never under any circumstances',
      'Always on roads with two or more lanes in the same direction',
      'Whenever the vehicle ahead is driving below the speed limit',
    ],
    correctAnswer: 0,
    explanation:
      'Overtaking is normally done on the left. Passing on the right is permitted when the vehicle ahead has clearly signalled and is turning left, and in queued traffic on a road with marked lanes where lanes move at different speeds — which is lane discipline, not overtaking.',
    lawReference: 'Tieliikennelaki 729/2018, 19 §',
  },
  {
    id: 'th-19',
    category: 'Traffic Signs',
    type: 'theory',
    question:
      'A white rectangular sign showing a black car and a black building silhouette marks the start of what?',
    options: [
      'A built-up area, where the speed limit is 50 km/h unless otherwise signed',
      'A residential street where driving is prohibited',
      'A pedestrian zone',
      'A parking area for residents only',
    ],
    correctAnswer: 0,
    explanation:
      'The taajama sign marks a built-up area. The general limit inside it is 50 km/h unless a different limit is posted, and additional rules apply — for example the duty to give way to a departing bus. The end of the area is shown by the same sign with a diagonal red stripe.',
    lawReference: 'Tieliikennelaki 729/2018, liite 3 (sign E1)',
  },
  {
    id: 'th-20',
    category: 'Vehicle Tech',
    type: 'theory',
    question: 'What is the maximum permitted speed for a passenger car towing a trailer in Finland?',
    options: ['80 km/h', '100 km/h', '90 km/h', 'The same as the posted limit'],
    correctAnswer: 0,
    explanation:
      'A car-and-trailer combination may not exceed 80 km/h even where a higher limit is posted. A B licence permits a trailer up to 750 kg, or a heavier trailer where the combination stays within 3 500 kg total mass.',
    lawReference: 'Tieliikennelaki 729/2018, 100 §',
  },

  // ---------------------------------------------------------------------------
  // HAZARD PERCEPTION — 52
  // ---------------------------------------------------------------------------
  {
    id: 'hz-01',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You approach an unmarked intersection in a residential area. A car is approaching from your right and a child is standing at the kerb on your left. What is the correct action?',
    diagram: 'uncontrolled-intersection',
    options: [
      'Slow down, give way to the car from the right and keep monitoring the child',
      'Accelerate through before the car from the right arrives',
      'Stop completely and wave the child across',
      'Sound the horn to warn the child and continue at speed',
    ],
    correctAnswer: 0,
    explanation:
      'Two hazards develop at once. The legal duty is to yield to the vehicle on your right, and the child at the kerb is unpredictable. Reducing speed resolves both: it satisfies the right-hand rule and buys reaction time. Waving pedestrians across is discouraged — it can push them into the path of another vehicle.',
    lawReference: 'Tieliikennelaki 729/2018, 24 §',
  },
  {
    id: 'hz-02',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are approaching a pedestrian crossing. A pedestrian is standing at the edge, clearly about to step onto it. What must you do?',
    diagram: 'pedestrian-crossing',
    options: [
      'Slow down and stop to let the pedestrian cross',
      'Continue if you can pass before they step out',
      'Flash your headlights and continue',
      'Give way only once they have both feet on the crossing',
    ],
    correctAnswer: 0,
    explanation:
      'A driver approaching a pedestrian crossing must give way to anyone on the crossing or about to step onto it, and must approach at a speed that makes stopping possible. Overtaking immediately before a crossing is also prohibited, because it hides the pedestrian from the overtaken driver.',
    lawReference: 'Tieliikennelaki 729/2018, 32 §',
  },
  {
    id: 'hz-03',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A tram approaches an unmarked intersection from your left as you are about to cross. What is your obligation?',
    diagram: 'tram-crossing',
    options: [
      'Give way to the tram, even though it comes from your left',
      'Proceed — the right-hand rule gives you priority',
      'Give way only if the tram sounds its bell',
      'Stop and wait for a signal from the tram driver',
    ],
    correctAnswer: 0,
    explanation:
      'A tram must be given way to at an intersection regardless of the direction it comes from — the right-hand rule does not apply to it. A tram is heavy, runs on rails and cannot steer away, so its braking distance is far longer than a car\'s.',
    lawReference: 'Tieliikennelaki 729/2018, 24 §',
  },
  {
    id: 'hz-04',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are entering a roundabout. A car is already circulating and approaching your entry point. What do you do?',
    diagram: 'roundabout',
    options: [
      'Give way to the circulating vehicle and enter when a safe gap appears',
      'Enter immediately — vehicles in the roundabout must yield to entering traffic',
      'Stop in the entry lane and wait for the roundabout to empty completely',
      'Enter and signal left so the other driver brakes',
    ],
    correctAnswer: 0,
    explanation:
      'Roundabout entries carry a give-way sign, so circulating traffic has priority. Do not signal on entry; signal right only when leaving. Watch for cyclists on the circulating lane and for long vehicles that need more than one lane.',
    lawReference: 'Tieliikennelaki 729/2018, 24 §, liite 3 (sign B5)',
  },
  {
    id: 'hz-05',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are joining a motorway from an acceleration lane. Traffic in the right-hand lane is dense. What is the correct technique?',
    diagram: 'motorway-merge',
    options: [
      'Accelerate to match the flow speed and merge into a gap without forcing others to brake',
      'Stop at the end of the acceleration lane until a large gap appears',
      'Merge immediately at low speed and let others adjust',
      'Drive along the hard shoulder until traffic thins out',
    ],
    correctAnswer: 0,
    explanation:
      'The acceleration lane exists so you can reach the speed of the flow before merging. A driver joining must not force through traffic to brake or swerve. Stopping at the lane end is dangerous — it leaves you entering at zero speed into traffic moving at 100 km/h.',
    lawReference: 'Tieliikennelaki 729/2018, 22 §',
  },
  {
    id: 'hz-06',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Driving on a narrow winter road, you meet an oncoming car and the surface is snow-packed. What is the safest response?',
    diagram: 'narrow-winter-road',
    options: [
      'Reduce speed, keep to the right and avoid abrupt steering or braking',
      'Maintain speed and hold your line so the other driver moves over',
      'Brake hard and steer onto the snow bank',
      'Move to the centre of the road for more grip',
    ],
    correctAnswer: 0,
    explanation:
      'On packed snow, grip is limited and sudden inputs break traction. Slowing early, holding to the right and steering gently keeps the car stable. Braking onto an unploughed verge can catch a wheel and pull the car off the road.',
    lawReference: 'Tieliikennelaki 729/2018, 3 § ja 15 §',
  },
  {
    id: 'hz-07',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A ball rolls onto the road ahead of you from between parked cars. What should you assume?',
    options: [
      'A child may follow it — brake immediately and be ready to stop',
      'The ball is a minor obstacle — steer around it and continue',
      'Sound the horn and maintain speed',
      'Nothing, as long as no child is visible',
    ],
    correctAnswer: 0,
    explanation:
      'A ball crossing the road is a classic precursor hazard: a child chasing it will not look for traffic. Brake immediately and be prepared to stop, because a child can emerge from between parked cars with no warning and no visible approach.',
    lawReference: 'Tieliikennelaki 729/2018, 3 §',
  },
  {
    id: 'hz-08',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are following a lorry on a wet road and cannot see past it. What is the correct following distance strategy?',
    options: [
      'Increase the gap so you can see around the lorry and have time to react',
      'Close the gap to reduce air resistance',
      'Stay directly behind it so spray does not hit your windscreen',
      'Overtake immediately regardless of visibility',
    ],
    correctAnswer: 0,
    explanation:
      'A large vehicle blocks your view of everything developing ahead. Dropping back restores sight lines and increases reaction time, which matters more on a wet surface where braking distance grows. Never begin an overtake without seeing the road ahead is clear.',
    lawReference: 'Tieliikennelaki 729/2018, 15 §',
  },
  {
    id: 'hz-09',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'An emergency vehicle approaches from behind with blue lights and siren while you are in a queue at a red light. What should you do?',
    options: [
      'Make room by moving aside as far as is safely possible, even if it means crossing the stop line carefully',
      'Stay exactly where you are — moving at a red light is always forbidden',
      'Reverse to create space behind you',
      'Follow the emergency vehicle through the intersection to clear the queue',
    ],
    correctAnswer: 0,
    explanation:
      'Every road user must give an emergency vehicle a free path, moving aside and stopping if necessary. Carefully clearing the way, including edging past a stop line when it is the only option and it is safe, is permitted. Following an emergency vehicle through traffic is prohibited and dangerous.',
    lawReference: 'Tieliikennelaki 729/2018, 30 §',
  },
  {
    id: 'hz-10',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving at dusk on an unlit rural road when an oncoming car fails to dip its main beam. What is the safest reaction?',
    options: [
      'Look toward the right edge line, slow down and keep your lane',
      'Switch on your own main beam to make the other driver dip theirs',
      'Close your eyes briefly until the car passes',
      'Brake hard and stop on the roadway',
    ],
    correctAnswer: 0,
    explanation:
      'Fix your gaze on the right-hand edge line to keep a visual reference outside the glare, and reduce speed so you can stop within the distance you can actually see. Retaliating with main beam blinds both drivers, and stopping in the lane invites a rear-end collision.',
    lawReference: 'Tieliikennelaki 729/2018, 37 §',
  },
  {
    id: 'hz-11',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are about to turn right at an intersection. A cyclist is riding straight ahead in the cycle lane on your right. What is the greatest risk?',
    options: [
      'Cutting across the cyclist\'s path in your blind spot — check over your shoulder before turning',
      'The cyclist braking too late behind you',
      'Losing traction while turning',
      'The cyclist overtaking you on the left',
    ],
    correctAnswer: 0,
    explanation:
      'The right-hook collision is one of the most common cyclist injuries in Finnish urban traffic. A cyclist alongside you sits in the blind spot behind the door pillar. Check the mirror and look over your right shoulder before turning, and give way — the cyclist going straight has priority.',
    lawReference: 'Tieliikennelaki 729/2018, 25 §',
  },
  {
    id: 'hz-12',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving in autumn on a rural road at dawn. Which section of road most likely carries black ice first?',
    options: [
      'A bridge deck or a shaded stretch under trees',
      'A long straight in open sunlight',
      'The crest of a hill',
      'A newly paved section',
    ],
    correctAnswer: 0,
    explanation:
      'Bridges lose heat from both sides and freeze before the surrounding road; shaded sections never receive sun and stay cold. Both can be icy while the rest of the road is merely wet. Slow before reaching them and avoid braking or steering while on them.',
    lawReference: 'Traficom — winter driving guidance',
  },
  {
    id: 'hz-13',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Your car begins to aquaplane in heavy rain — the steering feels light and unresponsive. What should you do?',
    options: [
      'Ease off the accelerator, hold the steering straight and wait for grip to return',
      'Brake firmly to slow down as quickly as possible',
      'Steer sharply to find grip',
      'Accelerate to push the water away from the tyres',
    ],
    correctAnswer: 0,
    explanation:
      'During aquaplaning the tyres ride on a film of water and neither steering nor braking works. Release the accelerator, keep the wheel straight and do not brake — grip returns as speed falls. Prevention is tread depth above 3 mm and lower speeds in standing water.',
    lawReference: 'Traficom — hazard theory curriculum',
  },
  {
    id: 'hz-14',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A vehicle is stopped on the hard shoulder ahead with hazard lights flashing and a person standing beside it. What is the appropriate response?',
    options: [
      'Reduce speed, move over within your lane or change lane if safe, and pass with extra clearance',
      'Maintain speed — the vehicle is off the carriageway',
      'Stop behind it to check what happened, regardless of location',
      'Sound the horn to warn the person to move',
    ],
    correctAnswer: 0,
    explanation:
      'A person on foot beside a stopped vehicle may step into the lane without warning, and the vehicle itself may pull out. Reduce speed and increase lateral clearance. If you intend to help, stop only where it is safe and use hazard lights and a warning triangle.',
    lawReference: 'Tieliikennelaki 729/2018, 3 § ja 15 §',
  },
  {
    id: 'hz-15',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You approach a level crossing without barriers. The warning lights are not flashing. What must you still do?',
    options: [
      'Slow down, look both ways along the track and be ready to stop',
      'Cross at normal speed — no lights means no train',
      'Stop completely every time before crossing',
      'Change to a lower gear and cross as quickly as possible without looking',
    ],
    correctAnswer: 0,
    explanation:
      'Warning devices can fail, and an unbarriered crossing gives no protection at all. Approach slowly, check both directions along the track, and cross only when you can clear it entirely without stopping. Never stop on the rails, and never start crossing behind another vehicle that has not yet cleared.',
    lawReference: 'Tieliikennelaki 729/2018, 33 §',
  },
  {
    id: 'hz-16',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving through a built-up area and a bus stops ahead of you at a stop on your side of the road. What is the main developing hazard?',
    options: [
      'Passengers may step into the road from in front of the bus, hidden from your view',
      'The bus may reverse without warning',
      'The bus may drop debris onto the road',
      'The bus will block your view of traffic signs',
    ],
    correctAnswer: 0,
    explanation:
      'A stopped bus creates a screened crossing point. Passengers who have just alighted frequently cross in front of it without checking. Pass slowly with room to stop, and be ready for the bus to signal and pull out — on 60 km/h roads and below you must then give way.',
    lawReference: 'Tieliikennelaki 729/2018, 26 § ja 32 §',
  },
  {
    id: 'hz-17',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A car ahead of you is drifting between lane edges and braking inconsistently. What should you conclude and do?',
    options: [
      'The driver may be impaired, distracted or fatigued — increase distance and do not overtake closely',
      'The driver is signalling that you should overtake',
      'The road surface is uneven — mirror the same line',
      'Close the gap to encourage the driver to concentrate',
    ],
    correctAnswer: 0,
    explanation:
      'Inconsistent lane keeping and erratic braking suggest an impaired, distracted or drowsy driver whose next action is unpredictable. Hold well back, avoid a close overtake, and if the behaviour is clearly dangerous report it to 112 once safely stopped.',
    lawReference: 'Tieliikennelaki 729/2018, 3 §',
  },
  {
    id: 'hz-18',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving at 80 km/h on a rural road when a deer runs across ahead and disappears into the trees on the right. What is the correct response?',
    options: [
      'Slow down and stay alert — deer usually move in groups and more may follow',
      'Resume speed immediately, since the deer has passed',
      'Swerve toward the left verge as a precaution',
      'Stop in the lane and turn on hazard lights',
    ],
    correctAnswer: 0,
    explanation:
      'Deer rarely travel alone, and a second animal following the first is a frequent cause of collisions. Reduce speed and keep scanning the verges. If a collision is unavoidable, brake hard in a straight line rather than swerving — swerving causes far more serious crashes.',
    lawReference: 'Traficom — hazard theory curriculum',
  },
  {
    id: 'hz-19',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You want to overtake on a two-lane road but there is a solid centre line and a crest ahead. What do you do?',
    options: [
      'Do not overtake — wait until the line is broken and the road ahead is clearly visible',
      'Overtake quickly since the crest is short',
      'Straddle the solid line to shorten the overtake',
      'Overtake if the oncoming lane looks empty from your position',
    ],
    correctAnswer: 0,
    explanation:
      'A solid centre line must not be crossed, and it is placed exactly where sight distance is insufficient — such as before a crest or bend. An oncoming vehicle beyond the crest is invisible until it is far too late to abort the manoeuvre.',
    lawReference: 'Tieliikennelaki 729/2018, 19 §, liite 4',
  },
  {
    id: 'hz-20',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are in a queue of traffic and the car behind you is following extremely closely. What is the safest adjustment?',
    options: [
      'Increase the gap to the vehicle in front so you can brake gradually',
      'Brake sharply to warn the tailgater',
      'Reduce your own following distance to match',
      'Accelerate to open a gap behind you',
    ],
    correctAnswer: 0,
    explanation:
      'You cannot control the driver behind, but you can control the space in front. A larger forward gap lets you slow gently instead of braking hard, which gives the tailgater time to react and reduces the chance of being hit from behind.',
    lawReference: 'Tieliikennelaki 729/2018, 15 §',
  },
  {
    id: 'hz-21',
    category: 'Priority Rules',
    type: 'hazard_perception',
    question:
      'You are leaving a car park and crossing a pavement to reach the road. Who has priority?',
    options: [
      'Pedestrians and cyclists on the pavement, and then all traffic on the road',
      'You, because you are already in motion',
      'You, if you sound the horn first',
      'Pedestrians only if a crossing is marked',
    ],
    correctAnswer: 0,
    explanation:
      'A driver entering the road from a property, car park, petrol station or similar area must give way to all other traffic, including pedestrians and cyclists on the pavement being crossed. This is one of the strictest yielding duties in the Act.',
    lawReference: 'Tieliikennelaki 729/2018, 27 §',
  },
  {
    id: 'hz-22',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'It is a dark winter evening and a pedestrian without a reflector is walking on the shoulder of an unlit road. At what distance can you typically first see them on dipped beam?',
    options: [
      'About 50 metres — often less than your stopping distance at 80 km/h',
      'About 300 metres, the same as with a reflector',
      'About 150 metres',
      'Visibility is unaffected by reflectors',
    ],
    correctAnswer: 0,
    explanation:
      'On dipped beam a pedestrian in dark clothing becomes visible at roughly 50 metres, while a reflector is visible from several hundred. At 80 km/h your total stopping distance already exceeds 50 metres, so the only defence is lower speed on unlit roads.',
    lawReference: 'Tieliikennelaki 729/2018, 45 § (pedestrian reflector duty)',
  },
  {
    id: 'hz-23',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Approaching a green traffic light that has been green for some time, what is the appropriate mindset?',
    options: [
      'Anticipate that it may change — cover the brake and check the intersection is clear',
      'Accelerate to pass before it turns amber',
      'Treat green as an absolute guarantee of a clear path',
      'Sound the horn while entering the intersection',
    ],
    correctAnswer: 0,
    explanation:
      'A "stale" green is likely to change soon, so approach ready to stop. Green also never guarantees a clear intersection: vehicles may still be clearing it, an emergency vehicle may cross, and pedestrians may be late finishing their crossing.',
    lawReference: 'Tieliikennelaki 729/2018, 71 §',
  },
  {
    id: 'hz-24',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving in dense fog on a rural road. Which combination is correct?',
    options: [
      'Dipped beam plus fog lights, reduced speed, increased following distance',
      'Main beam for maximum illumination and normal speed',
      'Hazard lights on while driving normally',
      'Parking lights only, to reduce reflection',
    ],
    correctAnswer: 0,
    explanation:
      'Main beam reflects off fog droplets and makes visibility worse. Use dipped beam with front fog lights, cut speed so you can stop within the visible distance, and extend the gap ahead. Hazard lights are for a stationary or exceptionally slow vehicle, not for normal driving.',
    lawReference: 'Tieliikennelaki 729/2018, 36–38 §',
  },
  {
    id: 'hz-25',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A lorry ahead of you is turning right into a narrow side street and swings out to the left first. What should you do?',
    options: [
      'Stay well back and never attempt to pass on its right side',
      'Pass on the right while the gap is open',
      'Overtake on the left immediately',
      'Sound the horn to indicate the driver is in the wrong lane',
    ],
    correctAnswer: 0,
    explanation:
      'A long vehicle must swing wide to bring its trailer around a tight turn. The gap that opens on its right closes as the trailer sweeps across, crushing anything inside it. Hold back and wait for the manoeuvre to finish.',
    lawReference: 'Tieliikennelaki 729/2018, 15 § ja 20 §',
  },
  {
    id: 'hz-26',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Driving downhill on a long descent with a loaded car, the brakes begin to feel soft. What is happening and what should you do?',
    options: [
      'Brake fade from overheating — shift to a lower gear and use engine braking',
      'Normal brake behaviour on hills — keep pressing harder',
      'Aquaplaning — release the brakes entirely',
      'A puncture — accelerate to the bottom of the hill',
    ],
    correctAnswer: 0,
    explanation:
      'Continuous braking overheats pads and fluid and the pedal goes long and soft. Select a lower gear so the engine restrains the vehicle, and use firm, brief brake applications with pauses instead of constant pressure.',
    lawReference: 'Traficom — vehicle handling curriculum',
  },
  {
    id: 'hz-27',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You have to brake hard on an icy road in a car equipped with ABS. What is the correct technique?',
    options: [
      'Press the pedal firmly and hold it, steering around the obstacle as needed',
      'Pump the brake pedal rapidly',
      'Press lightly to avoid triggering ABS',
      'Pull the handbrake instead',
    ],
    correctAnswer: 0,
    explanation:
      'ABS pulses the brakes for you, so press hard and keep pressing — the pedal vibration is normal. Its main benefit is retained steering during maximum braking. On loose snow or gravel ABS may actually lengthen the stopping distance, so distance and speed remain your first defence.',
    lawReference: 'Traficom — vehicle safety systems curriculum',
  },
  {
    id: 'hz-28',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Approaching a blind bend on a narrow rural road, where should your speed and position be set?',
    options: [
      'Slow enough to stop within the distance you can see to be clear, positioned to the right',
      'At the speed limit, cutting the corner for a smoother line',
      'Fast enough to exit the bend quickly',
      'In the centre of the road for the best view',
    ],
    correctAnswer: 0,
    explanation:
      'The governing principle is to be able to stop within your visible clear distance. On a blind bend that distance is short, so speed must drop. Cutting the corner or centring the car places you where an oncoming vehicle will be.',
    lawReference: 'Tieliikennelaki 729/2018, 3 § ja 15 §',
  },
  {
    id: 'hz-29',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Your car starts to skid at the rear (oversteer) on a slippery bend. What is the correct correction?',
    options: [
      'Ease off the accelerator and steer gently toward where you want to go',
      'Brake hard and hold the wheel straight',
      'Steer sharply in the opposite direction to the skid',
      'Accelerate hard to pull the car straight',
    ],
    correctAnswer: 0,
    explanation:
      'Release the accelerator smoothly and countersteer gently in the direction you want the car to travel, then unwind the steering as grip returns. Hard braking or abrupt steering usually converts a recoverable slide into a spin.',
    lawReference: 'Traficom — vehicle handling curriculum',
  },
  {
    id: 'hz-30',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A car ahead signals left but stays in the right lane, drifting slowly. What is the safest assumption?',
    options: [
      'The signal may be forgotten or the driver undecided — do not act on it, wait for actual movement',
      'The driver will definitely turn left, so pass on the right immediately',
      'The indicator is faulty and can be ignored entirely',
      'The driver is inviting you to overtake',
    ],
    correctAnswer: 0,
    explanation:
      'A signal states intention, not fact. Base your decision on the vehicle\'s actual position and speed, not on its lights. Passing on the right on the assumption of a left turn is a common cause of collisions when the driver never turns.',
    lawReference: 'Tieliikennelaki 729/2018, 19 §',
  },
  {
    id: 'hz-31',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving in a residential area where children are playing near the road. What speed is appropriate even if the limit is 40 km/h?',
    options: [
      'Clearly below the limit — the limit is a maximum, not a target',
      'Exactly 40 km/h, since that is legal',
      'Any speed, as long as you sound the horn',
      '40 km/h, but only in the middle of the road',
    ],
    correctAnswer: 0,
    explanation:
      'The Act requires speed to suit the conditions, and a posted limit is only an upper bound. Where children are present, the safe speed is considerably lower — a pedestrian struck at 30 km/h is far more likely to survive than one struck at 50.',
    lawReference: 'Tieliikennelaki 729/2018, 15 §',
  },
  {
    id: 'hz-32',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are stopped in a queue and a driver ahead opens their door into your path. What defensive habit prevents this type of collision?',
    options: [
      'Keeping lateral clearance from parked and stopped cars and scanning for occupants',
      'Driving as close as possible to parked cars to stay clear of oncoming traffic',
      'Relying on the other driver to check first',
      'Sounding the horn continuously in queues',
    ],
    correctAnswer: 0,
    explanation:
      'Dooring is prevented by space and observation: keep roughly a door\'s width from parked vehicles and look through rear windows for occupants and for brake lights or exhaust indicating a car about to move.',
    lawReference: 'Tieliikennelaki 729/2018, 3 §',
  },
  {
    id: 'hz-33',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are the first to arrive at a crash where a person is trapped and unconscious. What is the correct order of action?',
    options: [
      'Secure the scene, call 112, then give first aid according to the dispatcher\'s instructions',
      'Move the casualty out of the vehicle immediately in every case',
      'Photograph the scene for insurance before doing anything else',
      'Wait for another driver to take responsibility',
    ],
    correctAnswer: 0,
    explanation:
      'Prevent a secondary crash first — hazard lights, warning triangle, own safety — then call 112 and follow the dispatcher. A casualty is moved only if there is an immediate danger such as fire, because moving someone with a spinal injury can cause permanent harm. Assisting at a crash is a legal duty.',
    lawReference: 'Tieliikennelaki 729/2018, 179 §; Pelastuslaki 379/2011, 3 §',
  },
  {
    id: 'hz-34',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'On a motorway you realise you have passed your exit. What is the correct action?',
    options: [
      'Continue to the next exit and turn around there',
      'Reverse along the hard shoulder to the exit',
      'Stop and wait for a gap to cross the central reservation',
      'Use the emergency turnaround gap in the median',
    ],
    correctAnswer: 0,
    explanation:
      'Reversing, U-turns and using median gaps are prohibited on motorways — median openings exist only for maintenance and emergency services. Missing an exit costs a few minutes; a wrong-way manoeuvre on a motorway is among the most lethal errors possible.',
    lawReference: 'Tieliikennelaki 729/2018, 41 §',
  },
  {
    id: 'hz-35',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Snow is falling heavily and the road markings are no longer visible. How should you position the car?',
    options: [
      'Use the snow poles, verge markers and tracks of vehicles ahead as reference, keeping right and slowing down',
      'Drive in the centre of the road so both verges stay equally far away',
      'Follow the vehicle ahead closely to use its tail lights as a guide',
      'Switch on hazard lights and maintain normal speed',
    ],
    correctAnswer: 0,
    explanation:
      'When markings disappear, roadside snow poles and existing tracks define the lane. Keep right, reduce speed and lengthen the gap. Following closely to use another car\'s lights removes your reaction time — the exact resource you need most in poor visibility.',
    lawReference: 'Tieliikennelaki 729/2018, 15 §',
  },
  {
    id: 'hz-36',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A cyclist ahead of you on a narrow road wobbles slightly as you prepare to overtake. What clearance and timing are appropriate?',
    options: [
      'Wait for a clear stretch and pass with at least 1.5 metres of lateral clearance at reduced speed',
      'Pass immediately with minimal clearance to spend less time alongside',
      'Sound the horn as you pass to warn the cyclist',
      'Follow directly behind until the cyclist leaves the road',
    ],
    correctAnswer: 0,
    explanation:
      'A cyclist needs room to correct for wind, potholes and balance. Overtake only where the road ahead is clear, cross into the other lane if necessary, leave a wide margin and moderate your speed. A horn close behind can startle a cyclist into the traffic lane.',
    lawReference: 'Tieliikennelaki 729/2018, 19 § ja 20 §',
  },
  {
    id: 'hz-37',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are approaching a queue that has stopped on a motorway. What should you do as you slow?',
    options: [
      'Brake early and switch on hazard lights briefly to warn drivers behind',
      'Brake as late as possible to keep the queue compact',
      'Change lanes repeatedly to find the fastest lane',
      'Stop on the hard shoulder until the queue clears',
    ],
    correctAnswer: 0,
    explanation:
      'The end of a queue on a high-speed road is where the most severe rear-end collisions happen. Braking early lengthens the warning, and a brief use of hazard lights alerts drivers behind who cannot yet see the obstruction.',
    lawReference: 'Tieliikennelaki 729/2018, 39 §',
  },
  {
    id: 'hz-38',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Sun is low on the horizon and glare makes the road hard to see. What is the correct response?',
    options: [
      'Reduce speed, use the sun visor and clean the windscreen — glare hides pedestrians and cyclists',
      'Wear the darkest possible sunglasses and maintain speed',
      'Use main beam to compensate',
      'Follow the vehicle ahead closely so it shields the sun',
    ],
    correctAnswer: 0,
    explanation:
      'Low sun combined with a dirty or scratched windscreen scatters light and can hide a pedestrian entirely. Slow down, use the visor and keep the glass clean inside and out. Remember oncoming drivers are equally blinded and may not see you.',
    lawReference: 'Tieliikennelaki 729/2018, 15 §',
  },
  {
    id: 'hz-39',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A pedestrian using a white cane starts to cross the road ahead of you, away from any crossing. What must you do?',
    options: [
      'Stop and let them cross — a visually impaired pedestrian must always be given way to',
      'Continue, since they are not using a marked crossing',
      'Sound the horn to alert them and drive past',
      'Pass slowly behind them without stopping',
    ],
    correctAnswer: 0,
    explanation:
      'A driver must give way to a pedestrian who signals with a white cane or is accompanied by a guide dog, wherever they are crossing. They cannot judge the traffic visually, so the responsibility rests entirely with the driver.',
    lawReference: 'Tieliikennelaki 729/2018, 32 §',
  },
  {
    id: 'hz-40',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are reversing out of a parking space in a busy car park. What is the safest method?',
    options: [
      'Check all around before starting, reverse slowly and stop if your view is blocked',
      'Rely entirely on the reversing camera',
      'Reverse quickly so you spend less time in the traffic lane',
      'Sound the horn continuously while reversing',
    ],
    correctAnswer: 0,
    explanation:
      'A reversing driver must give way to everyone and may not endanger others. Cameras and sensors miss small children and objects approaching from the side, so a full physical check before and during the manoeuvre remains essential.',
    lawReference: 'Tieliikennelaki 729/2018, 21 §',
  },
  {
    id: 'hz-41',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A road-maintenance vehicle with a flashing amber beacon is working ahead in your lane. What does the beacon mean?',
    options: [
      'Caution — a slow or stationary working vehicle; pass only with care and at low speed',
      'Priority for you to pass immediately',
      'The road ahead is closed',
      'You must stop until the vehicle moves off',
    ],
    correctAnswer: 0,
    explanation:
      'An amber beacon warns of a slow-moving or stationary working vehicle, not an emergency. Workers may be on foot around it and it can move unpredictably. Slow markedly, leave wide clearance and pass only when you can see the way ahead.',
    lawReference: 'Tieliikennelaki 729/2018, 40 §',
  },
  {
    id: 'hz-42',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving on a gravel road and meet an oncoming car raising a cloud of dust. What is the correct response?',
    options: [
      'Slow down substantially and keep right — visibility inside the dust cloud is near zero',
      'Maintain speed and drive through the dust quickly',
      'Move to the centre of the road for better traction',
      'Switch on main beam to see through the dust',
    ],
    correctAnswer: 0,
    explanation:
      'A dust cloud hides oncoming traffic, cyclists and potholes completely. Loose gravel also gives poor braking and steering grip. Reduce speed, keep right and be prepared for another vehicle to emerge from the cloud.',
    lawReference: 'Tieliikennelaki 729/2018, 15 §',
  },
  {
    id: 'hz-43',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'While driving, your phone rings and it is an important call. What is the legal and safe course of action?',
    options: [
      'Leave it — answer only via a hands-free system, or stop somewhere safe first',
      'Answer briefly by holding the phone, as short calls are permitted',
      'Answer while stopped at a red light by holding the phone',
      'Use the phone freely as long as both hands remain near the wheel',
    ],
    correctAnswer: 0,
    explanation:
      'Holding a phone while driving is prohibited; only hands-free use is allowed, and the prohibition applies while stopped in traffic too. Even hands-free calls measurably reduce hazard detection, so the safest option is to let it wait.',
    lawReference: 'Tieliikennelaki 729/2018, 3 § ja 98 §',
  },
  {
    id: 'hz-44',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You approach an intersection where a police officer is directing traffic while the lights show green for you. Whom do you obey?',
    options: [
      'The police officer — their signals override traffic lights and signs',
      'The traffic light, since it is an automatic system',
      'Whichever gives you the right to proceed',
      'The traffic sign posted at the intersection',
    ],
    correctAnswer: 0,
    explanation:
      'The order of precedence is: instructions from a traffic controller, then traffic lights, then signs and road markings, then the general rules. An officer directing traffic overrides a green light entirely.',
    lawReference: 'Tieliikennelaki 729/2018, 6 §',
  },
  {
    id: 'hz-45',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving a heavily loaded car with luggage stacked above the seat backs. What is the hazard?',
    options: [
      'Loose cargo becomes a projectile in a collision and blocks rear visibility — it must be secured and kept low',
      'It only affects fuel consumption',
      'It is safe as long as passengers wear seat belts',
      'It only matters on motorways',
    ],
    correctAnswer: 0,
    explanation:
      'Unsecured cargo continues at the vehicle\'s speed in a crash — a 20 kg bag at 50 km/h strikes with the force of a tonne. Load must be secured, kept low, and must not obstruct the driver\'s view or exceed the vehicle\'s permitted mass.',
    lawReference: 'Tieliikennelaki 729/2018, 106 §',
  },
  {
    id: 'hz-46',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'Traffic lights at a busy intersection are completely dark due to a power failure. How do you proceed?',
    options: [
      'Apply the signs at the intersection, or the right-hand rule if none — approach slowly and be ready to stop',
      'Treat it as a green light in all directions',
      'Stop and wait until the lights are repaired',
      'The largest road always has priority automatically',
    ],
    correctAnswer: 0,
    explanation:
      'When lights fail, the next level of the hierarchy takes over: any signs at the intersection, and otherwise the right-hand rule. Other drivers may misjudge this, so approach at a speed that lets you stop and make eye contact where possible.',
    lawReference: 'Tieliikennelaki 729/2018, 6 § ja 24 §',
  },
  {
    id: 'hz-47',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are turning left across oncoming traffic and a queue of cars is waiting. One oncoming driver flashes their lights to invite you through. What should you do?',
    options: [
      'Proceed only if you have personally verified that all lanes are clear — a flash is not a guarantee',
      'Turn immediately, as the flash gives you priority',
      'Turn without checking, since the flashing driver takes responsibility',
      'Ignore the situation and reverse out of the intersection',
    ],
    correctAnswer: 0,
    explanation:
      'A courtesy flash has no legal meaning and cannot transfer priority. A motorcycle or cyclist filtering past the stopped queue is a very common collision in this exact situation. Verify every lane yourself before committing to the turn.',
    lawReference: 'Tieliikennelaki 729/2018, 25 §',
  },
  {
    id: 'hz-48',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A motorcycle is approaching in the oncoming lane as you wait to turn left. Why is judging its speed difficult?',
    options: [
      'Its narrow frontal profile makes it look further away and slower than it is',
      'Motorcycles always travel below the speed limit',
      'Motorcycles are never visible in daylight',
      'Its headlight makes it appear closer than it is',
    ],
    correctAnswer: 0,
    explanation:
      'A narrow object gives weak distance cues, so drivers routinely overestimate a motorcycle\'s distance and underestimate its speed. This misjudgement is a leading cause of left-turn collisions with motorcyclists. When in doubt, wait.',
    lawReference: 'Traficom — hazard theory curriculum',
  },
  {
    id: 'hz-49',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'You are driving and notice your attention drifting after two hours on a monotonous motorway. What is the correct response?',
    options: [
      'Stop at the next rest area and take a break — a short nap is the only effective remedy',
      'Open a window and turn up the radio, then continue for several more hours',
      'Increase speed to shorten the remaining journey',
      'Drink coffee and continue without stopping',
    ],
    correctAnswer: 0,
    explanation:
      'Fatigue degrades reaction time comparably to alcohol, and microsleeps occur without warning. Fresh air, music and caffeine give at best a brief delay. The only real countermeasure is stopping and sleeping — a 15–20 minute nap restores alertness substantially.',
    lawReference: 'Tieliikennelaki 729/2018, 3 §',
  },
  {
    id: 'hz-50',
    category: 'Situation Hazards',
    type: 'hazard_perception',
    question:
      'A car in the lane beside you on a multi-lane road starts drifting into your lane without signalling. What is the best immediate action?',
    options: [
      'Ease off the accelerator to drop back and sound a short horn warning if needed',
      'Accelerate to get past before they complete the move',
      'Swerve into the next lane without checking',
      'Hold your position and expect them to notice you',
    ],
    correctAnswer: 0,
    explanation:
      'You are almost certainly in the other driver\'s blind spot. Reducing speed removes you from it and creates space, which is safer than accelerating into a shrinking gap or swerving blind into a lane you have not checked.',
    lawReference: 'Tieliikennelaki 729/2018, 18 §',
  },
  {
    id: 'hz-51',
    category: 'Hazardous Conditions',
    type: 'hazard_perception',
    question:
      'You are driving in the first rain after a long dry spell. Why is the road especially slippery?',
    options: [
      'Oil and rubber deposits mix with the water to form a slick film until washed away',
      'Rain lowers the temperature below freezing',
      'Water expands the tyre rubber',
      'The road absorbs the water and becomes softer',
    ],
    correctAnswer: 0,
    explanation:
      'Weeks of dry weather leave oil, fuel and rubber on the surface. The first rain lifts these into an emulsion that is far more slippery than a road that has been wet for hours. Reduce speed and increase the gap during the first minutes of rainfall.',
    lawReference: 'Traficom — hazard theory curriculum',
  },
  {
    id: 'hz-52',
    category: 'Priority Rules',
    type: 'hazard_perception',
    question:
      'Two vehicles reach a narrow section of road with a passing-place from opposite directions and neither has a priority sign. Who should give way?',
    options: [
      'The driver who can more easily and safely make room, applying the general duty of care',
      'The driver travelling uphill, always',
      'The larger vehicle, always',
      'Neither — both should proceed and squeeze past',
    ],
    correctAnswer: 0,
    explanation:
      'Absent signs, the general duty of care applies: the driver with the passing-place nearer, better visibility or the easier manoeuvre should make room. On a steep gradient it is customary for the descending vehicle to yield, since restarting uphill is harder.',
    lawReference: 'Tieliikennelaki 729/2018, 3 §',
  },

  // ---------------------------------------------------------------------------
  // RISK ASSESSMENT — 8
  // ---------------------------------------------------------------------------
  {
    id: 'rk-01',
    category: 'Hazardous Conditions',
    type: 'risk_assessment',
    question:
      'You drank four beers ending at midnight and must drive at 07:00. What is the correct assessment?',
    options: [
      'Alcohol clears at roughly one unit per hour and there may still be too much in your blood — arrange another way to travel or delay',
      'Seven hours of sleep always makes it safe to drive',
      'A cold shower and coffee remove the alcohol',
      'Only feeling drunk matters; if you feel fine you are fit to drive',
    ],
    correctAnswer: 0,
    explanation:
      'The body eliminates roughly one unit of alcohol per hour and nothing accelerates it — not sleep, coffee, food or a shower. Residual alcohol the next morning is a common cause of drink-driving convictions, and subjective feeling is an unreliable gauge.',
    lawReference: 'Rikoslaki 39/1889, 23 luku 3 §',
  },
  {
    id: 'rk-02',
    category: 'Hazardous Conditions',
    type: 'risk_assessment',
    question:
      'You have been prescribed medication with a red warning triangle on the package. What does this mean for driving?',
    options: [
      'It may impair driving ability — check with a doctor or pharmacist before driving',
      'It only affects driving if combined with alcohol',
      'The triangle is purely informational and has no bearing on driving',
      'You may drive as long as you take a lower dose',
    ],
    correctAnswer: 0,
    explanation:
      'The red triangle marks a medicine that can impair alertness or reaction time. Driving while impaired by medication is punishable in the same way as drink-driving. Consult a doctor or pharmacist about the effect and timing before driving.',
    lawReference: 'Rikoslaki 39/1889, 23 luku 3 §; Tieliikennelaki 729/2018, 3 §',
  },
  {
    id: 'rk-03',
    category: 'Hazardous Conditions',
    type: 'risk_assessment',
    question:
      'You are a newly licensed driver. Which factor most increases your statistical crash risk?',
    options: [
      'Limited experience in recognising developing hazards, compounded by night driving and passengers',
      'Insufficient knowledge of traffic signs',
      'Driving a car that is too old',
      'Driving too slowly on main roads',
    ],
    correctAnswer: 0,
    explanation:
      'New drivers usually know the rules; what they lack is the pattern recognition that turns a scene into an anticipated hazard. Night driving, peer passengers and overestimating one\'s own skill multiply that gap — which is why the first years carry the highest risk.',
    lawReference: 'Traficom — novice driver risk statistics',
  },
  {
    id: 'rk-04',
    category: 'Hazardous Conditions',
    type: 'risk_assessment',
    question:
      'You are running late for an important appointment. How should this influence your driving?',
    options: [
      'It must not influence it — accept the delay, since time pressure is a documented cause of risky decisions',
      'Increase speed moderately to make up the lost time',
      'Take more overtaking opportunities than usual',
      'Reduce following distance to keep up with traffic',
    ],
    correctAnswer: 0,
    explanation:
      'Time pressure narrows attention, shortens accepted gaps and increases speed — a well-documented crash mechanism. The time actually recovered by speeding on a typical journey is a few minutes, disproportionate to the risk accepted.',
    lawReference: 'Tieliikennelaki 729/2018, 3 §',
  },
  {
    id: 'rk-05',
    category: 'Hazardous Conditions',
    type: 'risk_assessment',
    question:
      'Your passengers encourage you to drive faster and take risks. What is the appropriate response?',
    options: [
      'Decline — the driver alone carries legal and moral responsibility for everyone in the car',
      'Comply if all passengers agree, since they accept the risk',
      'Comply briefly to satisfy them, then slow down',
      'Let a passenger take over the driving instead',
    ],
    correctAnswer: 0,
    explanation:
      'Responsibility for the vehicle and for every occupant rests with the driver and cannot be shared or delegated by consent. Social pressure from passengers is a recognised risk factor for young drivers in particular, and resisting it is part of driving competence.',
    lawReference: 'Tieliikennelaki 729/2018, 3 §',
  },
  {
    id: 'rk-06',
    category: 'Hazardous Conditions',
    type: 'risk_assessment',
    question:
      'What is the most accurate description of the relationship between speed and injury severity for a struck pedestrian?',
    options: [
      'Survival probability falls steeply between 30 and 50 km/h — impact energy rises with the square of speed',
      'Severity increases linearly with speed',
      'Below 60 km/h a pedestrian is generally not seriously injured',
      'Vehicle mass matters far more than speed',
    ],
    correctAnswer: 0,
    explanation:
      'Impact energy scales with the square of speed, so the survival curve for pedestrians drops sharply across the 30–50 km/h range. This is the reasoning behind 30 km/h zones near schools and residential streets — a small speed reduction produces a large survival gain.',
    lawReference: 'Traficom — road safety research',
  },
  {
    id: 'rk-07',
    category: 'Vehicle Tech',
    type: 'risk_assessment',
    question:
      'Your car has ESC, ABS, lane-keeping assistance and automatic emergency braking. How should this affect your driving?',
    options: [
      'Not at all — assistance systems have physical limits and must never justify a smaller safety margin',
      'You may drive faster in winter, since ESC prevents skidding',
      'Following distance can be reduced, since emergency braking will intervene',
      'Mirror checks are unnecessary with lane-keeping assistance',
    ],
    correctAnswer: 0,
    explanation:
      'Every assistance system is bounded by the grip available and by sensor limits — snow, direct sun or poor markings can disable them without warning. Using a safety system as a licence to take more risk is called risk compensation, and it cancels the benefit.',
    lawReference: 'Traficom — vehicle safety systems curriculum',
  },
  {
    id: 'rk-08',
    category: 'Hazardous Conditions',
    type: 'risk_assessment',
    question:
      'Your vehicle breaks down in a live lane on a rural road at night. What is the correct sequence of actions?',
    options: [
      'Hazard lights on, occupants out on the verge side, warning triangle placed well back, then call for help',
      'Stay in the car with the engine running until help arrives',
      'Place the warning triangle immediately behind the car',
      'Stand behind the vehicle to wave down approaching traffic',
    ],
    correctAnswer: 0,
    explanation:
      'Being inside a stationary car in a live lane is the most dangerous place to be. Switch on hazard lights, get everyone out on the side away from traffic and behind a barrier if possible, and place the warning triangle far enough back to give real warning — considerably further on a high-speed road. Wear something reflective.',
    lawReference: 'Tieliikennelaki 729/2018, 39 § ja 92 §',
  },
];

/** The shipped question bank, with option order permuted per question. */
export const questions: Question[] = authoredQuestions.map(withDeterministicOptionOrder);

/** Questions belonging to a given exam section type. */
export function getQuestionsByType(type: QuestionType): Question[] {
  return questions.filter((q) => q.type === type);
}

/** Questions belonging to a given study category. */
export function getQuestionsByCategory(category: QuestionCategory): Question[] {
  return questions.filter((q) => q.category === category);
}

/** Look up a single question by id. */
export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

/** Look up many questions by id, preserving the order of `ids`. */
export function getQuestionsByIds(ids: string[]): Question[] {
  const index = new Map(questions.map((q) => [q.id, q]));
  return ids.map((id) => index.get(id)).filter((q): q is Question => q !== undefined);
}

export default questions;
