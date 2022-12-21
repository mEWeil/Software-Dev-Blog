# Personal Project --> Journaling App #
# ----------------------------------- #

1) Implements the use of at least two 3rd-party APIs (DONE)
  * Pexels (https://www.pexels.com/api/) (or some other photo app) to provide nice looking background images
    - Possibly some sort of theme selector that allows you to control what kind of photos
    - Have the photos refresh daily or at will
  * Quotes from Zen Quotes (https://zenquotes.io/)
    - Display a inspirational quote on home page after login
    - Refresh daily or at will

2) Implements the use of at least two CRUD-ing resources (DONE)
  * CRUD will be fully implemented in journaling
    - create: write a new journal entry
    - read: browse past journal entries
    - update: allow user to edit journal entries (?) (maybe have a created time stamp and an edited time stamp?)
    - delete: allow user to delete previous journal entries

3) Implements User Authentication (DONE)
  * initial page will require user to sign in / sign up
    - seperate home page for signed-in users
  * sign out button on nav-bar

4) Implements proper back-end Models and Database design (DONE)
  * database will be postgreSQL
  * model for user
    - id (PK)
    - username (CharField)
    - password (Charfield (how to encrypt?))
    - email (EmailField)
    - anything else?
  * model for journal
    - id (PK)
    - title (CharField)
    - created date/time (DateTimeField)
    - edited date/time (DateTimeField)
    - entry (TextField)
    - user FK (Links to user PK)
    - emphasis/favorite (BooleanField)
    - type (Charfield)
    - anything else?
  

5) Implements proper styling, presentation, and site navigation
  * styling and presentation will be taken care of between boostrap and the Pexels api
  * site navigation using React browserrouter or hashbrowser (?)
    - links to different pages will live in the navbar
      > Login Page
      > Home Page (<- Pictures and Quotes from api will go here)
      > Make Journal Entry Page
      > Peruse Journal Entries

6) Implements a feature-rich application demonstrating proper web design principles
  * hopefully this idea is meaty enough
  * add more feature ideas here
    > log in / sign up / log out
    > api calls to make home page pretty
    > CRUD implementation for journal entries
      * create on make new entry page
      * read / update / delete on peruse entries page
        - filters for journal entries (?) (by date, by favorite, etc)