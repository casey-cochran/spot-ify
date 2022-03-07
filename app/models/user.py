from .db import db
from .tables import playlist_like, user_follows
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.VARCHAR(50))
    last_name = db.Column(db.VARCHAR(50))
    profile_image = db.Column(db.Text)
    created_at = db.Column(db.DateTime)

    playlists = db.relationship("Playlist", back_populates="user", cascade='all, delete, delete-orphan')
    #Child

    following_user = db.relationship("User", foreign_keys=user_follows.c.following_user_id, secondary=user_follows, back_populates="followed_user")
    followed_user = db.relationship("User",  foreign_keys=user_follows.c.followed_user_id, secondary=user_follows, back_populates="following_user")

    liking_user = db.relationship("Playlist", secondary=playlist_like, back_populates="liked_playlist")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_image": self.profile_image,
            "hashed_password": self.hashed_password,
            "created_at": self.created_at
        }
