import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, creatorId } = body;

  console.log('Creating room with:', { name, creatorId });

  try {
    const room = await db.room.create({
      data: {
        name,
        creatorId
      },
    });
    console.log('Room created:', room);
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: "Unable to create room" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rooms = await db.room.findMany();
    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: "Unable to fetch rooms" }, { status: 500 });
  }
}