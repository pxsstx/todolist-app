'use server'

import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request,context) {
    const { params } = context;
    const search = params.search;

    const pormisePool = mysqlPool.promise()
    const [rows, fields] = await pormisePool.query(
        `SELECT * FROM todolist.Todos WHERE title = '${search}'`
    )
    return NextResponse.json(rows)
}