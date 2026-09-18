/* ============================================================================
   CONFIG-START — the ONLY block the organising team needs to edit.
   Dates, fees, prizes, schedule, FAQ, contacts and the registration link live
   here. Markup below is rendered from this object. Do not use raw HTML in
   strings; **bold** and [link text](https://url) are supported in text.
   Open the page with #debug in the URL to print configuration warnings.
   ========================================================================== */
// General "Register" buttons (header, hero, menu) go here. Keep "#register" to send visitors to the
// registration section, which lists one link per event, or put a single portal URL here instead.
const REGISTRATION_LINK = "#register";

const CONFIG = {
  debug: false,
  REGISTRATION_LINK,

  site: {
    name: "HIMOVATION 2026",
    edition: "2026",
    eyebrow: "Annual National Technical Festival",
    prizeTotal: "Up to ₹2 lakhs",   // prize-pool wording for the hero chip and the combined prize-pool card; leave empty to show the computed ₹1,95,000+
    tagline: "Where Code Meets Combat, Play Meets Purpose",
    url: "https://aicentre-lab.github.io/Himovation/",   // update when the site moves to a university domain
    logo: { src: "assets/srhu-logo-dark.png", srcLight: "assets/srhu-logo-light.png", alt: "Swami Rama Himalayan University, NAAC A+ accredited", fallbackText: "SRHU" },  // dark = white mark for dark backgrounds, light = blue mark for light backgrounds
    organizer: {
      dept: "Department of Computer Science & Engineering",
      school: "School of Science & Technology",
      university: "Swami Rama Himalayan University",
      city: "Dehradun, Uttarakhand",
      footfall: "500–600 participants and visitors",
    },
  },

  dates: {
    start: "2026-11-27T09:00:00+05:30",   // countdown target: inauguration
    end:   "2026-11-28T16:30:00+05:30",   // end of valedictory ceremony
    display: "27–28 November 2026",
    short: "27–28 Nov 2026",
    tentative: false,                     // true shows a "dates tentative" note
    registrationDeadline: null,           // e.g. "2026-11-10T23:59:00+05:30" or null
    liveLabel: "Happening now on campus",
    endedLabel: "That's a wrap for 2026. See you next November.",
  },

  venue: {
    name: "SST Building & Auditorium",
    short: "SRHU, Jolly Grant, Dehradun",
    address: "School of Science & Technology, Swami Rama Himalayan University, Jolly Grant, Dehradun, Uttarakhand 248016",
    mapEmbedUrl: "https://www.google.com/maps?q=Swami+Rama+Himalayan+University,+Jolly+Grant,+Dehradun&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Swami+Rama+Himalayan+University+Jolly+Grant+Dehradun",
    travel: [
      { mode: "Air",  icon: "plane", name: "Jolly Grant Airport",       distanceKm: 6 },
      { mode: "Rail", icon: "train", name: "Dehradun Railway Station",  distanceKm: 18 },
      { mode: "Bus",  icon: "bus",   name: "ISBT Dehradun",             distanceKm: 25 },
    ],
  },

  nav: [
    { id: "events",   label: "Events" },
    { id: "schedule", label: "Schedule" },
    { id: "prizes",   label: "Prizes" },
    { id: "about",    label: "About" },
    { id: "faq",      label: "FAQ" },
    { id: "contact",  label: "Contact" },
  ],

  hero: {
    ctas: [
      { label: "Register now",   href: "REGISTRATION_LINK", style: "primary", external: true },
      { label: "Explore events", href: "#events",           style: "ghost" },
    ],
  },

  sections: {
    about:    { eyebrow: "About the festival", heading: "Built in the Himalayan foothills. Aimed at the country.", intro: "" },
    events:   { eyebrow: "Four flagship events", heading: "Pick your arena.", intro: "Two days, four parallel tracks. Each event is built for a different kind of builder, from 24-hour AI sprints to combat robots, LAN tournaments and school science stalls. Open an event for its full rules, prizes, downloads and coordinators." },
    prizes:   { eyebrow: "Prize pool", heading: "Up to ₹2 lakhs on the line.", intro: "Cash prizes and Certificates of Achievement in every event, presented at the valedictory ceremony on 28 November." },
    schedule: { eyebrow: "Schedule", heading: "Two days, running in parallel.", intro: "The hackathon runs continuously from Day 1 morning to Day 2 noon. Robo-War, E-Sports and the Exhibition run alongside it. Filter by track to see your day." },
    why:      { eyebrow: "Why participate", heading: "More than a weekend.", intro: "What you take home besides the prize money." },
    faq:      { eyebrow: "FAQ", heading: "Questions, answered.", intro: "Everything drawn from the official participant guidelines. Anything not confirmed yet is marked to be announced." },
    register: { eyebrow: "Registrations open", heading: "Seats are limited and allotted first come, first served.", intro: "Register for each event separately. Registration is confirmed only after verification by the Organising Committee and payment of the applicable fee. Bring your institutional ID on the day." },
    contact:  { eyebrow: "Contact", heading: "Talk to the organising team.", intro: "The organising coordinators handle queries for all four events. Call, email, or use the form." },
  },

  about: {
    paragraphs: [
      "**HIMOVATION** is the flagship annual technical festival of the Department of Computer Science & Engineering at SRHU's School of Science & Technology. It grew out of the department's national hackathon on AI for the Sustainable Development Goals, and in 2026 it expands into a two-day, four-track festival on the Jolly Grant campus.",
      "Across 27–28 November, university teams build AI prototypes in a 24-hour sprint, robotics crews fight it out in a fabricated combat arena, squads compete on a LAN in a structured e-sports tournament, and school students from Dehradun and nearby districts exhibit their science and technology projects to SRHU faculty and the public. Software innovation, hardware engineering, competitive gaming and early scientific curiosity, under one roof.",
      "The festival positions SRHU as a regional hub for technology and innovation: deployable prototypes with incubation potential, a structured bridge to schools, a responsible platform for digital sportsmanship, and two days of contact between students, faculty, industry mentors and school communities.",
    ],
    glance: [
      { label: "Organised by", value: "Dept. of CSE, SST, SRHU" },
      { label: "Dates",        value: "27–28 November 2026" },
      { label: "Venue",        value: "SST Building & Auditorium, Jolly Grant" },
      { label: "Mode",         value: "Offline, on campus" },
      { label: "Footfall",     value: "500–600 expected" },
      { label: "Events",       value: "4 parallel tracks" },
    ],
    // "The hosts" block under About. Verify years and programme wording against the university's official profile before launch.
    hosts: {
      eyebrow: "The hosts",
      heading: "A university in the foothills, and its school of technology.",
      cards: [
        {
          id: "srhu", eyebrow: "The university", title: "Swami Rama Himalayan University", showLogo: true,
          paragraphs: [
            "Swami Rama Himalayan University (SRHU) is a **NAAC A+ accredited** university at Jolly Grant, Dehradun, in the foothills of the Himalayas. It carries forward the work of the Himalayan Institute Hospital Trust founded by Swami Rama in 1989, and was established as a university in 2012 under an Act of the Government of Uttarakhand.",
            "One campus brings together medicine, nursing, management, yoga sciences, biosciences and science & technology, alongside the Himalayan Hospital, a tertiary-care teaching hospital serving Uttarakhand and neighbouring states. The university's motto, **Life ka Compass**, sums up its approach: education that gives students direction as well as degrees.",
          ],
          facts: ["NAAC A+", "Established 2012", "Jolly Grant, Dehradun", "Multi-disciplinary campus"],
          link: { label: "srhu.edu.in", href: "https://srhu.edu.in" },
        },
        {
          id: "sst", eyebrow: "The school", title: "School of Science & Technology",
          paragraphs: [
            "The School of Science & Technology (SST) is SRHU's home for engineering, computing and the applied sciences. It offers undergraduate, postgraduate and doctoral programmes built around laboratory work, live projects, hackathons and industry exposure, on a campus where technology students share space with medicine, management and the life sciences.",
            "Its **Department of Computer Science & Engineering** organises HIMOVATION. The department runs the national hackathon on AI for the Sustainable Development Goals that the festival grew out of, mentors student projects with incubation potential, and builds outreach with schools across Dehradun and nearby districts through events like the School Level Project Exhibition.",
          ],
          facts: ["Engineering & computing", "Applied sciences", "UG · PG · PhD", "Dept. of CSE organises HIMOVATION"],
          link: { label: "Programmes at SRHU", href: "https://srhu.edu.in" },
        },
      ],
    },
  },

  stats: [
    { value: 4,    label: "Flagship events" },
    { value: 2, prefix: "₹", suffix: " lakhs", label: "Prize pool (up to)" },
    { value: 500,  suffix: "+", label: "Participants & visitors" },
    { value: 24,   suffix: " hrs", label: "Non-stop hacking" },
  ],

  tracks: {
    hackathon:  { label: "Hackathon",  color: "#0EA5E9" },   // mid-tone colours that read on both light and dark
    robowar:    { label: "Robo-War",   color: "#F59E0B" },
    esports:    { label: "E-Sports",   color: "#8B5CF6" },
    exhibition: { label: "Exhibition", color: "#10B981" },
    common:     { label: "All events", color: "#64748B" },
  },

  // UPI payment for entry fees. Shown in the home registration band and in the Robo-War page's "payment" section,
  // and described in the FAQ. Hackathon and E-Sports pages have no QR on purpose: those teams pay only after
  // shortlisting, when the committee tells them. If the account changes, replace the QR image and these fields together.
  payment: {
    upiId: "gauravsharma.ps@okaxis",
    payee: "Dr. Gaurav Sharma",           // the name UPI apps show after scanning; participants are told to check it
    qr: "assets/upi-qr.png",              // cropped from the Google Pay QR supplied on 18.09.2026; encodes the upiId above
    qrDownloadName: "HIMOVATION-2026-UPI-QR.png",
    steps: [
      "Pay only when your fee is due, one payment per team for the exact amount.",
      "Write your **team name and event** in the payment note.",
      "Keep the payment screenshot and the **12‑digit UTR** (transaction ID). The committee needs them to verify your registration.",
    ],
  },

  events: [
    {
      id: "hackathon", track: "hackathon", bentoSlot: "a", icon: "code", href: "hackathon.html",
      registrationLink: "https://forms.gle/wxkV3dWvzs2Rrit77",   // Solve-a-Thon registration form
      name: "Solve-a-Thon: AI for SDGs",
      subtitle: "National Hackathon · 24 hours",
      blurb: "A continuous 24-hour coding sprint to build AI-powered solutions mapped to the UN Sustainable Development Goals. Online shortlisting first, then the offline finale on campus.",
      format: "Two rounds. Round 1 is online: register, then submit a problem statement in the HIMOVATION 2026 template with a short video description for panel evaluation. Shortlisted teams come to SRHU for the continuous 24-hour build with two progress reviews, mentor support, final presentations and live demos.",
      teamSize: { min: 3, max: 5, unit: "members" },
      fee: { amount: 800, per: "team", note: "Payable only by teams shortlisted after Round 1", due: "after Round 1 shortlisting" },   // due = "Pay …" line beside the QR
      capacity: "40–50 teams",
      eligibility: "Students participating through their institutions, with an interest in programming, AI/ML, data science or software development. Multidisciplinary teams encouraged. One optional mentor per team, declared at registration.",
      prizes: [ { place: "1st", amount: 51000 }, { place: "2nd", amount: 31000 }, { place: "3rd", amount: 11000 } ],
      specialAwards: [],
      prizePool: 93000,
      cardFacts: ["teamSize", "fee", "prizePool"],
      highlights: ["AI for Healthcare", "Education", "Climate Action", "Agriculture", "Smart Cities", "Governance", "Clean Water", "Open Theme"],
      page: {
        dates: "27–28 November 2026",
        when: "Coding starts Day 1 at 11:00 AM and runs continuously until final submission on Day 2 at 10:30 AM.",
        downloads: [
          { label: "Solve-a-Thon PPT template", cta: "Download PPT template", href: "assets/downloads/𝓗𝓘𝓜𝓞𝓥𝓐𝓣𝓘𝓞𝓝 2026 Solve A Thon Template.pptx", note: "The official five-slide deck for your Round 1 problem statement. Fill it in, export as PDF or PPT, and upload it with your short video description.", size: "226 KB" },
        ],
        coordinators: [],   // empty = the festival coordinators from contact.coordinators (same for every event)
      },
      sections: [
        { heading: "Themes", type: "chips", items: ["AI for Healthcare", "AI for Education", "AI for Climate Action", "AI for Agriculture", "AI for Smart Cities", "AI for Governance", "AI for Clean Water", "Open Theme"] },
        { heading: "How the two rounds work", type: "steps", items: [
          "**Round 1, online.** Complete registration with the names and institutional details of every team member, then verification by the Organising Committee.",
          "Submit your problem statement in the prescribed HIMOVATION 2026 template, **including a short video description**, before the deadline.",
          "The evaluation panel reviews submissions against the announced criteria and shortlists teams for the offline stage.",
          "**Only shortlisted teams pay the ₹800 fee**, within the due date communicated by the committee. A seat is confirmed only after payment and verification; teams that miss the due date are not considered further.",
          "**On campus at SRHU.** Orientation and problem statement release, followed by the continuous 24-hour coding phase.",
          "Two progress check rounds during the build, with overnight coding, mentor visits and technical support.",
          "Final submission in the prescribed format, presentations, and final evaluation with a live demonstration. Winners are announced at the valedictory ceremony.",
        ] },
        { heading: "The PPT template, slide by slide", type: "steps", items: [
          "**Title slide.** Problem statement title, theme, team name exactly as on the registration form, and every member's name with affiliation.",
          "**Problem statement.** Identify the key problem and the existing challenges and limitations you are addressing.",
          "**Proposed solution.** A clear explanation of the idea, solution or prototype, how it addresses the problem, and what makes it innovative and unique.",
          "**Feasibility and viability.** Analysis of feasibility, potential challenges and risks, and your strategies for overcoming them.",
          "Keep it to **five slides including the title slide**, prefer concise bullets, diagrams and infographics over paragraphs, use only the provided template, and save as PDF or PPT. Word or other formats are not accepted.",
        ] },
        { heading: "Project requirements", type: "list", items: [
          "An original, innovative solution with a clearly stated problem and its relevance to the chosen SDG or real-world problem.",
          "A demonstration of how the solution uses AI or relevant emerging technologies.",
          "A functional prototype, application, model or demonstrable proof of concept.",
          "Clear documentation of technologies, tools, datasets and frameworks used, respecting intellectual property and copyright.",
        ] },
        { heading: "Code of conduct for the hackathon", type: "list", items: [
          "Build during the designated competition period, under the rules announced at orientation.",
          "Plagiarism and direct copying of another team's work are strictly prohibited.",
          "Publicly available libraries, frameworks, APIs and datasets may be used in line with their licences. Declare any external work or pre-existing component wherever required.",
          "Attendance at both progress reviews is mandatory. Missing the submission deadline may lead to disqualification.",
          "Be ready to demonstrate a working prototype before the jury.",
        ] },
        { heading: "Evaluation criteria", type: "chips", items: ["Innovation & originality", "Relevance to the problem", "Technical implementation", "Effective use of AI", "Feasibility & applicability", "Social or environmental impact", "Scalability", "Quality of prototype", "Presentation & demonstration", "Teamwork & understanding"] },
        { heading: "Food, rest and the arena", type: "list", items: [
          "Running tea and snacks during the day and dinner are provided. Additional meals are the participants' own arrangement; food stalls at the venue sell extra food and refreshments.",
          "Separate rest areas are provided for male and female participants. Follow the committee's instructions on their use.",
          "At least 50% of every team must remain present in the Hackathon Arena at all times.",
        ] },
        { heading: "Download the PPT template", type: "downloads" },
      ],
    },
    {
      id: "robowar", track: "robowar", bentoSlot: "b", icon: "robot", href: "robo-war.html",
      registrationLink: "https://forms.gle/j5pqgJmcQaCrdhr26",   // empty = "Registration opens soon"
      name: "Robo-War",
      subtitle: "Combat Robotics",
      blurb: "Remote-controlled combat robots in a fabricated, shielded arena. Knockout and league rounds in the up-to-10 kg weight category.",
      format: "Knockout and/or league rounds, depending on the number of teams, inside a fabricated combat arena with safety barricades and acrylic shielding. Robots weigh up to 10 kg (indicative, to be confirmed in the final rulebook).",
      teamSize: { min: 2, max: 3, unit: "members" },
      fee: { amount: 500, per: "team", note: "", due: "when you register" },
      capacity: "20–25 teams",
      eligibility: "Students and eligible robotics enthusiasts as permitted by the organisers, with knowledge of or interest in robotics, electronics, mechanical systems, embedded systems or remote-control technologies.",
      prizes: [ { place: "1st", amount: 21000 }, { place: "2nd", amount: 11000 }, { place: "3rd", amount: 5000 } ],
      specialAwards: [],
      prizePool: 37000,
      cardFacts: ["teamSize", "fee", "prizePool"],
      highlights: ["Up to 10 kg"],
      page: {
        dates: "27 November 2026",   // guidelines 16.09.2026: Robo-War is a one-day event
        when: "Check-in and safety inspection in the morning, then qualifiers, quarterfinals, semifinals and the Grand Finale during the day.",
        downloads: [],
        coordinators: [],   // empty = the festival coordinators from contact.coordinators
      },
      sections: [
        { heading: "Weight category", type: "chips", items: ["Up to 10 kg", "Class indicative, final specs to be announced"] },
        { heading: "Eligibility and team", type: "list", items: [
          "Teams of 2 to 3 members. Each team nominates a Team Leader.",
          "Only registered team members may represent the team during the competition.",
          "Each participant may take part in a maximum of two festival events.",
        ] },
        { heading: "Registration", type: "list", items: [
          "Registration fee ₹500 per team, within the prescribed timeline. Seats are allotted first come, first served.",
          "Teams may be asked for technical details of their robot during verification.",
          "Registration is confirmed only after verification by the committee and fee payment; fees are generally non-refundable.",
        ] },
        { heading: "Pay the entry fee", type: "payment" },
        { heading: "Robot guidelines", type: "list", items: [
          "The robot must be remotely controlled and safe to operate inside the designated arena, without creating unnecessary danger to participants, officials or spectators.",
          "Every robot passes a technical and safety inspection before its first match. The committee may reject any robot it considers unsafe.",
          "Teams bring all equipment needed to run their robot, including spares and tools.",
        ] },
        { heading: "Safety guidelines", type: "list", items: [
          "Follow all instructions from referees and safety officials. Nobody enters the combat arena without permission.",
          "Only authorised team members operate the robot, from outside the safety barricade.",
          "Robots are switched off or made safe whenever they are not in a match. Any unsafe operation may lead to immediate suspension or disqualification.",
          "Fire-safety and emergency procedures announced by the organisers apply at all times.",
        ] },
        { heading: "Match rules", type: "list", items: [
          "Report to the arena before your scheduled match; late arrival may result in a walkover.",
          "Matches run under the supervision of the referee and judges. Stop your robot immediately when instructed.",
          "Deliberate attempts to damage the arena or violate safety rules lead to disqualification.",
          "The referee's decision during a match is final.",
        ] },
        { heading: "Evaluation", type: "chips", items: ["Technical design", "Mechanical robustness", "Control & manoeuvrability", "Strategy", "Match performance", "Safety compliance"] },
        { heading: "Food and refreshments", type: "list", items: [
          "Running tea and snacks during the day are provided. Additional meals are the participants' own arrangement; food stalls at the venue sell extra food.",
        ] },
      ],
    },
    {
      id: "esports", track: "esports", bentoSlot: "c", icon: "gamepad", href: "e-sports.html",
      registrationLink: "https://forms.gle/861ZLStTc7Esg2i87",
      name: "E-Sports",
      subtitle: "Competitive Gaming · LAN",
      blurb: "Squad-based Free Fire tournament on a campus LAN, with group stages, knockouts and a grand finale on the big screen.",
      format: "Squad-based Free Fire tournament with group stage and/or knockout rounds, played on LAN or approved on-campus setups. The match schedule and game-specific rules are shared with shortlisted squads before the event.",
      teamSize: { min: 4, max: 5, unit: "players" },
      fee: { amount: 500, per: "squad", note: "Payable only by squads shortlisted after verification", due: "after shortlisting" },
      capacity: "20–30 squads",
      eligibility: "Students and participants as specified by the organising committee. Players must meet the age and eligibility requirements of the selected title.",
      prizes: [ { place: "1st", amount: 21000 }, { place: "2nd", amount: 11000 }, { place: "3rd", amount: 5000 } ],
      specialAwards: [],
      prizePool: 37000,
      cardFacts: ["teamSize", "fee", "prizePool"],
      highlights: ["Free Fire"],
      page: {
        dates: "27 November 2026",   // guidelines 16.09.2026: E-Sports is a one-day event
        when: "Group stage, knockouts and the Grand Finale during the day; the match schedule is shared with shortlisted squads.",
        downloads: [],
        coordinators: [],   // empty = the festival coordinators from contact.coordinators
      },
      sections: [
        { heading: "Game title", type: "chips", items: ["Free Fire"] },
        { heading: "Eligibility and squads", type: "list", items: [
          "Squads of 4 to 5 players depending on the selected game format. Each squad nominates a Squad Leader or Captain.",
          "Only registered and verified players take part in official matches. Provide correct and complete player details at registration; changes to the squad after shortlisting need the committee's prior approval.",
          "Players must meet the age and eligibility requirements of the selected title.",
        ] },
        { heading: "Registration and shortlisting", type: "steps", items: [
          "Register your squad with the prescribed form before the announced deadline. Submitting the form does not by itself confirm a place in the tournament.",
          "The Organising Committee verifies the details and eligibility of every registered player and shortlists squads against its criteria. Shortlisted squads are informed through the contact details given on the form.",
          "**Only shortlisted squads pay the ₹500 fee**, within the deadline communicated by the committee. Missing it may cancel the squad's participation, and the place may be offered to another eligible squad.",
          "The committee may shortlist, reject or disqualify any squad on eligibility, verification, technical requirements or compliance with the guidelines. Fees, once paid, are generally non-refundable.",
        ] },
        { heading: "Tournament format", type: "steps", items: [
          "Squad check-in and verification, followed by the group stage.",
          "Knockout rounds for the squads that qualify.",
          "Grand Finale on the main screen, with prize distribution at the valedictory. The match schedule, tournament structure and game-specific rules are communicated to shortlisted squads before the event.",
        ] },
        { heading: "Participant responsibilities", type: "list", items: [
          "Report before the scheduled match time.",
          "Ensure your gaming equipment and accounts meet the requirements communicated for the event.",
          "Follow the instructions of administrators, referees and event coordinators.",
          "Maintain fair play and sportsmanship; respect opponents and avoid abusive or offensive communication.",
        ] },
        { heading: "Fair play", type: "list", items: [
          "No cheating, hacking, unauthorised software or modifications, or exploitation of prohibited bugs and glitches.",
          "No account sharing, impersonation or unauthorised players.",
          "No abusive, discriminatory or threatening communication, and no deliberate disruption of the network or gaming equipment.",
          "Any other activity that gives an unfair competitive advantage.",
          "Any violation may result in immediate disqualification of the player or squad.",
        ] },
        { heading: "Technical guidelines", type: "list", items: [
          "Participants may be required to use the gaming systems or network arrangements provided by the organisers.",
          "Where permitted, approved Bring Your Own Device (BYOD) arrangements may be used; your device must meet the announced technical requirements.",
          "Follow the official instructions on gaming accounts and login procedures.",
          "Do not make unauthorised changes to the systems, network, game settings or equipment provided for the tournament.",
          "The committee's decision on technical issues, connectivity, match interruptions or restarts is final.",
        ] },
        { heading: "Sportsmanship", type: "list", items: [
          "Acknowledge opponents respectfully before and after matches, and accept results respectfully.",
          "Protests are submitted through the Team Captain to the event coordinator.",
          "Spectators and team members must not interfere with an ongoing match.",
          "Misconduct or a breach of these guidelines may lead to disciplinary action, including disqualification.",
        ] },
        { heading: "Food and refreshments", type: "list", items: [   // NOTE: dropped from the E-Sports section of the 16.09.2026 guidelines; confirm with the committee
          "Running tea and snacks during the day are provided. Additional meals are the participants' own arrangement; food stalls at the venue sell extra food.",
        ] },
      ],
    },
    {
      id: "exhibition", track: "exhibition", bentoSlot: "d", icon: "flask", href: "exhibition.html",
      registrationLink: "https://forms.gle/ioP3N4DsJrotz5Qn9",
      name: "School Level Project Exhibition",
      subtitle: "Classes 8–12 · Free entry",
      blurb: "A stall-based exhibition for school students to present science, technology and innovation projects to SRHU faculty judges and the public.",
      format: "Stall-based project display with faculty and expert judging, plus public viewing. Each team is allotted display space with a table and power point.",
      teamSize: { min: 1, max: 3, unit: "students" },
      fee: { amount: 0, per: "team", note: "One accompanying teacher per school" },
      capacity: "20–25 schools from Dehradun and nearby districts",
      eligibility: "School students of Classes 8 to 12 from Dehradun and nearby districts, accompanied by a teacher or authorised representative from the school.",
      prizes: [ { place: "1st", amount: 15000 }, { place: "2nd", amount: 8000 }, { place: "3rd", amount: 5000 } ],
      specialAwards: ["Best Innovator Award × 2"],
      prizePool: 28000,
      cardFacts: ["teamSize", "fee", "prizePool"],
      highlights: ["Science & Technology", "AI", "Robotics", "Sustainability", "Clean Energy", "Healthcare"],
      page: {
        dates: "28 November 2026",   // confirmed with the committee: the Exhibition runs on Day 2 only
        when: "A single day on 28 November: stall setup in the morning, then Judging Round 1 with public viewing and Judging Round 2 (final).",
        downloads: [],
        coordinators: [],   // empty = the festival coordinators from contact.coordinators
      },
      sections: [
        { heading: "Project categories", type: "chips", items: ["Science & Technology", "Artificial Intelligence", "Robotics", "Environment & Sustainability", "Clean Energy", "Agriculture", "Healthcare Innovation", "Smart Solutions", "Social Innovation", "Other scientific ideas"] },
        { heading: "Eligibility and team", type: "list", items: [
          "School students of Classes 8 to 12; schools from Dehradun and nearby districts may participate.",
          "Each project is presented by 1 to 3 students. Each participating school nominates an accompanying teacher, who is responsible for coordination and discipline.",
        ] },
        { heading: "Registration", type: "list", items: [
          "No registration fee. Complete the prescribed registration process with project details, participating students and the accompanying teacher.",
          "Submit accurate participant and teacher details; seats are limited and allotted first come, first served.",
        ] },
        { heading: "Exhibition format", type: "list", items: [
          "Stall-based project display; each team is allotted display space as arranged by the organisers.",
          "Projects are evaluated by a faculty and expert judging panel, with public viewing.",
        ] },
        { heading: "Presentation guidelines", type: "list", items: [
          "Clearly explain the problem addressed, the objective and the innovation behind the project.",
          "Demonstrate the working model or prototype wherever applicable, and explain the scientific or technological principles involved.",
          "Describe the practical usefulness and possible impact, and be prepared to answer questions from judges and visitors.",
          "Display the project in a neat, safe and presentable manner.",
        ] },
        { heading: "Evaluation criteria", type: "chips", items: ["Originality & innovation", "Scientific understanding", "Creativity", "Practical relevance", "Problem-solving approach", "Working model", "Social or environmental impact", "Presentation", "Answering questions", "Overall quality"] },
        { heading: "Display and safety", type: "list", items: [
          "Projects must be safe for public display. Electrical equipment must be properly insulated and safely operated.",
          "Projects involving potentially hazardous materials or activities must be declared in advance and need approval.",
          "Follow instructions on power supply and display arrangements, and do not leave the stall unattended unless permitted.",
        ] },
        { heading: "Food and refreshments", type: "list", items: [
          "Running tea and snacks during the day are provided. Additional meals are the participants' own arrangement; food stalls at the venue sell extra food.",
        ] },
      ],
    },
  ],

  generalRules: [   // condensed from sections 1–7 of the participant guidelines (14.09.2026)
    "Each participant may take part in a maximum of two events, with a separate fee for each where applicable. Plan for overlapping timings; the committee is not responsible for clashes.",
    "Registration is confirmed only after verification by the Organising Committee and payment of the applicable fee. Seats are limited and allotted first come, first served; wait for the official confirmation.",
    "Registration fees, once paid, are generally non-refundable. Changes to team composition after registration need the committee's approval.",
    "Carry a valid institutional identity card or other valid ID. Report at the venue by the communicated time; late reporting may mean disqualification at the Event Coordinator's discretion.",
    "Every team nominates a Team Leader who receives all announcements, schedules and instructions, and a dedicated volunteer is assigned to each team for coordination and venue support.",
    "Maintain discipline and professional conduct. Harassment, abusive language, discrimination or intimidation is not tolerated; unfair practices, cheating, plagiarism, vandalism or misconduct lead to immediate disqualification.",
    "Alcohol, smoking and prohibited substances are strictly banned on campus, as is participating under their influence. University rules and safety regulations apply throughout.",
    "Use your own equipment responsibly, stay out of restricted areas, and allow inspection of equipment, bags or technical setups when asked. Belongings are your own responsibility unless an official arrangement is provided.",
    "Damage to University property, intentional or through negligence, may lead to disciplinary action and recovery of costs.",
    "Decisions of the judges and the Organising Committee are final and binding. Do not attempt to influence judges; complaints go to the respective Event Coordinator within the specified time.",
    "Participation certificates are issued to everyone who completes the required participation process; winners receive prizes and awards at the valedictory ceremony.",
    "Photography and videography during the festival may be used for institutional and promotional purposes. Do not record restricted areas or confidential judging discussions.",
  ],

  schedule: {
    // SCHEDULE ON HOLD (15.09.2026): timings are still under discussion with the committee.
    // published: false hides the timeline everywhere and shows a "coming soon" card instead.
    // The rows below are kept as they are; set published: true once the schedule is final.
    // NOTE (guidelines 16.09.2026): Robo-War and E-Sports are dated 27 Nov only, but their Day 2 Grand Finale rows
    // below come from the 26.08 proposal and must still be reconciled before publishing.
    // RESOLVED: the Exhibition is confirmed as a single day on 28 Nov (Day 2) and its rows are set accordingly.
    published: false,
    comingSoon: {
      heading: "The detailed schedule is being finalised.",
      text: "Session timings for all four events are still being confirmed by the Organising Committee. The full two-day timeline will be published here and shared with registered teams.",
    },
    legendNote: "Show",
    days: [
      { id: "day1", label: "Day 1", date: "Friday, 27 November", rows: [
        { time: "09:00 – 10:00 AM", title: "Inauguration Ceremony & Registration", tracks: ["common"], note: "All events · Auditorium", milestone: true },
        { time: "10:00 – 11:00 AM", title: "Orientation & problem statement release", tracks: ["hackathon"] },
        { time: "10:00 – 11:00 AM", title: "Team check-in, technical & safety inspection", tracks: ["robowar", "esports"] },
        { time: "11:00 AM onwards", title: "Coding phase begins (continuous)", tracks: ["hackathon"] },
        { time: "11:00 AM – 01:00 PM", title: "Qualifying rounds", tracks: ["robowar"] },
        { time: "11:00 AM – 01:00 PM", title: "Group Stage Round 1", tracks: ["esports"] },
        { time: "01:00 – 02:00 PM", title: "Lunch break", tracks: ["common"] },
        { time: "02:00 – 05:00 PM", title: "Quarterfinals & semifinals", tracks: ["robowar"] },
        { time: "02:00 – 05:00 PM", title: "Group Stage Round 2 & Knockout Round 1", tracks: ["esports"] },
        { time: "06:00 PM", title: "Progress Check Round I", tracks: ["hackathon"] },
        { time: "08:00 PM", title: "Dinner break", tracks: ["common"] },
        { time: "Overnight", title: "Continuous coding, mentor visits & technical support", tracks: ["hackathon"] },
      ] },
      { id: "day2", label: "Day 2", date: "Saturday, 28 November", rows: [
        { time: "07:30 AM", title: "Breakfast", tracks: ["common"] },
        { time: "08:00 – 09:00 AM", title: "Stall setup", tracks: ["exhibition"] },
        { time: "08:00 AM", title: "Progress Check Round II & submission prep", tracks: ["hackathon"] },
        { time: "09:00 – 10:30 AM", title: "Final submission & presentations", tracks: ["hackathon"] },
        { time: "09:00 – 11:00 AM", title: "Grand Finale", tracks: ["robowar"] },
        { time: "09:00 – 11:00 AM", title: "Grand Finale", tracks: ["esports"] },
        { time: "09:00 – 11:00 AM", title: "Judging Round 1 & public viewing", tracks: ["exhibition"] },
        { time: "11:00 AM – 01:00 PM", title: "Final evaluation & live demonstration", tracks: ["hackathon"] },
        { time: "11:00 AM – 01:00 PM", title: "Judging Round 2 (final)", tracks: ["exhibition"] },
        { time: "01:00 – 02:00 PM", title: "Lunch break", tracks: ["common"] },
        { time: "02:00 – 03:30 PM", title: "Judging consolidation, all events", tracks: ["common"] },
        { time: "03:30 – 04:30 PM", title: "Valedictory Ceremony & Prize Distribution", tracks: ["common"], note: "All events · Auditorium", milestone: true },
      ] },
    ],
  },

  why: [
    { icon: "trophy",  title: "Up to ₹2 lakhs in cash prizes",       text: "Three cash prizes in every event, plus two Best Innovator awards for schools, presented on stage at the valedictory." },
    { icon: "globe",   title: "National exposure",               text: "A national hackathon with teams from institutions across India, judged by faculty and industry evaluators, on a stage that grows every year." },
    { icon: "users",   title: "Mentors and industry judges",     text: "Overnight mentor visits during the hackathon, referees and technical panels for Robo-War and E-Sports, expert judging for school projects." },
    { icon: "award",   title: "Certificates for everyone",       text: "Certificates of Achievement for winners and participation certificates for every participant who completes the event." },
    { icon: "rocket",  title: "Incubation potential",            text: "Deployable AI prototypes and robotics designs built here can be taken forward for incubation and development with SRHU's support." },
    { icon: "school",  title: "Schools meet the university",     text: "Students of Classes 8–12 exhibit alongside university teams, meet SRHU faculty and see a working campus of science and technology." },
  ],

  faq: [
    { q: "Who can participate, and in how many events?",
      a: ["The Hackathon, Robo-War and E-Sports are open to eligible students participating through their institutions; Robo-War also admits robotics enthusiasts as permitted by the organisers. The School Project Exhibition is for students of Classes 8 to 12 from Dehradun and nearby districts.",
          "Each participant may take part in a **maximum of two events**, paying a separate fee for each where applicable. Schedules run in parallel, so plan for overlaps."] },
    { q: "How does hackathon registration and the ₹800 fee work?",
      a: ["Round 1 is online: register, get verified, and submit your problem statement in the HIMOVATION 2026 five-slide template together with a short video description before the deadline. The evaluation panel then shortlists teams for the offline finale at SRHU. The template is on the [Solve-a-Thon page](https://aicentre-lab.github.io/Himovation/hackathon.html).",
          "**Only shortlisted teams pay the ₹800 per-team fee**, within the due date communicated by the Organising Committee. A seat is confirmed only after payment and verification."] },
    { q: "How do I pay the entry fee?",
      a: ["By UPI. Scan the QR code in the Registration section of the home page (Robo-War teams also find it on the Robo-War page) with any UPI app, or pay to the UPI ID printed beside it. Check that your app shows the payee named there before you confirm.",
          "Pay only when your fee is due: Robo-War teams pay when they register, while Hackathon teams and E-Sports squads pay only after they are shortlisted. Write your **team name and event** in the payment note, and keep the screenshot and 12‑digit UTR for verification. The School Project Exhibition is free."] },
    { q: "Can I get a refund if my team cannot attend?",
      a: "Registration fees, once paid, are generally non-refundable, unless the Organising Committee decides otherwise. Changes to team composition after registration need prior approval." },
    { q: "What should we bring?",
      a: ["Everyone: a valid institutional ID card. Hackathon teams: laptops, chargers, any hardware your prototype needs, and your Round 1 problem statement. Robo-War teams: the robot, controllers, batteries, chargers, spares and tools; you are responsible for your own equipment.",
          "E-Sports squads: your own devices and peripherals where BYOD is permitted, meeting the announced specs, with accounts ready. Schools: the project, display material, extension cords and anything the stall needs."] },
    { q: "Which games will E-Sports feature, and can I bring my own device?",
      a: ["The E-Sports tournament is played on Free Fire. Matches run on LAN or approved on-campus setups. Bring Your Own Device is allowed where permitted, provided the device meets the announced technical requirements. The match schedule and game-specific rules are shared with shortlisted squads before the event.",
          "Squads register first and are verified and shortlisted by the Organising Committee. **Only shortlisted squads pay the ₹500 fee.**"] },
    { q: "What are the Robo-War safety rules?",
      a: "Robots must be remotely controlled and pass a technical and safety inspection before competing. Only authorised team members operate the robot, from outside the safety barricade, and robots stay switched off outside matches. Robots may weigh up to 10 kg; this is indicative, and the final rulebook with specifications will be issued through the registration channels. The referee's decision during a match is final." },
    { q: "What does a school need to arrange for the Exhibition?",
      a: "The Exhibition runs on 28 November, the second day of the festival, and participation is free. Register the school, the project details, 1 to 3 students per project and one accompanying teacher. Each team gets a stall with a table and a power point; bring your own display material. Electrical equipment must be insulated, hazardous materials must be declared in advance, and stalls should not be left unattended. Transport for visiting schools is coordinated with the organisers." },
    { q: "Will I receive a certificate?",
      a: "Yes. Winners receive cash prizes with Certificates of Achievement, and every participant who completes the required participation process receives a participation certificate. Prizes are distributed at the valedictory ceremony on 28 November." },
    { q: "How do I reach SRHU, Jolly Grant?",
      a: "The campus is about 6 km from Jolly Grant Airport, 18 km from Dehradun Railway Station and 25 km from ISBT Dehradun, and is well connected by road. Report at the venue by the time communicated by the Organising Committee; a volunteer is assigned to every team on arrival." },
  ],

  contact: {
    email: "himovation@srhu.edu.in",
    phone: "+91 81262 07090",   // Dr. Rohit Kanauzia, Solve-a-Thon coordinator
    coordinators: [   // organising coordinators for all four events (participant guidelines, 14.09.2026)
      { role: "Organising Coordinator", name: "Dr. Rohit Kanauzia", phone: "+91 81262 07090", email: "" },
      { role: "Organising Coordinator", name: "Dr. Gunjan Chhabra", phone: "+91 84331 02140", email: "" },
      { role: "Organising Coordinator", name: "Dr. Ashutosh Bhatt", phone: "+91 78955 33079", email: "" },
    ],
    form: { subjects: ["Registration query", "Hackathon", "Robo-War", "E-Sports", "School Exhibition", "Other"], endpoint: "" },
  },

  social: [
    { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/REPLACE_HANDLE" },
    { name: "LinkedIn",  icon: "linkedin",  href: "https://www.linkedin.com/school/REPLACE_HANDLE" },
    { name: "YouTube",   icon: "youtube",   href: "https://www.youtube.com/@REPLACE_HANDLE" },
    { name: "Website",   icon: "globe",     href: "https://srhu.edu.in" },
  ],

  footer: {
    initiative: "An initiative of the Department of Computer Science & Engineering, SST, SRHU.",
    copyright: "© 2026 Swami Rama Himalayan University. All rights reserved.",
  },
};
/* ============================ CONFIG-END ================================ */
