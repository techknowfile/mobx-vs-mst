import { makeAutoObservable, observable } from "mobx";

export class MetricItemEntryStore {
  rootStore;
  metricItems = new Map();

  constructor(rootStore) {
    // makeAutoObservable(this, {
    //   rootStore: false,
    //   metricItems: observable
    // });
    this.rootStore = rootStore;
  }
}
