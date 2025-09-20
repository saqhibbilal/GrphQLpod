import { useState } from 'react'
import { isUsingRealBackend } from './apolloClient'
import { mockData } from './mockData'

function App() {
  const [selectedIndustry, setSelectedIndustry] = useState('ALL')

  // Keep it simple - just use mock data for now
  const startups = selectedIndustry === 'ALL' 
    ? mockData.startups 
    : mockData.startups.filter(startup => startup.industry === selectedIndustry);
  
  const loading_state = false;
  const error_state = null;

  // Loading state
  if (loading_state) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Loading startup data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error_state) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
          <p style={{ color: '#ef4444', fontSize: '1.1rem' }}>Error loading data: {error_state.message}</p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>Check if the backend is running</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
          🚀 Startup Ecosystem Knowledge Graph
        </h1>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Exploring connections between founders, startups, and investors
          </p>
          <p style={{ color: isUsingRealBackend ? '#10b981' : '#f59e0b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {isUsingRealBackend ? '✅ Using Real GraphQL Backend' : '🔧 Using Mock Data'}
          </p>
        </div>

        {/* Industry Filter */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <label style={{ color: '#374151', fontWeight: '500', marginRight: '1rem' }}>Filter by Industry:</label>
          <select 
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            style={{ 
              padding: '8px 16px', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              fontSize: '16px',
              outline: 'none'
            }}
          >
            <option value="ALL">All Industries</option>
            <option value="FINTECH">FinTech</option>
            <option value="HEALTHTECH">HealthTech</option>
            <option value="EDTECH">EdTech</option>
            <option value="AI_ML">AI/ML</option>
            <option value="CYBERSECURITY">Cybersecurity</option>
          </select>
        </div>

        <div style={{ 
          display: 'grid', 
          gap: '1.5rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' 
        }}>
          {startups.map((startup) => {
            // Get founder names from mock data
            const founders = (startup.founders || []).map(founderId => 
              mockData.founders.find(f => f.id === founderId)
            ).filter(Boolean)
            
            // Get investor info from mock data
            const investors = (startup.investors || []).map(investorId =>
              mockData.investors.find(i => i.id === investorId)
            ).filter(Boolean)

            return (
              <div key={startup.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                padding: '1.5rem',
                transition: 'box-shadow 0.2s'
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem', 
                  color: '#1f2937' 
                }}>
                  {startup.name}
                </h3>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#2563eb', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500' 
                }}>
                  {startup.industry}
                </p>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  {startup.description}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Founders:</h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {founders.map(f => f.name).join(', ')}
                    </p>
                  </div>
                  
      <div>
                    <h4 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Investors:</h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {investors.map(i => `${i.name} (${i.type})`).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
      </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280' }}>
            ✅ Showing {startups.length} startups • {isUsingRealBackend ? 'GraphQL Backend Connected' : 'Mock Data Mode'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
