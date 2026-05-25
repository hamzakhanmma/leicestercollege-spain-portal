import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { Trash2, Megaphone, Plus, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Staff() {
  const [announcements, setAnnouncements] = useLocalStorage<any[]>("portal-announcements", [
    { id: "1", text: "Departure meeting confirmed for 12 July — Room A14", date: new Date().toISOString() }
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  const handleAdd = () => {
    if (!newAnnouncement.trim()) return;
    setAnnouncements([
      { id: Date.now().toString(), text: newAnnouncement, date: new Date().toISOString() },
      ...announcements
    ]);
    setNewAnnouncement("");
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <AnimatedPage className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Staff Area</h1>
        <p className="text-muted-foreground">Manage portal content (Admin only).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" /> Manage Announcements
          </h2>
          
          <div className="space-y-3">
            <Textarea 
              placeholder="Type new announcement here..." 
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              className="bg-black/20"
            />
            <Button onClick={handleAdd} className="w-full gap-2">
              <Plus className="h-4 w-4" /> Post Announcement
            </Button>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="text-sm font-medium text-muted-foreground">Current Announcements</h3>
            {announcements.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No announcements active.</p>
            )}
            {announcements.map((a) => (
              <div key={a.id} className="p-3 bg-black/20 rounded-lg border border-white/5 flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(a.date).toLocaleString()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)} className="h-8 w-8 text-destructive shrink-0 hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="bg-primary/5 border-primary/20">
            <h3 className="font-bold mb-2">Live Preview: Banner</h3>
            <p className="text-sm text-muted-foreground mb-4">This is what students see at the top of the portal.</p>
            
            <div className="bg-primary/20 border border-primary/30 p-3 rounded-lg flex items-center gap-3">
              <Megaphone className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm text-primary-foreground font-medium truncate">
                {announcements[0]?.text || "No active announcements"}
              </span>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <FileUp className="h-5 w-5 text-primary" /> Upload Documents
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Upload forms, risk assessments, or tickets here.</p>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
              <FileUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Click to browse or drag file here</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, JPG (Max 10MB)</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </AnimatedPage>
  );
}