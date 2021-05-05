<h1 align="center">PostgreSQL FullText Search 🐘</h1>
<p>
</p>

> Repo for study and testing postgreSQL fulltext search

## Demo
> The tests was make with 16000 users on database
![result](https://user-images.githubusercontent.com/35340991/117218742-19aa5080-adda-11eb-9a78-98e2f65d4523.gif)

## Prerequisites 
- docker
- docker-compose
- node
- npm

## Execute server
> After clone repository
```sh
cd server
npm install #Install dependencies
cd .docker/
docker-compose up #Up postgreSQL instance
cd .. 
npm run run-seed #Register 2000 users on database
npm run start #Start server
```

## Execute front-end app
> After clone repository
```sh
cd web
npm install #Install dependencies
npm run start #Run app
```

## References
https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/  
https://austingwalters.com/fast-full-text-search-in-postgresql/

## Author

👤 **Jeferson Vinícius**

* Website: https://www.linkedin.com/in/jefersonvinicius/
