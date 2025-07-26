from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from connect import DbConnection



app = FastAPI()

# ✅ Allow frontend (React app) to access this backend
origins = [
    "http://localhost:3000",  # your React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # allow specific origin
    allow_credentials=True,
    allow_methods=["*"],              # allow all HTTP methods
    allow_headers=["*"],              # allow all headers
)

dbConn = DbConnection()

@app.get("/")
def index():
    return {"message": "I am home page new"}

@app.get("/blogs")
def blog_listing():
    result = dbConn.execute_query("SELECT id, title, content, create_at FROM blogs")
    return result
