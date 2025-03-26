document.getElementById("search-btn").addEventListener("click", fetchUsers);

function fetchUsers() {
    const searchInput = document.getElementById("search").value.trim();
    const url = "https://jsonplaceholder.typicode.com/users";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const userList = document.getElementById("user-list");
            userList.innerHTML = "";

            const filteredUsers = data.filter(user => 
                user.name.toLowerCase().includes(searchInput.toLowerCase())
            );

            if (filteredUsers.length > 0) {
                filteredUsers.forEach(user => {
                    const li = document.createElement("li");
                    li.textContent = `${user.name} (${user.email})`;
                    userList.appendChild(li);
                });
            } else {
                userList.innerHTML = "<li>No users found.</li>";
            }
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            document.getElementById("user-list").innerHTML = 
                "<li>Error loading users. Please try again.</li>";
        });
}
