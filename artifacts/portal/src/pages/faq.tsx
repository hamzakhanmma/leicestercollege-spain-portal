import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "Luggage",
      a: "Max hold bag 20kg, cabin 55x40x20cm. No liquids over 100ml in cabin bag. Leave valuables at home."
    },
    {
      q: "Food",
      a: "All meals included at the residencia. Inform staff of allergies before departure. Local food is delicious — be open minded."
    },
    {
      q: "Accommodation",
      a: "Shared rooms. No guests allowed. Towels are provided but bring a beach towel."
    },
    {
      q: "Safety",
      a: "Keep emergency numbers saved. Share location with parents. Travel in groups after dark."
    },
    {
      q: "Money",
      a: "Bring €150–€200 spending money. Card payments accepted in most places. Inform your bank before travel so they don't block your card."
    },
    {
      q: "Transport",
      a: "All major trips are organised. Do not arrange private transport without informing staff."
    },
    {
      q: "Work Placement",
      a: "Smart casual dress unless uniform is provided. Be punctual. No phones during placement hours."
    },
    {
      q: "Curfews",
      a: "Weekdays 22:00, weekends 23:00. Missing curfew = parents and college contacted immediately."
    },
    {
      q: "Internet/WiFi",
      a: "Free WiFi at residencia. Data roaming costs money — buy a travel SIM or use WiFi calling when out and about."
    },
    {
      q: "Emergency situations",
      a: "Call 112 (EU emergency), then Mr Smith. Do not panic. Stay together."
    }
  ];

  return (
    <AnimatedPage className="space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Quick answers to common questions about the trip.</p>
      </div>

      <GlassCard className="p-2 sm:p-6 border-white/10">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-white/10">
              <AccordionTrigger className="text-left font-semibold px-4 hover:no-underline hover:text-primary">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                  {faq.q}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 pl-11">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </GlassCard>
    </AnimatedPage>
  );
}