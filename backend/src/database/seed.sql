-- Seed data for startup ecosystem

-- Insert founders
INSERT INTO founders (id, name, bio) VALUES
('1', 'Sarah Chen', 'Former Google engineer, passionate about FinTech innovation. Led engineering teams at two successful exits.'),
('2', 'Marcus Rodriguez', 'Healthcare industry veteran with 15 years experience. Founded two HealthTech companies.'),
('3', 'Emily Watson', 'EdTech pioneer and former teacher. Focused on making education accessible through technology.'),
('4', 'David Kim', 'AI/ML researcher from MIT. Building the future of autonomous systems.'),
('5', 'Alex Thompson', 'Cybersecurity expert and former NSA analyst. Specializes in cloud security solutions.'),
('6', 'Maria Santos', 'Environmental engineer turned entrepreneur. Leading the clean tech revolution.'),
('7', 'James Wilson', 'E-commerce veteran with 3 successful exits. Expert in marketplace platforms.'),
('8', 'Lisa Chang', 'Data scientist from Stanford. Building next-gen analytics platforms.'),
('9', 'Robert Johnson', 'Medical doctor and tech entrepreneur. Bridging healthcare and technology.'),
('10', 'Anna Petrov', 'Biotechnology researcher with 20+ patents. Former head of R&D at major pharma.')
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
('startup-6', 'AutoMind', 'Autonomous vehicle AI systems for fleet management', 'AI_ML'),
('startup-7', 'SecureVault', 'Next-generation cybersecurity for cloud infrastructure', 'CYBERSECURITY'),
('startup-8', 'GreenEnergy', 'Smart solar panel optimization with IoT sensors', 'CLEANTECH'),
('startup-9', 'ShopSmart', 'AI-powered personalized e-commerce recommendations', 'ECOMMERCE'),
('startup-10', 'DataFlow', 'Real-time analytics platform for enterprise data', 'AI_ML'),
('startup-11', 'MediConnect', 'Telemedicine platform connecting patients with specialists', 'HEALTHTECH'),
('startup-12', 'CyberShield', 'Advanced threat detection for small businesses', 'CYBERSECURITY'),
('startup-13', 'EcoTrack', 'Carbon footprint tracking for sustainable businesses', 'CLEANTECH'),
('startup-14', 'MarketPlace', 'B2B marketplace for wholesale suppliers', 'ECOMMERCE'),
('startup-15', 'CodeAcademy', 'Interactive coding bootcamp with AI tutors', 'EDTECH'),
('startup-16', 'WealthWise', 'Personal finance management with investment advice', 'FINTECH'),
('startup-17', 'BioLab', 'Biotechnology research platform for drug discovery', 'BIOTECH'),
('startup-18', 'SmartCity', 'IoT solutions for urban infrastructure management', 'AI_ML')
ON CONFLICT (id) DO NOTHING;

-- Insert founder-startup relationships
INSERT INTO founder_startups (founder_id, startup_id) VALUES
('1', 'startup-1'),
('1', 'startup-2'),
('2', 'startup-3'),
('3', 'startup-4'),
('3', 'startup-5'),
('4', 'startup-6'),
('5', 'startup-7'),
('6', 'startup-8'),
('7', 'startup-9'),
('8', 'startup-10'),
('9', 'startup-11'),
('5', 'startup-12'),
('6', 'startup-13'),
('7', 'startup-14'),
('3', 'startup-15'),
('1', 'startup-16'),
('10', 'startup-17'),
('4', 'startup-18')
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
('investor-9', 'startup-6'),
('investor-1', 'startup-7'),
('investor-2', 'startup-8'),
('investor-3', 'startup-9'),
('investor-4', 'startup-10'),
('investor-5', 'startup-11'),
('investor-6', 'startup-12'),
('investor-7', 'startup-13'),
('investor-8', 'startup-14'),
('investor-9', 'startup-15'),
('investor-1', 'startup-16'),
('investor-2', 'startup-17'),
('investor-3', 'startup-18')
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
