/**
 * This scripts adds pan and zoom functionality
 */

//Global variables
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

//JsPlumb instance to work with
var jspInstanceForMotion;

//Base and Helper functions
/**
 * Unbinds the events used for dragging to the container
 */
function unbindEventsForDrag() {
    $Document.off("mousemove", "div#container");
    $Document.off("mouseup", "div#container");
    DOMContainer.removeClass("container-dragging");
}

/**
 * Binds the necessary events for dragging to the container
 */
function bindEventsForDrag() {
    $Document.on("mousemove", "div#container", (event) => onMouseMove(event));
    $Document.on("mouseup", "div#container", (event) => onMouseUp(event));
    DOMContainer.addClass("container-dragging");
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
        jspInstanceForMotion.setZoom(scale);
    }
}

/**
 * Initializes dragging and zooming, binds the necessary listeners for these operations
 */
function loadMotionControls(jspInstance) {

    jspInstanceForMotion = jspInstance;

    //set margin values
    iMarginStartX = Number.parseInt(DOMContainer.css("margin-left"));
    iMarginStartY = Number.parseInt(DOMContainer.css("margin-top"));
    iMarginX = iMarginStartX;
    iMarginY = iMarginStartY;

    //set initial zoom in percentage
    iZoom = 100;
    //Calculate borders for dragging at scale 1
    calculateMarginSizes(1);
    //Set up listeners
    DOMContainer.on("wheel", (event) => onScroll(event));
    $Document.on("mousedown", "#container", (event) => onMouseDown(event));
    $Document.on("mouseleave", "#container", () => unbindEventsForDrag());
}