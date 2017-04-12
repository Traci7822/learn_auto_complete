var save_image_url = 'https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg';
var content_image_url = 'https://c1.staticflickr.com/4/3943/33793771665_e25336d636_t.jpg';
var remove_image_url = 'https://c1.staticflickr.com/4/3684/33135618604_414134ce5c_t.jpg';
var contentCollection = [];
var filteredList = [];

window.onload = function(){
  loadExtension();
  activeChats();
}

function loadExtension() {
  getValues();
  addFields();
}

function addFields() {
  var mediaSection = document.getElementsByClassName('media-block__content--fill')[0];
  appendSection(mediaSection, createMenuField());
  appendSection(mediaSection, createButtonField('save'));
  appendSection(mediaSection, createButtonField('remove'));
  prependSection(mediaSection, createButtonField('content'));
}

function activeChats() {
  var checkExist = setInterval(function() {
    if ($('.fc--question-node').length) {
      checkForActiveQuestion();
      clearInterval(checkExist);
    }
  }, 1000);
}

function appendSection(section, child) {
  section.appendChild(child);
}

function prependSection(section, child) {
  section.prepend(child);
}

function getValues() {
  resetCollection(contentCollection);
  chrome.storage.sync.get(null, function(items) {
    for (key in items) {
      contentCollection.push(key);
      console.log(key);
    }
  });
}

function createMenuField() {
  var menuElement = document.createElement('select');
  menuElement.setAttribute('id', 'menuElement');
  menuElement.setAttribute('style', 'display:none');
  return menuElement;
}

function createButtonField(type) {
  var button = document.createElement('button');
  var image = createImage(type);
  var titleName = type.charAt(0).toUpperCase() + type.slice(1);
  button.appendChild(image);
  button.id = `${type}_button`;
  button.style = "cursor: pointer";
  button.setAttribute('title', `${titleName} content`);
  button.onclick = function(event){
    var type = event.target.id.split("_")[0];
    eval(type + 'Action()');
  }
  return button;
}

function checkForActiveQuestion() {

}

function resetCollection(collection) {
  collection = [];
}
