// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BreezeGateway {

    mapping(bytes32 => PendingTransfer) public pendingTransfers;
    mapping(address => bytes32[]) public userPendingTransfers;

    struct PendingTransfer {
        address user;
        uint256 amount;
        address sourceToken;
        address destToken;
        uint256 sourceChain;
        uint256 destChain;
        bool executed;
        string targetPrice;
        uint256 numberOfOrders;
        string interval;
        bool isDCA;
    }

    event LimitOrderInitiated(bytes32 indexed transferId, address user, uint256 amount, address sourceToken, address destToken, uint256 sourceChain, uint256 destChain, string targetPrice);
    event DCAOrderInitiated(bytes32 indexed transferId, address user, uint256 amount, address sourceToken, address destToken, uint256 sourceChain, uint256 destChain, uint256 numberOfOrders, string interval);
    event OrderCancelled(bytes32 indexed transferId, address user, uint256 amount, address sourceToken);

   
    function contractCallNativeToken(address payable _to, bytes memory txData, uint256 _amount, bytes32 transferId) public payable {
        PendingTransfer storage transfer = pendingTransfers[transferId];
        require(!transfer.executed, "Transfer already executed");
        (bool success, ) = _to.call{value: _amount}(txData);
        require(success);
        transfer.executed = true;
        removeFromUserPendingTransfers(transfer.user, transferId);
    }

  
    function contractCallERC20(address payable _to,
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
        removeFromUserPendingTransfers(transfer.user, transferId);
    }

    function initiateLimitOrder(address payable to,
    address _sourceToken,
    address _destToken,
    uint256 _sourceChain,
    uint256 _destChain,
    uint256 _amount,
    string memory targetPrice
    ) public payable  {
        bytes32 transferId = keccak256(abi.encodePacked(block.timestamp, to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, targetPrice));
        pendingTransfers[transferId] = PendingTransfer(to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, false, targetPrice, 0, "", false);
        userPendingTransfers[to].push(transferId);

        if (_sourceToken == address(0)) {
            require(msg.value == _amount, "Incorrect ETH amount sent");
        } else {
            require(IERC20(_sourceToken).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        }

        emit LimitOrderInitiated(transferId, to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, targetPrice);
    }

    function initiateDCAOrder(address payable to,
    address _sourceToken,
    address _destToken,
    uint256 _sourceChain,
    uint256 _destChain,
    uint256 _amount,
    uint256 _numberOfOrders,
    string memory _interval
    ) public payable {
        bytes32 transferId = keccak256(abi.encodePacked(block.timestamp, to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, _numberOfOrders, _interval));
        pendingTransfers[transferId] = PendingTransfer(to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, false, "", _numberOfOrders, _interval, true);
        userPendingTransfers[to].push(transferId);

        if (_sourceToken == address(0)) {
            require(msg.value == _amount, "Incorrect ETH amount sent");
        } else {
            require(IERC20(_sourceToken).transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        }

        emit DCAOrderInitiated(transferId, to, _amount, _sourceToken, _destToken, _sourceChain, _destChain, _numberOfOrders, _interval);
    }

    function cancelPendingOrder(bytes32 transferId) public {
        PendingTransfer storage transfer = pendingTransfers[transferId];
        require(transfer.user == msg.sender, "Only the order initiator can cancel");
        require(!transfer.executed, "Order already executed");

        if (transfer.sourceToken == address(0)) {
            payable(msg.sender).transfer(transfer.amount);
        } else {
            require(IERC20(transfer.sourceToken).transfer(msg.sender, transfer.amount), "Token transfer failed");
        }

        transfer.executed = true;
        removeFromUserPendingTransfers(msg.sender, transferId);

        emit OrderCancelled(transferId, msg.sender, transfer.amount, transfer.sourceToken);
    }

    function getUserPendingTransfers(address user) public view returns (bytes32[] memory) {
        return userPendingTransfers[user];
    }

    function removeFromUserPendingTransfers(address user, bytes32 transferId) internal {
        bytes32[] storage userTransfers = userPendingTransfers[user];
        for (uint i = 0; i < userTransfers.length; i++) {
            if (userTransfers[i] == transferId) {
                userTransfers[i] = userTransfers[userTransfers.length - 1];
                userTransfers.pop();
                break;
            }
        }
    }

    
    receive() external payable {}

   
    fallback() external payable {}
}