# **Mikro-orm-example instructions**

Mikro-orm-example is a CRUD example on MongoDB and MicroORM. 
## Pull the project from GitHub

```bash
> git init
> git pull https://github.com/NelsonManuelGM/mikroorm-crud-example.git

```

## Install dependencies and start

### using docker-compose

```bash
> docker-compose up
```

## Routers

### GET ALL / POST /  on house module 

* /house  
    
### GET ONE / DELETE / CREATE

* /api/_id

### any other path will receive a 404 with some routing information

* '*'  

## Considerations

There is an .env file that **_should not be there_**. But it's there for demoing purpose.

To run the app without docker-compose should modify code, so it's recommended to do it using docker-compose
