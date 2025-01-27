# SwampHacks2025
!["Main Page"](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/233/843/datas/original.png )
!["Search by Library""](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/234/334/datas/original.png )
![Search by Course](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/233/842/datas/original.png)
!["Study Session App Screenshot 4"](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/234/418/datas/original.JPG )
!["Study Session App Screenshot 5"](https://media.discordapp.net/attachments/917231293492768788/1333503541121253386/image.png?ex=67992173&is=6797cff3&hm=3e8edc1d5af7cf82973c4007374d0bb3ef179b5a2224f9d430e3adb0333fd579&=&format=webp&quality=lossless&width=1251&height=571)


# StudySesh

StudySesh provides a user-friendly interface where students can find peers studying the same classes or subjects. Users can:

* Search for study sessions by library or class.
* Join study groups near them or for their specific courses.
* Connect with like-minded peers to create a collaborative and supportive learning environment.

## How we built it

We used the following technologies to bring StudySesh to life:

* **Backend:** A Django API serves as the backbone of the platform, handling user data, session creation, library information, and scraped UF course data.
* **Frontend:** The React-based interface ensures a clean, responsive, and engaging user experience.
* **Authentication:** Auth0 powers secure user authentication and ensures seamless login and session management. We configured an Auth0 API to secure our REST API endpoints with JWT.
* **Database:** MongoDB stores information about study sessions, libraries, and user interactions, allowing for fast and reliable data retrieval.

## Challenges we ran into

One of the main challenges was connecting the MongoDB database to the Django backend. Setting up seamless communication between the components of our stack required significant debugging and configuration. Configuring Auth0 for authentication also presented a steep learning curve. We had to ensure secure token handling across the React frontend and Django backend while maintaining a smooth user experience.

## Accomplishments that we're proud of

* Successfully configuring Auth0 for secure user authentication, ensuring users can log in and manage their sessions seamlessly.
* Establishing a fully functional Django-MongoDB integration, which allows fast and efficient handling of session and library data.
* Building a polished and responsive React frontend that offers an intuitive experience for users.
* Delivering the entire project without deviating from our initial vision, despite technical challenges.
* Scraped UF's schedule of courses to provide auto-filled class codes when planning a study session

## What we learned

This project was a learning experience in many ways:

* We gained a deeper understanding of REST API design and how to build scalable backend systems using Django.
* Configuring Auth0 for full-stack authentication helped us learn about secure token-based authentication workflows.
* Working with MongoDB gave us insight into designing flexible and efficient database schemas for real-time applications.
* The importance of teamwork and perseverance in overcoming technical challenges, especially when working under time constraints.

## What's next for StudySesh

* Implement an "interested in session" button to see who might be attending a session.
* Create a profile page to manage and modify your created study sessions.
* Build a friends tab to see who of your friends is running a session.

## Built With

* Auth0
* Django
* Figma
* JavaScript
* MongoDB
* Python
* React

## Try it out

[Link coming soon]
