
from models.share import db

class Chapter(db.Model):
    __tablename__ = "chapters"
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Float)
    title = db.Column(db.String)
    notes = db.Column(db.String)
    link_raw = db.Column(db.String)
    link_tl = db.Column(db.String)
    link_ts = db.Column(db.String)
    link_rd = db.Column(db.String)
    link_pr = db.Column(db.String)
    link_rl = db.Column(db.String)

    date_created = db.Column(db.DateTime)
    date_tl = db.Column(db.DateTime)
    date_rd = db.Column(db.DateTime)
    date_ts = db.Column(db.DateTime)
    date_pr = db.Column(db.DateTime)
    date_qcts = db.Column(db.DateTime)
    date_release = db.Column(db.DateTime)

    typesetter_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))
    translator_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))
    redrawer_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))
    proofreader_id = db.Column(db.Integer, db.ForeignKey("staff.id", ondelete='SET NULL'))
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

    typesetter = db.relationship("Staff", foreign_keys=[typesetter_id], backref='chapters_typesetter', uselist=False)
    translator = db.relationship("Staff", foreign_keys=[translator_id], backref='chapters_translator', uselist=False)
    redrawer = db.relationship("Staff", foreign_keys=[redrawer_id], backref="chapters_redrawer", uselist=False)
    proofreader = db.relationship("Staff", foreign_keys=[proofreader_id], backref="chapters_proofreader", uselist=False)
    project = db.relationship("Project", back_populates="chapters", uselist=False)

    def __init__(self, number, link_raw):
        self.number = number
        self.link_raw = link_raw
        self.link_tl = None
        self.link_ts = None
        self.link_rd = None
        self.link_pr = None
        self.link_rl = None

    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'number': self.number,
            'notes': self.notes,
            'typesetter': self.typesetter.serialize if self.typesetter else None,
            'redrawer': self.redrawer.serialize if self.redrawer else None,
            'proofreader': self.proofreader.serialize if self.proofreader else None,
            'translator': self.translator.serialize if self.translator else None,
            'project': self.project.serialize
        }

    @property
    def serializeProject(self):
        return {
            'id': self.id,
            'title': self.title,
            'number': self.number,
            'notes': self.notes,
            'typesetter': self.typesetter.serialize if self.typesetter else None,
            'redrawer': self.redrawer.serialize if self.redrawer else None,
            'proofreader': self.proofreader.serialize if self.proofreader else None,
            'translator': self.translator.serialize if self.translator else None
        }