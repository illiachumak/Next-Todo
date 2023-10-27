import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../app/firebase";
import { set, ref, getDatabase } from 'firebase/database';

const auth = getAuth(app);
const db = getDatabase(app)

interface regState {
  isRegistered: boolean;
  userId: string | null;
  username: string | null;
  errorMessage: string | undefined;
  isLoading: boolean;
}

const initialState: regState = {
  isRegistered: false,
  userId: null,
  username: null,
  errorMessage: undefined,
  isLoading: false
};

async function regUser(email: string, password: string): Promise<string> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    set(ref(db, 'Users/' + user.uid),{
      email: email,
    });
    alert("User Created!");
    return user.uid;
  } catch (error: any) {
    throw new Error('Something went wrong');
  }
}

export const reg = createAsyncThunk(
  'reg/regUser',
  async ({ email, password }: { email: string; password: string }) => {
    return await regUser(email, password);
  }
);

export const regSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reg.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(reg.fulfilled, (state, action) => {
        state.isRegistered = true;
        state.userId = action.payload;
        state.isLoading = false;
      })
      .addCase(reg.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { logOut } = regSlice.actions;

export default regSlice.reducer;
