# Creditalent -🤖- Reputation-based loans connecting the Talent Passport/Builder Score to the amount of credit you can receive.

# CrediTalent Frontend
CrediTalent is an open-source decentralized lending platform focused on providing micro-loans based on on-chain reputation. Built for the Latin American market, CrediTalent leverages decentralized protocols to expand access to credit for underserved communities in Mexico and beyond, using a stablecoin (XOC) pegged to the Mexican peso.

## Background
Financial inclusion in Latin America, particularly in Mexico, faces significant challenges. Many freelancers, small business owners, and independent builders struggle to access traditional credit due to limited credit histories. To address this, CrediTalent offers an innovative approach to credit assessment that leverages blockchain technology.

**Why Reputation-Based Lending?**
We believe access to credit should not rely solely on traditional financial metrics. CrediTalent integrates Talent Protocol’s on-chain scoring system to assess the reputation of potential borrowers, empowering individuals who may not have access to conventional credit. By using on-chain activity as a measure of trustworthiness, we’re able to extend credit to builders and creators, providing them with a pathway to financial growth.

##📢 Key Features
**Reputation-Based Lending**: Users' eligibility for loans is determined through their on-chain activity and reputation scores from Talent Protocol, allowing those with limited credit histories to access funds.
**XOC Stablecoin Integration**: Loans are disbursed in XOC, a stablecoin pegged to the Mexican peso, facilitating an accessible entry point into decentralized finance (DeFi) for underserved communities.
**Decentralized and Transparent**: CrediTalent operates on the Base network, leveraging its low-cost infrastructure for efficient, transparent micro-lending.
**Flexible Off-Ramping**: Users can off-ramp their stablecoin funds directly to Mexican bank accounts through our partner, Bando.

##🛠️Architecture Overview
The CrediTalent platform integrates multiple decentralized technologies to provide a seamless experience for users:

**Smart Wallet Scaffolding**: Users connect their wallet, which we use to fetch their Talent Passport and reputation score from Talent Protocol.
**Smart Contract-Based Credit Approval**: After whitelisting and approval, users can sign transactions to receive their loan directly in XOC.
**Stablecoin Distribution**: XOC, our stablecoin pegged to MXN, is transferred to users upon loan approval. They can then swap it on a DEX or off-ramp it through Bando.

##Project Structure
**Frontend**: This repository contains the frontend code for CrediTalent, a Next.js 14 application that interfaces with the blockchain, the Talent Protocol API, and Base’s infrastructure.
**Smart Contracts**: Our credit-lending smart contract, inspired by Morpho’s model, allows for secure, reputation-based whitelisting and lending.

##Getting Started
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/creditalent-frontend.git
   
2. **Install dependencies**:
  cd creditalent-frontend
  npm install

3. **Environment Setup**: Configure your environment variables to include API keys, network details, and smart contract addresses.

4. **Run the development server**:
``npm run dev``
The app will be accessible at http://localhost:3000.

##Contributing
We welcome contributions from developers interested in building financial inclusion solutions. Here’s how you can get involved:

Fork the repository and create a new branch for your feature or fix.
Write clear, concise code and add comments where necessary.
Test your changes locally to ensure functionality.
Submit a pull request with a description of your work.
Challenges We Encountered
Building CrediTalent presented a few unique challenges:

Team Coordination: Managing a team of six developers remotely during a hackathon posed logistical challenges.
Platform Limitations: Certain platform restrictions limited our ability to add team members after submission.
Integration Complexity: While XOC had been previously deployed, integrating it with the Talent Protocol API and developing a new smart contract for whitelisting required careful attention to smart contract security and on-chain interactions.

## Future Roadmap
Enhanced Off-Ramping Options: Expand partnerships to provide more flexible off-ramping solutions.
Expanded On-Chain Scoring: Further integrate different reputation metrics to refine credit scoring.
Latin America Expansion: Expand beyond Mexico to address similar financial inclusion challenges across Latin America.

##License
This project is licensed under the MIT License. See the LICENSE file for more details.
