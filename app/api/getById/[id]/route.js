'use server'

import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(requst, context) {
    const { params } = context;
    const pormisePool = mysqlPool.promise()
    const [rows, fields] = await pormisePool.query(
        `SELECT * FROM todolist.Todos `
    )
    const data = rows.filter(x => params.id === x.id.toString())
    return NextResponse.json(data[0])
}

export async function POST(requst, context) {
    const { params } = context;
    const id = params.id

    const data = await requst.json()

    if (data.description !== "") {
        const pormisePool = mysqlPool.promise()
        await pormisePool.query(
            `UPDATE todolist.Todos SET title = ?, description = ?, edited_at = ? WHERE id = ?`,
            [data.title, data.description, new Date(), id]
        );

    } else {
        const pormisePool = mysqlPool.promise()
        await pormisePool.query(
            `UPDATE todolist.Todos SET title = ?, edited_at = ? WHERE id = ?`,
            [data.title, new Date(), id]
        );

    }

    const pormisePool = mysqlPool.promise()
    const [rows, fields] = await pormisePool.query(
        `SELECT * FROM todolist.Todos WHERE id = ${id}`
    )
    return NextResponse.json(rows)
}

export async function DELETE(request, context) {
    const { params } = context;
    const id = params.id;
    const pool = mysqlPool.promise();
    try {
        const [result, fields] = await pool.query(
            `DELETE FROM todolist.Todos WHERE id = ${id};`
        );
        if (result.affectedRows === 0) {
            // If no rows were affected, it means the task with the given ID does not exist
            return NextResponse.json("Task not found", { status: 404 });
        }
        return NextResponse.json("Delete Success", { status: 200 });

    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json("Failed to delete task", { status: 500 });
    }
}

