import { AnimatedPage } from "@/components/AnimatedPage";
import { GlassCard } from "@/components/GlassCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { usePortalContent } from "@/lib/portal-content";

export default function FAQ() {
  const { content } = usePortalContent();
  const faqs = content.faq;

  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <AnimatedPage className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/20 via-background to-background border border-amber-500/10 shadow-2xl p-8 md:p-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.06),transparent_60%)] pointer-events-none" />
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to know before you go.</p>
        </div>
      </section>

      {categories.map(category => {
        const items = faqs.filter(f => f.category === category);
        return (
          <GlassCard key={category}>
            <h2 className="text-lg font-bold mb-4 text-amber-400 uppercase tracking-widest text-sm">{category}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {items.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-white/8 rounded-xl px-4 bg-card/30 hover:bg-card/60 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        );
      })}
    </AnimatedPage>
  );
}
