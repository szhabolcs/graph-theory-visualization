/**
 * This is the model of the visual representation of a graph.
 * It contains all the functions and methods necessary for this.
 */
class VisualNode {
    sameEndpoint = false;
    editMode = false;
    nodeIndex = 0;
    graph;
    selectedNode = "n/a";

    //Animation
    step = -1;

    /**
     * The remove button overlay on the connections
     * Contains the events for the remove button and for hovering
     * @type (string|{create: (function(*): *|jQuery.fn.init|jQuery|HTMLElement), location: number, id: string, events: {mouseover: events.mouseover, mouseout: events.mouseout, click: events.click}})
     */
    removeBtnOverlay = ["Custom", {
        create: function (component) {
            return $(REMOVE_BTN_HTML);
        },
        events: {
            click: (removeButtonOverlay) => {
                this.removeConnection(removeButtonOverlay.component);
            },
            mouseover: (removeButtonOverlay) => {
                this.jspInstance.select(removeButtonOverlay.component).addClass("connection-hover");
            },
            mouseout: (removeButtonOverlay) => {
                this.jspInstance.select(removeButtonOverlay.component).removeClass("connection-hover");
            }
        },
        location: 0.5,
        id: "remove-button-overlay"
    }];

    /**
     * The constructor initializes the jsPlumb Instance for the visualization,
     * selects the DOM element for the messages, sets the jsPlumb instance for the motion controls
     * and binds the necessary event listeners.
     * @param {jQuery} container The DOM element of the container we use jsPlumb in
     */
    constructor(container) {
        this.jspInstance = jsPlumb.getInstance();
        this.jspInstance.setContainer(container);
        this.DOMContainer = container;
        this.DOMMessage = $("#message");
        setJsPlumbInstanceForMotion(this.jspInstance)

        //Binding the event listeners
        this.jspInstance.bind("connection", (eventInfo) => this.onConnect(eventInfo));
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback
     * Hides the endpoints of the new connection.
     * @param {Object} eventInfo Information about the event
     */
    onConnect(eventInfo) {
        if (this.sameEndpoint === false) {
            this.jspInstance.selectEndpoints(
                {
                    source: eventInfo.source,
                    target: eventInfo.target
                }
            ).removeClass("tilde").addClass("hidden");

            this.addEndpoint(eventInfo.source);
            this.addEndpoint(eventInfo.target);

        } else this.sameEndpoint = false;
    }

    /**
     * onNodeTextChange Event Listener Callback
     * Updates the node texts in the representation tables
     * @param {Object} eventInfo Information about the event
     */
    onNodeTextChange(eventInfo) {
        const nodeId = $(eventInfo.delegateTarget).attr("id");
        const nodeText = $(eventInfo.target).val();
        //Boole matrix
        graph.tblBooleMatrix.updateTable(nodeId, '0', nodeText);
        graph.tblBooleMatrix.updateTable('0', nodeId, nodeText);

        //Incidence matrix
        graph.tblIncidenceMatrix.updateTable(nodeId, '0', nodeText);

        //Adjacency list
        graph.tblAdjacencyList.updateTable(nodeId, '0', nodeText);
        const connections = this.jspInstance.select({
            target: nodeId
        });
        connections.each((connection) => {
            this.graph.tblAdjacencyList.updateTable(connection.sourceId, connection.targetId, nodeText);
        });

        //Edge list
        for (let i in graph.edgeList) {
            if (graph.edgeList[i].source === nodeId)
                this.graph.tblEdgeList.updateTable((Number.parseInt(i) + 1).toString(), SOURCE, nodeText);
            if (graph.edgeList[i].target === nodeId)
                this.graph.tblEdgeList.updateTable((Number.parseInt(i) + 1).toString(), TARGET, nodeText);
        }

    }

    //Base and Helper functions
    /**
     * Hides an endpoint
     * @param {jsPlumb|endpoint} endpoint The endpoint to hide
     */
    hideEndpoint(endpoint) {
        endpoint.addClass("hidden");
    }

    /**
     * This function adds a new node and sets it up
     * Adds the node to the DOM, binds the necessary event listeners to it,
     * sets its properties and adds it to the memory.
     * @param {string} top Position relative to the top left corner of the document
     * @param {string} left Position relative to the top left corner of the document
     */
    addNode(top = "50%", left = "50%") {     /*Inserts new node*/
        //Declarations
        //Init of the JsPlumb Instance
        let insertedBox;

        //Insertion of the box into the container
        $(NODE_HTML).hide().appendTo("#container").fadeIn(150);
        insertedBox = DOMContainer.children(".node").last();

        //Auto indexing
        insertedBox.find("input").val(this.getIndex);


        //Binding event listeners
        insertedBox.on("click", ".remove-btn", (eventInfo) => this.removeNode(eventInfo.delegateTarget));
        insertedBox.on("mouseover", ".remove-btn", (eventInfo) => $(eventInfo.delegateTarget).addClass("node-remove-hover"));
        insertedBox.on("mouseout", ".remove-btn", (eventInfo) => $(eventInfo.delegateTarget).removeClass("node-remove-hover"));
        insertedBox.on("change", ".node-text", (eventInfo) => this.onNodeTextChange(eventInfo));
        $(insertedBox).find(".node-text").inputfit();

        insertedBox.css({
            top: top,
            left: left
        });

        this.jspInstance.draggable(insertedBox, {
            grid: [10, 10],
            containment: true
        });
        this.graph.addNewNode(insertedBox.attr("id"));
        this.graph.addNodeToTable(insertedBox.attr("id"), VisualNode.getValueFromNode(insertedBox));
        return insertedBox;
    }

    /**
     * Removes a node from the visualized graph.
     * Removes the node from the DOM and from the memory.
     * @param {string} nodeId Id of the node to remove
     */
    removeNode(nodeId) {
        this.jspInstance.deleteConnectionsForElement(nodeId);
        this.jspInstance.removeAllEndpoints(nodeId);
        this.jspInstance.remove(nodeId);
        this.graph.removeNode($(nodeId).attr("id"));
    }

    /**
     * Removes a connection between two nodes.
     * Removes the connection from the DOM and also from the memory.
     * @param {jsPlumb|connection} connection jsPlumb connection
     */
    removeConnection(connection) {
        const edge = {
            source: $(connection.source).attr("id"),
            target: $(connection.target).attr("id")
        };
        this.jspInstance.deleteConnection(connection);
        this.graph.removeEdge(edge);
    }

    /**
     * Removes and endpoint from a node
     * @param {string} endpointId Id of the actual endpoint to remove
     */
    removeEndpoint(endpointId) {
        this.jspInstance.deleteEndpoint(endpointId);
    }

    /**
     * Enables the edit mode for the graph editor.
     * Sets new connection endpoint to visible, enables the text input on the node,
     * enables the remove buttons and switches off view mode.
     */
    enableEditMode() {
        const $nodeText = $(".node-text");
        $(".tilde").removeClass("hidden");
        $nodeText.addClass("node-text-border");
        $nodeText.prop('disabled', false);
        $(".remove-btn").removeClass("hidden");
        $(".node").removeClass("in-view-mode");
        this.editMode = true;
    }

    /**
     * Disables the edit mode for the graph editor.
     * Sets new connection endpoint to invisible, disables the text input on the node,
     * disables the remove buttons and switches on view mode.
     *
     */
    disableEditMode() {
        const $nodeText = $(".node-text");
        $(".tilde").addClass("hidden");
        $nodeText.removeClass("node-text-border");
        $nodeText.prop('disabled', true);
        $(".remove-btn").addClass("hidden");
        $(".node").addClass("in-view-mode");
        this.editMode = false;
        this.resetGraph();
    }

    /**
     * Toggles the edit mode
     */
    toggleEditMode() {
        if (this.editMode) {
            this.disableEditMode();
        } else {
            this.enableEditMode();
        }
    }

    /**
     * Marks a node in the visual representation of the graph
     * Sets the color of it to green
     * @param {string} nodeId The id of the node to mark
     */
    nodeMarkOn(nodeId) {
        $(".node[id='" + nodeId + "']").addClass("node-mark");
    }

    /**
     * Removes the mark from a node in the visual representation of the graph
     * Resets the color of it from green
     * @param {string} nodeId The id of the node to remove the mark from
     */
    nodeMarkOff(nodeId) {
        $(".node[id='" + nodeId + "']").removeClass("node-mark");
    }

    /**
     * Marks a connection in the visual representation of the graph.
     * Sets the color of it to green
     * @param {jsPlumb|connection} connection The jsPlumb connection to mark
     */
    connectionMarkOn(connection) {
        if(connection.source != null && connection.target != null){
            this.jspInstance.select({
                source: connection.source,
                target: connection.target
            }).addClass("connection-mark");
        }
    }

    /**
     * Removes a mark from a connection in the visual representation of the graph.
     * Resets the color of it from green
     * @param {jsPlumb|connection} connection The jsPlumb connection to remove the mark from
     */
    connectionMarkOff(connection) {
        this.jspInstance.select({
            source: connection.source,
            target: connection.target
        }).removeClass("connection-mark");
    }

    /**
     * Shows a message to the user
     * @param {string} message The message that's going to be displayed
     */
    showMessage(message) {
        this.DOMMessage.text(message);
        this.DOMMessage.fadeIn();
    }

    /**
     * Removes the message from the DOM
     */
    removeMessage() {
        this.DOMMessage.fadeOut();
    }

    /**
     * This function is fired when the user is in node selection mode.
     * It sets the clicked node as the selected one.
     * @param {Object} eventInfo Information about the event
     */
    nodeSelect(eventInfo) {
        this.selectedNode = eventInfo.currentTarget.id;
        DOMContainer.undelegate(".node", "click");
        DOMContainer.undelegate(".node", "mouseenter mouseleave");
        this.removeMessage();
        this.graph.runAlgorithm(menuItems.selectedAlgorithm);
    }

    /**
     * This function is fired when the user hovers over a node in node selection mode.
     * Adds a border to the hovered node.
     */
    nodeHover() {
        $(this).toggleClass("node-hover");
    }

    /**
     * Initiates node selection
     * @param {String} message The message to be shown
     */
    selectNode(message) {
        this.showMessage(message);
        this.selectedNode = "none";
        this.DOMContainer.delegate(".node", "click", this.nodeSelect.bind(this));
        this.DOMContainer.delegate(".node", "mouseenter mouseleave", this.nodeHover);
    }

    /**
     * Clears the selected node
     */
    clearSelectedNode() {
        this.selectedNode = "n/a";
        $(".node-hover").removeClass("node-hover");
    }

    /**
     * Resets the animation. Iterates through all the nodes and connections
     * and removes the marks from them.
     */
    resetGraph() {
        this.clearSelectedNode();
        this.graph.resetAlgorithm();
        this.step = -1;
        for (let i in graph.edgeList) {
            this.nodeMarkOff(graph.edgeList[i].source);
            this.nodeMarkOff(graph.edgeList[i].target);
            this.connectionMarkOff({
                source: graph.edgeList[i].source,
                target: graph.edgeList[i].target
            })
        }
    }

    /**
     * Goes one step forward in the animation
     */
    goOneStepForward() {
        let step;
        if (this.step < this.graph.algorithmOutput.length - 1) {
            ++this.step;
            step = this.step;
            const algorithmStep = this.graph.algorithmOutput[step];
            const connection = {
                source: algorithmStep.from,
                target: algorithmStep.to
            };
            this.nodeMarkOn(algorithmStep.from);
            this.connectionMarkOn(connection);
            this.nodeMarkOn(algorithmStep.to);
        }


    }

    /**
     * Goes one step backwards in the animation
     */
    goOneStepBackwards() {
        const step = this.step;
        if (step >= 0) {
            const algorithmStep = this.graph.algorithmOutput[step];
            const connection = {
                source: algorithmStep.from,
                target: algorithmStep.to
            };
            this.nodeMarkOff(algorithmStep.to);
            this.connectionMarkOff(connection);
            this.step--;
        }
    }

    /**
     * Plays the animation
     */
    play() {
        this.selectNode(STARTUP_NODE_MSG);


    }

    /**
     * Pauses the animation
     */
    pause() {

    }

    /**
     * Continues playing the animation
     */
    continueAnimation() {

    }

    //Getters and setters
    /**
     * Gives a new index to a new node
     * @returns {number} Index of a node
     */
    get getIndex() {
        this.nodeIndex++;
        return this.nodeIndex;
    }

    /**
     * Sets the memory object model to the VisualNode
     * @param {GenericGraph} graph The memory object model of the graph
     */
    setGraph(graph) {
        this.graph = graph;
    }

    /**
     * Gets the selected node of the VisualNode
     * @returns {string} The id of the selected node
     */
    get getSelectedNode() {
        return this.selectedNode;
    }

    //Static functions
    /**
     * Gets the text from the input field from a node
     * @param {HTMLElement} node The DOM element of a node
     * @returns {string} The text from the node
     */
    static getValueFromNode(node) {
        return $(node).find("input").val();
    }

    /**
     * Gets the text from the input field from a node
     * @param {string} nodeId The id of the node
     * @returns {string} The text from the node
     */
    static getValueByNodeId(nodeId) {
        return this.getValueFromNode($(".node[id='" + nodeId + "']"));
    }

}

/**
 * This is the model of the visual representation of a directed graph
 * @extends VisualNode
 */
class DirectedNode extends VisualNode {
    /**
     * Calls the constructor of its superclass
     * @param {jQuery} container The DOM element of the container we use jsPlumb in
     */
    constructor(container) {
        super(container);
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback.
     * Prevents multiple connections between the same nodes and adds
     * the edge to the memory as well as to the representation tables
     * @param {Object} eventInfo Information about the event
     */
    onConnect(eventInfo) {
        const existingOnwardsConnections = this.jspInstance.select({
            source: eventInfo.source,
            target: eventInfo.target
        });
        const existingBackwardsConnections = this.jspInstance.select({
            source: eventInfo.target,
            target: eventInfo.source
        })
        super.onConnect(eventInfo);
        if (existingOnwardsConnections.length > 1 || existingBackwardsConnections.length > 1) {
            this.jspInstance.deleteConnection(eventInfo.connection);
        } else {
            const edge = {
                source: $(eventInfo.source).attr("id"),
                target: $(eventInfo.target).attr("id")
            };
            this.graph.addNewEdge(edge);
            this.graph.addEdgeToTable(edge);
        }
    }

    //Base and helper functions
    /**
     * Adds a node to the visualized graph
     * @param {string} top Position value from the top
     * @param {string} left Position value from the left
     */
    addNode(top = "50%", left = "50%") {
        const insertedBox = super.addNode(top, left);
        this.addEndpoint(insertedBox);
    }

    /**
     * Adds the New Connection endpoint to a given node
     * @param {string} nodeId The id of the node
     */
    addEndpoint(nodeId) {
        this.jspInstance.addEndpoint(nodeId, {
            isSource: true,
            isTarget: true,
            endpoint: ["Dot", {cssClass: "tilde"}],
            anchor: ["Perimeter", {shape: "Circle"}],
            connector: "Straight",
            connectorOverlays: [
                ["PlainArrow", {width: 15, location: 1, height: 10, id: "arrow"}],
                this.removeBtnOverlay
            ]
        });
    }

}

/**
 * This is the model of the visual representation of a undirected graph
 * @extends VisualNode
 */
class UnDirectedNode extends VisualNode {
    /**
     * Calls the constructor of its superclass
     * @param {jQuery} container The DOM element of the container we use jsPlumb in
     */
    constructor(container) {
        super(container);
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback.
     * Prevents multiple connections between the same nodes and adds
     * the edge to the memory as well as to the representation tables
     * @param {Object} eventInfo Information about the event
     */
    onConnect(eventInfo) {
        const existingOnwardsConnections = this.jspInstance.select({
            source: eventInfo.source,
            target: eventInfo.target
        });
        const existingBackwardsConnections = this.jspInstance.select({
            source: eventInfo.target,
            target: eventInfo.source
        })
        super.onConnect(eventInfo);
        if (existingOnwardsConnections.length > 1 || existingBackwardsConnections.length > 0) {
            this.jspInstance.deleteConnection(eventInfo.connection);
        } else {
            const edge = {
                source: $(eventInfo.source).attr("id"),
                target: $(eventInfo.target).attr("id")
            };
            this.graph.addNewEdge(edge);
            this.graph.addEdgeToTable(edge);
        }

    }

    //Base and helper functions
    /**
     * Adds a node to the visualized graph
     * @param {string} top Position value from the top
     * @param {string} left Position value from the left
     */
    addNode(top = "50%", left = "50%") {
        const insertedBox = super.addNode(top, left);
        this.addEndpoint(insertedBox);
    }

    /**
     * Adds an endpoint to a given node
     * @param {string} nodeId The id of the node
     */
    addEndpoint(nodeId) {
        this.jspInstance.addEndpoint(nodeId, {
            isSource: true,
            isTarget: true,
            endpoint: ["Dot", {cssClass: "tilde"}],
            anchor: ["Perimeter", {shape: "Circle"}],
            connector: "Straight",
            allowLoopback: false,
            connectorOverlays: [
                ["PlainArrow", {width: 15, location: 1, height: 10, id: "arrow", cssClass: "hidden"}],
                this.removeBtnOverlay
            ]
        });
    }

    /**
     * Marks a connection in the visual representation of the graph.
     * Sets the color of it to green
     * This one overrides the original function, in order to fix issue #2
     * @param {jsPlumb|connection} connection The jsPlumb connection to mark
     */
    connectionMarkOn(connection) {
        if(connection.source != null && connection.target != null){
            this.jspInstance.select({
                source: connection.source,
                target: connection.target
            }).addClass("connection-mark");

            this.jspInstance.select({
                source: connection.target,
                target: connection.source
            }).addClass("connection-mark");
        }
        
    }


    /**
     * Removes a mark from a connection in the visual representation of the graph.
     * Resets the color of it from green
     * This one overrides the original function, in order to fix issue #2
     * @param {jsPlumb|connection} connection The jsPlumb connection to remove the mark from
     */
    connectionMarkOff(connection) {
        this.jspInstance.select({
            source: connection.source,
            target: connection.target
        }).removeClass("connection-mark");

        this.jspInstance.select({
            source: connection.target,
            target: connection.source
        }).removeClass("connection-mark");
    }
}

/**
 * This is the model of the visual representation of a binary tree
 * @extends VisualNode
 */
class BinaryNode extends VisualNode {
    constructor(container) {
        super(container);

        //Binding the event listeners
        this.jspInstance.bind("connectionDetached", (eventInfo) => this.onConnectionDetached(eventInfo));

    }

