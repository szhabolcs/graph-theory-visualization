//CONSTANTS
const MIN_ZOOM_VALUE = 50;
const MAX_ZOOM_VALUE = 300;

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

//SECTION IDS
const ID_BOOLE_MATRIX = "pont-pont-matrix";
const ID_INCIDENCE_MATRIX = "pont-el-matrix";
const ID_ADJACENCY_LIST = "szomszedsagi-lista";
const ID_EDGE_LIST = "el-lista";
const ID_PARENT_ARRAY = "apa-tomb";
const ID_BRACKET_REPRESENTATION = "teljes-zarojeles-alak";
const ID_STANDARD_FORM = "standard-alak";
const ID_BINARY_FORM = "binaris-alak";

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
const NODE_HTML = "<div class='node'>"+
                        "<div class='remove-btn'><i class='fas fa-minus-circle'></i></div>"+
                        "<div class='input-group mx-auto'>"+
                            "<input type='text' class='node-text text-center node-text-border'>"+
                        "</div>"+
                   "</div>";

const MENU_CARD = '<div class="container navbar-card my-auto">'+
    '      <div class="row">'+
    '          <div class="col-sm">'+
    '            <img src="">'+
    '          </div>'+
    '          <div class="col-sm navbar-card-text text-center my-auto">'+
    '            '+
    '          </div>'+
    '      </div>'+
    '      <a href="" class="read-more-link"><div class="read-more"><i class="fas fa-info-circle"></i></div></a>'+
    '    </div>';
        
const TABLE_SECTION = "<div class='representation-section'>"+
                        "<span class='section-header'></span>"+
                        "<div class='divider-line'></div>"+
                        "<table class='table table-bordered'>"+
                            "<tr data-i='0'><td data-j='0'>&nbsp;</td></tr>"+
                        "</table>"+
                      "</div>"