const characterId = document.getElementById("characterId"); //Captura do elemento ID no input
const characterName = document.getElementById("characterName");
const btnNome = document.getElementById("btnNome");
const btnPesquisar = document.getElementById("btnPesquisar"); // A hora que clicar no botão, vai startar alguma função
const content = document.getElementById("content"); //Vai servir para mostrar o bojetivo na tela
const image = document.getElementById("img"); //Mostrar a imagem correta do personagem

//Requisição na API atravez da função fetch
const fetchApi = (value) => {
  //Essa variavel vai prometer que vai trazer um arquivo .json
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((response) => response.json()) //<- Se trata de uma estrutura de código assincrono, onde se espera um retorno da requisição de dentro da API
    .then((data) => {
      console.log(data);
      return data;
    });

  return result;
};

const fetchApiName = (valueName) => {
  return fetch(`https://rickandmortyapi.com/api/character/?name=${valueName}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.results;
    });
};

const keys = [
  "name",
  "status",
  "species",
  "gender",
  "origin",
  "image",
  "episode",
];

const buildResult = (result) => {
  const newObject = {};
  keys.map((key) => document.getElementById(key));
};

btnPesquisar.addEventListener("click", async (event) => {
  event.preventDefault();
  const result = await fetchApi(characterId.value);
  //content.innerHTML = result; <- Retorno com o innerHTML é só um [object Promise]//
  //content.innerHTML = JSON.stringify(result); //<- Retorno com o innerHTML é só um objeto vazio: {}//
  content.textContent = `${JSON.stringify(result, undefined, 2)}`;
  image.src = `${result.image}`;
});

btnNome.addEventListener("click", async (event) => {
  event.preventDefault();
  const resultName = await fetchApiName(characterName.value);

  // Limpa o conteúdo da página antes de adicionar novos resultados
  content.innerHTML = "";

  // Verifica se há resultados
  if (resultName.length > 0) {
    resultName.forEach((character) => {
      // Monta o conteúdo para cada personagem
      let output = `<div class="character">
          <h3>${character.name}</h3>`;

      // Exibe as informações conforme as checkboxes
      if (document.getElementById("name").checked) {
        output += `<p><strong>Name:</strong> ${character.name}</p>`;
      }
      if (document.getElementById("status").checked) {
        output += `<p><strong>Status:</strong> ${character.status}</p>`;
      }
      if (document.getElementById("species").checked) {
        output += `<p><strong>Species:</strong> ${character.species}</p>`;
      }
      if (document.getElementById("gender").checked) {
        output += `<p><strong>Gender:</strong> ${character.gender}</p>`;
      }
      if (document.getElementById("origin").checked) {
        output += `<p><strong>Origin:</strong> ${character.origin.name}</p>`;
      }
      if (document.getElementById("episode").checked) {
        output += `<p><strong>Episodes:</strong> ${character.episode.length}</p>`;
      }

      // Exibe a imagem se a checkbox "Image" estiver marcada
      if (document.getElementById("image").checked) {
        output += `<p><strong>Image:</strong><br><img src="${character.image}" alt="${character.name}" style="width: 150px;"></p>`;
      }

      output += `</div><hr>`; // Adiciona uma linha para separar os personagens
      content.innerHTML += output; // Adiciona o conteúdo no painel
    });
  } else {
    content.innerHTML = "<p>No characters found with that name.</p>"; // Mensagem caso não encontre nenhum personagem
  }
});
