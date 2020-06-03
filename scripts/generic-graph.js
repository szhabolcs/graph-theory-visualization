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
    algorithmOutput = [];

    constructor(numberOfNodes = 0, numberOfEdges = 0, booleMatrix = [],
                incidenceMatrix = [], adjacencyList = [], edgeList = []) {
        this.numberOfNodes = numberOfNodes;
        this.numberOfEdges = numberOfEdges;
        this.booleMatrix = booleMatrix;
        this.incidenceMatrix = incidenceMatrix;
        this.adjacencyList = adjacencyList;
        this.edgeList = edgeList;

        this.initRepresentationTables();
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
     * Adds the node to the representation tables in the DOM
     * @param indexOfNode index of the node in table
     * @param nodeValue value of the node
     */
    addNodeToTable(indexOfNode, nodeValue) {


        //Boole matrix
        this.tblBooleMatrix.addRow(indexOfNode, nodeValue);
        this.tblBooleMatrix.addColumn(indexOfNode, nodeValue);

        //Incidence matrix
        this.tblIncidenceMatrix.addRow(indexOfNode, nodeValue);

        //Adjacency list
        this.tblAdjacencyList.addRow(indexOfNode, nodeValue);


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
     * Adds an edge to the representation tables in the DOM
     * @param edge
     */
    addEdgeToTable(edge) {

        const source = edge.source;
        const target = edge.target;
        const sourceNode = $("div[id='" + source + "']");
        const targetNode = $("div[id='" + target + "']");

        //Boole matrix
        //todo weight goes here
        this.tblBooleMatrix.updateTable(source, target, '1');

        //Incidence matrix
        this.tblIncidenceMatrix.pushColumn(this.incidenceMatrix.length.toString());
        this.tblIncidenceMatrix.updateTable(source, this.incidenceMatrix.length.toString(), '1');
        this.tblIncidenceMatrix.updateTable(target, this.incidenceMatrix.length.toString(), '1');

        //Adjacency list
        this.tblAdjacencyList.pushElementToRow(source, target, VisualNode.getValueFromNode(targetNode));

        //Edge list
        this.tblEdgeList.pushRow((this.edgeList.length).toString());
        this.tblEdgeList.updateTable((this.edgeList.length).toString(), SOURCE, VisualNode.getValueFromNode(sourceNode));
        this.tblEdgeList.updateTable((this.edgeList.length).toString(), TARGET, VisualNode.getValueFromNode(targetNode));

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

        //Remove the node from the representation tables
        this.removeNodeFromTable(indexOfNode);

    }

    /**
     * Removes a given node from the representation tables
     * @param indexOfNode
     */
    removeNodeFromTable(indexOfNode) {
        //Boole matrix
        this.tblBooleMatrix.removeRow(indexOfNode);
        this.tblBooleMatrix.removeColumn(indexOfNode);

        //Incidence matrix
        this.tblIncidenceMatrix.removeRow(indexOfNode);

        //Adjacency list
        this.tblAdjacencyList.removeRow(indexOfNode);

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

        this.removeEdgeFromTable(edge, indexOfEdge);

    }

    /**
     * Removes an edge from the representation tables
     * @param edge
     * @param indexOfEdge
     */
    removeEdgeFromTable(edge, indexOfEdge) {
        //Boole matrix
        this.tblBooleMatrix.updateTable(edge.source, edge.target, '0');

        //Incidence matrix
        this.tblIncidenceMatrix.removeColumn((Number.parseInt(indexOfEdge) + 1).toString());

        //Adjacency list
        this.tblAdjacencyList.removeElement(edge.source, edge.target);

        //Edge list
        this.tblEdgeList.removeRow((Number.parseInt(indexOfEdge) + 1).toString());
    }

    /**
     * Deletes the whole graph from the memory
     */
    deleteGraph() {
        for (let i in this.adjacencyList) {
            this.removeNode(i);
            this.visualNode.removeNode(i);
        }
    }

    /**
     * Removes all edges from a given node
     * @param indexOfNode
     */
    isolateNode(indexOfNode) {
        //Search in the edge list and removes the edges
        for (let i in this.edgeList) {
            if (this.edgeList[i].source === indexOfNode || this.edgeList[i].target === indexOfNode)
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

    /**
     * Initializes the tables in the representation section
     */
    initRepresentationTables() {
        this.tblBooleMatrix = new TableHandler(ID_BOOLE_MATRIX, NAME_BOOLE_MATRIX);
        this.tblIncidenceMatrix = new TableHandler(ID_INCIDENCE_MATRIX, NAME_INCIDENCE_MATRIX);
        this.tblAdjacencyList = new TableHandler(ID_ADJACENCY_LIST, NAME_ADJACENCY_LIST);
        this.tblEdgeList = new TableHandler(ID_EDGE_LIST, NAME_EDGE_LIST);
        //Init Edge list
        this.tblEdgeList.addColumn(SOURCE, DISPLAY_SOURCE);
        this.tblEdgeList.addColumn(TARGET, DISPLAY_TARGET);
    }

    /**
     * Removes all the representation tables from the DOM
     */
    dropRepresentationTables() {
        this.tblBooleMatrix.drop();
        this.tblIncidenceMatrix.drop();
        this.tblAdjacencyList.drop();
        this.tblEdgeList.drop();
    }

    //2. Basic Algorithms
    /**
     * Breadth First Search algorithm
     * @param starterNode
     */
    //Szélességi bejárás
    breadthFirstSearch(starterNode) {
        let firstElement = 0;
        let lastElement = 0;
        let node;
        let freq = [];
        let route = [];
        for (let i in this.adjacencyList)
            freq[i] = 0;

        route[0] = starterNode;
        freq[starterNode]++;

        this.algorithmOutput.push({
            from: null,
            to: starterNode,
            log: VisualNode.getValueByNodeId(starterNode)
        });

        while (firstElement <= lastElement) {
            node = route[firstElement];
            for (let i in this.adjacencyList[node])
                if (freq[this.adjacencyList[node][i]] === 0) {
                    route[++lastElement] = this.adjacencyList[node][i];
                    this.algorithmOutput.push({
                        from: node,
                        to: this.adjacencyList[node][i],
                        log: VisualNode.getValueByNodeId(this.adjacencyList[node][i])
                    });
                    freq[this.adjacencyList[node][i]]++;
                }

            firstElement++;
        }
    }


    /**
     * Depth First Search algorithm
     * @param starterNode
     */
    //Mélységi bejárás
    depthFirstSearch(starterNode) {

        let firstElement = 0;
        let lastElement = 1;
        let node;
        let ok = 0;
        let freq = [];
        let stack = [];
        let route = [];


        route.length = this.numberOfNodes.length - 1;
        stack.length = this.numberOfNodes.length;

        for (let i in this.adjacencyList)
            freq[i] = 0;

        route.fill(0);
        route[0] = starterNode;
        freq[starterNode]++;
        stack[0] = starterNode;

        this.algorithmOutput.push({
            from: null,
            to: starterNode,
            log: VisualNode.getValueByNodeId(starterNode)
        });

        while (firstElement >= 0) {
            node = stack[firstElement];
            ok = 0;

            for (let i in this.adjacencyList[node][0])
                if (freq[this.adjacencyList[node][i]] === 0) {
                    ok = 1;
                    stack[++firstElement] = this.adjacencyList[node][i];
                    route[lastElement++] = this.adjacencyList[node][i];
                    this.algorithmOutput.push({
                        from: node,
                        to: this.adjacencyList[node][i],
                        log: VisualNode.getValueByNodeId(this.adjacencyList[node][i])
                    });
                    freq[this.adjacencyList[node][i]]++;
                    break;
                }
            if (ok === 0) firstElement--;
        }

        return route;

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

    //3. Getters and Setters
    /**
     * Returns the graph as adjacency list representation
     */
    //Szomszédsági lista
    getAdjacencyList() {
        return this.adjacencyList;
    }

    /**
     * Returns the graph as boole matrix representation
     */
    //Pont pont mátrix
    getBooleMatrix() {
        return this.booleMatrix;
    }

    /**
     * Returns the graph as edge list representation
     */
    //Éllista
    getEdgeList() {
        return this.edgeList;
    }

    /**
     * Returns the graph as incidence matrix representation
     */
    //Illeszkedési mátrix
    getIncidenceMatrix() {
        return this.incidenceMatrix;
    }

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

    //3. Getters and Setters
    /**
     * Sets the visual representation for this graph
     * @param visualNode
     */
    setVisualNode(visualNode) {
        this.visualNode = visualNode;
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
     * Adds an edge to the representation tables in the DOM
     * @param edge
     */
    addEdgeToTable(edge) {
        super.addEdgeToTable(edge);

        const source = edge.source;
        const target = edge.target;
        const sourceNode = $("div[id='" + source + "']");

        //Boole matrix
        //todo weight goes here
        this.tblBooleMatrix.updateTable(target, source, '1');

        //Adjacency list
        this.tblAdjacencyList.pushElementToRow(target, source, VisualNode.getValueFromNode(sourceNode));
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

    removeEdgeFromTable(edge, indexOfEdge) {
        super.removeEdgeFromTable(edge, indexOfEdge);
        //Boole matrix
        this.tblBooleMatrix.updateTable(edge.target, edge.source, '0');

        //todo Adjacency list
        this.tblAdjacencyList.removeElement(edge.target, edge.source);

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
class BinaryTree extends GenericGraph {
    root;
    //Graph representations
    parentArray = [];
    standardForm = [];
    binaryForm = [];

    constructor(numberOfNodes = 0, numberOfEdges = []) {
        super(numberOfNodes, numberOfEdges);
    }

    //1. Base operations
    /**
     * Adds a new node to the binary tree
     * @param indexOfNode
     */
    addNewNode(indexOfNode) {

        //Adding the node to the parent array
        this.parentArray[indexOfNode] = 0;

        //Adding the node to the standard form
        this.standardForm[indexOfNode] = {
            left: 0,
            right: 0
        };
    }

    /**
     * Adds the node to the representation tables in the DOM
     * @param indexOfNode index of the node in table
     * @param nodeValue value of the node
     */
    addNodeToTable(indexOfNode, nodeValue) {
        //Parent array
        this.tblParentArray.addColumn(indexOfNode, nodeValue);

        //Standard form
        this.tblStandardForm.addColumn(indexOfNode, nodeValue);

        //Binary form
        this.tblBinaryForm.addRow(indexOfNode, nodeValue);
    }

    /**
     * Adds a new edge to the binary tree
     * @param edge
     */
    addNewEdge(edge, childType) {

        //Adding the edge to the parent array
        this.parentArray[edge.target] = edge.source;

        //Adding the edge to the standard form
        if (childType === TYPE_LEFT)
            this.standardForm[edge.source].left = edge.target;
        else if (childType === TYPE_RIGHT)
            this.standardForm[edge.source].right = edge.target;

    }

    /**
     * Adds an edge to the representation tables in the DOM
     * @param edge
     */
    addEdgeToTable(edge, childType) {
        const sourceNode = $("div[id='" + edge.source + "']");
        const targetNode = $("div[id='" + edge.target + "']");
        //Parent array
        this.tblParentArray.updateTable('1', edge.target, VisualNode.getValueFromNode(sourceNode));

        //Standard form
        if (childType === TYPE_LEFT)
            this.tblStandardForm.updateTable(ROW_LEFT, edge.source, VisualNode.getValueFromNode(targetNode));
        else if (childType === TYPE_RIGHT)
            this.tblStandardForm.updateTable(ROW_RIGHT, edge.source, VisualNode.getValueFromNode(targetNode));

    }

    /**
     * Removes a node from the binary tree
     * @param indexOfNode
     */
    removeNode(indexOfNode) {
        //Removing the node from the parent array
        delete this.parentArray[indexOfNode];

        //Removing the node from the standard form
        delete this.standardForm[indexOfNode];

        this.removeNodeFromTable(indexOfNode);
    }

    /**
     * Removes a given node from the representation tables
     * @param indexOfNode
     */
    removeNodeFromTable(indexOfNode) {
        //Parent array
        this.tblParentArray.removeColumn(indexOfNode);

        //Standard form
        this.tblStandardForm.removeColumn(indexOfNode);

        //Binary form
        this.tblBinaryForm.removeRow(indexOfNode);
    }

    /**
     * Removes an edge from the binary tree
     * @param edge
     */
    removeEdge(edge) {
        //Removing the edge from the parent array
        this.parentArray[edge.target] = 0;

        //Removing the edge from the standard form
        this.standardForm[edge.source].left = 0;
        this.standardForm[edge.source].right = 0;

    }

    /**
     * Removes an edge from the representation tables
     * @param edge
     * @param childType
     */
    removeEdgeFromTable(edge, childType) {
        //Parent array
        this.tblParentArray.updateTable('1', edge.target, '0');

        //Standard form
        if (childType === TYPE_LEFT)
            this.tblStandardForm.updateTable(ROW_LEFT, edge.source, '0');
        else if (childType === TYPE_RIGHT)
            this.tblStandardForm.updateTable(ROW_RIGHT, edge.source, '0');

    }

    /**
     * Deletes the whole graph from the memory
     */
    deleteGraph() {
        for (let i in this.parentArray) {
            this.removeNode(i);
            this.visualNode.removeNode(i);
        }
    }

    /**
     * Initializes the tables in the representation section
     */
    initRepresentationTables() {
        this.tblParentArray = new TableHandler(ID_PARENT_ARRAY, NAME_PARENT_ARRAY);
        this.tblStandardForm = new TableHandler(ID_STANDARD_FORM, NAME_STANDARD_FORM);
        this.tblBinaryForm = new TableHandler(ID_BINARY_FORM, NAME_BINARY_FORM);
        //Init Parent array
        this.tblParentArray.addRow('1', null);
        //Init Standard form
        this.tblStandardForm.addRow(ROW_LEFT.toString(), NAME_LEFT);
        this.tblStandardForm.addRow(ROW_RIGHT.toString(), NAME_RIGHT);
        //Init Binary form
        this.tblBinaryForm.addColumn('1', null);

    }

    /**
     * Removes all the representation tables from the DOM
     */
    dropRepresentationTables() {
        this.tblParentArray.drop();
        this.tblStandardForm.drop();
        this.tblBinaryForm.drop();
    }

    /**
     * Finds and sets the root node of the binary tree
     */
    searchRootNode() {
        let multipleRoots = false;
        let firstRoot;
        for (let i in this.parentArray) {
            if (this.parentArray[i] === 0 && firstRoot === undefined)
                firstRoot = i;
            else if (this.parentArray[i] === 0)
                multipleRoots = true;
        }
        if (multipleRoots === false) {
            this.root = firstRoot;
        } else {
            //todo user root select algorithm here
        }
    }

    //2. Representation conversions
    /**
     * Returns the graph as parent array representation
     */
    //Apa tömb
    getParentArray() {
        return this.parentArray;
    }

    /**
     * Returns the graph as bracket representation
     */
    //Teljes zárójeles alak
    getBracketRepresentation() {

    }

    /**
     * Returns the graph as Binary Tree Standard representation
     */
    //Bináris fa standard alakja
    getStandardForm() {
        return this.standardForm;
    }

    /**
     * Returns the graph as Binary representation
     */
    //Bináris alak
    getBinaryRepresentation() {

    }

    //3. Specific algorithms
    /**
     * Preorder Search
     * @param node The node where we start the search
     */
    preorderSearch(node) {
        this.algorithmOutput.push({
            log: VisualNode.getValueByNodeId(node)
        });
        if (this.standardForm[node].left !== 0) {
            this.preorderSearch(this.standardForm[node].left);
        }
        if (this.standardForm[node].right !== 0) {
            this.preorderSearch(this.standardForm[node].right);
        }
    }

    /**
     * Inorder Search
     * @param node The node where we start the search
     */
    inorderSearch(node) {
        if (this.standardForm[node].left !== 0) {
            this.inorderSearch(this.standardForm[node].left);
        }
        this.algorithmOutput.push({
            log: VisualNode.getValueByNodeId(node)
        });
        if (this.standardForm[node].right !== 0) {
            this.inorderSearch(this.standardForm[node].right);
        }
    }

    /**
     * Postorder Search
     * @param node The node where we start the search
     */
    postorderSearch(node) {
        if (this.standardForm[node].left !== 0)
            this.postorderSearch(this.standardForm[node].left);
        if (this.standardForm[node].right !== 0)
            this.postorderSearch(this.standardForm[node].right);
        this.algorithmOutput.push({
            log: VisualNode.getValueByNodeId(node)
        });
    }

    /**
     * Gets the height of the binary tree
     * @param node The node where we start the search
     */
    //Fa magassága
    getHeight(node) {
        let leftTmp = 0, rightTmp = 0;

        if (this.standardForm[node].left === 0 && this.standardForm[node].right === 0) return 0;
        if (this.standardForm[node].left !== 0) leftTmp = this.getHeight(this.standardForm[node].left);
        if (this.standardForm[node].right !== 0) rightTmp = this.getHeight(this.standardForm[node].right);

        return this.findMaxNumber (leftTmp, rightTmp);

    }

    /**
     * Finds a maximum from two numbers. This is a helper function for getHeight.
     * @param leftTmp
     * @param rightTmp
     * @returns {number}
     */
    findMaxNumber(leftTmp, rightTmp) {
        if(leftTmp > rightTmp) return leftTmp + 1;
        else return rightTmp + 1;
    }

    /**
     * Gets the leaves of the binary tree
     */
    //Fa levelei
    getLeaves() {

        for (let i in this.standardForm) {
            if (this.standardForm[i].left === 0 && this.standardForm[i].right === 0)
                this.algorithmOutput.push({
                    log: VisualNode.getValueByNodeId(i)
                })
        }
    }

    /**
     * Gets the direct child nodes of a given node
     * @param indexOfParentNode The node we want the child nodes of
     */
    //Direkt leszármazottak
    getDirectChildNodes(indexOfParentNode) {
        let array = [];

        if (this.standardForm[indexOfParentNode].left != 0) array[1] = this.standardForm[indexOfParentNode].left;
        if (this.standardForm[indexOfParentNode].right != 0) array[2] = this.standardForm[indexOfParentNode].right;
        this.algorithmOutput.push({
            log: VisualNode.getValueByNodeId(array[1])
        });
        this.algorithmOutput.push({
            log: VisualNode.getValueByNodeId(array[2])
        });


    }

    /**
     * Gets all child nodes of a given node
     * @param indexOfParentNode The node we want the child nodes of
     */
    //Összes leszármazott
    getChildNodes(indexOfParentNode) {

    }

}
