/**
 * The model of a generic graph
 * Uses boole matrix for graph modeling in memory
 * We are doing here visualization, given that we don't need to use a more time effective solution
 * Contains all the basic operations and algorithm of a generic graph or binary tree
 */
class GenericGraph {
    //Graph representations in memory
    booleMatrix = [];
    incidenceMatrix = [];
    adjacencyList = [];
    edgeList = [];

    constructor(numberOfNodes = 0, numberOfEdges = 0, booleMatrix = [],
                incidenceMatrix = [], adjacencyList = [], edgeList = []) {
        this.numberOfNodes = numberOfNodes;
        this.numberOfEdges = numberOfEdges;
        this.booleMatrix = booleMatrix;
        this.incidenceMatrix = incidenceMatrix;
        this.adjacencyList = adjacencyList;
        this.edgeList = edgeList;
    }

    //1. Base operations
    /**
     * Adds a node to the graph in the memory
     * @param indexOfNode The index of the actual added node
     */
    addNewNode(indexOfNode) {
        //Increment the number of nodes
        this.numberOfNodes++;

        //Adding new node to the boole matrix
        this.booleMatrix[indexOfNode] = [];

        //The incidence matrix is flipped so don't need to add new row

        //Adding a new node to the adjacency list
        this.adjacencyList[indexOfNode] = [];
    }

    /**
     * Adds a new edge to the graph
     * @param edge The actual edge we want to add
     */

    addNewEdge(edge) {
        //Check for the validity of the edge
        this.checkEdge(edge);

        //Increment number of edges
        this.numberOfEdges++;

        //Adding the edge to the boole matrix
        //todo Weight goes here
        this.booleMatrix[edge.source][edge.target] = 1;

        //Adding the edge to the incidence matrix
        const incidenceMatrixEntry = [];
        incidenceMatrixEntry[edge.source] = 1;
        incidenceMatrixEntry[edge.target] = 1;
        this.incidenceMatrix.push(incidenceMatrixEntry);

        //Adding the edge to the adjacency list
        this.adjacencyList[edge.source].push(edge.target);

        //Adding the edge to the edge list
        this.edgeList.push(edge);

    }

    /**
     * Removes a node from the graph
     * @param indexOfNode The index of the node we want to remove
     */
    removeNode(indexOfNode) {
        this.isolateNode(indexOfNode);

        //Decrement the number of nodes
        this.numberOfEdges--;

        //Remove it from the boole matrix
        delete this.booleMatrix[indexOfNode];

        //Remove it from the incidence matrix
        delete this.incidenceMatrix[indexOfNode];

        //Remove it from the adjacency list
        delete this.adjacencyList[indexOfNode];

    }

    /**
     * Function prototype
     * Removes a new edge to the graph
     * @param edge The actual edge we want to remove
     * @param indexOfEdge If the index of the edge is known, searching for it isn't necessary
     */

    removeEdge(edge, indexOfEdge = null) {
        //Check for the validity of the edge
        this.checkEdge(edge);

        //Decrement the number of edge
        this.numberOfEdges--;

        //Remove from the edge list
        if (indexOfEdge === null) {
            for (let i in this.edgeList) {
                if (this.edgeList[i].source === edge.source &&
                    this.edgeList[i].target === edge.target)
                    indexOfEdge = i;
            }
        }
        delete this.edgeList[indexOfEdge];

        //Remove from the boole matrix
        delete this.booleMatrix[edge.source][edge.target];

        //Remove from the incidence matrix
        delete this.incidenceMatrix[indexOfEdge];

        //Remove from the adjacency list
        for (let i in this.adjacencyList[edge.source])
            if (this.adjacencyList[edge.source][i] === edge.target)
                delete this.adjacencyList[edge.source][i];
    }

    /**
     * Removes all edges from a given node
     * @param indexOfNode
     */
    isolateNode(indexOfNode) {
        //Search in the edge list and removes the edges
        for (let i in this.edgeList) {
            if (this.edgeList[i].source === indexOfNode)
                this.removeEdge(this.edgeList[i], i);
            if (this.edgeList[i].target === indexOfNode)
                this.removeEdge(this.edgeList[i], i);
        }

    }

