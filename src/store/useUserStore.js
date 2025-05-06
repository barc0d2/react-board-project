import { create } from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  loginUser: null,

  signUp: async (newUser) => {
    await axios.post('http://localhost:3001/users', newUser);
  },

  login: async (userId, userPwd) => {
    const res = await axios.get(`http://localhost:3001/users?userId=${userId}&userPwd=${userPwd}`);
    const found = res.data[0];
    if (found) set({ loginUser: found });
  },

  logout: () => set({ loginUser: null }),

  updateUser: async (updatedUser) => {
    await axios.put(`http://localhost:3001/users/${updatedUser.id}`, updatedUser);
    set({ loginUser: updatedUser });
  },
}));
