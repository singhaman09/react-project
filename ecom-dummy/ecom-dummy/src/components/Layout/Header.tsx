// components/Layout/Header.tsx
import React from 'react';
import styles from '../../styles/components/header.module.css';
import SearchInput from '../UI/SearchInput';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onMenuToggle
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.nav}>
          <button
            className={styles.mobileMenuButton}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <a href="/" className={styles.logo}>M</a>
          <ul className={styles.navLinks}>
            <li><a href="/" className={styles.navLink}>MEN</a></li>
            <li><a href="/" className={styles.navLink}>WOMEN</a></li>
            <li><a href="/" className={styles.navLink}>KIDS</a></li>
            <li><a href="/" className={styles.navLink}>HOME</a></li>
            <li><a href="/" className={styles.navLink}>BEAUTY</a></li>
            <li><a href="/" className={styles.navLink}>GENZ</a></li>
          </ul>
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>
            <SearchInput
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search for products, brands and more"
            />
          </div>
          <a href="/profile" className={styles.actionItem}>
            <span className={styles.actionIcon}>👤</span>
            <span>Profile</span>
          </a>
          <a href="/wishlist" className={styles.actionItem}>
            <span className={styles.actionIcon}>🤍</span>
            <span>Wishlist</span>
          </a>
          <a href="/cart" className={styles.actionItem}>
            <span className={styles.actionIcon}>🛍️</span>
            <span>Bag</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;