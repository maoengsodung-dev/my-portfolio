import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "flutter-riverpod-vs-getx",
    title: "Flutter State Management: Riverpod vs GetX",
    excerpt:
      "Exploring two popular Flutter state management approaches, including their architecture, dependency management, and practical use cases.",
    date: "2026-10-12",
    readingTime: "7 min read",
    tags: ["Flutter", "Riverpod", "GetX", "State Management"],
    coverImage: "/blog/flutter-riverpod-vs-getx.svg",
    content: [
      "State management is an important part of building maintainable Flutter applications. As an application grows, managing loading states, API responses, user interactions, and shared data becomes more challenging.",
      "Riverpod provides a provider-based approach to managing application state and separating business logic from the UI. It offers tools for handling asynchronous operations, testing providers, and organizing data dependencies.",
      "GetX provides reactive state management, dependency injection, and navigation utilities. Its reactive approach can make it convenient to update widgets when observable values change, particularly when using Obx.",
      "Both approaches can work well in production applications. The right choice depends on project requirements, team preferences, testing strategy, and architectural needs. Consistent organization and clear separation of responsibilities matter more than choosing a library based on popularity alone.",
      "When building an e-commerce application, consider how product lists, cart contents, authentication, and checkout states interact. Choose a state management approach that keeps these features predictable, testable, and easy to maintain.",
    ],
  },
  {
    slug: "integrating-flutter-with-laravel-rest-api",
    title: "Connecting Flutter to a Laravel REST API with Dio",
    excerpt:
      "A practical guide to API integration, Bearer token authentication, JSON responses, error handling, and image uploads in Flutter.",
    date: "2026-09-20",
    readingTime: "8 min read",
    tags: ["Flutter", "Laravel", "REST API", "Dio", "HTTP"],
    coverImage: "/blog/flutter-laravel-api.svg",
    content: [
      "Many mobile applications rely on a backend to retrieve data, authenticate users, and manage business operations. Connecting Flutter to a Laravel REST API creates a clear separation between the mobile interface and backend logic.",
      "Dio is an HTTP client for Dart that supports request configuration, interceptors, timeouts, and multipart form data. A shared Dio client can centralize the API base URL, common headers, and request behavior instead of duplicating configuration across repositories.",
      "For authenticated endpoints, a mobile application can attach a Bearer token to requests when required by the API. Interceptors can help manage headers and logging, but sensitive credentials should never be printed in production logs. The backend must still validate the token and enforce authorization.",
      "API handling should cover more than successful responses. Network failures, expired credentials, validation errors, unexpected response formats, and server errors should be handled explicitly so the UI can show useful feedback to users.",
      "For image uploads, Dio supports MultipartFile and FormData. Make sure the Laravel endpoint validates uploaded files, enforces appropriate size and file-type limits, and returns a consistent response format. Keeping HTTP logic inside a service or repository also makes the application easier to test and maintain.",
    ],
  },
  {
    slug: "designing-mobile-ux-for-emergencies",
    title: "Designing Mobile Experiences for Emergency Situations",
    excerpt:
      "How clear navigation, accessible interfaces, location-based features, and thoughtful user flows can make emergency-support concepts easier to use.",
    date: "2026-07-11",
    readingTime: "6 min read",
    tags: ["UI/UX Design", "Figma", "Accessibility", "Mobile Design"],
    coverImage: "/blog/emergency-mobile-ux.svg",
    content: [
      "Mobile interfaces designed for emergencies need to help users find essential information quickly. Complex navigation, unclear labels, and crowded screens can make important actions harder to identify when users are under stress.",
      "For a hospital finder concept, start by mapping the main user journeys: finding nearby hospitals, viewing contact information, opening directions, and accessing emergency contacts. Organize these journeys around the tasks users need to complete rather than the internal structure of the application.",
      "Visual hierarchy is especially important. Clear action labels, readable typography, consistent spacing, and strong contrast help make information easier to scan. Important actions should be identifiable without relying on color alone, and touch targets should be comfortable to use.",
      "Location features should communicate their limitations clearly. Explain when location permission is needed, provide a useful fallback when permission is denied, and give users a way to select a location manually. Hospital information should also be kept accurate and regularly verified.",
      "Prototyping in Figma can help validate user flows before implementation begins. Test whether users can complete key tasks, understand the available actions, and recover from errors. In emergency-support products, accessibility, clarity, and trustworthy information are essential design considerations.",
    ],
  },
  {
    slug: "designing-mobile-ux-for-emergencies",
    title: "Designing Mobile Experiences for Emergency Situations",
    excerpt:
      "How clear navigation, accessible interfaces, location-based features, and thoughtful user flows can make emergency-support concepts easier to use.",
    date: "2026-07-11",
    readingTime: "6 min read",
    tags: ["UI/UX Design", "Figma", "Accessibility", "Mobile Design"],
    coverImage: "/blog/emergency-mobile-ux.svg",
    content: [
      "Mobile interfaces designed for emergencies need to help users find essential information quickly. Complex navigation, unclear labels, and crowded screens can make important actions harder to identify when users are under stress.",
      "For a hospital finder concept, start by mapping the main user journeys: finding nearby hospitals, viewing contact information, opening directions, and accessing emergency contacts. Organize these journeys around the tasks users need to complete rather than the internal structure of the application.",
      "Visual hierarchy is especially important. Clear action labels, readable typography, consistent spacing, and strong contrast help make information easier to scan. Important actions should be identifiable without relying on color alone, and touch targets should be comfortable to use.",
      "Location features should communicate their limitations clearly. Explain when location permission is needed, provide a useful fallback when permission is denied, and give users a way to select a location manually. Hospital information should also be kept accurate and regularly verified.",
      "Prototyping in Figma can help validate user flows before implementation begins. Test whether users can complete key tasks, understand the available actions, and recover from errors. In emergency-support products, accessibility, clarity, and trustworthy information are essential design considerations.",
    ],
  },
  {
    slug: "designing-mobile-ux-for-emergencies",
    title: "Designing Mobile Experiences for Emergency Situations",
    excerpt:
      "How clear navigation, accessible interfaces, location-based features, and thoughtful user flows can make emergency-support concepts easier to use.",
    date: "2026-07-11",
    readingTime: "6 min read",
    tags: ["UI/UX Design", "Figma", "Accessibility", "Mobile Design"],
    coverImage: "/blog/emergency-mobile-ux.svg",
    content: [
      "Mobile interfaces designed for emergencies need to help users find essential information quickly. Complex navigation, unclear labels, and crowded screens can make important actions harder to identify when users are under stress.",
      "For a hospital finder concept, start by mapping the main user journeys: finding nearby hospitals, viewing contact information, opening directions, and accessing emergency contacts. Organize these journeys around the tasks users need to complete rather than the internal structure of the application.",
      "Visual hierarchy is especially important. Clear action labels, readable typography, consistent spacing, and strong contrast help make information easier to scan. Important actions should be identifiable without relying on color alone, and touch targets should be comfortable to use.",
      "Location features should communicate their limitations clearly. Explain when location permission is needed, provide a useful fallback when permission is denied, and give users a way to select a location manually. Hospital information should also be kept accurate and regularly verified.",
      "Prototyping in Figma can help validate user flows before implementation begins. Test whether users can complete key tasks, understand the available actions, and recover from errors. In emergency-support products, accessibility, clarity, and trustworthy information are essential design considerations.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
