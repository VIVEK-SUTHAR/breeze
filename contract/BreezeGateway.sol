// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BreezeGateway {

	mapping(bytes32 => PendingTransfer) public pendingTransfers;

    struct PendingTransfer {
        address user;
        uint256 amount;
		address sourceToken;
        address destToken;
		uint256 sourceChain;
		uint256 destChain;
        bool executed;
        string targetPrice;
    }

	 event BridgeInitiated(bytes32 indexed transferId, address user, uint256 amount, address sourceToken, address destToken, uint256 sourceChain, uint256 destChain, string targetPrice);

    // For Native Tokens
    // Approves Bungee Impl spending & initiates bridging in single transaction
	function contractCallNativeToken (address payable _to, bytes memory txData, uint256 _amount, bytes32 transferId) public payable {
		PendingTransfer storage transfer = pendingTransfers[transferId];
        require(!transfer.executed, "Transfer already executed");
		(bool success, ) = _to.call{value: _amount}(txData);
		require(success);
        transfer.executed = true;
	}

	// For ERC-20 tokens
	// Approves Bungee Impl spending & initiates bridging in single transaction
	function contractCallERC20 (address payable _to,
	bytes memory txData,
	address _token,
	address _allowanceTarget,
	uint256 _amount,
	 bytes32 transferId
	) public {
			PendingTransfer storage transfer = pendingTransfers[transferId];
        require(!transfer.executed, "Transfer already executed");
		IERC20(_token).approve(_allowanceTarget, _amount);
		(bool success, ) = _to.call(txData);
		require(success);
		transfer.executed = true;
	}


	  function initiateBridging (address payable to,
    address _sourceToken,
    address _destToken,
    uint256 _sourceChain,
    uint256 _destChain,
    uint256 _amount,
    string memory targetPrice
    ) public payable  {
        bytes32 transferId = keccak256(abi.encodePacked(block.timestamp, to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, targetPrice));
        pendingTransfers[transferId] = PendingTransfer(to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, false, targetPrice);

        if (_sourceToken == address(0)) {
            require(msg.value == _amount, "Incorrect ETH amount sent");
        } else {
            require(IERC20(_sourceToken).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        }

        emit BridgeInitiated(transferId, to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, targetPrice);
    }
 // Receive function to accept plain Ether transfers
    receive() external payable {}

    // Fallback function for other calls
    fallback() external payable {}
}
