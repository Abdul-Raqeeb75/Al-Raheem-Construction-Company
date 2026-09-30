/**
 * DESIGN FIDELITY: Preserve the supplied original construction website's navy/blue,
 * centered-hero and card-based visual language while keeping all page content reusable.
 */
export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  scope: string;
  description: string;
  image: string;
  status?: string;
};

export type Testimonial = {
  id: string;
  /** Add this only when the client has approved their exact words for publication. */
  quote?: string;
  clientName: string;
  clientRole: string;
  homesCompleted?: number;
  ratingOutOfFive?: number;
};

export const brand = {
  name: "AL-RAHEEM",
  descriptor: "CONSTRUCTION",
  logo: "/images/logo-transparent.png",
  heroImage: "/images/hero-section.jpg",
  aboutImage: "/images/dhac.jpg",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#projects" },
  { label: "Current Projects", href: "#current-projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  { number: "01", title: "Residential construction", detail: "Custom homes, residential extensions and carefully managed finishing work shaped around daily living.", image: "/manus-storage/modern-luxury-house-with-beautiful-lawn-sunny-sky_3a76db8e.jpg" },
  { number: "02", title: "Commercial builds", detail: "Business-ready spaces, retail environments and commercial developments planned for practical operation.", image: "/manus-storage/old-buildings-port-evening_4189372c.jpg" },
  { number: "03", title: "Renovation & upgrades", detail: "Targeted refurbishments, structural upgrades and property improvements that extend long-term value.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" },
  { number: "04", title: "Civil & structural works", detail: "Foundations, concrete works, reinforcement and site-ready structural scopes with clear sequencing.", image: "/manus-storage/construction-project-commercial_e709c7bd.jpg" },
  { number: "05", title: "Interior fit-outs", detail: "Coordinated interior works, material finishes and final detailing for spaces ready to use.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
  { number: "06", title: "Project coordination", detail: "A clear point of coordination across scope, suppliers, site activity and delivery milestones.", image: "/manus-storage/scene-construction-site-with-equipment_0d8a9a7e.jpg" },
];



export const previousProjects: Project[] = [
  {
    id: "dc-colony",
    title: "DC Colony",
    category: "Commercial",
    location: "Near markets",
    scope: "Commercial construction",
    description: "A commercial development delivered with a practical focus on coordination, material quality and site discipline.",
    image: "/manus-storage/old-buildings-port-evening_4189372c.jpg",
  },
  {
    id: "serenity-heights",
    title: "Serenity Heights Residences",
    category: "Residential",
    location: "DHA Sector G",
    scope: "Custom residential construction",
    description: "A residential project focused on durable materials, clear sequencing and carefully considered day-to-day living spaces.",
    image: "/manus-storage/modern-luxury-house-with-beautiful-lawn-sunny-sky_3a76db8e.jpg",
  },
  {
    id: "DC-colony-commercial-project",
    title: "DC-Colony Commercial Project",
    category: "Infrastructure",
    location: "Near Market Street",
    scope: "Public infrastructure",
    description: "A transport-focused project planned around continuous public access, practical programming and dependable delivery.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "eco-living",
    title: "Eco-Living Apartments",
    category: "Sustainable",
    location: "Green Valley",
    scope: "Residential apartments",
    description: "A multi-unit residential development with practical consideration for long-term operation and material durability.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tech-park",
    title: "Tech Park One",
    category: "Commercial",
    location: "Innovation Zone",
    scope: "Commercial workspace",
    description: "A workplace environment designed around flexible occupation, coordinated services and business-ready infrastructure.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "riverside-center",
    title: "Riverside Community Center",
    category: "Public",
    location: "Riverbank",
    scope: "Community construction",
    description: "A gathering space created for events, community use and long-lasting public value.",
    image: "/manus-storage/lifestyle-scene-from-community-showing-care-support-from-people_ab9bacd8.jpg",
  },
];

export const currentProjects: Project[] = [
  
    {
    id: "dha-sector-g",
    title: "Signature 2 Kanal Luxury Residence Villa", // Plot size ya ghar ka style add karein
    category: "New Residential Build", // "Expansion" ki jagah yeh use karein kyunke zero se ban raha hai
    location: "DHA Sector G",
    scope: "Ground-up Construction & Turnkey Delivery", // "High-rise delivery" ki jagah
    description: "A complete ground-up residential build starting from site excavation to final interior fit-outs. We are currently focusing on laying a strong foundation and structural framework with premium materials.",
    status: "Final Finishing Phase", // Ya agar shuru ho raha hai toh "Site Preparation" / "Foundation Phase"
    image: "/images/dha.jpeg"
  },
  {
    id: "dha-sector-c",
    title: "Modern 10 Merla Residence",
    category: "New Residential Build",
    location: "DHA Sector C",
    scope: "Complete Construction Lifecycle",
    description: "A structural upgrade program planned around safe execution and continuity of local operations.",
    status: "In Progress",
    image: "/images/sectorc.jpeg",
  },
  {
    id: "green-town",
    title: "5 Merla Residential",
    category: "Residential Development",
    location: "Green Town",
    scope: "Turnkey Project Delivery",
    description: "An industrial installation progressing through coordinated system testing and commissioning stages.",
    status: "In progress",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
  },
];

/**
 * Add only genuine client feedback that has been approved for publication.
 * The carousel automatically loops when this array contains testimonials.
 */
export const approvedTestimonials: Testimonial[] = [
  {
    id: "nawaz-chattha",
    clientName: "Nawaz Chattha",
    clientRole: "Client record · review quote pending",
    homesCompleted: 25,
    ratingOutOfFive: 5,
  },
];
