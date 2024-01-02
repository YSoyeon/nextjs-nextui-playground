import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from "@nextui-org/react";

import LanguageSwitcher from "./languageSwitcher";
import ThemeSwitcher from "./themeSwitcher";

const Navigation = ({ lng }: { lng: any }) => {
	return (
		<Navbar className="bg-gray-800">
			<NavbarBrand>
				<Link color="foreground" href="/">
					<p className="font-bold text-inherit">TEST</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="/">
						Dashboard
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="#" aria-current="page">
						Posts
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Calendar
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<ThemeSwitcher />
					<LanguageSwitcher lng={lng} />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default Navigation;
