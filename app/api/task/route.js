'use server'

import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request) {
    const promisePool = mysqlPool.promise();
    const data = await promisePool.query(
        `SELECT * FROM Tasks`
    );
    return NextResponse.json(data);
}

export async function POST(request, context) {
    try {
        const data = await request.json();
        const completed = 0;
        const promisePool = mysqlPool.promise();

        await promisePool.query(
            `INSERT INTO Tasks (title, description, completed, created_at, edited_at) VALUES (?, ?, ?, ?, ?)`,
            [data.title, data.description, completed, new Date(), new Date()]
        );

        await promisePool.query(
            `UPDATE Tasks
            SET created_at = CONVERT_TZ(created_at, 'UTC', '+07:00'),
                edited_at = CONVERT_TZ(edited_at, 'UTC', '+07:00');`
        )

        return new NextResponse(JSON.stringify({ message: "Data inserted successfully" }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
}
