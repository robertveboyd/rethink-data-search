import faker from "faker";
import fs from "fs";

const generateData = (n) =>
  [...Array(n).keys()]
    .map((_) => ({
      name: faker.name.firstName() + " " + faker.name.lastName(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
    }))
    .sort((a, b) => {
      const [aFirst, aLast] = a.name.split(" ");
      const [bFirst, bLast] = b.name.split(" ");
      return (
        aLast.localeCompare(bLast) || aFirst.localeCompare(bFirst)
      );
    });

fs.writeFileSync(
  "./users.json",
  JSON.stringify(generateData(2000000), null, 2)
);
