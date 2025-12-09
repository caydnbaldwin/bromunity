# TODO

Just finished implementing GET /persons/onboarding. Here is what it does:

- routes to getOnboardingPage(req, res) in PersonsController
- passes (req.session) to PersonsService
- passes (session.authentication.person_id) to PersonsDao
- queries and returns to PersonsService all persons where person_id matches
- PersonsService immediately returns person[0] to PersonsController
- If person exists then set req.session.person and redirect to GET /profiles/feed, otherwise render onboarding-page with errorMessage and session

TODO:

- Test getOnboardingPage(req, res)
- Build POST /persons/onboarding (use req.session.authentication.person_id and formData to insert into database)
- Build GET /profiles/feed (use req.session.person to query friendships table to then query profiles table -> show all profiles not in friendships for session.person.person_id)