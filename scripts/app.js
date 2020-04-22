/**
 * This is the main script of the Graphviser application
 */

//Global variables
//JsPlumb instance
var jspNode;
//JQuery elements
var DOMContainer;
var $Document;

//Base and helper functions

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

    //Load the motion controls
    loadMotionControls();

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



});