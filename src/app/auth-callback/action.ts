"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

/**
 *
 * @returns { success: true } if user is authenticated and exists in database
 */
export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser(); // check if user is logged in curently

  if (!user?.id || !user?.email) {
    throw new Error("Invalid user data!");
  }

  // check user in database (because we use kinde as auth provider)
  const existingUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  //  sync user data
  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }

  return { success: true };
};
