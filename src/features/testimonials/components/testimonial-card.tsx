// import { Quote } from "lucide-react";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import type { Testimonial } from "@/types";

// type TestimonialCardProps = {
//   testimonial: Testimonial;
// };

// /**
//  * A single testimonial card: quote with a decorative quotation mark,
//  * followed by the author's avatar initials, name, role, and company.
//  * Kept as a plain presentational component so it can be reused both
//  * inside the marquee and the reduced-motion static grid.
//  */
// export function TestimonialCard({ testimonial }: TestimonialCardProps) {
//   return (
//     <div className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-8 text-card-foreground">
//       <Quote className="size-8 text-primary/30" aria-hidden="true" />
//       <p className="mt-4 flex-1 text-pretty text-muted-foreground">
//         “{testimonial.quote}”
//       </p>
//       <div className="mt-6 flex items-center gap-3">
//         <Avatar size="lg">
//           <AvatarFallback>{testimonial.avatar}</AvatarFallback>
//         </Avatar>
//         <div>
//           <p className="text-sm font-medium text-foreground">
//             {testimonial.name}
//           </p>
//           <p className="text-xs text-muted-foreground">
//             {testimonial.role} · {testimonial.company}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
