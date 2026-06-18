import { NextResponse } from "next/server";
import prisma from "../../../../../db/store";
import cloudinary from "@/app/cloud/cloudinary";

// helper function
const uploadToCloudinary = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

// GET SINGLE PRODUCT
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}

// UPDATE PRODUCT
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const formData = await req.formData();

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    const name = formData.get("name");
    const price = Number(formData.get("price"));
    const description = formData.get("description");
    const gender = formData.get("gender");
    const isNewArrival = formData.get("isNewArrival") === "true";

    const imageFile = formData.get("image");
    const imageFiles = formData.getAll("images");

    // ✅ MAIN IMAGE
    let image = existingProduct.image;

    if (imageFile && typeof imageFile !== "string") {
      image = await uploadToCloudinary(imageFile);
    }

    // ✅ THUMBNAILS
    let images = existingProduct.images;

    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size) {
      images = await Promise.all(
        imageFiles.map((file) => uploadToCloudinary(file))
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        gender,
        isNewArrival,
        image,
        images,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE PRODUCT
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}