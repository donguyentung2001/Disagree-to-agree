Docs for APIs for front-end


### /loggedIn [GET]

Return whether the user is logged in

Input: None - This is based entirely on user's session

Output: 
    - If logged in: {} full session information including if user is logged in
    - if not: {'logged_in' = 'False'}


### /logout [POST]

Log the user out

Input: None - This is based entirely on user's session

Output: 
    - If successful: "Success"
    - if not: error return


### /signin [POST]

sign the user in and init the session

Input: "email", "password"

Output: 
- Success: {} full session information, with "user" in key
- Fail: {'error': error_message}


### /register [POST]

register the user and relevant information

input: 
    variable: type

    - email: email

    - password: password

    - party: text (option of democrats, republicans, other)
    
    - avatar: text (url)
    
    - interest: text. seperated by ',' -> this will be used to create a list
    
    - message[1]: answer to question 1 (What do you think about universal healthcare?)

    - message[2]: answer to question 2 (What do you think about universal basic income?)

    - message[3]: answer to question 3 (What do you think about allowing more immigrants into the US?)

    - message[4]: answer to question 4 (What do you think about making the rich pay more for taxes?)

    - message[5]: answer to question 5 (Should education be free?)

output:

    - if pushed successfully: "Success"

    - error if there is a problem


### /get_chatid [GET]

return the user's current chatID. require sign in.

input: None

output: 

    - ChatID if user already matched

    - error message remind to match if not matched.


### /chat/log/<chatID> [GET]

return the 10 nearest messages in that particular chat. Require sign in.

input: None - actually the chatID above

output:
    - list of messages 

    - error if there is error


### /chat/<chatID> [POST]

return the 10 nearest messages in that particular chat. Require sign in.

input: json including a key called ['msg']

if msg = !exit, we delete the current chat database

if msg is something else, we push that message to the database.

output:
    - Success if made it

    - Error if not made it

### /matchmaking [POST]

match user with a compatible user. Require sign in.

output: 

- Once match: It will return a dictionary of the session, including the chatID.

- If there hasn't been a match, the program keeps on running.