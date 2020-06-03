class VisualNode {
    sameEndpoint = false;
    editMode = false;
    nodeIndex = 0;
    graph;

    /**
     * The remove button overlay on the connections
     * Contains the events for the remove button and for hovering
     * @type {(string|{create: (function(*): *|jQuery.fn.init|jQuery|HTMLElement), location: number, id: string,
     *       events: {mouseover: events.mouseover, mouseout: events.mouseout, click: events.click}})[]}
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

    constructor(container) {
        this.jspInstance = jsPlumb.getInstance();
        this.jspInstance.setContainer(container);
        this.DOMContainer = container;
        setJsPlumbInstanceForMotion(this.jspInstance)

        //Binding the event listeners
        this.jspInstance.bind("connection", (eventInfo) => this.onConnect(eventInfo));
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback
     * @param eventInfo Information about the event
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

            const edge = {
                source: $(eventInfo.source).attr("id"),
                target: $(eventInfo.target).attr("id")
            };
            this.graph.addNewEdge(edge);
            this.graph.addEdgeToTable(edge);
        } else this.sameEndpoint = false;
    }

    /**
     * onNodeTextChange Event Listener Callback
     * @param eventInfo
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
     * @param endpoint
     */
    hideEndpoint(endpoint) {
        endpoint.addClass("hidden");
    }

    /**
     * This function adds a new node and sets it up
     * @param top position relative to the top left corner of the document
     * @param left position relative to the top left corner of the document
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
            grid: [10, 10]
        });
        this.graph.addNewNode(insertedBox.attr("id"));
        this.graph.addNodeToTable(insertedBox.attr("id"), VisualNode.getValueFromNode(insertedBox));
        return insertedBox;
    }

    /**
     * Removes a node from the visualized graph
     * @param nodeId Id of the node to remove
     */
    removeNode(nodeId) {
        this.jspInstance.deleteConnectionsForElement(nodeId);
        this.jspInstance.removeAllEndpoints(nodeId);
        this.jspInstance.remove(nodeId);
        this.graph.removeNode($(nodeId).attr("id"));
    }

    /**
     * Removes a connection between two nodes
     * @param connection jsPlumb connection
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
     * @param endpointId Id of the actual endpoint to remove
     */
    removeEndpoint(endpointId) {
        this.jspInstance.deleteEndpoint(endpointId);
    }

    /**
     * Enables the edit mode for the graph editor
     */
    enableEditMode() {
        const $nodeText = $(".node-text");
        $(".tilde").removeClass("hidden");
        $nodeText.addClass("node-text-border");
        $nodeText.prop('disabled', false);
        $(".remove-btn").removeClass("hidden");
        this.editMode = true;
    }

    /**
     * Disables the edit mode for the graph editor
     */
    disableEditMode() {
        const $nodeText = $(".node-text");
        $(".tilde").addClass("hidden");
        $nodeText.removeClass("node-text-border");
        $nodeText.prop('disabled', true);
        $(".remove-btn").addClass("hidden");
        this.editMode = false;
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

    resetGraph() {

    }

    goOneStepForward() {

    }

    goOneStepBackwards() {

    }

    updateGraphInMemory() {

    }

    loadGraphFromMemory() {

    }

    //Getters and setters
    /**
     * Gives a new index to a new node
     * @returns {number} index of a node
     */
    get getIndex() {
        this.nodeIndex++;
        return this.nodeIndex;
    }

    setGraph(graph) {
        this.graph = graph;
    }

    //Static functions
    /**
     * Returns the text from a node
     * @param node string
     */
    static getValueFromNode(node) {
        return $(node).find("input").val();
    }

}

class DirectedNode extends VisualNode {

    constructor(container) {
        super(container);
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback
     * @param eventInfo Information about the event
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
        }
    }

    //Base and helper functions
    /**
     * Adds a node to the visualized graph
     * @param top Position value from the top
     * @param left Position value from the left
     */
    addNode(top = "50%", left = "50%") {
        const insertedBox = super.addNode(top, left);
        this.addEndpoint(insertedBox);
    }

    /**
     * Adds an endpoint to a given node
     * @param nodeId
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

class UnDirectedNode extends VisualNode {
    constructor(container) {
        super(container);
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback
     * @param eventInfo INformation about the event
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
        }
        const reverseEdge = {
            source: $(eventInfo.target).attr("id"),
            target: $(eventInfo.source).attr("id")
        };
    }

    //Base and helper functions
    /**
     * Adds a node to the visualized graph
     * @param top Position value from the top
     * @param left Position value from the left
     */
    addNode(top = "50%", left = "50%") {
        const insertedBox = super.addNode(top, left);
        this.addEndpoint(insertedBox);
    }

    /**
     * Adds an endpoint to a given node
     * @param nodeId
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

}

class BinaryNode extends VisualNode {
    constructor(container) {
        super(container);

        //Binding the event listeners
        this.jspInstance.bind("connectionDetached", (eventInfo) => this.onConnectionDetached(eventInfo));

    }

    //Event listeners
    /**
     * onConnect Event Listener Callback
     * @param eventInfo Information about the event
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
     * @param eventInfo Information about the event
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
     * @param top Position value from the top
     * @param left Position value from the left
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
     * @param connection jsPlumb connection
     * @returns {number} TYPE_LEFT or TYPE_RIGHT
     */
    checkSourceType(sourceEndpoint) {

        if (sourceEndpoint.anchor.x < 0.5)
            return TYPE_LEFT;
        else
            return TYPE_RIGHT;

    }

    /**
     * Disables the edit mode in the graph editor
     */
    disableEditMode() {
        super.disableEditMode();
        this.graph.searchRootNode();
    }

    /**
     * onNodeTextChange Event Listener Callback
     * @param eventInfo
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

}