"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { ExclamationMark } from "../ui/exclamation-mark";
import { RegisterSchema } from "@/schemas";
import { register } from "@/action/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import Link from "next/link";

type RegisterData = {
  success: boolean;
  response: string;
};

export default function RegisterForm() {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

    setTransition(() => {
      //data send to server
      register(values)
        //data received from server
				
        .then((data: RegisterData ) => {
					if(data.success) {
						console.log(data.success)
						toast.success("Account created successfully!");
						router.push("/auth/login");
					} else if (data.response && data.response.includes("already exists")) {
						toast.error("User with this username already exists.");
					}
        })

    });
  };
  return (
    <>
				<motion.div
		 className=""
		 >
			<h1 className="font-poppins text-7xl xl:text-8xl text-white">Sign up</h1>
		</motion.div>


      <Form {...form}>
        <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div 
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
					className="w-[20rem] bg-transparent md:w-[25rem] xl:w-[30rem] flex justify-center flex-col gap-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full rounded-2xl font-poppins 
											text-white text-lg pl-4 py-6 border-none
											bg-black transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-600 focus:bg-black focus:border-neutral-600"
                      disabled={isPending}
                      placeholder="name"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-base font-libreFranklin text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full rounded-2xl font-poppins
											text-white text-lg pl-4 py-6 border-none
											bg-black transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-600 focus:bg-black focus:border-neutral-600"
                      disabled={isPending}
                      type="email"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-xs text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full rounded-2xl font-poppins
											text-white text-lg pl-4 py-6 border-none
											bg-black transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-600 focus:bg-black focus:border-neutral-600"
                      disabled={isPending}
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-xs text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />
{/* 
            <FormError message={error} />
            <FormSuccess message={success} /> */}

            <Button
              disabled={isPending}
              className="w-full py-4 bg-white border-none
							rounded-2xl h-12 text-xl text-black font-poppins
							hover:brightness-125 transition-all duration-300 shadow-xl"
              type="submit"
            >
              Create an account
            </Button>
          </motion.div>
        </form>
      </Form>

			<motion.div
			className="fixed bottom-12 flex justify-center font-semibold text-base"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.8, ease: "easeInOut" }}
			>
			<Link
        className="text-base text-neutral-200
		hover:text-neutral-50 transition-colors duration-300 "
        href="/auth/login"
      >
        already have one?
      </Link>
			</motion.div>
    </>
  );
}
