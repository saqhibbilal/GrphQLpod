import { gql } from '@apollo/client';

// Query to get all startups with their relationships
export const GET_STARTUPS = gql`
  query GetStartups {
    startups {
      id
      name
      description
      industry
      founders {
        id
        name
        bio
      }
      investors {
        id
        name
        type
      }
      fundingRounds {
        id
        amount
        date
        stage
      }
    }
  }
`;

// Query to get startups by industry
export const GET_STARTUPS_BY_INDUSTRY = gql`
  query GetStartupsByIndustry($industry: Industry!) {
    startupsByIndustry(industry: $industry) {
      id
      name
      description
      industry
      founders {
        id
        name
        bio
      }
      investors {
        id
        name
        type
      }
      fundingRounds {
        id
        amount
        date
        stage
      }
    }
  }
`;

// Query to get all founders
export const GET_FOUNDERS = gql`
  query GetFounders {
    founders {
      id
      name
      bio
      startups {
        id
        name
        industry
      }
    }
  }
`;

// Query to get all investors
export const GET_INVESTORS = gql`
  query GetInvestors {
    investors {
      id
      name
      type
      startups {
        id
        name
        industry
      }
    }
  }
`;
