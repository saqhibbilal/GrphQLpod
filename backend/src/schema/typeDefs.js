const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Founder {
    id: ID!
    name: String!
    bio: String
    startups: [Startup!]!
  }

  type Startup {
    id: ID!
    name: String!
    description: String
    industry: Industry!
    founders: [Founder!]!
    investors: [Investor!]!
    fundingRounds: [FundingRound!]!
  }

  type Investor {
    id: ID!
    name: String!
    type: InvestorType!
    startups: [Startup!]!
  }

  type FundingRound {
    id: ID!
    amount: String!
    date: String!
    stage: String!
    startup: Startup!
  }

  enum Industry {
    FINTECH
    HEALTHTECH
    EDTECH
    ECOMMERCE
    AI_ML
    CYBERSECURITY
    BIOTECH
    CLEANTECH
  }

  enum InvestorType {
    VC
    ANGEL
    CORPORATE
    CROWDFUNDING
    PE
  }

  type Query {
    founders: [Founder!]!
    founder(id: ID!): Founder
    startups: [Startup!]!
    startup(id: ID!): Startup
    startupsByIndustry(industry: Industry!): [Startup!]!
    investors: [Investor!]!
    investor(id: ID!): Investor
  }
`;

module.exports = { typeDefs };
