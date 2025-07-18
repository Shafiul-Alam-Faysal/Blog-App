import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-outfit", // Add this
});

export const metadata = {
	title: "Blog App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${outfit.variable} antialiased`}>{children}</body>
		</html>
	);
}
