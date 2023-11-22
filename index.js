const accessKey = "Z7oxk6lYPk_CiqY9ahsva0vEYqPmfp2DQRo4zdMHwe8";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const showMoreBtn = document.getElementById("show-more-btn");
const searchResult = document.getElementById("search-result");

let keyword = "";
let page = 1;

async function searchImages() {
keyword = searchBox.value;
const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

const response = await fetch(url);
const data = await response.json();

if(page === 1) {
    searchResult.innerHTML = "";
}

const results = data.results;

results.forEach((result) => {
const image = document.createElement("img")
image.src=result.urls.small;
const imageLink = document.createElement("a");
imageLink.href=result.links.html;
imageLink.target = "_blank";

imageLink.appendChild(image);
searchResult.appendChild(imageLink);
})
showMoreBtn.style.display = "block";
}

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      page = 1;
      searchImages();
    }
  });

searchForm.addEventListener("submit", (e) => {
e.preventDefault();
page = 1;
searchImages();
});

showMoreBtn.addEventListener("click", ()=>{
page++;
searchImages();
})


  
