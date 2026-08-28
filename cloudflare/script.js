document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("year").textContent =
        new Date().getFullYear();

    loadProjects();

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const status =
            document.getElementById("contactStatus");

        status.textContent = "Mengirim...";

        const data = {
            nama: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            pesan: document.getElementById("message").value.trim()
        };

        try {

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Gagal mengirim");
            }

            status.textContent =
                "Pesan berhasil dikirim.";

            form.reset();

        } catch (error) {

            status.textContent =
                error.message;

        }

    });

});


async function loadProjects() {

    const container =
        document.getElementById("projectsContainer");

    try {

        const response =
            await fetch("/api/projects");

        const projects =
            await response.json();

        if (!projects.length) {

            container.innerHTML = `
                <div class="project-card">
                    <h3>Belum ada project</h3>
                    <p>
                        Project akan muncul di sini.
                    </p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            projects.map(project => `

                <article class="project-card">

                    <h3>${escapeHtml(project.title)}</h3>

                    <p>
                        ${escapeHtml(project.description || "")}
                    </p>

                    <div class="project-tech">
                        ${escapeHtml(project.technology || "")
                            .split(",")
                            .map(t =>
                                `<span>${escapeHtml(t.trim())}</span>`
                            )
                            .join("")}
                    </div>

                </article>

            `).join("");

    } catch {

        container.innerHTML = `
            <div class="project-card">
                <h3>Projects</h3>
                <p>
                    Data project belum tersedia.
                </p>
            </div>
        `;

    }
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}