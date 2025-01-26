import json
import requests

seen_courses = set()
base_url = 'https://one.ufl.edu/apix/soc/schedule/?category=RES&term=2251&last-control-number='
last_control_number = 1

# fetch data
while last_control_number < 200:
    # obtain new course data
    print(base_url + str(last_control_number))
    response = requests.get(base_url + str(last_control_number))
    response.raise_for_status()

    # Ensure the response is JSON
    try:
        data = response.json()
    except ValueError:
        print("Failed to parse JSON")
        break

    # Add the courses to the seen set if data is in expected format
    if isinstance(data, list) and len(data) > 0 and "COURSES" in data[0]:
        new_courses = [{"code": course["code"], "name": course["name"]} for course in data[0]["COURSES"]]
        for course in new_courses:
            # Add the dictionary as is (no frozenset needed)
            seen_courses.add(frozenset(course.items()))  # Use frozenset to ensure immutability and uniqueness
    else:
        print("No 'COURSES' key found in response")

    # Update control number
    last_control_number = data[0].get('LASTCONTROLNUMBER', 0)
    print(last_control_number)

# After the loop, write the unique courses to a JSON file
with open('codes.json', 'w') as outfile:
    # Convert the frozenset back into dictionaries and write them
    unique_courses = [dict(item) for item in seen_courses]  # Convert frozensets back to regular dicts
    json.dump(unique_courses, outfile, indent=4)
