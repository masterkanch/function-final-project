var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");

menuIcon.onclick = function(){
    sidebar.classList.toggle("small-sidebar");
}

var rndplay = false;
var loopType = 0; //0=noloop 1=loop1 2=loopAll
var ele = document.getElementById("mediaPlayer");
var filelist = document.getElementById('filepar'); //! change

var allFiles = [];

let htmlString = "";
for (var i = 0; i < allFiles.length; i++) { 
   //filelist.innerHTML += allFiles[i] + "<BR>\n";
   htmlString += `<div class="file" id="${i}" onclick="clicktoplay()">${allFiles[i].replace(".mp4", "")}</div>`
}
filelist.innerHTML = htmlString;

var index = -1;

var temp;

var dirPath="."
function clearlist() { 
  var ele = document.getElementById("mediaPlayer");
  ele.src = dirPath + "/" + "blackvideo.mp4";
  ele.load();
	//ele.currentTime = 20;
  ele.play();
	ele.volume = 0.5;
  var par = document.getElementById("currentFile");
	par.innerHTML = "untitle video";
	allFiles = [];
	document.getElementById('filepar').innerHTML = "";
	console.log(allFiles,allFiles.length);
}

function backArray() {
	if(index != 0){
	index = index - 1;
	var par = document.getElementById("currentFile");
	par.innerHTML = allFiles[index].replace(".mp4", "");
	// video part
	var ele = document.getElementById("mediaPlayer");
	ele.src = dirPath + "/" + allFiles[index];
	ele.load();
	//ele.currentTime = 20;
	ele.play();
	ele.volume = 0.5;
	}
}

function changeLoop(){
	var img_loop = document.getElementById("img_loop");

	loopType += 1
	if(loopType == 3) {loopType = 0;}
	if(loopType == 0) {img_loop.src = "images/noloop.png"}
	if(loopType == 1) {img_loop.src = "images/loop1.png"}
	if(loopType == 2) {img_loop.src = "images/loopall.png"}
}

function randomMode(){
	allFiles = shuffleArray(allFiles)
	console.log(allFiles)
	index = 0;
	console.log(index);
	document.getElementById('filepar').innerHTML = ""; //! change

	for (var i = 0; i < allFiles.length; i++) { //! change
		filelist.innerHTML += allFiles[i] + "<BR>\n";
	}

	var par = document.getElementById("currentFile");
	par.innerHTML = allFiles[index].replace(".mp4", "");
	var ele = document.getElementById("mediaPlayer");
	ele.src = dirPath + "/" + allFiles[index];
	ele.load();
	ele.play();
}

function clicktoplay(){ //* check some bug
  var id = event.target.id;
  index = id;
  var par = document.getElementById("currentFile");
	par.innerHTML = allFiles[index].replace(".mp4","");
  var ele = document.getElementById("mediaPlayer");
  ele.src = dirPath + "/" + allFiles[index];
  ele.load();
	//ele.currentTime = 20;
  ele.play();
	ele.volume = 0.5;
  //alert(allFiles[id]);
}
function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function playArray(){
	console.log(index)
	if (loopType != 1) //Not loop for current file
	{
		index = (index + 1) % allFiles.length;
	}
	var par = document.getElementById("currentFile");
	par.innerHTML = allFiles[index].replace(".mp4","");
	// video part
	var ele = document.getElementById("mediaPlayer");
    ele.src = dirPath + "/" + allFiles[index];
    ele.load();
	//ele.currentTime = 20;
    ele.play();
	ele.volume = 0.5;
	console.log(index)
	//index = (index + 1) % allFiles.length; //ถ้าเป็นtype1ไม่ต้องบวก
}

function allowDrop(ev) {
  ev.preventDefault();
}
var dropfile;


var dropzone2 = document.getElementById('dropzone2');
dropzone2.ondrop = function(e) { //* check drag and drop bug
  e.preventDefault();
  var length = e.dataTransfer.items.length;
  console.log(length);
  for (var i = 0; i < length; i++) {
    var entry = e.dataTransfer.items[i].webkitGetAsEntry();
    allFiles.push(entry.name);
    console.log(allFiles);

	 // temp = e.dataTransfer;
    //console.log(temp.items[i]);

    /* 
    if (entry.isFile) {
      filelist.innerHTML += entry.name + "<BR>\n"; //! change
	  allFiles.push(entry.name); //* add file name to array
    } else if (entry.isDirectory) {
      filelist.innerHTML += entry.fullPath + "<BR>\n"; //! change
	  
    }
    */
  }

  var newfile = allFiles.indexOf(e.dataTransfer.items[0].webkitGetAsEntry().name)
  for (var i = newfile; i < allFiles.length; i++) { //!change
   //filelist.innerHTML += allFiles[i] + "<BR>\n";
   htmlString += `<div class="file" id="${i}" onclick="clicktoplay()">${allFiles[i].replace(".mp4", "")}</div>`
   console.log("hello")
    }
  filelist.innerHTML = htmlString;
};