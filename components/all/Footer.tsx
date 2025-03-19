import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{ padding: '40px', marginTop: '40px', textAlign: 'center', color: 'white' }}>
            {/* Overall Header */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Eldrebanken</h1>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '150px', textAlign: 'left' }}>
                {/* Kontakt Column */}
                <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '1.25rem' }}>Kontakt</h4>
                    <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                        <li>Email: kontakt@seniorbank.no</li>
                        <li>Telefon: +47 123 45 678</li>
                        <li>Adresse: Bankveien 1, 1234 Oslo</li>
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
        </footer>
    );
};

export default Footer;