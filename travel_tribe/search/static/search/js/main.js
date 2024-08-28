document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded, attaching event listeners...");

  const useLocation = document.getElementById("use_location");

  if (useLocation) {
    useLocation.addEventListener("change", function () {
      if (this.checked) {
        console.log("Location checkbox checked.");
        if (navigator.geolocation) {
          console.log("Requesting geolocation...");
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`Location obtained: ${lat}, ${lon}`);

            // Use the location for both departure and destination
            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(`Location data received: ${data.city}`);
                document.getElementById("departure").value = data.city;
                document.getElementById("destination").value = data.city;
              });
          }, function (error) {
            console.error("Geolocation error: ", error.message);
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      } else {
        document.getElementById("departure").value = "";
        document.getElementById("destination").value = "";
      }
    });
  }
});
