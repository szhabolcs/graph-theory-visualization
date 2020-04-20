let menuIsOpen = false;

function changeNav() {
    if(menuIsOpen){
        document.getElementById("side-nav").style.width = "0";
        document.getElementById("main-content").style.marginLeft= "0";

        menuIsOpen = false;
    }
    else{
        document.getElementById("side-nav").style.width = "250px";
        document.getElementById("main-content").style.marginLeft = "250px";

        menuIsOpen = true;
    }
}