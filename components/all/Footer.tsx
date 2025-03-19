import React from 'react';
import { BackgroundGraphic } from '../ui/BackgroundGraphic';

const Footer: React.FC = () => {
    return (
        <footer style={{ position: 'relative', padding: '40px', marginTop: '40px', textAlign: 'center', color: 'white' }}>
        
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {/* Overall Header */}
                <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Eldrebanken</h1>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '200px', textAlign: 'left' }}>
                    {/* Kontakt Column */}
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '1.25rem' }}>Kontakt</h4>
                        <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                            <li>Email: kontakt@seniorbank.no</li>
                            <li>Telefon: +47 918 45 265</li>
                            <li>Adresse: Bankveien 1, 0092 Oslo</li>
                        </ul>
                    </div>

                    {/* Snarveier Column */}
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '1.25rem' }}>Snarveier</h4>
                        <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                            <li><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Hjem</a></li>
                            <li><a href="/betal" style={{ color: 'white', textDecoration: 'none' }}>Betaling</a></li>
                            <li><a href="/konto" style={{ color: 'white', textDecoration: 'none' }}>Konto</a></li>
                        </ul>
                    </div>

                    {/* Om Oss Column */}
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '1.25rem' }}>Om Oss</h4>
                        <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                            <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>Vår Historie</a></li>
                            <li><a href="/team" style={{ color: 'white', textDecoration: 'none' }}>Teamet</a></li>
                            <li><a href="/careers" style={{ color: 'white', textDecoration: 'none' }}>Karriere</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;