document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("searchBox");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const results = document.getElementById("results");

    searchButton.addEventListener("click", () => {
        searchData();
    });

    clearButton.addEventListener("click", () => {
        clearResults();
    });

    searchBox.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            searchData();
        }
    });

    async function searchData() {
        const searchTerm = searchBox.value;

        if (searchTerm) {
            // Define the Chronicling America API endpoint.
            const myUrl = `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${encodeURIComponent(searchTerm)}&format=json`;

            try {
                // Fetch data from the Chronicling America API asynchronously.
                const response = await fetch(myUrl);
                const data = await response.json();

                const limitedData = data.items.slice(0, 5); // Retrieve at least 5 search results

                // Process and display search results.
                results.innerHTML = "";

                limitedData.forEach(article => {
                    const articleElement = document.createElement("div");
                    articleElement.className = "article";
                    articleElement.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>Date: ${article.date}</p>
                        <p>Place: ${article.place}</p>
                    `;
                    results.appendChild(articleElement);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }

    function clearResults() {
        results.innerHTML = "";
        searchBox.value = "";
    }
});
