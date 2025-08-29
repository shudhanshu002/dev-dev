


import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { decode,sign,verify } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

app.use("/api/*", cors());

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog", blogRouter)

// app.post('/api/v1/user/signup',async (c) => {
//   const body = await c.req.json();

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   try {
//     const user = await prisma.user.create({
//       data: {
//         username: body.username,
//         password: body.password,
//         name : body.name
//       }
//     })

//     if (!c.env.JWT_SECRET) {
//   return c.text("JWT_SECRET not configured", 500);
// }
//     const jwt = await sign({
//       id: user.id
//     }, "heloo-world");
  
//   	return c.text(jwt)
//   } catch (error) {
//     console.log(error)
//     return c.text("Invalid");
//   }
// })


export default app;