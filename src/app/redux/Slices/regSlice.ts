import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { set, ref, getDatabase } from 'firebase/database';

const auth = getAuth(app);
const db = getDatabase(app)

interface regState {

  userId: string | null;
  errorReg: string | undefined;
  isLoading: boolean;
}

const initialState: regState = {
  userId: null,
  errorReg: undefined,
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
    if (error.code === "auth/email-already-in-use") {
      throw new Error('This email is already registered.');
    } else {
      throw new Error(error.message);
    }
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
    returnError: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reg.pending, (state) => {
        state.isLoading = true;
        state.errorReg = undefined;
      })
      .addCase(reg.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.isLoading = false;
      })
      .addCase(reg.rejected, (state, action) => {
        state.errorReg = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { returnError } = regSlice.actions;

export default regSlice.reducer;
