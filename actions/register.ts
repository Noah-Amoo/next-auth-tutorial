"use server";

import * as z from 'zod'    //Zod helps with both server and client side validations
import bcrypt from 'bcryptjs' //Bcrypt for hashing/encrypting passwords
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data; //Data extrated from validated fields
    const hashedPassword = await bcrypt.hash(password, 10)

    //Check to see email is not taken
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!"}
    }

    //If email has not been taken, create/register new user
    await db.user.create({
        data: {
            name, 
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    //Send verification token email
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return { success: "Confirmation email sent" };
}
