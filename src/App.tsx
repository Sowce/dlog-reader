import { Component, createSignal, Match, Switch } from "solid-js";
import Parsing from "./components/Parsing";
import WaitingForLog from "./components/WaitingForLog";

enum AppState {
  "waitingForLog",
  "parsing",
  "displayingLog",
}

const App: Component = () => {
  const [appState, setAppState] = createSignal(AppState.waitingForLog);

  const onFilesDropped = (files: File[]) => {
    setAppState(AppState.parsing);

    const resolvedLogFiles = new Map();
    files.forEach(async (file) => {
      resolvedLogFiles.set(file.name, await file.text());
    });

    
  };

  return (
    <div class="w-screen min-h-screen bg-gray-800 text-gray-50">
      <Switch>
        <Match when={appState() === AppState.waitingForLog}>
          <WaitingForLog onFilesDropped={onFilesDropped} />
        </Match>
        <Match when={appState() === AppState.parsing}>
          <Parsing />
        </Match>
      </Switch>
    </div>
  );
};

export default App;
