'use server'

import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request, context) {
    const { params } = context;
    const filter = params.filter;
    if (filter === "ALL") {
        const pormisePool = mysqlPool.promise();
        const [rows, fields] = await pormisePool.query(
            `SELECT * FROM todolist.Todos;`
        );
        return NextResponse.json(rows);
    } else if (filter === "Completed") {
        const pormisePool = mysqlPool.promise();
        const [rows, fields] = await pormisePool.query(
            `SELECT * FROM todolist.Todos WHERE completed = 1;`
        );
        return NextResponse.json(rows);
    } else {
        const pormisePool = mysqlPool.promise();
        const [rows, fields] = await pormisePool.query(
            `SELECT * FROM todolist.Todos WHERE completed = 0;`
        );
        return NextResponse.json(rows);
    }

    NextResponse.json(filter)
}
