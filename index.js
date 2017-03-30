// chrome.storage.sync will store user data
function hello(){
  alert('hello')
}

// Event Page info
// ------------------
// Lifetime
// The event page is loaded when it is "needed", and unloaded when it goes idle again. Here are some examples of things that will cause the event page to load:
//
// The app or extension is first installed or is updated to a new version (in order to register for events).
// The event page was listening for an event, and the event is dispatched.
// A content script or other extension sends a message.
// Another view in the extension (for example, a popup) calls runtime.getBackgroundPage.
// Once it has been loaded, the event page will stay running as long as it is active (for example, calling an extension API or issuing a network request). Additionally, the event page will not unload until all visible views (for example, popup windows) are closed and all message ports are closed. Note that opening a view does not cause the event page to load, but only prevents it from closing once loaded.
//
// Make sure your event page closes as soon as the event that opened it is processed. You can observe the lifetime of your event page by opening Chrome's task manager. You can see when your event page loads and unloads by observing when an entry for your extension appears in the list of processes.
//
// Once the event page has been idle a short time (a few seconds), the runtime.onSuspend event is dispatched. The event page has a few more seconds to handle this event before it is forcibly unloaded. If during this time an event occurs which would normally cause the event page to be loaded, the suspend is canceled and the runtime.onSuspendCanceled event is dispatched.

window.onload = function addSaveContentIcon(){
  var newMediaSpot = document.createElement('div');
  newMediaSpot.setAttribute('class', 'copy_button');
  var newMediaImage = document.createElement('img');
  newMediaImage.src = "https://c1.staticflickr.com/3/2900/33745640515_a90c44b434_t.jpg";
  newMediaImage.setAttribute = ('id', "image_icon");
  newMediaSpot.appendChild(newMediaImage);
  var mediaSection = document.getElementsByClassName('media-block__content');
  mediaSection[4].appendChild(newMediaSpot);
}
