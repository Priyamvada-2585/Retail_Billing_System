import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      display: 'flex',
      fontFamily: "'Segoe UI', sans-serif",
      background: 'linear-gradient(135deg, #1e557c, #1a1a2e, #416891)'
    }}>

      {/* LEFT SIDE */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        color: 'white'
      }}>

        {/* Logo */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #1e3880ea, #1d458f)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '50px',
          marginBottom: '30px',
          boxShadow: '0 0 40px rgb(129, 206, 231)'
        }}>
          🛒
        </div>

        <h1 style={{
          fontSize: '70px',
          fontWeight: '800',
          marginBottom: '15px',
          background: 'linear-gradient(90deg, #00c6ff, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          Retail Billing System
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#8892a4',
          textAlign: 'center',
          maxWidth: '420px',
          lineHeight: '1.9'
        }}><i>
          Manage your products, customers and invoices —
          all in one place. Built for fast retail operations.</i>
        </p>

        {/* Feature Badges */}
        <div style={{
          marginTop: '45px',
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            '📦 Product Management',
            '👤 Customer Records',
            '🧾 GST Billing',
            '📊 Dashboard'
          ].map((item, i) => (
            <span key={i} style={{
              background: 'rgba(0,198,255,0.08)',
              border: '1px solid rgba(0,198,255,0.25)',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '20px',
              color: '#a0c4d8',
              fontWeight: '500',
              boxShadow: '0 0 40px rgba(129, 206, 231, 0.29)'
            }}>
              {item}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div style={{
          marginTop: '60px',
          display: 'flex',
          gap: '40px'
        }}>
          {[
            { number: '100%', label: 'CRUD Operations' },
            { number: '18%', label: 'GST Auto Calc' },
            { number: '∞', label: 'Bills & Invoices' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '30px',
                fontWeight: '800',
                color: '#00c6ff'
              }}>{stat.number}</div>
              <div style={{
                fontSize: '20px',
                color: '#5a6a7a',
                marginTop: '4px',
                letterSpacing: '1px'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — Login Card */}
      <div style={{
        width: '750px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: 'rgba(33, 75, 75, 0.67)',
        borderLeft: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{
          width: '100%',
          background: 'linear-gradient(145deg, rgba(27, 65, 120, 0.62), rgba(75, 112, 134, 0.24))',
          borderRadius: '24px',
          padding: '60px 50px',
          border: '1px solid rgba(255, 255, 255, 0.56)',
          boxShadow: '0 30px 80px rgba(145, 197, 187, 0.53)'
        }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '35px',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(0,114,255,0.5)'
            }}>
              🔐
            </div>
            <h2 style={{
              color: 'white',
              fontWeight: '800',
              fontSize: '35px',
              marginBottom: '8px',
              letterSpacing: '3px'
            }}>
              <i>ADMIN PORTAL</i>
            </h2>
            <p style={{ color: '#5a7a8a', fontSize: '18px' }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(246, 255, 165, 0.27)',
              border: '1px solid rgba(255,50,50,0.35)',
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#fff3a3',
              marginBottom: '24px',
              fontSize: '18px',
              textAlign: 'center'
            }}><i class="fa fa-hourglass-start" aria-hidden="true"></i>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Username */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: '#7a9ab0',
                fontSize: '17px',
                marginBottom: '10px',
                display: 'block',
                fontWeight: '700',
                letterSpacing: '2px'
              }}>
                USERNAME
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)', fontSize: '18px'
                }}>👤</span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username !"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1.5px solid rgba(0,198,255,0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '18px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border 0.2s'
                  }}
                  onFocus={e => e.target.style.border = '1.5px solid rgba(0,198,255,0.7)'}
                  onBlur={e => e.target.style.border = '1.5px solid rgba(0,198,255,0.2)'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '35px' }}>
              <label style={{
                color: '#7a9ab0',
                fontSize: '17px',
                marginBottom: '10px',
                display: 'block',
                fontWeight: '700',
                letterSpacing: '2px'
              }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)', fontSize: '18px'
                }}>🔑</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 48px 16px 48px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1.5px solid rgba(0,198,255,0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '18px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.border = '1.5px solid rgba(0,198,255,0.7)'}
                  onBlur={e => e.target.style.border = '1.5px solid rgba(0,198,255,0.2)'}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '16px', top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', fontSize: '18px'
                  }}>
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '17px',
                background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '20px',
                fontWeight: '800',
                cursor: 'pointer',
                letterSpacing: '2px',
                boxShadow: '0 8px 25px rgba(0,114,255,0.45)',
                transition: 'transform 0.15s, box-shadow 0.15s'
              }}
              onMouseOver={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(0,114,255,0.6)';
              }}
              onMouseOut={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,114,255,0.45)';
              }}
            >
             <i> LOGIN → </i>
            </button>
          </form>

          {/* Hint Box */}
          <div style={{
            marginTop: '30px',
            padding: '15px',
            background: 'rgba(0,198,255,0.06)',
            border: '1px solid rgba(0,198,255,0.15)',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#5a7a8a', fontSize: '12px', margin: 0 }}>
              🔐 Username: <span style={{ color: '#00c6ff', fontWeight: '600' }}>admin</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              Password: <span style={{ color: '#00c6ff', fontWeight: '600' }}>admin123</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;