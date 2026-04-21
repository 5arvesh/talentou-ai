import { create } from 'zustand';

interface ChatPanelState {
  isChatOpen: boolean;
  toggleChat: () => void;
}

export const useChatPanelStore = create<ChatPanelState>((set) => ({
  isChatOpen: true,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));
