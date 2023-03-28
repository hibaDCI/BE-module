# Working with a Movie Database
You are working with a ***movie database*** that contains information about `movies`, `actors`, and `directors`. You will perform various CRUD operations to `create`, `read`, `update`, and `delete` data from the database using __MongoDB__ and __MySQL__.

## Setup
You will need to have MongoDB and MySQL installed on your local machine, and you will need to create a database for this exercise.

### MongoDB
- Create a new MongoDB database called 'movies'.
- Create three collections in the 'movies' database called 'movies', 'actors', and 'directors'.
  - 'movies' collection/table includes 
    - id (integer, primary key, auto-increment), 
    - title: name of the movie, 
    - year: release date of the movie , 
    - genre: movies genre, 
    - director: the id of director, 
    - actors: list of actors, 
    - description: short summary, 
    - rating: a number for rate 
  - 'actors' collection/table includes
    - actor_id: unique identifier for the actor
    - first_name: the actor's first name
    - last_name: the actor's last name
    - birthdate: the actor's date of birth
    - gender: the actor's gender
    - nationality: the actor's nationality
  - 'directors' collection/table includes
    - director_id: unique identifier for the director
    - first_name: the director's first name
    - last_name: the director's last name
    - birthdate: the director's date of birth
    - gender: the director's gender
    - nationality: the director's nationality
  
### MySQL
- Create a new MySQL database called 'movies'.
- Create three tables in the 'movies' database called 'movies', 'actors', and 'directors'.

### Instructions
Perform the following operations in both MongoDB and MySQL:

1. Create: Insert at least three movies, three actors, and three directors into the database.
2. Retrieve: Query the database to find all movies directed by a specific director.
3. Update: Update the release date of a movie.
4. Delete: Delete an actor from the database.


### Bonus
For an extra challenge, try performing the following operations:

1. Retrieve: Query the database to find all movies that a specific actor has acted in.
2. Update: Update the director of a movie.
3. Delete: Delete a director from the database. Make sure that all movies directed by the director are also deleted.  
   
### Note
Make sure to include the commands or queries that you used to perform each operation in both MongoDB and MySQL, as well as any observations or differences you noticed between the two databases.