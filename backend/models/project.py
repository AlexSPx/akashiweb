from models.share import db

icon_default = 'https://cdn.discordapp.com/icons/345797456614785024/9ef2a960cb5f91439556068b8127512a.webp?size=128'

class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    status = db.Column(db.String)
    link = db.Column(db.String)
    altNames = db.Column(db.String)
    thumbnail = db.Column(db.String)
    icon = db.Column(db.String)
    position = db.Column(db.Integer)
    color = db.Column(db.String)
    # pic = db.Column(db.String)
    typesetter_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))
    redrawer_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))
    translator_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))
    proofreader_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))

    chapters = db.relationship("Chapter", back_populates="project")
    typesetter = db.relationship("Staff", foreign_keys=[typesetter_id], backref='project_typesetter')
    translator = db.relationship("Staff", foreign_keys=[translator_id], backref='project_translator')
    redrawer = db.relationship("Staff", foreign_keys=[redrawer_id], backref="project_redrawer")
    proofreader = db.relationship("Staff", foreign_keys=[proofreader_id], backref="project_proofreader")

    def __init__(self, title: str, status: str, link: str, altNames: str, icon=icon_default):
        self.title = title
        self.status = status
        self.link = link
        self.altNames = altNames
        self.icon = icon

    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'status': self.status,
            'link': self.link,
            'altNames': self.altNames,
            'thumbnail': self.thumbnail,
            'icon': self.icon,
            'position': self.position,
            'color': self.color,
            'typesetter': self.typesetter.serialize if self.typesetter else None,
            'redrawer': self.redrawer.serialize if self.redrawer else None,
            'proofreader': self.proofreader.serialize if self.proofreader else None,
            'translator': self.translator.serialize if self.translator else None
        }