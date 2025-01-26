from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse
from utils import get_db_handle
from bson import json_util
from . import validator
from authlib.integrations.django_oauth2 import ResourceProtector

from .config import db, host, username, password

require_auth = ResourceProtector()
validator = validator.Auth0JWTBearerTokenValidator(
    "dev-b7m4os20con4lq0x.us.auth0.com",
    "https://seshapi.com"
)
require_auth.register_token_validator(validator)

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

def users(request):
    db_handle, client = get_db_handle(db, host, username, password)
    collection = db_handle["Users"]
    data = collection.find() 
    data_list = list(data)
    return JsonResponse(data_list, safe=False, json_dumps_params={'default': json_util.default})

def courses(request):
    db_handle, client = get_db_handle(db, host, username, password)
    collection = db_handle["UFdata"]
    data = collection.find() 
    data_list = list(data)
    return JsonResponse(data_list, safe=False, json_dumps_params={'default': json_util.default})

def UFdata(request):
    db_handle, client = get_db_handle(db, host, username, password)
    collection = db_handle["UFdata"]
    data = collection.find({}) 
    data_list = list(data)
    return JsonResponse(data_list, safe=False, json_dumps_params={'default': json_util.default})


def public(request):
    """No access token required to access this route
    """
    response = "Hello from a public endpoint! You don't need to be authenticated to see this."
    return JsonResponse(dict(message=response))


@require_auth(None)
def private(request):
    """A valid access token is required to access this route
    """
    response = "Hello from a private endpoint! You need to be authenticated to see this."
    return JsonResponse(dict(message=response))

def search_courses(request, search):
    if request.method == "GET":

        print(search)
        # Connect to the database
        db_handle, client = get_db_handle(db, host, username, password)
        collection = db_handle['UFdata']
        
        # Search for courses with matching search
        
        query = {
                "code": {
                    "$regex": search,  # Search for the course_code as a substring
                    "$options": "i"         # Make the search case-insensitive
                }
            }

        # data = collection.find(query).limit(10)  # Limit to the first 10 results
        data = collection.find(query).limit(10)
        
        # Convert the result to a list and return as JSON
        data_list = list(data)
        
        # Return the data in the response
        return JsonResponse(data_list, safe=False, json_dumps_params={'default': json_util.default})

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)