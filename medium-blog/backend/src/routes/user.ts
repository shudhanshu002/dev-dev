import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode,sign,verify } from 'hono/jwt';
import {signupInput} from "shudhanshu-common"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // check for duplicates
    const existing = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (existing) {
      return c.json({ error: "Username already exists" }, 400);
    }

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    // either use env or hardcode
    const secret = c.env.JWT_SECRET ?? "heloo-world";
    const jwt = await sign({ id: user.id }, secret);

    return c.json({ token: jwt });
  } catch (error) {
    console.error(error);
    return c.text("Server error", 500);
  }
});


userRouter.post('/signin',async (c) => {
	const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      }
    })

    if(!user) {
      c.status(403);
      return c.json({
        message: "Incorrect creds"
      })
    }

    const secret = c.env.JWT_SECRET ?? "heloo-world";

    const jwt = await sign({
      id: user.id
    },secret);
    console.log("good to go")
    return c.text(jwt)
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text('Invalid')
  }
})