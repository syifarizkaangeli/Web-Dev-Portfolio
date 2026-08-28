const token =
    localStorage.getItem("portfolio_token");

if (!token) {
    window.location.href = "/login.html";
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadMessages();
        loadProjects();

    }
);


async function api(url, options = {}) {

    options.headers = {
        ...(options.headers || {}),
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const response =
        await fetch(url, options);

    if (response.status === 401) {

        localStorage.removeItem(
            "portfolio_token"
        );

        window.location.href =
            "/login.html";

        return null;
    }

    return response;

}


async function loadMessages() {

    const container =
        document.getElementById("messages");

    try {

        const response =
            await api("/api/messages");

        if (!response) return;

        const data =
            await response.json();

        document.getElementById(
            "messageCount"
        ).textContent = data.length;

        if (!data.length) {

            container.innerHTML =
                "<p>Tidak ada pesan.</p>";

            return;
        }

        container.innerHTML =
            data.map(item => `

                <div class="message-row">

                    <strong>
                        ${escapeHtml(item.nama)}
                    </strong>

                    <small>
                        ${escapeHtml(item.email)}
                    </small>

                    <p>
                        ${escapeHtml(item.pesan)}
                    </p>

                </div>

            `).join("");

    } catch {

        container.innerHTML =
            "<p>Gagal mengambil pesan.</p>";

    }

}


async function loadProjects() {

    const container =
        document.getElementById("projects");

    try {

        const response =
            await api("/api/projects");

        if (!response) return;

        const data =
            await response.json();

        document.getElementById(
            "projectCount"
        ).textContent = data.length;

        if (!data.length) {

            container.innerHTML =
                "<p>Belum ada project.</p>";

            return;
        }

        container.innerHTML =
            data.map(item => `

                <div class="project-row">

                    <strong>
                        ${escapeHtml(item.title)}
                    </strong>

                    <p>
                        ${escapeHtml(item.description || "")}
                    </p>

                </div>

            `).join("");

    } catch {

        container.innerHTML =
            "<p>Gagal mengambil project.</p>";

    }

}


function logout() {

    localStorage.removeItem(
        "portfolio_token"
    );

    window.location.href =
        "/login.html";
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}