// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/IRewardToken.sol";

contract TreasuryFund is Ownable {
    using SafeERC20 for IRewardToken;
    IRewardToken public ice = IRewardToken(0x4A81f8796e0c6Ad4877A51C86693B0dE8093F2ef);

    uint256 private constant VESTING_DRATION = 3 * 365 * 24 * 3600; // 3 years
    uint256 private constant ALLOCATION_AMOUNT = 100_000_000 ether; // 100 M
    uint256 private constant START = 1626094800; // July 12th 2021, 1PM UTC
    uint256 private constant VELOCITY = ALLOCATION_AMOUNT / VESTING_DRATION;
    uint256 public claimed_amount;
    uint256 public last_claimed = START;

    function fundBalance() external view returns (uint256) {
        return ice.balanceOf(address(this));
    }

    function claimable() public view returns (uint256) {
        if (block.timestamp <= last_claimed) {
            return 0;
        }
        return VELOCITY * (block.timestamp - last_claimed);
    }

    function claim() external onlyOwner {
        uint256 _claimable = claimable();
        if (_claimable > 0) {
            ice.mint(address(this), _claimable);
            claimed_amount += _claimable;
            last_claimed = block.timestamp;
        }
    }

    function sendTo(
        address _receiver,
        uint256 _amount
    ) public onlyOwner {
        require(_receiver != address(0), "Invalid address");
        ice.safeTransfer(_receiver, _amount);
    }
}
