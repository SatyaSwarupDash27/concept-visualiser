import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DSAModule } from './pages/DSAModule';
import { OSModule } from './pages/OSModule';
import './index.css';

// Load registry and registers plugins
import './algorithms/dsa/sorting/mergeSort.plugin';
import './algorithms/dsa/sorting/bubbleSort.plugin';
import './algorithms/dsa/searching/binarySearch.plugin';
import './algorithms/dsa/linkedList/reverse.plugin';
import './algorithms/dsa/linear/stack.plugin';
import './algorithms/dsa/linear/queue.plugin';
import './algorithms/dsa/linear/expressionEval.plugin';
import './algorithms/dsa/strings/stringMatch.plugin';
import './algorithms/dsa/trees/bst.plugin';
import './algorithms/dsa/trees/avl.plugin';
import './algorithms/dsa/trees/heap.plugin';
import './algorithms/dsa/graphs/bfs.plugin';
import './algorithms/dsa/graphs/dfs.plugin';
import './algorithms/dsa/graphs/dijkstra.plugin';
import './algorithms/dsa/greedy/activitySelection.plugin';
import './algorithms/dsa/greedy/huffman.plugin';
import './algorithms/dsa/dp/knapsack.plugin';
import './algorithms/dsa/dp/lcs.plugin';
import './algorithms/os/scheduling/roundRobin.plugin';
import './algorithms/os/scheduling/sjf.plugin';
import './algorithms/os/scheduling/srtf.plugin';
import './algorithms/os/scheduling/priorityScheduling.plugin';
import './algorithms/os/memory/lru.plugin';
import './algorithms/os/sync/mutex.plugin';
import './algorithms/os/sync/producerConsumer.plugin';
import './algorithms/os/sync/diningPhilosophers.plugin';
import './algorithms/os/disk/disk.plugin';
import './algorithms/os/deadlock/bankers.plugin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dsa" element={<DSAModule />}>
          <Route path=":algorithmId" element={<DSAModule />} />
        </Route>
        <Route path="/os" element={<OSModule />}>
          <Route path=":algorithmId" element={<OSModule />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
