document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded, attaching event listeners...");

  const useDepartureLocation = document.getElementById("use_departure_location");
  const useDestinationLocation = document.getElementById("use_destination_location");

  if (useDepartureLocation) {
    useDepartureLocation.addEventListener("change", function () {
      if (this.checked) {
        console.log("Departure location checkbox checked.");
        if (navigator.geolocation) {
          console.log("Requesting geolocation...");
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`Location obtained: ${lat}, ${lon}`);

            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
              .then((response) => response.json())
              .then((data) => {
                console.log(`Location data received: ${data.city}`);
                document.getElementById("departure").value = data.city;
              });
          }, function (error) {
            console.error("Geolocation error: ", error.message);
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      } else {
        document.getElementById("departure").value = "";
      }
    });
  }

  if (useDestinationLocation) {
    useDestinationLocation.addEventListener("change", function () {
      if (this.checked) {
        console.log("Destination location checkbox checked.");
        if (navigator.geolocation) {
          console.log("Requesting geolocation...");
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`Location obtained: ${lat}, ${lon}`);

            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
              .then((response) => response.json())
              .then((data) => {
                console.log(`Location data received: ${data.city}`);
                document.getElementById("destination").value = data.city;
              });
          }, function (error) {
            console.error("Geolocation error: ", error.message);
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      } else {
        document.getElementById("destination").value = "";
      }
    });
  }
});
