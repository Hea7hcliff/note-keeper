# NOTE-KEEPER REST API

JWT based login, "Authorization" header must be supplied to every protected route, structured as follows: 

    "Bearer token" 
    
Token provided as JSON object upon login or register as follows: 

    { "token": "token" }

Must be stored clientside for easy access. 

## Routes

`/`, GET - base route, useless, renders basic info, not for application use.  

`/api/login`, POST - user login, creates JWT after authentication success. `email` and `password` must be provided with `req.body`.  

`/api/register`, POST - registers new users, creates JWT after authentication success. `email`, `password` and `confirmPassword` 
must be provided with `req.body`.  

### Protected

`/users`, GET - shows collection of users only if logged in as admin, just testing out and for LOLZ. Not for application use.  

`/api/add`, POST - adds new notes into the database. `title`, `description` and `priority` must be provided in `req.body`. 
Creates new user object into "notes" collection if doesn't exist. Returns object `{ added: true }`.

`/api/notes`, GET - gets array of user notes.  

`/api/notes/:id`, GET - gets note by `_id`. `_id` must be provided with `req.params`. 

`/api/update/:id`, PUT - updates note by `_id`. `_id` must be provided with `req.params`. `title`, `description` and `priority` 
must be provided in `req.body`, `done` is optional for marking notes as "done".  

`/api/delete/:id`, DELETE - deletes note by `_id`. `_id` must be provided with `req.params`.  

