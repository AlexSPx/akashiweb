from models.share import db


class Staff(db.Model):

    __tablename__ = "staff"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    discord_id = db.Column(db.BigInteger)
    status = db.Column(db.String)

    def __init__(self, discord_id, name):
        self.discord_id = discord_id
        self.name = name

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'discord_id': self.discord_id,
            'status': self.status
        }
