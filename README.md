# SolFluid

The problem SolFluid solves

Real-time streaming can be loosely translated as a constant flow of assets from one wallet to another every second. It makes transactions much faster and also enables a trust-less environment.

This could change the obsolete ways used nowadays which involve setting transactions, setting agreements, and hence open up many possibilities in recurring transactions, micro-consultation services, and other engagements where time is money.

#### Some use cases-
1) Payrolls - SolFluid can be used by companies to pay their employees in crypto. Employees can withdraw the amount by seconds. The crypto solution can ensure trustless payments.
2) Freelance - In freelancing, SolFluid can ensure that freelancer is payed for the time he worked. The client can also cancel the stream midway if he finds the work is not good.
3) The protocol can be used for OTT (Over the top) platforms like Netflix, spotify, and other subscription based services. 
4) Micro consultation services can also benifit by the SolFluid protocol, to ensure trustless payments.

Real-time finance makes it 10x easier for people to take ultra short-term jobs on the Internet.
#### Challenges we ran into

In the start we found it quite challenging to understand how data storage works on solana blockchain, But after reading all the docs provide by solana on accounts, understanding ownership of the account. We were able to figure some of it out. After few hit and trials and brainstorming we were able to figure out how we can create a system without data storage limit on Solana blockchain. Though we would like to mention the program development part was super fun for me(sushant), choosing a type-safe, and null-safe language was a great choice made by solana developers for programs on chain.

In the initial development of the project we were not able to figure out how can create mutiple instructions on a single program, as for that it only has one instruction process_instruction after thinking we were able to find out a variable we can use to call different function.

A mistake we made, We had a stuct of size 97 bytes at a point in development, but we tried to allocated 110 to the Program drived account, then  when the program was writing on the account it worked fine. But when we tried reading it didn't worked(Some Borsh error) after deploying like 10 times some different version of the program and reading about borsh crate we were able to figure out the issue and fix it.


## Links:

- [Deployed Project](https://solfluid.netlify.com/)
- [Program repository](https://github.com/Solfluid/solfluid_program)
- [Backend repository](https://github.com/Solfluid/solfluid_backend)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
