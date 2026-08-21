import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { AlertItem, AlertType } from '@/types';

interface AlertState {
  items: AlertItem[];
}

const initialState: AlertState = {
  items: [],
};

interface ShowAlertPayload {
  type: AlertType;
  message: string;
  title?: string;
  duration?: number;
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: {
      reducer: (state, action: PayloadAction<AlertItem>) => {
        // Cap the queue so alerts don't pile up indefinitely
        state.items = [...state.items.slice(-3), action.payload];
      },
      prepare: (payload: ShowAlertPayload) => ({
        payload: {
          id: nanoid(),
          type: payload.type,
          title: payload.title,
          message: payload.message,
          duration: payload.duration ?? 4500,
        },
      }),
    },
    dismissAlert: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.items = [];
    },
  },
});

export const { showAlert, dismissAlert, clearAlerts } = alertSlice.actions;
export const selectAlerts = (state: { alert: AlertState }) => state.alert.items;
export default alertSlice.reducer;
