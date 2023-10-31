import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { app } from "../../firebase";
import { set, ref, getDatabase, push, onValue, update, remove } from 'firebase/database';

const db = getDatabase(app);

type Task = {
  Task: string
  Description: string
  TimeStamp: number
  Done: boolean
};

export interface contState {
  taskList: any[];
  errorMessage: string | undefined;
  isLoading: boolean;
  isLoadingTasks: boolean;
}

const initialState: contState = {
  taskList: [],
  errorMessage: undefined,
  isLoading: false,
  isLoadingTasks: false,
};


// MarkAsDone BTN

async function markTaskAsDone(userId: string, taskId: string): Promise<void> {
  const taskRef = ref(db, `Users/${userId}/tasks/${taskId}`);
  return update(taskRef, { Done: true });
}

export const markAsDone = createAsyncThunk(
  'cont/markAsDone',
  async ({ userId, taskId }: { userId: string; taskId: string; }) => {
    return await markTaskAsDone(userId, taskId);
  }
);

async function markTaskAsNotDone(userId: string, taskId: string): Promise<void> {
  const taskRef = ref(db, `Users/${userId}/tasks/${taskId}`);
  return update(taskRef, { Done: false });
}

export const markAsNotDone = createAsyncThunk(
  'cont/markAsNotDone',
  async ({ userId, taskId }: { userId: string; taskId: string; }) => {
    return await markTaskAsNotDone(userId, taskId);
  }
);

// MarkAsDone BTN...............................................................................


// DELETE BTN

async function deleteTask(userId: string, taskId: string): Promise<void> {
  const taskRef = ref(db, `Users/${userId}/tasks/${taskId}`);
  return remove(taskRef);
}

export const deleteTaskThunk = createAsyncThunk(
  'cont/deleteTask',
  async ({ userId, taskId }: { userId: string; taskId: string; }) => {
    return await deleteTask(userId, taskId);
  }
);

// DELETE BTN..............................................................

// EDIT BTN 

async function editTask(userId: string, taskId: string, data: Partial<Task>): Promise<void> {
  const taskRef = ref(db, `Users/${userId}/tasks/${taskId}`);
  console.log(data)
  return update(taskRef, data);
}

export const editTaskThunk = createAsyncThunk(
  'cont/editTask',
  async ({ userId, taskId, data }: { userId: string; taskId: string; data: Partial<Task> }) => {
    return await editTask(userId, taskId, data);
  })
// EDIT BTN......................................................................

// ADD TASK 

async function fetchAddTask(userId: string, name: string, descr: string): Promise<boolean> {
  try {
      const taskRef = push(ref(db, 'Users/' + userId + '/tasks/'));
      set(taskRef, {
          Task: name,
          Description: descr,
          TimeStamp: Date.now(),
          Done: false
      });
    return true;
  } catch (error: any) {
    throw new Error('Something went wrong');
  }
}

export const addTask = createAsyncThunk(
  'cont/addCont',
  async ({ userId, name, descr }: { userId: string, name: string, descr: string }) => {
    return await fetchAddTask(userId, name, descr);
  }
)

// ADD TASK.................................................................

// FETCH LIST 

async function fetch(userId: string): Promise<any> {
  return new Promise((resolve, reject) => {
      const tasksRef = ref(db, 'Users/' + userId + '/tasks/');
      
      onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          const tasks: any[] = [];

          if (data) {
              for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'object' && value !== null) {
                  tasks.push({ taskId: key, ...value });
              }
              
              }
          }
          
          resolve(tasks);
      }, (error) => {
          reject(new Error('Something went wrong: ' + error));
      });
  });
}


export const fetchTasks = createAsyncThunk(
  'cont/contFetch',
  async (userId: string) => {
    return await fetch(userId);
  }
)

// FETCH LIST................................................................ 

export const contSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.isLoadingTasks = true;
        state.errorMessage = undefined;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoadingTasks = false;
        if(action.payload){
        state.taskList = action.payload;
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoadingTasks = false;
      });
  },
});

export const {} = contSlice.actions;

export default contSlice.reducer;
