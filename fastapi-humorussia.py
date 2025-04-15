from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from datetime import datetime
from jose import jwt

# настройка базы данных
DATABASE_URL = "mysql://root:Yaroslav22#B@@127.0.0.1/backend/humorussia"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# модель пользователя
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password_hash = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

# создание базы данных
Base.metadata.create_all(bind=engine)

# настройка паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# настройка FastAPI
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# функция для хеширования пароля
def hash_password(password: str):
    return pwd_context.hash(password)

# функция для проверки пароля
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# функция для создания JWT токена
def create_access_token(data: dict):
    return jwt.encode(data, "SECRET_KEY", algorithm="HS256")

# регистрация пользователя
@app.post("/register")
def register(email: str, password: str, db: Session = Depends(SessionLocal)):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(password)
    new_user = User(email=email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"msg": "User registered successfully"}

# вход в систему
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(SessionLocal)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Изменение пароля
@app.put("/change-password")
def change_password(email: str, old_password: str, new_password: str, db: Session = Depends(SessionLocal)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(old_password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    user.password_hash = hash_password(new_password)
    db.commit()

    return {"msg": "Password updated successfully"}
