
import { NextResponse } from "next/server";
import prisma from "../../../../../db/store";
import cloudinary from "@/app/cloud/cloudinary";
import { Readable } from "stream";

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

// GET SINGLE SLIDE
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const slide = await prisma.heroSlide.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    });

    if (!slide) {
      return NextResponse.json({ message: "Slide not found" }, { status: 404 });
    }

    return NextResponse.json(slide);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching slide" },
      { status: 500 }
    );
  }
}

// UPDATE SLIDE
// Text fields update normally. If new image files are sent under "images",
// the old HeroImage rows are replaced with the new set (simplest, predictable behavior).
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const existing = await prisma.heroSlide.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existing) {
      return NextResponse.json({ message: "Slide not found" }, { status: 404 });
    }

    const title = formData.get("title") ?? existing.title;
    const subTitle = formData.get("subTitle") ?? existing.subTitle;
    const description = formData.get("description") ?? existing.description;
    const isActiveRaw = formData.get("isActive");
    const isActive =
      isActiveRaw === null ? existing.isActive : isActiveRaw === "true" || isActiveRaw === "on";

    const newFiles = formData.getAll("images").filter((f) => f && f.size > 0);

    if (newFiles.length > 6) {
      return NextResponse.json(
        { message: "Maximum of 6 images allowed per slide" },
        { status: 400 }
      );
    }

    let imagesData;
    if (newFiles.length > 0) {
      const urls = await Promise.all(newFiles.map(uploadImage));
      // Replace old images entirely
      await prisma.heroImage.deleteMany({ where: { heroSlideId: id } });
      imagesData = {
        create: urls.map((url, i) => ({
          url,
          order: i,
          isMain: i === 0,
        })),
      };
    }

    const updated = await prisma.heroSlide.update({
      where: { id },
      data: {
        title,
        subTitle,
        description,
        isActive,
        ...(imagesData && { images: imagesData }),
      },
      include: { images: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update slide" },
      { status: 500 }
    );
  }
}

// DELETE SLIDE (HeroImage rows cascade-delete via schema relation)
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.heroSlide.delete({ where: { id } });

    return NextResponse.json({ message: "Slide deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete slide" },
      { status: 500 }
    );
  }
}