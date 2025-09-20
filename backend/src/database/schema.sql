-- Startup Ecosystem Database Schema

-- Founders table
CREATE TABLE IF NOT EXISTS founders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT
);

-- Investors table
CREATE TABLE IF NOT EXISTS investors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('VC', 'ANGEL', 'CORPORATE', 'CROWDFUNDING', 'PE'))
);

-- Startups table
CREATE TABLE IF NOT EXISTS startups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    industry TEXT NOT NULL CHECK (industry IN ('FINTECH', 'HEALTHTECH', 'EDTECH', 'ECOMMERCE', 'AI_ML', 'CYBERSECURITY', 'BIOTECH', 'CLEANTECH'))
);

-- Junction table for founder-startup relationships
CREATE TABLE IF NOT EXISTS founder_startups (
    founder_id TEXT,
    startup_id TEXT,
    PRIMARY KEY (founder_id, startup_id),
    FOREIGN KEY (founder_id) REFERENCES founders(id),
    FOREIGN KEY (startup_id) REFERENCES startups(id)
);

-- Junction table for investor-startup relationships
CREATE TABLE IF NOT EXISTS investor_startups (
    investor_id TEXT,
    startup_id TEXT,
    PRIMARY KEY (investor_id, startup_id),
    FOREIGN KEY (investor_id) REFERENCES investors(id),
    FOREIGN KEY (startup_id) REFERENCES startups(id)
);

-- Funding rounds table
CREATE TABLE IF NOT EXISTS funding_rounds (
    id TEXT PRIMARY KEY,
    startup_id TEXT,
    amount TEXT,
    date TEXT,
    stage TEXT,
    FOREIGN KEY (startup_id) REFERENCES startups(id)
);
