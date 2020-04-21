//Constants


//Global variables
//JsPlumb instance
var jspNode;
//JQuery elements
var DOMContainer;
var $Document;
//Values for navigation
var iZoom;
var iMarginX;
var iMarginY;
var iMouseX;
var iMouseY;
var iMaxMarginX;
var iMinMarginX;
var iMaxMarginY;
var iMinMarginY;
var iMarginStartX;
var iMarginStartY;

//Base and helper functions

/**
 * Unbinds the events used for dragging to the container
 */
function unbindEventsForDrag() {
    $Document.off("mousemove", "div#container");
    $Document.off("mouseup", "div#container");
}

/**
 * Binds the necessary events for dragging to the container
 */
function bindEventsForDrag() {
    $Document.on("mousemove", "div#container", (event) => onMouseMove(event));
    $Document.on("mouseup", "div#container", (event) => onMouseUp(event));
}

/**
 * Called when Mouse Up event is fired on the container element
 * @param event
 */
function onMouseUp(event) {
    unbindEventsForDrag();
    event.preventDefault();
}

/**
 * Called when Mouse Move event is fired on the container element
 * @param event
 */
function onMouseMove(event) {
    iMouseX = event.originalEvent.movementX;
    iMouseY = event.originalEvent.movementY;

    //Moving the container
    //Moving left or right
    if (iMarginX + iMouseX <= iMaxMarginX && iMarginX + iMouseX > iMinMarginX) {
        iMarginX = iMarginX + iMouseX;
        DOMContainer.css("margin-left", iMarginX);
    }

    //Moving up or down
    if (iMarginY + iMouseY <= iMaxMarginY && iMarginY + iMouseY > iMinMarginY) {
        iMarginY = iMarginY + iMouseY;
        DOMContainer.css("margin-top", iMarginY);
    }

    event.preventDefault();
}

/**
 * Called when Mouse Down event is fired on the container element
 * @param event
 */
function onMouseDown(event) {
    bindEventsForDrag();
    DOMContainer.removeClass("slow-transition");
    event.preventDefault();
}

/**
 * Called when scroll event is triggered on the container
 * @param event
 */
function onScroll(event) {

    const scrollDirection = event.originalEvent.deltaY;
    if (scrollDirection < 0 && iZoom < MAX_ZOOM_VALUE)
        iZoom += 10;
    else if (scrollDirection > 0 && iZoom > MIN_ZOOM_VALUE)
        iZoom -= 10;
    setZoom(iZoom / 100);

}

/**
 * Calculates the fraction part from the formula
 * @param scale
 * @param size The size of the window
 * @returns {number} returns a fraction number
 */
function calculateZoomedMarginSize(scale, size) {
    return ((scale * 2 - 1) / 2) * size;
}

/**
 * Calculates the minimum and the maximum margin sizes for the drag movement
 * @param scale
 */
function calculateMarginSizes(scale) {
    const $window = $(window);
    iMaxMarginX = calculateZoomedMarginSize(scale, $window.width()) + iMarginStartX;
    iMinMarginX = -calculateZoomedMarginSize(scale, $window.width()) + iMarginStartX;
    iMaxMarginY = calculateZoomedMarginSize(scale, $window.height());
    iMinMarginY = -calculateZoomedMarginSize(scale, $window.height());
}

function refitContainer() {
    //Fitting horizontally
    if (iMarginX < iMinMarginX) {
        iMarginX = iMinMarginX;
        DOMContainer.addClass("slow-transition");
        DOMContainer.css("margin-left", iMarginX);
    }
    if (iMarginX > iMaxMarginX) {
        iMarginX = iMaxMarginX;
        DOMContainer.addClass("slow-transition");
        DOMContainer.css("margin-left", iMarginX);
    }
    //Fitting Vertically
    if (iMarginY < iMinMarginY) {
        iMarginY = iMinMarginY;
        DOMContainer.addClass("slow-transition");
        DOMContainer.css("margin-top", iMarginY);
    }
    if (iMarginY > iMaxMarginY) {
        iMarginY = iMaxMarginY;
        DOMContainer.addClass("slow-transition");
        DOMContainer.css("margin-top", iMarginY);
    }
}

/**
 * Zooms the container to a given scale
 * @param scale
 */
function setZoom(scale) {
    if (DOMContainer === undefined)
        console.error("Container DOM element hasn't been initialized yet!");
    else {
        calculateMarginSizes(scale);
        refitContainer();
        DOMContainer.css({
            transform: "scale(" + scale + ')'
        });
        jspNode.setZoom(scale);
    }
}

/**
 * This function initializes jsPlumb, and sets up it's initial settings
 * @param DOMContainer the DOM element for the container in which the jsPlumb is used
 * @returns {jsPlumbInstance}
 */
function initJsPlumb(DOMContainer) {
    const jspNode = jsPlumb.getInstance();
    //Setting up the container for JsPlumb
    jspNode.setContainer(DOMContainer);

    return jspNode;
}

/**
 * This function adds a new node and sets it up
 * @param top position relative to the top left corner of the document
 * @param left position relative to the top left corner of the document
 */
function addNode(top = "50%", left = "50%") {     /*Inserts new node*/
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
        grid: [10, 10],
        containment: "container"
    });

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

/**
 * Code executes when the Document Object Model is constructed by the browser
 */
$(document).ready(function () {

    //Declarations
    // Light and dark theme switch
    let theme = 'light';
    let gridSwitch = false;

    document.documentElement.setAttribute('data-theme', theme);

    $("#theme-switch").change(function () {
        if ($("#theme-switch").is(":checked")) {
            theme = 'dark';
            document.documentElement.classList.add('color-theme-in-transition');
            document.documentElement.setAttribute('data-theme', theme);

        } else {
            theme = 'light';
            document.documentElement.classList.add('color-theme-in-transition');
            document.documentElement.setAttribute('data-theme', theme);
        }
        window.setTimeout(function () {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 1000);
    });


    //Get the DOM elements
    $Document = $(document);
    DOMContainer = $("#container");

    //init JsPlumb
    jspNode = initJsPlumb(DOMContainer);

    //set margin values
    iMarginStartX = Number.parseInt(DOMContainer.css("margin-left"));
    iMarginStartY = Number.parseInt(DOMContainer.css("margin-top"));
    iMarginX = iMarginStartX;
    iMarginY = iMarginStartY;

    //set initial zoom in percentage
    iZoom = 100;
    //Calculate borders for dragging at scale 1
    calculateMarginSizes(1);


    //Set up the Listeners
    //click event listener, for adding a node
    $(".add").click(() => addNode(DOMContainer, "40%", "30%"));

    $("#grid-switch").change(function () {      /* Grid Switch listener */
        if ($("#grid-switch").is(":checked")) {
            gridSwitch = false;
            DOMContainer.addClass("grid");
        } else {
            gridSwitch = true;
            DOMContainer.removeClass("grid");
        }
    });
    DOMContainer.on("mousewheel", (event) => onScroll(event));
    $Document.on("mousedown", "#container", (event) => onMouseDown(event));
    $Document.on("mouseleave", "#container", () => unbindEventsForDrag());


});