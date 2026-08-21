'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { useAuthListener } from '@/hooks/useAuth';
import { useThemeListener } from '@/hooks/useTheme';
import { AlertContainer } from '@/components/alert/AlertContainer';

function AppInitializer({ children }: { children: React.ReactNode }) {
  useAuthListener();
  useThemeListener();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer>
          <AlertContainer />
          {children}
        </AppInitializer>
      </PersistGate>
    </Provider>
  );
}
