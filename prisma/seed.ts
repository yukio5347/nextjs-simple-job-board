import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 50; i++) {
    const salaryMin = faker.datatype.number({ min: 3000, max: 10000 });
    const salaryMax = faker.datatype.number({ min: salaryMin + 1000, max: 12000 });

    await prisma.jobPosting.create({
      data: {
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraphs() + "\n\n" + faker.lorem.paragraphs(),
        closedAt: faker.date.future(),
        employmentType: faker.helpers.arrayElement(['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'INTERN']),
        address: faker.address.streetAddress(),
        locality: faker.address.city(),
        region: faker.address.state(),
        postalCode: faker.address.zipCode(),
        isRemote: faker.helpers.arrayElement([true, false]),
        salaryMin: String(salaryMin),
        salaryMax: String(salaryMax),
        salaryUnit: faker.helpers.arrayElement(['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR']),
        companyName: faker.company.name(),
        companyDescription: faker.lorem.paragraphs() + "\n\n" + faker.lorem.paragraphs(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: '$2b$10$3KAjHfOm/Q1G6vcjunDfSOF6XerN3Grq8Es3L3VtCKwZ4X4wmNy1e', // password
        ipAddress: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })