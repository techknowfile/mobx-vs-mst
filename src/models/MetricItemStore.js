import { makeAutoObservable, runInAction, action } from "mobx";
import { MetricItem } from "./MetricItem";
// import metricItemsJson from "../fixtures/metricItems";
export class MetricItemStore {
  rootStore;
  metricItems = new Map();
  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  addMetricItem(json) {
    let item = new MetricItem(
      this.rootStore,
      json.id,
      this.metricSet
    ).updateFromJson(json);
    this.metricItems.set(json.id, item);
  }
  updateMetricItem(json) {
    if (this.metricItems.has(json.id)) {
      this.metricItems.get(json.id).updateFromJson(json);
    } else {
      this.addMetricItem(json);
    }
  }
  loadMetricItems(itemsNum) {
      // metricItemsJson.forEach((item) => {
      //   this.updateMetricItem(item);
      // });
      let itemCount = this.metricItems.size
      for (let i = 0; i < itemsNum; i++) {
        this.updateMetricItem({ id: itemCount+i, value: 5 });
      }
  }
  clearMetricItems(){
    this.metricItems.clear()
  }
  get(id) {
    return this.metricItems.get(id);
  }
  has(id) {
    return this.metricItems.has(id);
  }
}