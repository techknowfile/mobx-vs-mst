import { makeAutoObservable } from "mobx";

export class MetricItemEntry {
  rootStore;
  value = null;

  constructor(rootStore) {
    // makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}
