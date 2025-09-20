// Import mock data (we'll replace this with database queries later)
const mockData = {
  founders: [
    {
      id: "1",
      name: "Sarah Chen",
      bio: "Former Google engineer, passionate about FinTech innovation.",
      startups: ["startup-1", "startup-2"]
    },
    {
      id: "2", 
      name: "Marcus Rodriguez",
      bio: "Healthcare industry veteran with 15 years experience.",
      startups: ["startup-3"]
    }
  ],
  startups: [
    {
      id: "startup-1",
      name: "PayFlow",
      description: "Revolutionary payment processing platform",
      industry: "FINTECH",
      founders: ["1"],
      investors: ["investor-1"]
    },
    {
      id: "startup-2", 
      name: "CryptoGuard",
      description: "Enterprise-grade cryptocurrency security",
      industry: "FINTECH",
      founders: ["1"],
      investors: ["investor-2"]
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
      startups: ["startup-2"]
    }
  ]
};

const resolvers = {
  Query: {
    founders: () => mockData.founders,
    founder: (_, { id }) => mockData.founders.find(f => f.id === id),
    startups: () => mockData.startups,
    startup: (_, { id }) => mockData.startups.find(s => s.id === id),
    startupsByIndustry: (_, { industry }) => 
      mockData.startups.filter(s => s.industry === industry),
    investors: () => mockData.investors,
    investor: (_, { id }) => mockData.investors.find(i => i.id === id)
  },

  // Resolvers for nested fields
  Founder: {
    startups: (founder) => 
      founder.startups.map(id => mockData.startups.find(s => s.id === id))
  },

  Startup: {
    founders: (startup) => 
      startup.founders.map(id => mockData.founders.find(f => f.id === id)),
    investors: (startup) => 
      startup.investors.map(id => mockData.investors.find(i => i.id === id))
  },

  Investor: {
    startups: (investor) => 
      investor.startups.map(id => mockData.startups.find(s => s.id === id))
  }
};

module.exports = { resolvers };
