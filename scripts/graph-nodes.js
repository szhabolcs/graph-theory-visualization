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

        jspNode.draggable(insertedBox, {
            grid: [10, 10]
        });

        return insertedBox;
    }

    removeNode(){

    }

    enableEditMode() {

    }

    disableEditMode() {

    }

    toggleEditMode(){

    }

    resetGraph(){

    }

    goOneStepForward(){

    }

    goOneStepBackwards(){

    }

    updateGraphInMemory(){

    }

    loadGraphFromMemory(){

    }


}

class DirectionalNode extends VisualNode {

    constructor(container) {
        super(container);
        this.jspInstance.bind("connectionDetached", () => alert("Detached"));
        this.jspInstance.bind("connection", (info) => this.onConnect(info));
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
        jspNode.addEndpoint(insertedBox, {
            isTarget: true,
            anchor: "Top",
            connector: "Straight"
        });
        jspNode.addEndpoint(insertedBox, {
            isSource: true,
            anchor: "BottomCenter",
            connector: "Straight",

        });
    }

}

class UnDirectionalNode extends VisualNode {
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
        jspNode.addEndpoint(insertedBox, {
            isSource: true,
            anchor: [0.2, 1, -1, -1],
            connector: "Straight"
        });
        jspNode.addEndpoint(insertedBox, {
            isSource: true,
            anchor: [0.8, 1, -1, -1],
            connector: "Straight"
        });
        jspNode.addEndpoint(insertedBox, {
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