import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Map, ThermometerSun, Utensils, Users, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  { es: "Hola", en: "Hello" },
  { es: "Gracias", en: "Thank you" },
  { es: "Adiós", en: "Goodbye" },
  { es: "Por favor", en: "Please" },
  { es: "¿Cuánto cuesta?", en: "How much does it cost?" },
  { es: "¿Puede ayudarme?", en: "Can you help me?" },
  { es: "No entiendo", en: "I don't understand" },
  { es: "¿Habla inglés?", en: "Do you speak English?" },
  { es: "¿Dónde está el baño?", en: "Where is the bathroom?" },
  { es: "Me llamo...", en: "My name is..." },
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

function FlipCard({ es, en }: { es: string; en: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-24 w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="absolute inset-0 backface-hidden bg-card/60 border border-white/10 rounded-xl flex items-center justify-center p-4 text-center shadow-lg">
          <span className="font-bold text-lg text-primary">{es}</span>
        </div>
        <div className="absolute inset-0 backface-hidden bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center p-4 text-center shadow-lg rotate-y-180">
          <span className="font-bold text-lg text-foreground">{en}</span>
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
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-muted-foreground mb-6">You scored {score} out of {quizQuestions.length}</p>
        <button 
          onClick={reset}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = quizQuestions[currentQ];

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6 text-sm text-muted-foreground">
        <span>Question {currentQ + 1} of {quizQuestions.length}</span>
        <span>Score: {score}</span>
      </div>
      <h3 className="text-xl font-bold mb-6">{q.q}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          let btnClass = "bg-white/5 hover:bg-white/10 border-white/10";
          if (selected !== null) {
            if (i === q.answer) btnClass = "bg-green-500/20 border-green-500/50 text-green-400";
            else if (i === selected) btnClass = "bg-red-500/20 border-red-500/50 text-red-400";
            else btnClass = "bg-white/5 opacity-50 border-white/5";
          }

          return (
            <button
              key={i}
              onClick={() => selected === null && handleAnswer(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${btnClass}`}
            >
              <span>{opt}</span>
              {selected !== null && i === q.answer && <CheckCircle2 className="h-5 w-5 text-green-400" />}
              {selected !== null && i === selected && i !== q.answer && <XCircle className="h-5 w-5 text-red-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Culture() {
  return (
    <AnimatedPage className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Cultural Guide</h1>
        <p className="text-muted-foreground">Everything you need to know about Spain and Lebrija.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Map className="h-5 w-5 text-primary" /> Spain Overview
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Language:</strong> Spanish (Castellano)</li>
            <li><strong className="text-foreground">Population:</strong> ~47 Million</li>
            <li><strong className="text-foreground">Currency:</strong> Euro (€)</li>
            <li><strong className="text-foreground">Timezone:</strong> CET (1 hour ahead of UK)</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Map className="h-5 w-5 text-primary" /> About Lebrija
          </h2>
          <p className="text-sm text-muted-foreground">
            A small town in Andalucia, Seville province. Population ~27,000. Famous for flamenco, sherry wine production, and Roman ruins. Very traditional and community-oriented.
          </p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="h-10 w-10 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-4">
            <ThermometerSun className="h-5 w-5" />
          </div>
          <h3 className="font-bold mb-2">Climate</h3>
          <p className="text-sm text-muted-foreground">Hot semi-arid. July averages 38°C. Nights around 22°C. Very little rain.</p>
        </GlassCard>
        
        <GlassCard>
          <div className="h-10 w-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="font-bold mb-2">Culture & Etiquette</h3>
          <p className="text-sm text-muted-foreground">Siesta is real (shops close 14:00–17:00). Family is central. Greet with "Hola", dress modestly at work.</p>
        </GlassCard>
        
        <GlassCard>
          <div className="h-10 w-10 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center mb-4">
            <Utensils className="h-5 w-5" />
          </div>
          <h3 className="font-bold mb-2">Food</h3>
          <p className="text-sm text-muted-foreground">Jamón, gazpacho, churros, tapas. Dinner is late (21:00+). Breakfast is light.</p>
        </GlassCard>
      </div>

      <GlassCard className="bg-primary/5">
        <h2 className="text-xl font-bold mb-2">Essential Phrases</h2>
        <p className="text-sm text-muted-foreground mb-6">Click a card to reveal the translation.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {phrases.map((p, i) => (
            <FlipCard key={i} es={p.es} en={p.en} />
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="text-xl font-bold mb-2">Culture Quiz</h2>
        <p className="text-sm text-muted-foreground mb-4">Test your knowledge of Spanish customs.</p>
        <div className="max-w-2xl mx-auto">
          <Quiz />
        </div>
      </GlassCard>
    </AnimatedPage>
  );
}