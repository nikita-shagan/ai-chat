declare global {
  /**
   * ⚠️ FSD
   *
   * Its hack way to export redux inferring types from @/app
   * and use it in @/shared/model/hooks.ts
   */
  type RootState = import("@/app/store").RootState;
  type AppDispatch = import("@/app/store").AppDispatch;
  type AppStore = import("@/app/store").AppStore;
}
export {};
