import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  computed,
  autorun
} from "mobx";

export class MetricItem {
  rootStore;

  id;
  value = null;
  entries = [];

  constructor(rootStore, id) {
    makeObservable(this, {
      rootStore: false,
      value: observable,
      updateFromJson: action,
      sum: computed,
      setValue: action
    });
    this.rootStore = rootStore;

    this.id = id;
    // autorun(() => this.sum);
  }

  updateFromJson(json) {
    this.value = json.value;
    return this;
  }

  get sum() {
    let prev = 0;
    if (this.id > 0) {
      prev = this.rootStore.metricItems.get(this.id - 1).sum;
    }
    return prev + this.value;
  }

  setValue(value) {
    this.value = value;
  }
}
