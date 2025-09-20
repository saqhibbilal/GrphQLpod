const database = require('./connection');

// Founder queries
const founderQueries = {
  getAll: () => database.queryAll('SELECT * FROM founders'),
  getById: (id) => database.get('SELECT * FROM founders WHERE id = ?', [id]),
  getByStartupId: (startupId) => database.queryAll(`
    SELECT f.* FROM founders f
    JOIN founder_startups fs ON f.id = fs.founder_id
    WHERE fs.startup_id = ?
  `, [startupId])
};

// Startup queries
const startupQueries = {
  getAll: () => database.queryAll('SELECT * FROM startups'),
  getById: (id) => database.get('SELECT * FROM startups WHERE id = ?', [id]),
  getByIndustry: (industry) => database.queryAll('SELECT * FROM startups WHERE industry = ?', [industry]),
  getByFounderId: (founderId) => database.queryAll(`
    SELECT s.* FROM startups s
    JOIN founder_startups fs ON s.id = fs.startup_id
    WHERE fs.founder_id = ?
  `, [founderId]),
  getByInvestorId: (investorId) => database.queryAll(`
    SELECT s.* FROM startups s
    JOIN investor_startups ins ON s.id = ins.startup_id
    WHERE ins.investor_id = ?
  `, [investorId])
};

// Investor queries
const investorQueries = {
  getAll: () => database.queryAll('SELECT * FROM investors'),
  getById: (id) => database.get('SELECT * FROM investors WHERE id = ?', [id]),
  getByStartupId: (startupId) => database.queryAll(`
    SELECT i.* FROM investors i
    JOIN investor_startups ins ON i.id = ins.investor_id
    WHERE ins.startup_id = ?
  `, [startupId])
};

// Funding round queries
const fundingRoundQueries = {
  getByStartupId: (startupId) => database.queryAll('SELECT * FROM funding_rounds WHERE startup_id = ?', [startupId])
};

module.exports = {
  founderQueries,
  startupQueries,
  investorQueries,
  fundingRoundQueries
};
