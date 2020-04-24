/**
 * The model of a generic graph
 * Uses adjacency list to store a graph in memory, because this is the  most memory efficient solutions
 * We are doing here visualization, given that we don't need to use a more time effective solution
 * Contains all the basic operations and algorithm of a generic graph
 */
class GenericGraph {

    constructor(numberOfNodes = 0, adjacencyList = []) {
        this.numberOfNodes = numberOfNodes;
        this.adjacencyList = adjacencyList;
    }

    //1. Base operations
    /**
     * Adds a node to the graph in the memory
     * @param indexOfNode The index of the actual added node
     */
    addNewNode(indexOfNode) {
        this.adjacencyList[indexOfNode].used = true;
    }

    /**
     * Function prototype
     * Adds a new edge to the graph
     * @param edge The actual edge we want to add
     */
    //addNewEdge(edge);

    /**
     * Removes a node from the graph
     * @param indexOfNode The index of the node we want to remove
     */
    removeNode(indexOfNode) {
        this.adjacencyList[indexOfNode].used = false;

    }

    /**
     * Function prototype
     * Removes a new edge to the graph
     * @param edge The actual edge we want to remove
     */
    //removeEdge(edge);

    //2. Representation conversions
    /**
     * Returns the graph as adjacency list representation
     */
    toAdjacencyList() {
        return this.adjacencyList;
    }

    /**
     * Returns the graph as boole matrix representation
     */
    toBooleMatrix() {
        let booleMatrix = [];
        //search for the edges in the adjacency list and convert it to boole matrix
        for (let i in this.adjacencyList) {
            let sourceNode = this.adjacencyList[i];
            for (let j in this.adjacencyList[currentNode]) {
                const targetNode = this.adjacencyList[sourceNode][j];
                booleMatrix[sourceNode][targetNode] = 1;
            }
        }

        //set undefined elements to 0
        for (let i = 1; i <= this.numberOfNodes; i++)
            for (let j = 1; j <= this.numberOfNodes; j++)
                if (booleMatrix[i][j] === undefined)
                    booleMatrix[i][j] = 0;

        return booleMatrix;
    }

    /**
     * Returns the graph as edge list representation
     */
    toEdgeList() {

    }

    /**
     * Returns the graph as incidence matrix representation
     */
    toIncidenceMatrix() {

    }

    //3. Basic Algorithms
    /**
     * Breadth First Search algorithm
     */
    breadthFirstSearch() {

    }

    /**
     * Depth First Search algorithm
     */
    depthFirstSearch() {

    }

    /**
     * Dijkstra algorithm
     */
    dijkstra() {

    }

    /**
     * Kruskal algorithm
     */
    kruskal() {

    }

    //4. Getters and Setters
    /**
     * @returns {number} the number of nodes of the graph
     */
    get getNumberOfNodes() {
        return this.numberOfNodes;
    }

    /**
     * @returns {number} the number of edges of the graph
     */
    get getNumberOfEdges() {
        let numberOfEdges;
        return numberOfEdges;
    }

}

/**
 * This is the model of an undirected graph
 */
class UndirectedGraph extends GenericGraph {

    constructor(numberOfNodes = 0, adjacencyList = []) {
        super(numberOfNodes, adjacencyList);
    }

    //1. Base operations
    /**
     * Adds a new edge to the graph
     * @param edge The actual edge we want to add
     */
    addNewEdge(edge) {

    }

    /**
     * Removes a new edge to the graph
     * @param edge The actual edge we want to remove
     */
    removeEdge(edge) {

    }

    /**
     * Removes a given node from the graph
     * @param indexOfNode Index of the node to remove
     */
    removeNode(indexOfNode) {
        super.removeNode(indexOfNode);

    }

}

/**
 * This is the model of a directed graph
 */
class DirectedGraph extends GenericGraph {

    constructor(numberOfNodes = 0, adjacencyList = []) {
        super(numberOfNodes, adjacencyList);
    }

    /**
     * Adds a new edge to the graph
     * @param edge The actual edge we want to add
     */
    addNewEdge(edge) {

    }

    /**
     * Removes a new edge to the graph
     * @param edge The actual edge we want to remove
     */
    removeEdge(edge) {

    }

    /**
     * Removes a given node from the graph
     * @param indexOfNode Index of the node to remove
     */
    removeNode(indexOfNode) {
        super.removeNode(indexOfNode);
    }


}

/**
 * This is the model of a binary tree
 * Contains the specific algorithms for this type of graph
 */
class BinaryTree extends UndirectedGraph {

    constructor(numberOfNodes = 0, adjacencyList = []) {
        super(numberOfNodes, adjacencyList);
    }

    //1. Representation conversions
    /**
     * Returns the graph as parent array representation
     */
    toParentArray() {

    }

    /**
     * Returns the graph as bracket representation
     */
    toBracketRepresentation() {

    }

    /**
     * Returns the graph as Binary Tree Standard representation
     */
    toStandardRepresentation() {

    }

    /**
     * Returns the graph as Binary representation
     */
    toBinaryRepresentation() {

    }

    //2. Specific algorithms
    /**
     * Preorder Search
     */
    preorderSearch() {

    }

    /**
     * Inorder Search
     */
    inorderSearch() {

    }

    /**
     * Postorder Search
     */
    postorderSearch() {

    }

    /**
     * Gets the height of the binary tree
     */
    getHeight() {

    }

    /**
     * Gets the leaves of the binary tree
     */
    getLeaves() {

    }

    /**
     * Gets the direct child nodes of a given node
     * @param indexOfParentNode The node we want the child nodes of
     */
    getDirectChildNodes(indexOfParentNode) {

    }

    /**
     * Gets all child nodes of a given node
     * @param indexOfParentNode The node we want the child nodes of
     */
    getChildNodes(indexOfParentNode) {

    }

}