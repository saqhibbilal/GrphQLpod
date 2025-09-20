-- Seed data for startup ecosystem

-- Insert founders
INSERT INTO founders (id, name, bio) VALUES
('1', 'Sarah Chen', 'Former Google engineer, passionate about FinTech innovation. Led engineering teams at two successful exits.'),
('2', 'Marcus Rodriguez', 'Healthcare industry veteran with 15 years experience. Founded two HealthTech companies.'),
('3', 'Emily Watson', 'EdTech pioneer and former teacher. Focused on making education accessible through technology.'),
('4', 'David Kim', 'AI/ML researcher from MIT. Building the future of autonomous systems.')
ON CONFLICT (id) DO NOTHING;

-- Insert investors
INSERT INTO investors (id, name, type) VALUES
('investor-1', 'Sequoia Capital', 'VC'),
('investor-2', 'Andreessen Horowitz', 'VC'),
('investor-3', 'Coinbase Ventures', 'CORPORATE'),
('investor-4', 'Kleiner Perkins', 'VC'),
('investor-5', 'Google Ventures', 'CORPORATE'),
('investor-6', 'General Catalyst', 'VC'),
('investor-7', 'Accel Partners', 'VC'),
('investor-8', 'First Round Capital', 'VC'),
('investor-9', 'Elon Musk', 'ANGEL')
ON CONFLICT (id) DO NOTHING;

-- Insert startups
INSERT INTO startups (id, name, description, industry) VALUES
('startup-1', 'PayFlow', 'Revolutionary payment processing platform for small businesses', 'FINTECH'),
('startup-2', 'CryptoGuard', 'Enterprise-grade cryptocurrency security solutions', 'FINTECH'),
('startup-3', 'HealthSync', 'AI-powered patient data synchronization platform', 'HEALTHTECH'),
('startup-4', 'LearnHub', 'Interactive online learning platform for K-12 education', 'EDTECH'),
('startup-5', 'SkillForge', 'Professional development platform for corporate training', 'EDTECH'),
('startup-6', 'AutoMind', 'Autonomous vehicle AI systems for fleet management', 'AI_ML')
ON CONFLICT (id) DO NOTHING;

-- Insert founder-startup relationships
INSERT INTO founder_startups (founder_id, startup_id) VALUES
('1', 'startup-1'),
('1', 'startup-2'),
('2', 'startup-3'),
('3', 'startup-4'),
('3', 'startup-5'),
('4', 'startup-6')
ON CONFLICT (founder_id, startup_id) DO NOTHING;

-- Insert investor-startup relationships
INSERT INTO investor_startups (investor_id, startup_id) VALUES
('investor-1', 'startup-1'),
('investor-2', 'startup-1'),
('investor-2', 'startup-5'),
('investor-3', 'startup-2'),
('investor-4', 'startup-3'),
('investor-5', 'startup-3'),
('investor-6', 'startup-4'),
('investor-7', 'startup-5'),
('investor-8', 'startup-6'),
('investor-9', 'startup-6')
ON CONFLICT (investor_id, startup_id) DO NOTHING;

-- Insert funding rounds
INSERT INTO funding_rounds (id, startup_id, amount, date, stage) VALUES
('round-1', 'startup-1', '$2M', '2023-01-15', 'Seed'),
('round-2', 'startup-1', '$8M', '2023-06-20', 'Series A'),
('round-3', 'startup-2', '$5M', '2023-03-10', 'Seed'),
('round-4', 'startup-3', '$12M', '2023-05-05', 'Series A'),
('round-5', 'startup-4', '$3M', '2023-02-28', 'Seed'),
('round-6', 'startup-5', '$7M', '2023-07-15', 'Series A'),
('round-7', 'startup-6', '$15M', '2023-08-30', 'Series A')
ON CONFLICT (id) DO NOTHING;