    //Event listeners
    /**
     * onConnect Event Listener Callback.
     * Prevents multiple connections between the same nodes and adds
     * the edge to the memory as well as to the representation tables
     * @param {Object} eventInfo Information about the event
     */
    onConnect(eventInfo) {
        //Prevent loopback connections
        if (eventInfo.sourceId === eventInfo.targetId) {
            this.jspInstance.deleteConnection(eventInfo.connection);
        }
        let edge = {
            source: eventInfo.sourceId,
            target: eventInfo.targetId
        };

        this.graph.addNewEdge(edge, this.checkSourceType(eventInfo.sourceEndpoint));
        this.graph.addEdgeToTable(edge, this.checkSourceType(eventInfo.sourceEndpoint));

    }

    /**
     * onConnectionDetached Event Listener Callback
     * Removes an edge from the representation tables
     * @param {Object} eventInfo Information about the event
     */
    onConnectionDetached(eventInfo) {
        const edge = {
            source: $(eventInfo.source).attr("id"),
            target: $(eventInfo.target).attr("id")
        };
        this.graph.removeEdgeFromTable(edge, this.checkSourceType(eventInfo.sourceEndpoint));
    }

    //Base and helper functions
    /**
     * Adds a node to the visualized graph
     * @param {string} top Position value from the top
     * @param {string} left Position value from the left
     */
    addNode(top = "50%", left = "50%") {
        const insertedBox = super.addNode(top, left);
        this.jspInstance.addEndpoint(insertedBox, {
            endpoint: ["Dot", {cssClass: "tilde"}],
            isSource: true,
            anchor: [0.2, 0.9, -1, -1],
            connector: "Straight",
            deleteEndpointsOnDetach: false,
            allowLoopback: false,
            connectorOverlays: [
                this.removeBtnOverlay
            ]
        });
        this.jspInstance.addEndpoint(insertedBox, {
            endpoint: ["Dot", {cssClass: "tilde"}],
            isSource: true,
            anchor: [0.8, 0.9, -1, -1],
            connector: "Straight",
            deleteEndpointsOnDetach: false,
            allowLoopback: false,
            connectorOverlays: [
                this.removeBtnOverlay
            ]
        });
        this.jspInstance.addEndpoint(insertedBox, {
            isTarget: true,
            anchor: [
                [0.5, 0, 0, 0],
                [0.2, 0.1, 0, 0],
                [0.8, 0.1, 0, 0]
            ],
            deleteEndpointsOnDetach: false,
            allowLoopback: false,
            endpoint: ["Dot", {cssClass: "tilde"}],
            connector: "Straight"
        });
    }


