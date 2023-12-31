import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserTypeEnum } from '../src/enums/enums';

const prisma = new PrismaClient();

async function main() {
  const companies = await prisma.company.createMany({
    data: [
      {
        id: 1,
        name: 'maghraby company',
      },
    ],
  });

  const userTypes = await prisma.userType.createMany({
    data: [
      {
        id: 1,
        name: 'super',
      },
      {
        id: 2,
        name: 'owner',
      },
      {
        id: 3,
        name: 'employee',
      },
    ],
  });

  const currencies = await prisma.currency.createMany({
    data: [
      {
        id: 1,
        name: 'EGP',
        symbol: '£',
      },
      {
        id: 2,
        name: 'USD',
        symbol: '$',
      },
      {
        id: 3,
        name: 'EUR',
        symbol: '€',
      },
    ],
  });

  const offices = await prisma.office.createMany({
    data: [
      {
        id: 1,
        name: 'office 1',
        companyId: 1,
        currencyId: 1,
        address: 'random address',
      },
      {
        id: 2,
        name: 'office 2',
        companyId: 1,
        currencyId: 2,
        address: 'random address',
      },
      {
        id: 3,
        name: 'office 3',
        companyId: 1,
        currencyId: 3,
        address: 'random address text',
      },
    ],
  });

  const departments = await prisma.department.createMany({
    data: [
      {
        id: 1,
        name: 'business',
        companyId: 1,
      },
      {
        id: 2,
        name: 'web development',
        companyId: 1,
      },
      {
        id: 3,
        name: 'accountants',
        companyId: 1,
      },
    ],
  });

  const positions = await prisma.position.createMany({
    data: [
      {
        id: 1,
        name: 'hr',
        companyId: 1,
      },
      {
        id: 2,
        name: 'web developer',
        companyId: 1,
      },
      {
        id: 3,
        name: 'business analyst',
        companyId: 1,
      },
    ],
  });

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'super',
        email: 'super@super.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.SUPER,
      },
      {
        name: 'maghraby',
        email: 'maghraby@gmail.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.OWNER,
        companyId: 1,
        isBusinessPartner: true,
      },
      {
        name: 'random name',
        email: 'rname@employee.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.EMPLOYEE,
        companyId: 1,
        departmentId: 2,
        image_path:
          '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',
        officeId: 2,
        positionId: 2,
      },
      {
        name: 'micheal',
        email: 'micheal@employee.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.EMPLOYEE,
        companyId: 1,
        departmentId: 3,
        image_path:
          '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',
        officeId: 3,
        positionId: 3,
      },
      {
        name: 'john snow',
        email: 'johnsnow@employee.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.EMPLOYEE,
        companyId: 1,
        departmentId: 1,
        image_path:
          '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',
        officeId: 3,
        positionId: 2,
      },
      {
        name: 'sdfsdfsdfffds',
        email: 'empsfdsfsloyee@employee.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.EMPLOYEE,
        companyId: 1,
        departmentId: 1,
        image_path:
          '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',
        officeId: 1,
        positionId: 1,
      },
      {
        name: 'jjjjjjjjjjjjjjjjjjjjjjjj',
        email: 'employee@employee.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.EMPLOYEE,
        companyId: 1,
        departmentId: 1,
        image_path:
          '/9j/4AAQSkZJRgABAQACWAJYAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIAMgAyAMBIgACEQEDEQH/xAA0AAEAAgMBAQEAAAAAAAAAAAAAAwYCBAUHAQgBAQADAQEBAAAAAAAAAAAAAAABAwQCBQb/2gAMAwEAAhADEAAAAO0PpswAAAAAAAAAAAAAAAyMWznzOm3IzXZY9QAAAAAAAABns45VyESB81svlejAacoAAAAAADLHZic3R1KbIc5coj7l2eXzt876/U5fnel3Iezu+l5VT+S5X4oGzBLETAAAAkT097eq3mexZ61ZeFdi+ZfObZRJ5fDJp1/oPwv2nxfzos3p/wCc/XrbIcs/t/mw2eu2unZVdS4Va2iAXUgANrV2+Zt9P9BrHmenLx9Ll38alcve/ryV2iek+Ydd+4eSekeY+fquFVufb3YqB1bURpXXiWnBs16jcad1n1sJod+cJgB0ufvV9X6m2+neXqiz1cfQzS9jk3XLdTKR7cou53lvrNfrt50V4pu7JDllPoo7td79f8b1+5XrLV9+GHA9HIABLPBPXPTx5ynuWL7P3zr32j3jFomfMcF9apHrmm0qfdaPvwbDX+bM9n2atBnu2Ofsa+yiMWcgAZbWnPzMo4kB9+Dh1focnq+/0O/+SQ9cn53RikEAI5Bpi3kAACaXUczuNT4bf3TyKT1ODe5u3/J/WPO4i49PldXjgEACGUIs5AAAAAA53d05eep6dcOJz1L1eRvdRn8wTzP910JIzqAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/xABJEAACAQIDBAUIBQcKBwAAAAABAgMEEQAFIQYSMVETQWFxsRAUICIygZGhFSMwQsEHMzVAUnOiFiVDYGJjcpLR4Sc0RWSCssL/2gAIAQEAAT8A/qkkZfu54WJR1XPbiw5YIB4jDQqeGndh0KHUe/8AU403zrwHHA0Fh6JAYWIw6lGsfd+pIu6oHpT1kVObMRftIGBMlRHdbgrrY8v1FBd1Hb6AhkLom4QzgFQdLg8DgZbUn7qjvbH0XUW4p/mxmuSSSbTZiKlXMKDeDg2FyoIAvxxsp0NXDHS0kgkdId5wTbdvz5a4bKa1f6IHuYYko6mIEvBIAOJtpgqwUMVIU8GI0Pv+2pKSeocGOMlQdWOgwcrEcLvJISyqTZeGI4oSgeSpVb/dVSzfgPngtRrwjnkP9pwg+QOIJFevhKpuAEADeLePkzXaHLMmstXUjpT7MMY3pG/8Rw99sZhllfXZiafoWEtYu9FbUbrDQ35Ace7Gys2z+z9bXiozWWOpRDG8U0e6DuEk7hGjEkacO7GS7Q5TtFUS0+WTTtLHH0jCWEoN29uPvxVgilnB0IRvDEVVUQLaKeRF5BtPhwxJVNKhEkULMeDhN1vlYH3jFbQz5fUdBUKqvuhrK19Dh43jbddWVuRFvsstytZEE9QLqdVTn2nGYZrl2TU6yV1SkCsd2ONRvO55Ko1PhiuiMMEgOoMZI07MdWBBUVG6Y6ZrBQLohANuvvxTxvFXxI43WDC4vfG2u1IyWj8zpHH0hOuhH9Ev7Xfy+OMv35Kt5GbebdJZm1Jv13xAaj+U+z6LVssByx2aEAWYgIL/ADH+XtxtMp+lZ3sLGaQX6z6xx+TDOIYs58xqpN2SSIx0zHg2oJQn3XHvGKilkrpp4IN3fZSPWNhww6S0k7qw3XjYoTxAI0PZhKhAgSWmikUC1xdW+I4+++JhE5Bg6bUaiQg27iOPwxLTRVMISVARbTmO7FdQvRy21aNvZb8PsII+lqI4/wBpgMRpvMqDQXAxtbRUFNtHFmFYoji83TelILFUQksQBci1xwGKutgzCgWppZVmgkh30kU3DAi4IwtbMlC9GCohdw59XW47cROs9VGKyeXoi3rtcsQO7Gc5xTZAjVCHpbORTo2hkPVfkOs4q6qozCslqqh2lnlJd25/7AfIYyx7VPY6HwviGe23ezsV/wDpLfMA/wDzjadv51mTlNKf4zjdmp3jks8bECSNuBt1MD3jj2Y2V2nbPcnl35SmYwIRLumxbTRx39fbiN6qC/RzsoOpAY2J7RiS81ukEdx1ogUnvti4VlQC174p3YMFG4QwAIfgcZtTDzGV1UgLqVbih/07cSRDivHl6eW/pSk/er44mianlDqLre47OzFbs5mGcZ7mdRmVcgy+pKpHDCTv9EosEJPs3uSbc8SRw0uXmGJUiiSPcRBoAANAMCtemhJDxxKo1k3QD72OM221giZloh5zMTrK5O5fxbHmWd7QVYneOWTe0EjjcRR2dndhclp8i2ezB0IkqXpnV5iNbEWIXkMUjblVGe234YiqP+JuQpf2cvRPjGxxtG29n9YP2ZXH8ROKDLoc82OoKeoNmiRhFKAN5DvH4jsxJkmb0NcyRU9QXS4EkAazA8iMU8e1yW6MVwH9sgj+LEEu2AtvwQOP73cHgcUXn0ipJXxwxygEFYm3hiFBIAC4U2Fg3A9l8ZipXKKn2h9XYBuIF+F+scvJKu65twOvpZV+l6PS/wBcmnPXDqtyo1Xtxmta9PWSwQqEC29Y69WKiepmnsu+T1luGKrZ9szqGfMcwmlivdIIwEVR+PfikyXLqEg09JErD77Deb4nybRtubO155xW+JAxvbvrctcJPf8AKllRB0CU6fGEf64zt9/Pswb/ALmQfxHGyRvs5Tjkzj+I+hQ5XPXgtGVWMGxdj192IKVIFBYhnA9o6fLGaEHKakggjc6u/HXifivpZRHbMqQkXJlXT34lKnjx58+/txmztHnUzobMCLH3DHTwyfnqcX/ahO4fhw8MCWOKIiKdXXj0U0IPwOviMSzI6aU8aNx3kJ8CSMfybLIGSq4gGzJ/vjPNj8wzDKJ6Wmnp+kktYuSBoQT1HliT8le0gVgPMWuDwqLfhij2fyWOekr56MHMYkjLShm9tVC3426uWKv8l2f1WY1M4loUSWZ3XemJNixI4L24yPY2tyfJjBU1NOzRl5PqwxFuNtQMdXkjR5HARGkI1KqCfDGQMrUUzBQgMxIUHQaDTG1maVnnawQTmGFEDsVNixvp4YjqhW7NTVKqyrJEGAbiPJKbvblp6Ma7zge/FPL0FTFLa+44b4HAlSaMSA3LAEMPvDGc/pao7x4DClN194MWt6pB4G/X5J2pWpIBDHIs4B6ZmOjcrYj/ADSf4R4YAS35y3euCq20kU9ljiqrI6SJpJGCqil2LGwUDiTjI9uMtz2snpqdj0kZJUMCDIgt64v38OOKghqOUg3BjbwxDCkkE0jTpG0agqjDWQ8hiKXoiSEjY9W+u9bEbVte4gjMkhIuI00HwGmMhU/Rsy216Rh8hgULSZ7USxUsk1cJm6OViRHGpW2o5jqOK1Ey3Z9aQtvMVEYPPmcSvuDtPD0oPaY9nkyzN3ovqpAXg5Divd/pio83r87a9SsUEhH1rDQaYEDvJIsKmUITqgJuL8cdduvlg8D3YhLLEhViPVHDuwJCRrNY8it8O11P1iHs3dfDG1pn+iKyKno5quaoQQRxQrcktpc9nPGztPDSbXUMS5caOVop9/eFjcCxHbr14IP0bLf9hvA4ipp5VBjhkccwpt8ceZuq/WvHE1/vyDh3C5wGSlO/BVSdMPZMalQOep1+WNnf+Qk/enwGK3NaaiBDNvy9UanX38sVlZLWzmWU9iqOCjkMTG8nd6UHtEdnoAlSCCQRwI4489nIAkZZQOqVQ3zOvzxLLG6G0CRtzRjb4EnEDERIUY+yOHdjppOtr94wZSRY7vwGI36KQSAAsBbXGY5bQZpmVFmNTTBqqi3ugffPq343HA+/FSLUcwHARt4Y3mKBSxKjgL6YVijAroR5I6yoigMEcrJGxuQulz3+WYWk7/SRt1wfTV3T2XZe4kY2vzzMqChpvNMwqYXeU3ZJSDYDh8xiLbPagusced1hZiFUFgdT3jGfZxndJs67wZlOs8IQtICLtYgN1e/D7ZbSvo2eV3ukt4Yyuvq6nJaN56qaRnhUsXkJJNuv05V3l7R6cUlxunj1ent3Jeahi5K7/MD8MbLUnnefwXF0hvK3u4fO2K+AVWXVNORfpImX32wOq/HrxkJvkFB+4X7A8T6aTdTfHAIbgQfJwxvKfvD4+TbWXfzxEv8Am4FHxJONhqTcpqqsI1kYRr3DU/M/LHXjM6fzXNquC1gkzAd17j5Y2eN9naA/3Q8T6ZNgScdf2O8bWuccfIrsh0OnI42qMh2gqHdCAVXcv1qFA8b4yWj8xyalpyLMEDP/AIjqfHybYQdDtA7gaTRq/v4Hwxs2b7OUP7v8T6cz/dHv+2zTKY80kpS5AMUoJJ60vqPLt1BpRVIHAtGfkR+ONmDfZui/wn/2OGcILn4YMzHhYYEzjrvgTg8QR3YMyDmfdhpieAt+oRy20bUc8Bg3Ag42spmqchk3FLPHIrgKLnjY+ONnRJS5BSxSxskoDXVhYj1iRgksbk6/1V//xAAtEQABAwMCBAUDBQAAAAAAAAABAAIRAxIhBDEQEyBBIjAyQFEFYXGBkaGx8P/aAAgBAgEBPwD2NyuHlkzxZqaXM5c58kmBlXBXH4VzuypVXal7nOkWnH8ptckwpcDsg4ESOk4Wp1Fu+VRc4tkoTNqpMDV9P9T/APd1U09ri9ndHO6qOxjsqNW9s9D/AElUHcwwd1Re2o4tjb9kCBsmfK0HrcpjCuVV7KcgHJWjMtJ+6G3GplpAWjHjIKsGy1FR1MC3CGtqhUqtSnc5n6rT1nPBLk4kfhal9lQwtC0in0O3XKAcXDBXiC1kkNwoTcY7Z/paIENMK0nco6UOeXOKpgDA6HDjCDGRJCZTZ8BQBtxBjpLQrFajhsJm6O/ECfIcJQ3VuVAVoQEe9//EACkRAAEEAAQEBgMAAAAAAAAAAAEAAgMRBBIhMRAgMEETFCIyQHFRYdH/2gAIAQMBAT8A+DSrrOwkwj8XL6eiASaCdG5lWmiyAvLRjdSsjw8TWMIOca/lHDMrQ8KPKBZpQQC8gNd7WJ3CZ7gU52YpwoD6/qDy4Gz24YdhANjdTMDXenbkbunSNaMzlioy0Ne4jXteqzAbKMkjVTCg36ReQVn/AEonudv2FBT+5Hi3dTaNCtRMDrtBjRsvCJq1MwNOnDBhuW3C1i3AyWOQLOao8IO6pDEFoLcu9LEm3WrQmptBE3ryDkYSG2o3E7onXoWrVpx9AUZ1pHfp2mminHVWr+d//9k=',
        officeId: 3,
        positionId: 1,
      },
      {
        name: 'employeeeeeeeee',
        email: 'employeeeeeeee@employee.com',
        password: await bcrypt.hash('123456', 10),
        userTypeId: UserTypeEnum.EMPLOYEE,
        companyId: 1,
        departmentId: 2,
        image_path:
          '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',
        officeId: 1,
        positionId: 3,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
