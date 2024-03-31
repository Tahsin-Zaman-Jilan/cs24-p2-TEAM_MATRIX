import {
  type Action,
  combineReducers,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  KEY_PREFIX,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import CounterReducer from "@/lib/store/features/counter/CounterSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: unknown) {
      return Promise.resolve(null);
    },
    setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem(_key: unknown) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== undefined ? createWebStorage("local") : createNoopStorage();

const reducers = combineReducers({
  counter: CounterReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["counter"],
  /**
   * If you want the state to be persisted put the name inside the whitelist array.
   * E.g. whitelist:['counter']
   */
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            KEY_PREFIX,
          ],
        },
      }),
  });
};

export const store = makeStore();

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
