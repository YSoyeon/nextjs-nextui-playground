"use client";

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SignController from "./SignController";

const Navigation = ({ lng }: { lng: any }) => {
	const path = usePathname();

	const [pathName, setPathName] = useState("");

	useEffect(() => {
		const pathArr = path.split("/");

		if (pathArr.length === 2) {
			setPathName("");
		} else {
			setPathName(pathArr[2]);
		}
	}, [path]);

	return (
		<Navbar className="bg-gray-800">
			<NavbarBrand>
				<Link color="foreground" href="/">
					<p className="font-bold text-inherit">TEST</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem isActive={pathName === ""}>
					<Link color={pathName === "" ? "primary" : "foreground"} href="/">
						Dashboard
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === "posts"}>
					<Link color={pathName === "posts" ? "primary" : "foreground"} href="/posts">
						Posts
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === "calendar"}>
					<Link color={pathName === "calendar" ? "primary" : "foreground"} href="/calendar">
						Calendar
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<ThemeSwitcher />
					<LanguageSwitcher lng={lng} />
					<SignController />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default Navigation;
