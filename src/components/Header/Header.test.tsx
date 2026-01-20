import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { describe, it, expect } from 'vitest';

describe('Header Component', () => {
    it('renders correctly', () => {
        render(<Header />);
        // Check if header exists
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('displays the menu button', () => {
        render(<Header />);
        const menuButton = screen.getByRole('button', { name: /menu/i });
        expect(menuButton).toBeInTheDocument();
    });

    // Logo is an SVG so we might just check if it's there via class or container
    it('displays logo container', () => {
        const { container } = render(<Header />);
        // Looking for the class applied to the logo container
        // Note: CSS modules hash classes, but if we check accessibility or implementation details:
        // Since we don't have aria-label on logo, we check basic rendering.
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
