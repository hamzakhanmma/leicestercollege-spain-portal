import { useEffect, useRef } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export interface PortalContent {
  meta: {
    tripName: string;
    tripYear: string;
    academicYear: string;
    countdownDate: string;
    departureDetails: string;
  };
  announcements: Array<{ id: string; text: string; date: string }>;
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    weatherTemp: string;
    weatherCondition: string;
    weatherLocation: string;
    nextActivityTitle: string;
    nextActivityDate: string;
    nextActivityLocation: string;
  };
  flights: {
    outboundFlight: string;
    outboundDate: string;
    outboundTime: string;
    returnFlight: string;
    returnDate: string;
    returnTime: string;
    airline: string;
    meetingTime: string;
    meetingPlace: string;
    coachDepartTime: string;
    holdBagMax: string;
    cabinDimensions: string;
    checklist: string[];
    timeline: Array<{ time: string; title: string; description: string; iconKey?: string; isActive?: boolean }>;
  };
  transport: {
    outboundSummary: string;
    placementTransport: string;
    emergencyTaxiInfo: string;
    safetyReminders: string[];
  };
  accommodation: {
    name: string;
    address: string;
    curfewWeekday: string;
    curfewWeekend: string;
    mealBreakfast: string;
    mealLunch: string;
    mealDinner: string;
    wifiInfo: string;
    rules: Array<{ title: string; description: string }>;
  };
  safety: {
    contacts: Array<{ name: string; number: string; role: string; type: 'emergency' | 'staff' | 'medical' | 'consulate' }>;
    healthTips: string[];
    pickpocketWarnings: string[];
    emergencyProcedure: string;
    curfewWarning: string;
  };
  itinerary: Array<{
    id: string;
    date: string;
    dayLabel: string;
    title: string;
    description: string;
    type: 'travel' | 'placement' | 'cultural' | 'leisure' | 'special';
    time?: string;
    iconKey?: string;
    isActive?: boolean;
    colorKey?: string;
  }>;
  culture: {
    overview: string;
    lebrijaInfo: string;
    climate: string;
    etiquetteTips: string[];
    phrases: Array<{ es: string; en: string; pron: string }>;
    facts: Array<{ label: string; value: string }>;
    foodGuide: string;
  };
  faq: Array<{ id: string; category: string; question: string; answer: string }>;
  registration: {
    confirmationText: string;
    successHeadline: string;
    successMessage: string;
  };
  evaluation: {
    activities: string[];
  };
}

