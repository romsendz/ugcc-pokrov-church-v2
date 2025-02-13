import { prisma } from "@lib/prisma/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      if (!existingUser.isVerified) {
        return NextResponse.json(
          {
            message: "Ваш запит ще не підтверджено.",
            createdAt: existingUser.createdAt,
          },
          { status: 403 },
        );
      } else {
        return NextResponse.json(
          { message: "Користувач із цією електронною адресою вже існує" },
          { status: 409 },
        );
      }
    }

    // Hash password & create user
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message:
          "Ваш запит на доступ успішно подано. Це може зайняти деякий час. Очікуйте підтвердження. ",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Database update error:", error);
    return NextResponse.json(
      { message: "Щось пішло не так. Спробуйте знову" },
      { status: 500 },
    );
  }
}
