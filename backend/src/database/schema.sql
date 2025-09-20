-- Startup Ecosystem Database Schema

-- Founders table
CREATE TABLE IF NOT EXISTS founders (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT
);

-- Investors table
CREATE TABLE IF NOT EXISTS investors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('VC', 'ANGEL', 'CORPORATE', 'CROWDFUNDING', 'PE'))
);

-- Startups table
CREATE TABLE IF NOT EXISTS startups (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(50) NOT NULL CHECK (industry IN ('FINTECH', 'HEALTHTECH', 'EDTECH', 'ECOMMERCE', 'AI_ML', 'CYBERSECURITY', 'BIOTECH', 'CLEANTECH'))
);

-- Junction table for founder-startup relationships
CREATE TABLE IF NOT EXISTS founder_startups (
    founder_id VARCHAR(50),
    startup_id VARCHAR(50),
    PRIMARY KEY (founder_id, startup_id),
    FOREIGN KEY (founder_id) REFERENCES founders(id),
    FOREIGN KEY (startup_id) REFERENCES startups(id)
);

-- Junction table for investor-startup relationships
CREATE TABLE IF NOT EXISTS investor_startups (
    investor_id VARCHAR(50),
    startup_id VARCHAR(50),
    PRIMARY KEY (investor_id, startup_id),
    FOREIGN KEY (investor_id) REFERENCES investors(id),
    FOREIGN KEY (startup_id) REFERENCES startups(id)
);

-- Funding rounds table
CREATE TABLE IF NOT EXISTS funding_rounds (
    id VARCHAR(50) PRIMARY KEY,
    startup_id VARCHAR(50),
    amount VARCHAR(50),
    date VARCHAR(50),
    stage VARCHAR(50),
    FOREIGN KEY (startup_id) REFERENCES startups(id)
);
