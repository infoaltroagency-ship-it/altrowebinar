import { render, screen, act } from '@testing-library/react';
import { Hero } from './Hero';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Hero Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    // Helper to render with act since timer starts immediately
    const renderHero = () => {
        render(<Hero />);
        // Advance slightly to clear initial effect queue if needed, though act might be enough? 
        // Actually the warning says "An update to Hero...". This happens due to useEffect setInterval.
        // We can just pause the timer initially or clear it?
        // Let's use `act` to flush the initial effect?
        act(() => {
            vi.advanceTimersByTime(0);
        });
    };

    it('renders main headline and subheadline', () => {
        renderHero();
        expect(screen.getByRole('heading', { level: 1, name: /Webinar Conoscitivo/i })).toBeInTheDocument();
        expect(screen.getByText(/3000 persone/i)).toBeInTheDocument();
    });

    it('renders the live event badge', () => {
        renderHero();
        expect(screen.getByText(/Evento Live:/i)).toBeInTheDocument();
        expect(screen.getByText(/20 gennaio 2026/i)).toBeInTheDocument();
    });

    it('starts the countdown timer at 05:00', () => {
        renderHero();
        // Look for the timer text
        expect(screen.getByText('05:00')).toBeInTheDocument();
    });

    it('decrements the timer correctly', () => {
        render(<Hero />);
        act(() => {
            vi.advanceTimersByTime(0);
        });
        expect(screen.getByText('05:00')).toBeInTheDocument();

        // Advance by 1 second
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('04:59')).toBeInTheDocument();

        // Advance by another minute
        act(() => {
            vi.advanceTimersByTime(60000);
        });
        expect(screen.getByText('03:59')).toBeInTheDocument();
    });

    it('renders social proof section', () => {
        renderHero();
        expect(screen.getByText(/Unisciti a/i)).toBeInTheDocument();
        expect(screen.getByText(/Marco, Giulia/i)).toBeInTheDocument();
    });

    it('renders benefit bullets', () => {
        renderHero();
        expect(screen.getByText(/Nessuna esperienza richiesta/i)).toBeInTheDocument();
        expect(screen.getByText(/100% Semi-automatico/i)).toBeInTheDocument();
        expect(screen.getByText(/Setup in 24 ore/i)).toBeInTheDocument();
    });

    it('allows typing in form fields', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        renderHero();

        const nameInput = screen.getByPlaceholderText(/Nome e cognome/i);
        const emailInput = screen.getByPlaceholderText(/La tua email migliore/i);
        const phoneInput = screen.getByPlaceholderText(/Il tuo numero di telefono/i);

        await user.type(nameInput, 'Mario Rossi');
        expect(nameInput).toHaveValue('Mario Rossi');

        await user.type(phoneInput, '1234567890');
        expect(phoneInput).toHaveValue('1234567890');
    });

    it('renders sticky bar (in DOM)', () => {
        renderHero();
        // The sticky bar exists in the DOM even if hidden by CSS on desktop
        expect(screen.getByText(/Ultimi 3 posti/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Prenota ora/i })).toBeInTheDocument();
    });
});
