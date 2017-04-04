var save_image_url = 'https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg';
var content_image_url = 'https://c1.staticflickr.com/4/3943/33793771665_e25336d636_t.jpg';
var contentCollection = [];

window.onload = function addSaveContentIcon(){
  event.preventDefault;
  var mediaSection = document.getElementsByClassName('media-block__content');
  var dropDown = createMenuField();
  var saveButton = createButtonField('save');
  var contentButton = createButtonField('content');
  mediaSection[4].appendChild(dropDown);
  mediaSection[4].appendChild(saveButton);
  mediaSection[4].prepend(contentButton);
}

function createButtonField(type) {
  var button = createButton(type);
  var buttonField = createField(button, type);
  return buttonField;
}

function createButton(type){
  var button = document.createElement('button');
  var image = createImage(type);
  button.appendChild(image);
  button.id = `${type}_button`;
  button.style = "cursor: pointer";
  button.onclick = function(event){
    var type = event.target.id.split("_")[0];
    eval(type + 'Action()');
  }
  return button;
}

function createField(button, type){
  var buttonField = document.createElement('div');
  buttonField.setAttribute('class', `${type}_button_field`);
  buttonField.appendChild(button);
  return buttonField;
}

function createImage(type) {
  var image = document.createElement('IMG');
  image.id = `${type}_image`;
  var image_url = `${type}_image_url`;
  image.src = eval(image_url);
  return image;
}

function saveAction(){
  var content = document.getElementsByTagName('textarea')[1].value;
  var obj = {};
  obj['value'] = content;
  if (content.length <= 1) {
    console.log('Error: No content selected');
    return;
  }
  chrome.storage.sync.set(obj, function() {
    console.log('content saved')
    contentCollection.push(obj)
  })
}
function createMenuField() {
  var menuElement = document.createElement('div');
  menuElement.setAttribute('id', 'menuElement');
  menuElement.setAttribute('style', 'display:none');
  // var menu = createMenuElement();
  // menuElement.appendChild(menu);
  return menuElement;
}
// create dropdown w/ display none
function createMenuElement() {
  var menu = document.createElement('select');
  menu.setAttribute('id', 'menu');
  return menu;
  // add event listener for change event to update list
  // update instead of appending
  // menuElement.appendChild(menu);

}

function appendMenuOptions(parentElement) {
  // debugger;
  // clearContentDiv();
// populating every other instance, need to clear before re-appending
  for (var i = 0; i < contentCollection.length; i++) {
    debugger;
    var item = contentCollection[i];
    var element = document.createElement('option');
    element.text = item.value;
    element.value = item.value;
    parentElement.appendChild(element);
  }
  return parentElement
}

function contentAction() {
  event.preventDefault();
  appendMenuOptions(document.getElementById('menuElement'));

  // 1. turn on event watcher for input (toggle on)
  displayMenuDiv();
  // debugger;
  //  add scroll
  // clear backlog, shows 2X on every other click, first click shows nothing


  // 2. display filtered results based on imput


  // displayMenuItems();
  // 3. return selection to input field

  // var field = populateDropDown();
  // var input = document.getElementsByTagName('textarea')[1];
  // input.appendChild(field);
  // field not showing up yet
}

function clearContentDiv() {
  var content = document.getElementById('menuElement');
  content.innerHTML = "";
}

function displayMenuDiv() {
  var menu = document.getElementById('menuElement');
  if (menu.style.display == 'block' || menu.style.display == '') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

function displayMenuItems() {
}

// function populateDropDown() {
//   var dropDownField = document.createElement('div');
//   var dropDownList = document.createElement('select');
//   for (var i = 0; i < contentCollection.length; i++) {
//     var item = document.createElement('option');
//     item.value = contentCollection[i].value;
//     item.innerHTML = item.value;
//     dropDownList.appendChild(item);
//   }
//   dropDownField.appendChild(dropDownList);
//   return dropDownField;
// }
