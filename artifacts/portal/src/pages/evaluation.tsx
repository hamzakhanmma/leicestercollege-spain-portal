import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const activities = [
  "Work Placement", "Seville Trip", "Cadiz Beach", "Spanish Lessons", 
  "Cooking Class", "Football/Paddle", "Free Time", "Group Dinners"
];

export default function Evaluation() {
  const [hasEvaluated, setHasEvaluated] = useLocalStorage("portal-evaluation", false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [workRating, setWorkRating] = useState([5]);
  const [cultureRating, setCultureRating] = useState([5]);
  const [accomRating, setAccommodationRating] = useState([5]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [recommend, setRecommend] = useState<string | null>(null);

  const toggleActivity = (act: string) => {
    if (selectedActivities.includes(act)) {
      setSelectedActivities(prev => prev.filter(a => a !== act));
    } else {
      setSelectedActivities(prev => [...prev, act]);
    }
  };

  const handleSubmit = () => {
    setHasEvaluated(true);
  };

  if (hasEvaluated) {
    return (
      <AnimatedPage className="flex items-center justify-center min-h-[60vh]">
        <GlassCard className="max-w-md w-full text-center p-8 border-primary/30 bg-primary/5">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-muted-foreground">
            Your feedback is invaluable and helps us improve future trips for other students.
          </p>
        </GlassCard>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="max-w-2xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Trip Evaluation</h1>
        <p className="text-muted-foreground">Please honest feedback about your time in Spain.</p>
      </div>

      <GlassCard className="space-y-8 p-8">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium">Overall Trip Rating</h3>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-12 w-12 cursor-pointer transition-all ${
                  star <= (hoveredStar || rating) 
                    ? "fill-yellow-400 text-yellow-400 scale-110 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                    : "text-white/20 hover:text-white/40"
                }`}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Work Placement ({workRating[0]}/10)</label>
            </div>
            <Slider value={workRating} onValueChange={setWorkRating} max={10} step={1} className="py-2" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Cultural Experience ({cultureRating[0]}/10)</label>
            </div>
            <Slider value={cultureRating} onValueChange={setCultureRating} max={10} step={1} className="py-2" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Accommodation ({accomRating[0]}/10)</label>
            </div>
            <Slider value={accomRating} onValueChange={setAccommodationRating} max={10} step={1} className="py-2" />
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-4">
          <label className="text-sm font-medium block">Favourite Activities</label>
          <div className="flex flex-wrap gap-2">
            {activities.map((act) => (
              <button
                key={act}
                onClick={() => toggleActivity(act)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  selectedActivities.includes(act)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-black/20 border-white/10 text-muted-foreground hover:bg-white/5"
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium block">Most valuable learning</label>
          <Textarea className="bg-black/20 resize-y" placeholder="What will you take away from this experience?" />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium block">What could be improved?</label>
          <Textarea className="bg-black/20 resize-y" placeholder="Any suggestions for next year?" />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium block">Would you recommend this trip?</label>
          <div className="flex gap-2">
            {["Yes", "Maybe", "No"].map((opt) => (
              <button
                key={opt}
                onClick={() => setRecommend(opt)}
                className={`flex-1 py-3 rounded-lg border font-medium transition-all ${
                  recommend === opt 
                    ? "bg-primary/20 border-primary text-foreground" 
                    : "bg-black/20 border-white/10 text-muted-foreground hover:bg-white/5"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full h-12 text-lg"
          disabled={!rating || !recommend}
        >
          Submit Evaluation
        </Button>
      </GlassCard>
    </AnimatedPage>
  );
}