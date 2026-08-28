const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};


function json(data, status = 200) {

    return new Response(
        JSON.stringify(data),
        {
            status,
            headers: jsonHeaders
        }
    );

}


async function readBody(request) {

    try {
        return await request.json();
    } catch {
        return null;
    }

}


function getToken(request) {

    const header =
        request.headers.get("Authorization");

    if (!header) {
        return null;
    }

    if (!header.startsWith("Bearer ")) {
        return null;
    }

    return header.substring(7);

}


async function requireAuth(request, env) {

    const token =
        getToken(request);

    if (!token) {
        return false;
    }

    const user =
        await env.DB
            .prepare(
                "SELECT id FROM users WHERE token = ? LIMIT 1"
            )
            .bind(token)
            .first();

    return !!user;

}


export default {

    async fetch(request, env) {

        const url =
            new URL(request.url);

        const path =
            url.pathname;


        /*
         * REGISTER
         */

        if (
            path === "/api/register" &&
            request.method === "POST"
        ) {

            const body =
                await readBody(request);

            if (
                !body ||
                !body.name ||
                !body.email ||
                !body.password
            ) {

                return json({
                    error:
                        "Semua field wajib diisi."
                }, 400);

            }

            if (
                body.password.length < 6
            ) {

                return json({
                    error:
                        "Password minimal 6 karakter."
                }, 400);

            }

            const email =
                body.email.trim().toLowerCase();

            const existing =
                await env.DB
                    .prepare(
                        "SELECT id FROM users WHERE email = ? LIMIT 1"
                    )
                    .bind(email)
                    .first();

            if (existing) {

                return json({
                    error:
                        "Email sudah terdaftar."
                }, 409);

            }


            const salt =
                crypto.randomUUID();

            const passwordHash =
                await hashPassword(
                    body.password,
                    salt
                );


            await env.DB
                .prepare(`
                    INSERT INTO users
                    (name, email, password_hash, password_salt)
                    VALUES (?, ?, ?, ?)
                `)
                .bind(
                    body.name.trim(),
                    email,
                    passwordHash,
                    salt
                )
                .run();


            return json({
                message:
                    "Register berhasil."
            }, 201);

        }


        /*
         * LOGIN
         */

        if (
            path === "/api/login" &&
            request.method === "POST"
        ) {

            const body =
                await readBody(request);

            if (
                !body ||
                !body.email ||
                !body.password
            ) {

                return json({
                    error:
                        "Email dan password wajib diisi."
                }, 400);

            }

            const email =
                body.email.trim().toLowerCase();

            const user =
                await env.DB
                    .prepare(`
                        SELECT
                            id,
                            name,
                            email,
                            password_hash,
                            password_salt
                        FROM users
                        WHERE email = ?
                        LIMIT 1
                    `)
                    .bind(email)
                    .first();

            if (!user) {

                return json({
                    error:
                        "Email atau password salah."
                }, 401);

            }

            const valid =
                await verifyPassword(
                    body.password,
                    user.password_hash,
                    user.password_salt
                );

            if (!valid) {

                return json({
                    error:
                        "Email atau password salah."
                }, 401);

            }

            const token =
                crypto.randomUUID() +
                crypto.randomUUID();


            await env.DB
                .prepare(`
                    UPDATE users
                    SET token = ?
                    WHERE id = ?
                `)
                .bind(
                    token,
                    user.id
                )
                .run();


            return json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        }


        /*
         * CONTACT
         */

        if (
            path === "/api/contact" &&
            request.method === "POST"
        ) {

            const body =
                await readBody(request);

            if (
                !body ||
                !body.nama ||
                !body.email ||
                !body.pesan
            ) {

                return json({
                    error:
                        "Nama, email dan pesan wajib diisi."
                }, 400);

            }

            await env.DB
                .prepare(`
                    INSERT INTO kontak
                    (nama, email, pesan)
                    VALUES (?, ?, ?)
                `)
                .bind(
                    body.nama.trim(),
                    body.email.trim(),
                    body.pesan.trim()
                )
                .run();


            return json({
                message:
                    "Pesan berhasil disimpan."
            }, 201);

        }


        /*
         * HIRE
         */

        if (
            path === "/api/hire" &&
            request.method === "POST"
        ) {

            const body =
                await readBody(request);

            if (
                !body ||
                !body.nama ||
                !body.email ||
                !body.project ||
                !body.pesan
            ) {

                return json({
                    error:
                        "Semua field wajib diisi."
                }, 400);

            }

            await env.DB
                .prepare(`
                    INSERT INTO hire
                    (nama, email, project, pesan)
                    VALUES (?, ?, ?, ?)
                `)
                .bind(
                    body.nama.trim(),
                    body.email.trim(),
                    body.project.trim(),
                    body.pesan.trim()
                )
                .run();


            return json({
                message:
                    "Hire request berhasil disimpan."
            }, 201);

        }


        /*
         * PROJECTS - PUBLIC
         */

        if (
            path === "/api/projects" &&
            request.method === "GET"
        ) {

            const result =
                await env.DB
                    .prepare(`
                        SELECT
                            id,
                            title,
                            description,
                            technology
                        FROM projects
                        ORDER BY id DESC
                    `)
                    .all();

            return json(
                result.results || []
            );

        }


        /*
         * MESSAGES - ADMIN
         */

        if (
            path === "/api/messages" &&
            request.method === "GET"
        ) {

            const authenticated =
                await requireAuth(
                    request,
                    env
                );

            if (!authenticated) {

                return json({
                    error:
                        "Unauthorized"
                }, 401);

            }


            const result =
                await env.DB
                    .prepare(`
                        SELECT
                            id,
                            nama,
                            email,
                            pesan,
                            created_at
                        FROM kontak
                        ORDER BY id DESC
                        LIMIT 100
                    `)
                    .all();


            return json(
                result.results || []
            );

        }


        /*
         * DEFAULT
         */

        return env.ASSETS.fetch(
            request
        );

    }

};


/*
 * PASSWORD HASH
 * Setiap user punya salt sendiri (disimpan di kolom
 * password_salt) supaya dua user dengan password sama
 * tetap punya hash yang berbeda.
 */

async function hashPassword(password, salt) {

    const data =
        new TextEncoder()
            .encode(salt + password);

    const hash =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    return [...new Uint8Array(hash)]
        .map(
            byte =>
                byte.toString(16)
                    .padStart(2, "0")
        )
        .join("");

}


async function verifyPassword(
    password,
    hash,
    salt
) {

    const newHash =
        await hashPassword(password, salt);

    return newHash === hash;

}