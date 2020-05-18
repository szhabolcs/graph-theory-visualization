class VisualNode {
    #unnecessaryEndpoints = [];
    #sameEndpoint = false;
    #editMode = false;

    removeBtnOverlay = ["Custom", {
        create: function (component) {
            return $(REMOVE_BTN_HTML);
        },
        events: {
            click: (removeButtonOverlay) => {
                this.jspInstance.deleteConnection(removeButtonOverlay.component);
            }
        },
        location: 0.5,
        id: "customOverlay"
    }];

    constructor(container) {
        this.jspInstance = jsPlumb.getInstance();
        this.jspInstance.setContainer(container);
        this.DOMContainer = container;
        loadMotionControls(this.jspInstance);

        //Binding the event listeners
        this.jspInstance.bind("connection", (eventInfo) => this.onConnect(eventInfo));
        this.jspInstance.bind("connectionDetached", (eventInfo) => this.onConnectionDetached(eventInfo));
        this.jspInstance.bind("connectionMoved", (eventInfo) => this.onConnectionMoved(eventInfo));
    }

    //Event Listeners
    /**
     * onConnectionMoved Event Listener Callback
     * @param eventInfo Information about the event
     */
    onConnectionMoved(eventInfo) {
        if (eventInfo.originalSourceEndpoint !== eventInfo.newSourceEndpoint) {
            this.hideEndpoint(eventInfo.originalSourceEndpoint);
            this.#unnecessaryEndpoints.push(eventInfo.originalSourceEndpoint);
        }
        if (eventInfo.originalTargetEndpoint !== eventInfo.newTargetEndpoint) {
            this.hideEndpoint(eventInfo.originalTargetEndpoint);
            this.#unnecessaryEndpoints.push(eventInfo.originalTargetEndpoint);
        }
        if (eventInfo.originalSourceEndpoint === eventInfo.newSourceEndpoint &&
            eventInfo.originalTargetEndpoint === eventInfo.newTargetEndpoint) {
            this.#sameEndpoint = true;
        }

    }

    /**
     * onConnect Event Listener Callback
     * @param eventInfo Information about the event
     */
    onConnect(eventInfo) {
        this.removeUnnecessaryEndpoints();
        if (this.#sameEndpoint === false) {
            this.jspInstance.selectEndpoints(
                {
                    source: eventInfo.source,
                    target: eventInfo.target
                }
            ).removeClass("tilde");

            this.addEndpoint(eventInfo.source);
            this.addEndpoint(eventInfo.target);
        } else this.#sameEndpoint = false;
    }

    /**
     * onConnectionDetached Event Listener Callback
     * @param eventInfo Information about the event
     */
    onConnectionDetached(eventInfo) {
        let sourceEndpoint = eventInfo.sourceEndpoint;
        let targetEndpoint = eventInfo.targetEndpoint;
        this.hideEndpoint(sourceEndpoint);
        this.hideEndpoint(targetEndpoint);
        this.#unnecessaryEndpoints.push(sourceEndpoint);
        this.#unnecessaryEndpoints.push(targetEndpoint);
    }

    //Base and Helper functions
    /**
     * Removes the endpoints from the queue
     */
    removeUnnecessaryEndpoints() {
        let endpointToRemove;
        while (this.#unnecessaryEndpoints.length) {
            endpointToRemove = this.#unnecessaryEndpoints.shift();
            this.jspInstance.deleteEndpoint(endpointToRemove);
        }
    }

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

        insertedBox.css({
            top: top,
            left: left
        });

        this.jspInstance.draggable(insertedBox, {
            grid: [10, 10]
        });
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
    }

    /**
     * Removes and endpoint from a node
     * @param endpointId Id of the actual endpoint to remove
     */
    removeEndpoint(endpointId) {
        this.jspInstance.deleteEndpoint(endpointId);
    }

    enableEditMode() {
        $(".jtk-endpoint").removeClass("hidden");
        $(".node-text").addClass("node-text-border");
        $(".node-text").prop('disabled', false);
        $(".remove-btn").removeClass("hidden");
    }

    disableEditMode() {
        $(".jtk-endpoint").addClass("hidden");
        $(".node-text").removeClass("node-text-border");
        $(".node-text").prop('disabled', true);
        $(".remove-btn").addClass("hidden");
    }

    /**
     * Toggles the edit mode
     */
    toggleEditMode() {
        if (this.#editMode) {
            this.disableEditMode();
            this.#editMode = false;
        } else {
            this.enableEditMode();
            this.#editMode = true;
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


}

class DirectedNode extends VisualNode {

    constructor(container) {
        super(container);
        //this.jspInstance.bind("connection", (info) => this.onConnect(info));
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
                this.removeBtnOverlay
            ]
        });
    }

}

class BinaryNode extends VisualNode {
    constructor(container) {
        super(container);
    }

    addNode(top = "50%", left = "50%") {
        const insertedBox = super.addNode(top, left);
        console.log(insertedBox);
        this.jspInstance.addEndpoint(insertedBox, {
            isSource: true,
            anchor: [0.2, 1, -1, -1],
            connector: "Straight",
            deleteEndpointsOnDetach: false,
            connectorOverlays: [
                this.removeBtnOverlay
            ]
        });
        this.jspInstance.addEndpoint(insertedBox, {
            isSource: true,
            anchor: [0.8, 1, -1, -1],
            connector: "Straight",
            deleteEndpointsOnDetach: false,
            connectorOverlays: [
                this.removeBtnOverlay
            ]
        });
        this.jspInstance.addEndpoint(insertedBox, {
            isTarget: true,
            anchor: [
                [0.5, 0, 0, 0],
                [0.2, 0, 0, 0],
                [0.8, 0, 0, 0]
            ],
            deleteEndpointsOnDetach: false,
            endpoint: ["Rectangle", {radius: 10}],
            connector: "Straight"
        });
    }
}