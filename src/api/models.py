from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
            "email": self.email,
            "is_active" : self.is_active}
class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, nullable=False, unique=True)
    post_id = db.Column(db.Integer, nullable=False, unique=True)


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum())
    url = db.Column(db.String, nullable=False, unique=True)
    post_id = db.Column(db.Integer, nullable=False, unique=True)


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String, nullable=False, unique=True)
    body = db.Column(db.String, nullable=False, unique=True)
    date = db.Column(db.DateTime, nullable = False, default=datetime.utcnow)
    image_url = db.Column(db.String, nullable=False, unique=True)
    user_id = db.Column(db.Integer, nullable=False, unique=True)


class CharacterFavourites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, unique=True)
    character_id = db.Column(db.Integer, nullable=False, unique=True)


class PlanetFavourites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, unique=True)
    planet_id = db.Column(db.Integer, nullable=False, unique=True)


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    height = db.Column(db.String, nullable=True)
    mass = db.Column(db.String, nullable=True)
    hair_color = db.Column(db.String, nullable=True)
    skin_color = db.Column(db.String, nullable=True)
    eye_color = db.Column(db.String, nullable=True)
    birth_year = db.Column(db.String, nullable=True)
    gender = db.Column(db.String, nullable=True)



class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    diameter = db.Column(db.String, nullable=True)
    rotation_period = db.Column(db.String, nullable=True)
    orbital_period = db.Column(db.String, nullable=True)
    gravity = db.Column(db.String, nullable=True)
    population = db.Column(db.String, nullable=True)
    climate = db.Column(db.String, nullable=True)
    terrain = db.Column(db.String, nullable=True)