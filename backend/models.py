# models.py
from sqlalchemy import Column, Integer, String, TIMESTAMP, BLOB, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = "User"
    idUser = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, default=func.now())
    avatar = Column(BLOB, nullable=True)
    Rating_total_idUser = Column(Integer, ForeignKey("Rating_total.idUser"))