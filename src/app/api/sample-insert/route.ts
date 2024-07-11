import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/db/db";
import { users } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const password = await bcrypt.hash(data.password, 10);
    const result = await db.insert(users).values({ ...data, password });
    console.log(result);
    return NextResponse.json({ msg: data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Some internal error happened." },
      { status: 500 }
    );
  }
}
