"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (transaction) => {
    const serialized={...transaction};
    if(transaction.balance){
        serialized.balance=transaction.balance.toNumber(); // Convert Decimal to number
    }
    if(transaction.amount){
        serialized.amount=transaction.amount.toNumber(); // Convert Decimal to number
    }
    return serialized;
}

export async function updateDefaultAccount(accountId){
    try{
        const {userId}=await auth();
        if(!userId){
            throw new Error("User not authenticated");
        }
        const user=await db.user.findUnique({
            where:{
                    clerkUserId:userId
                }
        });
        if(!user){
            throw new Error("User not found");
        }
        await db.account.updateMany({
            where:{userId:user.id,isDefault:true},
            data:{isDefault:false}
        }); 
        
        const account=await db.account.update({
            where:{
                id:accountId,
                userId:user.id
            },
            data:{
                isDefault:true
            }
        });
        revalidatePath('/dashboard');
        return {success:true,data:serializeTransaction(account)};
    }
    catch(error){
        return {success:false,error:error.message};
    }
}