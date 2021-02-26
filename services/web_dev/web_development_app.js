const TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 200 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }
  
    setTimeout(function() {
    that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };
  ////////////////////////////////////////////////////////////////////
  
  const serv = document.getElementById("serv") ;
  const drop = document.getElementById("drop") ;
  const arrowServ = document.getElementById("arrow") ;
  arrowServ.style.transition = '0.5s' ;
  const openServ = () => {
    drop.style.display = 'inline-block' ;
    
    drop.setAttribute('data-open', 'true') ;
    arrowServ.style.transform = 'rotate(180deg)' ;
    arrowServ.style.color = '#1ba94c' ;
  } ;
  
  const closeServ = () => {
    drop.style.display = 'none' ;
    drop.setAttribute('data-open', 'false') ;
    arrowServ.style.transform = 'rotate(0deg)'; 
    arrowServ.style.color = '#fff' ;
  } ;
  serv.addEventListener('mouseover', () => {
    openServ() ;
    drop.addEventListener('mouseover', () => {
      openServ() ;
    })
  }) ;
  
  serv.addEventListener('mouseleave', () => {
    closeServ() ;
    drop.addEventListener('mouseleave', () => {
      closeServ() ;
    })
  })
  /////////////////////////////////////////////////
  const sideDown = document.getElementById('side-down') ;
  const openSide = document.getElementById('open-side-down') ;
  const closeSide = document.getElementById('close-side-down') ;
  
  openSide.addEventListener('click', () => {
    sideDown.style.top = '0' ;
  }) ;
  const closeSideDown = () => {
    sideDown.style.top = '-100%' ;
    closeServMenu() ;
  } ;
  closeSide.addEventListener('click', closeSideDown) ;
  
  const sideServTog = document.getElementById('side-menu-serv') ;
  const sideServ = document.getElementById('side-serv') ;
  const sideArrow = document.getElementById('side-arrow') ;
  const closeServMenu = () => {
    sideServ.style.display = 'none' ;
      sideServTog.setAttribute('data-open', 'false') ;
      sideArrow.style.transform = 'rotate(0)' ;
      sideArrow.style.transition = '0.5s' ;
      sideArrow.style.color = '#fff' ;
      
  };
  sideServTog.addEventListener('click', () => {
    if (sideServTog.getAttribute('data-open') === 'false') {
      sideServ.style.display = 'inline-block' ;
      sideServTog.setAttribute('data-open', 'true') ;
      sideArrow.style.transform = 'rotate(180deg)' ;
      sideArrow.style.transition = '0.5s' ;
      sideArrow.style.color = '#9d8df7' ;
    } else {
      closeServMenu() ;
    }
  }) ;
///////////////////    // 
const inputs = document.getElementsByClassName("input") ;
const dataErrInput = document.getElementsByClassName("error-data") ;
// console.log(dataErrInput) ;
const focusInput = (index) => {
  inputs[index].parentNode.classList.add("focus") ;
  if(dataErrInput[index].innerHTML != "") {
    dataErrInput[index].innerHTML = "" ;
  }
}

const blurInput = index => {
  if (inputs[index].value == "") {
    inputs[index].parentNode.classList.remove("focus") ;
    console.log(inputs[index].getAttribute("data-error")) ;
    dataErrInput[index].innerHTML = inputs[index].getAttribute("data-error") ;
  }
}

for(let i = 0 ; i < inputs.length ; i++) {
  inputs[i].addEventListener('focus', () => {
      focusInput(i) ;
  }) ;
  inputs[i].addEventListener('blur', () => {
    blurInput(i) ;
  }) ;
}

const filesArr = [] ;
const fileInput = document.getElementById("file") ;
const uploadedFiles = document.getElementById('uploaded-files') ;
const uploadedFileClass = document.getElementsByClassName("uploadedFileClass") ;
const noFile = document.getElementsByClassName("no-file") ;
const delFile = (ind, element) => {
    filesArr.splice(ind,1) ;
    uploadedFiles.children[ind].remove() ;
    
    
};


const showFile = (obj) => {
  uploadedFiles.innerHTML += `<div class="uploadedFileClass" data-index="${obj.index}" ><label>
                              ${obj.fileName}  <label/><i class="far fa-times-circle removeFile" 
                              data-remove-index="${obj.index}" onclick="delFile(${obj.index}, uploadedFileClass[${obj.index}])"></i></div>`;
};
const pushFiles = file => {
  if (filesArr.length >= 3){
    alert("Sorry, You can not add more than three files.") ;
  } else {
    filesArr.push(file) ;
  showFile(file) ;
  }
  
}

// creating file class -- 
class File {
  constructor(name, size, ind) {
    this.fileName = name;
    this.fileSize = size;
    this.index = ind;
  }
};


fileInput.addEventListener('change', () => {
  const newFile = new File(fileInput.files[fileInput.files.length - 1].name, 
    fileInput.files[fileInput.files.length - 1].size, filesArr.length) ;
    pushFiles(newFile) ;
});
/////////////////////// 

const copyYear = document.getElementById("copy-year") ;
let year = new Date() ;
copyYear.innerHTML = year.getFullYear() ;