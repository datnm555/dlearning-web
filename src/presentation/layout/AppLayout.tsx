import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { SidebarMenu } from './SidebarMenu';

export function AppLayout() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F4F3EF' }}>
      <AppHeader />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <SidebarMenu />
        <main style={{ flex: 1, overflowY: 'auto', padding: '26px 34px 60px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
