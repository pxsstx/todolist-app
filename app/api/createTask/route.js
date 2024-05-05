'use server'

import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function POST(request, context) {
    try {
        // Extract JSON data from the request
        const data = await request.json();

        // Set completed to 0 by default
        const completed = 0;

        // Establish connection to the MySQL database using promise pool
        const promisePool = mysqlPool.promise();

        // Insert the received data into the Todos table
        await promisePool.query(
            `INSERT INTO todolist.Todos (title, description, completed, created_at, edited_at) VALUES (?, ?, ?, ?, ?)`,
            [data.title, data.description, completed, new Date(), new Date()]
        );

        // Return a success response
        return new Response(JSON.stringify({ message: "Data inserted successfully" }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
}
