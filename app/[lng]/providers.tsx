"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

const Providers = ({ children }: any) => {
	const router = useRouter();
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>
			<SessionProvider>
				<NextUIProvider navigate={router.push}>
					<NextThemesProvider attribute="class" defaultTheme="dark">
						{children}
					</NextThemesProvider>
				</NextUIProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default Providers;
