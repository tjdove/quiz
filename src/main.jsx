import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import AgentTypesQuiz from './agents-types.jsx'
import AICredentialsQuiz from './ai-credentials.jsx'

function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, textAlign: 'center' }}>
      <h1>Agentic AI Study Quizzes</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <Link to="/agent-types" style={{ fontSize: '1.2rem', padding: '12px 24px', background: '#4a90d9', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>Agent Types</Link>
        <Link to="/ai-credentials" style={{ fontSize: '1.2rem', padding: '12px 24px', background: '#4a90d9', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>AI Credentials</Link>
      </nav>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent-types" element={<AgentTypesQuiz />} />
        <Route path="/ai-credentials" element={<AICredentialsQuiz />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
