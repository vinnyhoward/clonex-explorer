import { PrismaClient } from '@prisma/client';
import { cloneMetadata } from "../db_assets/nfts";

const prisma = new PrismaClient();

async function main() {
  const cloneData = cloneMetadata.map(clone => ({
    token: clone.tokenId,
    name: clone.name,
    attributes: JSON.stringify(clone.attributes),
  }));

  for (const clone of cloneData) {
    const exists = await prisma.clone.findUnique({
      where: { token: clone.token },
    });

    if (!exists) {
      await prisma.clone.create({ data: clone });
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
