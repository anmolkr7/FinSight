"use client";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
const CreateAccountDrawer = ({children}) => {
    const [open,setOpen]=useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Create New Account</DrawerTitle>
            </DrawerHeader>
            <div>
                <form action="">
                    
                </form>
            </div>
        </DrawerContent>
    </Drawer>

  )
}

export default CreateAccountDrawer