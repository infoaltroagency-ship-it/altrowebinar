import { Menu } from 'lucide-react';
import styles from './Header.module.css';
import logo from '../../assets/logo.png';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={() => window.location.reload()}>
                <img src={logo} alt="Altro Webinar" />
            </div>
            <button className={styles.menuButton} aria-label="Menu">
                <Menu className={styles.menuIcon} strokeWidth={3} />
            </button>
        </header>
    );
};
