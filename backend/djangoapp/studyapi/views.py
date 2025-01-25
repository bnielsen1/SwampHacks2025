from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse
from utils import get_db_handle
from bson import json_util

from config import db, host, username, password

# Grab all sessions
# Grab with specific session id
# Grab sessions with a specific library


# Grab all sessions
def sessions(request):

    db_handle, client = get_db_handle(db, host, username, password)

    collection = db_handle['Sessions']
    data = collection.find()

    data_list = list(data)

    return JsonResponse(data_list, safe=False, json_dumps_params={'default': json_util.default})

def session_course(request, coursecode):
    
    db_handle, client = get_db_handle(db, host, username, password)

    collection = db_handle['Sessions']
    data = collection.find({'Course': coursecode})

    data_list = list(data)

    return JsonResponse(data_list, safe=False, json_dumps_params={'default': json_util.default})

def session_library(request, library):
    
    db_handle, client = get_db_handle(db, host, username, password)

    collection = db_handle['Sessions']
    data = collection.find({'Course': library})

    data_list = list(data)

    return JsonResponse(data_list, safe=False, json_dumps_params={'default': json_util.default})