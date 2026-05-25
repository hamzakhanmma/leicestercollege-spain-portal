import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Map, ThermometerSun, Utensils, Users, CheckCircle2, XCircle, Volume2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
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
];

const quizQuestions = [
  {
    q: "What time do shops typically close for 'siesta'?",
    options: ["12:00 - 13:00", "14:00 - 17:00", "16:00 - 18:00"],
    answer: 1,
  },
  {
    q: "What is the typical time to eat dinner in Spain?",
    options: ["18:00", "19:30", "21:00 or later"],
    answer: 2,
  },
  {
    q: "Which of these is a famous cold tomato soup from Andalucia?",
    options: ["Gazpacho", "Paella", "Churros"],
    answer: 0,
  }
];

function FlipCard({ es, en, pron }: { es: string; en: string; pron: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-32 w-full cursor-pointer perspective-[1000px] group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="absolute inset-0 backface-hidden bg-card/60 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center p-4 text-center shadow-lg group-hover:border-primary/30 transition-colors">
          <span className="font-black text-2xl text-primary drop-shadow-[0_0_10px_rgba(0,169,206,0.3)]">{en}</span>
        </div>
        <div className="absolute inset-0 backface-hidden bg-primary/20 border border-primary/30 rounded-xl flex flex-col items-center justify-center p-4 text-center shadow-[0_0_20px_rgba(0,169,206,0.2)] rotate-y-180">
          <span className="font-black text-2xl text-foreground mb-1">{es}</span>
          <span className="text-xs font-mono text-primary/80 flex items-center gap-1"><Volume2 className="h-3 w-3"/> {pron}</span>
        </div>
      </motion.div>
    </div>
  );
}

