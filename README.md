Trying to integrate auth0 and JWT-based server-side authorization by a lambda authorizer 
function, I faile:
- Examples provided by auth0 are quite a few and omit a CRUD example that
show how to integrate the JWT within the http request.
- I tried several times, the example provided by Ariel Weinberger was working
but was so sophisticated that I did not understand the code.

Thus I decide to ditch the auth= integration completely and instead will integrate
a simple login with username/password instead.

The scaffold of this project is provided by BezCoder: React with Axios ReactHooks CRUD app.
