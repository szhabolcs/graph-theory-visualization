//CONSTANTS
const MIN_ZOOM_VALUE = 50;
const MAX_ZOOM_VALUE = 300;

//MESSAGES
const STARTUP_NODE_MSG = "Válassz ki egy csomópontot";
const ROOT_NODE_MSG = "Válassz ki egy gyökeret";
const EDIT_MODE_ON_WARNING_MSG = "Kapcsold ki a szerkesztő módot előbb";
const EMPTY_GRAPH_WARNING_MSG = "Készíts egy gráfot előbb";
const NO_MORE_STEPS_MSG = "Algoritmus vége";
const NO_PREVIOUS_STEPS_MSG = "Nincs előző lépés";
const ALGORITHM_NOT_STARTED_MSG = "Indítsd el az algoritmust a <i class='fas fa-play'></i> gombbal előbb";
const GRAPH_ROOT_SELECTED = "A fa gyökere kiválasztva"

//CONSTANT STRINGS
const BINARY_TREE = "binaris";
const GENERIC_GRAPH = "altalanos";
const DIRECTED_GRAPH = "directed";
const UNDIRECTED_GRAPH = "undirected";
const MENU_ROOT = "root";
const DISPLAY_SOURCE = "Honnan";
const DISPLAY_TARGET = "Hova";
const SOURCE = "source";
const TARGET = "target";

//IDS
const ID_BOOLE_MATRIX = "pont-pont-matrix";
const ID_INCIDENCE_MATRIX = "pont-el-matrix";
const ID_ADJACENCY_LIST = "szomszedsagi-lista";
const ID_EDGE_LIST = "el-lista";
const ID_PARENT_ARRAY = "apa-tomb";
const ID_BRACKET_REPRESENTATION = "teljes-zarojeles-alak";
const ID_STANDARD_FORM = "standard-alak";
const ID_BINARY_FORM = "binaris-alak";
const ID_BREADTH_FIRST_SEARCH = "szelessegi-bejaras";
const ID_DEPTH_FIRST_SEARCH = "melysegi-bejaras";
const ID_DIJKSTRA = "dijkstra-algoritmus";
const ID_KRUSKAL = "kruskal-algoritmus";
const ID_PREORDER = "preorder-bejaras";
const ID_POSTORDER = "postorder-bejaras";
const ID_INORDER = "inorder-bejaras";
const ID_GET_HEIGHT = "fa-magassaga";
const ID_GET_LEAVES = "fa-levelei";
const ID_GET_DIRECT_CHILDS = "kozvetlen-leszarmazott";
const ID_GET_INDIRECT_CHILDS = "kozvetett-leszarmazott";

//SECTION NAMES
const NAME_BOOLE_MATRIX = "Boole-mátrix";
const NAME_INCIDENCE_MATRIX = "Pont-él mátrix";
const NAME_ADJACENCY_LIST = "Szomszédsági lista";
const NAME_EDGE_LIST = "Éllista";
const NAME_PARENT_ARRAY = "Apa tömb";
const NAME_BRACKET_REPRESENTATION = "Teljes zárójeles alak";
const NAME_STANDARD_FORM = "Standard alak";
const NAME_BINARY_FORM = "Bináris alak";
const NAME_LEFT = "Bal";
const NAME_RIGHT = "Jobb";

//CONSTANT TYPES
const TYPE_LEFT = 0;
const TYPE_RIGHT = 1;

//TABLE ROWS
const ROW_LEFT = '1';
const ROW_RIGHT = '2';

//CONSTANT HTML
const REMOVE_BTN_HTML = "<div class='remove-btn'>" +
    "<i class='fas fa-minus-circle'></i>" +
    "</div>";
const NODE_HTML = "<div class='node'>" +
    "<div class='remove-btn'><i class='fas fa-minus-circle'></i></div>" +
    "<div class='input-group mx-auto'>" +
    "<input type='text' class='node-text text-center node-text-border'>" +
    "</div>" +
    "</div>";

const MENU_CARD = '<div class="container navbar-card my-auto">' +
    '      <div class="row">' +
    '          <div class="col-sm">' +
    '            <img src="">' +
    '          </div>' +
    '          <div class="col-sm navbar-card-text text-center my-auto">' +
    '            ' +
    '          </div>' +
    '      </div>' +
    '      <a href="" class="read-more-link"><div class="read-more"><i class="fas fa-info-circle"></i></div></a>' +
    '    </div>';

const TABLE_SECTION = "<div class='representation-section'>" +
    "<span class='section-header'></span>" +
    "<div class='divider-line'></div>" +
    "<table class='table table-bordered'>" +
    "<tr data-i='0'><td data-j='0'>&nbsp;</td></tr>" +
    "</table>" +
    "</div>"