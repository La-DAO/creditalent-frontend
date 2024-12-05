const CreditTalentCenter = [
  {
      "type": "constructor",
      "inputs": [
          {
              "name": "underwritingAsset_",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "creditPointsImpl_",
              "type": "address",
              "internalType": "contract CreditPoints"
          },
          {
              "name": "morpho_",
              "type": "address",
              "internalType": "contract IMorpho"
          },
          {
              "name": "adaptiveIrm_",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "DEFAULT_ADMIN_ROLE",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "DEFAULT_LLTV",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "FLOATING_RATE",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "UNDERWRITER_ROLE",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "adpativeIrm",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "applicationInfo",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "id",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "applicant",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "dataHash",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "underwriter",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "status",
              "type": "uint8",
              "internalType": "enum ApplicationStatus"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "applications",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "applyToCredit",
      "inputs": [
          {
              "name": "dataHash_",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "applyToUnderwrite",
      "inputs": [
          {
              "name": "amount_",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "approveCredit",
      "inputs": [
          {
              "name": "user_",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "applicationId_",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "amount_",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "iRateWad_",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "creditPoints",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "creditShares",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "fixedRateIrms",
      "inputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract FixedRateIrm"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getRoleAdmin",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getUserLoanInfo",
      "inputs": [
          {
              "name": "user_",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "creditLine",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "borrowed",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "grantRole",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "hasRole",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "morpho",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IMorpho"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "price",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "rejectCredit",
      "inputs": [
          {
              "name": "user_",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "applicationId_",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "reason_",
              "type": "string",
              "internalType": "string"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "renounceRole",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "callerConfirmation",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "revokeRole",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setFixedRateIrms",
      "inputs": [
          {
              "name": "newBorrowRate_",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
          {
              "name": "interfaceId",
              "type": "bytes4",
              "internalType": "bytes4"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "totalcreditShares",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "underwriters",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "underwriter",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "approvalAmount",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "underwritingAsset",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "event",
      "name": "ApplicationApproved",
      "inputs": [
          {
              "name": "id",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "applicant",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "underwriter",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "interestRate",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "ApplicationCreated",
      "inputs": [
          {
              "name": "id",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "applicant",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "dataHash",
              "type": "bytes32",
              "indexed": false,
              "internalType": "bytes32"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "ApplicationRejected",
      "inputs": [
          {
              "name": "id",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "applicant",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "underwriter",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "reason",
              "type": "string",
              "indexed": false,
              "internalType": "string"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "FixedRateIrmSet",
      "inputs": [
          {
              "name": "interestRate",
              "type": "uint256",
              "indexed": true,
              "internalType": "uint256"
          },
          {
              "name": "irm",
              "type": "address",
              "indexed": false,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "RoleAdminChanged",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
          },
          {
              "name": "previousAdminRole",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
          },
          {
              "name": "newAdminRole",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "RoleGranted",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
          },
          {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "sender",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "RoleRevoked",
      "inputs": [
          {
              "name": "role",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
          },
          {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "sender",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "UnderwriterSet",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "approvalPower",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "error",
      "name": "AccessControlBadConfirmation",
      "inputs": []
  },
  {
      "type": "error",
      "name": "AccessControlUnauthorizedAccount",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "neededRole",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ]
  },
  {
      "type": "error",
      "name": "AddressEmptyCode",
      "inputs": [
          {
              "name": "target",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "AddressInsufficientBalance",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "CrediTalentCenter_applicationAlreadyExists",
      "inputs": []
  },
  {
      "type": "error",
      "name": "CrediTalentCenter_fixedRateIrmAlreadyExists",
      "inputs": []
  },
  {
      "type": "error",
      "name": "CrediTalentCenter_zeroAddress",
      "inputs": []
  },
  {
      "type": "error",
      "name": "CreditTalentCenter_applicationNotPending",
      "inputs": []
  },
  {
      "type": "error",
      "name": "CreditTalentCenter_insufficientUnderwritingPower",
      "inputs": []
  },
  {
      "type": "error",
      "name": "CreditTalentCenter_invalidApplicationId",
      "inputs": []
  },
  {
      "type": "error",
      "name": "CreditTalentCenter_invalidInterestRate",
      "inputs": []
  },
  {
      "type": "error",
      "name": "FailedInnerCall",
      "inputs": []
  },
  {
      "type": "error",
      "name": "SafeERC20FailedOperation",
      "inputs": [
          {
              "name": "token",
              "type": "address",
              "internalType": "address"
          }
      ]
  }
];
export default CreditTalentCenter;
