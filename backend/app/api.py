from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

products = [
    {
        "id": "1",
        "nombre": "airbuds 4i.",
        "descripcion" : "Duración de bateria hasta 12 hrs."
    },
    {
        "id": "2",
        "nombre": "Smart watch 3",
        "descripcion" : "Toma de pulso, conteo de pasos."
    }
]

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/product", tags=["products"])
async def get_products() -> dict:
    return { "data": products, "permisos" : {"eliminar" : True, "editar" : True} }

@app.post("/add_product", tags=["products"])
async def add_product(todo: dict) -> dict:
    products.append(todo)
    return {
        "estado": "ok" ,
        "mensaje": "Producto agregado." 
    }

@app.delete("/delete_product/{id}", tags=["products"])
async def delete_product(id: int) -> dict:
    for product in products:
        if int(product["id"]) == id:
            products.remove(product)
            return {
                "data": f"El producto con id {id} se ha eliminado."
            }

    return {
        "data": f"El producto con id {id} no fue encontrado."
    }

@app.put("/update_product/{id}", tags=["products"])
async def update_product(id: int, body: dict) -> dict:
    for product in products:
        if int(product["id"]) == id:
            product["item"] = body["item"]
            return {
                "data": f"ok."
            }

    return {
        "data": f"El producto con id {id} no fue encontrado."
    }