export const DEFAULT_CONTENT: PortalContent = {
  meta: {
    tripName: "Lebrija, Spain 2025",
    tripYear: "2025",
    academicYear: "2024/25",
    countdownDate: "2025-07-14T06:30:00",
    departureDetails: "Leicester College to East Midlands Airport"
  },
  announcements: [
    { id: "1", text: "Departure meeting confirmed for 12 July — Room A14", date: new Date().toISOString() }
  ],
  homepage: {
    heroTitle: "International Work Experience Portal",
    heroSubtitle: "Your ultimate guide to the Leicester College Spain placement.",
    weatherTemp: "34",
    weatherCondition: "Sunny & Clear",
    weatherLocation: "Lebrija, Spain",
    nextActivityTitle: "Departure Meeting",
    nextActivityDate: "12 July, 14:00",
    nextActivityLocation: "Room A14"
  },
  flights: {
    outboundFlight: "FR1234",
    outboundDate: "14 July 2025",
    outboundTime: "09:45",
    returnFlight: "FR1235",
    returnDate: "28 July 2025",
    returnTime: "18:05",
    airline: "Ryanair",
    meetingTime: "06:30",
    meetingPlace: "Leicester College car park",
    coachDepartTime: "06:45",
    holdBagMax: "20kg",
    cabinDimensions: "55x40x20cm, max 10kg",
    checklist: [
      "Passport & GHIC",
      "Euros",
      "Phone charger & adapter (Type C)",
      "Travel insurance docs",
      "Medication letter (if needed)",
      "Sunscreen & comfortable shoes"
    ],
    timeline: [
      { time: "06:30", title: "Meet at College", description: "Meet at the main college entrance coach bay. DO NOT BE LATE.", iconKey: "MapPin", isActive: true },
      { time: "06:45", title: "Coach to EMA", description: "Coach departs for East Midlands Airport.", iconKey: "Bus" },
      { time: "07:45", title: "Check-in & Security", description: "Drop hold bags and clear security.", iconKey: "Shield" },
      { time: "09:00", title: "Boarding FR1234", description: "Proceed to gate for boarding.", iconKey: "Plane" },
      { time: "09:45", title: "Takeoff", description: "Departing for Seville (SVQ).", iconKey: "Plane" },
      { time: "13:30", title: "Land in Seville", description: "Local time. Clear passport control and collect bags.", iconKey: "MapPin" },
      { time: "14:30", title: "Transfer to Lebrija", description: "Coach transfer to Residencia Universitaria.", iconKey: "Bus" }
    ]
  },
  transport: {
    outboundSummary: "Coach from Leicester College to EMA, Ryanair to SVQ, Coach to Lebrija Residencia.",
    placementTransport: "Walk or local bus.",
    emergencyTaxiInfo: "Radio Taxi Lebrija: +34 955 97 10 10",
    safetyReminders: ["Stay in groups", "Keep belongings secure", "Know your stop"]
  },
  accommodation: {
    name: "Residencia Universitaria",
    address: "Lebrija, Seville",
    curfewWeekday: "22:00",
    curfewWeekend: "23:00",
    mealBreakfast: "07:30",
    mealLunch: "14:00",
    mealDinner: "20:30",
    wifiInfo: "Available throughout, password provided on arrival.",
    rules: [
      { title: "Room Sharing", description: "Rooms shared with college classmates (2-3 per room)." },
      { title: "Cleaning", description: "Students are responsible for keeping rooms tidy — inspections may occur." },
      { title: "Behaviour", description: "Respect for other residents, no loud noise after 22:00." },
      { title: "Laundry", description: "Available on-site (bring your own detergent pods)." }
    ]
  },
  safety: {
    contacts: [
      { name: "European Emergency", number: "112", role: "Emergency", type: "emergency" },
      { name: "Trip Leader (Staff)", number: "+44 7700 900123", role: "Staff", type: "staff" },
      { name: "Hospital / Residencia", number: "+34 955 123 456", role: "Medical", type: "medical" }
    ],
    healthTips: [
      "Drink 2L water daily (it will be 35°C+)",
      "Wear sunscreen SPF50+",
      "Rest during afternoon heat (14:00–17:00 is hottest)"
    ],
    pickpocketWarnings: [
      "Keep valuables in hotel safe",
      "Don't flash phones in busy areas (Seville market, bus stations)",
      "Beware of 'friendship bracelets' from strangers",
      "Do not give money to anyone on the street"
    ],
    emergencyProcedure: "1. Stay calm\n2. Call 112 if life-threatening\n3. Call Trip Leader immediately\n4. Wait at agreed meeting point",
    curfewWarning: "All students must check in with a staff member by 09:30 each morning."
  },
  itinerary: [
    { id: "w1-1", date: "Mon 14 Jul", dayLabel: "Travel Day", title: "Travel Day", description: "Depart Leicester, arrive Lebrija, settle in.", type: "travel", iconKey: "Plane", isActive: true, colorKey: "sky" },
    { id: "w1-2", date: "Tue 15 Jul", dayLabel: "Orientation", title: "Orientation", description: "Meet placement supervisors, Spanish lesson (10:00).", type: "special", iconKey: "Flag" },
    { id: "w1-3", date: "Wed 16 Jul", dayLabel: "Work", title: "Work Placement & Lesson", description: "Work placement (09:00–13:00), afternoon free, Spanish lesson (16:00).", type: "placement", iconKey: "Calendar" },
    { id: "w1-4", date: "Thu 17 Jul", dayLabel: "Work", title: "Work & Culture", description: "Work placement (09:00–13:00), cultural activity (afternoon).", type: "placement", iconKey: "Calendar" },
    { id: "w1-5", date: "Fri 18 Jul", dayLabel: "Work", title: "Work & Group Dinner", description: "Work placement (09:00–13:00), group dinner (20:00).", type: "placement", iconKey: "Utensils", colorKey: "purple" },
    { id: "w1-6", date: "Sat 19 Jul", dayLabel: "Trip", title: "Day Trip", description: "Day trip to Cadiz & beach.", type: "cultural", iconKey: "MapPin", colorKey: "cyan" },
    { id: "w1-7", date: "Sun 20 Jul", dayLabel: "Rest", title: "Rest Day", description: "Rest day / optional football / paddle tennis.", type: "leisure", iconKey: "Coffee" },
    { id: "w2-1", date: "Mon 21 Jul", dayLabel: "Work", title: "Work & Reflection", description: "Work placement (09:00–13:00), reflective diary session.", type: "placement", iconKey: "Calendar" },
    { id: "w2-2", date: "Tue 22 Jul", dayLabel: "Work", title: "Cooking Class", description: "Work placement, enrichment: Spanish cooking class.", type: "placement", iconKey: "Utensils", colorKey: "orange" },
    { id: "w2-3", date: "Wed 23 Jul", dayLabel: "Work", title: "Seville Trip", description: "Work placement, Seville city trip (afternoon).", type: "placement", iconKey: "MapPin", colorKey: "amber" },
    { id: "w2-4", date: "Thu 24 Jul", dayLabel: "Work", title: "Work & Free Time", description: "Work placement, free afternoon in Lebrija.", type: "placement", iconKey: "Calendar" },
    { id: "w2-5", date: "Fri 25 Jul", dayLabel: "Work", title: "Final Placement Day", description: "Final placement day, farewell activity.", type: "placement", iconKey: "Flag" },
    { id: "w2-6", date: "Sat 26 Jul", dayLabel: "Free", title: "Free Day", description: "Free day / shopping / relaxation.", type: "leisure", iconKey: "Coffee" },
    { id: "w2-7", date: "Sun 27 Jul", dayLabel: "Farewell", title: "Farewell", description: "Packing, farewell dinner, early night.", type: "special", iconKey: "Utensils", colorKey: "purple" },
    { id: "w2-8", date: "Mon 28 Jul", dayLabel: "Travel Day", title: "Departure", description: "Depart Lebrija → Seville airport → Fly home.", type: "travel", iconKey: "Plane" }
  ],
  culture: {
    overview: "Spanish (Castellano)\n~47 Million\nEuro (€)\nCET (1 hr ahead of UK)",
    lebrijaInfo: "A small town in Andalucia, Seville province. Population ~27,000. Famous for flamenco, sherry wine production, and Roman ruins. Very traditional and community-oriented.",
    climate: "Hot semi-arid. July averages 38°C. Nights around 22°C. Very little rain.",
    etiquetteTips: ["Siesta is real (shops close 14:00–17:00).", "Family is central.", "Greet with 'Hola'.", "Dress modestly at work."],
    phrases: [
      { es: "Hola", en: "Hello", pron: "OH-lah" },
      { es: "Gracias", en: "Thank you", pron: "GRAH-thee-ahs" },
      { es: "Adiós", en: "Goodbye", pron: "ah-DYOS" },
      { es: "Por favor", en: "Please", pron: "por fah-VOR" },
      { es: "¿Cuánto cuesta?", en: "How much?", pron: "KWAN-to KWES-tah" },
      { es: "¿Puede ayudarme?", en: "Can you help me?", pron: "PWEH-deh ah-yoo-DAR-meh" },
      { es: "No entiendo", en: "I don't understand", pron: "no en-TYEN-doh" },
      { es: "¿Habla inglés?", en: "Do you speak English?", pron: "AH-blah een-GLES" },
      { es: "¿Dónde está el baño?", en: "Where is the bathroom?", pron: "DON-deh es-TAH el BAHN-yo" },
      { es: "Me llamo...", en: "My name is...", pron: "meh YAH-moh" },
      { es: "Lo siento", en: "I'm sorry", pron: "loh SYEN-toh" },
      { es: "¿Dónde está...?", en: "Where is...?", pron: "DON-deh es-TAH" },
      { es: "Buenos días", en: "Good morning", pron: "BWEH-nos DEE-ahs" },
      { es: "Buenas noches", en: "Good night", pron: "BWEH-nahs NO-chesh" },
      { es: "¿Hablas inglés?", en: "Do you speak English?", pron: "AH-blahs een-GLES" },
    ],
    facts: [],
    foodGuide: "Jamón, gazpacho, churros, tapas. Dinner is late (21:00+). Breakfast is light."
  },
  faq: [
    { id: "1", category: "Luggage", question: "Luggage", answer: "Max hold bag 20kg, cabin 55x40x20cm. No liquids over 100ml in cabin bag. Leave valuables at home." },
    { id: "2", category: "Food", question: "Food", answer: "All meals included at the residencia. Inform staff of allergies before departure. Local food is delicious — be open minded." },
    { id: "3", category: "Accommodation", question: "Accommodation", answer: "Shared rooms. No guests allowed. Towels are provided but bring a beach towel." },
    { id: "4", category: "Safety", question: "Safety", answer: "Keep emergency numbers saved. Share location with parents. Travel in groups after dark." },
    { id: "5", category: "Money", question: "Money", answer: "Bring €150–€200 spending money. Card payments accepted in most places. Inform your bank before travel so they don't block your card." },
    { id: "6", category: "Transport", question: "Transport", answer: "All major trips are organised. Do not arrange private transport without informing staff." },
    { id: "7", category: "Work Placement", question: "Work Placement", answer: "Smart casual dress unless uniform is provided. Be punctual. No phones during placement hours." },
    { id: "8", category: "Curfews", question: "Curfews", answer: "Weekdays 22:00, weekends 23:00. Missing curfew = parents and college contacted immediately." },
    { id: "9", category: "Internet/WiFi", question: "Internet/WiFi", answer: "Free WiFi at residencia. Data roaming costs money — buy a travel SIM or use WiFi calling when out and about." },
    { id: "10", category: "Emergency", question: "Emergency situations", answer: "Call 112 (EU emergency), then Mr Smith. Do not panic. Stay together." }
  ],
  registration: {
    confirmationText: "I confirm that I have read and understood the International Work Experience guidance and agree to follow all rules and expectations set by Leicester College and the host organisation.",
    successHeadline: "Welcome to Spain!",
    successMessage: "You are officially registered for the Leicester College International Work Experience."
  },
  evaluation: {
    activities: ["Work placement", "Seville Trip", "Cadiz Trip", "Cooking Class"]
  }
};

