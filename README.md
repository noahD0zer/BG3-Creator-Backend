### Overview
BG3 Creator is a character creator and planning tool for my favorite game, Baldurs Gate 3. There are a few wonderful tools out there that accomplish similar goals of character creation, my tool differs in its inclusion of proficiencies and a UI layout that is similar to the in game character creator for the sake of continuity. Proficiencies can be found tied to class, background and race selection. After a character is created, the proficiencies attached to corresponding character values can be foound collected in one list, just as you would see them in game!

#### Technology Used:
- JavaScript
- Express
- Mongoose
- MongoDB

## User Stories
- As a user, I want to see a home page with links and a login or log out button.
- As a user, I want the ability to log in and log out.
- As a user, I want to click on a link to see a list of all my characters.
- As a user, I want to click on a link to create a new character.
- As a user, I want to see the list of my characters, with a drop down to expand a detailed character view.
- As a user, I want the ability to delete my own characters.
- As a user, I want the ability to edit a character I have previously created.
- As a user, I want the ability to choose my characters background.
- As a user, I want the ability to choose my characters race/subrace.
- As a user, I want the ability to choose my characters class/subclass.
- As a user, I want the ability to allocate my characters ability scores, from a pool of 27 points.
- As a user, I want the ability to add a +1 and +2 modifier to an ability (one each).
- As a user, I want the ability to see my proficiencies populate based on the previous character creation choices made.

## ERD
![app erd](https://i.imgur.com/VzEZ0Vw.png)

## API
Postman for testing.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Characters

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/characters`             | `characters#index`    |
| GET   | `/characters/<character_id>`    | `characters#show`    |
| POST   | `/characters`             | `characters#create`    |
| PATCH  | `/characters/<character_id>` | `characters#update`  |
| DELETE | `/characters/<character_id>`        | `characters#delete`   |

#### Recommended Request bodies
Request - users#signup:

```json
{
    "credentials": {
      "email": "an@example.email",
      "name": "Example"
      "password": "an example password",
      "password_confirmation": "an example password"
    }
}
```

Request - Characters#create (requires a token):

```json
{
    "character": {
        "name": "jimmy",
        "level": "6",
        "background": "Folk Hero",
        "Race": "Halfling",
        "Class": "Bard",
        "Abilities": "STR: 8, DEX: 15, CON: 12, INT: 10, WIS: 12, CHA: 17",
    }
}
```

### Token Auth Strategy
Send the token as `Bearer Token <token>`

## MVP SHOWCASE
(Screenshots here)

### Future Versions
- Add Multiclassing functionality
- Add Items with links to corresponding wiki articles
- Add checklists for item loadouts for a user to refrence during gameplay
- Add level specific features for various classes
- Add ability score increases and feats
- Add a short field describing the intention/strengths of a character's build

### Getting Started
BG3 Creator

### Deployed App
BG3 Creator: 
