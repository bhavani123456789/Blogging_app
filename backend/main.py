from fastapi import FastAPI
from db.connect import DbConnection

app = FastAPI()
dbConn = DbConnection()


@app.get("/")
def index():
    return "I am home page new"


@app.get("/blogs")
def blog_listing():
    result = dbConn.execute_query("SELECT id, title, content, create_at FROM blogs")
    # convert it to json
    return result


# if __name__ == "__main__":
#     from uvicorn import run

#     run("main:app")
