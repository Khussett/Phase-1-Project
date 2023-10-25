document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const articleList = document.getElementById("article-list");
    const articleDetails = document.getElementById("article-details");
    const articleTitle = document.getElementById("article-title");
    const articleContent = document.getElementById("article-content");

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;
        if (searchTerm.trim() === "") {
            alert("Please enter a search term.");
            return;
        }
        //Clear previous results
        articleList.innerHTML = "";

        // Use the Chronicling America API to fetch results
        fetch(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${searchTerm}&format=json`)
            .then((response) => response.json())
            .then((data) => {
                const titles = data.items;
                titles.forEach((title) => {
                    const titleName = title.title || "Title not available";
                    const li = document.createElement("li");
                    li.textContent = titleName;
                    li.addEventListener("click", () => showArticleDetails(title.id));
                    articleList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });

    function showArticleDetails(articleId) {
        // Fetch article details using the article ID
        fetch(`https://chroniclingamerica.loc.gov/lccn/${articleId}.json`)
            .then((response) => response.json())
            .then((data) => {
                const article = data;
                articleTitle.textContent = article.name || "Title not available";
                articleContent.innerHTML = article.description || "Description not available";
                articleDetails.classList.remove("hidden");
            })
            .catch((error) => {
                console.error("Error fetching article details:", error);
            });
    }
});