    /**
     * Checks whether a connection is connected to the left or right side of a root node
     * @param {jsPlumb|endpoint} sourceEndpoint The source endpoint of a binary tree connection
     * @returns {number} TYPE_LEFT or TYPE_RIGHT
     */
    checkSourceType(sourceEndpoint) {

        if (sourceEndpoint.anchor.x < 0.5)
            return TYPE_LEFT;
        else
            return TYPE_RIGHT;

    }

    /**
     * onNodeTextChange Event Listener Callback
     * Updates the node texts in the representation tables
     * @param {Object} eventInfo Information about the event
     */
    onNodeTextChange(eventInfo) {
        const nodeId = $(eventInfo.delegateTarget).attr("id");
        const nodeText = $(eventInfo.target).val();
        //Parent array
        this.graph.tblParentArray.updateTable('0', nodeId, nodeText);
        const connectionsBySource = this.jspInstance.select({
            source: nodeId
        });
        connectionsBySource.each((connection) => {
            this.graph.tblParentArray.updateTable('1', connection.targetId, nodeText);
        });

        //Standard form
        this.graph.tblStandardForm.updateTable('0', nodeId, nodeText);
        const connectionsByTarget = this.jspInstance.select({
            target: nodeId
        });
        let sourceType;
        connectionsByTarget.each((connection) => {
            //Standard form
            sourceType = this.checkSourceType(connection.endpoints[0]);
            if (sourceType === TYPE_LEFT) {
                graph.tblStandardForm.updateTable(ROW_LEFT, connection.sourceId, nodeText);
            } else if (sourceType === TYPE_RIGHT) {
                graph.tblStandardForm.updateTable(ROW_RIGHT, connection.sourceId, nodeText);
            }

        });

        //Binary form
        this.graph.tblBinaryForm.updateTable(nodeId, '0', nodeText);

    }

