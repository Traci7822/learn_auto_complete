// add remove feature
// remove jquery if not used
// Add scroll

var save_image_url = 'https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg';
var content_image_url = 'https://c1.staticflickr.com/4/3943/33793771665_e25336d636_t.jpg';
var contentCollection = [];
var filteredList = [];

window.onload = function addSaveContentIcon(){
  event.preventDefault;
  getValues();
  var mediaSection = document.getElementsByClassName('media-block__content');
  var dropDown = createMenuField();
  var saveButton = createButtonField('save');
  var contentButton = createButtonField('content');
  mediaSection[4].appendChild(dropDown);
  mediaSection[4].appendChild(saveButton);
  mediaSection[4].prepend(contentButton);
}

function getValues() {
  resetCollection(contentCollection);
  chrome.storage.sync.get(null, function(items) {
    for (key in items) {
      contentCollection.push(key);
      console.log(key);
    }
  })
}

function resetCollection(collection) {
  collection = [];
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
  obj[content] = content;
  if (content.length <= 1) {
    console.log('Error: No content selected');
    return;
  }
  chrome.storage.sync.set(obj, function() {
    console.log('content saved');
  })
  refreshMenuDiv();
  // Option to contribute: reset menu upon save w/o toggling menu
}

function createMenuField() {
  var menuElement = document.createElement('select');
  menuElement.setAttribute('id', 'menuElement');
  menuElement.setAttribute('style', 'display:none');
  return menuElement;
}

function getMenu() {
  return document.getElementById('menuElement');
}

function appendMenuOptions(parentElement, content = contentCollection) {
  parentElement.innerText = "";
  content.unshift(" ");
  var uniqueContents = [...new Set(content)];
  for (var i = 0; i < uniqueContents.length; i++) {
    var item = uniqueContents[i];
    var element = document.createElement('option');
    element.text = item;
    element.value = item;
    parentElement.appendChild(element);
  }
  return parentElement
}



function refreshMenuDiv() {
  getValues();
  var menu = getMenu();
  var newMenu = appendMenuOptions(menu);
  menu.innerHTML = newMenu.innerHTML;
}

function contentAction() {
  var menu = getMenu();
  appendMenuOptions(menu);
  displayMenuDiv();
}

function filterMenu() {
  resetCollection(filteredList);
  var menu = getMenu();
  if (menu.style.display == 'block') {
    var input = document.getElementsByTagName('textarea')[1];
    input.oninput = function(event) {
      var filteredList = isIncluded(event);
      appendMenuOptions(menu, filteredList);
      menu.addEventListener('change', function(event) {
        getSelection(event);
      });
    }
  }
}

function isIncluded(event) {
  var newList = [];
  for (var i = 0; i < contentCollection.length; i++) {
    if (contentCollection[i].search(event.target.value) > -1) {
      newList.push(contentCollection[i]);
    }
  }
  return newList;
}

function displayMenuDiv() {
  var menu = getMenu();
  var input = document.getElementsByTagName('textarea')[1];
  if (menu.style.display == 'block' || menu.style.display == '') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
    input.addEventListener('change', function(event) {
      // need to initiate sooner, missing first input
      filterMenu();
    })
    menu.addEventListener('change', function(event) {
      getSelection(event);
    });
  }
}

function getSelection(event){
  var selection = event.target.value;
  document.getElementsByTagName('textarea')[1].value = selection;
}
