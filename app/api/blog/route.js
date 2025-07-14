import { ConnectDB } from "@/lib/config/db";

import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";

const fs = require("fs");

const LoadDB = async () => {
	try {
		await ConnectDB();
		return NextResponse.json({ msg: "API working" });
	} catch (error) {
		console.error("DB connection failed:", error);
		return NextResponse.json(
			{ success: false, msg: "Failed to connect to DB" },
			{ status: 500 }
		);
	}
};

LoadDB();

// API endpoint to load data from DB
export async function GET(request) {
	const blogId = await request.nextUrl.searchParams.get("id");
	if (blogId) {
		const blogs = await BlogModel.findById(blogId);
		return NextResponse.json(blogs);
	} else {
		const blogs = await BlogModel.find({});
		return NextResponse.json({ blogs });
	}
}

// API Endpoint for Uploading blogs
export async function POST(request) {
	const formData = await request.formData();
	const timestamp = Date.now();

	const image = formData.get("image");
	const imageByteData = await image.arrayBuffer();
	const buffer = Buffer.from(imageByteData);
	const path = `./public/${timestamp}_${image.name}`;

	await writeFile(path, buffer);
	const imgUrl = `/${timestamp}_${image.name}`;

	const blogData = {
		title: `${formData.get("title")}`,
		description: `${formData.get("description")}`,
		category: `${formData.get("category")}`,
		author: `${formData.get("author")}`,
		image: `${imgUrl}`,
		authorImg: `${formData.get("authorImg")}`,
	};

	await BlogModel.create(blogData);

	console.log("Blog Saved");

	return NextResponse.json({ success: true, msg: "Blog Added" });
}

// Creating API Endpoint to delete Blog
export async function DELETE(request) {
	const id = await request.nextUrl.searchParams.get("id");

	const blog = await BlogModel.findById(id);
	fs.unlink(`./public${blog.image}`, () => {});
	await BlogModel.findByIdAndDelete(id);
	return NextResponse.json({ msg: "Blog Deleted" });
}
