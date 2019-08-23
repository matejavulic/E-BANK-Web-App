#
# License: The MIT License (MIT)
# Author:E-bank IT team
# Author email: @ebanka-it.com
# Date: Fri Aug 23 2019
# Description: 
# This Django module sends API call to an external service
# Upon receiving response data it pulls out only data for
# relation EUR/ USD, CHF, GBP, AUD and sends back as a JSON 
# 

import requests as req
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView
#API address
URL = "https://api.exchangeratesapi.io/latest"

#list of currencies supported
cur_l = ["CHF","EUR","USD","CAD","AUD","GBP","HRK","HKD","ISK"
         ,"PHP","DKK","HUF","CZK","RON","SEK","IDR","INR","BRL"
         ,"RUB","JPY","THB","MYR","BGN","TRY","CNY","NOK","NZD"
         ,"ZAR","MXN","SGD","ILS","KRW","PLN",]
def index(request):
    return HttpResponse("OK!");
	
class Currency(TemplateView):
	def getEur(self):
		#parameter base 
		currency = cur_l[1] #EUR
		PARAMS_currency = {"base":currency}
		r_json = req.get(url=URL, params=PARAMS_currency).json() #API response transform iton JSON
		USD = r_json["rates"]["USD"] #pull out requested data
		CHF = r_json["rates"]["CHF"]
		GBP = r_json["rates"]["GBP"]
		AUD = r_json["rates"]["AUD"]
		return JsonResponse({'usd': USD, 'chf': CHF, 'gbp': GBP, 'aud': AUD}) #make JSON object again