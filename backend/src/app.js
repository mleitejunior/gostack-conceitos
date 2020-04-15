const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


function repositoryExists(request, response, next) {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Repository not found '});
  }

  request.id = id;
  request.repositoryIndex = repositoryIndex;

  return next();
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(project)

  return response.json(project)
});

app.put("/repositories/:id", repositoryExists, (request, response) => {
  const { title, url, techs } = request.body;

  const likes = repositories[request.repositoryIndex].likes;

  const repository = {
    id: request.id,
    title,
    url,
    techs,
    likes
  }

  repositories[request.repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", repositoryExists, (request, response) => {
  repositories.splice(request.repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", repositoryExists, (request, response) => {
  const repository = repositories[request.repositoryIndex];
  
  repository.likes++;

  return response.json(repository);
});

module.exports = app;
