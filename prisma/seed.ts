import { PrismaClient } from "@prisma/client";
import { cloneMetadata } from "../db_assets/nfts";

const prisma = new PrismaClient();

async function main() {
  const cloneData = cloneMetadata.map((clone) => ({
    token: clone.tokenId,
    name: clone.name,
    attributes: JSON.stringify(clone.attributes),
  }));

  for (const clone of cloneData) {
    const existingClone = await prisma.clone.findUnique({
      where: { token: clone.token },
    });

    if (!existingClone) {
      await prisma.clone.create({ data: clone });
    } else if (typeof existingClone.attributes !== "string") {
      await prisma.clone.update({
        where: { token: clone.token },
        data: { attributes: JSON.stringify(clone.attributes) },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
