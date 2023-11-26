import { connectToDB } from "@/DB/db";
import { NextRequest, NextResponse } from "next/server";
import Notes from "../../../Models/File.model";

export async function POST(request: NextRequest) {
  connectToDB();
  try {
    const reqBody = await request.json();
    const { Content, fileLink } = reqBody;
    console.log(reqBody);

    const File = new Notes({
      Content,
      fileLink,
    });

    const NewFile = await File.save();
    console.log(NewFile);

    const response = NextResponse.json({
      message: "Notes created successfully",
      success: true,
      NewFile,
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "*");
    response.headers.set("Access-Control-Allow-Headers", "*");

    return response;
  } catch (error: any) {
    const response = NextResponse.json(
      { error: "Stuck at Something Please Try Again" },
      { status: 500 }
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "*");
    response.headers.set("Access-Control-Allow-Headers", "*");
    return response;
  }
}

export async function GET() {
  try {
    const Note = await Notes.find();

    const response = NextResponse.json({
      message: "Content fetched successfully",
      success: true,
      Note,
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
