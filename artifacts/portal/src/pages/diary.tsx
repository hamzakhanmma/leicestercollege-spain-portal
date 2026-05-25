import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState, useRef } from "react";
import { Trash2, ImageIcon, Plus, Calendar, Smile, X, BookOpen as BookIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

type DiaryEntry = {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  photo?: string | null;
};

const moods = [
  { emoji: "😄", label: "Amazing", color: "border-primary" },
  { emoji: "🙂", label: "Good", color: "border-green-500" },
  { emoji: "😐", label: "Okay", color: "border-yellow-500" },
  { emoji: "😴", label: "Tired", color: "border-orange-500" },
  { emoji: "😢", label: "Homesick", color: "border-red-500" },
];

export default function Diary() {
  const [entries, setEntries] = useLocalStorage<DiaryEntry[]>("portal-diary", []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😄");
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title,
      content,
      mood,
      photo,
    };

    setEntries([newEntry, ...entries]);
    setIsFormOpen(false);
    setTitle("");
    setContent("");
    setMood("😄");
    setPhoto(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this entry?")) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const getMoodColor = (emoji: string) => {
    return moods.find(m => m.emoji === emoji)?.color || "border-primary";
  };

  return (
    <AnimatedPage className="space-y-10 max-w-5xl mx-auto">
      {/* Premium Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/50 via-background to-background border border-indigo-500/20 shadow-xl p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
         <div className="relative w-32 h-32 text-indigo-400 opacity-80 shrink-0">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
             <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
             <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
           </svg>
         </div>
         <div className="flex-1 z-10">
           <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-indigo-100">Reflective Diary</h1>
           <p className="text-xl text-indigo-200/80 font-medium">Document your journey, emotions, and growth.</p>
         </div>
         {!isFormOpen && (
           <Button onClick={() => setIsFormOpen(true)} size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(0,169,206,0.3)] z-10 shrink-0 hover:scale-105 transition-transform">
             <Plus className="h-6 w-6 mr-2" /> New Entry
           </Button>
         )}
      </section>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden"
          >
            <GlassCard className="p-8 md:p-10 space-y-8 bg-card/60 backdrop-blur-xl border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <h2 className="text-3xl font-black tracking-tight">Write Entry</h2>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/10" onClick={() => setIsFormOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Title</label>
                  <Input 
                    placeholder="E.g. First day at placement" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-black/30 h-14 text-xl border-white/10 focus:border-primary/60 focus:shadow-[0_0_20px_rgba(0,169,206,0.15)] transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">How are you feeling?</label>
                  <div className="flex flex-wrap gap-4">
                    {moods.map((m) => (
                      <button
                        key={m.label}
                        onClick={() => setMood(m.emoji)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                          mood === m.emoji 
                            ? "bg-primary/20 border-primary text-foreground scale-110 shadow-[0_0_20px_rgba(0,169,206,0.2)]" 
                            : "bg-black/20 border-white/5 text-muted-foreground hover:bg-black/40 hover:scale-105"
                        }`}
                      >
                        <span className="text-4xl drop-shadow-md">{m.emoji}</span>
                        <span className="text-xs font-bold tracking-wide">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Reflections</label>
                  <Textarea 
                    placeholder="What did you learn today? What surprised you?" 
                    className="min-h-[200px] bg-black/30 text-lg leading-relaxed resize-y border-white/10 focus:border-primary/60 focus:shadow-[0_0_20px_rgba(0,169,206,0.15)] transition-all p-4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Add Photo</label>
                  {photo ? (
                    <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/20 shadow-lg group">
                      <img src={photo} alt="Diary upload" className="w-full h-auto object-cover" />
                      <button 
                        onClick={() => setPhoto(null)}
                        className="absolute top-3 right-3 bg-black/60 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                      />
                      <Button variant="outline" type="button" onClick={() => fileInputRef.current?.click()} className="bg-black/30 border-white/10 h-14 px-6 text-lg hover:bg-white/5">
                        <ImageIcon className="h-5 w-5 mr-3" /> Select Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-8 border-t border-white/10">
                <Button variant="ghost" size="lg" onClick={() => setIsFormOpen(false)} className="text-lg">Cancel</Button>
                <Button size="lg" onClick={handleSave} disabled={!title.trim() || !content.trim()} className="text-lg px-8 shadow-[0_0_20px_rgba(0,169,206,0.3)]">Save Entry</Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {entries.length === 0 ? (
          <div className="text-center py-20 border border-white/10 border-dashed rounded-3xl bg-card/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent"></div>
            <BookIcon className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-muted-foreground relative z-10">No entries yet</h3>
            <p className="text-lg text-muted-foreground/60 mb-8 mt-2 relative z-10">Start documenting your trip, your future self will thank you!</p>
            {!isFormOpen && (
              <Button size="lg" variant="outline" onClick={() => setIsFormOpen(true)} className="rounded-full px-8 relative z-10 border-white/20 bg-black/20 backdrop-blur-md">Write first entry</Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {entries.map((entry) => (
              <GlassCard key={entry.id} className={`p-0 overflow-hidden group border-l-4 ${getMoodColor(entry.mood)}`}>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl bg-black/20 h-16 w-16 flex items-center justify-center rounded-2xl border border-white/5 shadow-inner">
                        {entry.mood}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">{entry.title}</h3>
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(entry.date), "PPP 'at' p")}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(entry.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-10 w-10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="text-foreground/80 text-lg leading-relaxed whitespace-pre-wrap mb-6 font-medium">
                    {entry.content}
                  </div>

                  {entry.photo && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                      <img src={entry.photo} alt={entry.title} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}