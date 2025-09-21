import { useState, useEffect } from 'react'
import { client, isUsingRealBackend } from './apolloClient'
import { GET_STARTUPS } from './queries'

function App() {
  const [selectedIndustry, setSelectedIndustry] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [startupData, setStartupData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Industry color mapping with dark, rich colors
  const industryColors = {
    'FINTECH': {
      primary: '#1a472a', // Dark forest green (Slytherin-inspired)
      secondary: '#22c55e',
      background: 'rgba(26, 71, 42, 0.05)'
    },
    'HEALTHTECH': {
      primary: '#7c2d12', // Dark red-brown (Gryffindor-inspired)
      secondary: '#dc2626',
      background: 'rgba(124, 45, 18, 0.05)'
    },
    'EDTECH': {
      primary: '#1e3a8a', // Deep blue (Ravenclaw-inspired)
      secondary: '#3b82f6',
      background: 'rgba(30, 58, 138, 0.05)'
    },
    'AI_ML': {
      primary: '#581c87', // Deep purple (magical theme)
      secondary: '#8b5cf6',
      background: 'rgba(88, 28, 135, 0.05)'
    },
    'CYBERSECURITY': {
      primary: '#374151', // Dark slate gray (security theme)
      secondary: '#6b7280',
      background: 'rgba(55, 65, 81, 0.05)'
    },
    'CLEANTECH': {
      primary: '#064e3b', // Dark emerald (nature theme)
      secondary: '#059669',
      background: 'rgba(6, 78, 59, 0.05)'
    },
    'ECOMMERCE': {
      primary: '#92400e', // Dark amber (commerce theme)
      secondary: '#f59e0b',
      background: 'rgba(146, 64, 14, 0.05)'
    }
  }

  // Fetch data using Apollo Client directly
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Fetching GraphQL data...')
        
        // Use simple fetch instead of Apollo Client
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `{ startups { id name description industry founders { id name bio } investors { id name type } } }`
          })
        })
        
        const result = await response.json()
        console.log('GraphQL result:', result)
        console.log('Result data:', result.data)
        if (result.errors) {
          console.log('GraphQL errors:', result.errors)
          result.errors.forEach((error, index) => {
            console.log(`Error ${index + 1}:`, error.message, error)
          })
        }
        
        if (result.data && result.data.startups) {
          setStartupData(result.data.startups)
          setError(null)
        } else {
          setError(new Error('No startups data received from backend'))
          setStartupData([])
        }
      } catch (err) {
        console.error('GraphQL error:', err)
        setError(err)
        setStartupData([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Filter startups by industry and search term
  let filteredStartups = startupData;
  
  // Filter by industry
  if (selectedIndustry !== 'ALL') {
    filteredStartups = filteredStartups.filter(startup => startup.industry === selectedIndustry);
  }
  
  // Filter by search term
  if (searchTerm.trim()) {
    filteredStartups = filteredStartups.filter(startup => 
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  const startups = filteredStartups;
  
  const loading_state = loading;
  const error_state = error;

  // Loading state
  if (loading_state) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'transparent', 
        padding: '40px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            animation: 'spin 2s linear infinite'
          }}>🔄</div>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.3rem',
            fontFamily: 'Google Sans, sans-serif',
            fontWeight: '500'
          }}>
            Loading startup data...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error_state) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'transparent', 
        padding: '40px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>❌</div>
          <p style={{ 
            color: '#ef4444', 
            fontSize: '1.3rem',
            fontFamily: 'Google Sans, sans-serif',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Error loading data
          </p>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '400'
          }}>
            {error_state.message}
          </p>
          <p style={{ 
            color: '#9ca3af', 
            fontSize: '1rem', 
            marginTop: '1rem',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '400'
          }}>
            Check if the backend is running
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '700', 
          textAlign: 'center', 
          marginBottom: '1rem', 
          color: '#1f2937',
          fontFamily: 'Google Sans, sans-serif',
          letterSpacing: '-0.025em'
        }}>
          🚀 Startup Ecosystem
        </h1>
        <p style={{
          fontSize: '1.5rem',
          textAlign: 'center',
          color: '#6b7280',
          marginBottom: '3rem',
          fontWeight: '400',
          fontFamily: 'Google Sans, sans-serif'
        }}>
          Knowledge Graph
        </p>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.2rem', 
            marginBottom: '1rem',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '400'
          }}>
            Exploring connections between founders, startups, and investors
          </p>
          <p style={{ 
            color: isUsingRealBackend ? '#10b981' : '#f59e0b', 
            fontSize: '1rem',
            fontWeight: '600',
            fontFamily: 'Google Sans, sans-serif'
          }}>
            {isUsingRealBackend ? '✅ Using Real GraphQL Backend' : '🔧 Using Mock Data'}
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ 
          marginBottom: '3rem', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="🔍 Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '16px 24px',
                border: '2px solid #e5e7eb',
                borderRadius: '15px',
                fontSize: '17px',
                width: '400px',
                maxWidth: '90vw',
                outline: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontWeight: '400'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
            />
          </div>
          
          {/* Industry Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <label style={{ 
              color: '#374151', 
              fontWeight: '600', 
              fontSize: '17px',
              fontFamily: 'Google Sans, sans-serif'
            }}>
              Filter by Industry:
            </label>
            <select 
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              style={{ 
                padding: '14px 18px', 
                border: '2px solid #e5e7eb', 
                borderRadius: '15px',
                fontSize: '17px',
                outline: 'none',
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                fontWeight: '400'
              }}
            >
              <option value="ALL">All Industries</option>
              <option value="FINTECH">FinTech</option>
              <option value="HEALTHTECH">HealthTech</option>
              <option value="EDTECH">EdTech</option>
              <option value="AI_ML">AI/ML</option>
              <option value="CYBERSECURITY">Cybersecurity</option>
              <option value="CLEANTECH">CleanTech</option>
              <option value="ECOMMERCE">E-commerce</option>
            </select>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gap: '2rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          padding: '0 1rem'
        }}>
          {startups.map((startup) => {
            // GraphQL data already has full founder and investor objects
            const founders = startup.founders || []
            const investors = startup.investors || []
            const industryColor = industryColors[startup.industry] || {
              primary: '#374151',
              secondary: '#6b7280',
              background: 'rgba(55, 65, 81, 0.05)'
            }

            return (
              <div 
                key={startup.id} 
                style={{ 
                  background: `linear-gradient(135deg, ${industryColor.primary} 0%, ${industryColor.secondary} 100%)`,
                  borderRadius: '20px', 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', 
                  padding: '0',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px) scale(1.02)'
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Card Content */}
                <div style={{ padding: '2.5rem' }}>
                  {/* Header */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ 
                      fontSize: '2rem', 
                      fontWeight: '700', 
                      marginBottom: '1rem', 
                      color: 'white',
                      fontFamily: 'Google Sans, sans-serif',
                      lineHeight: '1.2',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                      {startup.name}
                    </h3>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'Google Sans, sans-serif'
                    }}>
                      {startup.industry.replace('_', '/')}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    marginBottom: '2.5rem',
                    lineHeight: '1.7',
                    fontSize: '1.1rem',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: '400'
                  }}>
                    {startup.description}
                  </p>
                  
                  {/* Details Section */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Founders */}
                    <div style={{
                      padding: '1.25rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <h4 style={{ 
                        fontWeight: '600', 
                        color: 'white', 
                        marginBottom: '0.75rem',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontFamily: 'Google Sans, sans-serif'
                      }}>
                        👥 Founders
                      </h4>
                      <p style={{ 
                        fontSize: '1rem', 
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '400',
                        lineHeight: '1.6',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {founders.length > 0 ? founders.map(f => f.name).join(', ') : 'Not specified'}
                      </p>
                    </div>
                    
                    {/* Investors */}
                    <div style={{
                      padding: '1.25rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <h4 style={{ 
                        fontWeight: '600', 
                        color: 'white', 
                        marginBottom: '0.75rem',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontFamily: 'Google Sans, sans-serif'
                      }}>
                        💰 Investors
                      </h4>
                      <p style={{ 
                        fontSize: '1rem', 
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '400',
                        lineHeight: '1.6',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {investors.length > 0 
                          ? investors.map(i => `${i.name} (${i.type})`).join(', ')
                          : 'Not specified'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>

        <div style={{ 
          marginTop: '4rem', 
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <p style={{ 
            color: '#6b7280',
            fontSize: '1.1rem',
            fontWeight: '500',
            fontFamily: 'Google Sans, sans-serif'
          }}>
            ✅ Showing {startups.length} startups • {isUsingRealBackend ? 'GraphQL Backend Connected' : 'Mock Data Mode'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
