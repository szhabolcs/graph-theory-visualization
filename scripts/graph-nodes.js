class VisualNode {
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
    }

    //Event Listeners
    /**
     * onConnect Event Listener Callback
     * @param eventInfo Information about the event
     */
    onConnect(eventInfo) {
        if (this.#sameEndpoint === false) {
            this.jspInstance.selectEndpoints(
                {
                    source: eventInfo.source,
                    target: eventInfo.target
                }
            ).removeClass("tilde").addClass("hidden");

            this.addEndpoint(eventInfo.source);
            this.addEndpoint(eventInfo.target);
        } else this.#sameEndpoint = false;
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

        //Binding event listeners
        insertedBox.on("click", ".remove-btn", (eventInfo) => this.removeNode(eventInfo.delegateTarget));

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
        const $nodeText = $(".node-text");
        $(".tilde").removeClass("hidden");
        $nodeText.addClass("node-text-border");
        $nodeText.prop('disabled', false);
        $(".remove-btn").removeClass("hidden");
    }

    disableEditMode() {
        const $nodeText = $(".node-text");
        $(".tilde").addClass("hidden");
        $nodeText.removeClass("node-text-border");
        $nodeText.prop('disabled', true);
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
            anchor: [0.2, 1, -1, -1],
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
            anchor: [0.8, 1, -1, -1],
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
                [0.2, 0, 0, 0],
                [0.8, 0, 0, 0]
            ],
            deleteEndpointsOnDetach: false,
            allowLoopback: false,
            endpoint: ["Rectangle", {radius: 10}, {cssClass: "tilde"}],
            connector: "Straight"
        });
    }
}