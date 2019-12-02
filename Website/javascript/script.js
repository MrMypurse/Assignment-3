// Hide intro screen when user clicks Proceed button
// and display container
function hideIntro() {
  let x = document.getElementById("intro-screen");
  let y = document.getElementById("container");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}
