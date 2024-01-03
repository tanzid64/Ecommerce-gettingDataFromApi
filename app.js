
// Category
const loadCategory = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("category-parent");
            data.forEach((item) => {
                const li = document.createElement("li");
                li.classList.add("w-full", "px-4", "py-2", "border-b", "border-gray-200", "rounded-t-lg", "dark:border-gray-600");
                li.innerHTML = `
                    <button ">${item}</button>
                `;
                parent.appendChild(li);
            });
        });
};

// All Products
const loadProduct = (category) => {
    fetch("https://fakestoreapi.com/products/")
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("product-parent");
            parent.innerHTML = ''; // Clear previous products

            data.forEach((product) => {
                if (!category || product.category.toLowerCase() === category) {
                    displayProduct(product);
                }
            });
        });
};

const displayProduct = (product) => {
    const parent = document.getElementById("product-parent");
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                        <img class="rounded-t-lg card-img " src=${product.image} alt="" />
                    
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${product.title}</h5>
                        </a>
                        <button disabled
                            class="text-white bg-blue-700 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 block cursor-default">${product.price}</button>
                        <span class="bg-purple-500 text-white text-xs font-medium me-2 px-3 py-1 rounded-full text-sm">
                            ${product.category}
                        </span>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${product.description.slice(0,100)}</p>
                        <a href="product_details.html?productId=${product.id}" target="_blank"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 ">
                            Read more
                        </a>
                    </div>
                </div>
    `;
    parent.appendChild(div);
};
// View a single Product
const getparams = () =>{
    const param = new URLSearchParams(window.location.search).get("productId");
    fetch(`https://fakestoreapi.com/products/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetailsProduct(data));
};

const displayDetailsProduct = (data) => {
    const image = document.getElementById("product-image");
    image.src = `${data.image}`;
    const title = document.getElementById("product-title");
    title.innerText = `${data.title}`;
    const description = document.getElementById("product-description");
    description.innerText = `${data.description}`
    const price = document.getElementById("product-price");
    price.innerText = `$ ${data.price}`
    const category = document.getElementById("product-category");
    category.innerText = `${data.category}`
};

// Initial load
loadCategory();
loadProduct(); // By default, load all products
getparams();

// Add event listener to category buttons

document.getElementById("category-parent").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const category = event.target.textContent.toLowerCase();
        loadProduct(category);
    };
});


