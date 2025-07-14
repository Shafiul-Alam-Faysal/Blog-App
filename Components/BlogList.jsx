"use client";

import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
	const [menu, setMenu] = useState("All");
	const [blogs, setBlogs] = useState([]);

	const fetchBlogs = async () => {
		const response = await axios.get("/api/blog");
		if (response) {
			setBlogs(response.data.blogs);
			console.log(response.data.blogs);
		} else {
			console.log("Error fetching blogs");
		}
	};

	useEffect(() => {
		console.log(blogs);
	}, [blogs]);

	useEffect(() => {
		fetchBlogs();
	}, []);

	const menuClass = "bg-black text-white py-1 px-4 rounded-sm  cursor-pointer";

	return (
		<>
			<div className="flex justify-center gap-6 my-10">
				<button
					onClick={() => setMenu("All")}
					className={menu === "All" ? menuClass : "cursor-pointer"}
				>
					All
				</button>
				<button
					onClick={() => setMenu("Technology")}
					className={menu === "Technology" ? menuClass : "cursor-pointer"}
				>
					Technology
				</button>
				<button
					onClick={() => setMenu("Startup")}
					className={menu === "Startup" ? menuClass : "cursor-pointer"}
				>
					Startup
				</button>
				<button
					onClick={() => setMenu("Lifestyle")}
					className={menu === "Lifestyle" ? menuClass : "cursor-pointer"}
				>
					Lifstyle
				</button>
			</div>
			<div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
				{blogs
					.filter((item) => (menu === "All" ? true : item.category === menu))
					.map((item, index) => {
						return (
							<BlogItem
								key={index}
								id={item._id}
								image={item.image}
								title={item.title}
								description={item.description}
								category={item.category}
							/>
						);
					})}
			</div>
		</>
	);
};

export default BlogList;
