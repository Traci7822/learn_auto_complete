// //escape parenthesis to counter invalid RegExp
// // break sections into divs
// //  remove blank option from filtered menu
// // finesse autocomplete
// // tab trigger to autocomplete
// // return focus to input to be able to send w/ a
// // toggle clears input
//
var save_image_url = 'https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg';
// var content_image_url = 'https://c1.staticflickr.com/4/3943/33793771665_e25336d636_t.jpg';
var remove_image_url = 'https://c1.staticflickr.com/4/3684/33135618604_414134ce5c_t.jpg';
var contentCollection = ['hi', 'sup', 'fruit'];
// var filteredList = [];
//
  window.onload = function(){
    buildExtensionField();
    buildContentActions();
    loadContent();
  }

  function loadContent() {
    getMenuElement();
    populateDropDownMenu();
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

 function populateDropDownMenu(contents = contentCollection) {
   contents.unshift(" ");
   var uniqueContents = [...new Set(contents)];
   uniqueContents.sort();
   for (var i = 0; i < uniqueContents.length; i++) {
     var item = uniqueContents[i];
     var element = document.createElement('option');
     element.text = item;
     element.value = item;
     getMenuElement().appendChild(element);
   }
   getMenuElement().addEventListener('change', function() {
     setInput();
   })
 }

 function resetMenu() {
     getMenuElement().innerHTML = " ";
  }

 function reloadMenu() {
   resetMenu();
   populateDropDownMenu();
 }

 function saveAction() {
   var content = document.getElementsByTagName('textarea')[1].value;
   contentCollection.push(content)
   reloadMenu();
 }

 function removeAction() {
   var menu = getMenuElement();
   var value = menu.options[menu.selectedIndex].value;
   menu.remove(menu.selectedIndex);
  var index = contentCollection.indexOf(value);
  contentCollection.splice(index, 1);
  reloadMenu();
 }

 function setInput() {
   var menu = getMenuElement();
   var value = menu.options[menu.selectedIndex].value;
   document.getElementsByTagName('textarea')[1].value = value;
 }




 // function createButton(type){
 //   var button = document.createElement('button');
 //   var image = createImage(type);
 //   button.appendChild(image);
 //   button.id = `${type}_button`;
 //   button.style = "cursor: pointer";
 //   var titleName = type.charAt(0).toUpperCase() + type.slice(1);
 //   button.setAttribute('title', `${titleName} content`);
 //   button.onclick = function(event){
 //     var type = event.target.id.split("_")[0];
 //     eval(type + 'Action()');
 //   }
 //   return button;
 // }

//   // event.preventDefault;
//   loadExtension();
//   activeChats();

//
// function activeChats() {
//   var checkExist = setInterval(function() {
//     if ($('.fc--question-node').length) {
//       checkForActiveQuestion();
//       console.log('questions are loaded');
//       clearInterval(checkExist);
//     }
//   }, 1000);
// }
//
// function checkForActiveQuestion() {
//   console.log('running');
//   if ($('.active').length) {
//   } else {
//     // keeps reloading until question is selected
//     var mediaSection = document.getElementsByClassName('media-block__content--fill');
//     if (!mediaSection[0].classList.contains('loaded')) {
//       loadExtension();
//     }
//   }
// }
//
// function loadExtension() {
//   getValues();
//   var mediaSection = document.getElementsByClassName('media-block__content--fill');
//   var dropDown = createMenuField();
//   var saveButton = createButtonField('save');
//   var contentButton = createButtonField('content');
//   mediaSection[0].appendChild(dropDown);
//   mediaSection[0].appendChild(saveButton);
//   mediaSection[0].prepend(contentButton);
//   var removeButton = createButtonField('remove');
//   removeButton.style.visibility = 'hidden';
//   mediaSection[0].appendChild(removeButton);
//   mediaSection[0].classList += ' loaded';
// }
//
// function getValues() {
//   resetCollection(contentCollection);
//   chrome.storage.sync.get(null, function(items) {
//     for (key in items) {
//       contentCollection.push(key);
//       console.log(key);
//     }
//   })
// }
//
// function resetCollection(collection) {
//   collection = [];
// }
//
// function createButtonField(type) {
//   var button = createButton(type);
//   var buttonField = createField(button, type);
//   return buttonField;
// }
//
// function createButton(type){
//   var button = document.createElement('button');
//   var image = createImage(type);
//   button.appendChild(image);
//   button.id = `${type}_button`;
//   button.style = "cursor: pointer";
//   var titleName = type.charAt(0).toUpperCase() + type.slice(1);
//   button.setAttribute('title', `${titleName} content`);
//   button.onclick = function(event){
//     var type = event.target.id.split("_")[0];
//     eval(type + 'Action()');
//   }
//   return button;
// }
//
// function createField(button, type){
//   var buttonField = document.createElement('div');
//   buttonField.setAttribute('class', `${type}_button_field`);
//   buttonField.appendChild(button);
//   return buttonField;
// }
//
// function createMenuField() {
//   var menuElement = document.createElement('select');
//   menuElement.setAttribute('id', 'menuElement');
//   menuElement.setAttribute('style', 'display:none');
//   return menuElement;
// }
//
// function createImage(type) {
//   var image = document.createElement('IMG');
//   image.id = `${type}_image`;
//   var image_url = `${type}_image_url`;
//   image.src = eval(image_url);
//   return image;
// }
//
// function saveAction(){
//   var content = document.getElementsByTagName('textarea')[1].value;
//   var obj = {};
//   obj[content] = content;
//   if (content.length <= 1) {
//     console.log('Error: No content selected');
//     return;
//   }
//   chrome.storage.sync.set(obj, function() {
//     console.log('content saved');
//   })
//   refreshMenuDiv();
//   // Option to contribute: reset menu upon save w/o toggling menu
// }
//
// function contentAction() {
//   var menu = getMenu();
//   appendMenuOptions(menu);
//   displayMenuDiv();
//   // window.setTimeout(checkForActiveQuestion(), 20000);
//
//   // checkForActiveQuestion();
// }
//
// function removeAction() {
//   var content = document.getElementsByTagName('textarea')[1].value;
//   if (content != " ") {
//     if (confirm('Are you sure you want to delete this item?')) {
//       chrome.storage.sync.remove(content, function() {
//         // Would like to refresh menu div instead of whole window
//         refreshWindow();
//         alert('content deleted');
//       })
//     }
//   }
// }
//
// function getMenu() {
//   return document.getElementById('menuElement');
// }
//
// function appendMenuOptions(parentElement, content = contentCollection) {
//   parentElement.innerText = "";
//   content.unshift(" ");
//   var uniqueContents = [...new Set(content)];
//   for (var i = 0; i < uniqueContents.length; i++) {
//     var item = uniqueContents[i];
//     var element = document.createElement('option');
//     element.text = item;
//     element.value = item;
//     parentElement.appendChild(element);
//   }
//   return parentElement
// }
//
//
// function refreshMenuDiv() {
//   getValues();
//   var menu = getMenu();
//   var newMenu = appendMenuOptions(menu);
//   menu.innerHTML = newMenu.innerHTML;
// }
//
// function filterMenu() {
//   resetCollection(filteredList);
//   var menu = getMenu();
//   if (menu.style.display == 'block') {
//     var input = document.getElementsByTagName('textarea')[1];
//     input.oninput = function(event) {
//       var filteredList = isIncluded(event);
//       appendMenuOptions(menu, filteredList);
//       menu.addEventListener('change', function(event) {
//         getSelection(event);
//       });
//     }
//   }
// }
//
// function isIncluded(event) {
//   var newList = [];
//   for (var i = 0; i < contentCollection.length; i++) {
//     if (contentCollection[i].search(event.target.value) > -1) {
//       newList.push(contentCollection[i]);
//     }
//   }
//   return newList;
// }
//
// function displayMenuDiv() {
//   var menu = getMenu();
//   var input = document.getElementsByTagName('textarea')[1];
//   if (menu.style.display == 'block' || menu.style.display == '') {
//     menu.style.display = 'none';
//     $('.remove_button_field').hide()
//   } else {
//     menu.style.display = 'block';
//     input.value = " ";
//     document.getElementsByClassName('remove_button_field')[0].setAttribute('style', 'visibility: "block"');
//     input.addEventListener('change', function(event) {
//       // figure out why it only sometimes filters
//       // need to initiate sooner, missing first input
//       filterMenu();
//     })
//     menu.addEventListener('change', function(event) {
//       getSelection(event);
//     });
//   }
// }
//
// function getSelection(event){
//   var selection = event.target.value;
//   document.getElementsByTagName('textarea')[1].value = selection;
// }
//
// function refreshWindow() {
//   window.location.href = window.location.href;
// }
//
// function resetInput() {
//   var input = document.getElementsByTagName('textarea')[1];
//   input.value = " ";
// }
