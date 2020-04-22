let menuIsOpen = false;

function changeNav() {
    if(menuIsOpen){
        document.getElementById("side-nav").style.width = "0";
        document.getElementById("main-content").style.marginLeft= "0";

        menuIsOpen = false;
    }
    else{
        document.getElementById("side-nav").style.width = "400px";
        document.getElementById("main-content").style.marginLeft = "400px";

        menuIsOpen = true;
    }
}

let nodes = document.getElementById("side-nav").childNodes[1].childNodes;

for(let i=0; i<nodes.length; i++) {
    if (nodes[i].nodeName.toLowerCase() == 'a') {
        nodes[i].onclick = function (e) {
            let href = e.toElement.getAttribute("href");
            href = href.substr(1);
            let section = document.getElementById(href);
            let offset = 70 + 150; // nav and offset

            // get body position
            let bodyRect = document.body.getBoundingClientRect().top; 
            // get section position relative
            let sectionRect = section.getBoundingClientRect().top; 
            // subtract the section from body
            let sectionPosition = sectionRect - bodyRect; 
            // subtract offset
            let offsetPosition = sectionPosition - offset; 
            
            e.preventDefault();
            window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
            });
        }
    }
}