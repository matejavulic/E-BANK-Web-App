#
# License: The MIT License (MIT)
# Author:E-bank IT team
# Author email: @ebanka-it.com
# Date: Fri Aug 23 2019
# Description: 
# This Django module loads list of branches names and street names
# makes an random combination of it (plus random home number, mobile phone number)
#  and returns it as the response
# 

from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView

#disable=pylint(import-error)
import seaborn as sbn
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

branch = 0
ranBranch = 0

def index(request):
    return HttpResponse("Сервер ради!");

class Random(TemplateView):
    #disable: pylint(no-self-argument)
    def getRandomBranch(self):
        branch = pd.read_csv('C:/proba/mean-course/backend/server-python/env/files/random-branches.csv', delimiter = ',').to_numpy()
        randomBranch = branch[np.random.randint(len(branch))]
        ret = str(randomBranch)
        ret = ret[2:len(ret)-2]
        return(ret)
    
    def getRandomMobileNumber(self):
        num = "+3816" + str(np.random.randint(0,9)) + str(np.random.randint(1000,9999)) + str(np.random.randint(100,9999))
        return(num)

    def getRandomAddress(self):
        address = pd.read_csv('C:/proba/mean-course/backend/server-python/env/files/addresses.csv', delimiter = ',').to_numpy()
        address = address[np.random.randint(len(address))]
        add = str(address)
        add = add[2:len(add)-2]
        return(add)

    def getRandomHouseNumber(self):
        houseNum = str(np.random.randint(1,100))
        return(houseNum) 

    def getRandomData(request):
        bra = Random.getRandomBranch(1)
        adr = Random.getRandomAddress(1)
        num = Random.getRandomMobileNumber(1)
        hnum = Random.getRandomHouseNumber(1)
        return JsonResponse({'number': num, 'address': adr, 'hnumber': hnum, 'branch': bra})