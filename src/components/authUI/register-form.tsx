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
        .then(() => {
          toast.success("Account created successfully!");
          router.push("/auth/login");
        })
    });
  };
  return (
    <>
			<motion.h1
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
        className="font-lancelot  text-8xl md:text-8xl lg:text-8xl xl:text-8xl
				text-radial-gradient-middle pb-6"
      >
        Complexity
      </motion.h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      className="bg-[#0a0a0a] border-none 
																						transition-colors font-libreFranklin
																						rounded-2xl pl-6 h-12 text-neutral-400
																						placeholder:text-neutral-600 text-lg"
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
                      className="bg-[#0a0a0a] border-none 
																						transition-colors font-libreFranklin
																						rounded-2xl pl-6 h-12 text-neutral-400
																						placeholder:text-neutral-600 text-lg"
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
                      className="bg-[#0a0a0a] border-none 
																						transition-colors font-libreFranklin
																						rounded-2xl pl-6 h-12 text-neutral-400
																						placeholder:text-neutral-600 text-lg"
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
              className="w-full  card-background-diff-direction 
							rounded-2xl h-12 text-3xl font-lancelot text-white
							hover:brightness-125 transition-all duration-300"
              type="submit"
            >
              <p className="text-radial-gradient-middle">Sign up</p>
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
        className="font-semibold text-base text-neutral-600
		hover:text-neutral-400 transition-colors duration-300 "
        href="/auth/login"
      >
        sign in
      </Link>
			</motion.div>
    </>
  );
}
