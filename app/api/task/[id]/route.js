'use server'

import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request, context) {
    try {
        const { params } = context;
        const id = params.id;
        const promisePool = mysqlPool.promise();
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM Tasks WHERE id = ?`,
            [id]
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }
}

export async function PUT(request, context) {
    try {
        const { params } = context;
        const id = params.id;

        const data = await request.json();

        const promisePool = mysqlPool.promise();

        let query = '';
        let values = [];

        if (data.description !== "") {
            query = `UPDATE Tasks SET title = ?, description = ?, edited_at = ? WHERE id = ?`;
            values = [data.title, data.description, new Date(), id];
        } else {
            query = `UPDATE Tasks SET title = ?, edited_at = ? WHERE id = ?`;
            values = [data.title, new Date(), id];
        }

        await promisePool.query(query, values);

        const [rows, fields] = await promisePool.query(
            `SELECT * FROM Tasks WHERE id = ?`,
            [id]
        );

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }
}

export async function POST(request, context) {
    try {
        const { params } = context;
        const id = params.id;

        const data = await request.json();

        const promisePool = mysqlPool.promise();

        let query = '';
        let values = [];
        if (data.completed === 1) {
            query = `UPDATE Tasks SET completed = ?, edited_at = ? WHERE id = ?`;
            values = [data.completed, new Date(), id];
        } else if (data.completed === 0) {
            query = `UPDATE Tasks SET completed = ?, edited_at = ? WHERE id = ?`;
            values = [data.completed, new Date(), id];
        }
        await promisePool.query(query, values);

        const [rows, fields] = await promisePool.query(
            `SELECT * FROM Tasks WHERE id = ?`,
            [id]
        );

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }
}

export async function DELETE(request, context) {
    try {
        const { params } = context;
        const id = params.id;
        const pool = mysqlPool.promise();

        const [result, fields] = await pool.query(
            `DELETE FROM Tasks WHERE id = ?`,
            [id]
        );
        return NextResponse.json("Delete Success", { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json("Failed to delete task", { status: 500 });
    }
}