    /**
     * Checking if the nodes of the edge exist
     * Only one representation check is necessary, because
     * the four representations are synchronized
     * @param edge Edge to check
     */
    checkEdge(edge) {
        if (typeof this.booleMatrix[edge.source] === "undefined")
            throw new Error("Node no. " + edge.source + "doesn't exist");
        if (typeof this.booleMatrix[edge.target] === "undefined")
            throw new Error("Node no. " + edge.target + "doesn't exist");
    }

    //2. Representation conversions
    /**
     * Returns the graph as adjacency list representation
     */
    //Szomszédsági lista
    toAdjacencyList() {
        return this.adjacencyList;
    }

    /**
     * Returns the graph as boole matrix representation
     */
    //Pont pont mátrix
    toBooleMatrix() {
        return this.booleMatrix;
    }

    /**
     * Returns the graph as edge list representation
     */
    //Éllista
    toEdgeList() {
        return this.edgeList;
    }

    /**
     * Returns the graph as incidence matrix representation
     */
    //Illeszkedési mátrix
    toIncidenceMatrix() {
        return this.incidenceMatrix;
    }

    //3. Basic Algorithms
    /**
     * Breadth First Search algorithm
     */
    //Szélességi bejárás
    breadthFirstSearch() {

    }

    /**
     * Depth First Search algorithm
     */
    //Mélységi bejárás
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
        return this.numberOfEdges;
    }

}

/**
 * This is the model of an undirected graph
 */
//Irányítatlan gráf
class UndirectedGraph extends GenericGraph {

    constructor(numberOfNodes = 0, booleMatrix = []) {
        super(numberOfNodes, booleMatrix);
    }

    //1. Base operations
    /**
     * Adds a new edge to the graph
     * @param edge The actual edge we want to add
     */
    addNewEdge(edge) {
        super.addNewEdge(edge);
        //Adding reverse edges where is necessary
        //Boole matrix
        //todo Weight goes here
        this.booleMatrix[edge.target][edge.source] = 1;

        //Adjacency list
        this.adjacencyList[edge.target].push(edge.source);

    }

    /**
     * Removes a new edge to the graph
     * @param edge The actual edge we want to remove
     */
    removeEdge(edge) {
        super.removeEdge(edge);
        //Remove reverse edges where is necessary
        //Remove from the boole matrix
        delete this.booleMatrix[edge.target][edge.source];
        //Remove from the adjacency list
        for (let i in this.adjacencyList[edge.target])
            if (this.adjacencyList[edge.target][i] === edge.source)
                delete this.adjacencyList[edge.target][i];

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
//Irányított gráf
class DirectedGraph extends GenericGraph {

    constructor(numberOfNodes = 0, booleMatrix = []) {
        super(numberOfNodes, booleMatrix);
    }

    /**
     * Adds a new edge to the graph
     * @param edge The actual edge we want to add
     */
    addNewEdge(edge) {
        super.addNewEdge(edge);
    }

    /**
     * Removes a new edge to the graph
     * @param edge The actual edge we want to remove
     */
    removeEdge(edge) {
        super.removeEdge(edge);
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
//Bináris fa
class BinaryTree extends UndirectedGraph {

    constructor(numberOfNodes = 0, booleMatrix = []) {
        super(numberOfNodes, booleMatrix);
    }

    //1. Representation conversions
    /**
     * Returns the graph as parent array representation
     */
    //Apa tömb
    toParentArray() {

    }

    /**
     * Returns the graph as bracket representation
     */
    //Teljes zárójeles alak
    toBracketRepresentation() {

    }

    /**
     * Returns the graph as Binary Tree Standard representation
     */
    //Bináris fa standard alakja
    toStandardRepresentation() {

    }

    /**
     * Returns the graph as Binary representation
     */
    //Bináris alak
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
    //Fa magassága
    getHeight() {

    }

    /**
     * Gets the leaves of the binary tree
     */
    //Fa levelei
    getLeaves() {

    }

    /**
     * Gets the direct child nodes of a given node
     * @param indexOfParentNode The node we want the child nodes of
     */
    //Direkt leszármazottak
    getDirectChildNodes(indexOfParentNode) {

    }

    /**
     * Gets all child nodes of a given node
     * @param indexOfParentNode The node we want the child nodes of
     */
    //Összes leszármazott
    getChildNodes(indexOfParentNode) {

    }

}
