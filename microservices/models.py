from app import db
import uuid

#class Member(db.Model):
#    __tablename__ = 'Member'
#
#
#    id = db.Column(db.String, primary_key=True)
#    name = db.Column(db.String, nullable=False)
#    dateOfBirth = db.Column(db.DateTime, nullable=False)
#    taroCard = db.Column('TaroCard', nullable=True)
#    taroCardid = db.Column(db.String, nullable=True)
#    teamId = db.Column(db.String, nullable=False)
#    team = db.Column('Team', nullable=False)
#
#
#class Interviewee(db.Model):
#    __tablename__ = 'Interviewee'
#
#
#    id = db.Column(db.String, primary_key=True)
#    name = db.Column(db.String, nullable=False)
#    dateOfBirth = db.Column(db.DateTime, nullable=False)
#    taroCardName = db.Column('TaroCard', nullable=True)
#    taroCardId = db.Column(db.String, nullable=True)
#    
#    compatibilityTaro = db.Column(db.String, nullable=True)
#    compatibilityAstro = db.Column(db.String, nullable=True)
#
#    teamName = db.Column(db.String, nullable=False)
#    teamId = db.Column('Team', nullable=False)


class Team(db.Model):
    __tablename__ = 'Team'
    
    # Primary key
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # Attributes
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)  # Nullable field for description
    userId = db.Column(db.String, nullable=False)  # Assuming userId is a foreign key to another table
    
    # Relationships
    members = db.relationship('Member', back_populates='team')
    interviewees = db.relationship('Interviewee', back_populates='teamName')
    result = db.relationship('Result', back_populates='team')

    def __repr__(self):
        return f'<Team {self.name}>'


class Member(db.Model):
    __tablename__ = 'Member'
    
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String, nullable=False)
    dateOfBirth = db.Column(db.DateTime, nullable=False)
    cityOfBirth = db.Column(db.String)
    countryOfBirth = db.Column(db.String)

    taroCardid = db.Column(db.String, db.ForeignKey('TaroCard.id'))  # taroCardid из Prisma
    teamId = db.Column(db.String, db.ForeignKey('Team.id'))  # teamId из Prisma

    taroCard = db.relationship('TaroCard', back_populates='members')
    team = db.relationship('Team', back_populates='members')  # Ensure this is correct

    def __repr__(self):
        return f'<Member {self.name}>'


class Interviewee(db.Model):
    __tablename__ = 'Interviewee'
    
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String, nullable=False)
    dateOfBirth = db.Column(db.DateTime, nullable=False)
    cityOfBirth = db.Column(db.String)
    countryOfBirth = db.Column(db.String)

    taroCardId = db.Column(db.String, db.ForeignKey('TaroCard.id'))  # taroCardId из Prisma
    teamId = db.Column(db.String, db.ForeignKey('Team.id'))  # teamId из Prisma

    taroCard = db.relationship('TaroCard', back_populates='interviewees')
    teamName = db.relationship('Team', back_populates='interviewees')  # Ensure this is correct
    result = db.relationship('Result', back_populates='interviewee')
    # predictResult = db.relationship('PredictResult', back_populates='interviewees')  # Ensure this is correct


    def __repr__(self):
        return f'<Interviewee {self.name}>'


class TaroCard(db.Model):
    __tablename__ = "TaroCard"
    
    
    id = db.Column(db.String, primary_key=True,)
    name = db.Column(db.String)
    url = db.Column(db.String)
    meaning = db.Column(db.String)
    strength = db.Column(db.String)
    weakness = db.Column(db.String)
    
    # Correctly define relationships back to Member and Interviewee
    members = db.relationship("Member", back_populates="taroCard")
    interviewees = db.relationship("Interviewee", back_populates="taroCard") 
    result = db.relationship("Result", back_populates="card")

    def __repr__(self):
        return f'<TaroCard {self.name}>'

class Result(db.Model):

    __tablename__ = 'Result'  # Optional: specify the table name, defaults to class name

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    date = db.Column(db.DateTime)

    teamId = db.Column(db.String, db.ForeignKey('Team.id'), nullable=False)
    team = db.relationship('Team', back_populates="result")

    intervieweeId = db.Column(db.String, db.ForeignKey('Interviewee.id'), nullable=False)
    interviewee = db.relationship('Interviewee', back_populates="result")

    cardId = db.Column(db.String, db.ForeignKey('TaroCard.id'))
    card = db.relationship('TaroCard', back_populates="result")

    compatibilityTaroPercent = db.Column(db.String, nullable=True)
    compatibilityTaroDescription = db.Column(db.String, nullable=True)

    compatibilityAstroPercent = db.Column(db.String, nullable=True)
    compatibilityAstroDescription = db.Column(db.String, nullable=True)


#
    #class PredictedResult(db.Model):
    #__tablename__ = 'PredictedResult'
    #
    #
    #id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    #
    #intervieweeId = db.Column(db.String, db.ForeignKey('Interviewee.id'))
    #result = db.Column(db.String)
    #percentage = db.Column(db.String)
    #
    #interviewees = db.relationship("Interviewee", back_populates="predictResult")
    #
    #
        #def __repr__(self):
#return f'<Result {self.result}>'
#

