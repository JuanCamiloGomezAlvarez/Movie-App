const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'content-type': 'application/json;carset=utf-8',
  },
  params: {
    api_key: API_KEY,
  },
});

async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;
  console.log('data ', data, 'movies ', movies);

  movies.forEach((movie) => {
    const trendingPreviewMoviesContainer = document.querySelector(
      '#trendingPreview .trendingPreview-movieList'
    );

    const div = document.createElement('div');
    div.classList.add('movie-container');

    const img = document.createElement('img');
    img.classList.add('movie-img');
    img.setAttribute('alt', movie.title);
    img.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200' + movie.poster_path
    );

    div.appendChild(img);
    trendingPreviewMoviesContainer.appendChild(div);
  });
}

async function getCategoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  console.log(data);
  console.log(categories);

  categories.forEach((category) => {
    const previewCategoriesContainer = document.querySelector(
      '#categoriesPreview .categoriesPreview-list'
    );

    const div = document.createElement('div');
    div.classList.add('category.container');

    const h3 = document.createElement('h3');
    h3.classList.add('category-title');
    h3.setAttribute('id', 'id' + category.id);
    const h3Text = document.createTextNode(category.name);

    h3.appendChild(h3Text);
    div.appendChild(h3);
    previewCategoriesContainer.appendChild(div);
  });
}