    /**
     * This function is fired when the user is in node selection mode.
     * It sets the clicked node as the selected one.
     * @param {Object} eventInfo Information about the event
     */
    nodeSelect(eventInfo) {
        this.selectedNode = eventInfo.currentTarget.id;
        this.root = this.selectedNode;
        DOMContainer.undelegate(".node", "click", this.nodeSelect);
        DOMContainer.undelegate(".node", "mouseenter mouseleave", this.nodeHover);
        this.removeMessage();
        this.graph.runAlgorithm(menuItems.selectedAlgorithm);
    }

    /**
     * Resets the animation. Iterates through all the nodes and connections
     * and removes the marks from them.
     */
    resetGraph() {
        this.clearSelectedNode();
        this.graph.resetAlgorithm();
        this.step = -1;
        for (let i in graph.parentArray) {
            this.nodeMarkOff(i);
            if (graph.parentArray[i] !== 0)
                this.connectionMarkOff({
                    source: graph.parentArray[i],
                    target: i
                })
        }
    }

    /**
     * Goes one step forward in the animation
     */
    goOneStepForward() {
        let step;
        if (this.step < this.graph.algorithmOutput.length - 1) {
            ++this.step;
            step = this.step;
            const algorithmStep = this.graph.algorithmOutput[step];
            const connection = {
                source: this.graph.getParentArray()[algorithmStep.node],
                target: algorithmStep.node
            };
            this.nodeMarkOn(algorithmStep.node);
            this.connectionMarkOn(connection);
        }


    }

    /**
     * Goes one step backwards in the animation
     */
    goOneStepBackwards() {
        const step = this.step;
        if (step > -1) {
            const algorithmStep = this.graph.algorithmOutput[step];
            const connection = {
                source: this.graph.getParentArray()[algorithmStep.node],
                target: algorithmStep.node
            };
            this.nodeMarkOff(algorithmStep.node);
            this.connectionMarkOff(connection);
            this.step--;
        }
    }


    /**
     * Plays the animation
     */
    play() {
        this.graph.searchRootNode();
    }

}