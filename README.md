This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Tech stack

Front-End
+ [Next.js](https://nextjs.org/docs) (App route)
  + [server action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) 
+ [Tailwind CSS](https://tailwindcss.com/docs/installation)
+ Network: [tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/quick-start)
+ UI lib: [shadcn](https://ui.shadcn.com) 
+ Animation lib: [framer-motion](https://www.framer.com/motion/introduction/) 


Database:
+ [Prisma](https://www.prisma.io) as ORM
+ [Neon PostgreSQL](https://neon.tech/?gad_source=1&gclid=CjwKCAjw74e1BhBnEiwAbqOAjDAIhesSJ2hrVZbfArbWpZEQJYBlQHw5378X961Sy71MU6dSklDBExoC7JEQAvD_BwE) -> providing out of box database deployment on top of AWS


3rd party service integrations: 
+ [uploadthing](https://docs.uploadthing.com): File uploading service
+ [stripe](https://docs.stripe.com/payments/checkout): Payment service
+ [kinde](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/): Auth service
+ [resend](https://www.resend.com/docs/introduction): Email service
  + integrated with [react-email](https://react.email/docs/introduction) for build email page
  

Deployed on vercel