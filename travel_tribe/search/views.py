from django.shortcuts import render
import os
from amadeus import Client, ResponseError
from django.conf import settings
import requests

# Initialize the Amadeus client with credentials from .env file
amadeus = Client(
    client_id=os.getenv('AMADEUS_API_KEY'),
    client_secret=os.getenv('AMADEUS_API_SECRET')
)

# Your main search view
def search(request):
    flights = []
    airbnbs = []
    activities = []

    # Retrieve search parameters from the GET request
    departure = request.GET.get('departure')
    destination = request.GET.get('destination')
    checkin = request.GET.get('checkin')
    checkout = request.GET.get('checkout')
    guests = request.GET.get('guests')

    # Check if both destination and departure fields are provided
    if destination and departure:
        try:
            # Amadeus API call for flight search
            response = amadeus.shopping.flight_offers_search.get(
                originLocationCode=departure,
                destinationLocationCode=destination,
                departureDate=checkin,
                returnDate=checkout,
                adults=guests
            ).data

            flights = response

        except ResponseError as error:
            print(error)

    # Airbnb API integration
    if destination:
        try:
            url = "https://airbnb-listings.p.rapidapi.com/v2/listingsByLatLng"
            querystring = {
                "lat": "destination_latitude",  # Replace with actual lat
                "lng": "destination_longitude",  # Replace with actual lng
                "checkin": checkin,
                "checkout": checkout,
                "guests": guests
            }

            headers = {
                "x-rapidapi-key": os.getenv('AIRBNB_API_KEY'),
                "x-rapidapi-host": "airbnb-listings.p.rapidapi.com"
            }

            response = requests.get(url, headers=headers, params=querystring)
            airbnbs = response.json().get("listings", [])

        except requests.RequestException as e:
            print(e)

    # Pass the results to the template context
    context = {
        'flights': flights,
        'airbnbs': airbnbs,
        'activities': activities,
    }

    return render(request, 'core/home.html', context)
