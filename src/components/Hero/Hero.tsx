import { Mail, Phone, User, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import logo from '../../assets/logo.png';

export const Hero = () => {
    // 5 Minute Timer Logic
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const scrollToForm = () => {
        const form = document.querySelector('form');
        form?.scrollIntoView({ behavior: 'smooth' });
    };

    // Form Logic
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = new URLSearchParams();

        // Convert FormData to URLSearchParams
        formData.forEach((value, key) => {
            data.append(key, value.toString());
        });

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzo-CsuIDT8SdnsUrb-dFZjQZQbA1k1hUjcszlSfyoSN30mPjnDZF3LV66_36qBNvu58g/exec', {
                method: 'POST',
                body: data,
                mode: 'no-cors' // Often needed for opaque response from GAS
            });

            // Google Apps Script returns JSON, but with no-cors it might be opaque or we just assume success if no network error
            // Actually, usually we can just check if it resolved.
            // For better reliability with simple fetch to GS, we often just proceed if no error thrown.
            setIsSuccess(true);
            form.reset();
        } catch (err) {
            console.error(err);
            setError('Si è verificato un errore. Riprova.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={styles.heroContainer}>
            <div className={styles.leftColumn}>
                {/* Live Badge */}
                <div className={styles.liveBadge}>
                    <span className={styles.pulsingDot}></span>
                    <span>Evento Live: <span className={styles.accentDate}>20 gennaio 2026</span> - Ore 19:00</span>
                </div>

                {/* Typography */}
                <h1 className={styles.headline}>Webinar Conoscitivo</h1>
                <p className={styles.subheadline}>
                    L’unico metodo <span className={styles.highlight}>realmente funzionante</span> che oltre <span className={styles.highlight}>3000 persone</span> stanno già matetando per fare fino a <span className={styles.highlight}>4000€ al mese</span> in modo semi-automatico
                </p>

                {/* Social Proof */}
                <div className={styles.socialProof}>
                    <div className={styles.avatarGroup}>
                        <div className={styles.avatar}>MJ</div>
                        <div className={styles.avatar} style={{ backgroundColor: '#10b981' }}>GL</div>
                        <div className={styles.avatar} style={{ backgroundColor: '#f59e0b' }}>RK</div>
                    </div>
                    <span className={styles.socialText}>Unisciti a <strong>Marco, Giulia</strong> e altri <strong>284</strong> iscritti di oggi</span>
                </div>

                {/* Video Placeholder */}
                <div className={styles.videoPlaceholder}>
                    <img src={logo} alt="" className={styles.videoLogo} />
                    <iframe
                        src="https://drive.google.com/file/d/1QIjaguC1gqoMhhNgutfqckx6rqiHFjb_/preview"
                        width="100%"
                        height="100%"
                        style={{ border: 'none', borderRadius: '24px' }}
                        allow="autoplay; fullscreen"
                        title="Webinar Presentation"
                    ></iframe>
                </div>
            </div>

            <div className={styles.rightColumn}>
                {/* Registration Form */}
                <div className={styles.formCard}>
                    {/* Countdown Timer */}
                    <div className={styles.timerContainer}>
                        <span>⏰</span>
                        <span>Le iscrizioni chiudono tra:</span>
                        <span className={styles.timer}>{formatTime(timeLeft)}</span>
                    </div>

                    {!isSuccess ? (
                        <>
                            <h3 className={styles.formTitle}>
                                Inserisci i tuoi dati per <span className={styles.highlight}>partecipare al webinar</span>
                            </h3>

                            {/* Benefit Bullets */}
                            <div className={styles.benefitsList}>
                                <div className={styles.benefitItem}><Check size={16} className={styles.checkIcon} /> Nessuna esperienza richiesta</div>
                                <div className={styles.benefitItem}><Check size={16} className={styles.checkIcon} /> 100% Semi-automatico</div>
                                <div className={styles.benefitItem}><Check size={16} className={styles.checkIcon} /> Setup in 24 ore</div>
                            </div>

                            <span className={styles.seats}>ultimi 3 posti disponibili</span>

                            <form className={styles.inputGroup} onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className={styles.inputWrapper}>
                                    <User className={styles.inputIcon} size={20} />
                                    <input required name="name" type="text" placeholder="Nome e cognome" className={styles.input} />
                                </div>

                                {/* Email Input */}
                                <div className={styles.inputWrapper}>
                                    <Mail className={styles.inputIcon} size={20} />
                                    <input required name="email" type="email" placeholder="La tua email migliore" className={styles.input} />
                                </div>

                                {/* Phone Input */}
                                <div className={styles.inputWrapper}>
                                    <span className={styles.flagIcon}>🇮🇹</span>
                                    <span className={styles.phonePrefix}>+39</span>
                                    <div style={{ width: '1px', height: '20px', background: '#333', margin: '0 8px' }}></div>
                                    <Phone className={styles.inputIcon} size={20} style={{ marginLeft: 0 }} />
                                    <input required name="phone" type="tel" placeholder="Il tuo numero di telefono" className={styles.input} />
                                </div>

                                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                                    {isLoading ? 'Attendere...' : 'Sblocca il Metodo Ora'}
                                </button>
                                {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
                            </form>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{
                                width: '60px', height: '60px', backgroundColor: 'rgba(16, 185, 129, 0.2)',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
                            }}>
                                <Check size={32} color="#10b981" />
                            </div>
                            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Registrazione completata!</h3>
                            <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Ti abbiamo inviato una mail con il link di accesso.</p>
                        </div>
                    )}

                    <div className={styles.secureText}>
                        <span>🔒 Dati protetti</span>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>✉️ Riceverai tutti i dettagli tramite mail</span>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bar */}
            <div className={styles.stickyBar}>
                <div className={styles.stickyText}>
                    <span style={{ color: '#ef4444', marginRight: '6px' }}>🔥</span>Ultimi 3 posti
                </div>
                <button className={styles.stickyButton} onClick={scrollToForm}>
                    Prenota ora
                </button>
            </div>
        </section>
    );
};
