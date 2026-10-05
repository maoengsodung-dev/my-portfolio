// "use client";

// import { motion } from "framer-motion";

// import { SectionHeading } from "@/components/common/section-heading";
// import { Section } from "@/components/layout/section";
// import { testimonials } from "@/data/testimonials";
// import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import { fadeUp, staggerContainer } from "@/lib/motion";
// import type { Testimonial } from "@/types";

// type MarqueeRowProps = {
//   items: Testimonial[];
//   direction: "left" | "right";
//   duration: number;
// };

// /**
//  * One infinite-scrolling row. The list is duplicated once so the track
//  * can translate exactly -50% before looping back to 0%, creating a
//  * seamless illusion of endless content. Hovering pauses the animation
//  * so testimonials can actually be read.
//  */
// function MarqueeRow({ items, direction, duration }: MarqueeRowProps) {
//   const trackItems = [...items, ...items];

//   return (
//     <div
//       className="flex w-max gap-6 hover:[animation-play-state:paused]"
//       style={{
//         animation: `testimonials-marquee-${direction} ${duration}s linear infinite`,
//       }}
//     >
//       {trackItems.map((testimonial, index) => (
//         <div
//           key={`${testimonial.id}-${index}`}
//           className="w-[320px] shrink-0 sm:w-[380px]"
//         >
//           <TestimonialCard testimonial={testimonial} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export function TestimonialsSection() {
//   const prefersReducedMotion = useMediaQuery(
//     "(prefers-reduced-motion: reduce)",
//   );

//   return (
//     <Section id="testimonials">
//       <SectionHeading
//         eyebrow="Testimonials"
//         title="Trusted by teams who ship"
//         description="A few words from the people I've worked closely with, on product, design, and engineering teams alike."
//       />

//       {prefersReducedMotion ? (
//         <motion.div
//           variants={staggerContainer(0.08)}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-80px" }}
//           className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//         >
//           {testimonials.map((testimonial) => (
//             <motion.div key={testimonial.id} variants={fadeUp}>
//               <TestimonialCard testimonial={testimonial} />
//             </motion.div>
//           ))}
//         </motion.div>
//       ) : (
//         <div className="-mx-4 space-y-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:-mx-6">
//           <style>{`
//             @keyframes testimonials-marquee-left {
//               from { transform: translateX(0); }
//               to { transform: translateX(-50%); }
//             }
//             @keyframes testimonials-marquee-right {
//               from { transform: translateX(-50%); }
//               to { transform: translateX(0); }
//             }
//           `}</style>
//           <MarqueeRow items={testimonials} direction="left" duration={48} />
//           <MarqueeRow items={testimonials} direction="right" duration={54} />
//         </div>
//       )}
//     </Section>
//   );
// }
