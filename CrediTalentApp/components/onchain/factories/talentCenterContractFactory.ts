import { AssetType } from "@/lib/constants"
import { Address } from "viem"

// TODO: CRIS - use hook useErc20
export const talentCenterContractFactory = (assetType: AssetType) => {
  const XOC_TALENT_CENTER_CONTRACT = "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549"
  const TALENT_TALENT_CENTER_CONTRACT = "0xaAE22ccff30E636BDa436D54E5efea72227B2868" // TODO: SETUP 
  const USDC_TALENT_CENTER_CONTRACT = "0x03e5f3a1ae8faea9d8ec56a3ed1e708cfede1970"  // TODO: SETUP TALENT

  const TALENT_CENTER_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessControlBadConfirmation","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"neededRole","type":"bytes32"}],"name":"AccessControlUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"AddressEmptyCode","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"AddressInsufficientBalance","type":"error"},{"inputs":[],"name":"CrediTalentCenter_applicationAlreadyExists","type":"error"},{"inputs":[],"name":"CrediTalentCenter_fixedRateIrmAlreadyExists","type":"error"},{"inputs":[],"name":"CrediTalentCenter_zeroAddress","type":"error"},{"inputs":[],"name":"CreditTalentCenter_applicationNotPending","type":"error"},{"inputs":[],"name":"CreditTalentCenter_insufficientUnderwritingPower","type":"error"},{"inputs":[],"name":"CreditTalentCenter_invalidApplicationId","type":"error"},{"inputs":[],"name":"CreditTalentCenter_invalidInterestRate","type":"error"},{"inputs":[{"internalType":"address","name":"implementation","type":"address"}],"name":"ERC1967InvalidImplementation","type":"error"},{"inputs":[],"name":"ERC1967NonPayable","type":"error"},{"inputs":[],"name":"FailedInnerCall","type":"error"},{"inputs":[],"name":"InvalidInitialization","type":"error"},{"inputs":[],"name":"NotInitializing","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"inputs":[],"name":"UUPSUnauthorizedCallContext","type":"error"},{"inputs":[{"internalType":"bytes32","name":"slot","type":"bytes32"}],"name":"UUPSUnsupportedProxiableUUID","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"applicant","type":"address"},{"indexed":true,"internalType":"address","name":"underwriter","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"interestRate","type":"uint256"}],"name":"ApplicationApproved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"applicant","type":"address"},{"indexed":false,"internalType":"bytes32","name":"dataHash","type":"bytes32"}],"name":"ApplicationCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"applicant","type":"address"},{"indexed":true,"internalType":"address","name":"underwriter","type":"address"},{"indexed":false,"internalType":"string","name":"reason","type":"string"}],"name":"ApplicationRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"interestRate","type":"uint256"},{"indexed":false,"internalType":"address","name":"irm","type":"address"}],"name":"FixedRateIrmSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"version","type":"uint64"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"approvalPower","type":"uint256"}],"name":"UnderwriterSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_LLTV","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FLOATING_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNDERWRITER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPGRADE_INTERFACE_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adpativeIrm","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"applicationInfo","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"applicant","type":"address"},{"internalType":"bytes32","name":"dataHash","type":"bytes32"},{"internalType":"address","name":"underwriter","type":"address"},{"internalType":"enum ApplicationStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"applications","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"dataHash_","type":"bytes32"}],"name":"applyToCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"applyToUnderwrite","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user_","type":"address"},{"internalType":"uint256","name":"applicationId_","type":"uint256"},{"internalType":"uint256","name":"amount_","type":"uint256"},{"internalType":"uint256","name":"iRateWad_","type":"uint256"}],"name":"approveCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creditPoints","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"creditShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"fixedRateIrms","outputs":[{"internalType":"contract FixedRateIrm","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user_","type":"address"}],"name":"getUserLoanInfo","outputs":[{"internalType":"uint256","name":"creditLine","type":"uint256"},{"internalType":"uint256","name":"borrowed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"underwritingAsset_","type":"address"},{"internalType":"contract CreditPoints","name":"creditPointsImpl_","type":"address"},{"internalType":"contract IMorpho","name":"morpho_","type":"address"},{"internalType":"address","name":"adaptiveIrm_","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"morpho","outputs":[{"internalType":"contract IMorpho","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user_","type":"address"},{"internalType":"uint256","name":"applicationId_","type":"uint256"},{"internalType":"string","name":"reason_","type":"string"}],"name":"rejectCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"callerConfirmation","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBorrowRate_","type":"uint256"}],"name":"setFixedRateIrms","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalcreditShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"underwriters","outputs":[{"internalType":"address","name":"underwriter","type":"address"},{"internalType":"uint256","name":"approvalAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"underwritingAsset","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]
  try {
    if (assetType === 'xoc' && XOC_TALENT_CENTER_CONTRACT) {
      return {
        address: XOC_TALENT_CENTER_CONTRACT as Address,
        abi: TALENT_CENTER_ABI
      }
    } else if (assetType === 'usdc' && USDC_TALENT_CENTER_CONTRACT) {
      return {
        address: USDC_TALENT_CENTER_CONTRACT as Address,
        abi: TALENT_CENTER_ABI
      }
    } else if (assetType === 'talent' && TALENT_TALENT_CENTER_CONTRACT) {
      return {
        address: TALENT_TALENT_CENTER_CONTRACT as Address,
        abi: TALENT_CENTER_ABI
      }
    }
  } catch (e) {
    throw Error('Address Talent Center Not valid ')
  }
  throw Error('Address Talent Center require setup')
}