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
    animationInitialized = false;

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
        location: 0.75,
        id: "remove-button-overlay"
    }];

    weightInputOverlay = ["Custom", {
        create: (component) => {
            const $weightInput = $(WEIGHT_INPUT_HTML);
            return $weightInput;
        },

        location: 0.25,
        id: "weight-input-overlay"
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
        $Document.off("change", ".weight-text");
        $Document.on("change", ".weight-text", (eventInfo) => this.onWeightChange(eventInfo));
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback
     * Hides the endpoints of the new connection.
     * @param {Object} eventInfo Information about the event
     */
    onConnect(eventInfo) {

        //Adds source and target to overlay metadata
        const $weightInputOverlay = $(eventInfo.connection._jsPlumb.overlays['weight-input-overlay'].canvas);
        $weightInputOverlay.data({
            "source": eventInfo.sourceId,
            "target": eventInfo.targetId
        });
        $weightInputOverlay.children("input").inputfit();

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
        this.graph.tblAdjacencyList.updateTable(nodeId, '0', nodeText);
        //Adjacency list
        let connections = this.jspInstance.select({
            target: nodeId
        });
        connections.each((connection) => {
            this.graph.tblAdjacencyList.updateTable(connection.sourceId, connection.targetId, nodeText);//*/
        });
        connections = this.jspInstance.select({
            source: nodeId
        });
        connections.each((connection) => {
            this.graph.tblAdjacencyList.updateTable(connection.targetId, connection.sourceId, nodeText);
        });


        //Edge list
        for (let i in graph.edgeList) {
            if (graph.edgeList[i].source === nodeId)
                this.graph.tblEdgeList.updateTable((Number.parseInt(i) + 1).toString(), SOURCE, nodeText);
            if (graph.edgeList[i].target === nodeId)
                this.graph.tblEdgeList.updateTable((Number.parseInt(i) + 1).toString(), TARGET, nodeText);
        }

    }

    /**
     * onWeightChange Event Listener Callback
     * Changes the weight of the edge in memory.
     * @param {Object} eventInfo Information about the event
     */
    onWeightChange(eventInfo) {
        const $weightInput = $(eventInfo.target);
        const $weightInputOverlay = $weightInput.parent();
        const weightValue = $weightInput.val();
        let indexOfEdge;
        if (weightValue !== Number.parseInt(weightValue).toString()) {
            this.showMessage(NOT_A_NUMBER_WARNING_MSG);
            this.removeMessage(2000);
        } else {
            let edge = {
                source: $weightInputOverlay.data("source"),
                target: $weightInputOverlay.data("target"),
                weight: Number.parseInt(weightValue)
            };
            indexOfEdge = this.graph.searchEdge(edge);
            this.graph.updateWeight(edge, indexOfEdge);
            this.graph.updateWeightInTables(edge, indexOfEdge);
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
        insertedBox.on("click", ".remove-btn", (eventInfo) => this.removeNode(eventInfo.delegateTarget, true));
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
     * @param {boolean} removeFromMemory It removes the given node from memory if true
     */
    removeNode(nodeId, removeFromMemory = false) {
        this.jspInstance.deleteConnectionsForElement(nodeId);
        this.jspInstance.removeAllEndpoints(nodeId);
        this.jspInstance.remove(nodeId);
        if (removeFromMemory)
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
        const $weightText = $(".weight-text");
        $(".tilde").removeClass("hidden");
        $nodeText.addClass("node-text-border");
        $weightText.addClass("node-text-border");
        $nodeText.prop('disabled', false);
        $weightText.prop('disabled', false);
        $(".remove-btn").removeClass("hidden");
        $(".node").removeClass("in-view-mode");
        $weightText.removeClass("hidden");
        this.editMode = true;
        this.resetGraph();
    }

    /**
     * Disables the edit mode for the graph editor.
     * Sets new connection endpoint to invisible, disables the text input on the node,
     * disables the remove buttons and switches in view mode.
     *
     */
    disableEditMode() {
        const $nodeText = $(".node-text");
        const $weightText = $(".weight-text");
        $(".tilde").addClass("hidden");
        $nodeText.removeClass("node-text-border");
        $weightText.removeClass("node-text-border");
        $nodeText.prop('disabled', true);
        $(".remove-btn").addClass("hidden");
        $(".node").addClass("in-view-mode");
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
     * Marks all of the nodes in the visual representation of the graph
     */
    markAllNodes() {
        for (let i in this.graph.booleMatrix) {
            this.nodeMarkOn(i);
        }
    }

    /**
     * Removes the mark from all of the nodes in the visual representation of the graph
     */
    unMarkAllNodes() {
        for (let i in this.graph.booleMatrix) {
            this.nodeMarkOff(i);
        }
    }

    /**
     * Marks a connection in the visual representation of the graph.
     * Sets the color of it to green
     * @param {jsPlumb|connection} connection The jsPlumb connection to mark
     */
    connectionMarkOn(connection) {
        if (connection.source != null && connection.target != null) {
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
        this.DOMMessage.html('<i class="fas fa-exclamation-circle"style="padding:5px;"></i> ' + $.i18n(message));
        this.DOMMessage.fadeIn();
    }

    /**
     * Removes the message from the DOM
     * @param {Number} delay Number of ms to delay before message dissapearance
     */
    removeMessage(delay = 0) {
        setTimeout(() => {
            this.DOMMessage.fadeOut();
        }, delay);
    }

    /**
     * This function is fired when the user is in node selection mode.
     * It sets the clicked node as the selected one.
     * @param {Object} eventInfo Information about the event
     */
    nodeSelected(eventInfo) {
        this.selectedNode = eventInfo.currentTarget.id;
        DOMContainer.undelegate(".node", "click");
        DOMContainer.undelegate(".node", "mouseenter mouseleave");
        this.removeMessage();
        this.graph.runAlgorithm(menuItems.selectedAlgorithm);
        this.loadSteps();
        this.loadOutput();
        this.animationTimer = setInterval(() => this.goOneStepForward(), STEP_TIME);
        this.switchToPauseButton();
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
        this.DOMContainer.delegate(".node", "click", this.nodeSelected.bind(this));
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
        this.animationInitialized = false;
        clearInterval(this.animationTimer);
        this.switchToPlayButton();
        this.clearSelectedNode();
        this.clearSteps();
        this.clearOutput();
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
     * Load the steps of the algorithm to the step section
     */
    loadSteps() {
        const algorithmOutput = this.graph.algorithmOutput;
        const $stepsBody = $('#steps-body');
        let from;
        let to;
        let fromValue;
        let toValue;
        for (let i = 0; i < algorithmOutput.length; i++) {

            if (algorithmOutput[i].hasOwnProperty("info")) {
                $stepsBody.append("<div class=\"step\"><span>" + algorithmOutput[i].info +
                    "</span></div>");
            } else if (!algorithmOutput[i].hasOwnProperty("unmark")) {

                from = algorithmOutput[i].from;
                to = algorithmOutput[i].to;
                if (from !== null) {
                    fromValue = VisualNode.getValueByNodeId(from);
                    toValue = VisualNode.getValueByNodeId(to);
                    $stepsBody.append("<div class=\"step\"><span>" + fromValue +
                        " <i class=\"fas fa-long-arrow-alt-right\"></i> " + toValue +
                        "</span></div>");
                }
            }
        }
    }

    /**
     * Loads the output of the algorithm to the DOM
     */
    loadOutput() {
        const algorithmOutput = this.graph.algorithmOutput;
        const $outputBody = $('#output-body');
        for (let i in algorithmOutput.log) {
            $outputBody.append(algorithmOutput.log[i] + " ");
        }
    }

    /**
     * Clears the steps DOM section
     */
    clearSteps() {
        $("#steps-body").text("");
    }

    /**
     * Clears the output DOM section
     */
    clearOutput() {
        $("#output-body").text("");
    }

    /**
     * Goes one step forward in the animation
     */
    goOneStepForward() {
        let step;
        let connection;
        let $step;
        if (this.step < this.graph.algorithmOutput.length - 1) {
            ++this.step;
            step = this.step;
            const algorithmStep = this.graph.algorithmOutput[step];
            if (algorithmStep.hasOwnProperty("markAll"))
                this.markAllNodes();
            if (algorithmStep.hasOwnProperty("info")) {
                $step = $("#steps-body").find(".step:not(.active-step):first");
                $step.addClass("active-step");
            } else if (algorithmStep.from !== null) {
                $step = $("#steps-body").find(".step:not(.active-step):first");
                $step.addClass("active-step");
            }
            if (algorithmStep.hasOwnProperty("unmark")) {

                for (let i = 1; i < algorithmStep.unmark.length; i++) {
                    connection = {
                        source: algorithmStep.unmark[i - 1],
                        target: algorithmStep.unmark[i]
                    }
                    this.connectionMarkOff(connection);
                }

            } else {
                connection = {
                    source: algorithmStep.from,
                    target: algorithmStep.to
                };
                this.nodeMarkOn(algorithmStep.from);
                this.connectionMarkOn(connection);
                this.nodeMarkOn(algorithmStep.to);
            }

        } else if (Object.keys(this.graph.adjacencyList) === undefined || Object.keys(this.graph.adjacencyList).length == 0) {
            this.showMessage(EMPTY_GRAPH_WARNING_MSG);
            this.removeMessage(2000);
        } else if (this.editMode == true) {
            this.showMessage(EDIT_MODE_ON_WARNING_MSG);
            this.removeMessage(3000);
        } else if (this.selectedNode === "n/a" && menuItems.selectedAlgorithm !== ID_KRUSKAL) {
            this.showMessage(ALGORITHM_NOT_STARTED_MSG);
            this.removeMessage(3000);
        } else {
            this.showMessage(NO_MORE_STEPS_MSG);
            clearInterval(this.animationTimer);
            this.switchToPlayButton();
            this.removeMessage(2000);
        }
    }

    /**
     * Goes one step backwards in the animation
     */
    goOneStepBackwards() {
        const step = this.step;
        let connection;
        let $step;
        if (step >= 0) {
            const algorithmStep = this.graph.algorithmOutput[step];

            if (algorithmStep.from !== null) {
                $step = $("#steps-body").find(".active-step:last");
                $step.removeClass("active-step");
            }

            if (algorithmStep.hasOwnProperty("markAll"))
                this.unMarkAllNodes();

            if (algorithmStep.hasOwnProperty("unmark")) {

                for (let i = 1; i < algorithmStep.unmark.length; i++) {
                    connection = {
                        source: algorithmStep.unmark[i - 1],
                        target: algorithmStep.unmark[i]
                    }
                    this.connectionMarkOn(connection);
                }

            } else {
                connection = {
                    source: algorithmStep.from,
                    target: algorithmStep.to
                };
                if (menuItems.selectedAlgorithm !== ID_KRUSKAL)
                    this.nodeMarkOff(algorithmStep.to);
                this.connectionMarkOff(connection);
            }
            this.step--;
        } else if (Object.keys(this.graph.adjacencyList) === undefined || Object.keys(this.graph.adjacencyList).length == 0) {
            this.showMessage(EMPTY_GRAPH_WARNING_MSG);
            this.removeMessage(2000);
        } else if (this.editMode == true) {
            this.showMessage(EDIT_MODE_ON_WARNING_MSG);
            this.removeMessage(3000);
        } else if (this.selectedNode === "n/a" && menuItems.selectedAlgorithm !== ID_KRUSKAL) {
            this.showMessage(ALGORITHM_NOT_STARTED_MSG);
            this.removeMessage(3000);
        } else {
            this.showMessage(NO_PREVIOUS_STEPS_MSG);
            this.removeMessage(2000);
        }
    }

    /**
     * Plays the animation
     */
    play() {
        if (this.animationInitialized === false) {
            this.initAnimation();
        } else {
            this.animationTimer = setInterval(() => this.goOneStepForward(), STEP_TIME);
            this.switchToPauseButton();
        }
    }

    /**
     * Initializes the animation
     */
    initAnimation() {
        if (menuItems.selectedAlgorithm === ID_KRUSKAL) {
            if (this.editMode === true) {
                this.showMessage(EDIT_MODE_ON_WARNING_MSG);
                this.removeMessage(3000);
            } else {
                this.graph.runAlgorithm(menuItems.selectedAlgorithm);
                this.loadSteps();
                this.loadOutput();
                this.animationInitialized = true;
                this.animationTimer = setInterval(() => this.goOneStepForward(), STEP_TIME);
                this.switchToPauseButton();
            }
        } else {

            if (Object.keys(this.graph.adjacencyList) === undefined || Object.keys(this.graph.adjacencyList).length == 0) {
                this.showMessage(EMPTY_GRAPH_WARNING_MSG);
                this.removeMessage(2000);
            } else if (this.editMode == true) {
                this.showMessage(EDIT_MODE_ON_WARNING_MSG);
                this.removeMessage(3000);
            } else {
                this.selectNode(STARTUP_NODE_MSG);
                this.animationInitialized = true;
            }
        }
    }

    /**
     * Pauses the animation
     */
    pause() {
        clearInterval(this.animationTimer);
        this.switchToPlayButton();
    }


    /**
     * Switches to play button
     */
    switchToPlayButton() {
        $('#pause-btn').hide();
        $('#play-btn').show();
    }

    /**
     * Switches to pause button
     */
    switchToPauseButton() {
        $('#play-btn').hide();
        $('#pause-btn').show();
    }

    /**
     * Checks whether weights are used or not and shows or hides them
     */
    setWeights() {
        const weightsUsed = this.graph.checkWeights();
        const $weightText = $('.weight-text');
        if (weightsUsed === false) {
            $weightText.addClass('hidden');
            this.graph.tblEdgeList.hideColumn(WEIGHT);
        } else {
            this.graph.tblEdgeList.showColumn(WEIGHT);
            $weightText.prop('disabled', true);
        }
    }

    /**
     * Resets the indexing for nodes
     */
    resetNodeIndex() {
        this.nodeIndex = 0;
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
                target: $(eventInfo.target).attr("id"),
                weight: 1
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
                this.removeBtnOverlay,
                this.weightInputOverlay
            ]
        });
    }

    /**
     * Disables the edit mode for the graph editor.
     * Sets new connection endpoint to invisible, disables the text input on the node,
     * disables the remove buttons and switches in view mode.
     *
     */
    disableEditMode() {
        super.disableEditMode();
        this.setWeights();
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
                target: $(eventInfo.target).attr("id"),
                weight: 1
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
                this.removeBtnOverlay,
                this.weightInputOverlay
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
        if (connection.source != null && connection.target != null) {
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

    /**
     * Disables the edit mode for the graph editor.
     * Sets new connection endpoint to invisible, disables the text input on the node,
     * disables the remove buttons and switches in view mode.
     *
     */
    disableEditMode() {
        super.disableEditMode();
        this.setWeights();
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
                [0.5, 0, 0, 0]
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
    nodeSelected(eventInfo) {
        this.selectedNode = eventInfo.currentTarget.id;
        DOMContainer.undelegate(".node", "click");
        DOMContainer.undelegate(".node", "mouseenter mouseleave");
        if (this.graph.parentArray[this.selectedNode] !== 0 && (menuItems.selectedAlgorithm !== ID_GET_DIRECT_CHILDS && menuItems.selectedAlgorithm !== ID_GET_INDIRECT_CHILDS)) {
            this.selectNode(NOT_ROOT_SELECTED_WARNING);
        } else {
            this.graph.root = this.selectedNode;
            this.removeMessage();
            this.graph.runAlgorithm(menuItems.selectedAlgorithm);
            this.loadSteps();
            this.loadOutput();
            this.animationTimer = setInterval(() => this.goOneStepForward(), STEP_TIME);
        }
    }

    /**
     * Resets the animation. Iterates through all the nodes and connections
     * and removes the marks from them.
     */
    resetGraph() {
        this.animationInitialized = false;
        clearInterval(this.animationTimer);
        this.switchToPlayButton();
        this.clearSelectedNode();
        this.clearSteps();
        this.clearOutput();
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
     * Load the steps of the algorithm to the step section
     */
    loadSteps() {
        const algorithmOutput = this.graph.algorithmOutput;
        const $stepsBody = $('#steps-body');
        let fromValue;
        let toValue;
        for (let i = 1; i < algorithmOutput.length; i++) {


            fromValue = VisualNode.getValueByNodeId(algorithmOutput[i - 1].node);
            toValue = VisualNode.getValueByNodeId(algorithmOutput[i].node);
            $stepsBody.append("<div class=\"step\"><span>" + fromValue +
                " <i class=\"fas fa-long-arrow-alt-right\"></i> " + toValue +
                "</span></div>");

        }
    }


    /**
     * Goes one step forward in the animation
     */
    goOneStepForward() {
        let step;
        let $step;
        if (this.step < this.graph.algorithmOutput.length - 1) {
            ++this.step;
            step = this.step;
            const algorithmStep = this.graph.algorithmOutput[step];
            const connection = {
                source: this.graph.getParentArray()[algorithmStep.node],
                target: algorithmStep.node
            };
            if (connection.source !== 0) {
                $step = $("#steps-body").find(".step:not(.active-step):first");
                $step.addClass("active-step");
            }
            this.nodeMarkOn(algorithmStep.node);
            this.connectionMarkOn(connection);
        } else if (Object.keys(this.graph.standardForm) === undefined || Object.keys(this.graph.standardForm).length == 0) {
            this.showMessage(EMPTY_GRAPH_WARNING_MSG);
            this.removeMessage(2000);
        } else if (this.editMode == true) {
            this.showMessage(EDIT_MODE_ON_WARNING_MSG);
            this.removeMessage(3000);
        } else if (this.selectedNode === "n/a" && menuItems.selectedAlgorithm !== ID_KRUSKAL) {
            this.showMessage(ALGORITHM_NOT_STARTED_MSG);
            this.removeMessage(3000);
        } else {
            this.showMessage(NO_MORE_STEPS_MSG);
            clearInterval(this.animationTimer);
            this.switchToPlayButton();
            this.removeMessage(2000);
        }
    }

    /**
     * Goes one step backwards in the animation
     */
    goOneStepBackwards() {
        const step = this.step;
        let $step;
        if (step > -1) {
            const algorithmStep = this.graph.algorithmOutput[step];
            const connection = {
                source: this.graph.getParentArray()[algorithmStep.node],
                target: algorithmStep.node
            };
            if (connection.source !== 0) {
                $step = $("#steps-body").find(".active-step:last");
                $step.removeClass("active-step");
            }
            this.nodeMarkOff(algorithmStep.node);
            this.connectionMarkOff(connection);
            this.step--;
        } else if (Object.keys(this.graph.standardForm) === undefined || Object.keys(this.graph.standardForm).length == 0) {
            this.showMessage(EMPTY_GRAPH_WARNING_MSG);
            this.removeMessage(2000);
        } else if (this.editMode == true) {
            this.showMessage(EDIT_MODE_ON_WARNING_MSG);
            this.removeMessage(3000);
        } else if (this.selectedNode == "n/a") {
            this.showMessage(ALGORITHM_NOT_STARTED_MSG);
            this.removeMessage(3000);
        } else {
            this.showMessage(NO_PREVIOUS_STEPS_MSG);
            this.removeMessage(2000);
        }
    }


    /**
     * Initializes the animation
     */
    initAnimation() {
        if (Object.keys(this.graph.standardForm) === undefined || Object.keys(this.graph.standardForm).length == 0) {
            this.showMessage(EMPTY_GRAPH_WARNING_MSG);
            this.removeMessage(2000);
        } else if (this.editMode == true) {
            this.showMessage(EDIT_MODE_ON_WARNING_MSG);
            this.removeMessage(3000);
        } else {
            if (menuItems.selectedAlgorithm == ID_GET_DIRECT_CHILDS || menuItems.selectedAlgorithm == ID_GET_INDIRECT_CHILDS) {
                this.selectNode(STARTUP_NODE_MSG);
            } else {
                this.graph.searchRootNode();
            }
            this.animationInitialized = true;
        }
    }

}