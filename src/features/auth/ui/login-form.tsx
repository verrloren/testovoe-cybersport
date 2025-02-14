"use client";

import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
	Input,
	Button, 
	LoginSchema
} from "@/shared";
import { login, ExclamationMark } from "@/features/auth";


export function LoginForm() {

  const router = useRouter();
  const [isPending, setTransition] = useTransition();
	// const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setTransition(async () => {
      try {
        const { success } = await login(values);
				if (!success) {
          toast.error(`${success}`);
          return;
        }
					// await queryClient.prefetchQuery({
					// 	queryKey: [projectsApi.baseKey],
					// 	queryFn: getProjectsAction,
					// });
					// await queryClient.prefetchQuery({
					// 	queryKey: [styleGuidesApi.baseKey],
					// 	queryFn: getStyleGuidesAction,
					// });
					toast.success("Login successful!");
          router.push("/");
        
      } catch (error) {
        console.error('Login error:', error);
        toast.error("Login failed!");
      }
    });
  };

  return (
    <>
		
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="z-20 "
      >
				<h1 className="text-white font-poppins text-7xl xl:text-8xl">
          Welcome
        </h1>

      </motion.div>

      <Form {...form}>
        <form className="z-20 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
            className="w-[20rem] md:w-[25rem] z-20 xl:w-[30rem]  flex justify-center flex-col gap-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full py-6 pl-4 text-lg text-white transition-colors duration-200 bg-black border border-none rounded-2xl placeholder:text-lg border-neutral-800 focus:outline-none placeholder:text-neutral-600 focus:bg-black focus:border-neutral-600"
                      disabled={isPending}
                      type="email"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <div className="flex flex-row items-end mt-4 gap-x-2">
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
                      className="w-full py-6 pl-4 text-lg text-white transition-colors duration-200 bg-black border border-none rounded-2xl font-poppins placeholder:text-lg border-neutral-800 focus:outline-none placeholder:text-neutral-600 focus:bg-black focus:border-neutral-600"
                      disabled={isPending}
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <div className="flex flex-row items-end mt-4 gap-x-2">
                      <ExclamationMark />
                      <FormMessage className="text-xs text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* <FormError message={error || urlError} />
						<FormSuccess message={success} /> */}

            <Button
              disabled={isPending}
              className="w-full h-12 py-4 text-xl text-black transition-all duration-300 border-none shadow-xl bg-neutral-100 hover:bg-white rounded-2xl font-poppins hover:brightness-125"
              type="submit"
            >
              Submit
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.div
        className="fixed flex items-center justify-center  bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1, ease: "easeInOut" }}
      >
        <Link
          className="text-base font-semibold transition-colors duration-300 text-neutral-200 font-poppins hover:text-neutral-50"
          href="/auth/register"
        >
          create account
        </Link>
      </motion.div>
    </>
  );
}
