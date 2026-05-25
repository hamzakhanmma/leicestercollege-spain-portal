import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState, useRef } from "react";
import { Trash2, ImageIcon, Plus, Calendar, Smile, X } from "lucide-react";
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
  { emoji: "😄", label: "Amazing" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😢", label: "Homesick" },
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

  return (
    <AnimatedPage className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reflective Diary</h1>
          <p className="text-muted-foreground">Document your journey and experiences.</p>
        </div>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Entry
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden"
          >
            <GlassCard className="p-6 space-y-6 bg-card border-primary/20">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h2 className="text-xl font-bold">Write Entry</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Title</label>
                  <Input 
                    placeholder="E.g. First day at placement" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-black/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">How are you feeling?</label>
                  <div className="flex flex-wrap gap-3">
                    {moods.map((m) => (
                      <button
                        key={m.label}
                        onClick={() => setMood(m.emoji)}
                        className={`px-4 py-2 rounded-full border transition-all ${
                          mood === m.emoji 
                            ? "bg-primary/20 border-primary text-foreground scale-105" 
                            : "bg-black/20 border-white/10 text-muted-foreground hover:bg-black/40"
                        }`}
                      >
                        <span className="text-xl mr-2">{m.emoji}</span>
                        <span className="text-sm font-medium">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Reflections</label>
                  <Textarea 
                    placeholder="What did you learn today? What surprised you?" 
                    className="min-h-[150px] bg-black/20 resize-y"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Add Photo</label>
                  {photo ? (
                    <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-white/10 group">
                      <img src={photo} alt="Diary upload" className="w-full h-auto object-cover" />
                      <button 
                        onClick={() => setPhoto(null)}
                        className="absolute top-2 right-2 bg-black/50 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
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
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="bg-black/20 border-white/10">
                        <ImageIcon className="h-4 w-4 mr-2" /> Select Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <Button variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={!title.trim() || !content.trim()}>Save Entry</Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {entries.length === 0 ? (
          <div className="text-center py-12 border border-white/5 border-dashed rounded-xl bg-card/20">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No entries yet</h3>
            <p className="text-sm text-muted-foreground/60 mb-4">Start documenting your trip!</p>
            {!isFormOpen && (
              <Button variant="outline" onClick={() => setIsFormOpen(true)}>Write first entry</Button>
            )}
          </div>
        ) : (
          entries.map((entry) => (
            <GlassCard key={entry.id} className="p-0 overflow-hidden group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl bg-white/5 h-12 w-12 flex items-center justify-center rounded-full border border-white/5">{entry.mood}</span>
                    <div>
                      <h3 className="text-xl font-bold">{entry.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(entry.date), "PPP 'at' p")}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(entry.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap mb-4">
                  {entry.content}
                </div>

                {entry.photo && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-white/5 max-w-md">
                    <img src={entry.photo} alt={entry.title} className="w-full h-auto object-cover" />
                  </div>
                )}
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </AnimatedPage>
  );
}

function BookOpen(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}