class VisualNode {
    constructor(container) {
        this.jspInstance = jsPlumb.getInstance();
        this.jspInstance.setContainer(container);
        this.DOMContainer = container;
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

    removeNode(nodeId) {
        this.jspInstance.deleteConnectionsForElement(nodeId);
        this.jspInstance.removeAllEndpoints(nodeId);
        this.jspInstance.remove(nodeId);
    }

    enableEditMode() {

    }

    disableEditMode() {

    }

    toggleEditMode() {

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

    /**
     * onConnect Event Listener Callback
     * @param info Information about the event
     */
    onConnect(info) {
        info.connection.addOverlay(["Arrow", {width: 10, height: 10, id: "arrow"}]);
    }

    addNode(top = "50%", left = "50%") {
        const insertedBox = super.addNode(top, left);
        this.jspInstance.addEndpoint(insertedBox, {
            isTarget: true,
            anchor: "Top",
            connector: "Straight"
        });
        this.jspInstance.addEndpoint(insertedBox, {
            isSource: true,
            anchor: "BottomCenter",
            connector: "Straight",

        });
    }

}

class UnDirectedNode extends VisualNode {
    constructor(container) {
        super(container);
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
            connector: "Straight"
        });
        this.jspInstance.addEndpoint(insertedBox, {
            isSource: true,
            anchor: [0.8, 1, -1, -1],
            connector: "Straight"
        });
        this.jspInstance.addEndpoint(insertedBox, {
            isTarget: true,
            anchor: [
                [0.5, 0, 0, 0],
                [0.2, 0, 0, 0],
                [0.8, 0, 0, 0]
            ],
            endpoint: ["Rectangle", {radius: 10}],
            connector: "Straight"
        });
    }
}