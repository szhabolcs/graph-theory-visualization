![logo@10x](https://user-images.githubusercontent.com/54114237/88288457-77aef100-ccfc-11ea-901d-2728b84d5401.png)
<br>
<br>
## Manual de utilizare
Manualul de utilizare este disponibil [aici](https://github.com/ToastedWaffle/graph-theory-visualization/wiki/Manual-de-utilizare).

## Despre aplicație
Aplicația noastră a fost creată ca parte a unui proiect școlar.
<br>
Scopul ei este de a prezenta teoria grafurilor într-un mod interactiv și modern.

## Arhitectura aplicației:
Aplicația a fost creată folosind tehnologii web, cu scopul de a putea rula atât pe dispozitive desktop cât și pe mobile. Interfața a fost realizată în HTML5 și CSS3, iar funcționalitatea este asigurată prin JavaScript (versiunea [ES2019](https://en.wikipedia.org/wiki/ECMAScript#10th_Edition_%E2%80%93_ECMAScript_2019)). 
<br>
Este accesibil prin domain-ul [graphviser.tools](https://graphviser.tools) cu ajutorul serviciilor Netlify, care preiau sursele de pe GitHub și le transmit la o varietate de [CDN](https://en.wikipedia.org/wiki/Content_delivery_network)-uri din lume. Mai mult despre cum funcționează [aici](https://agilitycms.com/resources/posts/what-is-netlify-and-why-should-you-care-as-an-editor).

## Cerințe de sistem:
Pentru folosirea aplicației noastre este necesar un dispozitiv cu acces la internet și un browser web care suportă [ES2019](https://en.wikipedia.org/wiki/ECMAScript#10th_Edition_%E2%80%93_ECMAScript_2019).
În zilele noastre majoritatea browserelor web suportă această versiune de JavaScript.
<br>
[Tabel de compatibilitate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields):
<br>
![tabel](https://user-images.githubusercontent.com/54114237/88282385-2568d280-ccf2-11ea-880e-c4b90d329ca0.png)
<br>
Unica cerință hardware este ca dispozitivul să poată rula un browser web cu versiunea minimă afișată în tabel.

## Implementarea aplicației:
Documentația codului este disponibil [aici](https://docs.graphviser.tools/).
<br>
Aplicația se bazează pe trei framework-uri principale:
1. **jQuery**: folosit la crearea animațiilor, la navigare și la manipularea elementelor din Document Object Model (DOM).
2. **jsPlumb Community Edition**: folosit la vizualizarea grafurilor, având ca funcționalitate conectarea vizuală a elementelor și stocarea informațiilor despre aceste conexiuni.
3. **Bootstrap**: folosit la crearea interfeței responsive a aplicației și a paginii cu materiale educative.

Este alcătuit din două părți esențiale:
### 1. Interfața editorului:
Conține clasele necesare pentru manipularea și gestionarea elementelor din DOM.
<br>
#### VisualNode: gestionează reprezentarea vizuală a grafurilor
1. Conține toate funcțiile de bază pentru editarea grafurilor (adăugare/ștergere de noduri și muchii, setarea costurilor, schimbarea modului de editare).
2. Toate funcțiile necesare pentru animare (inițializare, pornire, oprire, pas înainte și înapoi).
3. Event listeners pentru modificarea grafurilor.

#### TableHandler: gestionează reprezentarea în tabeluri a grafurilor
* Conține funcțiile necesare pentru gestionarea în timp real (adăugare/ștergere rânduri și coloane, actualizarea celulelor).

#### MenuHandler: gestionează meniul
* Se ocupă de funcționarea meniului și inițializarea grafului la pornirea aplicației sau la schimbarea tipului grafului.

#### Motion Controls: gestionează suprafața de lucru
* Se ocupă de acțiunile pan și zoom (mișcare, micșorare/mărire) a suprafeței de lucru.
![animation](https://user-images.githubusercontent.com/54114237/88455595-44e13600-ce7f-11ea-89f6-fccbf6c5ffde.gif)

### 2. Gestionarea memoriei:
#### GenericGraph:
1. Conține toate reprezentările grafurilor în memorie.
2. Se ocupă de operațiile de editare.
3. Rulează algoritmii.
4. Interacționează cu TableHandler pentru actualizarea tabelelor.

### Reprezentare schematică:
![reprezentare schematica](https://user-images.githubusercontent.com/54114237/88454320-6b02d800-ce77-11ea-8cfd-b39c654ef121.png)
## Testarea aplicației:
Aplicația a fost testată în mod continuu în timpul dezvoltării atât de către realizatori cât și de către colegii de clasă respectiv de profesorul de la clasă.

## Version Control:
Dezvoltarea aplicației a fost realizată prin ajutorul servicilor GitHub, care ne-au permis să lucrăm mai mulți în paralel. Codul este accesibil pe pagina de GitHub [graph-theory-visualization](github.com/ToastedWaffle/graph-theory-visualization).

## Securitatea aplicației:
Aplicația este securizată printr-o conexiune SSL (Secure Sockets Layer), iar certificatul nostru de SSL este emis de Let’s Encrypt Authority X3.
<br>
![securitate](https://user-images.githubusercontent.com/54114237/88283766-bf317f00-ccf4-11ea-9ad5-34f33fae075d.png)

## Interfață și design:
Interfața este una modernă, ușor de folosit, la care s-a luat în considerare grupul țintă (elevi/studenți).

![icons](https://user-images.githubusercontent.com/54114237/88283888-fdc73980-ccf4-11ea-978f-3af8dea13131.png)
Butoanele conțin iconuri care sunt percepute ușor de utilizatori și care oferă un aspect lizibil interfeței.

![tooltip](https://user-images.githubusercontent.com/54114237/88283932-1a637180-ccf5-11ea-880b-42d6672d7955.png)<br>
Pentru accesibilitate, fiecare buton afișează funcția sa atâta timp, cât cursorul este ținut peste el.

![left menu](https://user-images.githubusercontent.com/54114237/88284895-dd987a00-ccf6-11ea-906b-202cadf45614.png)
![right menu](https://user-images.githubusercontent.com/54114237/88285046-1df7f800-ccf7-11ea-910f-83a3aeb3c6be.png)<br>
Meniurile laterale sunt concepute astfel încât utilizatorul să le poate deschide sau închide și redimensiona, după preferință.

![normal zoom](https://user-images.githubusercontent.com/54114237/88285196-57306800-ccf7-11ea-9381-eab482ce3d88.png)
![zoomed in](https://user-images.githubusercontent.com/54114237/88285218-5dbedf80-ccf7-11ea-8710-bde4087b8d4e.png)<br>
Spațiul de lucru se poate micșora, mări și muta, oferind un spațiu flexibil pentru crearea grafurilor.

![card](https://user-images.githubusercontent.com/54114237/88284198-ac6b7a00-ccf5-11ea-819d-4771b97e43b1.png)<br>
Fiecare card din meniu conține un link ![info](https://user-images.githubusercontent.com/54114237/88284224-bbeac300-ccf5-11ea-838b-4d7d68a8d49a.png) spre secțiunea respectivă din pagina cu materialul educativ.

![mockup](https://user-images.githubusercontent.com/54114237/88288175-10913c80-ccfc-11ea-8ac7-78b9b6c1ada1.png)<br>
Aplicația respectiv pagina cu materialul educativ au un design responsive, astfel asigurând compatibilitatea cu dispozitivele mobile și desktop.

![quiz](https://user-images.githubusercontent.com/54114237/88285386-a8405c00-ccf7-11ea-9bbb-e1c8666a61e3.png)<br>
Pagina cu materialul educativ conține și quiz-uri, care au rolul de a ajuta utilizatorul să-și verifice cunoștințele.

## Caracteristici inovative:
1. Interfață prietenoasă.
2. Asigură posibilitatea desenării grafurilor și de animare a algoritmilor.
3. Animația se realizează în pași, utilizatorul le poate urmări atât în meniul din dreapta cât și pe graful desenat.
4. Reprezentările grafurilor sunt realizate în timp real.
5. Suportă toate tipurile de grafuri.
6. Oferă informații ușor accesibile despre grafuri și algoritmi.
7. Asigură posibilitatea de testare a cunoștințelor, oferă feedback despre rezultatul obținut.

## Resurse:
<details>
  <summary>Clic pentru a extinde</summary>
  
jsPlumb Community Edition:

1. [jsPlumb Community Edition Documentation](https://docs.jsplumbtoolkit.com/community/current/index.html)
2. [Snap to Grid in jsplumb](https://stackoverflow.com/questions/22065756/snap-to-grid-in-jsplumb)
3. [Unable to create straight line connection in JSPlumb](https://stackoverflow.com/questions/14662104/unable-to-create-straight-line-connection-in-jsplumb)
4. [Iterate through endpoints of div in jsPlumb](https://stackoverflow.com/questions/30308547/iterate-through-endpoints-of-div-in-jsplumb)

Bootstrap:

1. [Introduction · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
2. [Grid system · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/layout/grid/)
3. [Tables · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/content/tables/)
4. [Images · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/content/images/)
5. [Buttons · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/components/buttons/)
6. [Modal · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/components/modal/)
7. [Tooltips · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/components/tooltips/)
8. [Figures · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/content/figures/)
9. [Navbar · Bootstrap v4.5](https://getbootstrap.com/docs/4.5/components/navbar/)
10. [30 Most Amazing Free Bootstrap Sidebar Templates 2020](https://colorlib.com/wp/bootstrap-sidebar/)

Fontawesome:

1. [Font Awesome 6](https://fontawesome.com/icons?d=gallery&amp;m=free)
2. [Is it possible to color the fontawesome icon colors?](https://stackoverflow.com/questions/17540383/is-it-possible-to-color-the-fontawesome-icon-colors)
3. [Rotating Icons](https://fontawesome.com/v5.9.0/how-to-use/on-the-web/styling/rotating-icons)

Prism.js:

1. [Prism.js](https://prismjs.com/)
2. [Prism.js - Usage](https://prismjs.com/#basic-usage)
3. [Prism.js - Test Drive](https://prismjs.com/test.html#language=cpp)
4. [Unescaped markup ▲ Prism plugins](https://prismjs.com/plugins/unescaped-markup/)
5. [Prism.js](https://codepen.io/arturo20/pen/LbjPVG)
6. [Line Numbers ▲ Prism plugins](https://prismjs.com/plugins/line-numbers/)
7. [Copy to Clipboard ▲ Prism plugins](https://prismjs.com/plugins/copy-to-clipboard/)

Particles.js:

1. [Dynamic Point Mesh Animation with HTML5 Canvas](https://codepen.io/dudleystorey/pen/NbNjjX)

jquery.inputfit.js:

1. [vxsx/jquery.inputfit.js: Fit value in input](https://github.com/vxsx/jquery.inputfit.js)

jquery-resizable.js:

1. [RickStrahl/jquery-resizable: A small jQuery plug-in to make DOM components resizable](https://github.com/vxsx/jquery.inputfit.js)

jQuery:

1. [jQuery API Documentation](https://api.jquery.com/)
2. [Does jQuery have a handleout for .delegate(&#39;hover&#39;)?](https://stackoverflow.com/questions/4772287/does-jquery-have-a-handleout-for-delegatehover)
3. [How can I deselect text using Javascript or jQuery?](https://stackoverflow.com/questions/8684751/how-can-i-deselect-text-using-javascript-or-jquery)
4. [Disable/enable an input with jQuery?](https://stackoverflow.com/questions/1414365/disable-enable-an-input-with-jquery)
5. [How to call a function after a fadeOut() on many elements](https://stackoverflow.com/questions/7259608/how-to-call-a-function-after-a-fadeout-on-many-elements)
6. [How to add DATA-(something) attribute to .class element with jQuery](https://stackoverflow.com/questions/29353683/how-to-add-data-something-attribute-to-class-element-with-jquery)
7. [Jquery .on(&#39;scroll&#39;) not firing the event while scrolling](https://stackoverflow.com/questions/19375636/jquery-onscroll-not-firing-the-event-while-scrolling)
8. [How do I pass the this context into an event handler?](https://stackoverflow.com/questions/5490448/how-do-i-pass-the-this-context-into-an-event-handler)
9. [jquery stop child triggering parent event](https://stackoverflow.com/questions/2364629/jquery-stop-child-triggering-parent-event)
10. [Get the size of the screen, current web page and browser window](https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window)
11. [Mouse drag to scroll content](https://stackoverflow.com/questions/32039927/mouse-drag-to-scroll-content)

JavaScript:

1. [Listening for variable changes in JavaScript](https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript)
2. [Javascript scrollintoview smooth scroll and offset](https://stackoverflow.com/questions/49820013/javascript-scrollintoview-smooth-scroll-and-offset)
3. [How to overload constructors in JavaScript ECMA6?](https://stackoverflow.com/questions/38240744/how-to-overload-constructors-in-javascript-ecma6)
4. [Deleting Objects in JavaScript](https://stackoverflow.com/questions/742623/deleting-objects-in-javascript)
5. [Maximum size of an Array in Javascript](https://stackoverflow.com/questions/6154989/maximum-size-of-an-array-in-javascript)
6. [Do the keys of javascript associative arrays need to be strings, or can they be any object?](https://stackoverflow.com/questions/512825/do-the-keys-of-javascript-associative-arrays-need-to-be-strings-or-can-they-be)
7. [Integer division with remainder in JavaScript?](https://stackoverflow.com/questions/4228356/integer-division-with-remainder-in-javascript)

Khan Academy:

1. [What is jQuery? (video) | Welcome to jQuery](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-intro/v/what-is-jquery)
2. [Get ready to learn jQuery (article)](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-intro/a/are-you-ready-to-learn-jquery)

1. [Getting Started With jQuery](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-intro/pt/getting-started-with-jquery)
2. [Finding elements with jQuery | DOM access with jQuery](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-dom-access/pt/finding-elements-with-jquery)
3. [Debugging webpages with the browser console (video)](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-dom-access/v/debugging-webpages-with-the-browser-console)
4. [Getting info on elements with jQuery | DOM access with jQuery](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/jquery-dom-access/pt/getting-info-on-elements-with-jquery)
5. [Modifying elements with jQuery | DOM modification with jQuery](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/dom-modification-with-jquery/pt/modifying-elements-with-jquery)
6. [Creating elements with jQuery | DOM modification with jQuery](https://www.khanacademy.org/computing/computer-programming/html-js-jquery/dom-modification-with-jquery/pt/creating-elements-with-jquery)

Educative.io:

1. [JavaScript in Practice: Getting Started - Learn Interactively](https://www.educative.io/courses/javascript-in-practice-getting-started)
2. [JavaScript In Practice: ES6 And Beyond - Learn Interactively](https://www.educative.io/courses/javascript-in-practice-es6-and-beyond)

Alte resurse:
1. [https://www.pbinfo.ro/](https://www.pbinfo.ro/)
2. [https://profs.info.uaic.ro/~vcosmin/pagini/resurse_pregatire/resurse/graf_definitii.pdf](https://profs.info.uaic.ro/~vcosmin/pagini/resurse_pregatire/resurse/graf_definitii.pdf)
3. [https://www.tutorialspoint.com/graph_theory/graph_theory_traversability.htm](https://www.tutorialspoint.com/graph_theory/graph_theory_traversability.htm)
4. Manual de Informatică, pentru clasa a XI-a informatică intensiv (editura Abel, 2006, autori Ignát Judit Anna, Incze Katalin, Jakab Irma Tünde)
5. Bazele informaticii Grafuri și elemente de combinatorică (editura Petrion, 1995, autori Cornelia Ivasc, Mona Pruna)
</details>
