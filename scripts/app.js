//Constants
//HTML code of the node
const node = "<div class='node smooth-shadow centered' >" +
    "<svg class='bi bi-caret-down-fill' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
    "<path fill-rule='evenodd' d='M6.5 8a.5.5 0 00-.5-.5H1.5a.5.5 0 000 1H6a.5.5 0 00.5-.5z' clip-rule='evenodd'/>" +
    "<path fill-rule='evenodd' d='M3.854 5.646a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L2.207 8l1.647-1.646a.5.5 0 000-.708zM9.5 8a.5.5 0 01.5-.5h4.5a.5.5 0 010 1H10a.5.5 0 01-.5-.5z' clip-rule='evenodd'/>" +
    "<path fill-rule='evenodd' d='M12.146 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L13.793 8l-1.647-1.646a.5.5 0 010-.708zM8 9.5a.5.5 0 00-.5.5v4.5a.5.5 0 001 0V10a.5.5 0 00-.5-.5z' clip-rule='evenodd'/>" +
    "<path fill-rule='evenodd' d='M5.646 12.146a.5.5 0 000 .708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 00-.708-.708L8 13.793l-1.646-1.647a.5.5 0 00-.708 0zM8 6.5a.5.5 0 01-.5-.5V1.5a.5.5 0 011 0V6a.5.5 0 01-.5.5z' clip-rule='evenodd'/>" +
    "<path fill-rule='evenodd' d='M5.646 3.854a.5.5 0 010-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8 2.207 6.354 3.854a.5.5 0 01-.708 0z' clip-rule='evenodd'/>" +
    "</svg>" +
    "<div class='input-group' style='margin:auto; width: 50px;'>" +
    "<input type='text' class='form-control text-center' id='usr'>" +
    "</div></div>";

//Global variables
var jspNode;
var DOMContainer;

//Base and helper functions

function setZoom(scale) {
    if (DOMContainer === undefined)
        console.error("Container DOM element hasn't been initialized yet!");
    else {
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
function addNode(top = "50%", left = "50%") {
    //Declarations
    //Init of the JsPlumb Instance
    let insertedNode;

    //Insertion of the box into the container
    $(node).hide().appendTo("#container").fadeIn(150);
    insertedNode = DOMContainer.children(".node").last();

    insertedNode.css({
        top: top,
        left: left
    });

    jspNode.draggable(insertedNode, {
        grid: [10, 10]
    });

    jspNode.addEndpoint(insertedNode, {
        isSource: true,
        anchor: [0.2, 1, -1, -1],
        connector: "Straight"
    });
    jspNode.addEndpoint(insertedNode, {
        isSource: true,
        anchor: [0.8, 1, -1, -1],
        connector: "Straight"
    });
    jspNode.addEndpoint(insertedNode, {
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
    //Light and dark theme switch
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


    //Get the DOM element for the container
    DOMContainer = $("#container");

    //init JsPlumb
    jspNode = initJsPlumb(DOMContainer);

    //Set up the Listeners
    //click event listener, for adding a node
    $(".add").click(() => addNode(DOMContainer, "40%", "30%"));

    //change event listener, for toggling the grid
    $("#grid-switch").change(function () {
        if ($("#grid-switch").is(":checked")) {
            gridSwitch = false;
            DOMContainer.addClass("grid");
        } else {
            gridSwitch = true;
            DOMContainer.removeClass("grid");
        }
    });
});