function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      if (index === quizQuestions[currentQ].answer) {
        setScore(s => s + 1);
      }
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const reset = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
  };

  if (showResult) {
    return (
      <div className="text-center py-10">
        <h3 className="text-3xl font-black mb-3">Quiz Complete!</h3>
        <p className="text-xl text-muted-foreground mb-8">You scored <strong className="text-primary">{score}</strong> out of {quizQuestions.length}</p>
        <button 
          onClick={reset}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition shadow-[0_0_20px_rgba(0,169,206,0.4)]"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = quizQuestions[currentQ];

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-8 text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-white/5 pb-4">
        <span>Question {currentQ + 1} of {quizQuestions.length}</span>
        <span className="text-primary">Score: {score}</span>
      </div>
      <h3 className="text-2xl font-bold mb-8 leading-snug">{q.q}</h3>
      <div className="space-y-4">
        {q.options.map((opt, i) => {
          let btnClass = "bg-white/5 hover:bg-white/10 border-white/10";
          if (selected !== null) {
            if (i === q.answer) btnClass = "bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
            else if (i === selected) btnClass = "bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
            else btnClass = "bg-white/5 opacity-40 border-white/5";
          }

          return (
            <button
              key={i}
              onClick={() => selected === null && handleAnswer(i)}
              className={`w-full text-left p-5 text-lg font-medium rounded-xl border transition-all flex justify-between items-center ${btnClass}`}
            >
              <span>{opt}</span>
              {selected !== null && i === q.answer && <CheckCircle2 className="h-6 w-6 text-green-400" />}
              {selected !== null && i === selected && i !== q.answer && <XCircle className="h-6 w-6 text-red-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Culture() {
  return (
    <AnimatedPage className="space-y-10">
      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/60 via-orange-900/30 to-primary/10 flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-50">
           {/* SVG Spanish Skyline Silhouette Placeholder */}
           <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[60%]">
             <path d="M0,300 L0,200 L50,200 L50,150 L100,150 L100,220 L150,220 L150,180 L200,180 L200,250 L250,250 L250,120 L300,120 L300,200 L350,200 L350,160 L400,160 L400,220 L450,220 L450,140 L500,140 L500,250 L550,250 L550,190 L600,190 L600,210 L650,210 L650,150 L700,150 L700,230 L750,230 L750,170 L800,170 L800,200 L850,200 L850,130 L900,130 L900,240 L950,240 L950,180 L1000,180 L1000,300 Z" fill="hsl(var(--background))" />
             <circle cx="850" cy="100" r="40" fill="rgba(251, 146, 60, 0.4)" className="animate-pulse" />
           </svg>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-amber-100 drop-shadow-lg">Cultural Guide</h1>
          <p className="text-xl text-amber-200/80 font-medium max-w-2xl mx-auto">Immerse yourself in the rhythms, flavors, and traditions of Andalucia.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="relative overflow-hidden group">
           {/* Spain Geography Visual Placeholder */}
           <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
                 <path d="M20,10 L80,10 L90,40 L80,90 L40,90 L10,60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                 <circle cx="45" cy="75" r="4" fill="hsl(197, 100%, 60%)" className="animate-pulse" />
              </svg>
           </div>
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Map className="h-6 w-6 text-primary" /> Spain Overview
          </h2>
          <ul className="space-y-4 text-lg text-muted-foreground/90 font-medium">
            <li className="flex justify-between items-center"><strong className="text-foreground">Language:</strong> <span>Spanish (Castellano)</span></li>
            <li className="flex justify-between items-center"><strong className="text-foreground">Population:</strong> <span>~47 Million</span></li>
            <li className="flex justify-between items-center"><strong className="text-foreground">Currency:</strong> <span>Euro (€)</span></li>
            <li className="flex justify-between items-center"><strong className="text-foreground">Timezone:</strong> <span>CET (1 hr ahead of UK)</span></li>
          </ul>
        </GlassCard>
        
        <GlassCard className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <Map className="h-6 w-6 text-primary" /> About Lebrija
          </h2>
          <p className="text-lg text-muted-foreground/90 leading-relaxed font-medium">
            A small town in Andalucia, Seville province. Population ~27,000. Famous for flamenco, sherry wine production, and Roman ruins. Very traditional and community-oriented.
          </p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <GlassCard className="h-full">
            <div className="h-14 w-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <ThermometerSun className="h-7 w-7" />
            </div>
            <h3 className="font-bold text-xl mb-3">Climate</h3>
            <p className="text-base text-muted-foreground/90 font-medium leading-relaxed">Hot semi-arid. July averages 38°C. Nights around 22°C. Very little rain.</p>
          </GlassCard>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <GlassCard className="h-full">
            <div className="h-14 w-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="font-bold text-xl mb-3">Culture & Etiquette</h3>
            <p className="text-base text-muted-foreground/90 font-medium leading-relaxed">Siesta is real (shops close 14:00–17:00). Family is central. Greet with "Hola", dress modestly at work.</p>
          </GlassCard>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <GlassCard className="h-full">
            <div className="h-14 w-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <Utensils className="h-7 w-7" />
            </div>
            <h3 className="font-bold text-xl mb-3">Food</h3>
            <p className="text-base text-muted-foreground/90 font-medium leading-relaxed">Jamón, gazpacho, churros, tapas. Dinner is late (21:00+). Breakfast is light.</p>
          </GlassCard>
        </motion.div>
      </div>

      <GlassCard className="bg-primary/5 border-primary/20 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2 tracking-tight">Essential Phrases</h2>
          <p className="text-lg text-primary font-medium">Click a card to reveal the translation & pronunciation.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {phrases.map((p, i) => (
            <FlipCard key={i} es={p.es} en={p.en} pron={p.pron} />
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-3xl font-black mb-2 tracking-tight">Culture Quiz</h2>
        <p className="text-lg text-muted-foreground mb-8 border-b border-white/5 pb-6">Test your knowledge of Spanish customs.</p>
        <div className="max-w-3xl mx-auto">
          <Quiz />
        </div>
      </GlassCard>
    </AnimatedPage>
  );
}