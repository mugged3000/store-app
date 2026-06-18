import { NextResponse } from "next/server";
import prisma from "../../../../db/store";
import cloudinary from "@/app/cloud/cloudinary";
import { Readable } from "stream";

// GET ALL PRODUCTS
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const gender = searchParams.get("gender");

  const products = await prisma.product.findMany({
    where: {
      ...(type === "new-arrivals" && { isNewArrival: true }),
      ...(gender && { gender }),
      
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ products });
}

// CLOUDINARY UPLOAD HELPER
const uploadImage = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

// CREATE PRODUCT
export async function POST(req) {
  console.log("POST HIT");

  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const price = Number(formData.get("price"));
    const description = formData.get("description");

    const mainFile = formData.get("image");

    // 🔥 FIX: gender safe handling
    const genderRaw = formData.get("gender");
    const gender =
      genderRaw && genderRaw !== "" ? genderRaw : null;

    const isNewArrival =
      formData.get("isNewArrival") === "true" ||
      formData.get("isNewArrival") === "on";

    const files = formData.getAll("images");

    // VALIDATION
    if (!mainFile) {
      return NextResponse.json(
        { message: "Main image is required" },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "At least one thumbnail is required" },
        { status: 400 }
      );
    }

    // UPLOAD MAIN IMAGE
    const imageUrl = await uploadImage(mainFile);

    // UPLOAD THUMBNAILS
    const imageUrls = await Promise.all(
      files.map(uploadImage)
    );

    // CREATE PRODUCT
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image: imageUrl,
        images: imageUrls,
        gender, // now safe
        isNewArrival,
      },
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}