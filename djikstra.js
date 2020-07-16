const getUnprocessedNode = (graph, visitedList) => {
  for (let i = 0; i < visitedList.length; i++) {
    for (let j = 0; j < graph[visitedList[i]].length; j++) {
      if (!visitedList.includes(graph[visitedList[i]][j].target)) {
        return graph[visitedList[i]][j].target;
      }
    }
  }
};

const djikstra = (graph, source, table, visitedList = []) => {
  if (visitedList.length === Object.keys(graph).length) return table;
  visitedList.push(source);
  const nodes = graph[source];
  let minWeight = Infinity;
  let minVertex;
  nodes.forEach(({ target, weight }) => {
    if (
      !visitedList.includes(target) &&
      table[source] + weight < table[target]
    ) {
      table[target] = table[source] + weight;
    }
    if (!visitedList.includes(target) && minWeight > weight) {
      minWeight = weight;
      minVertex = target;
    }
  });
  if (!minVertex) {
    minVertex = getUnprocessedNode(graph, visitedList);
  }
  return djikstra(graph, minVertex, table, visitedList);
};

const createTable = (graph, source) => {
  const table = {};
  Object.keys(graph).forEach(node => {
    table[node] = Infinity;
  });
  table[source] = 0;
  return table;
};

const updateAdjList = (list, source, target, weight) => {
  if (!list[source]) {
    list[source] = [{ target, weight }];
    return;
  }
  list[source].push({ target, weight });
};

const createAdjList = pairs => {
  const adjList = {};
  pairs.forEach(pair => {
    updateAdjList(adjList, pair[0], pair[1], pair[2]);
    updateAdjList(adjList, pair[1], pair[0], pair[2]);
  });
  return adjList;
};

const main = () => {
  const pairs = [
    ['a', 'b', 5],
    ['a', 'c', 8],
    ['b', 'c', 3],
    ['b', 'd', 1],
    ['b', 'e', 2],
    ['c', 'd', 1],
    ['d', 'f', 4],
    ['e', 'f', 2]
  ];
  const adjList = createAdjList(pairs);
  const table = createTable(adjList, 'a');
  const shortestPath = djikstra(adjList, 'a', table);
  console.log(shortestPath);
};
main();
