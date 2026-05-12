import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => { logout(); navigate('/login'); };
    const isActive = (path) => location.pathname === path;
    const navLink = (path) => ({
        fontSize: '13px',
        fontWeight: 500,
        color: isActive(path) ? 'var(--text-primary)' : 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color .2s',
        paddingBottom: '2px',
        borderBottom: isActive(path) ? '1px solid var(--accent)' : '1px solid transparent',
    });
    return (
        <nav style={{
            background: 'rgba(8,8,15,0.8)',
            borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '0 1.5rem',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    background: 'var(--accent)', borderRadius: '7px',
                    padding: '4px 10px',
                }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'white', fontFamily: 'Syne,sans-serif', letterSpacing: '.02em' }}>HireAI</span>
                </div>
            </Link>
            {/* Nav links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link to="/jobs" style={navLink('/jobs')}>Browse Jobs</Link>
                {user ? (
                    <>
                        <Link to="/dashboard" style={navLink('/dashboard')}>Dashboard</Link>
                        {/* User pill */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: '999px', padding: '4px 12px 4px 8px',
                        }}>
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '50%',
                                background: user.role === 'recruiter' ? 'rgba(139,92,246,0.3)' : 'rgba(16,185,129,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '11px', fontWeight: 600,
                                color: user.role === 'recruiter' ? '#a78bfa' : '#34d399',
                            }}>
                                {user.name?.[0]?.toUpperCase()}
                            </div>
                            <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{user.name}</span>
                            <span style={{
                                fontSize: '11px', fontWeight: 500, padding: '1px 7px', borderRadius: '999px',
                                background: user.role === 'recruiter' ? 'rgba(139,92,246,0.2)' : 'rgba(16,185,129,0.2)',
                                color: user.role === 'recruiter' ? '#a78bfa' : '#34d399',
                            }}>{user.role}</span>
                        </div>
                        <button onClick={handleLogout} style={{
                            fontSize: '13px', color: 'var(--text-muted)',
                            background: 'none', border: 'none', cursor: 'pointer',
                            transition: 'color .2s', fontFamily: 'DM Sans,sans-serif',
                        }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={navLink('/login')}>Login</Link>
                        <Link to="/register" style={{
                            fontSize: '13px', fontWeight: 500, color: 'white', textDecoration: 'none',
                            background: 'var(--accent)', padding: '6px 14px', borderRadius: '8px',
                            transition: 'background .2s',
                        }}>Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
export default Navbar;