const API_BASE = "/api";

export function usePortalContent() {
  const [stored, setStored] = useLocalStorage<Partial<PortalContent>>("portal-cms-content", {});
  const storedRef = useRef(stored);
  storedRef.current = stored;

  useEffect(() => {
    const sync = async () => {
      try {
        const res = await fetch(`${API_BASE}/content`);
        if (res.ok) {
          const data = await res.json() as { content: Partial<PortalContent> | null };
          if (data.content && Object.keys(data.content).length > 0) {
            setStored(data.content);
          }
        }
      } catch {
        // Offline — use localStorage cache
      }
    };
    sync();
    const t = setInterval(sync, 30_000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content: PortalContent = {
    ...DEFAULT_CONTENT,
    ...stored,
    meta: { ...DEFAULT_CONTENT.meta, ...(stored.meta || {}) },
    homepage: { ...DEFAULT_CONTENT.homepage, ...(stored.homepage || {}) },
    flights: { ...DEFAULT_CONTENT.flights, ...(stored.flights || {}) },
    transport: { ...DEFAULT_CONTENT.transport, ...(stored.transport || {}) },
    accommodation: { ...DEFAULT_CONTENT.accommodation, ...(stored.accommodation || {}) },
    safety: { ...DEFAULT_CONTENT.safety, ...(stored.safety || {}) },
    culture: { ...DEFAULT_CONTENT.culture, ...(stored.culture || {}) },
    registration: { ...DEFAULT_CONTENT.registration, ...(stored.registration || {}) },
    evaluation: { ...DEFAULT_CONTENT.evaluation, ...(stored.evaluation || {}) }
  };

  const pushToServer = (next: Partial<PortalContent>) => {
    fetch(`${API_BASE}/content`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: next }),
    }).catch(() => {/* will retry on next poll */});
  };

  const updateContent = (section: keyof PortalContent, value: unknown) => {
    const next = { ...storedRef.current, [section]: value };
    setStored(next);
    pushToServer(next);
  };

  const resetSection = (section: keyof PortalContent) => {
    const next = { ...storedRef.current };
    delete next[section as keyof typeof next];
    setStored(next);
    pushToServer(next);
  };

  const setAllContent = (value: Partial<PortalContent>) => {
    setStored(value);
    pushToServer(value);
  };

  return { content, updateContent, resetSection, setStored: setAllContent };
}
