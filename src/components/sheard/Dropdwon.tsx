import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { CircleUserRound, LogOut, Mail } from "lucide-react";
import { toast } from "../ui/toast";
import { GrUserAdmin } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import Link from "next/link";

const ProverDropdwon = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  const handleSignout = async () => {
    await authClient.signOut();
    toast.add({
      description: "SignOut seccessfully..!!",
      type: "success",
    });
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <button className="rounded-full outline-none ring-offset-background transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Avatar className="h-10 w-10 border border-red-700/50 shadow-sm">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user?.image || undefined}
                alt={user?.name || "User Avatar"}
              />
              <AvatarFallback className="bg-teal-600 font-bold text-white uppercase">
                {user?.name ? user.name.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>
        {/* Popover Content */}
        <PopoverContent
          align="end"
          className="w-64 rounded-2xl border border-slate-800  p-4 text-slate-100 shadow-2xl backdrop-blur-md"
        >
          {/* User Info Header Section */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-900/80 p-3 border border-slate-800/80">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
              <CircleUserRound className="h-6 w-6" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="truncate text-sm font-bold text-slate-100">
                {user?.name || "Anonymous User"}
              </p>
              <p className="flex items-center gap-1 text-xs text-slate-400 truncate mt-0.5">
                <Mail className="h-3 w-3 text-red-400 shrink-0" />
                <span className="truncate">
                  {user?.email || "user@example.com"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Link href={"/dashboard/admin"}>
              <p className="text-black font-bold text-xl flex gap-1 items-center border rounded-2xl p-2">
                <GrUserAdmin /> Admin
              </p>
            </Link>
            <Link href={"/dashboard/student"}>
              <p className="text-black font-bold text-xl flex gap-1 items-center border rounded-2xl p-2">
                <GrUserAdmin /> Add student
              </p>
            </Link>
            {/* <Link href={"/dashboard/teacher"}>
              <p className="text-black font-bold text-xl flex gap-1 items-center border rounded-2xl p-2">
                <GrUserAdmin /> Add teacher
              </p>
            </Link> */}
            {/* <Link href={"/dashboard/memories"}>
              <p className="text-black font-bold text-xl flex gap-1 items-center border rounded-2xl p-2">
                <ImProfile /> Add Memories
              </p>
            </Link> */}
            <Link href={"/profile"}>
              <p className="text-black font-bold text-xl flex gap-1 items-center border rounded-2xl p-2">
                <ImProfile /> My Profile
              </p>
            </Link>
          </div>
          <Button
            onClick={handleSignout}
            variant="destructive"
            className="w-full justify-center gap-2 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 text-xs font-bold h-9 transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </Button>
        </PopoverContent>
        /
      </Popover>
    </div>
  );
};

export default ProverDropdwon;
