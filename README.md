1. Register user - POST https://secure-garden-24397.herokuapp.com/api/users
   body: email, fullname, password, permissions(ADMIN, USER, BOSS), subordinates(if user is a boss)
2. Authenticate as a user POST https://secure-garden-24397.herokuapp.com/api/users/login
   body: email password
3. Return list of users, taking into account the following: GET https://secure-garden-24397.herokuapp.com/api/users !ONLY WITH JWT TOKEN! login - set jwt token

- administrator should see everyone
- boss should see herself and all subordinates (recursively)
- regular user can see only herself

4. Change user's boss (only boss can do that and only for her) PUT https://secure-garden-24397.herokuapp.com/api/users/boss-change
   body: fromEmail, subordinate, toEmail
