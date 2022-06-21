
const API_KEY = "aa76be0aa17ee34b8f6301193ddf69ff";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: API_KEY,
  },
});

// utils

function createMovies(movies, container){

  container.innerHTML = "";

  movies.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('movie-container');

    div.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });
    const img = document.createElement('img');
    img.classList.add('movie-img');
    img.setAttribute('alt', movie.title);
    img.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200' + movie.poster_path
    );

    div.appendChild(img);
    container.appendChild(div);
  });
}

function createCategories(categories, container) {

  container.innerHTML = "";

  categories.forEach((category) => {
    const div = document.createElement('div');
    div.classList.add('category-container');

    const h3 = document.createElement('h3');
    h3.classList.add('category-title');
    h3.setAttribute('id', 'id' + category.id);
    h3.addEventListener("click", () => {
      location.hash = "#category=" + category.id + "-" + category.name;
    })
    const h3Text = document.createTextNode(category.name);

    h3.appendChild(h3Text);
    div.appendChild(h3);
    container.appendChild(div);
  });
}
// API calls

async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  console.log('data ', data, 'movies ', movies);

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  console.log(data);
  console.log(categories);
  
  createCategories(categories, categoriesPreviewList)
}

async function getMoviesByCategory(id){ 
  const { data } = await api('discover/movie', {
    params:{
      with_genres: id,
    },
  });
  const movies = data.results;

  console.log('data ', data, 'movies ', movies);

  
  createMovies(movies, genericSection);
  
  
};

async function getMoviesBySearch(query){ 
  const { data } = await api('search/movie', {
    params:{
      query,
    },
  });
  const movies = data.results;

  console.log('data ', data, 'movies ', movies);

  
  createMovies(movies, genericSection);
  
  
};

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  console.log('data ', data, 'movies ', movies);

  createMovies(movies, genericSection);
}

async function getMovieById(id) {
  const {data : movie} = await api("movie/" + id);

  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

  headerSection.style.background = `
  linear-gradient(
    180deg,
    rgba(0,0,0,0.35) 19.27%,
    rgba(0,0,0,0) 29.17%
    ),
  url(${movieImgUrl})`;
  

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent =movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
  const {data} = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer)

}