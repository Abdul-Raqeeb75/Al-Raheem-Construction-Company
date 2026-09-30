# Adding Genuine Testimonials

Testimonials are stored in `client/src/data/siteContent.ts` inside the `approvedTestimonials` array. Add a new object only after the client has approved the exact text and publication details.

```ts
{
  id: "unique-client-id",
  clientName: "Client Name",
  clientRole: "Client · Project type or location",
  quote: "Client-approved testimonial text goes here.",
  homesCompleted: 1,
  ratingOutOfFive: 5,
}
```

The carousel automatically repeats its cards and pauses when visitors hover over it. Do not use placeholder or invented client quotes, names, ratings, or project claims.
