import { mockData } from './mockData';

// Mock resolvers that simulate GraphQL backend responses
export const mockResolvers = {
  Query: {
    founders: () => mockData.founders,
    
    founder: (_, { id }) => {
      const founder = mockData.founders.find(f => f.id === id);
      return founder ? {
        ...founder,
        startups: founder.startups.map(startupId => 
          mockData.startups.find(s => s.id === startupId)
        ).filter(Boolean)
      } : null;
    },

    startups: () => mockData.startups,
    
    startup: (_, { id }) => {
      const startup = mockData.startups.find(s => s.id === id);
      return startup ? {
        ...startup,
        founders: startup.founders.map(founderId =>
          mockData.founders.find(f => f.id === founderId)
        ).filter(Boolean),
        investors: startup.investors.map(investorId =>
          mockData.investors.find(i => i.id === investorId)
        ).filter(Boolean),
        fundingRounds: startup.fundingRounds.map(roundId =>
          mockData.fundingRounds.find(r => r.id === roundId)
        ).filter(Boolean)
      } : null;
    },

    startupsByIndustry: (_, { industry }) => {
      return mockData.startups.filter(startup => startup.industry === industry);
    },

    investors: () => mockData.investors,
    
    investor: (_, { id }) => {
      const investor = mockData.investors.find(i => i.id === id);
      return investor ? {
        ...investor,
        startups: investor.startups.map(startupId =>
          mockData.startups.find(s => s.id === startupId)
        ).filter(Boolean)
      } : null;
    }
  },

  // Resolvers for nested fields
  Founder: {
    startups: (founder) => {
      return founder.startups.map(startupId =>
        mockData.startups.find(s => s.id === startupId)
      ).filter(Boolean);
    }
  },

  Startup: {
    founders: (startup) => {
      return startup.founders.map(founderId =>
        mockData.founders.find(f => f.id === founderId)
      ).filter(Boolean);
    },
    
    investors: (startup) => {
      return startup.investors.map(investorId =>
        mockData.investors.find(i => i.id === investorId)
      ).filter(Boolean);
    },
    
    fundingRounds: (startup) => {
      return startup.fundingRounds.map(roundId =>
        mockData.fundingRounds.find(r => r.id === roundId)
      ).filter(Boolean);
    }
  },

  Investor: {
    startups: (investor) => {
      return investor.startups.map(startupId =>
        mockData.startups.find(s => s.id === startupId)
      ).filter(Boolean);
    }
  },

  FundingRound: {
    startup: (fundingRound) => {
      return mockData.startups.find(s => s.id === fundingRound.startup);
    }
  }
};
