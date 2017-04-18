var save_image_url = 'https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg';
var remove_image_url = 'https://c1.staticflickr.com/4/3684/33135618604_414134ce5c_t.jpg';
var contentCollection = getValues();
contentCollection.unshift(" ");

  window.onload = function(){
    buildExtensionField();
    buildContentActions();
    populateDropDownMenu();
    attachInputListener();
    checkForResolved();
  }

  function checkForResolved() {
    var pageContent = document.getElementById('fc--message-list');
    var checkQuestions = setInterval(function() {
      if ($('.fc--question-node').length) {
        if ($('.active').length) {
          if (document.getElementById('fc--message-list').textContent.includes('Resolved')) {
            location.reload();
          }
        }
      }
      console.log('running');
    }, 10000)
  }

  function buildExtensionField() {
    var expertSection = document.getElementsByClassName('module__foot')[0];
    var newSection = document.createElement('div');
    newSection.setAttribute('class', 'content-filler');
    expertSection.children[1].before(newSection);
  }

  function getExtensionField() {
    return document.getElementsByClassName('module__foot')[0].children[1];
  }

  function buildContentActions() {
    var elements = [];
    elements.push(createButton('save'));
    elements.push(buildMenuField());
    elements.push(createButton('remove'));
    appendElementsToExtension(elements);
  }

  function createButton(type) {
    var newButton = document.createElement('button');
    var image = buttonImage(type);
    newButton.appendChild(image);
    newButton.id = `${type}_button`;
    newButton.style = "cursor: pointer";
    var titleName = type.charAt(0).toUpperCase() + type.slice(1);
    newButton.setAttribute('title', `${titleName} content`);
    newButton.onclick = function(event){
      var type = event.target.id.split("_")[0];
      eval(type + 'Action()');
    }
    return newButton;
 }

 function buttonImage(type){
    var image = document.createElement('img');
    var image_url = `${type}_image_url`;
    image.id = `${type}_image`;
    image.src = eval(image_url);
    return image;
 }

 function appendElementsToExtension(buttons) {
   var section = getExtensionField();
   for (i in buttons) {
     section.appendChild(buttons[i]);
   }
 }

 function buildMenuField() {
   var menuElement = document.createElement('select');
   menuElement.setAttribute('id', 'menu_element');
   return menuElement;
 }

 function getMenuElement() {
   return document.getElementById('menu_element');
 }

 function populateDropDownMenu(content = contentCollection) {
   var uniqueContents = [...new Set(content.sort())];
   for (var i = 0; i < uniqueContents.length; i++) {
     var item = uniqueContents[i];
     var element = document.createElement('option');
     element.text = item;
     element.value = item;
     getMenuElement().appendChild(element);
   }

  getMenuElement().selectedIndex = -1;
  getMenuElement().addEventListener('change', function() {
    setInput();
    focusOnInput();
  })

 }

 function resetMenu() {
   getMenuElement().innerHTML = " ";
 }

 function getValues(callback) {
   contentCollection = [];
   chrome.storage.sync.get(null, function(items) {
     var content = Object.keys(items);
     for (var i = 0; i < content.length; i++) {
       contentCollection.push(content[i]);
     }
   });
   callback;
   return contentCollection;
 }

 function saveAction() {
   var content = document.getElementsByTagName('textarea')[1].value;
   if (content.length <= 1) {
     console.log('Error: No content selected');
     return;
   }
   var obj = {};
   obj[content] = content;
   chrome.storage.sync.set(obj, function() {
     alert('content saved');
     console.log('content saved');
   });
   focusOnInput();
 }

 function removeAction() {
   var menu = getMenuElement();
   var value = menu.options[menu.selectedIndex].value;
   menu.remove(menu.selectedIndex);
   if (value != " ") {
     if (confirm('Are you sure you want to delete this item?')) {
       chrome.storage.sync.remove(value, function() {});
     }
   }
 }

 function setInput(){
   var value = getMenuElement().options[getMenuElement().selectedIndex].value;
   document.getElementsByTagName('textarea')[1].value = value;
 }

 function focusOnInput() {
   var menu = getMenuElement();
   document.getElementsByTagName('textarea')[1].focus();
 }

 function reloadDiv() {
   console.log('reloading');
   $('.content-filler').remove();
   buildExtensionField();
   buildContentActions();
   getValues(populateDropDownMenu());
 }

 function attachInputListener() {
   var input = document.getElementsByTagName('textarea')[1];
   input.addEventListener('change', function(event) {
     filterMenu();
   });
  input.addEventListener('keydown', function(e) {
    detectEnterAndClear(event);
  })
 }

 function filterMenu() {
   filteredList = [];
   var menu = getMenuElement();
   var input = document.getElementsByTagName('textarea')[1];
   input.oninput = function(event) {
     var filteredList = isIncluded(event);
     resetMenu();
     populateDropDownMenu(filteredList);
   }
 }

 function isIncluded(event) {
   var newArray = [];
   for (var i = 0; i < contentCollection.length; i++) {
     var content = contentCollection[i].toUpperCase();
     if (content.includes(event.target.value.toUpperCase())) {
       newArray.push(contentCollection[i]);
     }
   }
   return newArray;
 }

 function getUpperCaseArray() {
   var newArray = [];
   for (var i = 0; i < contentCollection.length; i++) {
     newArray.push(contentCollection[i].toUpperCase());
   }
   return newArray;
 }

 function changeCase(upperOrLower) {
   var newArray = [];
   var newString = "";
   for (var i = 0; i < contentCollection.length; i++) {
     (upperOrLower == 'upper') ? (newString = reverseUpperCase(contentCollection[i])) : (newString = contentCollection[i].toUpperCase());
     newArray.push(newString);
   }
   return newArray;
 }

 function reverseUpperCase(content) {
   return content.charAt(0).toUpperCase() + content.slice(1);
 }

 function clearInput() {
   var input = document.getElementsByTagName('textarea')[1].value == " ";
  //  if (input.value != undefined) {
  //    input.value = undefined
  //  }
 }

 function detectEnterAndClear(e){
   var key = e.which || e.keyCode;
   if (key == 13) {
     clearInput();
   }
 }
