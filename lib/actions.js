"use server"

import pool from "./database"
import fs from "node:fs/promises"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { existsSync } from "node:fs"

export async function getUsers() {
    const conn = await pool.getConnection()

    const [users] = await conn.query("select * from users")

    pool.releaseConnection(conn)

    return users
}

export async function getUserById(userId) {
    const conn = await pool.getConnection()

    const [users] = await conn.execute(
        "select * from users where id = ? limit 1",
        [userId]
    )

    pool.releaseConnection(conn)

    if (!users.length) return null

    return users[0]
}

export async function getUserByEmail(email) {
    const conn = await pool.getConnection()

    const [users] = await conn.execute(
        "select * from users where email = ? limit 1",
        [email]
    )

    pool.releaseConnection(conn)

    if (!users.length) return null

    return users[0]
}

export async function storeUser(initialState, formData) {
    const username  = formData.get("username")  ? formData.get("username")                  : null
    const email     = formData.get("email")     ? formData.get("email")                     : null
    const password  = formData.get("password")  ? bcrypt.hashSync(formData.get("password")) : null
    const image     = formData.get("image")
    let filePath    = null

    if (image.size) {
        const arrayBuffer = await image.arrayBuffer()

        const buffer = new Uint8Array(arrayBuffer)

        const randomizedImageName = Date.now().toString(36)

        const imageExt  = image.name.split(".").pop()

        filePath = `/storage/${randomizedImageName}.${imageExt}`

        if (!existsSync('./public/storage')) await fs.mkdir('./public/storage')

        await fs.writeFile(`./public${filePath}`, buffer)
    }

    const conn = await pool.getConnection()
    
    await conn.execute(
        "insert into users (username, email, image, password) values (?, ?, ?, ?)",
        [username, email, filePath, password]
    )

    pool.releaseConnection(conn)

    redirect("/login")
}

export async function updateUser(userId, formData) {
    const username  = formData.get("username")  ? formData.get("username")                  : null
    const email     = formData.get("email")     ? formData.get("email")                     : null
    const image     = formData.get("image")
    
    const conn = await pool.getConnection()

    const user = await getUserById(userId)

    if (!user) throw new Error("User not found")
    
    let filePath = user.image

    if (image.size) {
        const arrayBuffer = await image.arrayBuffer()

        const buffer = new Uint8Array(arrayBuffer)

        const randomizedImageName = Date.now().toString(36)

        const imageExt  = image.name.split(".").pop()

        filePath = `/storage/${randomizedImageName}.${imageExt}`

        // Hapus gambar lama
        if (user.image && existsSync(`./public${user.image}`)) await fs.unlink(`./public${user.image}`)

        // Buat folder storage kalo gk ada
        if (!existsSync('./public/storage')) await fs.mkdir('./public/storage')

        // Simpen gambar
        await fs.writeFile(`./public${filePath}`, buffer)
    }
    
    await conn.execute(
        "update users set username = ?, email = ?, image = ? where id = ?",
        [username, email, filePath, userId]
    )

    pool.releaseConnection(conn)

    // revalidatePath("/dashboard/profile")
}



export async function destroyUser(userId) {
    const conn = await pool.getConnection()

    const user = await getUserById(userId)

    if (!user) return
    
    await conn.execute(
        "delete from users where id = ?",
        [userId]
    )

    pool.releaseConnection(conn)

    if (user.image && existsSync(`./public${user.image}`)) await fs.unlink(`./public${user.image}`)

    revalidatePath("/dashboard/users")
}