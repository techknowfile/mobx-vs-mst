import logo from './logo.svg';
import React, {useEffect, useState} from "react"
import './App.css';
import {RootStore as MobxRootStore} from "./models/RootStore";
import {RootStore as MSTRootStore} from "./mst-models/RootStore";
import {observer} from "mobx-react";



const App = () => {
  const [mobxStore, setMobxStore] = useState(false);
  const [mstStore, setMstStore] = useState(false);
  const [memory, setMemory] = useState("")
  useInterval(() => {
      setMemory((window.performance.memory.usedJSHeapSize / 1000000000).toFixed(2) + " GB");
    }
  , 1000)
  useEffect(
    () => {
      setMobxStore(new MobxRootStore());
      window.mobxStore = mobxStore
      setMstStore(MSTRootStore.create({}))
      window.mstStore = mstStore
    }
  , [])

  return (
    <div className="App">
      {mobxStore ? <>
        <button onClick={() => mobxStore.metricItems.loadMetricItems(100000)}>Add 100,000 MobX items</button>
        <button onClick={() => mobxStore.metricItems.clearMetricItems()}>Clear</button>
        <br/>
        MetricItems Loaded: {mobxStore.metricItems.metricItems.size} <br/></>

        : "loading"}
    <br/>
      {mobxStore ? <>
      <button onClick={() => mstStore.loadMetricItems(100000)}>Add 100,000 MST nodes</button>
      <button onClick={() => mstStore.clearMetricItems()}>Clear</button>
      <br/>
      MetricItems Loaded: {mstStore.metricItems.size} <br/></>
      : "loading"}

      <br/>
      Chrome Memory: {memory}
    </div>
  );
}

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default observer(App);
