import { mergeSortGenerator } from '../algorithms/dsa/sorting/mergeSort.gen';
import { bubbleSortGenerator } from '../algorithms/dsa/sorting/bubbleSort.gen';
import { binarySearchGenerator } from '../algorithms/dsa/searching/binarySearch.gen';
import { reverseGenerator } from '../algorithms/dsa/linkedList/reverse.gen';
import { stackGenerator } from '../algorithms/dsa/linear/stack.gen';
import { queueGenerator } from '../algorithms/dsa/linear/queue.gen';
import { expressionEvalGenerator } from '../algorithms/dsa/linear/expressionEval.gen';
import { stringMatchGenerator } from '../algorithms/dsa/strings/stringMatch.gen';
import { bstGenerator } from '../algorithms/dsa/trees/bst.gen';
import { avlGenerator } from '../algorithms/dsa/trees/avl.gen';
import { heapGenerator } from '../algorithms/dsa/trees/heap.gen';
import { bfsGenerator } from '../algorithms/dsa/graphs/bfs.gen';
import { dfsGenerator } from '../algorithms/dsa/graphs/dfs.gen';
import { dijkstraGenerator } from '../algorithms/dsa/graphs/dijkstra.gen';
import { activitySelectionGenerator } from '../algorithms/dsa/greedy/activitySelection.gen';
import { huffmanGenerator } from '../algorithms/dsa/greedy/huffman.gen';
import { knapsackGenerator } from '../algorithms/dsa/dp/knapsack.gen';
import { lcsGenerator } from '../algorithms/dsa/dp/lcs.gen';
import { roundRobinGenerator } from '../algorithms/os/scheduling/roundRobin.gen';
import { sjfGenerator } from '../algorithms/os/scheduling/sjf.gen';
import { srtfGenerator } from '../algorithms/os/scheduling/srtf.gen';
import { priorityGenerator } from '../algorithms/os/scheduling/priorityScheduling.gen';
import { lruGenerator } from '../algorithms/os/memory/lru.gen';
import { mutexGenerator } from '../algorithms/os/sync/mutex.gen';
import { producerConsumerGenerator } from '../algorithms/os/sync/producerConsumer.gen';
import { diningPhilosophersGenerator } from '../algorithms/os/sync/diningPhilosophers.gen';
import { diskGenerator } from '../algorithms/os/disk/disk.gen';
import { bankersGenerator } from '../algorithms/os/deadlock/bankers.gen';

export const algorithmMap: Record<string, (input: any) => Generator<any>> = {
  mergeSort: mergeSortGenerator,
  bubbleSort: bubbleSortGenerator,
  binarySearch: binarySearchGenerator,
  reverseLinkedList: reverseGenerator,
  stack: stackGenerator,
  queue: queueGenerator,
  infixToPostfix: expressionEvalGenerator,
  naiveStringMatch: stringMatchGenerator,
  bst: bstGenerator,
  avl: avlGenerator,
  maxHeap: heapGenerator,
  bfs: bfsGenerator,
  dfs: dfsGenerator,
  dijkstra: dijkstraGenerator,
  activitySelection: activitySelectionGenerator,
  huffmanCoding: huffmanGenerator,
  knapsack: knapsackGenerator,
  lcs: lcsGenerator,
  roundRobin: roundRobinGenerator,
  sjf: sjfGenerator,
  srtf: srtfGenerator,
  priorityScheduling: priorityGenerator,
  lru: lruGenerator,
  mutex: mutexGenerator,
  producerConsumer: producerConsumerGenerator,
  diningPhilosophers: diningPhilosophersGenerator,
  diskScheduling: diskGenerator,
  bankersAlgorithm: bankersGenerator,
};
