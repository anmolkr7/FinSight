"use server";
import { auth } from "@clerk/nextjs/server";
import {db} from "@/lib/prisma"
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

export async function createAccount(data){
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
        //converting balance into float before saving
        const balanceFloat=parseFloat(data.balance);
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance value");
        }

        //checking if this is the user's first account
        const existingAccounts=await db.account.findMany({
            where:{
                userId:user.id
            }
        });
        const shouldBeDefault=existingAccounts.length===0?true:data.isDefault;
        //If this account should be default, we need to set all other accounts to not default
        if(shouldBeDefault)
        {
            await db.account.updateMany({
                where:{
                    userId:user.id,
                    isDefault:true
                },
                data:{
                    isDefault:false
                }
            });
        }
        const account=await db.account.create({
            data:{
                ...data,
                balance:balanceFloat,
                userId:user.id,
                isDefault:shouldBeDefault
            }
        });
        //nextjs doesnt support decimal values,so we need to serialize the balance i.e back to number
        const serializedAccount=serializeTransaction(account);
        revalidatePath("/dashboard");
        return {success:true,data:serializedAccount};
    }
    catch(error){
        throw new Error(`Failed to create account: ${error.message}`);
    }
}


export async function getUserAccounts(){
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
        const accounts=await db.account.findMany({
            where:{
                userId:user.id
            },
            orderBy:{
                createdAt:"desc"
            },
            include:{
               _count:{
                select:{
                    transactions:true
                }
               }
            }
        });
        const serializedAccount=accounts.map(serializeTransaction)
        return serializedAccount;
}

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}
