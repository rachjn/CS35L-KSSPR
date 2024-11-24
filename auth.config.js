// import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials"; 
import {LoginSchema} from "@/schemas";
import bcrypt from "bcrypt.js"; 


export default {
    // providers: [GitHub],

    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success){
                    const {email, password} = validatedFields.data; 

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null; 

                    const passwordsMatch = await bcyrypt.compare(
                        password,
                        user.password, 

                    );
                    if (passwordsMatch) return user; 

                }
                return null;
            }
        })
    ]
};
