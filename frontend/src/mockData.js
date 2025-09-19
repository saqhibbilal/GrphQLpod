// Mock data for our startup ecosystem
export const mockData = {
  founders: [
    {
      id: "1",
      name: "Sarah Chen",
      bio: "Former Google engineer, passionate about FinTech innovation. Led engineering teams at two successful exits.",
      startups: ["startup-1", "startup-2"]
    },
    {
      id: "2", 
      name: "Marcus Rodriguez",
      bio: "Healthcare industry veteran with 15 years experience. Founded two HealthTech companies.",
      startups: ["startup-3"]
    },
    {
      id: "3",
      name: "Emily Watson",
      bio: "EdTech pioneer and former teacher. Focused on making education accessible through technology.",
      startups: ["startup-4", "startup-5"]
    },
    {
      id: "4",
      name: "David Kim",
      bio: "AI/ML researcher from MIT. Building the future of autonomous systems.",
      startups: ["startup-6"]
    }
  ],

  startups: [
    {
      id: "startup-1",
      name: "PayFlow",
      description: "Revolutionary payment processing platform for small businesses",
      industry: "FINTECH",
      founders: ["1"],
      investors: ["investor-1", "investor-2"],
      fundingRounds: ["round-1", "round-2"]
    },
    {
      id: "startup-2", 
      name: "CryptoGuard",
      description: "Enterprise-grade cryptocurrency security solutions",
      industry: "FINTECH",
      founders: ["1"],
      investors: ["investor-3"],
      fundingRounds: ["round-3"]
    },
    {
      id: "startup-3",
      name: "HealthSync",
      description: "AI-powered patient data synchronization platform",
      industry: "HEALTHTECH", 
      founders: ["2"],
      investors: ["investor-4", "investor-5"],
      fundingRounds: ["round-4"]
    },
    {
      id: "startup-4",
      name: "LearnHub",
      description: "Interactive online learning platform for K-12 education",
      industry: "EDTECH",
      founders: ["3"],
      investors: ["investor-6"],
      fundingRounds: ["round-5"]
    },
    {
      id: "startup-5",
      name: "SkillForge",
      description: "Professional development platform for corporate training",
      industry: "EDTECH",
      founders: ["3"],
      investors: ["investor-2", "investor-7"],
      fundingRounds: ["round-6"]
    },
    {
      id: "startup-6",
      name: "AutoMind",
      description: "Autonomous vehicle AI systems for fleet management",
      industry: "AI_ML",
      founders: ["4"],
      investors: ["investor-8", "investor-9"],
      fundingRounds: ["round-7"]
    }
  ],

  investors: [
    {
      id: "investor-1",
      name: "Sequoia Capital",
      type: "VC",
      startups: ["startup-1"]
    },
    {
      id: "investor-2", 
      name: "Andreessen Horowitz",
      type: "VC",
      startups: ["startup-1", "startup-5"]
    },
    {
      id: "investor-3",
      name: "Coinbase Ventures",
      type: "CORPORATE",
      startups: ["startup-2"]
    },
    {
      id: "investor-4",
      name: "Kleiner Perkins",
      type: "VC", 
      startups: ["startup-3"]
    },
    {
      id: "investor-5",
      name: "Google Ventures",
      type: "CORPORATE",
      startups: ["startup-3"]
    },
    {
      id: "investor-6",
      name: "General Catalyst",
      type: "VC",
      startups: ["startup-4"]
    },
    {
      id: "investor-7",
      name: "Accel Partners",
      type: "VC",
      startups: ["startup-5"]
    },
    {
      id: "investor-8",
      name: "First Round Capital",
      type: "VC",
      startups: ["startup-6"]
    },
    {
      id: "investor-9",
      name: "Elon Musk",
      type: "ANGEL",
      startups: ["startup-6"]
    }
  ],

  fundingRounds: [
    {
      id: "round-1",
      amount: "$2M",
      date: "2023-01-15",
      stage: "Seed",
      startup: "startup-1"
    },
    {
      id: "round-2", 
      amount: "$8M",
      date: "2023-06-20",
      stage: "Series A",
      startup: "startup-1"
    },
    {
      id: "round-3",
      amount: "$5M",
      date: "2023-03-10",
      stage: "Seed",
      startup: "startup-2"
    },
    {
      id: "round-4",
      amount: "$12M", 
      date: "2023-05-05",
      stage: "Series A",
      startup: "startup-3"
    },
    {
      id: "round-5",
      amount: "$3M",
      date: "2023-02-28",
      stage: "Seed",
      startup: "startup-4"
    },
    {
      id: "round-6",
      amount: "$7M",
      date: "2023-07-15",
      stage: "Series A", 
      startup: "startup-5"
    },
    {
      id: "round-7",
      amount: "$15M",
      date: "2023-08-30",
      stage: "Series A",
      startup: "startup-6"
    }
  ]
};
