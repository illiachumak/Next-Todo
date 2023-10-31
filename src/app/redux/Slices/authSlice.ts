import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  errorMessage: string | undefined;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: '',
  errorMessage: undefined,
  isLoading: false
};

async function loginUser(email: string, password: string): Promise<string> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user.uid;
  } catch (error: any) {
    throw new Error('Something went wrong');
  }
}

export const login = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    return await loginUser(email, password);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    returnError : () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = 'Invali Email or Password!!!';
        state.isLoading = false;
      });
  },
});

export const { returnError } = authSlice.actions;

export default authSlice.reducer;
