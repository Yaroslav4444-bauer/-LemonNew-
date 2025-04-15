# main.py
from fastapi import FastAPI, HTTPException, Depends, status
from sqlalchemy.orm import Session
from humorussia import SessionLocal, engine
from models import User
from crud import create_user, authenticate_user
from pydantic import BaseModel
from datetime import timedelta
from jose import jwt

app = FastAPI()

# Модель для регистрации
class UserCreate(BaseModel):
    nickname: str
    email: str
    password: str

# Эндпоинт регистрации
@app.post("/api/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    create_user(db=db, user=user)
    return {"message": "Пользователь зарегистрирован"}

# Эндпоинт входа
@app.post("/api/login")
async def login(email: str, password: str, db: Session = Depends(get_db)):
    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}