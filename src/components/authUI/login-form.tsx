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
import { LoginSchema } from "@/schemas";
import {  useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getSession, signIn } from "next-auth/react";
import { motion } from 'framer-motion';
import Link from "next/link";
import { Logo } from "../header/logo";



export default function LoginForm() {

	const router = useRouter();
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
	
		setTransition(async () => {
				const result = await signIn("credentials", {
					email: values.email,
					password: values.password,
					redirect: false, // Disable automatic redirect for manual control
				});
	
				if (result?.error) {
					toast.error("Failed to log in!");
					form.reset();
				} else {
					toast.success("Logged in successfully!");
	
					// Now manually fetch the session and redirect
					const session = await getSession();
					if (session) {
						router.push("/"); // Redirect to main page after session is fetched
					}
				}
		});
	};
  return (
    <>
		  <motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, ease: "easeInOut" }}
        className="pb-12 text-2xl"
      >
        <Logo />
      </motion.div>

      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
					className="w-[20rem] md:w-[25rem] xl:w-[30rem]  flex justify-center flex-col gap-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full rounded-xl
											text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
											bg-white transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
                      disabled={isPending}
                      type="email"
                      placeholder="логин"
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
                      className="w-full rounded-xl
											text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
											bg-white transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
                      disabled={isPending}
                      type="password"
                      placeholder="пароль"
                      {...field}
                    />
                  </FormControl>
									{form.formState.errors.password && (
										<div className="flex flex-row items-end gap-x-2 mt-4">
											<ExclamationMark />
											<FormMessage className="text-xs  text-neutral-600" />
										</div>
									)}
                </FormItem>
              )}
            />

						{/* <FormError message={error || urlError} />
						<FormSuccess message={success} /> */}

            <Button
							disabled={isPending}
              className="w-[95%] mt-20 py-10 bg-[#297878]
							rounded-3xl h-12 text-3xl text-white
							hover:brightness-125 transition-all duration-300 shadow-xl"
              type="submit"
            >
              Войти
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
					className=" font-semibold text-base 
					text-neutral-600 font-libreFranklin
						hover:text-neutral-400 transition-colors duration-300" 
						href="/auth/register">
						создать аккаунт
						</Link>
			</motion.div>
    </>
  );
}
