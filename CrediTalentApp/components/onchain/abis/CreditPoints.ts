const CreditPoints = [
  {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "DOMAIN_SEPARATOR",
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
      "name": "UPGRADE_INTERFACE_VERSION",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "string",
              "internalType": "string"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "allowance",
      "inputs": [
          {
              "name": "owner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "spender",
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
      "name": "approve",
      "inputs": [
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
          {
              "name": "account",
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
      "name": "burn",
      "inputs": [
          {
              "name": "from",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint8",
              "internalType": "uint8"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "eip712Domain",
      "inputs": [],
      "outputs": [
          {
              "name": "fields",
              "type": "bytes1",
              "internalType": "bytes1"
          },
          {
              "name": "name",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "version",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "chainId",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "verifyingContract",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "salt",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "extensions",
              "type": "uint256[]",
              "internalType": "uint256[]"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "initialize",
      "inputs": [
          {
              "name": "decimals_",
              "type": "uint8",
              "internalType": "uint8"
          },
          {
              "name": "initialOwner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "underWritingAsset_",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "isApprovedReceiver",
      "inputs": [
          {
              "name": "receiver_",
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
      "name": "mint",
      "inputs": [
          {
              "name": "to",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "string",
              "internalType": "string"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "nonces",
      "inputs": [
          {
              "name": "owner",
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
      "name": "owner",
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
      "name": "permit",
      "inputs": [
          {
              "name": "owner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "deadline",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "v",
              "type": "uint8",
              "internalType": "uint8"
          },
          {
              "name": "r",
              "type": "bytes32",
              "internalType": "bytes32"
          },
          {
              "name": "s",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "proxiableUUID",
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
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "setApprovedReceiver",
      "inputs": [
          {
              "name": "receiver_",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "approved_",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "string",
              "internalType": "string"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "totalSupply",
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
      "name": "transfer",
      "inputs": [
          {
              "name": "to",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
          {
              "name": "from",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "to",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
          {
              "name": "newOwner",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "upgradeToAndCall",
      "inputs": [
          {
              "name": "newImplementation",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
          }
      ],
      "outputs": [],
      "stateMutability": "payable"
  },
  {
      "type": "event",
      "name": "Approval",
      "inputs": [
          {
              "name": "owner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "spender",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "ApprovedTransactorSet",
      "inputs": [
          {
              "name": "transactor",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "approved",
              "type": "bool",
              "indexed": false,
              "internalType": "bool"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "EIP712DomainChanged",
      "inputs": [],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Initialized",
      "inputs": [
          {
              "name": "version",
              "type": "uint64",
              "indexed": false,
              "internalType": "uint64"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
          {
              "name": "previousOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "newOwner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Transfer",
      "inputs": [
          {
              "name": "from",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "to",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "value",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "Upgraded",
      "inputs": [
          {
              "name": "implementation",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          }
      ],
      "anonymous": false
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
      "name": "CreditPoints_zeroAddress",
      "inputs": []
  },
  {
      "type": "error",
      "name": "CreditPoints_zeroAmount",
      "inputs": []
  },
  {
      "type": "error",
      "name": "ECDSAInvalidSignature",
      "inputs": []
  },
  {
      "type": "error",
      "name": "ECDSAInvalidSignatureLength",
      "inputs": [
          {
              "name": "length",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "type": "error",
      "name": "ECDSAInvalidSignatureS",
      "inputs": [
          {
              "name": "s",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC1967InvalidImplementation",
      "inputs": [
          {
              "name": "implementation",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC1967NonPayable",
      "inputs": []
  },
  {
      "type": "error",
      "name": "ERC20InsufficientAllowance",
      "inputs": [
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "allowance",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "needed",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InsufficientBalance",
      "inputs": [
          {
              "name": "sender",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "balance",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "needed",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidApprover",
      "inputs": [
          {
              "name": "approver",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidReceiver",
      "inputs": [
          {
              "name": "receiver",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidSender",
      "inputs": [
          {
              "name": "sender",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC20InvalidSpender",
      "inputs": [
          {
              "name": "spender",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC2612ExpiredSignature",
      "inputs": [
          {
              "name": "deadline",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "type": "error",
      "name": "ERC2612InvalidSigner",
      "inputs": [
          {
              "name": "signer",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "owner",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "FailedInnerCall",
      "inputs": []
  },
  {
      "type": "error",
      "name": "InvalidAccountNonce",
      "inputs": [
          {
              "name": "account",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "currentNonce",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "type": "error",
      "name": "InvalidInitialization",
      "inputs": []
  },
  {
      "type": "error",
      "name": "NotInitializing",
      "inputs": []
  },
  {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
          {
              "name": "owner",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
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
      "name": "UUPSUnauthorizedCallContext",
      "inputs": []
  },
  {
      "type": "error",
      "name": "UUPSUnsupportedProxiableUUID",
      "inputs": [
          {
              "name": "slot",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ]
  }
]
export default CreditPoints;
