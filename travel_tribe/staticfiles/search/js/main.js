document.addEventListener("DOMContentLoaded", function () {
  const useDepartureLocation = document.getElementById(
    "use_departure_location"
  );
  const useDestinationLocation = document.getElementById(
    "use_destination_location"
  );

  if (useDepartureLocation) {
    useDepartureLocation.addEventListener("change", function () {
      if (this.checked) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            )
              .then((response) => response.json())
              .then((data) => {
                document.getElementById("departure").value = data.city;
              });
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
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            )
              .then((response) => response.json())
              .then((data) => {
                document.getElementById("destination").value = data.city;
              });
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
