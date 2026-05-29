import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import { StaffAuthGuard } from "@/components/StaffAuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { usePortalContent } from "@/lib/portal-content";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, Megaphone, Globe, Settings, Plane, Shield,
  HelpCircle, CalendarDays, Home, Map, Plus, Trash2, Save,
  RefreshCw, Crown, BarChart3
} from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "homepage", label: "Homepage", icon: Globe },
  { id: "trip", label: "Trip Settings", icon: Settings },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "safety", label: "Safety", icon: Shield },
  { id: "faq", label: "FAQs", icon: HelpCircle },
  { id: "itinerary", label: "Itinerary", icon: CalendarDays },
  { id: "accommodation", label: "Accommodation", icon: Home },
  { id: "cultural", label: "Cultural", icon: Map },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold">
      <Save className="h-4 w-4" /> Save Changes
    </Button>
  );
}

function DashboardTab({ content, setStored }: { content: any; setStored: any }) {
  const { toast } = useToast();
  const handleReset = () => {
    if (window.confirm("Reset ALL content to defaults? This cannot be undone.")) {
      localStorage.removeItem("portal-cms-content");
      setStored({});
      toast({ title: "Reset complete", description: "All content restored to defaults." });
    }
  };
  const stats = [
    { label: "Announcements", value: content.announcements?.length ?? 0, color: "text-primary" },
    { label: "Itinerary Days", value: content.itinerary?.length ?? 0, color: "text-amber-400" },
    { label: "Emergency Contacts", value: content.safety?.contacts?.length ?? 0, color: "text-red-400" },
    { label: "FAQ Items", value: content.faq?.length ?? 0, color: "text-green-400" },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-amber-400" /> Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(s => (
          <GlassCard key={s.label} className="text-center p-4">
            <div className={`text-4xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="border-red-500/20 bg-red-950/10">
        <h3 className="font-bold mb-1 text-red-400">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">Reset all portal content to factory defaults. This cannot be undone.</p>
        <Button variant="destructive" onClick={handleReset} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Reset All Content to Defaults
        </Button>
      </GlassCard>
    </div>
  );
}

function AnnouncementsTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [newText, setNewText] = useState("");
  const add = () => {
    if (!newText.trim()) return;
    updateContent("announcements", [
      { id: Date.now().toString(), text: newText.trim(), date: new Date().toISOString() },
      ...(content.announcements || [])
    ]);
    setNewText("");
    toast({ title: "Announcement posted" });
  };
  const remove = (id: string) => {
    updateContent("announcements", (content.announcements || []).filter((a: any) => a.id !== id));
    toast({ title: "Announcement removed" });
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Announcements</h2>
      <GlassCard className="space-y-3">
        <Textarea placeholder="New announcement text..." value={newText} onChange={e => setNewText(e.target.value)} rows={3} />
        <Button onClick={add} className="gap-2 w-full"><Plus className="h-4 w-4" /> Post Announcement</Button>
      </GlassCard>
      <div className="space-y-3">
        {(content.announcements || []).map((a: any) => (
          <GlassCard key={a.id} className="p-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{a.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(a.date).toLocaleString()}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => remove(a.id)} className="text-destructive h-8 w-8 shrink-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </GlassCard>
        ))}
        {!content.announcements?.length && <p className="text-muted-foreground text-sm italic">No active announcements.</p>}
      </div>
    </div>
  );
}

function HomepageTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.homepage);
  useEffect(() => { setForm(content.homepage); }, [JSON.stringify(content.homepage)]);
  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = () => { updateContent("homepage", form); toast({ title: "Homepage updated" }); };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Homepage Editor</h2>
      <GlassCard className="space-y-4">
        <h3 className="font-semibold text-lg border-b border-white/10 pb-2">Hero Section</h3>
        <Field label="Hero Title"><Input value={form.heroTitle} onChange={e => set("heroTitle", e.target.value)} /></Field>
        <Field label="Hero Subtitle"><Input value={form.heroSubtitle} onChange={e => set("heroSubtitle", e.target.value)} /></Field>
      </GlassCard>
      <GlassCard className="space-y-4">
        <h3 className="font-semibold text-lg border-b border-white/10 pb-2">Weather Widget</h3>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Temp (°C)"><Input value={form.weatherTemp} onChange={e => set("weatherTemp", e.target.value)} /></Field>
          <Field label="Condition"><Input value={form.weatherCondition} onChange={e => set("weatherCondition", e.target.value)} /></Field>
          <Field label="Location"><Input value={form.weatherLocation} onChange={e => set("weatherLocation", e.target.value)} /></Field>
        </div>
      </GlassCard>
      <GlassCard className="space-y-4">
        <h3 className="font-semibold text-lg border-b border-white/10 pb-2">Next Activity Widget</h3>
        <Field label="Activity Title"><Input value={form.nextActivityTitle} onChange={e => set("nextActivityTitle", e.target.value)} /></Field>
        <Field label="Date & Time"><Input value={form.nextActivityDate} onChange={e => set("nextActivityDate", e.target.value)} /></Field>
        <Field label="Location"><Input value={form.nextActivityLocation} onChange={e => set("nextActivityLocation", e.target.value)} /></Field>
      </GlassCard>
      <SaveBtn onClick={save} />
    </div>
  );
}

function TripSettingsTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.meta);
  useEffect(() => { setForm(content.meta); }, [JSON.stringify(content.meta)]);
  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = () => { updateContent("meta", form); toast({ title: "Trip settings updated" }); };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trip Settings</h2>
      <GlassCard className="space-y-4">
        <Field label="Trip Name"><Input value={form.tripName} onChange={e => set("tripName", e.target.value)} /></Field>
        <Field label="Countdown Date & Time (Departure)">
          <Input type="datetime-local" value={form.countdownDate?.slice(0, 16)} onChange={e => set("countdownDate", e.target.value + ":00")} />
        </Field>
        <Field label="Departure Details"><Input value={form.departureDetails} onChange={e => set("departureDetails", e.target.value)} /></Field>
      </GlassCard>
      <GlassCard className="space-y-4">
        <h3 className="font-semibold border-b border-white/10 pb-2 text-foreground">Year Settings</h3>
        <p className="text-xs text-muted-foreground">Changing the year updates it automatically everywhere across the portal.</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Trip Year (e.g. 2025)">
            <Input value={form.tripYear || ""} onChange={e => set("tripYear", e.target.value)} placeholder="2025" />
          </Field>
          <Field label="Academic Year (e.g. 2024/25)">
            <Input value={form.academicYear || ""} onChange={e => set("academicYear", e.target.value)} placeholder="2024/25" />
          </Field>
        </div>
      </GlassCard>
      <SaveBtn onClick={save} />
    </div>
  );
}

function FlightsTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.flights);
  useEffect(() => { setForm(content.flights); }, [JSON.stringify(content.flights)]);
  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = () => { updateContent("flights", form); toast({ title: "Flight info updated" }); };
  const updateCheck = (i: number, v: string) => setForm((f: any) => ({ ...f, checklist: f.checklist.map((c: string, idx: number) => idx === i ? v : c) }));
  const addCheck = () => setForm((f: any) => ({ ...f, checklist: [...f.checklist, ""] }));
  const removeCheck = (i: number) => setForm((f: any) => ({ ...f, checklist: f.checklist.filter((_: string, idx: number) => idx !== i) }));
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Flight Information</h2>
      <GlassCard className="space-y-4">
        <h3 className="font-semibold border-b border-white/10 pb-2">Outbound Flight</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Flight Number"><Input value={form.outboundFlight} onChange={e => set("outboundFlight", e.target.value)} /></Field>
          <Field label="Airline"><Input value={form.airline} onChange={e => set("airline", e.target.value)} /></Field>
          <Field label="Date"><Input value={form.outboundDate} onChange={e => set("outboundDate", e.target.value)} /></Field>
          <Field label="Departure Time"><Input value={form.outboundTime} onChange={e => set("outboundTime", e.target.value)} /></Field>
        </div>
      </GlassCard>
      <GlassCard className="space-y-4">
        <h3 className="font-semibold border-b border-white/10 pb-2">Return Flight</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Flight Number"><Input value={form.returnFlight} onChange={e => set("returnFlight", e.target.value)} /></Field>
          <Field label="Date"><Input value={form.returnDate} onChange={e => set("returnDate", e.target.value)} /></Field>
          <Field label="Return Time"><Input value={form.returnTime} onChange={e => set("returnTime", e.target.value)} /></Field>
        </div>
      </GlassCard>
      <GlassCard className="space-y-4">
        <h3 className="font-semibold border-b border-white/10 pb-2">Meeting & Logistics</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Meeting Time"><Input value={form.meetingTime} onChange={e => set("meetingTime", e.target.value)} /></Field>
          <Field label="Meeting Place"><Input value={form.meetingPlace} onChange={e => set("meetingPlace", e.target.value)} /></Field>
          <Field label="Hold Bag Max"><Input value={form.holdBagMax} onChange={e => set("holdBagMax", e.target.value)} /></Field>
          <Field label="Cabin Dimensions"><Input value={form.cabinDimensions} onChange={e => set("cabinDimensions", e.target.value)} /></Field>
        </div>
      </GlassCard>
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
          <h3 className="font-semibold">Packing Checklist</h3>
          <Button size="sm" variant="outline" onClick={addCheck} className="gap-1"><Plus className="h-3 w-3" />Add Item</Button>
        </div>
        {form.checklist?.map((item: string, i: number) => (
          <div key={i} className="flex gap-2">
            <Input value={item} onChange={e => updateCheck(i, e.target.value)} />
            <Button size="icon" variant="ghost" onClick={() => removeCheck(i)} className="text-destructive shrink-0"><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </GlassCard>
      <SaveBtn onClick={save} />
    </div>
  );
}

function SafetyTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.safety);
  useEffect(() => { setForm(content.safety); }, [JSON.stringify(content.safety)]);
  const save = () => { updateContent("safety", form); toast({ title: "Safety info updated" }); };
  const updateContact = (i: number, k: string, v: string) => setForm((f: any) => ({ ...f, contacts: f.contacts.map((c: any, idx: number) => idx === i ? { ...c, [k]: v } : c) }));
  const addContact = () => setForm((f: any) => ({ ...f, contacts: [...f.contacts, { name: "", number: "", role: "", type: "staff" }] }));
  const removeContact = (i: number) => setForm((f: any) => ({ ...f, contacts: f.contacts.filter((_: any, idx: number) => idx !== i) }));
  const updateTip = (field: string, i: number, v: string) => setForm((f: any) => ({ ...f, [field]: f[field].map((t: string, idx: number) => idx === i ? v : t) }));
  const addTip = (field: string) => setForm((f: any) => ({ ...f, [field]: [...(f[field] || []), ""] }));
  const removeTip = (field: string, i: number) => setForm((f: any) => ({ ...f, [field]: f[field].filter((_: string, idx: number) => idx !== i) }));
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Safety Information</h2>
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-semibold">Emergency Contacts</h3>
          <Button size="sm" variant="outline" onClick={addContact} className="gap-1"><Plus className="h-3 w-3" />Add</Button>
        </div>
        {form.contacts?.map((c: any, i: number) => (
          <div key={i} className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-card/50 border border-white/5">
            <Field label="Name"><Input value={c.name} onChange={e => updateContact(i, "name", e.target.value)} /></Field>
            <Field label="Phone Number"><Input value={c.number} onChange={e => updateContact(i, "number", e.target.value)} /></Field>
            <Field label="Role"><Input value={c.role} onChange={e => updateContact(i, "role", e.target.value)} /></Field>
            <Field label="Type">
              <select value={c.type} onChange={e => updateContact(i, "type", e.target.value)} className="w-full h-9 px-3 bg-background border border-input rounded-md text-sm text-foreground">
                <option value="emergency">Emergency</option>
                <option value="staff">Staff</option>
                <option value="medical">Medical</option>
                <option value="consulate">Consulate</option>
              </select>
            </Field>
            <div className="col-span-2 flex justify-end">
              <Button size="sm" variant="ghost" onClick={() => removeContact(i)} className="text-destructive gap-1"><Trash2 className="h-3 w-3" />Remove</Button>
            </div>
          </div>
        ))}
      </GlassCard>
      <GlassCard className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-semibold">Health Tips</h3>
          <Button size="sm" variant="outline" onClick={() => addTip("healthTips")} className="gap-1"><Plus className="h-3 w-3" />Add</Button>
        </div>
        {form.healthTips?.map((t: string, i: number) => (
          <div key={i} className="flex gap-2">
            <Input value={t} onChange={e => updateTip("healthTips", i, e.target.value)} />
            <Button size="icon" variant="ghost" onClick={() => removeTip("healthTips", i)} className="text-destructive shrink-0"><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </GlassCard>
      <GlassCard className="space-y-3">
        <Field label="Emergency Procedure">
          <Textarea value={form.emergencyProcedure} onChange={e => setForm((f: any) => ({ ...f, emergencyProcedure: e.target.value }))} rows={4} />
        </Field>
        <Field label="Curfew Warning">
          <Textarea value={form.curfewWarning} onChange={e => setForm((f: any) => ({ ...f, curfewWarning: e.target.value }))} rows={2} />
        </Field>
      </GlassCard>
      <SaveBtn onClick={save} />
    </div>
  );
}

function FAQTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.faq);
  useEffect(() => { setForm(content.faq); }, [JSON.stringify(content.faq)]);
  const save = () => { updateContent("faq", form); toast({ title: "FAQ updated" }); };
  const update = (i: number, k: string, v: string) => setForm((f: any) => f.map((q: any, idx: number) => idx === i ? { ...q, [k]: v } : q));
  const add = () => setForm((f: any) => [...f, { id: Date.now().toString(), category: "General", question: "New Question", answer: "" }]);
  const remove = (i: number) => setForm((f: any) => f.filter((_: any, idx: number) => idx !== i));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">FAQ Editor</h2>
        <Button size="sm" variant="outline" onClick={add} className="gap-1"><Plus className="h-3 w-3" />Add FAQ</Button>
      </div>
      {form?.map((q: any, i: number) => (
        <GlassCard key={q.id || i} className="space-y-3 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category"><Input value={q.category} onChange={e => update(i, "category", e.target.value)} /></Field>
            <Field label="Question / Title"><Input value={q.question} onChange={e => update(i, "question", e.target.value)} /></Field>
          </div>
          <Field label="Answer"><Textarea value={q.answer} onChange={e => update(i, "answer", e.target.value)} rows={2} /></Field>
          <div className="flex justify-end">
            <Button size="sm" variant="ghost" onClick={() => remove(i)} className="text-destructive gap-1"><Trash2 className="h-3 w-3" />Remove</Button>
          </div>
        </GlassCard>
      ))}
      <SaveBtn onClick={save} />
    </div>
  );
}

function ItineraryTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.itinerary);
  useEffect(() => { setForm(content.itinerary); }, [JSON.stringify(content.itinerary)]);
  const save = () => { updateContent("itinerary", form); toast({ title: "Itinerary updated" }); };
  const update = (i: number, k: string, v: string) => setForm((f: any) => f.map((d: any, idx: number) => idx === i ? { ...d, [k]: v } : d));
  const add = () => setForm((f: any) => [...f, { id: Date.now().toString(), date: "", dayLabel: "", title: "New Day", description: "", type: "placement" }]);
  const remove = (i: number) => setForm((f: any) => f.filter((_: any, idx: number) => idx !== i));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Itinerary Editor</h2>
        <Button size="sm" variant="outline" onClick={add} className="gap-1"><Plus className="h-3 w-3" />Add Day</Button>
      </div>
      {form?.map((day: any, i: number) => (
        <GlassCard key={day.id || i} className="space-y-3 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date (e.g. Mon 14 Jul)"><Input value={day.date} onChange={e => update(i, "date", e.target.value)} /></Field>
            <Field label="Day Label"><Input value={day.dayLabel} onChange={e => update(i, "dayLabel", e.target.value)} /></Field>
            <Field label="Title"><Input value={day.title} onChange={e => update(i, "title", e.target.value)} /></Field>
            <Field label="Type">
              <select value={day.type} onChange={e => update(i, "type", e.target.value)} className="w-full h-9 px-3 bg-background border border-input rounded-md text-sm text-foreground">
                <option value="travel">Travel</option>
                <option value="placement">Placement</option>
                <option value="cultural">Cultural</option>
                <option value="leisure">Leisure</option>
                <option value="special">Special</option>
              </select>
            </Field>
          </div>
          <Field label="Description"><Textarea value={day.description} onChange={e => update(i, "description", e.target.value)} rows={2} /></Field>
          <div className="flex justify-end">
            <Button size="sm" variant="ghost" onClick={() => remove(i)} className="text-destructive gap-1"><Trash2 className="h-3 w-3" />Remove</Button>
          </div>
        </GlassCard>
      ))}
      <SaveBtn onClick={save} />
    </div>
  );
}

function AccommodationTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.accommodation);
  useEffect(() => { setForm(content.accommodation); }, [JSON.stringify(content.accommodation)]);
  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = () => { updateContent("accommodation", form); toast({ title: "Accommodation updated" }); };
  const updateRule = (i: number, k: string, v: string) => setForm((f: any) => ({ ...f, rules: f.rules.map((r: any, idx: number) => idx === i ? { ...r, [k]: v } : r) }));
  const addRule = () => setForm((f: any) => ({ ...f, rules: [...f.rules, { title: "", description: "" }] }));
  const removeRule = (i: number) => setForm((f: any) => ({ ...f, rules: f.rules.filter((_: any, idx: number) => idx !== i) }));
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Accommodation Editor</h2>
      <GlassCard className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name"><Input value={form.name} onChange={e => set("name", e.target.value)} /></Field>
          <Field label="Address"><Input value={form.address} onChange={e => set("address", e.target.value)} /></Field>
          <Field label="Weekday Curfew"><Input value={form.curfewWeekday} onChange={e => set("curfewWeekday", e.target.value)} /></Field>
          <Field label="Weekend Curfew"><Input value={form.curfewWeekend} onChange={e => set("curfewWeekend", e.target.value)} /></Field>
          <Field label="Breakfast Time"><Input value={form.mealBreakfast} onChange={e => set("mealBreakfast", e.target.value)} /></Field>
          <Field label="Lunch Time"><Input value={form.mealLunch} onChange={e => set("mealLunch", e.target.value)} /></Field>
          <Field label="Dinner Time"><Input value={form.mealDinner} onChange={e => set("mealDinner", e.target.value)} /></Field>
        </div>
        <Field label="WiFi Info"><Input value={form.wifiInfo} onChange={e => set("wifiInfo", e.target.value)} /></Field>
      </GlassCard>
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-semibold">House Rules</h3>
          <Button size="sm" variant="outline" onClick={addRule} className="gap-1"><Plus className="h-3 w-3" />Add Rule</Button>
        </div>
        {form.rules?.map((r: any, i: number) => (
          <div key={i} className="space-y-2 p-3 rounded-xl bg-card/50 border border-white/5">
            <Field label="Title"><Input value={r.title} onChange={e => updateRule(i, "title", e.target.value)} /></Field>
            <Field label="Description"><Input value={r.description} onChange={e => updateRule(i, "description", e.target.value)} /></Field>
            <div className="flex justify-end">
              <Button size="sm" variant="ghost" onClick={() => removeRule(i)} className="text-destructive gap-1"><Trash2 className="h-3 w-3" />Remove</Button>
            </div>
          </div>
        ))}
      </GlassCard>
      <SaveBtn onClick={save} />
    </div>
  );
}

function CulturalTab({ content, updateContent }: { content: any; updateContent: any }) {
  const { toast } = useToast();
  const [form, setForm] = useState(content.culture);
  useEffect(() => { setForm(content.culture); }, [JSON.stringify(content.culture)]);
  const set = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = () => { updateContent("culture", form); toast({ title: "Cultural guide updated" }); };
  const updatePhrase = (i: number, k: string, v: string) => setForm((f: any) => ({ ...f, phrases: f.phrases.map((p: any, idx: number) => idx === i ? { ...p, [k]: v } : p) }));
  const addPhrase = () => setForm((f: any) => ({ ...f, phrases: [...f.phrases, { es: "", en: "", pron: "" }] }));
  const removePhrase = (i: number) => setForm((f: any) => ({ ...f, phrases: f.phrases.filter((_: any, idx: number) => idx !== i) }));
  const updateTip = (i: number, v: string) => setForm((f: any) => ({ ...f, etiquetteTips: f.etiquetteTips.map((t: string, idx: number) => idx === i ? v : t) }));
  const addTip = () => setForm((f: any) => ({ ...f, etiquetteTips: [...(f.etiquetteTips || []), ""] }));
  const removeTip = (i: number) => setForm((f: any) => ({ ...f, etiquetteTips: f.etiquetteTips.filter((_: string, idx: number) => idx !== i) }));
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cultural Guide Editor</h2>
      <GlassCard className="space-y-4">
        <Field label="Spain Overview"><Textarea value={form.overview} onChange={e => set("overview", e.target.value)} rows={3} /></Field>
        <Field label="Lebrija Information"><Textarea value={form.lebrijaInfo} onChange={e => set("lebrijaInfo", e.target.value)} rows={3} /></Field>
        <Field label="Climate"><Textarea value={form.climate} onChange={e => set("climate", e.target.value)} rows={2} /></Field>
        <Field label="Food Guide"><Textarea value={form.foodGuide} onChange={e => set("foodGuide", e.target.value)} rows={2} /></Field>
      </GlassCard>
      <GlassCard className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-semibold">Etiquette Tips</h3>
          <Button size="sm" variant="outline" onClick={addTip} className="gap-1"><Plus className="h-3 w-3" />Add</Button>
        </div>
        {(form.etiquetteTips || []).map((t: string, i: number) => (
          <div key={i} className="flex gap-2">
            <Input value={t} onChange={e => updateTip(i, e.target.value)} />
            <Button size="icon" variant="ghost" onClick={() => removeTip(i)} className="text-destructive shrink-0"><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </GlassCard>
      <GlassCard className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-semibold">Spanish Phrases</h3>
          <Button size="sm" variant="outline" onClick={addPhrase} className="gap-1"><Plus className="h-3 w-3" />Add Phrase</Button>
        </div>
        {(form.phrases || []).map((p: any, i: number) => (
          <div key={i} className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-card/50 border border-white/5">
            <Field label="Spanish"><Input value={p.es} onChange={e => updatePhrase(i, "es", e.target.value)} /></Field>
            <Field label="English"><Input value={p.en} onChange={e => updatePhrase(i, "en", e.target.value)} /></Field>
            <Field label="Pronunciation"><Input value={p.pron} onChange={e => updatePhrase(i, "pron", e.target.value)} /></Field>
            <div className="col-span-3 flex justify-end">
              <Button size="sm" variant="ghost" onClick={() => removePhrase(i)} className="text-destructive gap-1"><Trash2 className="h-3 w-3" />Remove</Button>
            </div>
          </div>
        ))}
      </GlassCard>
      <SaveBtn onClick={save} />
    </div>
  );
}

function StaffInner() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { content, updateContent, setStored } = usePortalContent();

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab content={content} setStored={setStored} />;
      case "announcements": return <AnnouncementsTab content={content} updateContent={updateContent} />;
      case "homepage": return <HomepageTab content={content} updateContent={updateContent} />;
      case "trip": return <TripSettingsTab content={content} updateContent={updateContent} />;
      case "flights": return <FlightsTab content={content} updateContent={updateContent} />;
      case "safety": return <SafetyTab content={content} updateContent={updateContent} />;
      case "faq": return <FAQTab content={content} updateContent={updateContent} />;
      case "itinerary": return <ItineraryTab content={content} updateContent={updateContent} />;
      case "accommodation": return <AccommodationTab content={content} updateContent={updateContent} />;
      case "cultural": return <CulturalTab content={content} updateContent={updateContent} />;
      default: return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Crown className="h-8 w-8 text-amber-400" /> Staff Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Full portal content management — all changes update the site instantly.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-4">
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-testid={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all text-left w-full ${
                    isActive
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {renderTab()}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default function Staff() {
  return (
    <StaffAuthGuard>
      <StaffInner />
    </StaffAuthGuard>
  );
}
