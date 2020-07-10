/**
 * This is the main script of the Graphviser application
 */

//Global variables
//JsPlumb instance
var jspNode;

//JQuery elements
var DOMContainer;
var $Document;

//Graph in memory object
var graph;

//Base and helper functions

/**
 * This function initializes all instances and objects needed for graph visualization
 * @param {Object} DOMContainer the DOM element for the container in which the jsPlumb is used
 * @returns {VisualNode} object
 */
function initGraph(DOMContainer) {
    if (menuItems.graphType === BINARY_TREE) {
        graph = new BinaryTree();
        jspNode = new BinaryNode(DOMContainer);
    } else if (menuItems.graphType === GENERIC_GRAPH) {
        if (menuItems.directed === true) {
            graph = new DirectedGraph();
            jspNode = new DirectedNode(DOMContainer);
        } else {
            graph = new UndirectedGraph();
            jspNode = new UnDirectedNode(DOMContainer);
        }
    }
    jspNode.setGraph(graph);
    graph.setVisualNode(jspNode);
}


/**
 * Code executes when the Document Object Model is constructed by the browser
 */
$(document).ready(function () {

    //Declarations
    let theme;

    // Light and dark theme switch
    if (matchMedia('(prefers-color-scheme: light)').matches) {
        theme = 'light';
        $("#theme-btn > i").toggleClass("btn-on");
    } else theme = 'dark';

    document.documentElement.setAttribute('data-theme', theme);

    /**
     * Theme changer button listener
     */
    $("#theme-btn").click(function () {
        $(this).find("i").toggleClass("btn-on");

        if (theme == 'light') {
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

    //Language init
    $.i18n().load({
        hu: '../jquery.i18n/languages/hu.json'
    });
    $(window).on('load',function(){$('body').i18n();});

    //Get the DOM elements
    $Document = $(document);
    DOMContainer = $("#container");

    //Load the motion controls
    loadMotionControls();

    //Tooltip initialization
    $('[data-toggle="tooltip"]').tooltip({delay: {"show": 500}});

    //Set up the Listeners
    /**
     * Node adding listener
     */
    $("#node-add-btn").on("click", () => {
        jspNode.addNode();
    });

    /**
     * Visual graph reset listener
     */
    $("#reset-graph-btn").on("click", () => {
        graph.deleteGraph();
    });

    /**
     * Grid toggle listener
     */
    $("#grid-btn").click(() => {
        DOMContainer.toggleClass("grid");
        $("#grid-btn > i").toggleClass("btn-on");
    });

    /**
     * Edit mode switching listener
     */
    $("#edit-btn").click(() => {
        $("#edit-btn").toggleClass("btn-on");
        $("#node-add-btn").fadeToggle(200);
        $("#reset-graph-btn").fadeToggle(200);

        jspNode.toggleEditMode();
    });

    /**
     * Left menu open listener
     */
    $("#representation > div .fa-chevron-right").click(() => {
        $("#representation-body").toggleClass("display-none");
        $("#representation").toggleClass("dropdown-open");
        $("#representation > div .fa-chevron-right").toggleClass("fa-rotate-180");
        $("#representation-icon > span").toggleClass("display-none");
        if (!$("#representation").hasClass("dropdown-open")) {
            $("#representation").css("width", "55px");
        }
        $("#left-splitter").toggleClass("display-none");
    });
    /**
     * Left menu resizing listener
     */
    $("#representation").resizable({
        handleSelector: "#left-splitter",
        resizeHeight: false
    });

    /**
     * Right menu open listener
     */
    $("#steps > div .fa-chevron-left").click(() => {
        $("#steps-body").toggleClass("display-none");
        $("#output-body").toggleClass("display-none");
        $("#steps").toggleClass("steps-open");
        $("#steps > div .fa-chevron-left").toggleClass("fa-rotate-180");
        $("#right-splitter").toggleClass("display-none");
        $("#steps-icon > span").toggleClass("display-none");
        $("#resizable-right-body").toggleClass("steps-open");
        if (!$("#resizable-right-body").hasClass("steps-open")) {
            $("#resizable-right-body").css("width", "55px");
        }
        $("#middle-splitter").toggleClass("display-none");
    });
    /**
     * Right menu resizing listener
     */
    $("#resizable-right-body").resizable({
        handleSelector: "#right-splitter",
        resizeHeight: false,
        resizeWidthFrom: 'left'
    });
    /**
     * Right menu second resizing listener
     */
    $("#steps").resizable({
        handleSelector: "#middle-splitter",
        resizeWidth: false,
        resizeHeightFrom: 'bottom'
    });

    /**
     * Bottom navigation bar open listener
     */
    $("#navbar-btn").click(() => {
        $(".navbar").toggleClass("navbar-open");
        $("#navbar-btn > i").toggleClass("fa-rotate-180");
        $("#navbar-content").toggleClass("navbar-content-open");
    });

    /**
     * Left menu's table section listener
     */
    $(".section-header > i").click((e) => {
        $(e.currentTarget.parentElement.parentElement).find(".table").fadeToggle();
        $(e.currentTarget).toggleClass("fa-plus fa-minus");
    });

    /**
     * Zooming in button listener
     */
    $("#zoom-in").click(() => {
        if (iZoom < MAX_ZOOM_VALUE) {
            iZoom += 10;
            setZoom(iZoom / 100);
        }
    });
    /**
     * Zooming out button listener
     */
    $("#zoom-out").click(() => {
        if (iZoom > MIN_ZOOM_VALUE) {
            iZoom -= 10;
            setZoom(iZoom / 100);
        }
    });
    /**
     * Zoom reset button listener
     */
    $("#zoom-reset").click(() => {
        iZoom = 100;
        setZoom(iZoom / 100);
    });

    /**
     * Animation play button listener
     */
    $("#play-btn").click(() => {
        jspNode.play();
    });
    /**
     * Animation step forward button listener
     */
    $("#step-fw-btn").click(() => {
        jspNode.goOneStepForward();
    });
    /**
     * Animation step backwards button listener
     */
    $("#step-bw-btn").click(() => {
        jspNode.goOneStepBackwards();
    });
    /**
     * Animation restart button listener
     */
    $("#restart-btn").click(() => {
        jspNode.resetGraph();
    });
});
