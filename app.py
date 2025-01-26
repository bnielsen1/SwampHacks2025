from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json

uri = "mongodb+srv://andrewperezledo:XowVJcXO1eZzWgXd@studysesh.47wje.mongodb.net/?retryWrites=true&w=majority&appName=StudySesh"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
db = client["StudySeshDB"]
uf_data_collection = db["UFdata"]

with open ("example.json", 'r') as file:
    data = json.load(file)

if not isinstance(data, list):
    data = [data] 

for document in data:
    result = uf_data_collection.insert_one(document)
    print(f"Inserted document with ID: {result.inserted_id}")

client.close()

