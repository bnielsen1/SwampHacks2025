from django.shortcuts import render
import json

# Create your views here.

from django.http import HttpResponse
from django.http import JsonResponse
from utils import get_db_handle
from bson import json_util
from . import validator
from authlib.integrations.django_oauth2 import ResourceProtector
import logging
from django.views.decorators.csrf import csrf_exempt


logger = logging.getLogger(__name__)

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

@csrf_exempt
@require_auth(None)
def send_email(request):
    if request.method == "POST":
        try:
            auth_header = request.headers.get("Authorization")

            body = json.loads(request.body)
            user_email = body.get("email")

            if not user_email:
                return JsonResponse({"error": "Email not provided"}, status=400)

            return JsonResponse({"message": f"Email {user_email} received successfully"})
        except Exception as e:
            logger.error(f"Error processing email: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt
@require_auth(None)
def add_user(request):
    if request.method == "POST":
        try:
            auth_header = request.headers.get("Authorization")

            body = json.loads(request.body)
            user_email = body.get("email")

            print(user_email)

            if not user_email:
                return JsonResponse({"error": "Email not provided"}, status=400)
            
            db_handle, client = get_db_handle(db, host, username, password)
            collection = db_handle["Users"]

            print(collection.find_one({'Email': user_email}))

            if (collection.find_one({'Email': user_email})):
                print('account already found under above email. normal login')
                return JsonResponse({"message": f"Email {user_email} already has account"})
            else:
                # make account
                new_user = {
                    'Email': user_email
                }
                collection.insert_one(new_user)
                return JsonResponse({"message": f"Email {user_email} new account created successfully"})
            
        except Exception as e:
            logger.error(f"Error processing email: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


#@require_auth(None)
@csrf_exempt
def create_session(request):
    print("INSIDE VIEW")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = data.get('user')
            course = data.get('course')
            #print("ran here")
            library = data.get('library')
            date = data.get('date')
            pfp = data.get('pfp')
            description = data.get('description')

            
            # HANDLE HOURS DATE/TIME LOGIC INTO MONGO

            db_handle, client = get_db_handle(db, host, username, password)
            collection = db_handle["Sessions"]
            data = collection.insert_one({'User': user, 'Course': course, 'Library': library, "Date": date, "PFP": pfp, "Description": description}) 
            return JsonResponse(dict(message="Session successfully created."))

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse(dict(message="An error occurred while creating the session."), status=400)
    return JsonResponse(dict(message="Invalid request method."), status=405)