const { founderQueries, startupQueries, investorQueries, fundingRoundQueries } = require('../database/queries');

const resolvers = {
  Query: {
    founders: async () => {
      return await founderQueries.getAll();
    },
    
    founder: async (_, { id }) => {
      return await founderQueries.getById(id);
    },
    
    startups: async () => {
      return await startupQueries.getAll();
    },
    
    startup: async (_, { id }) => {
      return await startupQueries.getById(id);
    },
    
    startupsByIndustry: async (_, { industry }) => {
      return await startupQueries.getByIndustry(industry);
    },
    
    investors: async () => {
      return await investorQueries.getAll();
    },
    
    investor: async (_, { id }) => {
      return await investorQueries.getById(id);
    }
  },

  // Resolvers for nested fields
  Founder: {
    startups: async (founder) => {
      return await startupQueries.getByFounderId(founder.id);
    }
  },

  Startup: {
    founders: async (startup) => {
      return await founderQueries.getByStartupId(startup.id);
    },
    
    investors: async (startup) => {
      return await investorQueries.getByStartupId(startup.id);
    },
    
    fundingRounds: async (startup) => {
      return await fundingRoundQueries.getByStartupId(startup.id);
    }
  },

  Investor: {
    startups: async (investor) => {
      return await startupQueries.getByInvestorId(investor.id);
    }
  },

  FundingRound: {
    startup: async (fundingRound) => {
      return await startupQueries.getById(fundingRound.startup_id);
    }
  }
};

module.exports = { resolvers };
