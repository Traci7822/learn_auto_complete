var save_image_url = 'https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg';
var content_image_url = 'https://c1.staticflickr.com/4/3943/33793771665_e25336d636_t.jpg';
var contentCollection = []

window.onload = function addSaveContentIcon(){
  event.preventDefault;
  var mediaSection = document.getElementsByClassName('media-block__content');
  var saveButton = createButtonField('save');
  var contentButton = createButtonField('content');
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

function contentAction() {
  var content = [];
  var dropDownField = document.createElement('div');
  debugger;
  var dropDownContent = chrome.storage.sync.get('value', function(items) {
    if (!chrome.runtime.error) {
      for (var i = 0; i < items.length; i++) {
        content.push(item);
        console.log(item);
      }
    }
  })
  // chrome.storage.sync.get('value', function(items) {
  //   if (!chrome.runtime.error) {
  //     console.log(items);
  //   }
  // });
}
