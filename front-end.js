
const fetchArticles = async () => {
  

const response = await fetch("http:localhost:3000/api/articles");

const json = await response.json();
console.log(json);
}

fetchArticles();