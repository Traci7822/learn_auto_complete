var save_image_url = 'https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg';
var content_image_url = 'https://c1.staticflickr.com/4/3943/33793771665_e25336d636_t.jpg';
var contentCollection = [];

window.onload = function addSaveContentIcon(){
  event.preventDefault;
  var mediaSection = document.getElementsByClassName('media-block__content');
  getValues();
  var dropDown = createMenuField();
  var saveButton = createButtonField('save');
  var contentButton = createButtonField('content');
  mediaSection[4].appendChild(dropDown);
  mediaSection[4].appendChild(saveButton);
  mediaSection[4].prepend(contentButton);

}

function getValues() {
  chrome.storage.sync.get(null, function(items) {
    for (key in items) {
      contentCollection.push(key);
      console.log(key);
    }
  })
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
    // ensure it's saving to storage and then fetch for contentCollection
    // contentCollection.push(obj)
  })
}

function createMenuField() {
  var menuElement = document.createElement('div');
  menuElement.setAttribute('id', 'menuElement');
  menuElement.setAttribute('style', 'display:none');
  return menuElement;
}

function appendMenuOptions(parentElement) {
  parentElement.innerText = "";
  for (var i = 0; i < contentCollection.length; i++) {
    var item = contentCollection[i];
    var element = document.createElement('option');
    element.text = item;
    element.value = item;
    parentElement.appendChild(element);
  }
  return parentElement
}

function contentAction() {
  appendMenuOptions(document.getElementById('menuElement'));
  displayMenuDiv();
  // On input, display filtered results in menuElement
  // Add scroll
  // Allow for selection
  // Return selection to input field
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
  // Turn on event watcher for input (toggle on)
}
