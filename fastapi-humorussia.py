from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, LargeBinary, text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from passlib.context import CryptContext
from datetime import datetime
from jose import jwt
import os
from dotenv import load_dotenv
from pydantic import BaseModel

# Модель для регистрации
class UserCreate(BaseModel):
    email: str
    password: str
    nickname: str

# Загрузка переменных окружения
load_dotenv()

# Настройка подключения к базе данных PostgreSQL
DATABASE_URL = "postgresql://postgres:db44@localhost:5432/humorussia_db"

# Создание движка SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    echo=True
)

# Настройка сессии
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# class RatingTotal(Base):
#    __tablename__ = "rating_total"
#    __table_args__ = {"schema": "humorussia_db"}

#    iduser = Column("iduser", Integer, primary_key=True)
#    rank = Column(Integer, nullable=False)
#    page = Column(Integer, nullable=False)

# Модель пользователя, соответствующая существующей таблице
class User(Base):
    __tablename__ = "user_data"
    __table_args__ = {"schema": "humorussia_db"}  # Указываем схему

    iduser = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=text("TIMESTAMP '1970-01-01 00:00:01'"))
    avatar = Column(LargeBinary, nullable=True)
    # rating_total_iduser = Column(Integer, nullable=False)

# НЕ создаем таблицы, так как они уже существуют
# Base.metadata.create_all(bind=engine)

# Настройка безопасности
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Настройка FastAPI
app = FastAPI(title="HumoRussia API")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Функции для работы с паролями
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# Функция для создания JWT токена
def create_access_token(data: dict):
    return jwt.encode(data, "SECRET_KEY", algorithm="HS256")

# Зависимость для получения сессии БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Регистрация пользователя
@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    # Проверка существования email
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Проверка существования nickname
    if db.query(User).filter(User.nickname == user.nickname).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nickname already taken"
        )

    # Создаем запись в Rating_total
    try:
        # Получаем максимальный существующий ID из rating_total
        # max_id_query = text("""
        #    SELECT COALESCE(MAX("iduser"), 0) + 1 as next_id 
        #    FROM humorussia_db.user_data
        #""")
        #result = db.execute(max_id_query)
        #next_id = result.scalar()

        # Создаем новую запись в Rating_total
        #rating_query = text("""
        #    INSERT INTO humorussia_db."rating_total" ("iduser", rank, page)
        #    VALUES (:id, 0, 1)
        #    RETURNING "iduser"
        #""")
        #result = db.execute(rating_query)
        #rating_id = result.scalar()
        
        # Создание нового пользователя
        hashed_password = hash_password(user.password)
        new_user = User(
            nickname=user.nickname,
            email=user.email,
            password_hash=hashed_password,
            # rating_total_iduser=rating_id,
            created_at=datetime.utcnow()
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return {
            "message": "User registered successfully",
            "user_id": new_user.iduser,
            "nickname": new_user.nickname
        }
    except Exception as e:
        db.rollback()
        print(f"Error during registration: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )

# Вход в систему
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "nickname": user.nickname,
        "email": user.email,
        "iduser": user.iduser,
        "created_at": user.created_at
    }

# Эндпоинт для получения данных пользователя


# Обработка ошибок подключения к БД
@app.on_event("startup")
async def startup_event():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
    except Exception as e:
        print(f"Error connecting to the database: {str(e)}")
        raise

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)