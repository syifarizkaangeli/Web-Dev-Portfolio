document
    .getElementById("hireForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const status =
            document.getElementById("status");

        status.textContent =
            "Mengirim request...";

        try {

            const response =
                await fetch("/api/hire", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        nama:
                            document.getElementById(
                                "name"
                            ).value.trim(),

                        email:
                            document.getElementById(
                                "email"
                            ).value.trim(),

                        project:
                            document.getElementById(
                                "project"
                            ).value.trim(),

                        pesan:
                            document.getElementById(
                                "message"
                            ).value.trim()

                    })

                });

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(result.error);
            }

            status.textContent =
                "Request berhasil dikirim.";

            document
                .getElementById("hireForm")
                .reset();

        } catch (error) {

            status.textContent =
                error.message;

        }

    });