(function () {
  var elem;
  try {
    if (document.activeElement) {
      elem = document.activeElement.parentNode;
    }
  } catch (e) {
  } finally {
    if (!elem) {
      elem = document.body;
    }
  }
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}) ();
