from django.shortcuts import render
import requests
import os
from amadeus import Client, ResponseError
from django.conf import settings

amadeus = Client(
    client_id=os.getenv('AMADEUS_API_KEY'),
    client_secret=os.getenv('AMADEUS_API_SECRET')
)

def search(request):
    flights = []
    airbnbs = []
    activities = []

    departure = request.GET.get('departure')
    destination = request.GET.get('destination')
    checkin = request.GET.get('checkin')
    checkout = request.GET.get('checkout')
    guests = request.GET.get('guests')

    if destination and departure:
        try:
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

    context = {
        'flights': flights,
        'airbnbs': airbnbs,
        'activities': activities,
    }

    return render(request, 'core/home.html', context)