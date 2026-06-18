import { NextResponse } from "next/server";
import prisma from "../../../../db/store";
import cloudinary from "@/app/cloud/cloudinary";
import { Readable } from "stream";

// CLOUDINARY UPLOAD HELPER
const uploadImage = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "hero" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

// GET ALL HERO SLIDES (with their images, ordered)
// Pass ?active=true to only return slides marked isActive (used by the storefront)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";

    const slides = await prisma.heroSlide.findMany({
      where: {
        ...(activeOnly && { isActive: true }),
      },
      orderBy: { createdAt: "desc" },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({ slides });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch hero slides" },
      { status: 500 }
    );
  }
}

// CREATE HERO SLIDE
// Expects formData: title, subTitle, description, isActive, images (multiple files, up to 6)
// The first uploaded image is marked as isMain
export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const subTitle = formData.get("subTitle");
    const description = formData.get("description") || null;
    const isActive =
      formData.get("isActive") === "true" || formData.get("isActive") === "on";

    const files = formData.getAll("images").filter((f) => f && f.size > 0);

    if (!title || !subTitle) {
      return NextResponse.json(
        { message: "Title and subtitle are required" },
        { status: 400 }
      );
    }

    if (!files.length) {
      return NextResponse.json(
        { message: "At least one image is required" },
        { status: 400 }
      );
    }

    if (files.length > 6) {
      return NextResponse.json(
        { message: "Maximum of 6 images allowed per slide" },
        { status: 400 }
      );
    }

    const urls = await Promise.all(files.map(uploadImage));

    const slide = await prisma.heroSlide.create({
      data: {
        title,
        subTitle,
        description,
        isActive,
        images: {
          create: urls.map((url, i) => ({
            url,
            order: i,
            isMain: i === 0,
          })),
        },
      },
      include: { images: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create hero slide" },
      { status: 500 }
    );
  }
}