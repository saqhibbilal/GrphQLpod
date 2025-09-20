// Simple GraphQL query as string
export const GET_STARTUPS = `
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
    }
  }
`;