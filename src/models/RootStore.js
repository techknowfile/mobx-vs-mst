import { MetricItemStore } from "./MetricItemStore";
import {makeAutoObservable} from "mobx";

export class RootStore {
  metricItems = new MetricItemStore(this);
  // metricItemEntries = new MetricItemEntryStore(this);
  constructor() {
    makeAutoObservable(this)
  }

}
