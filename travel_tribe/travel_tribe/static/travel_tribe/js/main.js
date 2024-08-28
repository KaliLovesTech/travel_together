function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  document.getElementById("location").value =
    position.coords.latitude + "," + position.coords.longitude;
}

function addCustomActivity() {
  const customActivitiesDiv = document.getElementById("custom-activities");
  const newActivityInput = document.createElement("input");
  newActivityInput.setAttribute("type", "text");
  newActivityInput.setAttribute("class", "form-control form-control-lg mb-3");
  newActivityInput.setAttribute("name", "custom_activities");
  newActivityInput.setAttribute("placeholder", "Enter custom activity");
  customActivitiesDiv.appendChild(newActivityInput);
}
