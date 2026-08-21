'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { api } from '@/lib/api';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, clearCredentials, setLoading } from '@/store/slices/authSlice';

export function useAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        try {
          const { data } = await api.post('/users/sync', {
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
            email: firebaseUser.email,
          });
          dispatch(
            setCredentials({
              user: { uid: firebaseUser.uid, name: data.name, email: data.email, role: data.role },
              token,
            })
          );
        } catch {
          dispatch(clearCredentials());
        }
      } else {
        dispatch(clearCredentials());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
}
