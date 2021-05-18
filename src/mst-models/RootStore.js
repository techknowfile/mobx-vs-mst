import {types} from "mobx-state-tree"

export const MetricItem = types.model({
  // rootStore: types.late(() => types.reference(RootStore)),
  id: types.integer,
  value: types.integer
})
  .actions(self => ({
    updateFromJson(json) {
      this.value = json.value;
      return this;
    }
  }))
  .views(self => ({
    get sum() {
      let prev = 0;
      if (this.id > 0) {
        prev = this.rootStore.metricItems.get(this.id - 1).sum;
      }
      return prev + this.value;
    }
  }))

export const RootStore = types.model({
  metricItems: types.optional(types.map(types.late(() => MetricItem)), {})
})
.actions(
  self => ({
    loadMetricItems(numOfItems){
      let initSize = self.metricItems.size
      for (let i = 0; i < numOfItems; i++) {
          this.updateMetricItem({id: initSize + i, value: 5});
        }
    },
    updateMetricItem(json) {
      if (self.metricItems.has(json.id)) {
        self.metricItems.get(json.id).updateFromJson(json);
      } else {
        self.addMetricItem(json);
      }
    },
    addMetricItem(json) {
      let item = MetricItem.create({ id: json.id, value: json.value});
      self.metricItems.set(json.id, item);
    },
    clearMetricItems() {
      self.metricItems.clear()
    }
  })
)
