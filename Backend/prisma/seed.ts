import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.activeSubscription.deleteMany();
await prisma.userInfo.deleteMany();
await prisma.promotion.deleteMany();
await prisma.product.deleteMany();
await prisma.productCategory.deleteMany();
await prisma.user.deleteMany();

async function main() {
    // <-----  Catégories de produits  ----->
    const soc = await prisma.productCategory.create({
        data: {
            name: "SOC (Security Operations Center)",
            description: "Supervision centralisée des événements de sécurité. Surveillance 24/7, analyse de logs, détection d'incidents.",
            image: "",
        },
    });

    const edr = await prisma.productCategory.create({
        data: {
            name: "EDR (Endpoint Detection & Response)",
            description: "Protection avancée des terminaux contre les menaces. Analyse comportementale, remédiation automatique.",
            image: "",
        },
    });

    const xdr = await prisma.productCategory.create({
        data: {
            name: "XDR (Extended Detection & Response)",
            description: "Sécurité intégrée multi-canal (endpoint, réseau, cloud). Détection intelligente, réponse automatisée.",
            image: "",
        },
    });

  // <-----  Produits  ----->
  const cynaSoc = await prisma.product.create({
    data: {
      name: "Cyna SOC",
      image: "cynaSOC.png",
      description : "Service de supervision continue des événements de sécurité. Centralise les logs et détecte les anomalies en temps réel.",
      // features : ["Surveillance 24/7", "Corrélation d'événements", "Tableaux de bord personnalisés", "Intégration avec SIEM"],
      // annualyPrice : 3200,
      price: 299,
      fournisseur: "Cyna",
      categoryId: soc.id,
    },
  });

  const cynaEdr = await prisma.product.create({
    data: {
      name: "Cyna EDR",
      image: "cynaEDR.png",
      description : "Endpoint Detection & Response. Protège les postes de travail contre les menaces avancées avec des réponses automatisées.",
      // features : ["Analyse comportementale", "Remédiation automatique", "Journalisation détaillée", "Compatible Windows, macOS, Linux"],
      // annualyPrice : 2100,
      price: 199,
      fournisseur: "Cyna",
      categoryId: edr.id,
    },
  });

  const cynaXdr = await prisma.product.create({
    data: {
      name: "Cyna XDR",
      // image,
      description : "Extended Detection & Response. Fusionne données réseau, endpoint et cloud pour une détection globale des menaces.",
      // features : ["Corrélation multi-sources (EDR, réseau, cloud)", "Réponse coordonnée", "API d'intégration", "Support 24/7 avec SLA"],
      // annualyPrice : 4200,
      price: 399,
      fournisseur: "Cyna",
      categoryId: xdr.id,
    },
  });

  const cynaCloudProtect = await prisma.product.create({
    data: {
      name: "Cyna Cloud Protect",
      // image,
      description : "Sécurisation des environnements cloud AWS, Azure, GCP. Détection d'anomalies, configuration sécurisée, conformité.",
      // features : ["Sécurisation de configuration en continu", "Détection d'accès non autorisés", "Rapports de conformité (ISO, SOC 2, etc.)"],
      // annualyPrice : 2600,
      price: 249,
      fournisseur: "Cyna",
      categoryId: xdr.id,
    },
  });

  const cynaVulnerabilityManager = await prisma.product.create({
    data: {
      name: "Cyna Vulnerability Manager",
      // image,
      description : "Analyse continue des vulnérabilités sur l’ensemble des terminaux et serveurs avec priorisation des menaces.",
      // features : ["Scans automatiques programmés", "Base de vulnérabilités CVE à jour", "Dashboard de criticité"],
      // monthlyPrice : 1900,
      price: 179,
      fournisseur: "Cyna",
      categoryId: xdr.id,
    },
  });

  // <-----  Promotions  ----->
  const promo = await prisma.promotion.create({
    data: {
      name: 'Summer Sale',
      priceReduction: 15,
    },
  });

    // Assign promotion to a product
    await prisma.product.update({
        where: { id: cynaSoc.id },
        data: { activePromoId: promo.id },
    });





  // Create User Info
  await prisma.userInfo.create({
    data: {
      userId: user1.id,
      paymentMean: 'Credit Card',
      paymentNum: '1234-5678-9012-3456',
    },
  });

  await prisma.userInfo.create({
    data: {
      userId: user2.id,
      paymentMean: 'PayPal',
      paymentNum: 'jane.smith@paypal.com',
    },
  });

  // Create Active Subscriptions
  await prisma.activeSubscription.create({
    data: {
      userId: user1.id,
      productId: cynaSoc.id,
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    },
  });

  await prisma.activeSubscription.create({
    data: {
      userId: user2.id,
      productId: cynaXdr.id,
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
