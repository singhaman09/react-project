
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../../styles/components/layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  searchTerm: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
  sidebarContent: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  searchTerm,
  onSearchChange
}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className={styles.layout}>
      <Header
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onMenuToggle={toggleSidebar}
      />
      <div className={styles.main}>
        <Sidebar isVisible={sidebarVisible} onClose={closeSidebar} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
